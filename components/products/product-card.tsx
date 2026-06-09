"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Calendar, Gauge, ArrowRight } from "lucide-react"
import type { Product } from "@/types/database"
import { normalizeImageUrl } from "@/lib/supabase/storage-helpers"

interface ProductCardProps {
  product: Product
}

const conditionLabels: Record<string, string> = {
  excelente: "Excelente",
  muy_bueno: "Muy Bueno",
  bueno: "Bueno",
  aceptable: "Aceptable",
}

const conditionColors: Record<string, string> = {
  excelente: "bg-emerald-500/15 text-emerald-600 border-emerald-500/25",
  muy_bueno: "bg-blue-500/15 text-blue-600 border-blue-500/25",
  bueno: "bg-amber-500/15 text-amber-600 border-amber-500/25",
  aceptable: "bg-orange-500/15 text-orange-600 border-orange-500/25",
}

export function ProductCard({ product }: ProductCardProps) {
  const mainImage = normalizeImageUrl(product.hero_image)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group bg-card border border-border rounded-xl overflow-hidden hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
    >
      {/* Image area */}
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <Image
          src={mainImage}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Bottom gradient for badge readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

        {/* Hover overlay — single clean CTA */}
        <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Link
            href={`/catalogo/${product.slug}`}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-lg"
          >
            Ver Detalles
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Top-left: condition + featured badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.featured && (
            <Badge className="bg-primary/90 text-white border-0 text-[10px] px-2 py-0.5 shadow-sm">
              Destacado
            </Badge>
          )}
          <Badge
            className={`border text-[10px] px-2 py-0.5 shadow-sm ${
              conditionColors[product.condition] || conditionColors.bueno
            }`}
          >
            {conditionLabels[product.condition] || "Bueno"}
          </Badge>
        </div>

        {/* Top-right: brand */}
        {product.brand && (
          <div className="absolute top-3 right-3">
            <span className="text-[10px] font-bold tracking-widest text-white/90 bg-black/50 backdrop-blur-sm rounded px-2 py-1 border border-white/10 uppercase">
              {product.brand.name}
            </span>
          </div>
        )}

        {/* Status strip — shown only for reserved / sold */}
        {product.status === "sold" && (
          <div className="absolute bottom-0 left-0 right-0 bg-foreground/85 text-background text-center text-[11px] font-bold py-1.5 uppercase tracking-widest">
            Vendido
          </div>
        )}
        {product.status === "reserved" && (
          <div className="absolute bottom-0 left-0 right-0 bg-amber-500/90 text-white text-center text-[11px] font-bold py-1.5 uppercase tracking-widest">
            Reservado
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="p-4">
        {/* Category label */}
        {product.category && (
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1.5">
            {product.category.name}
          </p>
        )}

        {/* Title */}
        <h3 className="font-serif text-[17px] tracking-wide text-foreground line-clamp-2 mb-3 leading-tight group-hover:text-primary transition-colors">
          <Link href={`/catalogo/${product.slug}`}>{product.title}</Link>
        </h3>

        {/* Spec pills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {product.year && (
            <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground bg-secondary px-2.5 py-1 rounded-full">
              <Calendar className="w-3 h-3" />
              {product.year}
            </span>
          )}
          {product.hours_used !== undefined && product.hours_used !== null && (
            <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground bg-secondary px-2.5 py-1 rounded-full">
              <Gauge className="w-3 h-3" />
              {product.hours_used.toLocaleString("es-ES")} h
            </span>
          )}
          {product.model && (
            <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground bg-secondary px-2.5 py-1 rounded-full">
              {product.model}
            </span>
          )}
        </div>

        {/* Price row */}
        <div className="pt-3 border-t border-border flex items-center justify-between">
          {product.price_on_request ? (
            <>
              <span className="text-sm font-semibold text-primary">Precio a consultar</span>
              <Link
                href={`/contacto?producto=${product.slug}`}
                className="text-[11px] text-muted-foreground hover:text-primary transition-colors shrink-0"
              >
                Consultar →
              </Link>
            </>
          ) : product.price ? (
            <p className="font-serif text-xl text-primary font-bold">
              {new Intl.NumberFormat("es-ES", {
                style: "currency",
                currency: "EUR",
                maximumFractionDigits: 0,
              }).format(product.price)}
            </p>
          ) : (
            <span className="text-sm font-semibold text-primary">Consultar precio</span>
          )}
        </div>
      </div>
    </motion.div>
  )
}
