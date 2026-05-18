"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { contactFormSchema, type ContactFormData } from "@/lib/validations"
import {
  MapPin, Phone, Mail, Clock, Send,
  CheckCircle, AlertCircle, Package, X, MessageSquare,
} from "lucide-react"

type ProductBasic = { slug: string; title: string; model: string | null }

interface Props {
  settings: Record<string, string>
  products: ProductBasic[]
}

const NO_PRODUCT = "__general__"

export function ContactoPageClient({ settings, products }: Props) {
  const searchParams = useSearchParams()
  const productSlug  = searchParams.get("producto")
  const initialProduct = productSlug
    ? products.find((p) => p.slug === productSlug) ?? null
    : null

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null)

  const {
    register, handleSubmit,
    formState: { errors },
    reset, setValue, watch,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name:             "",
      email:            "",
      phone:            "",
      company:          "",
      subject:          "",
      message:          "",
      product_interest: initialProduct?.slug ?? "",
      privacy_accepted: false,
    },
  })

  const productInterestValue = watch("product_interest")
  const activeProduct = productInterestValue
    ? products.find((p) => p.slug === productInterestValue) ?? null
    : null

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    if (!data.privacy_accepted) return
    const productTitle = data.product_interest
      ? products.find((p) => p.slug === data.product_interest)?.title ?? data.product_interest
      : undefined

    setIsSubmitting(true)
    setSubmitStatus(null)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, product_interest: productTitle }),
      })
      if (res.ok) { setSubmitStatus("success"); reset() }
      else         { setSubmitStatus("error") }
    } catch {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const addr     = settings.address  ?? ""
  const phone    = settings.phone    ?? ""
  const whatsapp = settings.whatsapp ?? ""
  const email    = settings.email    ?? ""
  const hours    = settings.hours    ?? ""

  // ─── helpers ───────────────────────────────────────────────────────────────
  const Field = ({ error, children }: { error?: string; children: React.ReactNode }) => (
    <div className="space-y-1.5">{children}{error && <p className="text-[13px] text-red-500">{error}</p>}</div>
  )

  // ─── render ────────────────────────────────────────────────────────────────
  return (
    <main className="min-h-screen bg-background">

      {/* ── Hero ── */}
      <section className="bg-gradient-to-b from-muted/60 to-background border-b border-border">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-5">
              <MessageSquare className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-medium text-primary uppercase tracking-wider">Contacto</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
              ¿Hablamos de tu próxima{" "}
              <span className="text-primary">máquina?</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Cuéntenos qué necesita. Le respondemos en menos de 24 horas laborables
              con información, precios y disponibilidad.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Two-column layout ── */}
      <section className="py-14">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

            {/* ── Left: contact info ── */}
            <motion.aside
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2 space-y-4"
            >
              {/* Info card */}
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5">
                <h2 className="text-base font-semibold text-foreground">Información de contacto</h2>

                {addr && (
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <MapPin className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-[13px] font-medium text-foreground">Dirección</p>
                      <p className="text-[13px] text-muted-foreground">{addr}</p>
                    </div>
                  </div>
                )}

                {phone && (
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Phone className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-[13px] font-medium text-foreground">Teléfono</p>
                      <a href={`tel:${phone}`} className="text-[13px] text-muted-foreground hover:text-primary transition-colors">
                        {phone}
                      </a>
                      {whatsapp && <p className="text-[12px] text-muted-foreground/70 mt-0.5">WhatsApp disponible</p>}
                    </div>
                  </div>
                )}

                {email && (
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Mail className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-[13px] font-medium text-foreground">Email</p>
                      <a href={`mailto:${email}`} className="text-[13px] text-muted-foreground hover:text-primary transition-colors">
                        {email}
                      </a>
                    </div>
                  </div>
                )}

                {hours && (
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Clock className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-[13px] font-medium text-foreground">Horario</p>
                      <p className="text-[13px] text-muted-foreground whitespace-pre-line">{hours}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Map */}
              <div className="rounded-2xl overflow-hidden border border-border shadow-sm">
                <iframe
                  src="https://www.google.com/maps?q=Pol%C3%ADgono+Industrial+Fuente+del+Jarro%2C+Paterna%2C+Valencia%2C+Espa%C3%B1a&output=embed"
                  className="w-full aspect-[4/3] border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación Maquinaria Japonesa"
                  allowFullScreen
                />
              </div>
            </motion.aside>

            {/* ── Right: form ── */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="lg:col-span-3"
            >
              <div className="rounded-2xl border border-border bg-card shadow-sm p-7 md:p-9">

                {/* Success */}
                {submitStatus === "success" ? (
                  <div className="flex flex-col items-center text-center py-10 gap-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/15 flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-emerald-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-1">
                        Mensaje enviado correctamente
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        Nos pondremos en contacto con usted en menos de 24 horas laborables.
                      </p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => setSubmitStatus(null)} className="mt-2">
                      Enviar otro mensaje
                    </Button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-xl font-semibold text-foreground mb-6">Envíenos un mensaje</h2>

                    {/* Server error banner */}
                    {submitStatus === "error" && (
                      <div className="mb-5 p-3.5 bg-red-500/8 border border-red-500/25 rounded-xl flex items-center gap-3">
                        <AlertCircle className="h-4.5 w-4.5 text-red-500 shrink-0" />
                        <p className="text-[13px] text-red-400">
                          Error al enviar. Inténtelo de nuevo o llámenos directamente.
                        </p>
                      </div>
                    )}

                    {/* Selected product card — shown instead of/above dropdown */}
                    {activeProduct ? (
                      <div className="mb-5 flex items-center justify-between gap-3 p-3.5 rounded-xl bg-primary/5 border border-primary/20">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <Package className="h-4 w-4 text-primary shrink-0" />
                          <div className="min-w-0">
                            <span className="text-[11px] font-medium text-primary uppercase tracking-wide block">
                              Producto seleccionado
                            </span>
                            <p className="text-sm font-semibold text-foreground truncate">
                              {activeProduct.title}
                              {activeProduct.model && (
                                <span className="font-normal text-muted-foreground ml-1">— {activeProduct.model}</span>
                              )}
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setValue("product_interest", "", { shouldDirty: true })}
                          className="shrink-0 text-[12px] text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
                          title="Cambiar a consulta general"
                        >
                          <X className="h-3.5 w-3.5" />
                          <span className="hidden sm:inline">Consulta general</span>
                        </button>
                      </div>
                    ) : (
                      /* Dropdown only when no specific product is selected */
                      <Field>
                        <Label className="text-sm">Producto de interés</Label>
                        <Select
                          value={productInterestValue || NO_PRODUCT}
                          onValueChange={(v) =>
                            setValue("product_interest", v === NO_PRODUCT ? "" : v, { shouldDirty: true })
                          }
                        >
                          <SelectTrigger className="mt-1.5 h-10">
                            <SelectValue placeholder="Seleccione un producto (opcional)" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={NO_PRODUCT}>Consulta general</SelectItem>
                            {products.map((p) => (
                              <SelectItem key={p.slug} value={p.slug}>{p.title}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </Field>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-1" noValidate>

                      {/* Name + Email */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <Field error={errors.name?.message}>
                          <Label htmlFor="name" className="text-sm">
                            Nombre completo <span className="text-red-500">*</span>
                          </Label>
                          <Input id="name" {...register("name")} className="mt-1.5 h-10" placeholder="Su nombre completo" />
                        </Field>
                        <Field error={errors.email?.message}>
                          <Label htmlFor="email" className="text-sm">
                            Email <span className="text-red-500">*</span>
                          </Label>
                          <Input id="email" type="email" {...register("email")} className="mt-1.5 h-10" placeholder="su@email.com" />
                        </Field>
                        <Field error={errors.phone?.message}>
                          <Label htmlFor="phone" className="text-sm">Teléfono</Label>
                          <Input id="phone" {...register("phone")} className="mt-1.5 h-10" placeholder="+34 601 080 799" />
                        </Field>
                        <Field>
                          <Label htmlFor="company" className="text-sm">Empresa</Label>
                          <Input id="company" {...register("company")} className="mt-1.5 h-10" placeholder="Nombre de su empresa" />
                        </Field>
                      </div>

                      {/* Subject */}
                      <Field error={errors.subject?.message}>
                        <Label htmlFor="subject" className="text-sm">
                          Asunto <span className="text-red-500">*</span>
                        </Label>
                        <Input id="subject" {...register("subject")} className="mt-1.5 h-10" placeholder="Asunto de su consulta" />
                      </Field>

                      {/* Message */}
                      <Field error={errors.message?.message}>
                        <Label htmlFor="message" className="text-sm">
                          Mensaje <span className="text-red-500">*</span>
                        </Label>
                        <Textarea
                          id="message"
                          {...register("message")}
                          className="mt-1.5 min-h-[140px] resize-none"
                          placeholder="Escriba su mensaje aquí..."
                        />
                      </Field>

                      {/* Privacy */}
                      <div className="rounded-xl border border-border bg-muted/30 p-4 space-y-2">
                        <div className="flex items-start gap-3">
                          <Checkbox
                            id="privacy"
                            checked={watch("privacy_accepted")}
                            onCheckedChange={(c) =>
                              setValue("privacy_accepted", c === true, { shouldValidate: true })
                            }
                            className="mt-0.5"
                          />
                          <Label htmlFor="privacy" className="text-sm font-normal cursor-pointer leading-relaxed">
                            He leído y acepto la{" "}
                            <a href="/privacidad" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
                              Política de Privacidad
                            </a>{" "}
                            <span className="text-red-500">*</span>
                          </Label>
                        </div>
                        {errors.privacy_accepted && (
                          <p className="text-[13px] text-red-500 pl-7">{errors.privacy_accepted.message}</p>
                        )}
                      </div>

                      <Button type="submit" size="lg" className="w-full h-11 gap-2 text-sm font-semibold" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                            Enviando...
                          </span>
                        ) : (
                          <>
                            <Send className="h-4 w-4" />
                            Enviar Mensaje
                          </>
                        )}
                      </Button>
                    </form>
                  </>
                )}
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </main>
  )
}
