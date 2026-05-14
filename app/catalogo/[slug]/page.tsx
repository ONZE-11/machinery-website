import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { mockProducts } from "@/lib/mock-data"
import { ProductDetailClient } from "./product-detail-client"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = mockProducts.find((p) => p.slug === slug)

  if (!product) {
    return {
      title: "Producto no encontrado",
    }
  }

  return {
    title: `${product.title} | Maquinaria Japonesa`,
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
  return mockProducts.map((product) => ({
    slug: product.slug,
  }))
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = mockProducts.find((p) => p.slug === slug)

  if (!product) {
    notFound()
  }

  // Get related products (same category, different product)
  const relatedProducts = mockProducts
    .filter((p) => p.category_id === product.category_id && p.id !== product.id)
    .slice(0, 3)

  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />
}
