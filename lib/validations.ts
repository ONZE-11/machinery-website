import { z } from 'zod'

// =============================================================================
// VALIDATION SCHEMAS - Japanese Machinery Premium Website
// =============================================================================
// Zod schemas for input validation on all forms and API endpoints
// =============================================================================

// =============================================================================
// CONTACT FORM
// =============================================================================

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede superar 100 caracteres')
    .regex(/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s'-]+$/, 'El nombre contiene caracteres no válidos'),
  
  email: z
    .string()
    .email('Introduce un email válido')
    .max(255, 'El email no puede superar 255 caracteres'),
  
  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^[+]?[\d\s()-]{9,20}$/.test(val),
      'Introduce un número de teléfono válido'
    ),
  
  company: z
    .string()
    .max(200, 'El nombre de empresa no puede superar 200 caracteres')
    .optional(),
  
  product_interest: z
    .string()
    .max(200, 'El producto de interés no puede superar 200 caracteres')
    .optional(),

  subject: z
    .string()
    .min(1, 'El asunto es obligatorio')
    .max(200, 'El asunto no puede superar 200 caracteres'),

  message: z
    .string()
    .min(10, 'El mensaje debe tener al menos 10 caracteres')
    .max(2000, 'El mensaje no puede superar 2000 caracteres'),
  
  privacy_accepted: z
    .boolean()
    .refine((val) => val === true, 'Debes aceptar la política de privacidad'),
})

export type ContactFormData = z.infer<typeof contactFormSchema>

// =============================================================================
// PRODUCT SCHEMAS (ADMIN)
// =============================================================================

export const productSchema = z.object({
  slug: z
    .string()
    .min(3, 'El slug debe tener al menos 3 caracteres')
    .max(200, 'El slug no puede superar 200 caracteres')
    .regex(/^[a-z0-9-]+$/, 'El slug solo puede contener letras minúsculas, números y guiones'),
  
  title: z
    .string()
    .min(5, 'El título debe tener al menos 5 caracteres')
    .max(200, 'El título no puede superar 200 caracteres'),
  
  category_id: z.string().uuid('Categoría no válida'),
  brand_id: z.string().uuid('Marca no válida'),
  model: z.string().max(100, 'El modelo no puede superar 100 caracteres'),
  
  year: z
    .number()
    .int()
    .min(1980, 'El año debe ser posterior a 1980')
    .max(new Date().getFullYear() + 1, 'El año no puede ser futuro')
    .nullable()
    .optional(),
  
  condition: z.enum(['excelente', 'muy_bueno', 'bueno', 'aceptable']),
  
  hours_used: z
    .number()
    .int()
    .min(0, 'Las horas no pueden ser negativas')
    .max(100000, 'Las horas no pueden superar 100,000')
    .nullable()
    .optional(),
  
  weight: z
    .number()
    .min(0, 'El peso no puede ser negativo')
    .max(100000, 'El peso no puede superar 100,000 kg')
    .nullable()
    .optional(),
  
  specifications: z.record(z.string()).nullable().optional(),
  
  description: z
    .string()
    .min(50, 'La descripción debe tener al menos 50 caracteres')
    .max(10000, 'La descripción no puede superar 10,000 caracteres'),
  
  short_description: z
    .string()
    .max(500, 'La descripción corta no puede superar 500 caracteres')
    .nullable()
    .optional(),
  
  featured: z.boolean().default(false),
  
  hero_image: z.string().url('URL de imagen no válida'),
  gallery_images: z.array(z.string().url('URL de imagen no válida')).default([]),
  
  price_on_request: z.boolean().default(true),
  price: z.number().min(0).nullable().optional(),
  
  seo_title: z.string().max(70, 'El título SEO no puede superar 70 caracteres').nullable().optional(),
  seo_description: z.string().max(160, 'La descripción SEO no puede superar 160 caracteres').nullable().optional(),
  
  status: z.enum(['draft', 'published', 'sold', 'reserved']).default('draft'),
})

export type ProductFormData = z.infer<typeof productSchema>

// =============================================================================
// CATEGORY SCHEMAS (ADMIN)
// =============================================================================

export const categorySchema = z.object({
  slug: z
    .string()
    .min(3, 'El slug debe tener al menos 3 caracteres')
    .max(100, 'El slug no puede superar 100 caracteres')
    .regex(/^[a-z0-9-]+$/, 'El slug solo puede contener letras minúsculas, números y guiones'),
  
  name: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede superar 100 caracteres'),
  
  description: z.string().max(1000, 'La descripción no puede superar 1000 caracteres').nullable().optional(),
  image: z.string().url('URL de imagen no válida').nullable().optional(),
  icon: z.string().max(50).nullable().optional(),
  
  seo_title: z.string().max(70, 'El título SEO no puede superar 70 caracteres').nullable().optional(),
  seo_description: z.string().max(160, 'La descripción SEO no puede superar 160 caracteres').nullable().optional(),
  
  display_order: z.number().int().min(0).default(0),
  active: z.boolean().default(true),
})

