// =============================================================================
// MOCK DATA - Japanese Machinery Premium Website
// =============================================================================
// This file contains placeholder data for development without Supabase
// Replace with real database queries when integrations are connected
// =============================================================================

import type { Product, Category, Brand, HomepageSection, FAQ, ContactSettings, SocialLink } from '@/types/database'

// =============================================================================
// CATEGORIES
// =============================================================================

export const mockCategories: Category[] = [
  {
    id: '1',
    slug: 'mini-excavadoras',
    name: 'Mini Excavadoras',
    description: 'Mini excavadoras japonesas de alta precisión para trabajos de construcción y movimiento de tierras. Equipos compactos con potencia excepcional.',
    image: '/images/categories/mini-excavadoras.jpg',
    icon: 'excavator',
    seo_title: 'Mini Excavadoras Japonesas | Kubota, Yanmar, Komatsu',
    seo_description: 'Descubre nuestra selección de mini excavadoras japonesas de segunda mano. Marcas premium como Kubota, Yanmar y Komatsu con garantía de calidad.',
    display_order: 1,
    active: true,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    slug: 'mini-tractores',
    name: 'Mini Tractores',
    description: 'Mini tractores japoneses versátiles para agricultura, jardinería y mantenimiento. Fiabilidad japonesa en formato compacto.',
    image: '/images/categories/mini-tractores.jpg',
    icon: 'tractor',
    seo_title: 'Mini Tractores Japoneses | Iseki, Kubota, Yanmar',
    seo_description: 'Mini tractores japoneses de segunda mano importados directamente de Japón. Calidad premium para agricultura y jardinería profesional.',
    display_order: 2,
    active: true,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    slug: 'mini-cargadoras',
    name: 'Mini Cargadoras',
    description: 'Mini cargadoras compactas japonesas para obras, almacenes y espacios reducidos. Maniobrabilidad excepcional.',
    image: '/images/categories/mini-cargadoras.jpg',
    icon: 'loader',
    seo_title: 'Mini Cargadoras Japonesas | Maquinaria Compacta',
    seo_description: 'Mini cargadoras japonesas de alta calidad. Equipos compactos ideales para construcción, agricultura y trabajos industriales.',
    display_order: 3,
    active: true,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '4',
    slug: 'elevadores-compactos',
    name: 'Elevadores Compactos',
    description: 'Elevadores y plataformas de trabajo japonesas. Seguridad y precisión para trabajos en altura.',
    image: '/images/categories/elevadores.jpg',
    icon: 'lift',
    seo_title: 'Elevadores Compactos Japoneses | Plataformas de Trabajo',
    seo_description: 'Elevadores y plataformas elevadoras japonesas de segunda mano. Seguridad certificada y mantenimiento garantizado.',
    display_order: 4,
    active: true,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '5',
    slug: 'equipos-construccion',
    name: 'Equipos de Construcción',
    description: 'Equipos de construcción compactos japoneses. Rodillos, compactadores y maquinaria especializada.',
    image: '/images/categories/construccion.jpg',
    icon: 'construction',
    seo_title: 'Equipos de Construcción Japoneses | Maquinaria Especializada',
    seo_description: 'Equipos de construcción japoneses de segunda mano. Rodillos, compactadores y maquinaria especializada de alta calidad.',
    display_order: 5,
    active: true,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '6',
    slug: 'carretillas-elevadoras',
    name: 'Carretillas Elevadoras',
    description: 'Carretillas elevadoras japonesas para almacenes, puertos y logística industrial. Ingeniería de precisión japonesa para la industria.',
    image: '/images/categories/carretillas.jpg',
    icon: 'forklift',
    seo_title: 'Carretillas Elevadoras Japonesas | Forklifts de Alta Calidad',
    seo_description: 'Carretillas elevadoras japonesas de segunda mano importadas directamente de Japón. Fiabilidad industrial certificada para almacenes y puertos.',
    display_order: 6,
    active: true,
    created_at: '2024-01-01T00:00:00Z'
  }
]

// =============================================================================
// BRANDS
// =============================================================================

