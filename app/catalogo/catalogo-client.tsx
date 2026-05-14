"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Header, Footer, WhatsAppButton } from "@/components/layout"
import { ProductGrid, ProductFilters, FilterState } from "@/components/products"
import { getProductsWithRelations, mockCategories, mockBrands } from "@/lib/mock-data"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function CatalogoPageClient() {
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
    let result = [...getProductsWithRelations()]

    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(searchLower) ||
          p.description?.toLowerCase().includes(searchLower) ||
          p.model?.toLowerCase().includes(searchLower)
      )
    }

    if (filters.category) {
      result = result.filter((p) => p.category?.slug === filters.category)
    }

    if (filters.brand) {
      result = result.filter((p) => p.brand?.slug === filters.brand)
    }

    if (filters.condition) {
      result = result.filter((p) => p.condition === filters.condition)
    }

    if (filters.minYear) {
      result = result.filter((p) => p.year && p.year >= filters.minYear!)
    }
    if (filters.maxYear) {
      result = result.filter((p) => p.year && p.year <= filters.maxYear!)
    }

    if (filters.featured) {
      result = result.filter((p) => p.featured)
    }

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
  }, [filters])

  return (
    <div className="min-h-screen bg-background">
      <Header />
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
              {/* Sidebar Filters */}
              <aside className="lg:w-64 flex-shrink-0">
                <div className="bg-white rounded-lg border border-border p-5 sticky top-24">
                  <ProductFilters
                    categories={mockCategories}
                    brands={mockBrands}
                    onFilterChange={setFilters}
                    initialFilters={filters}
                  />
                </div>
              </aside>

              {/* Products */}
              <div className="flex-1">
                {/* Sort & Results */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">{filteredProducts.length}</span>{" "}
                    producto{filteredProducts.length !== 1 ? "s" : ""} encontrado{filteredProducts.length !== 1 ? "s" : ""}
                  </p>
                  <Select
                    value={filters.sortBy}
                    onValueChange={(value) =>
                      setFilters((prev) => ({
                        ...prev,
                        sortBy: value as FilterState["sortBy"],
                      }))
                    }
                  >
                    <SelectTrigger className="w-48 bg-white">
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

                <ProductGrid products={filteredProducts} columns={3} />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
