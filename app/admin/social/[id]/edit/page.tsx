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
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { SocialLink } from "@/types/database"
import { ArrowLeft, Save, Loader2 } from "lucide-react"

const schema = z.object({
  platform: z.string().min(1).max(50),
  url: z.string().url("URL no válida"),
  icon: z.string().max(50).optional(),
  display_order: z.number().int().min(0).default(0),
  active: z.boolean().default(true),
})
type FormData = z.infer<typeof schema>

export default function EditSocialLinkPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  const { register, handleSubmit, watch, setValue, setError, reset, formState: { errors, isSubmitting } } =
    useForm<FormData>({ resolver: zodResolver(schema) })

  useEffect(() => {
    fetch(`/api/social/${id}`)
      .then((r) => {
        if (r.status === 404) { setNotFound(true); return null }
        return r.json()
      })
      .then((data: SocialLink | null) => {
        if (data) reset({ platform: data.platform, url: data.url, icon: data.icon ?? "", display_order: data.display_order, active: data.active })
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false))
  }, [id, reset])

  const onSubmit = async (data: FormData) => {
    const res = await fetch(`/api/social/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, icon: data.icon || null }),
    })
    if (!res.ok) {
      const json = await res.json().catch(() => ({}))
      setError("root", { message: (json as { error?: string }).error ?? "Error al guardar" })
      return
    }
    router.push("/admin/social")
    router.refresh()
  }

  if (loading) return <div className="flex items-center justify-center py-24"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
  if (notFound) return <div className="text-center py-24 text-muted-foreground">Link not found</div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/social">
            <Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Edit Social Link</h1>
            <p className="text-muted-foreground">Update social media link</p>
          </div>
        </div>
        <Button onClick={handleSubmit(onSubmit)} disabled={isSubmitting} className="gap-2">
          <Save className="h-4 w-4" />
          {isSubmitting ? "Saving..." : "Save Link"}
        </Button>
      </div>

      {errors.root && <p className="text-red-500 text-sm">{errors.root.message}</p>}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="max-w-lg">
          <Card>
            <CardHeader><CardTitle>Link Details</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="platform">Platform *</Label>
                <Input id="platform" {...register("platform")} className="mt-2" />
                {errors.platform && <p className="text-red-500 text-sm mt-1">{errors.platform.message}</p>}
              </div>
              <div>
                <Label htmlFor="url">URL *</Label>
                <Input id="url" {...register("url")} className="mt-2" />
                {errors.url && <p className="text-red-500 text-sm mt-1">{errors.url.message}</p>}
              </div>
              <div>
                <Label htmlFor="icon">Icon name</Label>
                <Input id="icon" {...register("icon")} className="mt-2" />
              </div>
              <div>
                <Label htmlFor="display_order">Display Order</Label>
                <Input id="display_order" type="number" {...register("display_order", { valueAsNumber: true })} className="mt-2" min={0} />
              </div>
              <div className="flex items-center gap-3">
                <Checkbox
                  id="active"
                  checked={watch("active")}
                  onCheckedChange={(checked) => setValue("active", checked === true)}
                />
                <Label htmlFor="active" className="cursor-pointer">Active</Label>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  )
}
