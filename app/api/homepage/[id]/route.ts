import { NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { createAdminClient } from "@/lib/supabase/server"
import { verifyAdmin } from "@/lib/admin-auth"
import { homepageSectionSchema } from "@/lib/validations"

type Ctx = { params: Promise<{ id: string }> }

// All pages that may render homepage section images
const REVALIDATE_PATHS = [
  '/',
  '/por-que-maquinaria-japonesa',
  '/sobre-nosotros',
  '/contacto',
  '/catalogo',
]

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

  // section_key is the identifier — not mutable
  const result = homepageSectionSchema.omit({ section_key: true }).partial().safeParse(body)
  if (!result.success) {
    return NextResponse.json({ error: "Validation failed", details: result.error.flatten() }, { status: 422 })
  }

  const { data, error } = await supabase
    .from("homepage_sections")
    .update(result.data)
    .eq("id", id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  REVALIDATE_PATHS.forEach((p) => revalidatePath(p))

  return NextResponse.json(data)
}
