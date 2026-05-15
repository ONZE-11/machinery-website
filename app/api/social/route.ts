import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { createAdminClient } from "@/lib/supabase/server"
import { verifyAdmin } from "@/lib/admin-auth"

const socialSchema = z.object({
  platform: z.string().min(1, "La plataforma es obligatoria").max(50),
  url: z.string().url("URL no válida"),
  icon: z.string().max(50).nullable().optional(),
  display_order: z.number().int().min(0).default(0),
  active: z.boolean().default(true),
})

export async function GET() {
  const supabase = await createAdminClient()
  if (!supabase) return NextResponse.json({ error: "Not configured" }, { status: 503 })

  const { data, error } = await supabase
    .from("social_links")
    .select("*")
    .order("display_order", { ascending: true })
    .order("platform", { ascending: true })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  if (!(await verifyAdmin())) return NextResponse.json({ error: "Forbidden" }, { status: 403 })

  const supabase = await createAdminClient()
  if (!supabase) return NextResponse.json({ error: "Not configured" }, { status: 503 })

  let body: unknown
  try { body = await req.json() } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }

  const result = socialSchema.safeParse(body)
  if (!result.success) {
    return NextResponse.json({ error: "Validation failed", details: result.error.flatten() }, { status: 422 })
  }

  const { data, error } = await supabase.from("social_links").insert(result.data).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}
