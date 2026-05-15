// Public query helpers — safe in server components, generateStaticParams, and sitemap.
// Uses createBrowserClient (no cookies, no request scope) so it works at build time.
import { createClient } from "./client"
import type { Product, Category, Brand, FAQ, SocialLink } from "@/types/database"

// ─── Products ────────────────────────────────────────────────────────────────

export async function getPublishedProducts(opts?: { limit?: number }): Promise<Product[]> {
  const sb = await createClient()
  if (!sb) return []
  let q = sb
    .from("products")
    .select("*, category:categories(*), brand:brands(*)")
    .eq("status", "published")
    .order("created_at", { ascending: false })
  if (opts?.limit) q = q.limit(opts.limit)
  const { data } = await q
  return (data ?? []) as unknown as Product[]
}

export async function getFeaturedProducts(limit = 6): Promise<Product[]> {
  const sb = await createClient()
  if (!sb) return []
  const { data } = await sb
    .from("products")
    .select("*, category:categories(*), brand:brands(*)")
    .eq("status", "published")
    .eq("featured", true)
    .order("created_at", { ascending: false })
    .limit(limit)
  return (data ?? []) as unknown as Product[]
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const sb = await createClient()
  if (!sb) return null
  const { data } = await sb
    .from("products")
    .select("*, category:categories(*), brand:brands(*)")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle()
  return data as unknown as Product | null
}

export async function getPublishedProductSlugs(): Promise<string[]> {
  const sb = await createClient()
  if (!sb) return []
  const { data } = await sb
    .from("products")
    .select("slug")
    .eq("status", "published")
  return (data ?? []).map((r: { slug: string }) => r.slug)
}

export async function getRelatedProducts(
  categoryId: string,
  excludeId: string,
  limit = 3
): Promise<Product[]> {
  const sb = await createClient()
  if (!sb) return []
  const { data } = await sb
    .from("products")
    .select("*, category:categories(*), brand:brands(*)")
    .eq("status", "published")
    .eq("category_id", categoryId)
    .neq("id", excludeId)
    .limit(limit)
  return (data ?? []) as unknown as Product[]
}

/** Minimal product list for UI dropdowns (contact form, etc.) */
export async function getProductsBasic(): Promise<Array<{ slug: string; title: string; model: string | null }>> {
  const sb = await createClient()
  if (!sb) return []
  const { data } = await sb
    .from("products")
    .select("slug, title, model")
    .eq("status", "published")
    .order("title", { ascending: true })
  return (data ?? []) as Array<{ slug: string; title: string; model: string | null }>
}

// ─── Categories ──────────────────────────────────────────────────────────────

export async function getActiveCategories(): Promise<Category[]> {
  const sb = await createClient()
  if (!sb) return []
  const { data } = await sb
    .from("categories")
    .select("*")
    .eq("active", true)
    .order("display_order", { ascending: true })
  return (data ?? []) as Category[]
}

// ─── Brands ──────────────────────────────────────────────────────────────────

export async function getActiveBrands(): Promise<Brand[]> {
  const sb = await createClient()
  if (!sb) return []
  const { data } = await sb
    .from("brands")
    .select("*")
    .eq("active", true)
    .order("display_order", { ascending: true })
  return (data ?? []) as Brand[]
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────

export async function getActiveFAQs(limit?: number): Promise<FAQ[]> {
  const sb = await createClient()
  if (!sb) return []
  let q = sb
    .from("faq")
    .select("*")
    .eq("active", true)
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: true })
  if (limit) q = q.limit(limit)
  const { data } = await q
  return (data ?? []) as FAQ[]
}

// ─── Contact settings ─────────────────────────────────────────────────────────

export async function getContactSettings(): Promise<Record<string, string>> {
  const sb = await createClient()
  if (!sb) return {}
  const { data } = await sb
    .from("contact_settings")
    .select("setting_key, value")
    .eq("active", true)
  const map: Record<string, string> = {}
  ;(data ?? []).forEach((r: { setting_key: string; value: string }) => {
    map[r.setting_key] = r.value
  })
  return map
}

// ─── Social links ─────────────────────────────────────────────────────────────

export async function getActiveSocialLinks(): Promise<SocialLink[]> {
  const sb = await createClient()
  if (!sb) return []
  const { data } = await sb
    .from("social_links")
    .select("*")
    .eq("active", true)
    .order("display_order", { ascending: true })
  return (data ?? []) as SocialLink[]
}
