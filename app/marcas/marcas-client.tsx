"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Header, Footer, WhatsAppButton } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { mockBrands, mockProducts } from "@/lib/mock-data"
import { ArrowRight, Wrench, Factory, Shield } from "lucide-react"

export function MarcasPageClient() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        {/* Dark Cinematic Hero */}
        <section className="relative h-96 md:h-[500px] lg:h-[600px] bg-cover bg-center flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 bg-black/50 z-10" />
          <Image
            src="/images/brands-hero.jpg"
            alt="Marcas Japonesas Premium"
            fill
            className="object-cover"
            priority
          />

          {/* Content */}
          <div className="relative z-20 text-center max-w-3xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge className="mb-4 bg-[var(--primary)]/20 text-white border-[var(--primary)]/50">
                Excelencia Japonesa
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4">
                Marcas <span className="text-[var(--primary)]">Japonesas</span> Premium
              </h1>
              <p className="text-lg text-white/80">
                Trabajamos con los fabricantes más prestigiosos de Japón
              </p>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
          >
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-center justify-center">
              <div className="w-1 h-2 bg-white/50 rounded-full" />
            </div>
          </motion.div>
        </section>

        {/* Why Japanese Brands - Bright Section */}
        <section className="py-16 bg-background border-b border-border">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-[var(--primary)]/10 text-primary border-[var(--primary)]/30">
                Por qué elegir marcas japonesas
              </Badge>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
                Calidad y Confianza <span className="text-[var(--primary)]">Garantizadas</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Factory,
                  title: "Fabricación Premium",
                  description: "Estándares de producción japoneses reconocidos mundialmente por su precisión y durabilidad.",
                },
                {
                  icon: Shield,
                  title: "Durabilidad Extrema",
                  description: "Diseñadas para resistir las condiciones más exigentes con mínimo mantenimiento.",
                },
                {
                  icon: Wrench,
                  title: "Servicio Técnico",
                  description: "Repuestos originales disponibles y soporte especializado en España.",
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 bg-card border border-border rounded-lg text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--primary)]/10 flex items-center justify-center">
                    <feature.icon className="h-8 w-8 text-[var(--primary)]" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2 text-lg">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Brands Grid - Bright Editorial */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
                Nuestras <span className="text-[var(--primary)]">Marcas</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Cada marca ha sido cuidadosamente seleccionada por su trayectoria de excelencia, innovación y compromiso con la calidad en la industria.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mockBrands
                .filter(b => b.active)
                .sort((a, b) => (a.display_order || 0) - (b.display_order || 0))
                .map((brand, index) => {
                  const productCount = mockProducts.filter(
                    (p) => p.brand_id === brand.id
                  ).length

                  return (
                    <motion.div
                      key={brand.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="group relative bg-card border border-border rounded-lg overflow-hidden hover:border-[var(--primary)]/50 hover:shadow-lg transition-all duration-300"
                    >
                      {/* Brand Logo Area */}
                      <div className="relative h-40 bg-muted/50 flex items-center justify-center p-6 border-b border-border">
                        <span className="text-3xl md:text-4xl font-serif font-bold text-foreground group-hover:text-[var(--primary)] transition-colors">
                          {brand.name}
                        </span>
                      </div>

                      {/* Brand Info */}
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-3 gap-2">
                          <div>
                            <h3 className="text-lg font-semibold text-foreground">
                              {brand.name}
                            </h3>
                            {brand.country && (
                              <p className="text-xs text-[var(--primary)] font-semibold mt-1">
                                {brand.country}
                              </p>
                            )}
                          </div>
                          {productCount > 0 && (
                            <Badge variant="secondary" className="shrink-0">
                              {productCount} prod.
                            </Badge>
                          )}
                        </div>

                        {brand.founded_year && (
                          <p className="text-xs text-muted-foreground mb-3">
                            Fundada: {brand.founded_year}
                          </p>
                        )}

                        {brand.description && (
                          <p className="text-muted-foreground text-sm mb-4 line-clamp-3 leading-relaxed">
                            {brand.description}
                          </p>
                        )}

                        <Link href={`/catalogo?marca=${brand.slug}`}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full text-[var(--primary)] border-[var(--primary)]/30 hover:bg-[var(--primary)]/10 hover:border-[var(--primary)] transition-all"
                          >
                            Ver Productos
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </motion.div>
                  )
                })}
            </div>
          </div>
        </section>

        {/* CTA Section - Dark */}
        <section className="relative py-20 bg-cover bg-center flex items-center">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <Image
            src="/images/cta-background.jpg"
            alt="Contacto"
            fill
            className="object-cover"
          />

          <div className="relative z-20 container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
                ¿Busca una marca específica?
              </h2>
              <p className="text-white/80 mb-8 max-w-2xl mx-auto">
                Si no encuentra la marca que busca, contáctenos. Podemos localizar y importar maquinaria de cualquier fabricante japonés según sus necesidades.
              </p>
              <Link href="/contacto">
                <Button size="lg" className="bg-[var(--primary)] text-black hover:bg-[var(--primary)]/90 gap-2">
                  Contactar Ahora
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
