"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { HomepageSection } from "@/types/database"
import { Pencil, Loader2 } from "lucide-react"

const SECTION_LABELS: Record<string, string> = {
  hero:              "Home — main hero",
  why_japanese_home: "Home — Why Japanese section",
  why_japanese_page: "Page — ¿Por Qué Japonesa? (/por-que-maquinaria-japonesa)",
  hero_secondary:    "Secondary / contact hero",
  trust:             "About / trust section (/sobre-nosotros)",
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
          {sections.map((section) => (
            <Card key={section.id}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    {section.image && (
                      <img
                        src={section.image}
                        alt={section.title ?? section.section_key}
                        className="w-16 h-12 object-cover rounded shrink-0"
                      />
                    )}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <code className="text-xs bg-muted px-1.5 py-0.5 rounded text-muted-foreground">
                          {section.section_key}
                        </code>
                        <Badge
                          onClick={() => handleToggleActive(section)}
                          className={cn(
                            "cursor-pointer select-none text-xs",
                            section.active
                              ? "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"
                              : "bg-muted text-muted-foreground hover:bg-muted/80"
                          )}
                        >
                          {section.active ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      {SECTION_LABELS[section.section_key] && (
                        <p className="text-xs text-primary/70 font-medium truncate">
                          {SECTION_LABELS[section.section_key]}
                        </p>
                      )}
                      {section.title && (
                        <p className="font-medium text-foreground truncate">{section.title}</p>
                      )}
                      {section.subtitle && (
                        <p className="text-sm text-muted-foreground truncate">{section.subtitle}</p>
                      )}
                      {section.cta_text && (
                        <p className="text-xs text-muted-foreground mt-1">
                          CTA: {section.cta_text}
                          {section.cta_link && ` → ${section.cta_link}`}
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
          ))}

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
