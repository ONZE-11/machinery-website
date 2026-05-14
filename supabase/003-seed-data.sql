-- =============================================================================
-- JAPANESE MACHINERY PREMIUM WEBSITE - SEED DATA
-- =============================================================================
-- Run this SQL in Supabase SQL Editor AFTER running 001-schema.sql
-- This populates your database with initial data
-- =============================================================================

-- =============================================================================
-- CATEGORIES
-- =============================================================================

INSERT INTO categories (slug, name, description, icon, seo_title, seo_description, display_order, active) VALUES
('mini-excavadoras', 'Mini Excavadoras', 'Mini excavadoras japonesas de alta precisión para trabajos de construcción y movimiento de tierras. Equipos compactos con potencia excepcional.', 'excavator', 'Mini Excavadoras Japonesas | Kubota, Yanmar, Komatsu', 'Descubre nuestra selección de mini excavadoras japonesas de segunda mano. Marcas premium como Kubota, Yanmar y Komatsu con garantía de calidad.', 1, true),
('mini-tractores', 'Mini Tractores', 'Mini tractores japoneses versátiles para agricultura, jardinería y mantenimiento. Fiabilidad japonesa en formato compacto.', 'tractor', 'Mini Tractores Japoneses | Iseki, Kubota, Yanmar', 'Mini tractores japoneses de segunda mano importados directamente de Japón. Calidad premium para agricultura y jardinería profesional.', 2, true),
('mini-cargadoras', 'Mini Cargadoras', 'Mini cargadoras compactas japonesas para obras, almacenes y espacios reducidos. Maniobrabilidad excepcional.', 'loader', 'Mini Cargadoras Japonesas | Maquinaria Compacta', 'Mini cargadoras japonesas de alta calidad. Equipos compactos ideales para construcción, agricultura y trabajos industriales.', 3, true),
('elevadores-compactos', 'Elevadores Compactos', 'Elevadores y plataformas de trabajo japonesas. Seguridad y precisión para trabajos en altura.', 'lift', 'Elevadores Compactos Japoneses | Plataformas de Trabajo', 'Elevadores y plataformas elevadoras japonesas de segunda mano. Seguridad certificada y mantenimiento garantizado.', 4, true),
('equipos-construccion', 'Equipos de Construcción', 'Equipos de construcción compactos japoneses. Rodillos, compactadores y maquinaria especializada.', 'construction', 'Equipos de Construcción Japoneses | Maquinaria Especializada', 'Equipos de construcción japoneses de segunda mano. Rodillos, compactadores y maquinaria especializada de alta calidad.', 5, true);

-- =============================================================================
-- BRANDS
-- =============================================================================

INSERT INTO brands (slug, name, country, description, founded_year, seo_title, seo_description, display_order, active) VALUES
('kubota', 'Kubota', 'Japón', 'Kubota Corporation es uno de los fabricantes de maquinaria más respetados del mundo. Fundada en 1890 en Osaka, Japón, Kubota es sinónimo de innovación, durabilidad y precisión japonesa. Sus mini excavadoras y tractores son reconocidos mundialmente por su fiabilidad excepcional y bajo consumo de combustible.', 1890, 'Kubota España | Mini Excavadoras y Tractores Japoneses', 'Distribuidor de maquinaria Kubota en España. Mini excavadoras, tractores y equipos compactos japoneses de segunda mano con garantía.', 1, true),
('yanmar', 'Yanmar', 'Japón', 'Yanmar es pionero mundial en motores diésel compactos y maquinaria de construcción. Desde 1912, Yanmar ha revolucionado la industria con tecnología de vanguardia y compromiso con la sostenibilidad. Sus mini excavadoras destacan por su eficiencia energética y rendimiento superior.', 1912, 'Yanmar España | Maquinaria Japonesa de Alta Calidad', 'Maquinaria Yanmar de segunda mano en España. Mini excavadoras y equipos de construcción japoneses con tecnología de vanguardia.', 2, true),
('komatsu', 'Komatsu', 'Japón', 'Komatsu Ltd. es el segundo fabricante de equipos de construcción más grande del mundo. Fundada en 1921, Komatsu combina robustez industrial con la precisión japonesa. Sus máquinas son conocidas por su longevidad excepcional y tecnología inteligente.', 1921, 'Komatsu España | Excavadoras y Maquinaria Pesada', 'Maquinaria Komatsu de segunda mano importada de Japón. Excavadoras y equipos de construcción con la robustez y calidad japonesa.', 3, true),
('iseki', 'Iseki', 'Japón', 'Iseki & Co. es especialista en tractores compactos y maquinaria agrícola desde 1926. Con casi un siglo de experiencia, Iseki ofrece tractores pequeños pero potentes, perfectos para agricultura intensiva, viñedos y jardinería profesional.', 1926, 'Iseki España | Mini Tractores Japoneses para Agricultura', 'Tractores Iseki de segunda mano en España. Mini tractores japoneses ideales para agricultura, viñedos y jardinería profesional.', 4, true),
('hinowa', 'Hinowa', 'Japón', 'Hinowa se especializa en plataformas elevadoras y equipos de acceso compactos. Sus máquinas oruga son ideales para terrenos difíciles y espacios estrechos, combinando seguridad japonesa con versatilidad europea.', 1987, 'Hinowa España | Plataformas Elevadoras Compactas', 'Plataformas Hinowa de segunda mano. Elevadores compactos tipo oruga para trabajos en altura con máxima seguridad.', 5, true);

-- =============================================================================
-- HOMEPAGE SECTIONS
-- =============================================================================

