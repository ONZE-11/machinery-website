// Always re-render on each request so admin edits (images, price, status)
// appear immediately without a full redeploy.
export const revalidate = 0
export const dynamicParams = true

import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { Header, Footer, WhatsAppButton } from "@/components/layout"
import { ProductDetailClient } from "./product-detail-client"
import {
  getProductBySlug,
  getPublishedProductSlugs,
  getRelatedProducts,
} from "@/lib/supabase/queries"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) return { title: "Producto no encontrado" }

  return {
    title: `${product.seo_title || product.title} | Maquinaria Japonesa`,
    description:
      product.seo_description ||
      `${product.title} - Maquinaria japonesa de alta calidad. Importación directa desde Japón.`,
    keywords: [
      product.title,
      product.model || "",
      "maquinaria japonesa",
      "importación Japón España",
    ].filter(Boolean),
    openGraph: {
      title: product.seo_title || product.title,
      description: product.seo_description || product.short_description || "",
      images: product.hero_image ? [{ url: product.hero_image }] : [],
      type: "website",
    },
  }
}

export async function generateStaticParams() {
  const slugs = await getPublishedProductSlugs()
  return slugs.map((slug) => ({ slug }))
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) notFound()

  const relatedProducts = product.category_id
    ? await getRelatedProducts(product.category_id, product.id, 3)
    : []

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ProductDetailClient product={product} relatedProducts={relatedProducts} />
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
