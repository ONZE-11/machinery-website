import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { createAdminClient } from "@/lib/supabase/server"

// Server-side validation — must pass before any DB write
const submissionSchema = z.object({
  name:             z.string().min(2).max(100).trim(),
  email:            z.string().email().max(255).trim().toLowerCase(),
  phone:            z.string().max(50).trim().optional(),
  company:          z.string().max(200).trim().optional(),
  product_interest: z.string().max(200).trim().optional(),
  subject:          z.string().min(1).max(200).trim().optional(),
  message:          z.string().min(10).max(2000).trim(),
  // Privacy must be explicitly accepted — reject submissions that bypass the frontend
  privacy_accepted: z.literal(true, {
    errorMap: () => ({ message: "Debe aceptar la política de privacidad" }),
  }),
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

  const { privacy_accepted: _accepted, subject: _subject, ...dbFields } = result.data

  const supabase = await createAdminClient()
  if (!supabase) {
    console.log("[Contact] Submission (no DB):", dbFields)
    return NextResponse.json({ ok: true })
  }

  const ip        = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null
  const userAgent = req.headers.get("user-agent") ?? null

  const { error } = await supabase.from("contact_submissions").insert({
    name:             dbFields.name,
    email:            dbFields.email,
    phone:            dbFields.phone   || null,
    company:          dbFields.company || null,
    product_interest: dbFields.product_interest || null,
    message:          dbFields.message,
    ip_address:       ip,
    user_agent:       userAgent,
  })

  if (error) {
    console.error("[Contact] DB error:", error.message)
    return NextResponse.json({ error: "Failed to save" }, { status: 500 })
  }

  return NextResponse.json({ ok: true }, { status: 201 })
}
