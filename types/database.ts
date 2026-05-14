// =============================================================================
// DATABASE TYPES - Japanese Machinery Premium Website
// =============================================================================
// These types mirror the Supabase database schema
// =============================================================================

export interface Product {
  id: string
  slug: string
  title: string
  category_id: string
  brand_id: string
  model: string
  year: number | null
  condition: 'excelente' | 'muy_bueno' | 'bueno' | 'aceptable'
  hours_used: number | null
  weight: number | null
  specifications: Record<string, string> | null
  description: string
  short_description: string | null
  featured: boolean
  hero_image: string
  gallery_images: string[]
  price_on_request: boolean
  price: number | null
  seo_title: string | null
  seo_description: string | null
  status: 'draft' | 'published' | 'sold' | 'reserved'
  created_at: string
  updated_at: string
  // Joined data
  category?: Category
  brand?: Brand
}

export interface Category {
  id: string
  slug: string
  name: string
  description: string | null
  image: string | null
  icon: string | null
  seo_title: string | null
  seo_description: string | null
  display_order: number
  active: boolean
  created_at: string
}

export interface Brand {
  id: string
  slug: string
  name: string
  country: string
  description: string | null
  logo: string | null
  hero_image: string | null
  founded_year: number | null
  seo_title: string | null
  seo_description: string | null
  display_order: number
  active: boolean
  created_at: string
}

export interface HomepageSection {
  id: string
  section_key: string
  title: string | null
  subtitle: string | null
  content: string | null
  image: string | null
  cta_text: string | null
  cta_link: string | null
  display_order: number
  active: boolean
  created_at: string
  updated_at: string
}

export interface FAQ {
  id: string
  question: string
  answer: string
  category: string | null
  display_order: number
  active: boolean
  created_at: string
}

export interface ContactSettings {
  id: string
  setting_key: string
  value: string
  label: string | null
  active: boolean
  updated_at: string
}

export interface SocialLink {
  id: string
  platform: string
  url: string
  icon: string | null
  display_order: number
  active: boolean
  created_at: string
}

export interface Admin {
  id: string
  clerk_user_id: string
  email: string
  name: string | null
  role: 'super_admin' | 'admin' | 'editor'
  active: boolean
  created_at: string
  last_login: string | null
}

// =============================================================================
// API RESPONSE TYPES
// =============================================================================

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

// =============================================================================
// FORM TYPES
// =============================================================================

export interface ContactFormData {
  name: string
  email: string
  phone?: string
  company?: string
  product_interest?: string
  message: string
  consent: boolean
}

export interface ProductFilterParams {
  category?: string
  brand?: string
  search?: string
  condition?: string
  minYear?: number
  maxYear?: number
  page?: number
  pageSize?: number
  sortBy?: 'created_at' | 'price' | 'year' | 'title'
  sortOrder?: 'asc' | 'desc'
}