export const mockBrands: Brand[] = [
  {
    id: '1',
    slug: 'kubota',
    name: 'Kubota',
    country: 'Japón',
    description: 'Kubota Corporation es uno de los fabricantes de maquinaria más respetados del mundo. Fundada en 1890 en Osaka, Japón, Kubota es sinónimo de innovación, durabilidad y precisión japonesa. Sus mini excavadoras y tractores son reconocidos mundialmente por su fiabilidad excepcional y bajo consumo de combustible.',
    logo: '/images/brands/kubota-logo.png',
    hero_image: '/images/brands/kubota-hero.jpg',
    founded_year: 1890,
    seo_title: 'Kubota España | Mini Excavadoras y Tractores Japoneses',
    seo_description: 'Distribuidor de maquinaria Kubota en España. Mini excavadoras, tractores y equipos compactos japoneses de segunda mano con garantía.',
    display_order: 1,
    active: true,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    slug: 'yanmar',
    name: 'Yanmar',
    country: 'Japón',
    description: 'Yanmar es pionero mundial en motores diésel compactos y maquinaria de construcción. Desde 1912, Yanmar ha revolucionado la industria con tecnología de vanguardia y compromiso con la sostenibilidad. Sus mini excavadoras destacan por su eficiencia energética y rendimiento superior.',
    logo: '/images/brands/yanmar-logo.png',
    hero_image: '/images/brands/yanmar-hero.jpg',
    founded_year: 1912,
    seo_title: 'Yanmar España | Maquinaria Japonesa de Alta Calidad',
    seo_description: 'Maquinaria Yanmar de segunda mano en España. Mini excavadoras y equipos de construcción japoneses con tecnología de vanguardia.',
    display_order: 2,
    active: true,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    slug: 'komatsu',
    name: 'Komatsu',
    country: 'Japón',
    description: 'Komatsu Ltd. es el segundo fabricante de equipos de construcción más grande del mundo. Fundada en 1921, Komatsu combina robustez industrial con la precisión japonesa. Sus máquinas son conocidas por su longevidad excepcional y tecnología inteligente.',
    logo: '/images/brands/komatsu-logo.png',
    hero_image: '/images/brands/komatsu-hero.jpg',
    founded_year: 1921,
    seo_title: 'Komatsu España | Excavadoras y Maquinaria Pesada',
    seo_description: 'Maquinaria Komatsu de segunda mano importada de Japón. Excavadoras y equipos de construcción con la robustez y calidad japonesa.',
    display_order: 3,
    active: true,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '4',
    slug: 'iseki',
    name: 'Iseki',
    country: 'Japón',
    description: 'Iseki & Co. es especialista en tractores compactos y maquinaria agrícola desde 1926. Con casi un siglo de experiencia, Iseki ofrece tractores pequeños pero potentes, perfectos para agricultura intensiva, viñedos y jardinería profesional.',
    logo: '/images/brands/iseki-logo.png',
    hero_image: '/images/brands/iseki-hero.jpg',
    founded_year: 1926,
    seo_title: 'Iseki España | Mini Tractores Japoneses para Agricultura',
    seo_description: 'Tractores Iseki de segunda mano en España. Mini tractores japoneses ideales para agricultura, viñedos y jardinería profesional.',
    display_order: 4,
    active: true,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '5',
    slug: 'hinowa',
    name: 'Hinowa',
    country: 'Japón',
    description: 'Hinowa se especializa en plataformas elevadoras y equipos de acceso compactos. Sus máquinas oruga son ideales para terrenos difíciles y espacios estrechos, combinando seguridad japonesa con versatilidad europea.',
    logo: '/images/brands/hinowa-logo.png',
    hero_image: '/images/brands/hinowa-hero.jpg',
    founded_year: 1987,
    seo_title: 'Hinowa España | Plataformas Elevadoras Compactas',
    seo_description: 'Plataformas Hinowa de segunda mano. Elevadores compactos tipo oruga para trabajos en altura con máxima seguridad.',
    display_order: 5,
    active: true,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '6',
    slug: 'toyota',
    name: 'Toyota',
    country: 'Japón',
    description: 'Toyota Industries Corporation es el fabricante de carretillas elevadoras número uno del mundo desde 1956. Reconocida por su filosofía de producción "Toyota Production System", sus carretillas destacan por la fiabilidad excepcional, bajo coste operativo y longevidad sin igual en entornos industriales exigentes.',
    logo: '/images/brands/toyota-logo.png',
    hero_image: '/images/brands/toyota-hero.jpg',
    founded_year: 1956,
    seo_title: 'Toyota España | Carretillas Elevadoras Japonesas',
    seo_description: 'Carretillas elevadoras Toyota de segunda mano en España. Líder mundial en manutención industrial importado directamente de Japón.',
    display_order: 6,
    active: true,
    created_at: '2024-01-01T00:00:00Z'
  }
]

