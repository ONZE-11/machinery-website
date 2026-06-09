'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, Calendar, Gauge, Check } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ProductCard } from '@/components/products/product-card'
import type { Product } from '@/types/database'
import { normalizeImageUrl } from '@/lib/supabase/storage-helpers'

interface FeaturedProductsProps {
  products: Product[]
}

const conditionLabels: Record<string, string> = {
  excelente: 'Excelente',
  muy_bueno: 'Muy Bueno',
  bueno: 'Bueno',
  aceptable: 'Aceptable',
}

function SpotlightCard({ product }: { product: Product }) {
  const image = normalizeImageUrl(product.hero_image)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="group relative rounded-2xl overflow-hidden border border-border hover:border-primary/40 transition-all duration-300"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[380px]">
        {/* Left: image */}
        <div className="relative min-h-[260px] lg:min-h-0 overflow-hidden">
          <Image
            src={image}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-background/10 lg:to-background/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent lg:hidden" />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.featured && (
              <Badge className="bg-primary text-white border-0 shadow-md">
                Destacado
              </Badge>
            )}
            <Badge className="bg-black/60 backdrop-blur-sm text-white border border-white/20">
              {conditionLabels[product.condition] || 'Bueno'}
            </Badge>
          </div>
        </div>

        {/* Right: content */}
        <div className="flex flex-col justify-center p-8 lg:p-10 bg-card">
          {/* Meta */}
          <div className="flex items-center gap-2 mb-4">
            {product.brand && (
              <span className="text-[11px] font-bold tracking-widest text-primary uppercase">
                {product.brand.name}
              </span>
            )}
            {product.brand && product.category && (
              <span className="text-muted-foreground/40">·</span>
            )}
            {product.category && (
              <span className="text-[11px] text-muted-foreground uppercase tracking-wider">
                {product.category.name}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-serif text-3xl md:text-4xl tracking-wide text-foreground mb-4 leading-tight group-hover:text-primary transition-colors">
            {product.title}
          </h3>

          {/* Short description */}
          {product.short_description && (
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-md line-clamp-3">
              {product.short_description}
            </p>
          )}

          {/* Spec pills */}
          <div className="flex flex-wrap gap-2 mb-6">
            {product.year && (
              <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground bg-secondary px-3 py-1.5 rounded-full">
                <Calendar className="w-3.5 h-3.5" />
                {product.year}
              </span>
            )}
            {product.hours_used !== undefined && product.hours_used !== null && (
              <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground bg-secondary px-3 py-1.5 rounded-full">
                <Gauge className="w-3.5 h-3.5" />
                {product.hours_used.toLocaleString('es-ES')} horas
              </span>
            )}
            {product.model && (
              <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground bg-secondary px-3 py-1.5 rounded-full">
                Modelo {product.model}
              </span>
            )}
          </div>

          {/* Trust mini-row */}
          <div className="flex flex-wrap gap-x-6 gap-y-1.5 mb-8">
            {['Importación directa', 'Garantía incluida', 'Documentación completa'].map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <Check className="w-3.5 h-3.5 text-primary" />
                {t}
              </span>
            ))}
          </div>

          {/* Price + CTA */}
          <div className="flex items-center gap-4 flex-wrap">
            <div>
              {product.price_on_request ? (
                <span className="font-serif text-2xl text-primary font-bold">Precio a consultar</span>
              ) : product.price ? (
                <span className="font-serif text-3xl text-primary font-bold">
                  {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(product.price)}
                </span>
              ) : (
                <span className="font-serif text-2xl text-primary font-bold">Consultar precio</span>
              )}
            </div>
            <Button asChild className="gap-2 bg-primary text-white hover:bg-primary/90">
              <Link href={`/catalogo/${product.slug}`}>
                Ver Detalles
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  if (products.length === 0) return null

  const [spotlight, ...rest] = products

  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm text-primary font-medium tracking-widest uppercase">
              Selección Premium
            </span>
            <h2 className="font-serif text-4xl md:text-5xl tracking-wider mt-4 mb-4">
              MAQUINARIA <span className="text-green-gradient">DESTACADA</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Cada equipo ha sido inspeccionado y certificado.
              Importación directa desde Japón con historial completo.
            </p>
          </motion.div>
        </div>

        {/* Spotlight card — first product */}
        <SpotlightCard product={spotlight} />

        {/* Grid — remaining products */}
        {rest.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {rest.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        )}

        {/* View all CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Button asChild size="lg" variant="outline" className="border-primary/30 hover:border-primary">
            <Link href="/catalogo">
              Ver Todo el Catálogo
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
