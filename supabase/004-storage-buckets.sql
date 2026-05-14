-- =============================================================================
-- JAPANESE MACHINERY PREMIUM WEBSITE - STORAGE BUCKETS
-- =============================================================================
-- Run this SQL in Supabase SQL Editor to create storage buckets
-- =============================================================================

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('products', 'products', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp']),
  ('brands', 'brands', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']),
  ('categories', 'categories', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp']),
  ('homepage', 'homepage', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp'])
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- =============================================================================
-- STORAGE POLICIES - Products Bucket
-- =============================================================================

-- Allow public read access to product images
CREATE POLICY "Public can view product images"
ON storage.objects FOR SELECT
USING (bucket_id = 'products');

-- Allow authenticated admins to upload product images
CREATE POLICY "Admins can upload product images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'products' 
  AND EXISTS (
    SELECT 1 FROM admins
    WHERE clerk_user_id = (current_setting('request.jwt.claims', true)::json->>'sub')
    AND active = true
  )
);

-- Allow authenticated admins to update product images
CREATE POLICY "Admins can update product images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'products'
  AND EXISTS (
    SELECT 1 FROM admins
    WHERE clerk_user_id = (current_setting('request.jwt.claims', true)::json->>'sub')
    AND active = true
  )
);

-- Allow authenticated admins to delete product images
CREATE POLICY "Admins can delete product images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'products'
  AND EXISTS (
    SELECT 1 FROM admins
    WHERE clerk_user_id = (current_setting('request.jwt.claims', true)::json->>'sub')
    AND active = true
  )
);

-- =============================================================================
-- STORAGE POLICIES - Brands Bucket
-- =============================================================================

CREATE POLICY "Public can view brand images"
ON storage.objects FOR SELECT
USING (bucket_id = 'brands');

CREATE POLICY "Admins can upload brand images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'brands'
  AND EXISTS (
    SELECT 1 FROM admins
    WHERE clerk_user_id = (current_setting('request.jwt.claims', true)::json->>'sub')
    AND active = true
  )
);

CREATE POLICY "Admins can update brand images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'brands'
  AND EXISTS (
    SELECT 1 FROM admins
    WHERE clerk_user_id = (current_setting('request.jwt.claims', true)::json->>'sub')
    AND active = true
  )
);

CREATE POLICY "Admins can delete brand images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'brands'
  AND EXISTS (
    SELECT 1 FROM admins
    WHERE clerk_user_id = (current_setting('request.jwt.claims', true)::json->>'sub')
    AND active = true
  )
);

-- =============================================================================
-- STORAGE POLICIES - Categories Bucket
-- =============================================================================

CREATE POLICY "Public can view category images"
ON storage.objects FOR SELECT
USING (bucket_id = 'categories');

CREATE POLICY "Admins can upload category images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'categories'
  AND EXISTS (
    SELECT 1 FROM admins
    WHERE clerk_user_id = (current_setting('request.jwt.claims', true)::json->>'sub')
    AND active = true
  )
);

CREATE POLICY "Admins can update category images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'categories'
  AND EXISTS (
    SELECT 1 FROM admins
    WHERE clerk_user_id = (current_setting('request.jwt.claims', true)::json->>'sub')
    AND active = true
  )
);

CREATE POLICY "Admins can delete category images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'categories'
  AND EXISTS (
    SELECT 1 FROM admins
    WHERE clerk_user_id = (current_setting('request.jwt.claims', true)::json->>'sub')
    AND active = true
  )
);

-- =============================================================================
-- STORAGE POLICIES - Homepage Bucket
-- =============================================================================

CREATE POLICY "Public can view homepage images"
ON storage.objects FOR SELECT
USING (bucket_id = 'homepage');

CREATE POLICY "Admins can upload homepage images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'homepage'
  AND EXISTS (
    SELECT 1 FROM admins
    WHERE clerk_user_id = (current_setting('request.jwt.claims', true)::json->>'sub')
    AND active = true
  )
);

CREATE POLICY "Admins can update homepage images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'homepage'
  AND EXISTS (
    SELECT 1 FROM admins
    WHERE clerk_user_id = (current_setting('request.jwt.claims', true)::json->>'sub')
    AND active = true
  )
);

CREATE POLICY "Admins can delete homepage images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'homepage'
  AND EXISTS (
    SELECT 1 FROM admins
    WHERE clerk_user_id = (current_setting('request.jwt.claims', true)::json->>'sub')
    AND active = true
  )
);
