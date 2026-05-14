"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { mockProducts, mockCategories, mockBrands, mockFAQs } from "@/lib/mock-data"
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
} from "lucide-react"

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total Products",
      value: mockProducts.length,
      icon: Package,
      href: "/admin/products",
      change: "+3 this month",
    },
    {
      title: "Categories",
      value: mockCategories.length,
      icon: FolderTree,
      href: "/admin/categories",
      change: "Active",
    },
    {
      title: "Brands",
      value: mockBrands.length,
      icon: Factory,
      href: "/admin/brands",
      change: "All Japanese",
    },
    {
      title: "FAQ Items",
      value: mockFAQs.length,
      icon: FileQuestion,
      href: "/admin/faq",
      change: "Up to date",
    },
  ]

  const recentProducts = mockProducts.slice(0, 5)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here&apos;s an overview of your store.
          </p>
        </div>
        <Link href="/admin/products/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Product
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Link href={stat.href}>
              <Card className="hover:border-primary/50 transition-colors cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
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

      {/* Recent Products & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Products */}
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
              {recentProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                >
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
                      <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded">
                        Featured
                      </span>
                    )}
                    <Link href={`/admin/products/${product.id}`}>
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/admin/products/new" className="block">
              <Button variant="outline" className="w-full justify-start gap-2">
                <Plus className="h-4 w-4" />
                Add New Product
              </Button>
            </Link>
            <Link href="/admin/categories/new" className="block">
              <Button variant="outline" className="w-full justify-start gap-2">
                <FolderTree className="h-4 w-4" />
                Add Category
              </Button>
            </Link>
            <Link href="/admin/brands/new" className="block">
              <Button variant="outline" className="w-full justify-start gap-2">
                <Factory className="h-4 w-4" />
                Add Brand
              </Button>
            </Link>
            <Link href="/admin/faq/new" className="block">
              <Button variant="outline" className="w-full justify-start gap-2">
                <FileQuestion className="h-4 w-4" />
                Add FAQ
              </Button>
            </Link>
            <Link href="/admin/messages" className="block">
              <Button variant="outline" className="w-full justify-start gap-2">
                <Mail className="h-4 w-4" />
                View Messages
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Info Banner */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">
                Mock Data Mode
              </h3>
              <p className="text-sm text-muted-foreground">
                This admin dashboard is running with mock data. To connect to
                Supabase and enable real data persistence, add your environment
                variables in the settings and run the SQL setup scripts.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
