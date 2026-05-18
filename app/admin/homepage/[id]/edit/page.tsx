"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ImageUploader } from "@/components/admin/image-uploader"
import { homepageSectionSchema } from "@/lib/validations"
import type { HomepageSection } from "@/types/database"
import { ArrowLeft, Save, Loader2, ImageIcon, Trash2 } from "lucide-react"

// `image` is the protected default — excluded from the editable form schema
const editSchema = homepageSectionSchema.omit({ section_key: true, image: true })
type EditableFields = z.infer<typeof editSchema>

export default function EditHomepageSectionPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()

  const [sectionKey, setSectionKey] = useState("")
  const [defaultImage, setDefaultImage] = useState<string | null>(null) // read-only
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  const {
    register, handleSubmit, watch, setValue, setError, reset,
    formState: { errors, isSubmitting },
  } = useForm<EditableFields>({ resolver: zodResolver(editSchema) })

  useEffect(() => {
    fetch(`/api/homepage/${id}`)
      .then((r) => {
        if (r.status === 404) { setNotFound(true); return null }
        return r.json()
      })
      .then((data: HomepageSection | null) => {
        if (data) {
          setSectionKey(data.section_key)
          setDefaultImage(data.image ?? null)   // stored separately, never in form
          reset({
            title: data.title,
            subtitle: data.subtitle,
            content: data.content,
            custom_image: data.custom_image,    // admin override
            cta_text: data.cta_text,
            cta_link: data.cta_link,
            display_order: data.display_order,
            active: data.active,
          })
        }
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false))
  }, [id, reset])

  const onSubmit = async (data: EditableFields) => {
    const res = await fetch(`/api/homepage/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!res.ok) {
      const json = await res.json().catch(() => ({}))
      setError("root" as keyof EditableFields, {
        message: (json as { error?: string }).error ?? "Error al guardar",
      })
      return
    }
    router.push("/admin/homepage")
    router.refresh()
  }

  const customImage = watch("custom_image")
  // What the visitor currently sees
  const effectiveImage = customImage || defaultImage

  if (loading) return (
    <div className="flex items-center justify-center py-24">
      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
    </div>
  )
  if (notFound) return (
    <div className="text-center py-24 text-muted-foreground">Section not found</div>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/homepage">
            <Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Edit Section</h1>
            <p className="text-muted-foreground">
              <code className="text-xs bg-muted px-1.5 py-0.5 rounded">{sectionKey}</code>
            </p>
          </div>
        </div>
        <Button onClick={handleSubmit(onSubmit)} disabled={isSubmitting} className="gap-2">
          <Save className="h-4 w-4" />
          {isSubmitting ? "Saving..." : "Save Section"}
        </Button>
      </div>

      {(errors as { root?: { message?: string } }).root && (
        <p className="text-red-500 text-sm">{(errors as { root?: { message?: string } }).root?.message}</p>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ── Left column: text content + CTA ── */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader><CardTitle>Content</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" {...register("title")} className="mt-2" placeholder="Section title..." />
                  {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                </div>
                <div>
                  <Label htmlFor="subtitle">Subtitle</Label>
                  <Input id="subtitle" {...register("subtitle")} className="mt-2" placeholder="Supporting subtitle..." />
                </div>
                <div>
                  <Label htmlFor="content">Content</Label>
                  <Textarea id="content" {...register("content")} className="mt-2" rows={5} placeholder="Body content..." />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Call to Action</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="cta_text">Button Text</Label>
                  <Input id="cta_text" {...register("cta_text")} className="mt-2" placeholder="Ver catálogo" />
                </div>
                <div>
                  <Label htmlFor="cta_link">Button Link</Label>
                  <Input id="cta_link" {...register("cta_link")} className="mt-2" placeholder="/catalogo" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ── Right column: image + settings ── */}
          <div className="space-y-6">

            {/* Image card */}
            <Card>
              <CardHeader><CardTitle>Image</CardTitle></CardHeader>
              <CardContent className="space-y-5">

                {/* Live preview — what visitors actually see */}
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                    Visitor preview
                  </p>
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-muted border">
                    {effectiveImage ? (
                      <>
                        <img
                          src={effectiveImage}
                          alt="Current section image"
                          className="w-full h-full object-cover"
                        />
                        {customImage && (
                          <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-[10px] font-semibold px-2 py-0.5 rounded-full">
                            Custom override
                          </span>
                        )}
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full gap-2 text-muted-foreground">
                        <ImageIcon className="h-6 w-6" />
                        <span className="text-xs">No image set</span>
                      </div>
                    )}
                  </div>
                  {!customImage && defaultImage && (
                    <p className="text-xs text-muted-foreground mt-1.5">
                      Showing default image. Upload a custom image to override it.
                    </p>
                  )}
                </div>

                <div className="border-t border-border pt-4 space-y-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">Custom Image Override</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Replaces the default. Remove to restore the original.
                    </p>
                  </div>

                  <ImageUploader
                    bucket="homepage"
                    value={customImage ?? undefined}
                    onUpload={(url) => setValue("custom_image", url, { shouldDirty: true })}
                    onRemove={() => setValue("custom_image", null, { shouldDirty: true })}
                    label="Upload override image"
                    aspect="video"
                  />

                  {/* Explicit "Remove custom image" button when one is set */}
                  {customImage && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="w-full gap-2 text-destructive hover:text-destructive border-destructive/30 hover:border-destructive/60"
                      onClick={() => setValue("custom_image", null, { shouldDirty: true })}
                    >
                      <Trash2 className="h-4 w-4" />
                      Remove Custom Image
                    </Button>
                  )}

                  {errors.custom_image && (
                    <p className="text-red-500 text-sm">{errors.custom_image.message}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Settings card */}
            <Card>
              <CardHeader><CardTitle>Settings</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Checkbox
                    id="active"
                    checked={watch("active")}
                    onCheckedChange={(checked) => setValue("active", checked === true)}
                  />
                  <Label htmlFor="active" className="cursor-pointer">Active</Label>
                </div>
                <div>
                  <Label htmlFor="display_order">Display Order</Label>
                  <Input
                    id="display_order"
                    type="number"
                    {...register("display_order", { valueAsNumber: true })}
                    className="mt-2"
                    min={0}
                  />
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </form>
    </div>
  )
}
