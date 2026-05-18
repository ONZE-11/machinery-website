import { NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { createAdminClient } from "@/lib/supabase/server"
import { verifyAdmin } from "@/lib/admin-auth"
import { homepageSectionSchema } from "@/lib/validations"

type Ctx = { params: Promise<{ id: string }> }

/** Extract the storage object path from a Supabase public URL.
 *  e.g. "https://xxx.supabase.co/storage/v1/object/public/homepage/file.jpg" → "file.jpg"
 */
function extractHomepagePath(url: string): string | null {
  const match = url.match(/\/storage\/v1\/object\/public\/homepage\/(.+)$/)
  return match?.[1] ?? null
}

/** Pages that must be revalidated when a given section_key changes. */
const SECTION_PATHS: Record<string, string[]> = {
  hero:           ['/'],
  why_japanese:   ['/'],
  hero_secondary: ['/por-que-maquinaria-japonesa'],
  trust:          ['/sobre-nosotros'],
}

export async function GET(_req: NextRequest, { params }: Ctx) {
  const { id } = await params
  const supabase = await createAdminClient()
  if (!supabase) return NextResponse.json({ error: "Not configured" }, { status: 503 })

  const { data, error } = await supabase.from("homepage_sections").select("*").eq("id", id).single()
  if (error || !data) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json(data)
}

export async function PATCH(req: NextRequest, { params }: Ctx) {
  const { id } = await params
  if (!(await verifyAdmin())) return NextResponse.json({ error: "Forbidden" }, { status: 403 })

  const supabase = await createAdminClient()
  if (!supabase) return NextResponse.json({ error: "Not configured" }, { status: 503 })

  let body: unknown
  try { body = await req.json() } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }

  const result = homepageSectionSchema.omit({ section_key: true }).partial().safeParse(body)
  if (!result.success) {
    console.error("[PATCH /api/homepage] Validation failed:", result.error.flatten())
    return NextResponse.json({ error: "Validation failed", details: result.error.flatten() }, { status: 422 })
  }

  // Always strip `image` from updates — it is the permanent default and must never be
  // overwritten by admin form submissions. Only `custom_image` is admin-editable.
  const { image: _protected, ...safeUpdate } = result.data

  console.log("[PATCH /api/homepage] id:", id, "custom_image:", safeUpdate.custom_image ?? "NOT PRESENT")

  // Fetch the current row: we need custom_image (for Storage cleanup) and section_key (for revalidation)
  const { data: existing } = await supabase
    .from("homepage_sections")
    .select("section_key, custom_image")
    .eq("id", id)
    .single()

  const existingRow = existing as { section_key?: string; custom_image?: string | null } | null
  const sectionKey  = existingRow?.section_key ?? ""

  // If custom_image is being replaced or cleared, delete the old file from Storage
  if ("custom_image" in safeUpdate) {
    const oldUrl = existingRow?.custom_image
    if (oldUrl && oldUrl !== safeUpdate.custom_image) {
      const path = extractHomepagePath(oldUrl)
      if (path) {
        const { error: rmErr } = await supabase.storage.from("homepage").remove([path])
        if (rmErr) console.warn("[PATCH /api/homepage] Storage cleanup warning:", rmErr.message)
        else console.log("[PATCH /api/homepage] Deleted old custom_image:", path)
      }
    }
  }

  const { data, error } = await supabase
    .from("homepage_sections")
    .update(safeUpdate)
    .eq("id", id)
    .select()
    .single()

  if (error) {
    console.error("[PATCH /api/homepage] DB update error:", error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const saved = data as { custom_image?: string | null; image?: string | null }
  console.log("[PATCH /api/homepage] Saved — section_key:", sectionKey, "| custom_image:", saved.custom_image ?? "null")

  // Revalidate only the pages that actually render this section
  const paths = SECTION_PATHS[sectionKey] ?? ['/']
  paths.forEach((p) => revalidatePath(p))
  console.log("[PATCH /api/homepage] Revalidated paths:", paths)

  return NextResponse.json(data)
}
