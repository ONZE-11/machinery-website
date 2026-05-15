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
import type { Category } from "@/types/database"
import { Plus, Search, Pencil, Trash2, Loader2 } from "lucide-react"

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState("")

  useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setCategories(data)
        else setError("Failed to load categories")
      })
      .catch(() => setError("Network error"))
      .finally(() => setLoading(false))
  }, [])

  const handleToggleActive = async (category: Category) => {
    const res = await fetch(`/api/categories/${category.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !category.active }),
    })
    if (res.ok) {
      setCategories((prev) =>
        prev.map((c) => (c.id === category.id ? { ...c, active: !c.active } : c))
      )
    }
  }

  const handleDelete = async (category: Category) => {
    if (!window.confirm(`¿Eliminar la categoría "${category.name}"? Los productos asociados quedarán sin categoría.`)) return
    const res = await fetch(`/api/categories/${category.id}`, { method: "DELETE" })
    if (res.ok) {
      setCategories((prev) => prev.filter((c) => c.id !== category.id))
    }
  }

  const filtered = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Categories</h1>
          <p className="text-muted-foreground">Manage product categories</p>
        </div>
        <Link href="/admin/categories/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Category
          </Button>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        {!loading && (
          <p className="text-sm text-muted-foreground">
            {filtered.length} categor{filtered.length !== 1 ? "ies" : "y"}
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
                <TableHead>Slug</TableHead>
                <TableHead>Icon</TableHead>
                <TableHead>Order</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {category.image && (
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-8 h-8 object-cover rounded"
                        />
                      )}
                      <span className="font-medium">{category.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {category.slug}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {category.icon ?? "-"}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {category.display_order}
                  </TableCell>
                  <TableCell>
                    <Badge
                      onClick={() => handleToggleActive(category)}
                      className={cn(
                        "cursor-pointer select-none",
                        category.active
                          ? "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      )}
                    >
                      {category.active ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/categories/${category.id}/edit`}>
                        <Button variant="ghost" size="icon">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-600"
                        onClick={() => handleDelete(category)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}

              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    {search ? "No categories match your search" : "No categories yet"}
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
