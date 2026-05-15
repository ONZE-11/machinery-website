"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ImageUploader } from "@/components/admin/image-uploader"
import { categorySchema, type CategoryFormData } from "@/lib/validations"
import { ArrowLeft, Save } from "lucide-react"

interface CategoryFormProps {
  categoryId?: string
  defaultValues?: Partial<CategoryFormData>
}

const generateSlug = (name: string) =>
  name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")

export function CategoryForm({ categoryId, defaultValues }: CategoryFormProps) {
  const router = useRouter()
  const isEdit = Boolean(categoryId)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      slug: "",
      name: "",
      description: null,
      image: null,
      icon: null,
      seo_title: null,
      seo_description: null,
      display_order: 0,
      active: true,
      ...defaultValues,
    },
  })

  useEffect(() => {
    if (defaultValues) reset({ slug: "", name: "", description: null, image: null, icon: null, seo_title: null, seo_description: null, display_order: 0, active: true, ...defaultValues })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const watchName = watch("name")
  const watchActive = watch("active")

  const onSubmit = async (data: CategoryFormData) => {
    const url = isEdit ? `/api/categories/${categoryId}` : "/api/categories"
    const method = isEdit ? "PATCH" : "POST"

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })

    if (res.status === 409) {
      setError("slug", { message: "Este slug ya está en uso" })
      return
    }
    if (!res.ok) {
      const json = await res.json().catch(() => ({}))
      setError("root", { message: (json as { error?: string }).error ?? "Error al guardar" })
      return
    }

    router.push("/admin/categories")
    router.refresh()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/categories">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {isEdit ? "Edit Category" : "New Category"}
            </h1>
            <p className="text-muted-foreground">
              {isEdit ? "Update category details" : "Add a product category"}
            </p>
          </div>
        </div>
        <Button onClick={handleSubmit(onSubmit)} disabled={isSubmitting} className="gap-2">
          <Save className="h-4 w-4" />
          {isSubmitting ? "Saving..." : "Save Category"}
        </Button>
      </div>

      {errors.root && (
        <p className="text-red-500 text-sm">{errors.root.message}</p>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Category Name *</Label>
                  <Input
                    id="name"
                    {...register("name")}
                    className="mt-2"
                    placeholder="e.g., Mini Excavadoras"
                    onBlur={() => {
                      if (!watch("slug")) setValue("slug", generateSlug(watchName ?? ""))
                    }}
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>

                <div>
                  <Label htmlFor="slug">URL Slug *</Label>
                  <Input id="slug" {...register("slug")} className="mt-2" placeholder="mini-excavadoras" />
                  {errors.slug && <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>}
                </div>

                <div>
                  <Label htmlFor="icon">Icon</Label>
                  <Input id="icon" {...register("icon")} className="mt-2" placeholder="excavator" />
                  <p className="text-xs text-muted-foreground mt-1">Icon name or emoji for category display</p>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    {...register("description")}
                    className="mt-2"
                    placeholder="What kinds of products are in this category..."
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            {/* SEO */}
            <Card>
              <CardHeader>
                <CardTitle>SEO</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="seo_title">Meta Title</Label>
                  <Input id="seo_title" {...register("seo_title")} className="mt-2" placeholder="Leave empty to use category name" />
                  <p className="text-xs text-muted-foreground mt-1">Max 70 characters</p>
                  {errors.seo_title && <p className="text-red-500 text-sm mt-1">{errors.seo_title.message}</p>}
                </div>
                <div>
                  <Label htmlFor="seo_description">Meta Description</Label>
                  <Textarea id="seo_description" {...register("seo_description")} className="mt-2" rows={3} placeholder="SEO description..." />
                  <p className="text-xs text-muted-foreground mt-1">Max 160 characters</p>
                  {errors.seo_description && <p className="text-red-500 text-sm mt-1">{errors.seo_description.message}</p>}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Category Image</CardTitle>
              </CardHeader>
              <CardContent>
                <ImageUploader
                  bucket="categories"
                  value={watch("image") ?? undefined}
                  onUpload={(url) => setValue("image", url)}
                  onRemove={() => setValue("image", null)}
                  label="Category image"
                />
                {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Checkbox
                    id="active"
                    checked={watchActive}
                    onCheckedChange={(checked) => setValue("active", checked === true)}
                  />
                  <Label htmlFor="active" className="cursor-pointer">
                    Active (visible on site)
                  </Label>
                </div>

                <div>
                  <Label htmlFor="display_order">Display Order</Label>
                  <Input
                    id="display_order"
                    type="number"
                    {...register("display_order", { valueAsNumber: true })}
                    className="mt-2"
                    placeholder="0"
                    min={0}
                  />
                  <p className="text-xs text-muted-foreground mt-1">Lower = appears first</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}
