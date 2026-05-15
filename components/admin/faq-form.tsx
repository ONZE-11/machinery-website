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
import { faqSchema, type FAQFormData } from "@/lib/validations"
import { ArrowLeft, Save } from "lucide-react"

interface FAQFormProps {
  faqId?: string
  defaultValues?: Partial<FAQFormData>
}

export function FAQForm({ faqId, defaultValues }: FAQFormProps) {
  const router = useRouter()
  const isEdit = Boolean(faqId)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FAQFormData>({
    resolver: zodResolver(faqSchema),
    defaultValues: {
      question: "",
      answer: "",
      category: null,
      display_order: 0,
      active: true,
      ...defaultValues,
    },
  })

  useEffect(() => {
    if (defaultValues) {
      reset({ question: "", answer: "", category: null, display_order: 0, active: true, ...defaultValues })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSubmit = async (data: FAQFormData) => {
    const url = isEdit ? `/api/faq/${faqId}` : "/api/faq"
    const method = isEdit ? "PATCH" : "POST"

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })

    if (!res.ok) {
      const json = await res.json().catch(() => ({}))
      setError("root", { message: (json as { error?: string }).error ?? "Error al guardar" })
      return
    }

    router.push("/admin/faq")
    router.refresh()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/faq">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {isEdit ? "Edit FAQ" : "New FAQ"}
            </h1>
            <p className="text-muted-foreground">
              {isEdit ? "Update question and answer" : "Add a frequently asked question"}
            </p>
          </div>
        </div>
        <Button onClick={handleSubmit(onSubmit)} disabled={isSubmitting} className="gap-2">
          <Save className="h-4 w-4" />
          {isSubmitting ? "Saving..." : "Save FAQ"}
        </Button>
      </div>

      {errors.root && <p className="text-red-500 text-sm">{errors.root.message}</p>}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader><CardTitle>Question & Answer</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="question">Question *</Label>
                  <Textarea
                    id="question"
                    {...register("question")}
                    className="mt-2"
                    placeholder="¿Qué garantía tienen los equipos?"
                    rows={3}
                  />
                  {errors.question && <p className="text-red-500 text-sm mt-1">{errors.question.message}</p>}
                </div>
                <div>
                  <Label htmlFor="answer">Answer *</Label>
                  <Textarea
                    id="answer"
                    {...register("answer")}
                    className="mt-2"
                    placeholder="Todos los equipos incluyen una garantía de..."
                    rows={6}
                  />
                  {errors.answer && <p className="text-red-500 text-sm mt-1">{errors.answer.message}</p>}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader><CardTitle>Settings</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    {...register("category")}
                    className="mt-2"
                    placeholder="e.g., Garantías, Envío..."
                  />
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
        </div>
      </form>
    </div>
  )
}
