"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/types/database"
import {
  Plus,
  Search,
  MoreHorizontal,
  Pencil,
  Trash2,
  ExternalLink,
  Loader2,
} from "lucide-react"
import { toast } from "sonner"

const conditionLabels: Record<string, string> = {
  excelente: "Excelente",
  muy_bueno: "Muy Bueno",
  bueno: "Bueno",
  aceptable: "Aceptable",
}

const conditionColors: Record<string, string> = {
  excelente: "bg-emerald-500/20 text-emerald-400",
  muy_bueno: "bg-blue-500/20 text-blue-400",
  bueno: "bg-amber-500/20 text-amber-400",
  aceptable: "bg-orange-500/20 text-orange-400",
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setProducts(data)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  async function handleDelete(productId: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    )

    if (!confirmed) return

    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || "Failed to delete product")
      }

      setProducts((prev) =>
        prev.filter((product) => product.id !== productId)
      )
    } catch (error) {
      console.error("Delete failed:", error)

      alert(
        error instanceof Error
          ? error.message
          : "Failed to delete product"
      )
    }
  }

  const filtered = products.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.brand?.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.category?.name?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Products
          </h1>
          <p className="text-muted-foreground">
            Manage your product catalog
          </p>
        </div>

        <Link href="/admin/products/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Product
          </Button>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

          <Input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        {!loading && (
          <p className="text-sm text-muted-foreground">
            {filtered.length} product
            {filtered.length !== 1 ? "s" : ""}
          </p>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border border-border rounded-lg overflow-hidden"
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Condition</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filtered.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {product.hero_image ? (
                        <img
                          src={product.hero_image}
                          alt={product.title}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-muted rounded-lg" />
                      )}

                      <div>
                        <p className="font-medium">
                          {product.title}
                        </p>

                        {product.model && (
                          <p className="text-xs text-muted-foreground">
                            Model: {product.model}
                          </p>
                        )}
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    {product.brand?.name || "-"}
                  </TableCell>

                  <TableCell>
                    {product.category?.name || "-"}
                  </TableCell>

                  <TableCell>
                    <Badge
                      className={
                        conditionColors[product.condition]
                      }
                    >
                      {
                        conditionLabels[product.condition]
                      }
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-2">
                      {product.featured && (
                        <Badge variant="secondary">
                          Featured
                        </Badge>
                      )}

                      {product.status === "published" ? (
                        <Badge className="bg-emerald-500/20 text-emerald-400">
                          Published
                        </Badge>
                      ) : product.status === "sold" ? (
                        <Badge className="bg-red-500/20 text-red-400">
                          Sold
                        </Badge>
                      ) : product.status === "reserved" ? (
                        <Badge className="bg-blue-500/20 text-blue-400">
                          Reserved
                        </Badge>
                      ) : (
                        <Badge variant="outline">
                          Draft
                        </Badge>
                      )}
                    </div>
                  </TableCell>

                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          className="flex items-center gap-2"
                          onClick={() => {
                            if (product.status === "draft") {
                              toast.warning(
                                "This product is in Draft and cannot be viewed publicly. Publish it first.",
                                { duration: 4000 }
                              )
                              return
                            }
                            window.open(
                              `/catalogo/${product.slug}`,
                              "_blank",
                              "noopener,noreferrer"
                            )
                          }}
                        >
                          <ExternalLink className="h-4 w-4" />
                          View on Site
                        </DropdownMenuItem>

                        <DropdownMenuItem asChild>
                          <Link
                            href={`/admin/products/${product.id}/edit`}
                            className="flex items-center gap-2"
                          >
                            <Pencil className="h-4 w-4" />
                            Edit
                          </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={() =>
                            handleDelete(product.id)
                          }
                          className="text-red-500 focus:text-red-500"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}

              {filtered.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-8 text-muted-foreground"
                  >
                    {search
                      ? "No products match your search"
                      : "No products yet"}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </motion.div>
      )}
    </div>
  )
}