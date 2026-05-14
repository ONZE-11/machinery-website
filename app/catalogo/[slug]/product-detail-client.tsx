"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Header, Footer, WhatsAppButton } from "@/components/layout"
import { ProductGrid } from "@/components/products"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Phone,
  Mail,
  Share2,
  Check,
  Calendar,
  Gauge,
  Factory,
  Tag,
} from "lucide-react"
import type { Product } from "@/types/database"

interface ProductDetailClientProps {
  product: Product
  relatedProducts: Product[]
}

export function ProductDetailClient({
  product,
  relatedProducts,
}: ProductDetailClientProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const images = product.gallery_images.length > 0 ? product.gallery_images : ["/images/placeholder-machinery.jpg"]

  const conditionLabels: Record<string, string> = {
    excelente: "Excelente",
    muy_bueno: "Muy Bueno",
    bueno: "Bueno",
    aceptable: "Aceptable",
  }

  const conditionColors: Record<string, string> = {
    excelente: "bg-emerald-500/20 text-emerald-600 border-emerald-500/30",
    muy_bueno: "bg-blue-500/20 text-blue-600 border-blue-500/30",
    bueno: "bg-amber-500/20 text-amber-600 border-amber-500/30",
    aceptable: "bg-muted text-muted-foreground border-border",
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumbs */}
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Inicio</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/catalogo">Catálogo</BreadcrumbLink>
              </BreadcrumbItem>
              {product.category && (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href={`/catalogo?categoria=${product.category.slug}`}>
                      {product.category.name}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </>
              )}
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{product.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-muted mb-4">
                <Image
                  src={images[currentImageIndex]}
                  alt={product.title}
                  fill
                  className="object-cover"
                  priority
                />
                
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
                      aria-label="Imagen anterior"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
                      aria-label="Siguiente imagen"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                  </>
                )}

                {/* Image counter */}
                <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/50 rounded-full text-white text-sm">
                  {currentImageIndex + 1} / {images.length}
                </div>
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden border-2 transition-colors ${
                        index === currentImageIndex
                          ? "border-primary"
                          : "border-transparent hover:border-primary/50"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${product.title} - Imagen ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                {product.featured && (
                  <Badge className="bg-primary/90 text-primary-foreground border-0">
                    Destacado
                  </Badge>
                )}
                <Badge className={`border ${conditionColors[product.condition]}`}>
                  {conditionLabels[product.condition]}
                </Badge>
                {product.brand && (
                  <Badge variant="outline">{product.brand.name}</Badge>
                )}
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-serif tracking-wide text-foreground mb-4">
                {product.title}
              </h1>

              {/* Price */}
              <div className="mb-6">
                {product.price_on_request ? (
                  <p className="text-2xl font-bold text-primary">
                    Precio bajo consulta
                  </p>
                ) : product.price ? (
                  <p className="text-3xl font-bold text-primary">
                    {new Intl.NumberFormat("es-ES", {
                      style: "currency",
                      currency: "EUR",
                      maximumFractionDigits: 0,
                    }).format(product.price)}
                  </p>
                ) : (
                  <p className="text-2xl font-bold text-primary">
                    Consultar precio
                  </p>
                )}
              </div>

              {/* Quick Specs */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {product.model && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Tag className="h-4 w-4" />
                    <span>Modelo: {product.model}</span>
                  </div>
                )}
                {product.year && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Año: {product.year}</span>
                  </div>
                )}
                {product.hours_used && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Gauge className="h-4 w-4" />
                    <span>Horas: {product.hours_used.toLocaleString("es-ES")}</span>
                  </div>
                )}
                {product.brand && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Factory className="h-4 w-4" />
                    <span>Marca: {product.brand.name}</span>
                  </div>
                )}
              </div>

              {/* Short Description */}
              {product.short_description && (
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {product.short_description}
                </p>
              )}

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link href={`/contacto?producto=${product.slug}`} className="flex-1">
                  <Button size="lg" className="w-full gap-2">
                    <MessageCircle className="h-5 w-5" />
                    Solicitar Información
                  </Button>
                </Link>
                <a
                  href="https://wa.me/34601080799"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button size="lg" variant="outline" className="w-full gap-2">
                    <Phone className="h-5 w-5" />
                    WhatsApp
                  </Button>
                </a>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-3 p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Importación directa de Japón</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Garantía incluida</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Documentación completa</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Envío a toda España</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Tabs Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-16"
          >
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="w-full justify-start border-b border-border rounded-none bg-transparent h-auto p-0 mb-8">
                <TabsTrigger
                  value="description"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
                >
                  Descripción
                </TabsTrigger>
                <TabsTrigger
                  value="specs"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
                >
                  Especificaciones
                </TabsTrigger>
                <TabsTrigger
                  value="contact"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
                >
                  Contacto
                </TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="mt-0">
                <div className="prose prose-slate max-w-none">
                  {product.description ? (
                    <div
                      dangerouslySetInnerHTML={{ __html: product.description }}
                      className="text-muted-foreground leading-relaxed"
                    />
                  ) : (
                    <p className="text-muted-foreground">
                      Para más información sobre este producto, por favor
                      contáctenos directamente. Estaremos encantados de
                      proporcionarle todos los detalles técnicos y condiciones.
                    </p>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="specs" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.specifications &&
                    Object.entries(product.specifications).map(([key, value]) => (
                      <div
                        key={key}
                        className="flex justify-between py-3 border-b border-border"
                      >
                        <span className="text-muted-foreground capitalize">
                          {key.replace(/_/g, " ")}
                        </span>
                        <span className="font-medium text-foreground">{value}</span>
                      </div>
                    ))}
                  {(!product.specifications ||
                    Object.keys(product.specifications).length === 0) && (
                    <p className="text-muted-foreground col-span-2">
                      Las especificaciones técnicas detalladas están disponibles
                      bajo petición. Contáctenos para más información.
                    </p>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="contact" className="mt-0">
                <div className="bg-muted/30 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">
                    ¿Interesado en este producto?
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Nuestro equipo de expertos está disponible para responder
                    todas sus preguntas sobre este {product.title}. Contáctenos
                    para obtener información detallada, opciones de financiación
                    o programar una visita.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href={`/contacto?producto=${product.slug}`}>
                      <Button className="gap-2">
                        <Mail className="h-4 w-4" />
                        Enviar Consulta
                      </Button>
                    </Link>
                    <a href="tel:+34601080799">
                      <Button variant="outline" className="gap-2">
                        <Phone className="h-4 w-4" />
                        +34 601 080 799
                      </Button>
                    </a>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="mt-20">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-8">
                Productos Relacionados
              </h2>
              <ProductGrid products={relatedProducts} columns={3} />
            </section>
          )}
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
