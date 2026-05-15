import { MetadataRoute } from "next"
import { brand } from "@/lib/config/brand"
import {
  getPublishedProductSlugs,
  getActiveCategories,
  getActiveBrands,
} from "@/lib/supabase/queries"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || brand.siteUrl

  const [productSlugs, categories, brands] = await Promise.all([
    getPublishedProductSlugs(),
    getActiveCategories(),
    getActiveBrands(),
  ])

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/catalogo`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/marcas`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/por-que-maquinaria-japonesa`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/sobre-nosotros`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/faq`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 },
    { url: `${baseUrl}/contacto`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/privacidad`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/aviso-legal`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ]

  const productPages: MetadataRoute.Sitemap = productSlugs.map((slug) => ({
    url: `${baseUrl}/catalogo/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }))

  const categoryPages: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${baseUrl}/catalogo?categoria=${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }))

  const brandPages: MetadataRoute.Sitemap = brands.map((b) => ({
    url: `${baseUrl}/catalogo?marca=${b.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }))

  return [...staticPages, ...productPages, ...categoryPages, ...brandPages]
}
