"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Header, Footer, WhatsAppButton } from "@/components/layout"
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
import { getContactSetting, mockProducts } from "@/lib/mock-data"
import { contactFormSchema, type ContactFormData } from "@/lib/validations"
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react"

export function ContactoPageClient() {
  const searchParams = useSearchParams()
  const productSlug = searchParams.get("producto")
  const product = productSlug
    ? mockProducts.find((p) => p.slug === productSlug)
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
      subject: product ? `Consulta: ${product.title}` : "",
      message: product
        ? `Me interesa obtener más información sobre el producto: ${product.title}${product.model ? ` (Modelo: ${product.model})` : ""}.`
        : "",
      product_interest: product?.slug || "",
      privacy_accepted: false,
    },
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setSubmitStatus(null)

    // Simulate API call (replace with real Supabase call when connected)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log("Form submitted:", data)
      setSubmitStatus("success")
      reset()
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const settingsAddress = getContactSetting('address')
  const settingsPhone = getContactSetting('phone')
  const settingsWhatsapp = getContactSetting('whatsapp')
  const settingsEmail = getContactSetting('email')
  const settingsHours = getContactSetting('hours')

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
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
                Estamos aquí para ayudarle. Solicite información, presupuestos o
                resuelva cualquier duda sobre nuestra maquinaria japonesa.
                Respuesta garantizada en 24 horas laborables.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Contact Info */}
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
                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        Dirección
                      </h3>
                      <p className="text-muted-foreground">
                        {settingsAddress}
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        Teléfono
                      </h3>
                      <a
                        href={`tel:${settingsPhone}`}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {settingsPhone}
                      </a>
                      {settingsWhatsapp && (
                        <p className="text-sm text-muted-foreground mt-1">
                          WhatsApp disponible
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        Email
                      </h3>
                      <a
                        href={`mailto:${settingsEmail}`}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {settingsEmail}
                      </a>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        Horario
                      </h3>
                      <p className="text-muted-foreground whitespace-pre-line">
                        {settingsHours}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Map placeholder */}
                <div className="mt-8 rounded-lg overflow-hidden border border-border">
                  <div className="aspect-[4/3] bg-muted flex items-center justify-center">
                    <p className="text-muted-foreground">
                      Mapa interactivo disponible próximamente
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Contact Form */}
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

                  {submitStatus === "success" && (
                    <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-emerald-500" />
                      <p className="text-emerald-400">
                        ¡Mensaje enviado correctamente! Nos pondremos en contacto
                        con usted pronto.
                      </p>
                    </div>
                  )}

                  {submitStatus === "error" && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-3">
                      <AlertCircle className="h-5 w-5 text-red-500" />
                      <p className="text-red-400">
                        Hubo un error al enviar el mensaje. Por favor, inténtelo
                        de nuevo o contáctenos por teléfono.
                      </p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Name */}
                      <div>
                        <Label htmlFor="name">
                          Nombre completo <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="name"
                          {...register("name")}
                          className="mt-2"
                          placeholder="Su nombre"
                        />
                        {errors.name && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.name.message}
                          </p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <Label htmlFor="email">
                          Email <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          {...register("email")}
                          className="mt-2"
                          placeholder="su@email.com"
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.email.message}
                          </p>
                        )}
                      </div>

                      {/* Phone */}
                      <div>
                        <Label htmlFor="phone">Teléfono</Label>
                        <Input
                          id="phone"
                          {...register("phone")}
                          className="mt-2"
                          placeholder="+34 600 000 000"
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.phone.message}
                          </p>
                        )}
                      </div>

                      {/* Company */}
                      <div>
                        <Label htmlFor="company">Empresa</Label>
                        <Input
                          id="company"
                          {...register("company")}
                          className="mt-2"
                          placeholder="Nombre de su empresa"
                        />
                      </div>
                    </div>

                    {/* Product Interest */}
                    <div>
                      <Label htmlFor="product_interest">
                        Producto de interés
                      </Label>
                      <Select
                        value={watch("product_interest")}
                        onValueChange={(value) =>
                          setValue("product_interest", value)
                        }
                      >
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Seleccione un producto (opcional)" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">
                            Consulta general
                          </SelectItem>
                          {mockProducts.map((p) => (
                            <SelectItem key={p.slug} value={p.slug}>
                              {p.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Subject */}
                    <div>
                      <Label htmlFor="subject">
                        Asunto <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="subject"
                        {...register("subject")}
                        className="mt-2"
                        placeholder="Asunto de su consulta"
                      />
                      {errors.subject && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.subject.message}
                        </p>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <Label htmlFor="message">
                        Mensaje <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="message"
                        {...register("message")}
                        className="mt-2 min-h-[150px]"
                        placeholder="Escriba su mensaje aquí..."
                      />
                      {errors.message && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.message.message}
                        </p>
                      )}
                    </div>

                    {/* Privacy */}
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="privacy"
                        checked={watch("privacy_accepted")}
                        onCheckedChange={(checked) =>
                          setValue("privacy_accepted", checked === true)
                        }
                      />
                      <div className="grid gap-1.5 leading-none">
                        <Label
                          htmlFor="privacy"
                          className="text-sm font-normal cursor-pointer"
                        >
                          He leído y acepto la{" "}
                          <a
                            href="/privacidad"
                            target="_blank"
                            className="text-primary hover:underline"
                          >
                            Política de Privacidad
                          </a>{" "}
                          <span className="text-red-500">*</span>
                        </Label>
                        {errors.privacy_accepted && (
                          <p className="text-red-500 text-sm">
                            {errors.privacy_accepted.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Submit */}
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
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
