"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { CategoryForm } from "@/components/admin/category-form"
import type { Category } from "@/types/database"
import { Loader2 } from "lucide-react"

export default function EditCategoryPage() {
  const { id } = useParams<{ id: string }>()
  const [category, setCategory] = useState<Category | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    fetch(`/api/categories/${id}`)
      .then((r) => {
        if (r.status === 404) { setNotFound(true); return null }
        return r.json()
      })
      .then((data) => { if (data) setCategory(data) })
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

  if (notFound || !category) {
    return (
      <div className="text-center py-24">
        <p className="text-muted-foreground">Category not found</p>
      </div>
    )
  }

  return (
    <CategoryForm
      categoryId={id}
      defaultValues={{
        slug: category.slug,
        name: category.name,
        description: category.description,
        image: category.image,
        icon: category.icon,
        seo_title: category.seo_title,
        seo_description: category.seo_description,
        display_order: category.display_order,
        active: category.active,
      }}
    />
  )
}
