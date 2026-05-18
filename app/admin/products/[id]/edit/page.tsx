"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Loader2 } from "lucide-react"

import type { Product } from "@/types/database"
import type { ProductFormData } from "@/lib/validations"

import ProductForm from "@/components/admin/product-form"

export default function EditProductPage() {
  const params = useParams<{ id: string }>()
  const id = params.id

  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!id) return

    async function loadProduct() {
      try {
        const res = await fetch(`/api/products/${id}`)

        if (res.status === 404) {
          setNotFound(true)
          return
        }

        if (!res.ok) {
          setNotFound(true)
          return
        }

        const data = await res.json()
        setProduct(data)
      } catch (error) {
        console.error(error)
        setNotFound(true)
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [id])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    )
  }

  if (notFound || !product) {
    return (
      <div className="text-center py-24">
        Product not found
      </div>
    )
  }

  const defaultValues: Partial<ProductFormData> = {
    slug: product.slug ?? "",
    title: product.title ?? "",
    description: product.description ?? "",
    short_description: product.short_description ?? "",
    hero_image: product.hero_image ?? "",
    gallery_images: product.gallery_images ?? [],
    category_id: product.category_id ?? undefined,
    brand_id: product.brand_id ?? undefined,
    model: product.model ?? "",
    year: product.year ?? undefined,
    condition: product.condition ?? "bueno",
    hours_used: product.hours_used ?? undefined,
    weight: product.weight ?? undefined,
    specifications: product.specifications ?? {},
    featured: product.featured ?? false,
    price_on_request: product.price_on_request ?? true,
    price: product.price ?? undefined,
    seo_title: product.seo_title ?? "",
    seo_description: product.seo_description ?? "",
    status: product.status ?? "draft",
  }

  return (
    <ProductForm
      productId={id}
      defaultValues={defaultValues}
    />
  )
}