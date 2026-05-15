import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { createAdminClient } from "@/lib/supabase/server"
import { verifyAdmin } from "@/lib/admin-auth"

const socialPatchSchema = z.object({
  platform: z.string().min(1).max(50).optional(),
  url: z.string().url("URL no válida").optional(),
  icon: z.string().max(50).nullable().optional(),
  display_order: z.number().int().min(0).optional(),
  active: z.boolean().optional(),
})

type Ctx = { params: Promise<{ id: string }> }

export async function GET(_req: NextRequest, { params }: Ctx) {
  const { id } = await params
  const supabase = await createAdminClient()
  if (!supabase) return NextResponse.json({ error: "Not configured" }, { status: 503 })

  const { data, error } = await supabase.from("social_links").select("*").eq("id", id).single()
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

  const result = socialPatchSchema.safeParse(body)
  if (!result.success) {
    return NextResponse.json({ error: "Validation failed", details: result.error.flatten() }, { status: 422 })
  }

  const { data, error } = await supabase.from("social_links").update(result.data).eq("id", id).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function DELETE(_req: NextRequest, { params }: Ctx) {
  const { id } = await params
  if (!(await verifyAdmin())) return NextResponse.json({ error: "Forbidden" }, { status: 403 })

  const supabase = await createAdminClient()
  if (!supabase) return NextResponse.json({ error: "Not configured" }, { status: 503 })

  const { error } = await supabase.from("social_links").delete().eq("id", id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return new NextResponse(null, { status: 204 })
}
