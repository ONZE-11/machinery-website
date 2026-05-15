"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { Brand } from "@/types/database"
import { Plus, Search, Pencil, Trash2, Loader2 } from "lucide-react"

export default function BrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState("")

  useEffect(() => {
    fetch("/api/brands")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setBrands(data)
        else setError("Failed to load brands")
      })
      .catch(() => setError("Network error"))
      .finally(() => setLoading(false))
  }, [])

  const handleToggleActive = async (brand: Brand) => {
    const res = await fetch(`/api/brands/${brand.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !brand.active }),
    })
    if (res.ok) {
      setBrands((prev) =>
        prev.map((b) => (b.id === brand.id ? { ...b, active: !b.active } : b))
      )
    }
  }

  const handleDelete = async (brand: Brand) => {
    if (!window.confirm(`¿Eliminar la marca "${brand.name}"? Esta acción no se puede deshacer.`)) return
    const res = await fetch(`/api/brands/${brand.id}`, { method: "DELETE" })
    if (res.ok) {
      setBrands((prev) => prev.filter((b) => b.id !== brand.id))
    }
  }

  const filtered = brands.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Brands</h1>
          <p className="text-muted-foreground">Manage Japanese machinery brands</p>
        </div>
        <Link href="/admin/brands/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Brand
          </Button>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search brands..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        {!loading && (
          <p className="text-sm text-muted-foreground">
            {filtered.length} brand{filtered.length !== 1 ? "s" : ""}
          </p>
        )}
      </div>

      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      )}

      {error && (
        <p className="text-red-500 text-sm text-center py-8">{error}</p>
      )}

      {!loading && !error && (
        <div className="border border-border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Founded</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((brand) => (
                <TableRow key={brand.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {brand.logo && (
                        <img
                          src={brand.logo}
                          alt={brand.name}
                          className="w-8 h-8 object-contain rounded"
                        />
                      )}
                      <span className="font-medium">{brand.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {brand.country || "Japón"}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {brand.founded_year ?? "-"}
                  </TableCell>
                  <TableCell>
                    <Badge
                      onClick={() => handleToggleActive(brand)}
                      className={cn(
                        "cursor-pointer select-none",
                        brand.active
                          ? "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      )}
                    >
                      {brand.active ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/brands/${brand.id}/edit`}>
                        <Button variant="ghost" size="icon">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-600"
                        onClick={() => handleDelete(brand)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}

              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    {search ? "No brands match your search" : "No brands yet"}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
