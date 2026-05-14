"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Filter, X } from "lucide-react"
import type { Category, Brand } from "@/types/database"

// Computed once at module load — avoids server/client year mismatch on New Year's midnight
const CURRENT_YEAR = new Date().getFullYear()

export interface FilterState {
  search: string
  category: string | null
  brand: string | null
  condition: string | null
  minYear: number | null
  maxYear: number | null
  featured: boolean
  sortBy: "newest" | "oldest" | "name_asc" | "name_desc" | "price_asc" | "price_desc"
}

const defaultFilters: FilterState = {
  search: "",
  category: null,
  brand: null,
  condition: null,
  minYear: null,
  maxYear: null,
  featured: false,
  sortBy: "newest",
}

// ---------------------------------------------------------------------------
// FilterPanelContent — defined at module scope so React sees a stable
// component type across re-renders. Inline definition inside ProductFilters
// would create a new type on every render, causing unnecessary remounts.
// ---------------------------------------------------------------------------

interface FilterPanelContentProps {
  filters: FilterState
  categories: Category[]
  brands: Brand[]
  hasActiveFilters: boolean
  updateFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void
  resetFilters: () => void
}

function FilterPanelContent({
  filters,
  categories,
  brands,
  hasActiveFilters,
  updateFilter,
  resetFilters,
}: FilterPanelContentProps) {
  return (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <Label htmlFor="search" className="text-foreground">Buscar</Label>
        <Input
          id="search"
          placeholder="Buscar productos..."
          value={filters.search}
          onChange={(e) => updateFilter("search", e.target.value)}
          className="mt-2"
        />
      </div>

      {/* Category */}
      <div>
        <Label className="text-foreground">Categoría</Label>
        <Select
          value={filters.category || "all"}
          onValueChange={(value) =>
            updateFilter("category", value === "all" ? null : value)
          }
        >
          <SelectTrigger className="mt-2">
            <SelectValue placeholder="Todas las categorías" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las categorías</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.slug}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Brand */}
      <div>
        <Label className="text-foreground">Marca</Label>
        <Select
          value={filters.brand || "all"}
          onValueChange={(value) =>
            updateFilter("brand", value === "all" ? null : value)
          }
        >
          <SelectTrigger className="mt-2">
            <SelectValue placeholder="Todas las marcas" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las marcas</SelectItem>
            {brands.map((brand) => (
              <SelectItem key={brand.id} value={brand.slug}>
                {brand.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Condition — values match the actual Product.condition type */}
      <div>
        <Label className="text-foreground">Estado</Label>
        <Select
          value={filters.condition || "all"}
          onValueChange={(value) =>
            updateFilter("condition", value === "all" ? null : value)
          }
        >
          <SelectTrigger className="mt-2">
            <SelectValue placeholder="Todos los estados" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los estados</SelectItem>
            <SelectItem value="excelente">Excelente</SelectItem>
            <SelectItem value="muy_bueno">Muy Bueno</SelectItem>
            <SelectItem value="bueno">Bueno</SelectItem>
            <SelectItem value="aceptable">Aceptable</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Year Range */}
      <div>
        <Label className="text-foreground">Año de fabricación</Label>
        <div className="grid grid-cols-2 gap-2 mt-2">
          <Input
            type="number"
            placeholder="Desde"
            value={filters.minYear || ""}
            onChange={(e) =>
              updateFilter("minYear", e.target.value ? parseInt(e.target.value) : null)
            }
            min={1990}
            max={CURRENT_YEAR}
          />
          <Input
            type="number"
            placeholder="Hasta"
            value={filters.maxYear || ""}
            onChange={(e) =>
              updateFilter("maxYear", e.target.value ? parseInt(e.target.value) : null)
            }
            min={1990}
            max={CURRENT_YEAR}
          />
        </div>
      </div>

      {/* Featured */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="featured"
          checked={filters.featured}
          onCheckedChange={(checked) => updateFilter("featured", checked === true)}
        />
        <Label htmlFor="featured" className="text-foreground cursor-pointer">
          Solo productos destacados
        </Label>
      </div>

      {/* Reset */}
      {hasActiveFilters && (
        <Button
          variant="outline"
          onClick={resetFilters}
          className="w-full gap-2"
        >
          <X className="h-4 w-4" />
          Limpiar filtros
        </Button>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// ProductFilters
// ---------------------------------------------------------------------------

interface ProductFiltersProps {
  categories: Category[]
  brands: Brand[]
  onFilterChange: (filters: FilterState) => void
  initialFilters?: FilterState
}

export function ProductFilters({
  categories,
  brands,
  onFilterChange,
  initialFilters = defaultFilters,
}: ProductFiltersProps) {
  const [filters, setFilters] = useState<FilterState>(initialFilters)
  const [isOpen, setIsOpen] = useState(false)

  const updateFilter = <K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const resetFilters = () => {
    setFilters(defaultFilters)
    onFilterChange(defaultFilters)
  }

  const hasActiveFilters = Boolean(
    filters.category ||
    filters.brand ||
    filters.condition ||
    filters.minYear ||
    filters.maxYear ||
    filters.featured
  )

  const panelProps: FilterPanelContentProps = {
    filters,
    categories,
    brands,
    hasActiveFilters,
    updateFilter,
    resetFilters,
  }

  return (
    <>
      {/* Desktop Filters */}
      <div className="hidden lg:block">
        <div className="sticky top-24 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Filtros</h3>
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={resetFilters}>
                Limpiar
              </Button>
            )}
          </div>
          <FilterPanelContent {...panelProps} />
        </div>
      </div>

      {/* Mobile Filters */}
      <div className="lg:hidden">
        <div className="flex items-center gap-4 mb-6">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filtros
                {hasActiveFilters && (
                  <span className="ml-1 px-2 py-0.5 text-xs bg-primary text-primary-foreground rounded-full">
                    Activos
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <SheetHeader>
                <SheetTitle>Filtros</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <FilterPanelContent {...panelProps} />
              </div>
            </SheetContent>
          </Sheet>

          {/* Sort */}
          <Select
            value={filters.sortBy}
            onValueChange={(value) => updateFilter("sortBy", value as FilterState["sortBy"])}
          >
            <SelectTrigger className="w-48">
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
      </div>
    </>
  )
}
