// Public query helpers — safe in server components, generateStaticParams, and sitemap.
// Uses createBrowserClient (no cookies, no request scope) so it works at build time.
import { createStaticClient } from "@/lib/supabase/static"
import { createAdminClient } from "@/lib/supabase/server"
import type { Product, Category, Brand, FAQ, SocialLink, HomepageSection } from "@/types/database"

// ─── Products ────────────────────────────────────────────────────────────────

export async function getPublishedProducts(opts?: { limit?: number }): Promise<Product[]> {
  const sb = createStaticClient()
  if (!sb) return []
  let q = sb
    .from("products")
    .select("*, category:categories(*), brand:brands(*)")
    .in("status", ["published", "reserved", "sold"])
    .order("created_at", { ascending: false })
  if (opts?.limit) q = q.limit(opts.limit)
  const { data, error } = await q
  if (error) console.error("[getPublishedProducts] DB error:", error.message)
  else console.log(`[getPublishedProducts] returned ${data?.length ?? 0} rows`)
  return (data ?? []) as unknown as Product[]
}

export async function getFeaturedProducts(limit = 6): Promise<Product[]> {
  const sb = createStaticClient()
  if (!sb) return []
  const { data, error } = await sb
    .from("products")
    .select("*, category:categories(*), brand:brands(*)")
    .in("status", ["published", "reserved", "sold"])
    .eq("featured", true)
    .order("created_at", { ascending: false })
    .limit(limit)
  if (error) console.error("[getFeaturedProducts] DB error:", error.message)
  else console.log(`[getFeaturedProducts] returned ${data?.length ?? 0} rows (featured=true)`)
  return (data ?? []) as unknown as Product[]
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const sb = createStaticClient()
  if (!sb) return null
  const { data, error } = await sb
    .from("products")
    .select("*, category:categories(*), brand:brands(*)")
    .eq("slug", slug)
    .in("status", ["published", "reserved", "sold"])
    .maybeSingle()
  if (error) console.error("[getProductBySlug] DB error:", error.message)
  return data as unknown as Product | null
}

export async function getPublishedProductSlugs(): Promise<string[]> {
  const sb = createStaticClient()
  if (!sb) return []
  const { data } = await sb
    .from("products")
    .select("slug")
    .in("status", ["published", "reserved", "sold"])
  return (data ?? []).map((r: { slug: string }) => r.slug)
}

export async function getRelatedProducts(
  categoryId: string,
  excludeId: string,
  limit = 3
): Promise<Product[]> {
  const sb = createStaticClient()
  if (!sb) return []
  const { data } = await sb
    .from("products")
    .select("*, category:categories(*), brand:brands(*)")
    .in("status", ["published", "reserved", "sold"])
    .eq("category_id", categoryId)
    .neq("id", excludeId)
    .limit(limit)
  return (data ?? []) as unknown as Product[]
}

/** Minimal product list for UI dropdowns (contact form, etc.) */
export async function getProductsBasic(): Promise<Array<{ slug: string; title: string; model: string | null }>> {
  const sb = createStaticClient()
  if (!sb) return []
  const { data } = await sb
    .from("products")
    .select("slug, title, model")
    .in("status", ["published", "reserved", "sold"])
    .order("title", { ascending: true })
  return (data ?? []) as Array<{ slug: string; title: string; model: string | null }>
}

// ─── Categories ──────────────────────────────────────────────────────────────

export async function getActiveCategories(): Promise<Category[]> {
  const sb = createStaticClient()
  if (!sb) return []
  const { data, error } = await sb
    .from("categories")
    .select("*")
    .eq("active", true)
    .order("display_order", { ascending: true })
  if (error) console.error("[getActiveCategories] DB error:", error.message)
  return (data ?? []) as Category[]
}

// ─── Brands ──────────────────────────────────────────────────────────────────

export async function getActiveBrands(): Promise<Brand[]> {
  const sb = createStaticClient()
  if (!sb) return []
  const { data, error } = await sb
    .from("brands")
    .select("*")
    .eq("active", true)
    .order("display_order", { ascending: true })
  if (error) console.error("[getActiveBrands] DB error:", error.message)
  return (data ?? []) as Brand[]
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────
// Uses admin client — faq was created via SQL Editor so the anon role has no
// base SELECT grant. Safe: only ever called from server components (page.tsx).

export async function getActiveFAQs(limit?: number): Promise<FAQ[]> {
  const sb = await createAdminClient()
  if (!sb) return []
  let q = sb
    .from("faq")
    .select("*")
    .eq("active", true)
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: true })
  if (limit) q = q.limit(limit)
  const { data, error } = await q
  if (error) console.error("[getActiveFAQs] DB error:", error.message)
  else console.log(`[getActiveFAQs] returned ${data?.length ?? 0} rows`)
  return (data ?? []) as FAQ[]
}

// ─── Homepage sections ────────────────────────────────────────────────────────

export async function getHomepageSection(key: string): Promise<HomepageSection | null> {
  // Use admin client to bypass potential RLS restrictions on homepage_sections.
  // active filter is intentionally omitted — the hero section should always be fetched.
  const sb = await createAdminClient()
  if (!sb) return null
  const { data, error } = await sb
    .from("homepage_sections")
    .select("*")
    .eq("section_key", key)
    .maybeSingle()
  if (error) console.error("[getHomepageSection] DB error:", error.message)
  console.log(`[getHomepageSection] key="${key}" image="${(data as HomepageSection | null)?.image ?? "null"}"`)
  return data as HomepageSection | null
}

// ─── Contact settings ─────────────────────────────────────────────────────────
// Uses admin client — contact_settings was created via SQL Editor so the anon
// role has no base SELECT grant on it (same root cause as faq / social_links).
// This is safe: getContactSettings is only called from server components (Footer).

export async function getContactSettings(): Promise<Record<string, string>> {
  const sb = await createAdminClient()
  if (!sb) return {}
  const { data, error } = await sb
    .from("contact_settings")
    .select("setting_key, value")
    .eq("active", true)
  if (error) console.error("[getContactSettings] DB error:", error.message)
  else console.log(`[getContactSettings] returned ${data?.length ?? 0} rows`)
  const map: Record<string, string> = {}
  ;(data ?? []).forEach((r: { setting_key: string; value: string }) => {
    map[r.setting_key] = r.value
  })
  return map
}

// ─── Social links ─────────────────────────────────────────────────────────────
// Uses admin client — social_links was created via SQL Editor so the anon role
// has no base SELECT grant on it (Supabase only auto-grants for Table Editor UI
// tables, not SQL-created ones). Safe: only called from server components (Footer).

export async function getActiveSocialLinks(): Promise<SocialLink[]> {
  const sb = await createAdminClient()
  if (!sb) return []
  const { data, error } = await sb
    .from("social_links")
    .select("*")
    .eq("active", true)
    .order("display_order", { ascending: true })
  if (error) console.error("[getActiveSocialLinks] DB error:", error.message)
  else console.log(`[getActiveSocialLinks] returned ${data?.length ?? 0} rows`)
  return (data ?? []) as SocialLink[]
}
