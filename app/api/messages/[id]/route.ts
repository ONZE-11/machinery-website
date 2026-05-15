import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { createAdminClient } from "@/lib/supabase/server"
import { verifyAdmin } from "@/lib/admin-auth"

const messagePatchSchema = z.object({
  read: z.boolean().optional(),
  replied: z.boolean().optional(),
})

type Ctx = { params: Promise<{ id: string }> }

export async function PATCH(req: NextRequest, { params }: Ctx) {
  const { id } = await params
  if (!(await verifyAdmin())) return NextResponse.json({ error: "Forbidden" }, { status: 403 })

  const supabase = await createAdminClient()
  if (!supabase) return NextResponse.json({ error: "Not configured" }, { status: 503 })

  let body: unknown
  try { body = await req.json() } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }

  const result = messagePatchSchema.safeParse(body)
  if (!result.success) {
    return NextResponse.json({ error: "Validation failed" }, { status: 422 })
  }

  const { data, error } = await supabase
    .from("contact_submissions")
    .update(result.data)
    .eq("id", id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function DELETE(_req: NextRequest, { params }: Ctx) {
  const { id } = await params
  if (!(await verifyAdmin())) return NextResponse.json({ error: "Forbidden" }, { status: 403 })

  const supabase = await createAdminClient()
  if (!supabase) return NextResponse.json({ error: "Not configured" }, { status: 503 })

  const { error } = await supabase.from("contact_submissions").delete().eq("id", id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return new NextResponse(null, { status: 204 })
}
