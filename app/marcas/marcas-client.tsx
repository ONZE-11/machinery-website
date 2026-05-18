"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Wrench, Factory, Shield } from "lucide-react"
import type { Brand, Product } from "@/types/database"

interface Props {
  brands: Brand[]
  products: Product[]
}

export function MarcasPageClient({ brands, products }: Props) {
  return (
    <main>
      {/* Dark Cinematic Hero */}
      <section className="relative h-96 md:h-[500px] lg:h-[600px] bg-cover bg-center flex items-center justify-center overflow-hidden">
        <Image
          src="/images/brands-hero.jpg"
          alt="Maquinaria japonesa de precisión industrial"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/70 via-black/45 to-black/70" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
        <div className="relative z-20 text-center max-w-3xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Badge className="mb-4 bg-[var(--primary)]/20 text-white border-[var(--primary)]/50">
              Excelencia Japonesa
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4">
              Marcas <span className="text-[var(--hero-accent)]">Japonesas</span> Premium
            </h1>
            <p className="text-lg text-white/80">Trabajamos con los fabricantes más prestigiosos de Japón</p>
          </motion.div>
        </div>
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

      {/* Why Japanese */}
      <section className="py-16 bg-background border-b border-border">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <Badge className="mb-4 bg-[var(--primary)]/10 text-primary border-[var(--primary)]/30">
              Por qué elegir marcas japonesas
            </Badge>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              Calidad y Confianza <span className="text-[var(--primary)]">Garantizadas</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Factory, title: "Fabricación Premium", description: "Estándares de producción japoneses reconocidos mundialmente por su precisión y durabilidad." },
              { icon: Shield, title: "Durabilidad Extrema", description: "Diseñadas para resistir las condiciones más exigentes con mínimo mantenimiento." },
              { icon: Wrench, title: "Servicio Técnico", description: "Repuestos originales disponibles y soporte especializado en España." },
            ].map((feature, index) => (
              <motion.div key={feature.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="p-6 bg-card border border-border rounded-lg text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--primary)]/10 flex items-center justify-center">
                  <feature.icon className="h-8 w-8 text-[var(--primary)]" />
                </div>
                <h3 className="font-semibold text-foreground mb-2 text-lg">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              Nuestras <span className="text-[var(--primary)]">Marcas</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Cada marca ha sido cuidadosamente seleccionada por su trayectoria de excelencia, innovación y compromiso con la calidad.
            </p>
          </motion.div>

          {brands.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No hay marcas disponibles aún.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {brands
                .sort((a, b) => (a.display_order || 0) - (b.display_order || 0))
                .map((brand, index) => {
                  const productCount = products.filter((p) => p.brand_id === brand.id).length
                  const imageSrc = brand.hero_image || `/images/brands/brand-${brand.slug}.jpg`
                  return (
                    <motion.div
                      key={brand.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="group bg-card border border-border rounded-xl overflow-hidden hover:border-[var(--primary)]/50 hover:shadow-xl transition-all duration-300"
                    >
                      {/* Image header */}
                      <div className="relative h-44 overflow-hidden">
                        <Image
                          src={imageSrc}
                          alt={`Maquinaria ${brand.name}`}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                          <div>
                            <h3 className="font-serif text-3xl tracking-widest text-white leading-none">
                              {brand.name.toUpperCase()}
                            </h3>
                            {brand.founded_year && (
                              <p className="text-white/45 text-[11px] mt-1 tracking-widest uppercase">
                                Desde {brand.founded_year}
                              </p>
                            )}
                          </div>
                          {productCount > 0 && (
                            <Badge className="bg-white/15 text-white border-white/20 backdrop-blur-sm shrink-0">
                              {productCount} eq.
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Card body */}
                      <div className="p-5">
                        {brand.country && (
                          <p className="text-[11px] text-primary font-semibold uppercase tracking-widest mb-2">
                            🇯🇵 {brand.country}
                          </p>
                        )}
                        {brand.description && (
                          <p className="text-muted-foreground text-sm mb-5 line-clamp-3 leading-relaxed">
                            {brand.description}
                          </p>
                        )}
                        <Link href={`/catalogo?marca=${brand.slug}`}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full text-[var(--primary)] border-[var(--primary)]/30 hover:bg-[var(--primary)]/10 hover:border-[var(--primary)] transition-all"
                          >
                            Ver Equipos
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </motion.div>
                  )
                })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 bg-cover bg-center flex items-center">
        <Image src="/images/hero-crane.jpg" alt="Maquinaria japonesa" fill className="object-cover object-center" />
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/80 via-black/65 to-black/50" />
        <div className="relative z-20 container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">¿Busca una marca específica?</h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Si no encuentra la marca que busca, contáctenos. Podemos localizar y importar maquinaria de cualquier fabricante japonés.
            </p>
            <Link href="/contacto">
              <Button size="lg" className="bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90 gap-2">
                Contactar Ahora
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