// =============================================================================
// PRODUCTS
// =============================================================================

export const mockProducts: Product[] = [
  {
    id: '1',
    slug: 'kubota-kx61-3-mini-excavadora',
    title: 'Kubota KX61-3 Mini Excavadora',
    category_id: '1',
    brand_id: '1',
    model: 'KX61-3',
    year: 2019,
    condition: 'excelente',
    hours_used: 1850,
    weight: 2800,
    specifications: {
      'Motor': 'Kubota D1703-M-E3B',
      'Potencia': '17.8 kW / 24.2 HP',
      'Peso operativo': '2,800 kg',
      'Profundidad de excavación': '3,490 mm',
      'Capacidad del cucharón': '0.11 m³',
      'Ancho de transporte': '1,550 mm',
      'Cabina': 'ROPS/FOPS cerrada con A/C'
    },
    description: `<p>Presentamos esta excepcional <strong>Kubota KX61-3</strong>, una mini excavadora premium importada directamente de Japón con solo 1,850 horas de trabajo.</p>
    <p>Esta máquina representa lo mejor de la ingeniería japonesa: precisión milimétrica, fiabilidad probada y eficiencia de combustible líder en su clase.</p>
    <h3>Características destacadas:</h3>
    <ul>
      <li>Motor Kubota de 3 cilindros con bajo consumo</li>
      <li>Sistema hidráulico de carga sensible</li>
      <li>Cabina cerrada con aire acondicionado</li>
      <li>Rotación de 360° sin restricciones</li>
      <li>Mantenimiento al día con historial completo</li>
    </ul>
    <p>Ideal para obras urbanas, trabajos de jardinería profesional y construcción en espacios reducidos.</p>`,
    short_description: 'Mini excavadora Kubota premium con cabina cerrada y A/C. Solo 1,850 horas. Importada de Japón.',
    featured: true,
    hero_image: '/images/products/kubota-excavator.jpg',
    gallery_images: [
      '/images/products/kubota-excavator.jpg',
      '/images/products/kubota-excavator.jpg',
      '/images/products/kubota-excavator.jpg',
      '/images/products/kubota-excavator.jpg'
    ],
    price_on_request: true,
    price: null,
    seo_title: 'Kubota KX61-3 Mini Excavadora | Segunda Mano España',
    seo_description: 'Mini excavadora Kubota KX61-3 de segunda mano. 2019, 1850 horas, cabina con A/C. Importada de Japón con garantía.',
    status: 'published',
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z'
  },
  {
    id: '2',
    slug: 'yanmar-vio55-6a-excavadora-compacta',
    title: 'Yanmar ViO55-6A Excavadora Compacta',
    category_id: '1',
    brand_id: '2',
    model: 'ViO55-6A',
    year: 2020,
    condition: 'excelente',
    hours_used: 1200,
    weight: 5400,
    specifications: {
      'Motor': 'Yanmar 4TNV98C',
      'Potencia': '35.8 kW / 48.7 HP',
      'Peso operativo': '5,400 kg',
      'Profundidad de excavación': '3,830 mm',
      'Capacidad del cucharón': '0.16 m³',
      'Sistema': 'ViO Zero Tail Swing',
      'Cabina': 'ROPS/FOPS cerrada con A/C'
    },
    description: `<p>La <strong>Yanmar ViO55-6A</strong> es la excavadora compacta definitiva para profesionales exigentes. Con el revolucionario sistema ViO de giro cero, esta máquina puede trabajar pegada a paredes y en esquinas sin riesgo de colisión.</p>
    <p>Importada directamente de Japón con apenas 1,200 horas, esta unidad ha sido mantenida con los más altos estándares japoneses.</p>
    <h3>Ventajas del sistema ViO:</h3>
    <ul>
      <li>Rotación completa sin voladizo trasero</li>
      <li>Trabajo seguro junto a obstáculos</li>
      <li>Mayor productividad en espacios reducidos</li>
      <li>Menor fatiga del operador</li>
    </ul>`,
    short_description: 'Excavadora compacta Yanmar con sistema ViO de giro cero. 1,200 horas, condición excelente.',
    featured: true,
    hero_image: '/images/products/kubota-excavator.jpg',
    gallery_images: [
      '/images/products/kubota-excavator.jpg',
      '/images/products/kubota-excavator.jpg',
      '/images/products/kubota-excavator.jpg'
    ],
    price_on_request: true,
    price: null,
    seo_title: 'Yanmar ViO55-6A Excavadora Compacta | Zero Tail Swing',
    seo_description: 'Excavadora Yanmar ViO55-6A con sistema de giro cero. 2020, 1200 horas. Ideal para trabajos en espacios reducidos.',
    status: 'published',
    created_at: '2024-02-01T00:00:00Z',
    updated_at: '2024-02-01T00:00:00Z'
  },
  {
    id: '3',
    slug: 'kubota-b2420-mini-tractor',
    title: 'Kubota B2420 Mini Tractor',
    category_id: '2',
    brand_id: '1',
    model: 'B2420',
    year: 2018,
    condition: 'muy_bueno',
    hours_used: 980,
    weight: 1050,
    specifications: {
      'Motor': 'Kubota D1105',
      'Potencia': '18 kW / 24 HP',
      'Transmisión': 'HST (Hydrostatic)',
      'Tracción': '4WD',
      'PTO': '540 rpm',
      'Elevador': '3 puntos Cat. I',
      'Capacidad elevación': '600 kg'
    },
    description: `<p>El <strong>Kubota B2420</strong> es el mini tractor perfecto para agricultura intensiva, viñedos, invernaderos y mantenimiento de fincas.</p>
    <p>Con transmisión hidrostática HST y tracción 4WD, ofrece una maniobrabilidad excepcional y facilidad de uso incomparable.</p>
    <h3>Aplicaciones ideales:</h3>
    <ul>
      <li>Cultivo entre hileras de viñedos</li>
      <li>Mantenimiento de jardines y parques</li>
      <li>Trabajos en invernaderos</li>
      <li>Transporte ligero con remolque</li>
      <li>Siega y desbrozado</li>
    </ul>`,
    short_description: 'Mini tractor Kubota 4WD con transmisión hidrostática. Perfecto para agricultura y jardinería.',
    featured: true,
    hero_image: '/images/products/yanmar-tractor.jpg',
    gallery_images: [
      '/images/products/yanmar-tractor.jpg',
      '/images/products/yanmar-tractor.jpg'
    ],
    price_on_request: true,
    price: null,
    seo_title: 'Kubota B2420 Mini Tractor 4WD | Segunda Mano',
    seo_description: 'Mini tractor Kubota B2420 con transmisión HST y 4WD. 2018, solo 980 horas. Ideal para viñedos y jardinería.',
    status: 'published',
    created_at: '2024-02-10T00:00:00Z',
    updated_at: '2024-02-10T00:00:00Z'
  },
  {
    id: '4',
    slug: 'komatsu-pc30mr-3-mini-excavadora',
    title: 'Komatsu PC30MR-3 Mini Excavadora',
    category_id: '1',
    brand_id: '3',
    model: 'PC30MR-3',
    year: 2017,
    condition: 'muy_bueno',
    hours_used: 2400,
    weight: 3100,
    specifications: {
      'Motor': 'Komatsu 3D82AE-6',
      'Potencia': '20.1 kW / 27.4 HP',
      'Peso operativo': '3,100 kg',
      'Profundidad de excavación': '2,830 mm',
      'Fuerza de excavación': '27.5 kN',
      'Sistema': 'MR (Minimum Radius)',
      'Cabina': 'ROPS cerrada'
    },
    description: `<p>La <strong>Komatsu PC30MR-3</strong> combina la legendaria durabilidad Komatsu con un diseño de radio mínimo para máxima versatilidad.</p>
    <p>Ideal para trabajos de demolición controlada, excavación de zanjas y obras urbanas donde el espacio es limitado.</p>`,
    short_description: 'Mini excavadora Komatsu con diseño de radio mínimo. Robustez japonesa para trabajos exigentes.',
    featured: false,
    hero_image: '/images/products/komatsu-loader.jpg',
    gallery_images: [
      '/images/products/komatsu-loader.jpg',
      '/images/products/komatsu-loader.jpg'
    ],
    price_on_request: true,
    price: null,
    seo_title: 'Komatsu PC30MR-3 Mini Excavadora | Radio Mínimo',
    seo_description: 'Mini excavadora Komatsu PC30MR-3 de segunda mano. 2017, 2400 horas. Diseño compacto de radio mínimo.',
    status: 'published',
    created_at: '2024-02-15T00:00:00Z',
    updated_at: '2024-02-15T00:00:00Z'
  },
  {
    id: '5',
    slug: 'iseki-tg5470-mini-tractor',
    title: 'Iseki TG5470 Mini Tractor',
    category_id: '2',
    brand_id: '4',
    model: 'TG5470',
    year: 2019,
    condition: 'excelente',
    hours_used: 650,
    weight: 1680,
    specifications: {
      'Motor': 'Iseki E4CG',
      'Potencia': '40 kW / 54 HP',
      'Transmisión': 'Synchro Shuttle 12F/12R',
      'Tracción': '4WD',
      'PTO': '540/1000 rpm',
      'Elevador': '3 puntos Cat. II',
      'Capacidad elevación': '1,200 kg'
    },
    description: `<p>El <strong>Iseki TG5470</strong> es un tractor compacto pero potente, diseñado para agricultores profesionales que necesitan rendimiento sin comprometer la maniobrabilidad.</p>
    <p>Con apenas 650 horas, esta unidad está prácticamente nueva y lista para años de trabajo productivo.</p>`,
    short_description: 'Tractor compacto Iseki de 54 HP con solo 650 horas. Potencia profesional, tamaño compacto.',
    featured: true,
    hero_image: '/images/products/iseki-tractor.jpg',
    gallery_images: [
      '/images/products/iseki-tractor.jpg',
      '/images/products/iseki-tractor.jpg'
    ],
    price_on_request: true,
    price: null,
    seo_title: 'Iseki TG5470 Tractor Compacto 54 HP | Segunda Mano',
    seo_description: 'Tractor Iseki TG5470 de segunda mano. 2019, 650 horas, 54 HP. Potencia profesional en formato compacto.',
    status: 'published',
    created_at: '2024-02-20T00:00:00Z',
    updated_at: '2024-02-20T00:00:00Z'
  },
  {
    id: '6',
    slug: 'hinowa-lightlift-17-75-elevador',
    title: 'Hinowa Lightlift 17.75 Elevador',
    category_id: '4',
    brand_id: '5',
    model: 'Lightlift 17.75',
    year: 2020,
    condition: 'excelente',
    hours_used: 420,
    weight: 2350,
    specifications: {
      'Altura de trabajo': '17.30 m',
      'Alcance horizontal': '7.50 m',
      'Capacidad cesta': '230 kg',
      'Tipo tracción': 'Orugas de goma',
      'Motor': 'Diesel/Eléctrico',
      'Pendiente máxima': '30%',
      'Dimensiones plegada': '4.82 x 0.79 x 1.99 m'
    },
    description: `<p>La <strong>Hinowa Lightlift 17.75</strong> es la plataforma elevadora de orugas más versátil del mercado. Accede a terrenos difíciles donde otras máquinas no pueden llegar.</p>
    <p>Con doble motorización diesel/eléctrica, puede trabajar tanto en exteriores como en interiores con cero emisiones.</p>`,
    short_description: 'Plataforma elevadora de orugas Hinowa. 17m de altura, solo 420 horas. Acceso a cualquier terreno.',
    featured: false,
    hero_image: '/images/products/hinowa-dumper.jpg',
    gallery_images: [
      '/images/products/hinowa-dumper.jpg',
      '/images/products/hinowa-dumper.jpg'
    ],
    price_on_request: true,
    price: null,
    seo_title: 'Hinowa Lightlift 17.75 Plataforma Elevadora | Orugas',
    seo_description: 'Plataforma elevadora Hinowa Lightlift 17.75 de segunda mano. 2020, 420 horas. Orugas para terreno difícil.',
    status: 'published',
    created_at: '2024-03-01T00:00:00Z',
    updated_at: '2024-03-01T00:00:00Z'
  },
  {
    id: '7',
    slug: 'toyota-8fg25-carretilla-elevadora',
    title: 'Toyota 8FG25 Carretilla Elevadora',
    category_id: '6',
    brand_id: '6',
    model: '8FG25',
    year: 2018,
    condition: 'muy_bueno',
    hours_used: 3200,
    weight: 4140,
    specifications: {
      'Motor': 'Toyota 4Y-E (GLP/Gasolina)',
      'Capacidad de carga': '2,500 kg',
      'Centro de carga': '500 mm',
      'Altura de elevación': '3,000 mm',
      'Tipo de mástil': 'Estándar 2 etapas (FSV)',
      'Transmisión': 'Convertidor de par automático',
      'Neumáticos': 'Macizos cushion',
      'Radio de giro': '2,380 mm'
    },
    description: `<p>La <strong>Toyota 8FG25</strong> es una carretilla elevadora contrabalanzada de la reconocida serie 8 de Toyota Industries, líder mundial en equipos de manutención con más de 65 años de experiencia.</p>
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
    <p>Ideal para almacenes logísticos, plataformas portuarias y operaciones industriales que exigen fiabilidad continua en turnos intensivos.</p>`,
    short_description: 'Carretilla elevadora Toyota 8FG25 de 2,500 kg. Motor GLP/gasolina, 3,200 horas. Historial de mantenimiento japonés completo.',
    featured: true,
    hero_image: '/images/placeholder-machinery.jpg',
    gallery_images: [
      '/images/placeholder-machinery.jpg',
      '/images/placeholder-machinery.jpg'
    ],
    price_on_request: true,
    price: null,
    seo_title: 'Toyota 8FG25 Carretilla Elevadora 2,500 kg | Segunda Mano',
    seo_description: 'Carretilla elevadora Toyota 8FG25 de segunda mano. 2018, 3200 horas, motor GLP/gasolina. Importada de Japón con garantía.',
    status: 'published',
    created_at: '2024-03-10T00:00:00Z',
    updated_at: '2024-03-10T00:00:00Z'
  }
]

