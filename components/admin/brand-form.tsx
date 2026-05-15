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
import { brandSchema, type BrandFormData } from "@/lib/validations"
import { ArrowLeft, Save } from "lucide-react"

interface BrandFormProps {
  /** Provide when editing an existing brand */
  brandId?: string
  defaultValues?: Partial<BrandFormData>
}

const generateSlug = (name: string) =>
  name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")

export function BrandForm({ brandId, defaultValues }: BrandFormProps) {
  const router = useRouter()
  const isEdit = Boolean(brandId)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BrandFormData>({
    resolver: zodResolver(brandSchema),
    defaultValues: {
      slug: "",
      name: "",
      country: "Japón",
      description: null,
      logo: null,
      hero_image: null,
      founded_year: null,
      seo_title: null,
      seo_description: null,
      display_order: 0,
      active: true,
      ...defaultValues,
    },
  })

  // Re-initialise when edit data arrives (defaultValues prop changes on mount)
  useEffect(() => {
    if (defaultValues) reset({ slug: "", name: "", country: "Japón", description: null, logo: null, hero_image: null, founded_year: null, seo_title: null, seo_description: null, display_order: 0, active: true, ...defaultValues })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const watchName = watch("name")
  const watchActive = watch("active")

  const onSubmit = async (data: BrandFormData) => {
    const url = isEdit ? `/api/brands/${brandId}` : "/api/brands"
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

    router.push("/admin/brands")
    router.refresh()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/brands">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {isEdit ? "Edit Brand" : "New Brand"}
            </h1>
            <p className="text-muted-foreground">
              {isEdit ? "Update brand details" : "Add a Japanese machinery brand"}
            </p>
          </div>
        </div>
        <Button onClick={handleSubmit(onSubmit)} disabled={isSubmitting} className="gap-2">
          <Save className="h-4 w-4" />
          {isSubmitting ? "Saving..." : "Save Brand"}
        </Button>
      </div>

      {errors.root && (
        <p className="text-red-500 text-sm">{errors.root.message}</p>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic info */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Brand Name *</Label>
                  <Input
                    id="name"
                    {...register("name")}
                    className="mt-2"
                    placeholder="e.g., Kubota"
                    onBlur={() => {
                      if (!watch("slug")) setValue("slug", generateSlug(watchName ?? ""))
                    }}
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>

                <div>
                  <Label htmlFor="slug">URL Slug *</Label>
                  <Input id="slug" {...register("slug")} className="mt-2" placeholder="kubota" />
                  {errors.slug && <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Input id="country" {...register("country")} className="mt-2" placeholder="Japón" />
                  </div>
                  <div>
                    <Label htmlFor="founded_year">Founded Year</Label>
                    <Input
                      id="founded_year"
                      type="number"
                      {...register("founded_year", { valueAsNumber: true })}
                      className="mt-2"
                      placeholder="1890"
                      min={1800}
                      max={new Date().getFullYear()}
                    />
                    {errors.founded_year && <p className="text-red-500 text-sm mt-1">{errors.founded_year.message}</p>}
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    {...register("description")}
                    className="mt-2"
                    placeholder="Brief brand history and specialty..."
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Images */}
            <Card>
              <CardHeader>
                <CardTitle>Images</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label>Logo</Label>
                    <p className="text-xs text-muted-foreground mt-0.5 mb-3">
                      Square logo for brand listings.
                    </p>
                    <ImageUploader
                      bucket="brands"
                      value={watch("logo") ?? undefined}
                      onUpload={(url) => setValue("logo", url)}
                      onRemove={() => setValue("logo", null)}
                      label="Brand logo"
                    />
                    {errors.logo && <p className="text-red-500 text-sm mt-1">{errors.logo.message}</p>}
                  </div>

                  <div>
                    <Label>Hero Image</Label>
                    <p className="text-xs text-muted-foreground mt-0.5 mb-3">
                      Wide banner for the brand page header.
                    </p>
                    <ImageUploader
                      bucket="brands"
                      value={watch("hero_image") ?? undefined}
                      onUpload={(url) => setValue("hero_image", url)}
                      onRemove={() => setValue("hero_image", null)}
                      label="Brand hero image"
                      aspect="video"
                    />
                    {errors.hero_image && <p className="text-red-500 text-sm mt-1">{errors.hero_image.message}</p>}
                  </div>
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
                  <Input id="seo_title" {...register("seo_title")} className="mt-2" placeholder="Leave empty to use brand name" />
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
