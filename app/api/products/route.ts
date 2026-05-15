import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/server"
import { verifyAdmin } from "@/lib/admin-auth"

// Admin-only: returns ALL products across all statuses with category + brand joins.
// Public product reads are handled via lib/supabase/queries.ts in server components.
export async function GET() {
  if (!(await verifyAdmin())) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const supabase = await createAdminClient()
  if (!supabase) return NextResponse.json({ error: "Not configured" }, { status: 503 })

  const { data, error } = await supabase
    .from("products")
    .select("*, category:categories(*), brand:brands(*)")
    .order("created_at", { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}
