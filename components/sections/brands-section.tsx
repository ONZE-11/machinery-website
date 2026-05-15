'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import type { Brand } from '@/types/database'

interface BrandsSectionProps {
  brands: Brand[]
}

export function BrandsSection({ brands }: BrandsSectionProps) {
  const displayBrands = brands

  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
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
              Trabajamos exclusivamente con las marcas japonesas más prestigiosas del mundo. 
              Calidad, fiabilidad y durabilidad garantizadas.
            </p>
          </motion.div>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {displayBrands.map((brand, index) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link href={`/marcas/${brand.slug}`}>
                <div className="group relative p-8 rounded-lg border border-border bg-card hover:border-primary/30 transition-all duration-300 flex flex-col items-center justify-center text-center">
                  {/* Logo Placeholder */}
                  <div className="w-20 h-20 rounded-lg bg-secondary flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                    <span className="font-serif text-2xl text-primary">{brand.name.charAt(0)}</span>
                  </div>
                  
                  {/* Brand Name */}
                  <h3 className="font-serif text-xl tracking-wide text-foreground group-hover:text-primary transition-colors">
                    {brand.name}
                  </h3>
                  
                  {/* Founded Year */}
                  {brand.founded_year && (
                    <span className="text-xs text-muted-foreground mt-1">
                      Desde {brand.founded_year}
                    </span>
                  )}

                  {/* Hover Effect */}
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
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
