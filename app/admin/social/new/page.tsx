"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Save } from "lucide-react"

const schema = z.object({
  platform: z.string().min(1, "La plataforma es obligatoria").max(50),
  url: z.string().url("URL no válida"),
  icon: z.string().max(50).optional(),
  display_order: z.number().int().min(0).default(0),
  active: z.boolean().default(true),
})
type FormData = z.infer<typeof schema>

export default function NewSocialLinkPage() {
  const router = useRouter()
  const { register, handleSubmit, watch, setValue, setError, formState: { errors, isSubmitting } } =
    useForm<FormData>({
      resolver: zodResolver(schema),
      defaultValues: { platform: "", url: "", icon: "", display_order: 0, active: true },
    })

  const onSubmit = async (data: FormData) => {
    const res = await fetch("/api/social", {
      method: "POST",
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/social">
            <Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">New Social Link</h1>
            <p className="text-muted-foreground">Add a social media link</p>
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
                <Input id="platform" {...register("platform")} className="mt-2" placeholder="whatsapp" />
                {errors.platform && <p className="text-red-500 text-sm mt-1">{errors.platform.message}</p>}
              </div>
              <div>
                <Label htmlFor="url">URL *</Label>
                <Input id="url" {...register("url")} className="mt-2" placeholder="https://wa.me/34600000000" />
                {errors.url && <p className="text-red-500 text-sm mt-1">{errors.url.message}</p>}
              </div>
              <div>
                <Label htmlFor="icon">Icon name</Label>
                <Input id="icon" {...register("icon")} className="mt-2" placeholder="whatsapp" />
                <p className="text-xs text-muted-foreground mt-1">Icon identifier used in UI components</p>
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