INSERT INTO homepage_sections (section_key, title, subtitle, content, cta_text, cta_link, display_order, active) VALUES
('hero', 'Maquinaria Japonesa Premium', 'Calidad Japonesa. Potencia Real.', 'Importamos directamente de Japón la mejor maquinaria compacta del mundo. Mini excavadoras, tractores y equipos de construcción con la precisión y fiabilidad que solo Japón puede ofrecer.', 'Ver Catálogo', '/catalogo', 1, true),
('hero_secondary', 'Especialistas en Maquinaria Japonesa', 'Más de 20 años importando calidad', 'Somos el referente en España para maquinaria japonesa de segunda mano. Cada máquina es inspeccionada, certificada y entregada lista para trabajar.', 'Contactar', '/contacto', 2, true),
('why_japanese', '¿Por Qué Maquinaria Japonesa?', 'La diferencia está en los detalles', 'La maquinaria japonesa es reconocida mundialmente por su excepcional calidad de fabricación, durabilidad legendaria y bajo coste de mantenimiento. En Japón, las máquinas se mantienen con estándares impecables.', 'Descubrir Más', '/por-que-maquinaria-japonesa', 3, true),
('trust', 'Confianza y Garantía', 'Su tranquilidad es nuestra prioridad', 'Ofrecemos garantía en todas nuestras máquinas, servicio técnico especializado y asesoramiento profesional. No vendemos equipos, construimos relaciones.', 'Sobre Nosotros', '/sobre-nosotros', 4, true);

-- =============================================================================
-- FAQ
-- =============================================================================

INSERT INTO faq (question, answer, category, display_order, active) VALUES
('¿Por qué elegir maquinaria japonesa de segunda mano?', 'La maquinaria japonesa de segunda mano ofrece una relación calidad-precio excepcional. En Japón, las máquinas se mantienen con estándares muy estrictos y las horas de trabajo son verificables. Una excavadora japonesa con 2,000 horas puede estar en mejores condiciones que una europea con 500 horas.', 'general', 1, true),
('¿Las máquinas incluyen garantía?', 'Sí, todas nuestras máquinas incluyen garantía. El periodo de garantía varía según el tipo de equipo y su estado, pero típicamente ofrecemos entre 3 y 12 meses de garantía en motor y sistema hidráulico. Consulte los detalles específicos de cada máquina.', 'garantia', 2, true),
('¿Cómo verifican las horas de trabajo de las máquinas?', 'Todas nuestras máquinas vienen con documentación japonesa original que certifica las horas de trabajo. Además, realizamos inspecciones técnicas independientes y verificamos el historial de mantenimiento. Las horas indicadas son siempre reales y verificables.', 'compra', 3, true),
('¿Realizan envíos a toda España?', 'Sí, entregamos maquinaria en toda España peninsular e islas. Disponemos de transporte especializado propio y colaboramos con empresas de transporte de maquinaria pesada certificadas. El coste de transporte se calcula según destino y dimensiones.', 'envio', 4, true),
('¿Ofrecen financiación para la compra de maquinaria?', 'Colaboramos con entidades financieras especializadas en maquinaria para ofrecer opciones de financiación, leasing y renting. Podemos estudiar su caso particular y ofrecerle la mejor solución adaptada a sus necesidades.', 'financiacion', 5, true),
('¿Puedo ver las máquinas antes de comprar?', 'Por supuesto. Disponemos de instalaciones donde puede ver y probar las máquinas disponibles. También podemos organizar videollamadas para mostrarle equipos específicos si no puede desplazarse. Trabajamos con total transparencia.', 'compra', 6, true),
('¿Tienen servicio técnico y recambios?', 'Sí, disponemos de taller propio con técnicos especializados en maquinaria japonesa. También suministramos recambios originales y compatibles para todas las marcas que comercializamos: Kubota, Yanmar, Komatsu, Iseki y más.', 'servicio', 7, true),
('¿Las máquinas están homologadas para España?', 'Todas las máquinas que vendemos cumplen con la normativa CE y están listas para su matriculación y uso en España. Nos encargamos de toda la documentación necesaria para la importación y homologación.', 'legal', 8, true);

-- =============================================================================
-- CONTACT SETTINGS
-- =============================================================================

INSERT INTO contact_settings (setting_key, value, label, active) VALUES
('phone', '+34 601 080 799', 'Teléfono principal', true),
('whatsapp', '34601080799', 'WhatsApp', true),
('email', 'info@maquinariajaponesa.es', 'Email principal', true),
('address', 'Polígono Industrial El Ejemplo, Nave 42, 28000 Madrid, España', 'Dirección', true),
('hours', 'Lunes a Viernes: 9:00 - 18:00 | Sábados: 9:00 - 14:00', 'Horario', true);

-- =============================================================================
-- SOCIAL LINKS
-- =============================================================================

INSERT INTO social_links (platform, url, icon, display_order, active) VALUES
('whatsapp', 'https://wa.me/34601080799', 'whatsapp', 1, true),
('instagram', 'https://instagram.com/maquinariajaponesa', 'instagram', 2, true),
('tiktok', 'https://tiktok.com/@maquinariajaponesa', 'tiktok', 3, true),
('youtube', 'https://youtube.com/@maquinariajaponesa', 'youtube', 4, true);

-- =============================================================================
-- INITIAL ADMIN (Update with your Clerk user ID after setup)
-- =============================================================================

-- Uncomment and update with your actual Clerk user ID after setting up Clerk
-- INSERT INTO admins (clerk_user_id, email, name, role, active) VALUES
-- ('user_xxxxxxxxxxxxx', 'admin@maquinariajaponesa.es', 'Administrador', 'super_admin', true);
