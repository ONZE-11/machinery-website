import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/server"

export async function GET() {
  const supabase = await createAdminClient()
  if (!supabase) return NextResponse.json({ error: "Not configured" }, { status: 503 })

  const { data, error } = await supabase
    .from("homepage_sections")
    .select("*")
    .order("display_order", { ascending: true })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}
