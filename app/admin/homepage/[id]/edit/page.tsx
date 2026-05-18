"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
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
import { homepageSectionSchema, type HomepageSectionFormData } from "@/lib/validations"
import type { HomepageSection } from "@/types/database"
import { ArrowLeft, Save, Loader2 } from "lucide-react"

type EditableFields = Omit<HomepageSectionFormData, "section_key">
const editSchema = homepageSectionSchema.omit({ section_key: true })

// Human-readable labels for each section key
const SECTION_LABELS: Record<string, string> = {
  hero:              "Home — main hero",
  why_japanese_home: "Home — Why Japanese section",
  why_japanese_page: "Page — ¿Por Qué Japonesa? (/por-que-maquinaria-japonesa)",
  hero_secondary:    "Secondary / contact hero",
  trust:             "About / trust section (/sobre-nosotros)",
}

export default function EditHomepageSectionPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [sectionKey, setSectionKey] = useState("")
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
          reset({
            title: data.title,
            subtitle: data.subtitle,
            content: data.content,
            image: data.image,
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
            <div className="flex items-center gap-2 mt-0.5">
              <code className="text-xs bg-muted px-1.5 py-0.5 rounded text-muted-foreground">
                {sectionKey}
              </code>
              {SECTION_LABELS[sectionKey] && (
                <span className="text-xs text-muted-foreground">
                  — {SECTION_LABELS[sectionKey]}
                </span>
              )}
            </div>
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

          {/* ── Left: text content + CTA ── */}
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

          {/* ── Right: image + settings ── */}
          <div className="space-y-6">
            <Card>
              <CardHeader><CardTitle>Image</CardTitle></CardHeader>
              <CardContent>
                <ImageUploader
                  bucket="homepage"
                  value={watch("image") ?? undefined}
                  onUpload={(url) => setValue("image", url, { shouldDirty: true })}
                  onRemove={() => setValue("image", null, { shouldDirty: true })}
                  label="Section image"
                  aspect="video"
                />
                {errors.image && (
                  <p className="text-red-500 text-sm mt-2">{errors.image.message}</p>
                )}
              </CardContent>
            </Card>

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
