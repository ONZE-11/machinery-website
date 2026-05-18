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
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, AlertCircle, Package } from "lucide-react"

type ProductBasic = { slug: string; title: string; model: string | null }

interface Props {
  settings: Record<string, string>
  products: ProductBasic[]
}

export function ContactoPageClient({ settings, products }: Props) {
  const searchParams = useSearchParams()
  const productSlug = searchParams.get("producto")
  const selectedProduct = productSlug
    ? products.find((p) => p.slug === productSlug) ?? null
    : null

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      // Subject pre-filled with product name only in the subject field
      subject: selectedProduct ? `Consulta: ${selectedProduct.title}` : "",
      // Message starts clean — product is already shown in the banner & subject
      message: "",
      product_interest: selectedProduct?.slug ?? "",
      privacy_accepted: false,
    },
  })

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    // Extra guard — react-hook-form + zod should prevent this, but belt-and-suspenders
    if (!data.privacy_accepted) return

    setIsSubmitting(true)
    setSubmitStatus(null)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        setSubmitStatus("success")
        reset()
      } else {
        setSubmitStatus("error")
      }
    } catch {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const settingsAddress = settings.address ?? ""
  const settingsPhone   = settings.phone   ?? ""
  const settingsWhatsapp = settings.whatsapp ?? ""
  const settingsEmail   = settings.email   ?? ""
  const settingsHours   = settings.hours   ?? ""

  return (
    <main>
      {/* Hero */}
      <section className="relative py-20 bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-6">
              <span className="text-primary">Contáctenos</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Estamos aquí para ayudarle. Solicite información, presupuestos o resuelva
              cualquier duda sobre nuestra maquinaria japonesa. Respuesta garantizada en 24 horas laborables.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Contact info sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-1"
            >
              <h2 className="text-2xl font-heading font-bold text-foreground mb-6">
                Información de Contacto
              </h2>
              <div className="space-y-6">
                {settingsAddress && (
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Dirección</h3>
                      <p className="text-muted-foreground">{settingsAddress}</p>
                    </div>
                  </div>
                )}
                {settingsPhone && (
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Teléfono</h3>
                      <a href={`tel:${settingsPhone}`} className="text-muted-foreground hover:text-primary transition-colors">
                        {settingsPhone}
                      </a>
                      {settingsWhatsapp && (
                        <p className="text-sm text-muted-foreground mt-1">WhatsApp disponible</p>
                      )}
                    </div>
                  </div>
                )}
                {settingsEmail && (
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Email</h3>
                      <a href={`mailto:${settingsEmail}`} className="text-muted-foreground hover:text-primary transition-colors">
                        {settingsEmail}
                      </a>
                    </div>
                  </div>
                )}
                {settingsHours && (
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Horario</h3>
                      <p className="text-muted-foreground whitespace-pre-line">{settingsHours}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-8 rounded-lg overflow-hidden border border-border">
                <iframe
                  src="https://www.google.com/maps?q=Pol%C3%ADgono+Industrial+Fuente+del+Jarro%2C+Paterna%2C+Valencia%2C+Espa%C3%B1a&output=embed"
                  className="w-full aspect-[4/3] border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación Maquinaria Japonesa"
                  allowFullScreen
                />
              </div>
            </motion.div>

            {/* Form column */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-2"
            >
              <div className="bg-card border border-border rounded-lg p-8">
                <h2 className="text-2xl font-heading font-bold text-foreground mb-6">
                  Envíenos un Mensaje
                </h2>

                {/* Product prefill banner — shown once, clearly */}
                {selectedProduct && (
                  <div className="mb-6 flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/20">
                    <Package className="h-5 w-5 text-primary shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">Consulta sobre el producto:</p>
                      <p className="text-sm font-semibold text-foreground truncate">{selectedProduct.title}</p>
                    </div>
                  </div>
                )}

                {/* Success */}
                {submitStatus === "success" && (
                  <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0" />
                    <p className="text-emerald-400">
                      ¡Mensaje enviado correctamente! Nos pondremos en contacto con usted pronto.
                    </p>
                  </div>
                )}

                {/* Error */}
                {submitStatus === "error" && (
                  <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-3">
                    <AlertCircle className="h-5 w-5 text-red-500 shrink-0" />
                    <p className="text-red-400">
                      Hubo un error al enviar el mensaje. Por favor, inténtelo de nuevo o contáctenos por teléfono.
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
                  {/* Name + Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name">Nombre completo <span className="text-red-500">*</span></Label>
                      <Input id="name" {...register("name")} className="mt-2" placeholder="Su nombre" />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                      <Input id="email" type="email" {...register("email")} className="mt-2" placeholder="su@email.com" />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="phone">Teléfono</Label>
                      <Input id="phone" {...register("phone")} className="mt-2" placeholder="+34 601 080 799" />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="company">Empresa</Label>
                      <Input id="company" {...register("company")} className="mt-2" placeholder="Nombre de su empresa" />
                    </div>
                  </div>

                  {/* Product interest */}
                  <div>
                    <Label htmlFor="product_interest">Producto de interés</Label>
                    <Select
                      value={watch("product_interest")}
                      onValueChange={(value) => setValue("product_interest", value, { shouldDirty: true })}
                    >
                      <SelectTrigger className="mt-2" id="product_interest">
                        <SelectValue placeholder="Seleccione un producto (opcional)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">Consulta general</SelectItem>
                        {products.map((p) => (
                          <SelectItem key={p.slug} value={p.slug}>
                            {p.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Subject */}
                  <div>
                    <Label htmlFor="subject">Asunto <span className="text-red-500">*</span></Label>
                    <Input id="subject" {...register("subject")} className="mt-2" placeholder="Asunto de su consulta" />
                    {errors.subject && (
                      <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <Label htmlFor="message">Mensaje <span className="text-red-500">*</span></Label>
                    <Textarea
                      id="message"
                      {...register("message")}
                      className="mt-2 min-h-[150px]"
                      placeholder="Escriba su mensaje aquí..."
                    />
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  {/* Privacy checkbox */}
                  <div className="space-y-1.5">
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="privacy"
                        checked={watch("privacy_accepted")}
                        onCheckedChange={(checked) =>
                          setValue("privacy_accepted", checked === true, { shouldValidate: true })
                        }
                        className="mt-0.5"
                      />
                      <Label htmlFor="privacy" className="text-sm font-normal cursor-pointer leading-relaxed">
                        He leído y acepto la{" "}
                        <a href="/privacidad" target="_blank" className="text-primary hover:underline">
                          Política de Privacidad
                        </a>{" "}
                        <span className="text-red-500">*</span>
                      </Label>
                    </div>
                    {errors.privacy_accepted && (
                      <p className="text-red-500 text-sm pl-7">{errors.privacy_accepted.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full gap-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Enviando..."
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        Enviar Mensaje
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
}
