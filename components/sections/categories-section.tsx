'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, Shovel, Tractor, Cog, ArrowUpFromLine, HardHat, Forklift, type LucideIcon } from 'lucide-react'
import type { Category } from '@/types/database'

interface CategoriesSectionProps {
  categories: Category[]
}

const categoryIcons: Record<string, LucideIcon> = {
  'mini-excavadoras': Shovel,
  'mini-tractores': Tractor,
  'mini-cargadoras': Cog,
  'elevadores-compactos': ArrowUpFromLine,
  'equipos-construccion': HardHat,
  'carretillas-elevadoras': Forklift,
}

export function CategoriesSection({ categories }: CategoriesSectionProps) {
  return (
    <section className="py-24 bg-card">
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
              Nuestro Catálogo
            </span>
            <h2 className="font-serif text-4xl md:text-5xl tracking-wider mt-4 mb-4">
              CATEGORÍAS DE <span className="text-green-gradient">MAQUINARIA</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explora nuestra amplia selección de maquinaria japonesa.
              Desde mini excavadoras hasta elevadores compactos.
            </p>
          </motion.div>
        </div>

        {/* Image-backed category grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category, index) => {
            const Icon = categoryIcons[category.slug] || HardHat
            const imageSrc = category.image || `/images/categories/category-${category.slug}.jpg`
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <Link href={`/catalogo?categoria=${category.slug}`} className="block">
                  <div className="group relative h-64 rounded-xl overflow-hidden">
                    {/* Background image */}
                    <Image
                      src={imageSrc}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {/* Permanent dark gradient — text legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />
                    {/* Hover tint */}
                    <div className="absolute inset-0 bg-primary/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Overlay content */}
                    <div className="absolute inset-0 p-5 flex flex-col justify-between">
                      {/* Top row: icon + index */}
                      <div className="flex items-start justify-between">
                        <div className="w-11 h-11 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-serif text-5xl font-bold leading-none select-none text-white/10">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>

                      {/* Bottom row: name + CTA arrow */}
                      <div className="flex items-end justify-between gap-3">
                        <div>
                          <h3 className="font-serif text-2xl tracking-wide text-white leading-tight">
                            {category.name}
                          </h3>
                          <p className="text-white/50 text-xs mt-1 line-clamp-1">
                            {category.description}
                          </p>
                        </div>
                        <div className="shrink-0 w-9 h-9 rounded-full bg-primary flex items-center justify-center translate-x-3 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                          <ArrowRight className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
