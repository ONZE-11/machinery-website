"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { BrandForm } from "@/components/admin/brand-form"
import type { Brand } from "@/types/database"
import { Loader2 } from "lucide-react"

export default function EditBrandPage() {
  const { id } = useParams<{ id: string }>()
  const [brand, setBrand] = useState<Brand | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    fetch(`/api/brands/${id}`)
      .then((r) => {
        if (r.status === 404) { setNotFound(true); return null }
        return r.json()
      })
      .then((data) => { if (data) setBrand(data) })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (notFound || !brand) {
    return (
      <div className="text-center py-24">
        <p className="text-muted-foreground">Brand not found</p>
      </div>
    )
  }

  return (
    <BrandForm
      brandId={id}
      defaultValues={{
        slug: brand.slug,
        name: brand.name,
        country: brand.country,
        description: brand.description,
        logo: brand.logo,
        hero_image: brand.hero_image,
        founded_year: brand.founded_year,
        seo_title: brand.seo_title,
        seo_description: brand.seo_description,
        display_order: brand.display_order,
        active: brand.active,
      }}
    />
  )
}
