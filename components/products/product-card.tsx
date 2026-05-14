"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, MessageCircle } from "lucide-react"
import type { Product } from "@/types/database"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const mainImage = product.hero_image || "/images/placeholder-machinery.jpg"

  const conditionLabels: Record<string, string> = {
    excelente: "Excelente",
    muy_bueno: "Muy Bueno",
    bueno: "Bueno",
    aceptable: "Aceptable",
  }

  const conditionColors: Record<string, string> = {
    excelente: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    muy_bueno: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    bueno: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    aceptable: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <Image
          src={mainImage}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Overlay on hover */}
        <div className={`absolute inset-0 bg-black/60 flex items-center justify-center gap-3 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <Button asChild size="sm" variant="secondary" className="gap-2">
            <Link href={`/catalogo/${product.slug}`}>
              <Eye className="h-4 w-4" />
              Ver Detalles
            </Link>
          </Button>
          <Button asChild size="sm" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href={`/contacto?producto=${product.slug}`}>
              <MessageCircle className="h-4 w-4" />
              Consultar
            </Link>
          </Button>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.featured && (
            <Badge className="bg-primary/90 text-primary-foreground border-0">
              Destacado
            </Badge>
          )}
          <Badge className={`border ${conditionColors[product.condition] || conditionColors.bueno}`}>
            {conditionLabels[product.condition] || "Bueno"}
          </Badge>
        </div>

        {/* Brand badge */}
        {product.brand && (
          <div className="absolute top-3 right-3">
            <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
              {product.brand.name}
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="mb-2">
          {product.category && (
            <span className="text-xs text-muted-foreground uppercase tracking-wider">
              {product.category.name}
            </span>
          )}
        </div>
        
        <h3 className="font-semibold text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
          <Link href={`/catalogo/${product.slug}`}>
            {product.title}
          </Link>
        </h3>

        {product.model && (
          <p className="text-sm text-muted-foreground mb-2">
            Modelo: {product.model}
          </p>
        )}

        <div className="flex gap-4 text-sm text-muted-foreground">
          {product.year && (
            <span>Año: {product.year}</span>
          )}
          {product.hours_used && (
            <span>Horas: {product.hours_used.toLocaleString('es-ES')}</span>
          )}
        </div>

        {/* Price or Contact */}
        <div className="mt-4 pt-4 border-t border-border">
          {product.price_on_request ? (
            <p className="text-primary font-semibold">Precio a consultar</p>
          ) : product.price ? (
            <p className="text-xl font-bold text-primary">
              {new Intl.NumberFormat('es-ES', {
                style: 'currency',
                currency: 'EUR',
                maximumFractionDigits: 0,
              }).format(product.price)}
            </p>
          ) : (
            <p className="text-primary font-semibold">Consultar precio</p>
          )}
        </div>
      </div>
    </motion.div>
  )
}
