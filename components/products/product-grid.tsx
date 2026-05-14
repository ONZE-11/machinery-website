"use client"

import { ProductCard } from "./product-card"
import type { Product } from "@/types/database"

interface ProductGridProps {
  products: Product[]
  columns?: 2 | 3 | 4
}

export function ProductGrid({ products, columns = 3 }: ProductGridProps) {
  const gridCols = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-2 lg:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground text-lg">
          No se encontraron productos con los filtros seleccionados.
        </p>
      </div>
    )
  }

  return (
    <div className={`grid grid-cols-1 ${gridCols[columns]} gap-6`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
