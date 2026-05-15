"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from "@/lib/utils"
import type { FAQ } from "@/types/database"
import { Plus, Search, Pencil, Trash2, Loader2 } from "lucide-react"

export default function FAQAdminPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState("")

  useEffect(() => {
    fetch("/api/faq")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setFaqs(data)
        else setError("Failed to load FAQs")
      })
      .catch(() => setError("Network error"))
      .finally(() => setLoading(false))
  }, [])

  const handleToggleActive = async (faq: FAQ) => {
    const res = await fetch(`/api/faq/${faq.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !faq.active }),
    })
    if (res.ok) {
      setFaqs((prev) => prev.map((f) => (f.id === faq.id ? { ...f, active: !f.active } : f)))
    }
  }

  const handleDelete = async (faq: FAQ) => {
    if (!window.confirm(`¿Eliminar esta pregunta?\n"${faq.question.slice(0, 80)}..."`)) return
    const res = await fetch(`/api/faq/${faq.id}`, { method: "DELETE" })
    if (res.ok) setFaqs((prev) => prev.filter((f) => f.id !== faq.id))
  }

  const filtered = faqs.filter(
    (f) =>
      f.question.toLowerCase().includes(search.toLowerCase()) ||
      f.answer.toLowerCase().includes(search.toLowerCase())
  )

  const byCategory = filtered.reduce<Record<string, FAQ[]>>((acc, faq) => {
    const cat = faq.category || "General"
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(faq)
    return acc
  }, {})

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">FAQ</h1>
          <p className="text-muted-foreground">Manage frequently asked questions</p>
        </div>
        <Link href="/admin/faq/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add FAQ
          </Button>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search FAQs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        {!loading && (
          <p className="text-sm text-muted-foreground">
            {filtered.length} FAQ{filtered.length !== 1 ? "s" : ""}
          </p>
        )}
      </div>

      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      )}

      {error && <p className="text-red-500 text-sm text-center py-8">{error}</p>}

      {!loading && !error && (
        <div className="space-y-6">
          {Object.entries(byCategory).map(([category, items]) => (
            <div key={category}>
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="outline" className="text-sm">{category}</Badge>
                <div className="flex-1 h-px bg-border" />
              </div>

              <Accordion type="single" collapsible className="space-y-2">
                {items.map((faq) => (
                  <AccordionItem
                    key={faq.id}
                    value={faq.id}
                    className="border border-border rounded-lg px-4"
                  >
                    <div className="flex items-center gap-2">
                      <Badge
                        onClick={() => handleToggleActive(faq)}
                        className={cn(
                          "cursor-pointer select-none shrink-0",
                          faq.active
                            ? "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"
                            : "bg-muted text-muted-foreground hover:bg-muted/80"
                        )}
                      >
                        {faq.active ? "Active" : "Off"}
                      </Badge>

                      <AccordionTrigger className="flex-1 text-left hover:no-underline">
                        <span className="font-medium">{faq.question}</span>
                      </AccordionTrigger>

                      <div className="flex items-center gap-1 ml-2 shrink-0">
                        <Link href={`/admin/faq/${faq.id}/edit`}>
                          <Button variant="ghost" size="icon">
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500 hover:text-red-600"
                          onClick={() => handleDelete(faq)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <AccordionContent className="pl-4 pb-4">
                      <p className="text-muted-foreground">{faq.answer}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Order: {faq.display_order}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}

          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              {search ? "No FAQs match your search" : "No FAQs yet"}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
