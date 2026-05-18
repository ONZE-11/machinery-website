import { NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { createAdminClient } from "@/lib/supabase/server"
import { verifyAdmin } from "@/lib/admin-auth"
import { homepageSectionSchema } from "@/lib/validations"

type Ctx = { params: Promise<{ id: string }> }

// Pages revalidated when each section_key is saved
const SECTION_PATHS: Record<string, string[]> = {
  hero:              ['/'],
  why_japanese:      ['/'],
  why_japanese_home: ['/'],
  hero_secondary:    ['/por-que-maquinaria-japonesa'],
  trust:             ['/sobre-nosotros'],
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

  // section_key is the identifier — not mutable
  const result = homepageSectionSchema.omit({ section_key: true }).partial().safeParse(body)
  if (!result.success) {
    return NextResponse.json({ error: "Validation failed", details: result.error.flatten() }, { status: 422 })
  }

  // Fetch section_key to know which pages to revalidate
  const { data: existing } = await supabase
    .from("homepage_sections")
    .select("section_key")
    .eq("id", id)
    .single()
  const sectionKey = (existing as { section_key?: string } | null)?.section_key ?? ""

  const { data, error } = await supabase
    .from("homepage_sections")
    .update(result.data)
    .eq("id", id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const paths = SECTION_PATHS[sectionKey] ?? ['/']
  paths.forEach((p) => revalidatePath(p))

  return NextResponse.json(data)
}
