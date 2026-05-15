import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { createAdminClient } from "@/lib/supabase/server"

// Matches contact_submissions table columns (omits subject + privacy_accepted)
const submissionSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(255),
  phone: z.string().max(50).optional(),
  company: z.string().max(200).optional(),
  product_interest: z.string().max(200).optional(),
  message: z.string().min(10).max(2000),
})

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }

  const result = submissionSchema.safeParse(body)
  if (!result.success) {
    return NextResponse.json(
      { error: "Validation failed", details: result.error.flatten() },
      { status: 422 }
    )
  }

  const supabase = await createAdminClient()
  if (!supabase) {
    // Supabase not configured — log locally and return success to not break the form UX
    console.log("[Contact] Submission (no DB):", result.data)
    return NextResponse.json({ ok: true })
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? null
  const userAgent = req.headers.get("user-agent") ?? null

  const { error } = await supabase.from("contact_submissions").insert({
    ...result.data,
    ip_address: ip,
    user_agent: userAgent,
  })

  if (error) {
    console.error("[Contact] DB error:", error.message)
    return NextResponse.json({ error: "Failed to save" }, { status: 500 })
  }

  return NextResponse.json({ ok: true }, { status: 201 })
}
