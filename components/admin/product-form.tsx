"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowLeft, Eye, Save } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { ImageUploader } from "@/components/admin/image-uploader"
import { RichTextEditor } from "@/components/admin/rich-text-editor"
import { productSchema, type ProductFormData } from "@/lib/validations"
import type { Brand, Category } from "@/types/database"

interface ProductFormProps {
  productId?: string
  defaultValues?: Partial<ProductFormData>
}

const CONDITIONS = [
  { value: "excelente", label: "Excelente" },
  { value: "muy_bueno", label: "Muy Bueno" },
  { value: "bueno", label: "Bueno" },
  { value: "aceptable", label: "Aceptable" },
] as const

export default function ProductForm({
  productId,
  defaultValues,
}: ProductFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [brands, setBrands] = useState<Brand[]>([])

  useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setCategories(data)
      })
      .catch(() => {})

    fetch("/api/brands")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setBrands(data)
      })
      .catch(() => {})
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: defaultValues?.title ?? "",
      slug: defaultValues?.slug ?? "",
      description: defaultValues?.description ?? "",
      short_description: defaultValues?.short_description ?? "",
      condition: defaultValues?.condition ?? "bueno",
      status: defaultValues?.status ?? "draft",
      price: defaultValues?.price ?? undefined,
      price_on_request: defaultValues?.price_on_request ?? true,
      featured: defaultValues?.featured ?? false,
      hero_image: defaultValues?.hero_image ?? "",
      gallery_images: defaultValues?.gallery_images ?? [],
      specifications: defaultValues?.specifications ?? {},
      category_id: defaultValues?.category_id ?? undefined,
      brand_id: defaultValues?.brand_id ?? undefined,
      model: defaultValues?.model ?? "",
      year: defaultValues?.year ?? undefined,
      hours_used: defaultValues?.hours_used ?? undefined,
      weight: defaultValues?.weight ?? undefined,
      seo_title: defaultValues?.seo_title ?? "",
      seo_description: defaultValues?.seo_description ?? "",
    },
  })

  const watchTitle = watch("title")
  const watchPriceOnRequest = watch("price_on_request")
  const watchStatus = watch("status")

  const generateSlug = (title: string) =>
    title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")

  async function onSubmit(data: ProductFormData) {
    setIsSubmitting(true)

    try {
      const method = productId ? "PATCH" : "POST"
      const endpoint = productId
        ? `/api/products/${productId}`
        : "/api/products"

      const res = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || "Failed to save product")
      }

      router.push("/admin/products")
      router.refresh()
    } catch (error) {
      console.error("Error saving product:", error)
      alert(error instanceof Error ? error.message : "Failed to save product")
    } finally {
      setIsSubmitting(false)
    }
  }

  function handlePreview() {
    const slug = watch("slug")
    const status = watch("status")

    if (!slug) {
      toast.warning("Please add a slug before previewing.")
      return
    }

    if (status === "draft") {
      toast.warning(
        "This product is still in draft. Publish it or change status to Reserved/Sold to preview it publicly."
      )
      return
    }

    window.open(`/catalogo/${slug}`, "_blank", "noopener,noreferrer")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/products">
            <Button variant="ghost" size="icon" type="button">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>

          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {productId ? "Edit Product" : "New Product"}
            </h1>
            <p className="text-muted-foreground">
              {productId
                ? "Update product details"
                : "Add a new product to your catalog"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2" type="button" onClick={handlePreview}>
            <Eye className="h-4 w-4" />
            Preview
          </Button>

          <Button
            type="button"
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            className="gap-2"
          >
            <Save className="h-4 w-4" />
            {isSubmitting ? "Saving..." : "Save Product"}
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="general" className="w-full">
              <TabsList>
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="seo">SEO</TabsTrigger>
              </TabsList>

              <TabsContent value="general" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="title">Product Title *</Label>
                      <Input
                        id="title"
                        {...register("title")}
                        className="mt-2"
                        placeholder="e.g., Komatsu PC200-8 Excavadora"
                        onBlur={() => {
                          if (!watch("slug")) {
                            setValue("slug", generateSlug(watchTitle ?? ""), {
                              shouldValidate: true,
                            })
                          }
                        }}
                      />
                      {errors.title && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.title.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="slug">URL Slug *</Label>
                      <Input
                        id="slug"
                        {...register("slug")}
                        className="mt-2"
                        placeholder="komatsu-pc200-8-excavadora"
                      />
                      {errors.slug && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.slug.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="short_description">
                        Short Description
                      </Label>
                      <Textarea
                        id="short_description"
                        {...register("short_description")}
                        className="mt-2"
                        placeholder="Brief summary for product cards..."
                        rows={2}
                      />
                      {errors.short_description && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.short_description.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label>Full Description *</Label>
                      <RichTextEditor
                        value={watch("description") ?? ""}
                        onChange={(html) =>
                          setValue("description", html, { shouldValidate: true })
                        }
                        className="mt-2"
                      />
                      {errors.description && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.description.message}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Images</CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <div>
                      <Label>Main Image *</Label>
                      <p className="text-xs text-muted-foreground mt-0.5 mb-3">
                        Appears as the product thumbnail and hero on the product
                        page.
                      </p>

                      <div className="w-40">
                        <ImageUploader
                          bucket="products"
                          value={watch("hero_image") || undefined}
                          onUpload={(url) =>
                            setValue("hero_image", url, {
                              shouldValidate: true,
                            })
                          }
                          onRemove={() =>
                            setValue("hero_image", "", {
                              shouldValidate: true,
                            })
                          }
                          label="Main product image"
                        />
                      </div>

                      {errors.hero_image && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.hero_image.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label>Gallery Images</Label>
                      <p className="text-xs text-muted-foreground mt-0.5 mb-3">
                        Additional images shown in the product gallery.
                      </p>

                      <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                        {(watch("gallery_images") ?? []).map((url, index) => (
                          <ImageUploader
                            key={`${url}-${index}`}
                            bucket="products"
                            value={url}
                            onUpload={(newUrl) => {
                              const current = watch("gallery_images") ?? []
                              const updated = [...current]
                              updated[index] = newUrl
                              setValue("gallery_images", updated, {
                                shouldValidate: true,
                              })
                            }}
                            onRemove={() => {
                              const current = watch("gallery_images") ?? []
                              setValue(
                                "gallery_images",
                                current.filter((_, i) => i !== index),
                                { shouldValidate: true }
                              )
                            }}
                          />
                        ))}

                        {(watch("gallery_images") ?? []).length < 9 && (
                          <ImageUploader
                            bucket="products"
                            onUpload={(url) => {
                              const current = watch("gallery_images") ?? []
                              setValue("gallery_images", [...current, url], {
                                shouldValidate: true,
                              })
                            }}
                            onRemove={() => {}}
                            label="Add image"
                          />
                        )}
                      </div>

                      {errors.gallery_images && (
                        <p className="text-red-500 text-sm mt-1">
                          {String(errors.gallery_images.message)}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="details" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Product Details</CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="model">Model</Label>
                        <Input
                          id="model"
                          {...register("model")}
                          className="mt-2"
                          placeholder="PC200-8"
                        />
                      </div>

                      <div>
                        <Label htmlFor="year">Year</Label>
                        <Input
                          id="year"
                          type="number"
                          {...register("year", { valueAsNumber: true })}
                          className="mt-2"
                          placeholder="2020"
                          min={1980}
                          max={new Date().getFullYear()}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="hours_used">Operating Hours</Label>
                        <Input
                          id="hours_used"
                          type="number"
                          {...register("hours_used", { valueAsNumber: true })}
                          className="mt-2"
                          placeholder="5000"
                        />
                      </div>

                      <div>
                        <Label htmlFor="weight">Weight (kg)</Label>
                        <Input
                          id="weight"
                          type="number"
                          {...register("weight", { valueAsNumber: true })}
                          className="mt-2"
                          placeholder="3500"
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Condition *</Label>
                      <Select
                        value={watch("condition")}
                        onValueChange={(value) =>
                          setValue(
                            "condition",
                            value as ProductFormData["condition"],
                            { shouldValidate: true }
                          )
                        }
                      >
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                          {CONDITIONS.map((c) => (
                            <SelectItem key={c.value} value={c.value}>
                              {c.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      {errors.condition && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.condition.message}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="seo" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>SEO Settings</CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="seo_title">Meta Title</Label>
                      <Input
                        id="seo_title"
                        {...register("seo_title")}
                        className="mt-2"
                        placeholder="Leave empty to use product title"
                      />
                    </div>

                    <div>
                      <Label htmlFor="seo_description">Meta Description</Label>
                      <Textarea
                        id="seo_description"
                        {...register("seo_description")}
                        className="mt-2"
                        placeholder="SEO description for search engines..."
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Organization</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <div>
                  <Label>Category</Label>
                  <Select
                    value={watch("category_id") ?? ""}
                    onValueChange={(value) =>
                      setValue("category_id", value, {
                        shouldValidate: true,
                      })
                    }
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>

                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {errors.category_id && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.category_id.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label>Brand</Label>
                  <Select
                    value={watch("brand_id") ?? ""}
                    onValueChange={(value) =>
                      setValue("brand_id", value, {
                        shouldValidate: true,
                      })
                    }
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select brand" />
                    </SelectTrigger>

                    <SelectContent>
                      {brands.map((brand) => (
                        <SelectItem key={brand.id} value={brand.id}>
                          {brand.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {errors.brand_id && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.brand_id.message}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pricing</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="price_on_request"
                    checked={watchPriceOnRequest}
                    onCheckedChange={(checked) =>
                      setValue("price_on_request", checked === true, {
                        shouldValidate: true,
                      })
                    }
                  />

                  <Label htmlFor="price_on_request" className="cursor-pointer">
                    Price on request
                  </Label>
                </div>

                {!watchPriceOnRequest && (
                  <div>
                    <Label htmlFor="price">Price (EUR)</Label>
                    <Input
                      id="price"
                      type="number"
                      {...register("price", { valueAsNumber: true })}
                      className="mt-2"
                      placeholder="0.00"
                      min={0}
                      step={0.01}
                    />

                    {errors.price && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.price.message}
                      </p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Status</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <div>
                  <Label>Publication Status</Label>
                  <Select
                    value={watchStatus}
                    onValueChange={(value) =>
                      setValue("status", value as ProductFormData["status"], {
                        shouldValidate: true,
                      })
                    }
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="reserved">Reserved</SelectItem>
                      <SelectItem value="sold">Sold</SelectItem>
                    </SelectContent>
                  </Select>

                  {errors.status && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.status.message}
                    </p>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="featured"
                    checked={watch("featured")}
                    onCheckedChange={(checked) =>
                      setValue("featured", checked === true, {
                        shouldValidate: true,
                      })
                    }
                  />

                  <Label htmlFor="featured" className="cursor-pointer">
                    Featured product
                  </Label>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}