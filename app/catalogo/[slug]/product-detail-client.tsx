"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ProductCard } from "@/components/products/product-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Phone,
  Mail,
  Check,
  Calendar,
  Gauge,
  Factory,
  Tag,
  Scale,
  MapPin,
  Shield,
  Truck,
  FileText,
} from "lucide-react"
import type { Product } from "@/types/database"

interface ProductDetailClientProps {
  product: Product
  relatedProducts: Product[]
}

const conditionLabels: Record<string, string> = {
  excelente: "Excelente",
  muy_bueno: "Muy Bueno",
  bueno: "Bueno",
  aceptable: "Aceptable",
}

const conditionColors: Record<string, string> = {
  excelente: "bg-emerald-500/15 text-emerald-600 border-emerald-500/30",
  muy_bueno: "bg-blue-500/15 text-blue-600 border-blue-500/30",
  bueno: "bg-amber-500/15 text-amber-600 border-amber-500/30",
  aceptable: "bg-muted text-muted-foreground border-border",
}

const trustPoints = [
  { icon: Shield, text: "Importación directa de Japón" },
  { icon: Check, text: "Garantía incluida" },
  { icon: FileText, text: "Documentación completa" },
  { icon: Truck, text: "Envío a toda España" },
  { icon: MapPin, text: "Valencia, España" },
  { icon: Phone, text: "Soporte técnico propio" },
]

const statusBadge: Record<string, { label: string; className: string }> = {
  reserved: {
    label: "Reservado",
    className: "bg-amber-500/15 text-amber-700 border-amber-500/30",
  },
  sold: {
    label: "Vendido",
    className: "bg-foreground/10 text-foreground border-foreground/20",
  },
}

