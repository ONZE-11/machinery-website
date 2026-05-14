'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { getProductsWithRelations } from '@/lib/mock-data'
import type { Product } from '@/types/database'

interface FeaturedProductsProps {
  products?: Product[]
}

export function FeaturedProducts({ products: propProducts }: FeaturedProductsProps) {
  // Use provided products or get featured products from mock data
  const allProducts = propProducts || getProductsWithRelations()
  const products = allProducts.filter(p => p.featured).slice(0, 6)

  if (products.length === 0) {
    return null
  }

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
              Selección Premium
            </span>
            <h2 className="font-serif text-4xl md:text-5xl tracking-wider mt-4 mb-4">
              MAQUINARIA <span className="text-green-gradient">DESTACADA</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Descubre nuestra selección de maquinaria japonesa de alta calidad. 
              Cada equipo ha sido inspeccionado y certificado para garantizar su rendimiento.
            </p>
          </motion.div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/catalogo/${product.slug}`}>
                <Card className="group bg-card border-border hover:border-primary/30 transition-all duration-300 overflow-hidden">
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={product.hero_image || '/placeholder-machinery.jpg'}
                      alt={product.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                      {product.featured && (
                        <Badge className="bg-primary text-primary-foreground">Destacado</Badge>
                      )}
                      {product.condition === 'excelente' && (
                        <Badge variant="secondary">Excelente Estado</Badge>
                      )}
                    </div>

                    {/* Quick View Button */}
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button size="sm" variant="secondary" className="gap-2">
                        Ver Detalles
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Content */}
                  <CardContent className="p-6">
                    {/* Brand & Category */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs text-primary font-medium">{product.brand?.name}</span>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">{product.category?.name}</span>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-xl tracking-wide text-foreground group-hover:text-primary transition-colors mb-3">
                      {product.title}
                    </h3>

                    {/* Short Description */}
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                      {product.short_description}
                    </p>

                    {/* Specs */}
                    <div className="flex flex-wrap gap-4 text-sm">
                      {product.year && (
                        <div>
                          <span className="text-muted-foreground">Año: </span>
                          <span className="text-foreground font-medium">{product.year}</span>
                        </div>
                      )}
                      {product.hours_used && (
                        <div>
                          <span className="text-muted-foreground">Horas: </span>
                          <span className="text-foreground font-medium">{product.hours_used.toLocaleString('es-ES')}</span>
                        </div>
                      )}
                    </div>

                    {/* Price */}
                    <div className="mt-4 pt-4 border-t border-border">
                      {product.price_on_request ? (
                        <span className="text-primary font-medium">Precio a consultar</span>
                      ) : (
                        <span className="text-2xl font-serif text-primary">
                          {product.price?.toLocaleString('es-ES')} €
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
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