export type CategoryFormData = z.infer<typeof categorySchema>

// =============================================================================
// BRAND SCHEMAS (ADMIN)
// =============================================================================

export const brandSchema = z.object({
  slug: z
    .string()
    .min(2, 'El slug debe tener al menos 2 caracteres')
    .max(100, 'El slug no puede superar 100 caracteres')
    .regex(/^[a-z0-9-]+$/, 'El slug solo puede contener letras minúsculas, números y guiones'),
  
  name: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede superar 100 caracteres'),
  
  country: z.string().max(100).default('Japón'),
  description: z.string().max(2000, 'La descripción no puede superar 2000 caracteres').nullable().optional(),
  logo: z.string().url('URL de logo no válida').nullable().optional(),
  hero_image: z.string().url('URL de imagen no válida').nullable().optional(),
  founded_year: z.number().int().min(1800).max(new Date().getFullYear()).nullable().optional(),
  
  seo_title: z.string().max(70, 'El título SEO no puede superar 70 caracteres').nullable().optional(),
  seo_description: z.string().max(160, 'La descripción SEO no puede superar 160 caracteres').nullable().optional(),
  
  display_order: z.number().int().min(0).default(0),
  active: z.boolean().default(true),
})

export type BrandFormData = z.infer<typeof brandSchema>

// =============================================================================
// FAQ SCHEMAS (ADMIN)
// =============================================================================

export const faqSchema = z.object({
  question: z
    .string()
    .min(10, 'La pregunta debe tener al menos 10 caracteres')
    .max(500, 'La pregunta no puede superar 500 caracteres'),
  
  answer: z
    .string()
    .min(20, 'La respuesta debe tener al menos 20 caracteres')
    .max(2000, 'La respuesta no puede superar 2000 caracteres'),
  
  category: z.string().max(100).nullable().optional(),
  display_order: z.number().int().min(0).default(0),
  active: z.boolean().default(true),
})

export type FAQFormData = z.infer<typeof faqSchema>

// =============================================================================
// HOMEPAGE SECTION SCHEMAS (ADMIN)
// =============================================================================

export const homepageSectionSchema = z.object({
  section_key: z
    .string()
    .min(2)
    .max(50)
    .regex(/^[a-z_]+$/, 'La clave solo puede contener letras minúsculas y guiones bajos'),
  
  title: z.string().max(200).nullable().optional(),
  subtitle: z.string().max(300).nullable().optional(),
  content: z.string().max(5000).nullable().optional(),
  /** Permanent default — accepted in schema but stripped from PATCH updates in the API. */
  image: z.string().url('URL de imagen no válida').nullable().optional(),
  /** Admin-uploaded override image. */
  custom_image: z.string().url('URL de imagen no válida').nullable().optional(),
  cta_text: z.string().max(100).nullable().optional(),
  cta_link: z.string().max(500).nullable().optional(),
  
  display_order: z.number().int().min(0).default(0),
  active: z.boolean().default(true),
})

export type HomepageSectionFormData = z.infer<typeof homepageSectionSchema>

// =============================================================================
// SEARCH & FILTER SCHEMAS
// =============================================================================

export const productFilterSchema = z.object({
  category: z.string().optional(),
  brand: z.string().optional(),
  search: z.string().max(200).optional(),
  condition: z.enum(['excelente', 'muy_bueno', 'bueno', 'aceptable']).optional(),
  minYear: z.number().int().min(1980).optional(),
  maxYear: z.number().int().max(new Date().getFullYear() + 1).optional(),
  page: z.number().int().min(1).default(1),
  pageSize: z.number().int().min(1).max(50).default(12),
  sortBy: z.enum(['created_at', 'price', 'year', 'title']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
})

export type ProductFilterParams = z.infer<typeof productFilterSchema>

// =============================================================================
// IMAGE UPLOAD VALIDATION
// =============================================================================

export const imageUploadSchema = z.object({
  file: z.any().refine(
    (file) => {
      if (!file || !(file instanceof File)) return false
      const validTypes = ['image/jpeg', 'image/png', 'image/webp']
      return validTypes.includes(file.type)
    },
    'Solo se permiten imágenes JPG, PNG o WebP'
  ).refine(
    (file) => {
      if (!file || !(file instanceof File)) return false
      const maxSize = 10 * 1024 * 1024 // 10MB
      return file.size <= maxSize
    },
    'La imagen no puede superar 10MB'
  ),
})

// =============================================================================
// HELPER: Sanitize HTML for rich text fields
// =============================================================================

export function sanitizeHtml(html: string): string {
  // This will be implemented with sanitize-html library
  // For now, return as-is (implement full sanitization in production)
  return html
}