export function ProductDetailClient({
  product,
  relatedProducts,
}: ProductDetailClientProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const heroImage = product.hero_image || "/images/placeholder-machinery.jpg"
  const images =
    product.gallery_images.length > 0
      ? product.gallery_images
      : [heroImage]

  const nextImage = () => setCurrentImageIndex((p) => (p + 1) % images.length)
  const prevImage = () => setCurrentImageIndex((p) => (p - 1 + images.length) % images.length)

  const quickSpecs = [
    product.model && { icon: Tag, label: "Modelo", value: product.model },
    product.year && { icon: Calendar, label: "Año", value: String(product.year) },
    product.hours_used != null && {
      icon: Gauge,
      label: "Horas",
      value: `${product.hours_used.toLocaleString("es-ES")} h`,
    },
    product.brand && { icon: Factory, label: "Marca", value: product.brand.name },
    product.weight && { icon: Scale, label: "Peso", value: `${product.weight.toLocaleString("es-ES")} kg` },
  ].filter(Boolean) as Array<{ icon: typeof Tag; label: string; value: string }>

  return (
    <main className="pb-8 pt-24">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Main layout: gallery + purchase panel */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 mb-16">

          {/* ── Left: Gallery ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Main image */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted mb-3 group">
              <Image
                src={images[currentImageIndex]}
                alt={product.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                priority
              />

              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 bg-black/60 hover:bg-black/80 rounded-full text-white transition-colors shadow-lg"
                    aria-label="Imagen anterior"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 bg-black/60 hover:bg-black/80 rounded-full text-white transition-colors shadow-lg"
                    aria-label="Siguiente imagen"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}

              <div className="absolute bottom-3 right-3 px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                {currentImageIndex + 1} / {images.length}
              </div>

              {/* Featured badge */}
              {product.featured && (
                <div className="absolute top-3 left-3">
                  <Badge className="bg-primary text-white border-0 shadow-md">Destacado</Badge>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImageIndex(i)}
                    className={`relative w-20 h-16 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                      i === currentImageIndex
                        ? "border-primary shadow-md shadow-primary/20"
                        : "border-transparent hover:border-primary/40 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.title} ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Tabs section on desktop — inline below gallery */}
            <div className="mt-10 hidden lg:block">
              <Tabs defaultValue="description">
                <TabsList className="w-full justify-start border-b border-border rounded-none bg-transparent h-auto p-0 mb-8">
                  {["description", "specs", "contact"].map((tab) => (
                    <TabsTrigger
                      key={tab}
                      value={tab}
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3 capitalize"
                    >
                      {tab === "description" ? "Descripción" : tab === "specs" ? "Especificaciones" : "Contacto"}
                    </TabsTrigger>
                  ))}
                </TabsList>
                <TabsContent value="description">
                  {product.description ? (
                    <div
                      dangerouslySetInnerHTML={{ __html: product.description }}
                      className="[&_h3]:font-serif [&_h3]:text-lg [&_h3]:text-foreground [&_h3]:mt-5 [&_h3]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_li]:text-sm [&_p]:text-sm text-muted-foreground leading-relaxed space-y-3"
                    />
                  ) : (
                    <p className="text-muted-foreground">Para más información contáctenos directamente.</p>
                  )}
                </TabsContent>
                <TabsContent value="specs">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-border rounded-xl overflow-hidden">
                    {product.specifications &&
                      Object.entries(product.specifications).map(([key, value], i) => (
                        <div
                          key={key}
                          className={`flex justify-between px-5 py-3.5 text-sm ${
                            i % 2 === 0 ? "bg-card" : "bg-muted/30"
                          } border-b border-border last:border-0`}
                        >
                          <span className="text-muted-foreground">{key.replace(/_/g, " ")}</span>
                          <span className="font-medium text-foreground text-right ml-4">{value}</span>
                        </div>
                      ))}
                    {(!product.specifications || Object.keys(product.specifications).length === 0) && (
                      <p className="text-muted-foreground p-5 col-span-2">
                        Especificaciones disponibles bajo petición.
                      </p>
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="contact">
                  <div className="bg-muted/30 rounded-xl p-6 border border-border">
                    <h3 className="font-serif text-xl text-foreground mb-2">¿Interesado en este equipo?</h3>
                    <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                      Nuestro equipo responderá en menos de 24 horas con información detallada,
                      opciones de financiación y disponibilidad.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button asChild className="gap-2">
                        <Link href={`/contacto?producto=${product.slug}`}>
                          <Mail className="h-4 w-4" />
                          Enviar Consulta
                        </Link>
                      </Button>
                      <Button asChild variant="outline" className="gap-2">
                        <a href="tel:+34601080799">
                          <Phone className="h-4 w-4" />
                          +34 601 080 799
                        </a>
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </motion.div>

          {/* ── Right: Sticky purchase panel ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="lg:sticky lg:top-28 space-y-5">
              {/* Badges row */}
              <div className="flex flex-wrap gap-2">
                <Badge className={`border ${conditionColors[product.condition]}`}>
                  {conditionLabels[product.condition]}
                </Badge>
                {statusBadge[product.status] && (
                  <Badge className={`border font-semibold ${statusBadge[product.status].className}`}>
                    {statusBadge[product.status].label}
                  </Badge>
                )}
                {product.brand && (
                  <Badge variant="outline" className="font-medium">
                    {product.brand.name}
                  </Badge>
                )}
              </div>

              {/* Status banner — shown for reserved / sold */}
              {product.status === "sold" && (
                <div className="rounded-lg bg-foreground/5 border border-foreground/15 px-4 py-3 text-sm text-foreground/70 leading-snug">
                  <span className="font-semibold text-foreground">Este equipo ha sido vendido.</span>{" "}
                  Podemos ayudarle a encontrar una alternativa similar. Contáctenos y le asesoraremos.
                </div>
              )}
              {product.status === "reserved" && (
                <div className="rounded-lg bg-amber-500/10 border border-amber-500/25 px-4 py-3 text-sm text-amber-800 leading-snug">
                  <span className="font-semibold">Este equipo está actualmente reservado.</span>{" "}
                  Contáctenos para confirmar disponibilidad o explorar alternativas.
                </div>
              )}

              {/* Title */}
              <h1 className="font-serif text-3xl md:text-4xl tracking-wide text-foreground leading-tight">
                {product.title}
              </h1>

              {/* Price */}
              <div className="pb-4 border-b border-border">
                {product.price_on_request ? (
                  <p className="font-serif text-2xl text-primary font-bold">Precio bajo consulta</p>
                ) : product.price ? (
                  <p className="font-serif text-3xl text-primary font-bold">
                    {new Intl.NumberFormat("es-ES", {
                      style: "currency",
                      currency: "EUR",
                      maximumFractionDigits: 0,
                    }).format(product.price)}
                  </p>
                ) : (
                  <p className="font-serif text-2xl text-primary font-bold">Consultar precio</p>
                )}
              </div>

              {/* Quick spec grid */}
              <div className="grid grid-cols-2 gap-2">
                {quickSpecs.map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 p-3 bg-secondary/60 rounded-lg"
                  >
                    <Icon className="h-4 w-4 text-primary shrink-0" />
                    <div className="min-w-0">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{label}</p>
                      <p className="text-sm font-medium text-foreground truncate">{value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Short description */}
              {product.short_description && (
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {product.short_description}
                </p>
              )}

              {/* CTA buttons — adapt based on availability status */}
              {product.status === "sold" ? (
                <div className="flex flex-col gap-3">
                  <Button asChild size="lg" variant="outline" className="w-full gap-2 h-12 border-border hover:border-primary/50">
                    <Link href={`/contacto?similar=${product.slug}`}>
                      <MessageCircle className="h-5 w-5" />
                      Solicitar Similar
                    </Link>
                  </Button>
                  <p className="text-xs text-center text-muted-foreground px-2">
                    Encontraremos la alternativa más adecuada para sus necesidades.
                  </p>
                  <Button asChild size="lg" variant="ghost" className="w-full gap-2 h-10 text-sm text-muted-foreground hover:text-foreground">
                    <Link href="/catalogo">
                      Ver catálogo completo →
                    </Link>
                  </Button>
                </div>
              ) : product.status === "reserved" ? (
                <div className="flex flex-col gap-3">
                  <Button asChild size="lg" className="w-full gap-2 bg-amber-600 text-white hover:bg-amber-700 h-12">
                    <Link href={`/contacto?producto=${product.slug}`}>
                      <MessageCircle className="h-5 w-5" />
                      Consultar Disponibilidad
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="w-full gap-2 h-12 border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366]/5 hover:border-[#25D366]">
                    <a href="https://wa.me/34601080799" target="_blank" rel="noopener noreferrer">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      WhatsApp
                    </a>
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <Button asChild size="lg" className="w-full gap-2 bg-primary text-white hover:bg-primary/90 h-12">
                    <Link href={`/contacto?producto=${product.slug}`}>
                      <MessageCircle className="h-5 w-5" />
                      Solicitar Información
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="w-full gap-2 h-12 border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366]/5 hover:border-[#25D366]">
                    <a href="https://wa.me/34601080799" target="_blank" rel="noopener noreferrer">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      WhatsApp
                    </a>
                  </Button>
                </div>
              )}

              {/* Trust badge grid */}
              <div className="border border-border rounded-xl p-4">
                <p className="text-[11px] text-muted-foreground uppercase tracking-widest mb-3 font-medium">
                  Garantías incluidas
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {trustPoints.map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Icon className="h-3.5 w-3.5 text-primary shrink-0" />
                      <span>{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Mobile tabs — shown below the purchase panel on small screens */}
        <div className="lg:hidden mb-16">
          <Tabs defaultValue="description">
            <TabsList className="w-full justify-start border-b border-border rounded-none bg-transparent h-auto p-0 mb-6">
              {["description", "specs", "contact"].map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3 text-sm"
                >
                  {tab === "description" ? "Descripción" : tab === "specs" ? "Especificaciones" : "Contacto"}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value="description">
              {product.description ? (
                <div
                  dangerouslySetInnerHTML={{ __html: product.description }}
                  className="[&_h3]:font-serif [&_h3]:text-lg [&_h3]:text-foreground [&_h3]:mt-5 [&_h3]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_li]:text-sm [&_p]:text-sm text-muted-foreground leading-relaxed space-y-3"
                />
              ) : (
                <p className="text-muted-foreground">Para más información contáctenos directamente.</p>
              )}
            </TabsContent>
            <TabsContent value="specs">
              <div className="space-y-0 border border-border rounded-xl overflow-hidden">
                {product.specifications &&
                  Object.entries(product.specifications).map(([key, value], i) => (
                    <div
                      key={key}
                      className={`flex justify-between px-4 py-3 text-sm ${i % 2 === 0 ? "bg-card" : "bg-muted/30"} border-b border-border last:border-0`}
                    >
                      <span className="text-muted-foreground">{key.replace(/_/g, " ")}</span>
                      <span className="font-medium text-foreground text-right ml-4">{value}</span>
                    </div>
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="contact">
              <div className="bg-muted/30 rounded-xl p-5 border border-border">
                <h3 className="font-serif text-xl text-foreground mb-4">¿Interesado?</h3>
                <div className="flex flex-col gap-3">
                  <Button asChild className="gap-2">
                    <Link href={`/contacto?producto=${product.slug}`}>
                      <Mail className="h-4 w-4" />
                      Enviar Consulta
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="gap-2">
                    <a href="tel:+34601080799">
                      <Phone className="h-4 w-4" />
                      +34 601 080 799
                    </a>
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-4">
            <h2 className="font-serif text-2xl md:text-3xl tracking-wide text-foreground mb-8">
              Productos Relacionados
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.slice(0, 3).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
