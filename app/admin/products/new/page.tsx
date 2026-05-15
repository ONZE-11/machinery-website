"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
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
import { productSchema, type ProductFormData } from "@/lib/validations"
import { ImageUploader } from "@/components/admin/image-uploader"
import { ArrowLeft, Save, Eye } from "lucide-react"
import type { Category, Brand } from "@/types/database"

// Condition labels and values aligned to Supabase schema enum
const CONDITIONS = [
  { value: "excelente", label: "Excelente" },
  { value: "muy_bueno", label: "Muy Bueno" },
  { value: "bueno", label: "Bueno" },
  { value: "aceptable", label: "Aceptable" },
] as const

export default function NewProductPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [brands, setBrands] = useState<Brand[]>([])

  useEffect(() => {
    fetch("/api/categories").then((r) => r.json()).then((d) => { if (Array.isArray(d)) setCategories(d) }).catch(() => {})
    fetch("/api/brands").then((r) => r.json()).then((d) => { if (Array.isArray(d)) setBrands(d) }).catch(() => {})
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
      title: "",
      slug: "",
      description: "",
      short_description: "",
      condition: "bueno",
      status: "draft",
      price: undefined,
      price_on_request: true,
      featured: false,
      hero_image: "",
      gallery_images: [],
      specifications: {},
    },
  })

  const watchTitle = watch("title")
  const watchPriceOnRequest = watch("price_on_request")
  const watchStatus = watch("status")

  const generateSlug = (title: string) =>
    title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")

  const onSubmit = async (data: ProductFormData) => {
    setIsSubmitting(true)
    // TODO Phase B API: POST /api/products with data
    try {
      console.log("Product payload:", data)
      await new Promise((resolve) => setTimeout(resolve, 500))
      router.push("/admin/products")
    } catch (error) {
      console.error("Error creating product:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/products">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">New Product</h1>
            <p className="text-muted-foreground">Add a new product to your catalog</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Eye className="h-4 w-4" />
            Preview
          </Button>
          <Button
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
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="general" className="w-full">
              <TabsList>
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="seo">SEO</TabsTrigger>
              </TabsList>

              {/* ── General ── */}
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
                            setValue("slug", generateSlug(watchTitle ?? ""))
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
                      <Label htmlFor="short_description">Short Description</Label>
                      <Textarea
                        id="short_description"
                        {...register("short_description")}
                        className="mt-2"
                        placeholder="Brief summary for product cards..."
                        rows={2}
                      />
                    </div>

                    <div>
                      <Label htmlFor="description">Full Description *</Label>
                      <Textarea
                        id="description"
                        {...register("description")}
                        className="mt-2"
                        placeholder="Detailed product description with features and benefits..."
                        rows={6}
                      />
                      {errors.description && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.description.message}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Images */}
                <Card>
                  <CardHeader>
                    <CardTitle>Images</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Main / hero image */}
                    <div>
                      <Label>Main Image *</Label>
                      <p className="text-xs text-muted-foreground mt-0.5 mb-3">
                        Appears as the product thumbnail and hero on the product page.
                      </p>
                      <div className="w-40">
                        <ImageUploader
                          bucket="products"
                          value={watch("hero_image") || undefined}
                          onUpload={(url) => setValue("hero_image", url, { shouldValidate: true })}
                          onRemove={() => setValue("hero_image", "", { shouldValidate: true })}
                          label="Main product image"
                        />
                      </div>
                      {errors.hero_image && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.hero_image.message}
                        </p>
                      )}
                    </div>

                    {/* Gallery images */}
                    <div>
                      <Label>Gallery Images</Label>
                      <p className="text-xs text-muted-foreground mt-0.5 mb-3">
                        Additional images shown in the product gallery (max 9).
                      </p>
                      <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                        {(watch("gallery_images") ?? []).map((url, index) => (
                          <ImageUploader
                            key={url}
                            bucket="products"
                            value={url}
                            onUpload={(newUrl) => {
                              const current = watch("gallery_images") ?? []
                              const updated = [...current]
                              updated[index] = newUrl
                              setValue("gallery_images", updated)
                            }}
                            onRemove={() => {
                              const current = watch("gallery_images") ?? []
                              setValue(
                                "gallery_images",
                                current.filter((_, i) => i !== index)
                              )
                            }}
                          />
                        ))}
                        {/* "Add more" slot — hidden when at max */}
                        {(watch("gallery_images") ?? []).length < 9 && (
                          <ImageUploader
                            bucket="products"
                            onUpload={(url) => {
                              const current = watch("gallery_images") ?? []
                              setValue("gallery_images", [...current, url])
                            }}
                            onRemove={() => {}}
                            label="Add image"
                          />
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* ── Details ── */}
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
                            value as ProductFormData["condition"]
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
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* ── SEO ── */}
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
                      <p className="text-xs text-muted-foreground mt-1">
                        Recommended: 50–70 characters
                      </p>
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
                      <p className="text-xs text-muted-foreground mt-1">
                        Recommended: 150–160 characters
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Organization */}
            <Card>
              <CardHeader>
                <CardTitle>Organization</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Category</Label>
                  <Select
                    value={watch("category_id") ?? ""}
                    onValueChange={(value) => setValue("category_id", value)}
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
                </div>

                <div>
                  <Label>Brand</Label>
                  <Select
                    value={watch("brand_id") ?? ""}
                    onValueChange={(value) => setValue("brand_id", value)}
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
                </div>
              </CardContent>
            </Card>

            {/* Pricing */}
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
                      setValue("price_on_request", checked === true)
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
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Status & Visibility */}
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
                      setValue("status", value as ProductFormData["status"])
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
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="featured"
                    checked={watch("featured")}
                    onCheckedChange={(checked) =>
                      setValue("featured", checked === true)
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
