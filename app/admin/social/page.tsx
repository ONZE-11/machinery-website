"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { SocialLink } from "@/types/database"
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react"

export default function SocialLinksPage() {
  const [links, setLinks] = useState<SocialLink[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch("/api/social")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setLinks(data)
        else setError("Failed to load social links")
      })
      .catch(() => setError("Network error"))
      .finally(() => setLoading(false))
  }, [])

  const handleToggleActive = async (link: SocialLink) => {
    const res = await fetch(`/api/social/${link.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !link.active }),
    })
    if (res.ok) {
      setLinks((prev) => prev.map((l) => (l.id === link.id ? { ...l, active: !l.active } : l)))
    }
  }

  const handleDelete = async (link: SocialLink) => {
    if (!window.confirm(`¿Eliminar el enlace de ${link.platform}?`)) return
    const res = await fetch(`/api/social/${link.id}`, { method: "DELETE" })
    if (res.ok) setLinks((prev) => prev.filter((l) => l.id !== link.id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Social Links</h1>
          <p className="text-muted-foreground">Manage social media links shown on the site</p>
        </div>
        <Link href="/admin/social/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Link
          </Button>
        </Link>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      )}
      {error && <p className="text-red-500 text-sm text-center py-8">{error}</p>}

      {!loading && !error && (
        <div className="border border-border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Platform</TableHead>
                <TableHead>URL</TableHead>
                <TableHead>Icon</TableHead>
                <TableHead>Order</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {links.map((link) => (
                <TableRow key={link.id}>
                  <TableCell className="font-medium capitalize">{link.platform}</TableCell>
                  <TableCell className="text-muted-foreground text-sm max-w-xs truncate">
                    {link.url}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{link.icon ?? "-"}</TableCell>
                  <TableCell className="text-muted-foreground">{link.display_order}</TableCell>
                  <TableCell>
                    <Badge
                      onClick={() => handleToggleActive(link)}
                      className={cn(
                        "cursor-pointer select-none",
                        link.active
                          ? "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      )}
                    >
                      {link.active ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/social/${link.id}/edit`}>
                        <Button variant="ghost" size="icon">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-600"
                        onClick={() => handleDelete(link)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {links.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No social links yet
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
