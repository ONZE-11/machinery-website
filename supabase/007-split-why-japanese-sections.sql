-- =============================================================================
-- MIGRATION 007 — Split why_japanese into two independent sections
-- =============================================================================
-- why_japanese_home → homepage WhyJapanese section only
-- why_japanese_page → /por-que-maquinaria-japonesa page only
-- =============================================================================

-- Step 1: Rename existing why_japanese row → why_japanese_home
UPDATE homepage_sections
SET
  section_key  = 'why_japanese_home',
  title        = '¿Por Qué Maquinaria Japonesa?',
  subtitle     = 'La Diferencia Japonesa',
  content      = 'La maquinaria japonesa es reconocida mundialmente por su calidad de fabricación excepcional, durabilidad legendaria y bajo coste operativo.',
  cta_text     = 'Descubrir Más',
  cta_link     = '/por-que-maquinaria-japonesa',
  display_order = 3
WHERE section_key = 'why_japanese';

-- Step 2: Insert new why_japanese_page row for the standalone page
INSERT INTO homepage_sections (section_key, title, subtitle, content, cta_text, cta_link, display_order, active)
VALUES (
  'why_japanese_page',
  '¿Por Qué Elegir Maquinaria Japonesa?',
  'Excelencia Japonesa',
  'Japón es sinónimo de calidad, innovación y excelencia en la fabricación de maquinaria industrial. Descubra las razones por las que las empresas líderes del mundo confían en la tecnología japonesa.',
  'Ver Catálogo',
  '/catalogo',
  5,
  true
)
ON CONFLICT (section_key) DO NOTHING;