// Add category and brand references to products
export const getProductsWithRelations = (): Product[] => {
  return mockProducts.map(product => ({
    ...product,
    category: mockCategories.find(c => c.id === product.category_id),
    brand: mockBrands.find(b => b.id === product.brand_id)
  }))
}

// =============================================================================
// HOMEPAGE SECTIONS
// =============================================================================

export const mockHomepageSections: HomepageSection[] = [
  {
    id: '1',
    section_key: 'hero',
    title: 'Maquinaria Japonesa Premium',
    subtitle: 'Calidad Japonesa. Potencia Real.',
    content: 'Importamos directamente de Japón la mejor maquinaria compacta del mundo. Mini excavadoras, tractores y equipos de construcción con la precisión y fiabilidad que solo Japón puede ofrecer.',
    image: '/images/hero-main.jpg',
    cta_text: 'Ver Catálogo',
    cta_link: '/catalogo',
    display_order: 1,
    active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    section_key: 'hero_secondary',
    title: 'Especialistas en Maquinaria Japonesa',
    subtitle: 'Más de 20 años importando calidad',
    content: 'Somos el referente en España para maquinaria japonesa de segunda mano. Cada máquina es inspeccionada, certificada y entregada lista para trabajar.',
    image: '/images/hero-secondary.jpg',
    cta_text: 'Contactar',
    cta_link: '/contacto',
    display_order: 2,
    active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    section_key: 'why_japanese',
    title: '¿Por Qué Maquinaria Japonesa?',
    subtitle: 'La diferencia está en los detalles',
    content: 'La maquinaria japonesa es reconocida mundialmente por su excepcional calidad de fabricación, durabilidad legendaria y bajo coste de mantenimiento. En Japón, las máquinas se mantienen con estándares impecables.',
    image: '/images/why-japanese.jpg',
    cta_text: 'Descubrir Más',
    cta_link: '/por-que-maquinaria-japonesa',
    display_order: 3,
    active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '4',
    section_key: 'trust',
    title: 'Confianza y Garantía',
    subtitle: 'Su tranquilidad es nuestra prioridad',
    content: 'Ofrecemos garantía en todas nuestras máquinas, servicio técnico especializado y asesoramiento profesional. No vendemos equipos, construimos relaciones.',
    image: null,
    cta_text: 'Sobre Nosotros',
    cta_link: '/sobre-nosotros',
    display_order: 4,
    active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  }
]

