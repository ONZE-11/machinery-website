-- =============================================================================
-- FIX: Grant SELECT privilege to anon + authenticated roles on all public tables
-- =============================================================================
-- WHY THIS IS NEEDED:
--   Supabase auto-grants SELECT to anon/authenticated only for tables created
--   via the Table Editor UI. Tables created via SQL Editor (as these all are)
--   require explicit GRANT statements. RLS policies are applied AFTER the base
--   privilege check — so even a permissive RLS policy is bypassed if the role
--   lacks the base GRANT, producing "permission denied for table X".
--
-- SYMPTOM:
--   [getActiveFAQs]         DB error: "permission denied for table faq"
--   [getContactSettings]    DB error: "permission denied for table contact_settings"
--   Social links / brands / categories silently return [] (same cause).
--   Brand filter on /catalogo?marca=tcm returns 0 results (brand join = null).
--
-- HOW TO RUN:
--   Supabase Dashboard → SQL Editor → New query → paste → Run
-- =============================================================================

-- ── Core public-read tables ───────────────────────────────────────────────────

GRANT SELECT ON public.products           TO anon, authenticated;
GRANT SELECT ON public.brands             TO anon, authenticated;
GRANT SELECT ON public.categories         TO anon, authenticated;
GRANT SELECT ON public.faq               TO anon, authenticated;
GRANT SELECT ON public.contact_settings  TO anon, authenticated;
GRANT SELECT ON public.social_links      TO anon, authenticated;
GRANT SELECT ON public.homepage_sections TO anon, authenticated;

-- ── Write-only table (contact form submissions) ────────────────────────────────
-- anon can INSERT but NOT SELECT (that's already the RLS intent)
GRANT INSERT ON public.contact_submissions TO anon;

-- ── Admin-only tables — no public access ─────────────────────────────────────
-- admins, analytics_events: no GRANT to anon (RLS protects read, service role
-- bypasses for admin writes).

-- ── Ensure schema usage right exists ─────────────────────────────────────────
GRANT USAGE ON SCHEMA public TO anon, authenticated;

-- =============================================================================
-- ALSO: Re-apply RLS policies with explicit TO anon / TO authenticated clauses
-- to make the intent unambiguous. Using DROP IF EXISTS + CREATE is safe to
-- re-run multiple times.
-- =============================================================================

-- ── Products ──────────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "Public can view published products" ON public.products;
CREATE POLICY "Public can view published products"
  ON public.products FOR SELECT
  TO anon
  USING (status IN ('published', 'reserved', 'sold'));

-- ── Brands ────────────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "Public can view active brands" ON public.brands;
CREATE POLICY "Public can view active brands"
  ON public.brands FOR SELECT
  TO anon
  USING (active = true);

-- ── Categories ────────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "Public can view active categories" ON public.categories;
CREATE POLICY "Public can view active categories"
  ON public.categories FOR SELECT
  TO anon
  USING (active = true);

-- ── FAQ ───────────────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "Public can view active faq" ON public.faq;
CREATE POLICY "Public can view active faq"
  ON public.faq FOR SELECT
  TO anon
  USING (active = true);

-- ── Contact settings ──────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "Public can view active contact settings" ON public.contact_settings;
CREATE POLICY "Public can view active contact settings"
  ON public.contact_settings FOR SELECT
  TO anon
  USING (active = true);

-- ── Social links ──────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "Public can view active social links" ON public.social_links;
CREATE POLICY "Public can view active social links"
  ON public.social_links FOR SELECT
  TO anon
  USING (active = true);

-- ── Homepage sections ─────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "Public can view active homepage sections" ON public.homepage_sections;
CREATE POLICY "Public can view active homepage sections"
  ON public.homepage_sections FOR SELECT
  TO anon
  USING (active = true);

-- ── Contact submissions ───────────────────────────────────────────────────────
DROP POLICY IF EXISTS "Anyone can submit contact form" ON public.contact_submissions;
CREATE POLICY "Anyone can submit contact form"
  ON public.contact_submissions FOR INSERT
  TO anon
  WITH CHECK (true);

-- =============================================================================
-- VERIFICATION QUERIES
-- Run these after applying to confirm anon can read each table.
-- All counts should be > 0 if data exists.
-- =============================================================================
--
-- SELECT 'faq'              AS tbl, count(*) FROM faq              WHERE active = true
-- UNION ALL
-- SELECT 'contact_settings',         count(*) FROM contact_settings WHERE active = true
-- UNION ALL
-- SELECT 'social_links',             count(*) FROM social_links     WHERE active = true
-- UNION ALL
-- SELECT 'products',                 count(*) FROM products         WHERE status IN ('published','reserved','sold')
-- UNION ALL
-- SELECT 'brands',                   count(*) FROM brands           WHERE active = true
-- UNION ALL
-- SELECT 'categories',               count(*) FROM categories       WHERE active = true;
