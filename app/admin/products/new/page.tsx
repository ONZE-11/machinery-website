"use client"

import { useState } from "react"
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
import { mockCategories, mockBrands } from "@/lib/mock-data"
import { productSchema, type ProductFormData } from "@/lib/validations"
import { ArrowLeft, Save, Eye, Image, Plus, X } from "lucide-react"

export default function NewProductPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [images, setImages] = useState<string[]>([])

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      short_description: "",
      condition: "used",
      price: undefined,
      price_on_request: false,
      featured: false,
      is_active: true,
      images: [],
      specifications: {},
    },
  })

  const watchName = watch("name")
  const watchPriceOnRequest = watch("price_on_request")

  // Auto-generate slug from name
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }

  const onSubmit = async (data: ProductFormData) => {
    setIsSubmitting(true)
    
    // Simulate API call - replace with Supabase when connected
    try {
      console.log("Product data:", { ...data, images })
      await new Promise((resolve) => setTimeout(resolve, 1000))
      router.push("/admin/products")
    } catch (error) {
      console.error("Error creating product:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const addImagePlaceholder = () => {
    setImages([...images, `https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&h=600&fit=crop&q=80`])
  }

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
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
            <p className="text-muted-foreground">
              Add a new product to your catalog
            </p>
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

              <TabsContent value="general" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="name">Product Name *</Label>
                      <Input
                        id="name"
                        {...register("name")}
                        className="mt-2"
                        placeholder="e.g., Komatsu PC200-8 Excavator"
                        onBlur={() => {
                          if (!watch("slug")) {
                            setValue("slug", generateSlug(watchName))
                          }
                        }}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="slug">URL Slug *</Label>
                      <Input
                        id="slug"
                        {...register("slug")}
                        className="mt-2"
                        placeholder="komatsu-pc200-8-excavator"
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
                      <Label htmlFor="description">Full Description</Label>
                      <Textarea
                        id="description"
                        {...register("description")}
                        className="mt-2"
                        placeholder="Detailed product description with features and benefits..."
                        rows={6}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Images */}
                <Card>
                  <CardHeader>
                    <CardTitle>Images</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {images.map((img, index) => (
                        <div
                          key={index}
                          className="relative aspect-square bg-muted rounded-lg overflow-hidden group"
                        >
                          <img
                            src={img}
                            alt={`Product image ${index + 1}`}
                            className="object-cover w-full h-full"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-4 w-4" />
                          </button>
                          {index === 0 && (
                            <span className="absolute bottom-2 left-2 text-xs px-2 py-1 bg-primary text-primary-foreground rounded">
                              Main
                            </span>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={addImagePlaceholder}
                        className="aspect-square border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-2 hover:border-primary/50 transition-colors"
                      >
                        <Image className="h-8 w-8 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          Add Image
                        </span>
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-4">
                      Upload images or add URLs. First image will be the main product image.
                    </p>
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
                          min={1990}
                          max={new Date().getFullYear()}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="hours">Operating Hours</Label>
                        <Input
                          id="hours"
                          type="number"
                          {...register("hours", { valueAsNumber: true })}
                          className="mt-2"
                          placeholder="5000"
                        />
                      </div>
                      <div>
                        <Label htmlFor="serial_number">Serial Number</Label>
                        <Input
                          id="serial_number"
                          {...register("serial_number")}
                          className="mt-2"
                          placeholder="KMTPC123456"
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Condition *</Label>
                      <Select
                        value={watch("condition")}
                        onValueChange={(value) => setValue("condition", value as "new" | "used" | "refurbished")}
                      >
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">New</SelectItem>
                          <SelectItem value="used">Used</SelectItem>
                          <SelectItem value="refurbished">Refurbished</SelectItem>
                        </SelectContent>
                      </Select>
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
                      <Label htmlFor="meta_title">Meta Title</Label>
                      <Input
                        id="meta_title"
                        {...register("meta_title")}
                        className="mt-2"
                        placeholder="Leave empty to use product name"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Recommended: 50-60 characters
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="meta_description">Meta Description</Label>
                      <Textarea
                        id="meta_description"
                        {...register("meta_description")}
                        className="mt-2"
                        placeholder="SEO description for search engines..."
                        rows={3}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Recommended: 150-160 characters
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Organization</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Category</Label>
                  <Select
                    value={watch("category_id") || ""}
                    onValueChange={(value) => setValue("category_id", value)}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockCategories.map((cat) => (
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
                    value={watch("brand_id") || ""}
                    onValueChange={(value) => setValue("brand_id", value)}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select brand" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockBrands.map((brand) => (
                        <SelectItem key={brand.id} value={brand.id}>
                          {brand.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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

            <Card>
              <CardHeader>
                <CardTitle>Visibility</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="is_active"
                    checked={watch("is_active")}
                    onCheckedChange={(checked) =>
                      setValue("is_active", checked === true)
                    }
                  />
                  <Label htmlFor="is_active" className="cursor-pointer">
                    Published (visible on site)
                  </Label>
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