// =============================================================================
// FAQ
// =============================================================================

export const mockFAQs: FAQ[] = [
  {
    id: '1',
    question: '¿Por qué elegir maquinaria japonesa de segunda mano?',
    answer: 'La maquinaria japonesa de segunda mano ofrece una relación calidad-precio excepcional. En Japón, las máquinas se mantienen con estándares muy estrictos y las horas de trabajo son verificables. Una excavadora japonesa con 2,000 horas puede estar en mejores condiciones que una europea con 500 horas.',
    category: 'general',
    display_order: 1,
    active: true,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    question: '¿Las máquinas incluyen garantía?',
    answer: 'Sí, todas nuestras máquinas incluyen garantía. El periodo de garantía varía según el tipo de equipo y su estado, pero típicamente ofrecemos entre 3 y 12 meses de garantía en motor y sistema hidráulico. Consulte los detalles específicos de cada máquina.',
    category: 'garantia',
    display_order: 2,
    active: true,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    question: '¿Cómo verifican las horas de trabajo de las máquinas?',
    answer: 'Todas nuestras máquinas vienen con documentación japonesa original que certifica las horas de trabajo. Además, realizamos inspecciones técnicas independientes y verificamos el historial de mantenimiento. Las horas indicadas son siempre reales y verificables.',
    category: 'compra',
    display_order: 3,
    active: true,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '4',
    question: '¿Realizan envíos a toda España?',
    answer: 'Sí, entregamos maquinaria en toda España peninsular e islas. Disponemos de transporte especializado propio y colaboramos con empresas de transporte de maquinaria pesada certificadas. El coste de transporte se calcula según destino y dimensiones.',
    category: 'envio',
    display_order: 4,
    active: true,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '5',
    question: '¿Ofrecen financiación para la compra de maquinaria?',
    answer: 'Colaboramos con entidades financieras especializadas en maquinaria para ofrecer opciones de financiación, leasing y renting. Podemos estudiar su caso particular y ofrecerle la mejor solución adaptada a sus necesidades.',
    category: 'financiacion',
    display_order: 5,
    active: true,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '6',
    question: '¿Puedo ver las máquinas antes de comprar?',
    answer: 'Por supuesto. Disponemos de instalaciones donde puede ver y probar las máquinas disponibles. También podemos organizar videollamadas para mostrarle equipos específicos si no puede desplazarse. Trabajamos con total transparencia.',
    category: 'compra',
    display_order: 6,
    active: true,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '7',
    question: '¿Tienen servicio técnico y recambios?',
    answer: 'Sí, disponemos de taller propio con técnicos especializados en maquinaria japonesa. También suministramos recambios originales y compatibles para todas las marcas que comercializamos: Kubota, Yanmar, Komatsu, Iseki y más.',
    category: 'servicio',
    display_order: 7,
    active: true,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '8',
    question: '¿Las máquinas están homologadas para España?',
    answer: 'Todas las máquinas que vendemos cumplen con la normativa CE y están listas para su matriculación y uso en España. Nos encargamos de toda la documentación necesaria para la importación y homologación.',
    category: 'legal',
    display_order: 8,
    active: true,
    created_at: '2024-01-01T00:00:00Z'
  }
]

