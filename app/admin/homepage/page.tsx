"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { HomepageSection } from "@/types/database"
import { Pencil, Loader2 } from "lucide-react"

type SectionMeta = { label: string; description: string; path: string; deprecated?: boolean }

const SECTION_META: Record<string, SectionMeta> = {
  hero: {
    label:       "Home Page — Main Hero",
    description: "Controls the main hero image and content at the top of the homepage.",
    path:        "/",
  },
  why_japanese_home: {
    label:       "Home Page — Why Japanese Section",
    description: 'Controls the "¿Por Qué Maquinaria Japonesa?" section inside the homepage.',
    path:        "/ (homepage section)",
  },
  hero_secondary: {
    label:       "¿Por Qué Japonesa? Page — Hero",
    description: "Controls the hero image and content for the dedicated ¿Por Qué? page.",
    path:        "/por-que-maquinaria-japonesa",
  },
  trust: {
    label:       "Sobre Nosotros Page — Hero / Trust Section",
    description: "Controls the hero/trust image and content for the About page.",
    path:        "/sobre-nosotros",
  },
}

export default function HomepageSectionsPage() {
  const [sections, setSections] = useState<HomepageSection[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch("/api/homepage")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setSections(data)
        else setError("Failed to load sections")
      })
      .catch(() => setError("Network error"))
      .finally(() => setLoading(false))
  }, [])

  const handleToggleActive = async (section: HomepageSection) => {
    const res = await fetch(`/api/homepage/${section.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !section.active }),
    })
    if (res.ok) {
      setSections((prev) =>
        prev.map((s) => (s.id === section.id ? { ...s, active: !s.active } : s))
      )
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Homepage</h1>
        <p className="text-muted-foreground">Edit homepage section content and images</p>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      )}
      {error && <p className="text-red-500 text-sm text-center py-8">{error}</p>}

      {!loading && !error && (
        <div className="space-y-4">
          {sections.filter((s) => s.section_key !== 'why_japanese_page').map((section) => {
            const meta = SECTION_META[section.section_key]
            return (
              <Card key={section.id} className={meta?.deprecated ? "opacity-50" : ""}>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      {/* Thumbnail */}
                      {section.image ? (
                        <img
                          src={section.image}
                          alt={section.title ?? section.section_key}
                          className="w-16 h-12 object-cover rounded shrink-0"
                        />
                      ) : (
                        <div className="w-16 h-12 rounded bg-muted shrink-0 flex items-center justify-center">
                          <span className="text-[10px] text-muted-foreground">No img</span>
                        </div>
                      )}

                      <div className="min-w-0 flex-1">
                        {/* Row 1: section_key + active badge + deprecated */}
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <code className="text-xs bg-muted px-1.5 py-0.5 rounded text-muted-foreground">
                            {section.section_key}
                          </code>
                          <Badge
                            onClick={() => !meta?.deprecated && handleToggleActive(section)}
                            className={cn(
                              "select-none text-xs",
                              meta?.deprecated
                                ? "bg-amber-500/15 text-amber-500 cursor-default"
                                : section.active
                                  ? "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 cursor-pointer"
                                  : "bg-muted text-muted-foreground hover:bg-muted/80 cursor-pointer"
                            )}
                          >
                            {meta?.deprecated ? "Deprecated" : section.active ? "Active" : "Inactive"}
                          </Badge>
                          {/* Path badge */}
                          {meta?.path && meta.path !== "—" && (
                            <span className="text-[10px] font-mono bg-primary/10 text-primary px-1.5 py-0.5 rounded">
                              {meta.path}
                            </span>
                          )}
                        </div>

                        {/* Row 2: label (bold) */}
                        {meta && (
                          <p className={cn(
                            "text-sm font-semibold leading-tight",
                            meta.deprecated ? "text-muted-foreground line-through" : "text-foreground"
                          )}>
                            {meta.label}
                          </p>
                        )}

                        {/* Row 3: description */}
                        {meta?.description && !meta.deprecated && (
                          <p className="text-xs text-muted-foreground mt-0.5 leading-snug">
                            {meta.description}
                          </p>
                        )}

                        {/* Row 4: DB title */}
                        {section.title && (
                          <p className="text-xs text-muted-foreground mt-1 truncate">
                            Title: <span className="text-foreground/70">{section.title}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    <Link href={`/admin/homepage/${section.id}/edit`} className="shrink-0">
                      <Button variant="outline" size="sm" className="gap-2">
                        <Pencil className="h-4 w-4" />
                        Edit
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )
          })}

          {sections.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              No homepage sections found. Run the seed SQL to create them.
            </p>
          )}
        </div>
      )}
    </div>
  )
}
