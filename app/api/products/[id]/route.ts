import { NextRequest, NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/server"
import { verifyAdmin } from "@/lib/admin-auth"
import { productSchema } from "@/lib/validations"

type Ctx = {
  params: Promise<{ id: string }>
}

// =============================================================================
// GET SINGLE PRODUCT (ADMIN)
// =============================================================================
export async function GET(_req: NextRequest, { params }: Ctx) {
  const { id } = await params

  if (!(await verifyAdmin())) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const supabase = await createAdminClient()

  if (!supabase) {
    return NextResponse.json(
      { error: "Not configured" },
      { status: 503 }
    )
  }

  const { data, error } = await supabase
    .from("products")
    .select("*, category:categories(*), brand:brands(*)")
    .eq("id", id)
    .single()

  if (error || !data) {
    console.error("[Product GET]", error)
    return NextResponse.json(
      { error: "Product not found" },
      { status: 404 }
    )
  }

  return NextResponse.json(data)
}

// =============================================================================
// UPDATE PRODUCT
// =============================================================================
export async function PATCH(req: NextRequest, { params }: Ctx) {
  const { id } = await params

  if (!(await verifyAdmin())) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const supabase = await createAdminClient()

  if (!supabase) {
    return NextResponse.json(
      { error: "Not configured" },
      { status: 503 }
    )
  }

  let body: unknown

  try {
    body = await req.json()
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON" },
      { status: 400 }
    )
  }

  // Partial validation for edit mode
  const validation = productSchema.partial().safeParse(body)

  if (!validation.success) {
    return NextResponse.json(
      {
        error: "Validation failed",
        details: validation.error.flatten(),
      },
      { status: 422 }
    )
  }

  const updateData = {
    ...validation.data,
    updated_at: new Date().toISOString(),
  }

  const { data, error } = await supabase
    .from("products")
    .update(updateData)
    .eq("id", id)
    .select()
    .single()

  if (error) {
    console.error("[Product PATCH]", error)

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }

  if (!data) {
    return NextResponse.json(
      { error: "Product not found" },
      { status: 404 }
    )
  }

  return NextResponse.json(data)
}

// =============================================================================
// DELETE PRODUCT
// =============================================================================
export async function DELETE(_req: NextRequest, { params }: Ctx) {
  const { id } = await params

  if (!(await verifyAdmin())) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const supabase = await createAdminClient()

  if (!supabase) {
    return NextResponse.json(
      { error: "Not configured" },
      { status: 503 }
    )
  }

  // Optional:
  // Could fetch product first to remove hero/gallery images from storage
  // Keeping DB delete only for now to avoid accidental asset deletion chaos

  const { error, count } = await supabase
    .from("products")
    .delete({ count: "exact" })
    .eq("id", id)

  if (error) {
    console.error("[Product DELETE]", error)

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }

  if (!count) {
    return NextResponse.json(
      { error: "Product not found" },
      { status: 404 }
    )
  }

  return new NextResponse(null, { status: 204 })
}