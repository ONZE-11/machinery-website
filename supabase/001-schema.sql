-- =============================================================================
-- JAPANESE MACHINERY PREMIUM WEBSITE - DATABASE SCHEMA
-- =============================================================================
-- Run this SQL in Supabase SQL Editor to create all required tables
-- Make sure to run 002-rls-policies.sql after this file
-- =============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================================================
-- CATEGORIES TABLE
-- =============================================================================

CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  image TEXT,
  icon VARCHAR(50),
  seo_title VARCHAR(70),
  seo_description VARCHAR(160),
  display_order INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_categories_active ON categories(active);
CREATE INDEX idx_categories_display_order ON categories(display_order);

-- =============================================================================
-- BRANDS TABLE
-- =============================================================================

CREATE TABLE IF NOT EXISTS brands (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  country VARCHAR(100) DEFAULT 'Japón',
  description TEXT,
  logo TEXT,
  hero_image TEXT,
  founded_year INTEGER,
  seo_title VARCHAR(70),
  seo_description VARCHAR(160),
  display_order INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_brands_slug ON brands(slug);
CREATE INDEX idx_brands_active ON brands(active);
CREATE INDEX idx_brands_display_order ON brands(display_order);

-- =============================================================================
-- PRODUCTS TABLE
-- =============================================================================

CREATE TYPE product_condition AS ENUM ('excelente', 'muy_bueno', 'bueno', 'aceptable');
CREATE TYPE product_status AS ENUM ('draft', 'published', 'sold', 'reserved');

CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug VARCHAR(200) UNIQUE NOT NULL,
  title VARCHAR(200) NOT NULL,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  brand_id UUID REFERENCES brands(id) ON DELETE SET NULL,
  model VARCHAR(100),
  year INTEGER,
  condition product_condition DEFAULT 'bueno',
  hours_used INTEGER,
  weight DECIMAL(10,2),
  specifications JSONB,
  description TEXT NOT NULL,
  short_description VARCHAR(500),
  featured BOOLEAN DEFAULT false,
  hero_image TEXT NOT NULL,
  gallery_images TEXT[] DEFAULT '{}',
  price_on_request BOOLEAN DEFAULT true,
  price DECIMAL(12,2),
  seo_title VARCHAR(70),
  seo_description VARCHAR(160),
  status product_status DEFAULT 'draft',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_brand ON products(brand_id);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_products_featured ON products(featured);
CREATE INDEX idx_products_created_at ON products(created_at DESC);

-- Full text search index for products
CREATE INDEX idx_products_search ON products USING GIN (
  to_tsvector('spanish', coalesce(title, '') || ' ' || coalesce(model, '') || ' ' || coalesce(description, ''))
);

-- Trigger to update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =============================================================================
-- HOMEPAGE SECTIONS TABLE
-- =============================================================================

CREATE TABLE IF NOT EXISTS homepage_sections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  section_key VARCHAR(50) UNIQUE NOT NULL,
  title VARCHAR(200),
  subtitle VARCHAR(300),
  content TEXT,
  image TEXT,
  cta_text VARCHAR(100),
  cta_link VARCHAR(500),
  display_order INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_homepage_sections_key ON homepage_sections(section_key);
CREATE INDEX idx_homepage_sections_active ON homepage_sections(active);

CREATE TRIGGER update_homepage_sections_updated_at
  BEFORE UPDATE ON homepage_sections
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =============================================================================
-- FAQ TABLE
-- =============================================================================

CREATE TABLE IF NOT EXISTS faq (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question VARCHAR(500) NOT NULL,
  answer TEXT NOT NULL,
  category VARCHAR(100),
  display_order INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_faq_active ON faq(active);
CREATE INDEX idx_faq_category ON faq(category);
CREATE INDEX idx_faq_display_order ON faq(display_order);

-- =============================================================================
-- CONTACT SETTINGS TABLE
-- =============================================================================

CREATE TABLE IF NOT EXISTS contact_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  setting_key VARCHAR(50) UNIQUE NOT NULL,
  value TEXT NOT NULL,
  label VARCHAR(100),
  active BOOLEAN DEFAULT true,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_contact_settings_key ON contact_settings(setting_key);

CREATE TRIGGER update_contact_settings_updated_at
  BEFORE UPDATE ON contact_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =============================================================================
-- SOCIAL LINKS TABLE
-- =============================================================================

CREATE TABLE IF NOT EXISTS social_links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  platform VARCHAR(50) NOT NULL,
  url TEXT NOT NULL,
  icon VARCHAR(50),
  display_order INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_social_links_active ON social_links(active);
CREATE INDEX idx_social_links_display_order ON social_links(display_order);

-- =============================================================================
-- ADMINS TABLE
-- =============================================================================

CREATE TYPE admin_role AS ENUM ('super_admin', 'admin', 'editor');

CREATE TABLE IF NOT EXISTS admins (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  clerk_user_id VARCHAR(200) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(200),
  role admin_role DEFAULT 'editor',
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_admins_clerk_user_id ON admins(clerk_user_id);
CREATE INDEX idx_admins_email ON admins(email);
CREATE INDEX idx_admins_active ON admins(active);

-- =============================================================================
-- CONTACT SUBMISSIONS TABLE (for lead tracking)
-- =============================================================================

CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  company VARCHAR(200),
  product_interest VARCHAR(200),
  message TEXT NOT NULL,
  ip_address VARCHAR(45),
  user_agent TEXT,
  read BOOLEAN DEFAULT false,
  replied BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_contact_submissions_created_at ON contact_submissions(created_at DESC);
CREATE INDEX idx_contact_submissions_read ON contact_submissions(read);

-- =============================================================================
-- ANALYTICS EVENTS TABLE (optional, for basic tracking)
-- =============================================================================

CREATE TABLE IF NOT EXISTS analytics_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_type VARCHAR(50) NOT NULL,
  event_data JSONB,
  page_path VARCHAR(500),
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_analytics_events_type ON analytics_events(event_type);
CREATE INDEX idx_analytics_events_created_at ON analytics_events(created_at DESC);
CREATE INDEX idx_analytics_events_product ON analytics_events(product_id);
