-- =============================================================================
-- PRODUCTS RECOVERY SEED
-- =============================================================================
-- Run this AFTER 001-schema.sql, 002-rls-policies.sql, 003-seed-data.sql
-- Safe to re-run: all inserts use ON CONFLICT DO UPDATE (upsert).
--
-- Recovers:
--   • Toyota brand   (missing from 003-seed-data.sql)
--   • carretillas-elevadoras category (missing from 003-seed-data.sql)
--   • Brand logo + hero_image paths (public asset paths, pre-Storage)
--   • Category image paths (pre-Storage)
--   • All 7 products with full specifications, descriptions, images
--
-- hero_image / gallery_images use paths served from Next.js public/ directory.
-- Replace with Supabase Storage URLs after uploading via Phase C upload tool.
-- =============================================================================


-- ─── Missing brand: Toyota ───────────────────────────────────────────────────

INSERT INTO brands (slug, name, country, description, founded_year, seo_title, seo_description, display_order, active)
VALUES (
  'toyota',
  'Toyota',
  'Japón',
  'Toyota Industries Corporation es el fabricante de carretillas elevadoras número uno del mundo desde 1956. Reconocida por su filosofía de producción "Toyota Production System", sus carretillas destacan por la fiabilidad excepcional, bajo coste operativo y longevidad sin igual en entornos industriales exigentes.',
  1956,
  'Toyota España | Carretillas Elevadoras Japonesas',
  'Carretillas elevadoras Toyota de segunda mano en España. Líder mundial en manutención industrial importado directamente de Japón.',
  6,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  name            = EXCLUDED.name,
  country         = EXCLUDED.country,
  description     = EXCLUDED.description,
  founded_year    = EXCLUDED.founded_year,
  seo_title       = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  display_order   = EXCLUDED.display_order,
  active          = EXCLUDED.active;


-- ─── Missing category: carretillas-elevadoras ────────────────────────────────

INSERT INTO categories (slug, name, description, icon, seo_title, seo_description, display_order, active)
VALUES (
  'carretillas-elevadoras',
  'Carretillas Elevadoras',
  'Carretillas elevadoras japonesas para almacenes, puertos y logística industrial. Ingeniería de precisión japonesa para la industria.',
  'forklift',
  'Carretillas Elevadoras Japonesas | Forklifts de Alta Calidad',
  'Carretillas elevadoras japonesas de segunda mano importadas directamente de Japón. Fiabilidad industrial certificada para almacenes y puertos.',
  6,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  name            = EXCLUDED.name,
  description     = EXCLUDED.description,
  icon            = EXCLUDED.icon,
  seo_title       = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  display_order   = EXCLUDED.display_order,
  active          = EXCLUDED.active;


-- ─── Products ────────────────────────────────────────────────────────────────
-- All products: status=published, price_on_request=true, price=null
-- gallery_images: repeat hero_image — replace with real gallery after upload

INSERT INTO products (
  slug, title, category_id, brand_id,
  model, year, condition, hours_used, weight,
  specifications, description, short_description,
  featured, hero_image, gallery_images,
  price_on_request, price,
  seo_title, seo_description, status
) VALUES

-- ── 1. Kubota KX61-3 ─────────────────────────────────────────────────────────
(
  'kubota-kx61-3-mini-excavadora',
  'Kubota KX61-3 Mini Excavadora',
  (SELECT id FROM categories WHERE slug = 'mini-excavadoras'),
  (SELECT id FROM brands WHERE slug = 'kubota'),
  'KX61-3', 2019, 'excelente', 1850, 2800.00,
  '{"Motor":"Kubota D1703-M-E3B","Potencia":"17.8 kW / 24.2 HP","Peso operativo":"2,800 kg","Profundidad de excavación":"3,490 mm","Capacidad del cucharón":"0.11 m³","Ancho de transporte":"1,550 mm","Cabina":"ROPS/FOPS cerrada con A/C"}'::jsonb,
  $desc$<p>Presentamos esta excepcional <strong>Kubota KX61-3</strong>, una mini excavadora premium importada directamente de Japón con solo 1,850 horas de trabajo.</p>
<p>Esta máquina representa lo mejor de la ingeniería japonesa: precisión milimétrica, fiabilidad probada y eficiencia de combustible líder en su clase.</p>
<h3>Características destacadas:</h3>
<ul>
  <li>Motor Kubota de 3 cilindros con bajo consumo</li>
  <li>Sistema hidráulico de carga sensible</li>
  <li>Cabina cerrada con aire acondicionado</li>
  <li>Rotación de 360° sin restricciones</li>
  <li>Mantenimiento al día con historial completo</li>
</ul>
<p>Ideal para obras urbanas, trabajos de jardinería profesional y construcción en espacios reducidos.</p>$desc$,
  'Mini excavadora Kubota premium con cabina cerrada y A/C. Solo 1,850 horas. Importada de Japón.',
  true,
  '/images/products/product-kubota-kx61-3.jpg',
  ARRAY['/images/products/product-kubota-kx61-3.jpg', '/images/products/product-kubota-kx61-3.jpg', '/images/products/product-kubota-kx61-3.jpg'],
  true, null,
  'Kubota KX61-3 Mini Excavadora | Segunda Mano España',
  'Mini excavadora Kubota KX61-3 de segunda mano. 2019, 1850 horas, cabina con A/C. Importada de Japón con garantía.',
  'published'
),

-- ── 2. Yanmar ViO55-6A ───────────────────────────────────────────────────────
(
  'yanmar-vio55-6a-excavadora-compacta',
  'Yanmar ViO55-6A Excavadora Compacta',
  (SELECT id FROM categories WHERE slug = 'mini-excavadoras'),
  (SELECT id FROM brands WHERE slug = 'yanmar'),
  'ViO55-6A', 2020, 'excelente', 1200, 5400.00,
  '{"Motor":"Yanmar 4TNV98C","Potencia":"35.8 kW / 48.7 HP","Peso operativo":"5,400 kg","Profundidad de excavación":"3,830 mm","Capacidad del cucharón":"0.16 m³","Sistema":"ViO Zero Tail Swing","Cabina":"ROPS/FOPS cerrada con A/C"}'::jsonb,
  $desc$<p>La <strong>Yanmar ViO55-6A</strong> es la excavadora compacta definitiva para profesionales exigentes. Con el revolucionario sistema ViO de giro cero, esta máquina puede trabajar pegada a paredes y en esquinas sin riesgo de colisión.</p>
<p>Importada directamente de Japón con apenas 1,200 horas, esta unidad ha sido mantenida con los más altos estándares japoneses.</p>
<h3>Ventajas del sistema ViO:</h3>
<ul>
  <li>Rotación completa sin voladizo trasero</li>
  <li>Trabajo seguro junto a obstáculos</li>
  <li>Mayor productividad en espacios reducidos</li>
  <li>Menor fatiga del operador</li>
</ul>$desc$,
  'Excavadora compacta Yanmar con sistema ViO de giro cero. 1,200 horas, condición excelente.',
  true,
  '/images/products/product-yanmar-vio55-6a.jpg',
  ARRAY['/images/products/product-yanmar-vio55-6a.jpg', '/images/products/product-yanmar-vio55-6a.jpg'],
  true, null,
  'Yanmar ViO55-6A Excavadora Compacta | Zero Tail Swing',
  'Excavadora Yanmar ViO55-6A con sistema de giro cero. 2020, 1200 horas. Ideal para trabajos en espacios reducidos.',
  'published'
),

-- ── 3. Kubota B2420 Mini Tractor ─────────────────────────────────────────────
(
  'kubota-b2420-mini-tractor',
  'Kubota B2420 Mini Tractor',
  (SELECT id FROM categories WHERE slug = 'mini-tractores'),
  (SELECT id FROM brands WHERE slug = 'kubota'),
  'B2420', 2018, 'muy_bueno', 980, 1050.00,
  '{"Motor":"Kubota D1105","Potencia":"18 kW / 24 HP","Transmisión":"HST (Hydrostatic)","Tracción":"4WD","PTO":"540 rpm","Elevador":"3 puntos Cat. I","Capacidad elevación":"600 kg"}'::jsonb,
  $desc$<p>El <strong>Kubota B2420</strong> es el mini tractor perfecto para agricultura intensiva, viñedos, invernaderos y mantenimiento de fincas.</p>
<p>Con transmisión hidrostática HST y tracción 4WD, ofrece una maniobrabilidad excepcional y facilidad de uso incomparable.</p>
<h3>Aplicaciones ideales:</h3>
<ul>
  <li>Cultivo entre hileras de viñedos</li>
  <li>Mantenimiento de jardines y parques</li>
  <li>Trabajos en invernaderos</li>
  <li>Transporte ligero con remolque</li>
  <li>Siega y desbrozado</li>
</ul>$desc$,
  'Mini tractor Kubota 4WD con transmisión hidrostática. Perfecto para agricultura y jardinería.',
  true,
  '/images/products/product-kubota-b2420.jpg',
  ARRAY['/images/products/product-kubota-b2420.jpg', '/images/products/product-kubota-b2420.jpg'],
  true, null,
  'Kubota B2420 Mini Tractor 4WD | Segunda Mano',
  'Mini tractor Kubota B2420 con transmisión HST y 4WD. 2018, solo 980 horas. Ideal para viñedos y jardinería.',
  'published'
),

-- ── 4. Komatsu PC30MR-3 ──────────────────────────────────────────────────────
(
  'komatsu-pc30mr-3-mini-excavadora',
  'Komatsu PC30MR-3 Mini Excavadora',
  (SELECT id FROM categories WHERE slug = 'mini-excavadoras'),
  (SELECT id FROM brands WHERE slug = 'komatsu'),
  'PC30MR-3', 2017, 'muy_bueno', 2400, 3100.00,
  '{"Motor":"Komatsu 3D82AE-6","Potencia":"20.1 kW / 27.4 HP","Peso operativo":"3,100 kg","Profundidad de excavación":"2,830 mm","Fuerza de excavación":"27.5 kN","Sistema":"MR (Minimum Radius)","Cabina":"ROPS cerrada"}'::jsonb,
  $desc$<p>La <strong>Komatsu PC30MR-3</strong> combina la legendaria durabilidad Komatsu con un diseño de radio mínimo para máxima versatilidad.</p>
<p>Ideal para trabajos de demolición controlada, excavación de zanjas y obras urbanas donde el espacio es limitado.</p>$desc$,
  'Mini excavadora Komatsu con diseño de radio mínimo. Robustez japonesa para trabajos exigentes.',
  false,
  '/images/products/product-komatsu-pc30mr-3.jpg',
  ARRAY['/images/products/product-komatsu-pc30mr-3.jpg', '/images/products/product-komatsu-pc30mr-3.jpg'],
  true, null,
  'Komatsu PC30MR-3 Mini Excavadora | Radio Mínimo',
  'Mini excavadora Komatsu PC30MR-3 de segunda mano. 2017, 2400 horas. Diseño compacto de radio mínimo.',
  'published'
),

-- ── 5. Iseki TG5470 ──────────────────────────────────────────────────────────
(
  'iseki-tg5470-mini-tractor',
  'Iseki TG5470 Mini Tractor',
  (SELECT id FROM categories WHERE slug = 'mini-tractores'),
  (SELECT id FROM brands WHERE slug = 'iseki'),
  'TG5470', 2019, 'excelente', 650, 1680.00,
  '{"Motor":"Iseki E4CG","Potencia":"40 kW / 54 HP","Transmisión":"Synchro Shuttle 12F/12R","Tracción":"4WD","PTO":"540/1000 rpm","Elevador":"3 puntos Cat. II","Capacidad elevación":"1,200 kg"}'::jsonb,
  $desc$<p>El <strong>Iseki TG5470</strong> es un tractor compacto pero potente, diseñado para agricultores profesionales que necesitan rendimiento sin comprometer la maniobrabilidad.</p>
<p>Con apenas 650 horas, esta unidad está prácticamente nueva y lista para años de trabajo productivo.</p>$desc$,
  'Tractor compacto Iseki de 54 HP con solo 650 horas. Potencia profesional, tamaño compacto.',
  true,
  '/images/products/product-iseki-tg5470.jpg',
  ARRAY['/images/products/product-iseki-tg5470.jpg', '/images/products/product-iseki-tg5470.jpg'],
  true, null,
  'Iseki TG5470 Tractor Compacto 54 HP | Segunda Mano',
  'Tractor Iseki TG5470 de segunda mano. 2019, 650 horas, 54 HP. Potencia profesional en formato compacto.',
  'published'
),

-- ── 6. Hinowa Lightlift 17.75 ────────────────────────────────────────────────
(
  'hinowa-lightlift-17-75-elevador',
  'Hinowa Lightlift 17.75 Elevador',
  (SELECT id FROM categories WHERE slug = 'elevadores-compactos'),
  (SELECT id FROM brands WHERE slug = 'hinowa'),
  'Lightlift 17.75', 2020, 'excelente', 420, 2350.00,
  '{"Altura de trabajo":"17.30 m","Alcance horizontal":"7.50 m","Capacidad cesta":"230 kg","Tipo tracción":"Orugas de goma","Motor":"Diesel/Eléctrico","Pendiente máxima":"30%","Dimensiones plegada":"4.82 x 0.79 x 1.99 m"}'::jsonb,
  $desc$<p>La <strong>Hinowa Lightlift 17.75</strong> es la plataforma elevadora de orugas más versátil del mercado. Accede a terrenos difíciles donde otras máquinas no pueden llegar.</p>
<p>Con doble motorización diesel/eléctrica, puede trabajar tanto en exteriores como en interiores con cero emisiones.</p>$desc$,
  'Plataforma elevadora de orugas Hinowa. 17m de altura, solo 420 horas. Acceso a cualquier terreno.',
  false,
  '/images/products/product-hinowa-lightlift-17-75.jpg',
  ARRAY['/images/products/product-hinowa-lightlift-17-75.jpg', '/images/products/product-hinowa-lightlift-17-75.jpg'],
  true, null,
  'Hinowa Lightlift 17.75 Plataforma Elevadora | Orugas',
  'Plataforma elevadora Hinowa Lightlift 17.75 de segunda mano. 2020, 420 horas. Orugas para terreno difícil.',
  'published'
),

-- ── 7. Toyota 8FG25 ──────────────────────────────────────────────────────────
(
  'toyota-8fg25-carretilla-elevadora',
  'Toyota 8FG25 Carretilla Elevadora',
  (SELECT id FROM categories WHERE slug = 'carretillas-elevadoras'),
  (SELECT id FROM brands WHERE slug = 'toyota'),
  '8FG25', 2018, 'muy_bueno', 3200, 4140.00,
  '{"Motor":"Toyota 4Y-E (GLP/Gasolina)","Capacidad de carga":"2,500 kg","Centro de carga":"500 mm","Altura de elevación":"3,000 mm","Tipo de mástil":"Estándar 2 etapas (FSV)","Transmisión":"Convertidor de par automático","Neumáticos":"Macizos cushion","Radio de giro":"2,380 mm"}'::jsonb,
  $desc$<p>La <strong>Toyota 8FG25</strong> es una carretilla elevadora contrabalanzada de la reconocida serie 8 de Toyota Industries, líder mundial en equipos de manutención con más de 65 años de experiencia.</p>
<p>Con capacidad de 2,500 kg y motor Toyota 4Y-E GLP/gasolina, esta unidad ha sido importada directamente de Japón con historial de mantenimiento completo y documentado.</p>
<h3>Características principales:</h3>
<ul>
  <li>Motor Toyota 4Y-E de alta eficiencia (GLP/Gasolina intercambiable)</li>
  <li>Transmisión automática con convertidor de par para máxima productividad</li>
  <li>Dirección hidráulica asistida de respuesta precisa</li>
  <li>Cabina ergonómica con asiento suspendido y visibilidad superior</li>
  <li>Sistema de control de carga con indicador electrónico</li>
  <li>Mantenimiento preventivo completo al día con documentación japonesa</li>
</ul>
<p>Ideal para almacenes logísticos, plataformas portuarias y operaciones industriales que exigen fiabilidad continua en turnos intensivos.</p>$desc$,
  'Carretilla elevadora Toyota 8FG25 de 2,500 kg. Motor GLP/gasolina, 3,200 horas. Historial de mantenimiento japonés completo.',
  true,
  '/images/products/product-toyota-8fg25.jpg',
  ARRAY['/images/products/product-toyota-8fg25.jpg', '/images/products/product-toyota-8fg25.jpg'],
  true, null,
  'Toyota 8FG25 Carretilla Elevadora 2,500 kg | Segunda Mano',
  'Carretilla elevadora Toyota 8FG25 de segunda mano. 2018, 3200 horas, motor GLP/gasolina. Importada de Japón con garantía.',
  'published'
)

ON CONFLICT (slug) DO UPDATE SET
  title           = EXCLUDED.title,
  category_id     = EXCLUDED.category_id,
  brand_id        = EXCLUDED.brand_id,
  model           = EXCLUDED.model,
  year            = EXCLUDED.year,
  condition       = EXCLUDED.condition,
  hours_used      = EXCLUDED.hours_used,
  weight          = EXCLUDED.weight,
  specifications  = EXCLUDED.specifications,
  description     = EXCLUDED.description,
  short_description = EXCLUDED.short_description,
  featured        = EXCLUDED.featured,
  hero_image      = EXCLUDED.hero_image,
  gallery_images  = EXCLUDED.gallery_images,
  price_on_request = EXCLUDED.price_on_request,
  price           = EXCLUDED.price,
  seo_title       = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  status          = EXCLUDED.status,
  updated_at      = NOW();


-- ─── Verify ──────────────────────────────────────────────────────────────────
-- Run this after the inserts to confirm all 7 products landed correctly:
--
-- SELECT p.slug, p.title, b.name AS brand, c.name AS category,
--        p.year, p.hours_used, p.condition, p.status, p.featured
-- FROM products p
-- LEFT JOIN brands b ON b.id = p.brand_id
-- LEFT JOIN categories c ON c.id = p.category_id
-- ORDER BY p.created_at;