// =============================================================================
// CONTACT SETTINGS
// =============================================================================

export const mockContactSettings: ContactSettings[] = [
  {
    id: '1',
    setting_key: 'phone',
    value: '+34 601 080 799',
    label: 'Teléfono principal',
    active: true,
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    setting_key: 'whatsapp',
    value: '34601080799',
    label: 'WhatsApp',
    active: true,
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    setting_key: 'email',
    value: 'info@maquinariajapones.es',
    label: 'Email principal',
    active: true,
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '4',
    setting_key: 'address',
    value: 'Polígono Industrial Fuente del Jarro, Valencia, España',
    label: 'Dirección',
    active: true,
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '5',
    setting_key: 'hours',
    value: 'Lunes a Viernes: 9:00 - 18:00 | Sábados: 9:00 - 14:00',
    label: 'Horario',
    active: true,
    updated_at: '2024-01-01T00:00:00Z'
  }
]

// =============================================================================
// SOCIAL LINKS
// =============================================================================

export const mockSocialLinks: SocialLink[] = [
  {
    id: '1',
    platform: 'whatsapp',
    url: 'https://wa.me/34601080799',
    icon: 'whatsapp',
    display_order: 1,
    active: true,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    platform: 'instagram',
    url: 'https://instagram.com/maquinariajaponesa',
    icon: 'instagram',
    display_order: 2,
    active: true,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    platform: 'tiktok',
    url: 'https://tiktok.com/@maquinariajaponesa',
    icon: 'tiktok',
    display_order: 3,
    active: true,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '4',
    platform: 'youtube',
    url: 'https://youtube.com/@maquinariajaponesa',
    icon: 'youtube',
    display_order: 4,
    active: true,
    created_at: '2024-01-01T00:00:00Z'
  }
]

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

