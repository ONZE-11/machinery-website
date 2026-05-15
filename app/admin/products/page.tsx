"use client"

import { useState } from "react"
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
import { mockProducts } from "@/lib/mock-data"
import {
  Plus,
  Search,
  MoreHorizontal,
  Eye,
  Pencil,
  Trash2,
  ExternalLink,
} from "lucide-react"

export default function ProductsPage() {
  const [search, setSearch] = useState("")

  const filteredProducts = mockProducts.filter(
    (product) =>
      product.title.toLowerCase().includes(search.toLowerCase()) ||
      product.brand?.name.toLowerCase().includes(search.toLowerCase()) ||
      product.category?.name.toLowerCase().includes(search.toLowerCase())
  )

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Products</h1>
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

      {/* Search */}
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
        <p className="text-sm text-muted-foreground">
          {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Table */}
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
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-muted rounded-lg" />
                    <div>
                      <p className="font-medium">{product.title}</p>
                      {product.model && (
                        <p className="text-xs text-muted-foreground">
                          Model: {product.model}
                        </p>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{product.brand?.name || "-"}</TableCell>
                <TableCell>{product.category?.name || "-"}</TableCell>
                <TableCell>
                  <Badge className={conditionColors[product.condition]}>
                    {conditionLabels[product.condition]}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {product.featured && (
                      <Badge variant="secondary">Featured</Badge>
                    )}
                    {product.status === "published" ? (
                      <Badge className="bg-emerald-500/20 text-emerald-400">
                        Published
                      </Badge>
                    ) : product.status === "sold" ? (
                      <Badge className="bg-red-500/20 text-red-400">Sold</Badge>
                    ) : product.status === "reserved" ? (
                      <Badge className="bg-blue-500/20 text-blue-400">Reserved</Badge>
                    ) : (
                      <Badge variant="outline">Draft</Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link
                          href={`/catalogo/${product.slug}`}
                          target="_blank"
                          className="flex items-center gap-2"
                        >
                          <ExternalLink className="h-4 w-4" />
                          View on Site
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link
                          href={`/admin/products/${product.id}`}
                          className="flex items-center gap-2"
                        >
                          <Eye className="h-4 w-4" />
                          View Details
                        </Link>
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
                      <DropdownMenuItem className="text-red-500 focus:text-red-500">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </motion.div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No products found</p>
        </div>
      )}
    </div>
  )
}
