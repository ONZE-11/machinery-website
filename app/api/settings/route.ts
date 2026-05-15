import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { createAdminClient } from "@/lib/supabase/server"
import { verifyAdmin } from "@/lib/admin-auth"

const settingsUpdateSchema = z.array(
  z.object({
    setting_key: z.string().min(1).max(50),
    value: z.string(),
    label: z.string().max(100).nullable().optional(),
  })
).min(1)

export async function GET() {
  const supabase = await createAdminClient()
  if (!supabase) return NextResponse.json({ error: "Not configured" }, { status: 503 })

  const { data, error } = await supabase
    .from("contact_settings")
    .select("*")
    .order("setting_key", { ascending: true })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function PUT(req: NextRequest) {
  if (!(await verifyAdmin())) return NextResponse.json({ error: "Forbidden" }, { status: 403 })

  const supabase = await createAdminClient()
  if (!supabase) return NextResponse.json({ error: "Not configured" }, { status: 503 })

  let body: unknown
  try { body = await req.json() } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }

  const result = settingsUpdateSchema.safeParse(body)
  if (!result.success) {
    return NextResponse.json({ error: "Validation failed", details: result.error.flatten() }, { status: 422 })
  }

  const { error } = await supabase
    .from("contact_settings")
    .upsert(result.data, { onConflict: "setting_key" })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
