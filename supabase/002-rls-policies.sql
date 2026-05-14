-- =============================================================================
-- JAPANESE MACHINERY PREMIUM WEBSITE - ROW LEVEL SECURITY POLICIES
-- =============================================================================
-- Run this SQL in Supabase SQL Editor AFTER running 001-schema.sql
-- These policies ensure data security for your production environment
-- =============================================================================

-- =============================================================================
-- ENABLE RLS ON ALL TABLES
-- =============================================================================

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE homepage_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE faq ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

-- =============================================================================
-- HELPER FUNCTION: Check if user is admin
-- =============================================================================

CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  -- Check if the current user's Clerk ID exists in the admins table
  RETURN EXISTS (
    SELECT 1 FROM admins
    WHERE clerk_user_id = current_setting('request.jwt.claims', true)::json->>'sub'
    AND active = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================================================
-- CATEGORIES POLICIES
-- =============================================================================

-- Public can read active categories
CREATE POLICY "Public can view active categories"
  ON categories FOR SELECT
  USING (active = true);

-- Only admins can insert/update/delete
CREATE POLICY "Admins can insert categories"
  ON categories FOR INSERT
  WITH CHECK (is_admin());

CREATE POLICY "Admins can update categories"
  ON categories FOR UPDATE
  USING (is_admin());

CREATE POLICY "Admins can delete categories"
  ON categories FOR DELETE
  USING (is_admin());

-- =============================================================================
-- BRANDS POLICIES
-- =============================================================================

-- Public can read active brands
CREATE POLICY "Public can view active brands"
  ON brands FOR SELECT
  USING (active = true);

-- Only admins can insert/update/delete
CREATE POLICY "Admins can insert brands"
  ON brands FOR INSERT
  WITH CHECK (is_admin());

CREATE POLICY "Admins can update brands"
  ON brands FOR UPDATE
  USING (is_admin());

CREATE POLICY "Admins can delete brands"
  ON brands FOR DELETE
  USING (is_admin());

-- =============================================================================
-- PRODUCTS POLICIES
-- =============================================================================

-- Public can read published products
CREATE POLICY "Public can view published products"
  ON products FOR SELECT
  USING (status = 'published');

-- Admins can see all products
CREATE POLICY "Admins can view all products"
  ON products FOR SELECT
  USING (is_admin());

-- Only admins can insert/update/delete
CREATE POLICY "Admins can insert products"
  ON products FOR INSERT
  WITH CHECK (is_admin());

CREATE POLICY "Admins can update products"
  ON products FOR UPDATE
  USING (is_admin());

CREATE POLICY "Admins can delete products"
  ON products FOR DELETE
  USING (is_admin());

-- =============================================================================
-- HOMEPAGE SECTIONS POLICIES
-- =============================================================================

-- Public can read active homepage sections
CREATE POLICY "Public can view active homepage sections"
  ON homepage_sections FOR SELECT
  USING (active = true);

-- Only admins can insert/update/delete
CREATE POLICY "Admins can insert homepage sections"
  ON homepage_sections FOR INSERT
  WITH CHECK (is_admin());

CREATE POLICY "Admins can update homepage sections"
  ON homepage_sections FOR UPDATE
  USING (is_admin());

CREATE POLICY "Admins can delete homepage sections"
  ON homepage_sections FOR DELETE
  USING (is_admin());

-- =============================================================================
-- FAQ POLICIES
-- =============================================================================

-- Public can read active FAQs
CREATE POLICY "Public can view active faq"
  ON faq FOR SELECT
  USING (active = true);

-- Only admins can insert/update/delete
CREATE POLICY "Admins can insert faq"
  ON faq FOR INSERT
  WITH CHECK (is_admin());

CREATE POLICY "Admins can update faq"
  ON faq FOR UPDATE
  USING (is_admin());

CREATE POLICY "Admins can delete faq"
  ON faq FOR DELETE
  USING (is_admin());

-- =============================================================================
-- CONTACT SETTINGS POLICIES
-- =============================================================================

-- Public can read active contact settings
CREATE POLICY "Public can view active contact settings"
  ON contact_settings FOR SELECT
  USING (active = true);

-- Only admins can insert/update/delete
CREATE POLICY "Admins can insert contact settings"
  ON contact_settings FOR INSERT
  WITH CHECK (is_admin());

CREATE POLICY "Admins can update contact settings"
  ON contact_settings FOR UPDATE
  USING (is_admin());

CREATE POLICY "Admins can delete contact settings"
  ON contact_settings FOR DELETE
  USING (is_admin());

-- =============================================================================
-- SOCIAL LINKS POLICIES
-- =============================================================================

-- Public can read active social links
CREATE POLICY "Public can view active social links"
  ON social_links FOR SELECT
  USING (active = true);

-- Only admins can insert/update/delete
CREATE POLICY "Admins can insert social links"
  ON social_links FOR INSERT
  WITH CHECK (is_admin());

CREATE POLICY "Admins can update social links"
  ON social_links FOR UPDATE
  USING (is_admin());

CREATE POLICY "Admins can delete social links"
  ON social_links FOR DELETE
  USING (is_admin());

-- =============================================================================
-- ADMINS POLICIES
-- =============================================================================

-- Only super_admins can view admin list
CREATE POLICY "Super admins can view admins"
  ON admins FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM admins
      WHERE clerk_user_id = current_setting('request.jwt.claims', true)::json->>'sub'
      AND role = 'super_admin'
      AND active = true
    )
  );

-- Only super_admins can manage admins
CREATE POLICY "Super admins can insert admins"
  ON admins FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admins
      WHERE clerk_user_id = current_setting('request.jwt.claims', true)::json->>'sub'
      AND role = 'super_admin'
      AND active = true
    )
  );

CREATE POLICY "Super admins can update admins"
  ON admins FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM admins
      WHERE clerk_user_id = current_setting('request.jwt.claims', true)::json->>'sub'
      AND role = 'super_admin'
      AND active = true
    )
  );

CREATE POLICY "Super admins can delete admins"
  ON admins FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM admins
      WHERE clerk_user_id = current_setting('request.jwt.claims', true)::json->>'sub'
      AND role = 'super_admin'
      AND active = true
    )
  );

-- =============================================================================
-- CONTACT SUBMISSIONS POLICIES
-- =============================================================================

-- Anyone can insert contact submissions (for the contact form)
CREATE POLICY "Anyone can submit contact form"
  ON contact_submissions FOR INSERT
  WITH CHECK (true);

-- Only admins can view/update contact submissions
CREATE POLICY "Admins can view contact submissions"
  ON contact_submissions FOR SELECT
  USING (is_admin());

CREATE POLICY "Admins can update contact submissions"
  ON contact_submissions FOR UPDATE
  USING (is_admin());

CREATE POLICY "Admins can delete contact submissions"
  ON contact_submissions FOR DELETE
  USING (is_admin());

-- =============================================================================
-- ANALYTICS EVENTS POLICIES
-- =============================================================================

-- Anyone can insert analytics events
CREATE POLICY "Anyone can insert analytics events"
  ON analytics_events FOR INSERT
  WITH CHECK (true);

-- Only admins can view analytics
CREATE POLICY "Admins can view analytics events"
  ON analytics_events FOR SELECT
  USING (is_admin());

-- =============================================================================
-- GRANT SERVICE ROLE FULL ACCESS
-- =============================================================================
-- The service role (used in server-side code) bypasses RLS automatically
-- This is useful for admin operations that need full access
