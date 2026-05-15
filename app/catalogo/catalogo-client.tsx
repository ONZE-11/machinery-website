"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { ProductGrid, ProductFilters, FilterState } from "@/components/products"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { Product, Category, Brand } from "@/types/database"

interface Props {
  initialProducts: Product[]
  categories: Category[]
  brands: Brand[]
}

export function CatalogoPageClient({ initialProducts, categories, brands }: Props) {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    category: null,
    brand: null,
    condition: null,
    minYear: null,
    maxYear: null,
    featured: false,
    sortBy: "newest",
  })

  const filteredProducts = useMemo(() => {
    let result = [...initialProducts]

    if (filters.search) {
      const q = filters.search.toLowerCase()
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.model?.toLowerCase().includes(q)
      )
    }
    if (filters.category) result = result.filter((p) => p.category?.slug === filters.category)
    if (filters.brand) result = result.filter((p) => p.brand?.slug === filters.brand)
    if (filters.condition) result = result.filter((p) => p.condition === filters.condition)
    if (filters.minYear) result = result.filter((p) => p.year && p.year >= filters.minYear!)
    if (filters.maxYear) result = result.filter((p) => p.year && p.year <= filters.maxYear!)
    if (filters.featured) result = result.filter((p) => p.featured)

    switch (filters.sortBy) {
      case "newest":
        result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        break
      case "oldest":
        result.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
        break
      case "name_asc":
        result.sort((a, b) => a.title.localeCompare(b.title))
        break
      case "name_desc":
        result.sort((a, b) => b.title.localeCompare(a.title))
        break
      case "price_asc":
        result.sort((a, b) => (a.price || 0) - (b.price || 0))
        break
      case "price_desc":
        result.sort((a, b) => (b.price || 0) - (a.price || 0))
        break
    }

    return result
  }, [initialProducts, filters])

  return (
    <main className="pt-16">
      {/* Page Header */}
      <section className="py-12 lg:py-16 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-sm text-primary font-medium tracking-wide uppercase mb-3 block">
              Nuestro Catálogo
            </span>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
              Maquinaria Japonesa
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Explore nuestra selección de maquinaria japonesa de alta calidad.
              Mini excavadoras, tractores, cargadoras y más, importadas directamente desde Japón.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Catalog Grid */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="lg:w-64 flex-shrink-0">
              <div className="bg-card rounded-lg border border-border p-5 sticky top-24">
                <ProductFilters
                  categories={categories}
                  brands={brands}
                  onFilterChange={setFilters}
                  initialFilters={filters}
                />
              </div>
            </aside>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">{filteredProducts.length}</span>{" "}
                  producto{filteredProducts.length !== 1 ? "s" : ""} encontrado{filteredProducts.length !== 1 ? "s" : ""}
                </p>
                <Select
                  value={filters.sortBy}
                  onValueChange={(value) =>
                    setFilters((prev) => ({ ...prev, sortBy: value as FilterState["sortBy"] }))
                  }
                >
                  <SelectTrigger className="w-48 bg-card">
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Más recientes</SelectItem>
                    <SelectItem value="oldest">Más antiguos</SelectItem>
                    <SelectItem value="name_asc">Nombre A-Z</SelectItem>
                    <SelectItem value="name_desc">Nombre Z-A</SelectItem>
                    <SelectItem value="price_asc">Precio: menor a mayor</SelectItem>
                    <SelectItem value="price_desc">Precio: mayor a menor</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-muted-foreground text-lg">
                    {initialProducts.length === 0
                      ? "No hay productos disponibles aún."
                      : "Ningún producto coincide con los filtros seleccionados."}
                  </p>
                </div>
              ) : (
                <ProductGrid products={filteredProducts} columns={3} />
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