export function getProductBySlug(slug: string): Product | undefined {
  const products = getProductsWithRelations()
  return products.find(p => p.slug === slug)
}

export function getProductsByCategory(categorySlug: string): Product[] {
  const category = mockCategories.find(c => c.slug === categorySlug)
  if (!category) return []
  return getProductsWithRelations().filter(p => p.category_id === category.id && p.status === 'published')
}

export function getProductsByBrand(brandSlug: string): Product[] {
  const brand = mockBrands.find(b => b.slug === brandSlug)
  if (!brand) return []
  return getProductsWithRelations().filter(p => p.brand_id === brand.id && p.status === 'published')
}

export function getFeaturedProducts(): Product[] {
  return getProductsWithRelations().filter(p => p.featured && p.status === 'published')
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return mockCategories.find(c => c.slug === slug)
}

export function getBrandBySlug(slug: string): Brand | undefined {
  return mockBrands.find(b => b.slug === slug)
}

export function getContactSetting(key: string): string {
  const setting = mockContactSettings.find(s => s.setting_key === key && s.active)
  return setting?.value || ''
}

export function getActiveSocialLinks(): SocialLink[] {
  return mockSocialLinks.filter(s => s.active).sort((a, b) => a.display_order - b.display_order)
}

export function getActiveFAQs(): FAQ[] {
  return mockFAQs.filter(f => f.active).sort((a, b) => a.display_order - b.display_order)
}

export function getActiveCategories(): Category[] {
  return mockCategories.filter(c => c.active).sort((a, b) => a.display_order - b.display_order)
}

export function getActiveBrands(): Brand[] {
  return mockBrands.filter(b => b.active).sort((a, b) => a.display_order - b.display_order)
}
