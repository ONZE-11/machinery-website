'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Shovel, Tractor, Cog, ArrowUpFromLine, HardHat, Forklift, type LucideIcon } from 'lucide-react'
import type { Category } from '@/types/database'
import { mockCategories } from '@/lib/mock-data'

interface CategoriesSectionProps {
  categories?: Category[]
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
  const displayCategories = categories || mockCategories

  return (
    <section className="py-24 bg-card">
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
              Nuestro Catálogo
            </span>
            <h2 className="font-serif text-4xl md:text-5xl tracking-wider mt-4 mb-4">
              CATEGORÍAS DE <span className="text-green-gradient">MAQUINARIA</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explora nuestra amplia selección de maquinaria japonesa por categoría. 
              Desde mini excavadoras hasta elevadores compactos.
            </p>
          </motion.div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayCategories.map((category, index) => {
            const Icon = categoryIcons[category.slug] || HardHat
            return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/catalogo?categoria=${category.slug}`}>
                <div className="group relative h-64 rounded-lg overflow-hidden border border-border hover:border-primary/30 transition-all duration-300">
                  {/* Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary to-background" />

                  {/* Content */}
                  <div className="relative h-full p-6 flex flex-col justify-between">
                    {/* Icon */}
                    <div className="w-16 h-16 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>

                    {/* Text */}
                    <div>
                      <h3 className="font-serif text-2xl tracking-wide text-foreground group-hover:text-primary transition-colors mb-2">
                        {category.name}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {category.description}
                      </p>
                    </div>

                    {/* Arrow */}
                    <div className="absolute bottom-6 right-6 w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1">
                      <ArrowRight className="w-5 h-5 text-primary" />
                    </div>
                  </div>

                  {/* Hover Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
