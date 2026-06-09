-- =============================================================================
-- FIX: Public RLS policies for products, brands, categories, social_links
-- =============================================================================
-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor → New query).
--
-- Problem: The original policy only allowed anon SELECT where status='published',
-- but the app queries for published + reserved + sold so reserved/sold products
-- were silently blocked by RLS and never appeared on the public site.
--
-- Fix: Drop the old single-status policy and replace it with one that allows
-- all three visitor-visible statuses.  Brands/categories/social_links already
-- had correct policies in 002-rls-policies.sql; they are re-stated here to
-- make it easy to verify they exist in your Supabase project.
-- =============================================================================

-- ── Products ──────────────────────────────────────────────────────────────────

-- Remove the too-restrictive original policy (ignore error if already dropped)
DROP POLICY IF EXISTS "Public can view published products" ON products;

-- Allow anon to see any product that a visitor should be able to see
CREATE POLICY "Public can view published products"
  ON products FOR SELECT
  USING (status IN ('published', 'reserved', 'sold'));

-- ── Brands ────────────────────────────────────────────────────────────────────
-- Verify / recreate in case 002-rls-policies.sql was never applied

DROP POLICY IF EXISTS "Public can view active brands" ON brands;
CREATE POLICY "Public can view active brands"
  ON brands FOR SELECT
  USING (active = true);

-- ── Categories ────────────────────────────────────────────────────────────────

DROP POLICY IF EXISTS "Public can view active categories" ON categories;
CREATE POLICY "Public can view active categories"
  ON categories FOR SELECT
  USING (active = true);

-- ── Social links ──────────────────────────────────────────────────────────────

DROP POLICY IF EXISTS "Public can view active social links" ON social_links;
CREATE POLICY "Public can view active social links"
  ON social_links FOR SELECT
  USING (active = true);

-- ── Contact settings ──────────────────────────────────────────────────────────

DROP POLICY IF EXISTS "Public can view active contact settings" ON contact_settings;
CREATE POLICY "Public can view active contact settings"
  ON contact_settings FOR SELECT
  USING (active = true);

-- ── FAQ ───────────────────────────────────────────────────────────────────────

DROP POLICY IF EXISTS "Public can view active faq" ON faq;
CREATE POLICY "Public can view active faq"
  ON faq FOR SELECT
  USING (active = true);

-- ── Homepage sections ─────────────────────────────────────────────────────────

DROP POLICY IF EXISTS "Public can view active homepage sections" ON homepage_sections;
CREATE POLICY "Public can view active homepage sections"
  ON homepage_sections FOR SELECT
  USING (active = true);

-- =============================================================================
-- VERIFICATION QUERY
-- Run this after applying the policies to confirm anon can read data.
-- Expected: at least one row per table if data exists.
-- =============================================================================
--
-- SELECT 'products' AS tbl, count(*) FROM products WHERE status IN ('published','reserved','sold')
-- UNION ALL
-- SELECT 'brands',    count(*) FROM brands    WHERE active = true
-- UNION ALL
-- SELECT 'categories',count(*) FROM categories WHERE active = true
-- UNION ALL
-- SELECT 'social_links',count(*) FROM social_links WHERE active = true;
