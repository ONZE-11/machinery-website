"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { Product } from "@/types/database"
import {
  Package,
  FolderTree,
  Factory,
  FileQuestion,
  Mail,
  TrendingUp,
  Eye,
  Plus,
  ArrowRight,
  Loader2,
} from "lucide-react"

interface Counts {
  products: number
  categories: number
  brands: number
  faqs: number
}

export default function AdminDashboard() {
  const [counts, setCounts] = useState<Counts>({ products: 0, categories: 0, brands: 0, faqs: 0 })
  const [recentProducts, setRecentProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch("/api/products").then((r) => r.json()),
      fetch("/api/categories").then((r) => r.json()),
      fetch("/api/brands").then((r) => r.json()),
      fetch("/api/faq").then((r) => r.json()),
    ])
      .then(([products, categories, brands, faqs]) => {
        const p = Array.isArray(products) ? products : []
        const c = Array.isArray(categories) ? categories : []
        const b = Array.isArray(brands) ? brands : []
        const f = Array.isArray(faqs) ? faqs : []
        setCounts({ products: p.length, categories: c.length, brands: b.length, faqs: f.length })
        setRecentProducts(p.slice(0, 5))
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const stats = [
    { title: "Total Products", value: counts.products, icon: Package, href: "/admin/products", change: "All statuses" },
    { title: "Categories", value: counts.categories, icon: FolderTree, href: "/admin/categories", change: "Active" },
    { title: "Brands", value: counts.brands, icon: Factory, href: "/admin/brands", change: "All Japanese" },
    { title: "FAQ Items", value: counts.faqs, icon: FileQuestion, href: "/admin/faq", change: "Up to date" },
  ]

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here&apos;s an overview of your store.</p>
        </div>
        <Link href="/admin/products/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Product
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div key={stat.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: index * 0.1 }}>
                <Link href={stat.href}>
                  <Card className="hover:border-primary/50 transition-colors cursor-pointer">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                      <stat.icon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        <TrendingUp className="h-3 w-3 text-primary" />
                        {stat.change}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Products</CardTitle>
                <Link href="/admin/products">
                  <Button variant="ghost" size="sm" className="gap-1">
                    View All
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentProducts.length === 0 ? (
                    <p className="text-muted-foreground text-sm">No products yet.</p>
                  ) : (
                    recentProducts.map((product) => (
                      <div key={product.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                            <Package className="h-6 w-6 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{product.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {product.brand?.name} • {product.category?.name}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {product.featured && (
                            <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded">Featured</span>
                          )}
                          <Link href={`/admin/products/${product.id}/edit`}>
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Quick Actions</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {[
                  { href: "/admin/products/new", icon: Plus, label: "Add New Product" },
                  { href: "/admin/categories/new", icon: FolderTree, label: "Add Category" },
                  { href: "/admin/brands/new", icon: Factory, label: "Add Brand" },
                  { href: "/admin/faq/new", icon: FileQuestion, label: "Add FAQ" },
                  { href: "/admin/messages", icon: Mail, label: "View Messages" },
                ].map(({ href, icon: Icon, label }) => (
                  <Link key={href} href={href} className="block">
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Icon className="h-4 w-4" />
                      {label}
                    </Button>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  )
}
