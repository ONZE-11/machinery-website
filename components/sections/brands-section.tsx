'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import type { Brand, Product } from '@/types/database'
import { normalizeImageUrl } from '@/lib/supabase/storage-helpers'
import { brandIconDefaults } from '@/lib/config/brand-icon-defaults'

interface BrandsSectionProps {
  brands: Brand[]
  products?: Product[]
}

export function BrandsSection({ brands, products = [] }: BrandsSectionProps) {
  // Build brand-id → first product image map for fallback (tier 2)
  const productImageByBrand = new Map<string, string>()
  for (const p of products) {
    if (p.brand_id && p.hero_image && !productImageByBrand.has(p.brand_id)) {
      productImageByBrand.set(p.brand_id, p.hero_image)
    }
  }

  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm text-primary font-medium tracking-widest uppercase">
              Marcas de Confianza
            </span>
            <h2 className="font-serif text-4xl md:text-5xl tracking-wider mt-4 mb-4">
              MARCAS <span className="text-green-gradient">JAPONESAS</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Trabajamos exclusivamente con los fabricantes japoneses más prestigiosos.
              Calidad, fiabilidad y durabilidad garantizadas.
            </p>
          </motion.div>
        </div>

        {/* Image-backed brand grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {brands.map((brand, index) => {
            // Tier 1: brand's own hero image (DB upload)
            // Tier 2: known local static file from config (seeded brands)
            // Tier 3: first product image for this brand (new admin-added brands)
            // Tier 4: null → dark CSS gradient (no broken-image icon)
            const localHero = brandIconDefaults[brand.slug]?.heroImagePath ?? null
            const rawImage = brand.hero_image ?? localHero ?? productImageByBrand.get(brand.id) ?? null
            const imageSrc = rawImage
              ? normalizeImageUrl(rawImage, brand.hero_image ? 'brands' : 'products')
              : null

            return (
              <motion.div
                key={brand.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.07 }}
              >
                <Link href={`/catalogo?marca=${brand.slug}`} className="block">
                  <div className="group relative h-48 md:h-56 rounded-xl overflow-hidden">
                    {/* Background: real image or clean dark gradient */}
                    {imageSrc ? (
                      <Image
                        src={imageSrc}
                        alt={`Maquinaria ${brand.name}`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-950" />
                    )}
                    {/* Dark gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
                    {/* Hover tint */}
                    <div className="absolute inset-0 bg-primary/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Content */}
                    <div className="absolute inset-0 p-4 flex flex-col justify-between">
                      {/* Country badge */}
                      <div className="flex justify-end">
                        <span className="text-[10px] font-medium tracking-widest text-white/50 uppercase">
                          🇯🇵 {brand.country || 'Japón'}
                        </span>
                      </div>

                      {/* Brand name + year + CTA */}
                      <div className="flex items-end justify-between gap-2">
                        <div>
                          <h3 className="font-serif text-3xl md:text-4xl tracking-widest text-white leading-none">
                            {brand.name.toUpperCase()}
                          </h3>
                          {brand.founded_year && (
                            <p className="text-white/40 text-[11px] mt-1.5 tracking-widest uppercase">
                              Desde {brand.founded_year}
                            </p>
                          )}
                        </div>
                        <div className="shrink-0 w-8 h-8 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                          <ArrowRight className="w-3.5 h-3.5 text-white group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-10"
        >
          <Link
            href="/marcas"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors green-underline"
          >
            Ver todas las marcas
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
