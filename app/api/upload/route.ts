import { NextRequest, NextResponse } from "next/server"
import { currentUser } from "@clerk/nextjs/server"
import { createAdminClient } from "@/lib/supabase/server"
import { isAdminEmail } from "@/lib/admin-auth"

const ALLOWED_MIME: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
}

const ALLOWED_BUCKETS = ["products", "brands", "categories", "homepage"] as const
type AllowedBucket = (typeof ALLOWED_BUCKETS)[number]

const MAX_BYTES: Record<AllowedBucket, number> = {
  products: 10 * 1024 * 1024,
  homepage: 10 * 1024 * 1024,
  brands: 5 * 1024 * 1024,
  categories: 5 * 1024 * 1024,
}

export async function POST(req: NextRequest) {
  // ── 1. Verify Clerk authentication ──────────────────────────────────────────
  const user = await currentUser()
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const primaryEmail =
    user.emailAddresses.find((e) => e.id === user.primaryEmailAddressId)
      ?.emailAddress ?? user.emailAddresses[0]?.emailAddress

  if (!primaryEmail || !isAdminEmail(primaryEmail)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  // ── 2. Parse multipart body ──────────────────────────────────────────────────
  let formData: FormData
  try {
    formData = await req.formData()
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }

  const fileField = formData.get("file")
  const bucketField = formData.get("bucket")

  if (!(fileField instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 })
  }

  if (
    typeof bucketField !== "string" ||
    !(ALLOWED_BUCKETS as readonly string[]).includes(bucketField)
  ) {
    return NextResponse.json({ error: "Invalid bucket" }, { status: 400 })
  }

  const bucket = bucketField as AllowedBucket
  const file = fileField

  // ── 3. Validate MIME type (server-side — do not trust client Content-Type) ──
  const ext = ALLOWED_MIME[file.type]
  if (!ext) {
    return NextResponse.json(
      { error: "Solo se permiten imágenes JPG, PNG o WebP" },
      { status: 400 }
    )
  }

  // ── 4. Validate file size ────────────────────────────────────────────────────
  if (file.size > MAX_BYTES[bucket]) {
    const mb = MAX_BYTES[bucket] / (1024 * 1024)
    return NextResponse.json(
      { error: `La imagen no puede superar ${mb} MB` },
      { status: 400 }
    )
  }

  // ── 5. Upload to Supabase Storage (service role bypasses RLS safely here) ───
  const supabase = await createAdminClient()
  if (!supabase) {
    return NextResponse.json(
      { error: "Storage not configured — add SUPABASE_SERVICE_ROLE_KEY" },
      { status: 503 }
    )
  }

  // Generate a collision-resistant path: {ms}-{4 random chars}.{ext}
  const timestamp = Date.now()
  const rand = Math.random().toString(36).slice(2, 6)
  const storagePath = `${timestamp}-${rand}.${ext}`

  const bytes = await file.arrayBuffer()

  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(storagePath, bytes, {
      contentType: file.type,
      upsert: false,
    })

  if (uploadError) {
    console.error("[Upload] Supabase storage error:", uploadError.message)
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }

  // ── 6. Return permanent public URL ───────────────────────────────────────────
  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(storagePath)

  return NextResponse.json({ url: publicUrl })
}
