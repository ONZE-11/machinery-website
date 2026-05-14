"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { mockFAQs } from "@/lib/mock-data"
import { Plus, Search, Pencil, Trash2, GripVertical } from "lucide-react"

export default function FAQAdminPage() {
  const [search, setSearch] = useState("")

  const filteredFAQs = mockFAQs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase())
  )

  // Group by category
  const faqsByCategory = filteredFAQs.reduce(
    (acc, faq) => {
      const category = faq.category || "General"
      if (!acc[category]) acc[category] = []
      acc[category].push(faq)
      return acc
    },
    {} as Record<string, typeof mockFAQs>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">FAQ</h1>
          <p className="text-muted-foreground">
            Manage frequently asked questions
          </p>
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
        <p className="text-sm text-muted-foreground">
          {filteredFAQs.length} FAQ{filteredFAQs.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="space-y-6">
        {Object.entries(faqsByCategory).map(([category, faqs]) => (
          <div key={category}>
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="outline" className="text-sm">
                {category}
              </Badge>
              <div className="flex-1 h-px bg-border" />
            </div>

            <Accordion type="single" collapsible className="space-y-2">
              {faqs.map((faq) => (
                <AccordionItem
                  key={faq.id}
                  value={faq.id}
                  className="border border-border rounded-lg px-4"
                >
                  <div className="flex items-center">
                    <button className="p-2 cursor-grab text-muted-foreground hover:text-foreground">
                      <GripVertical className="h-4 w-4" />
                    </button>
                    <AccordionTrigger className="flex-1 text-left hover:no-underline">
                      <span className="font-medium">{faq.question}</span>
                    </AccordionTrigger>
                    <div className="flex items-center gap-1 ml-2">
                      <Button variant="ghost" size="icon">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <AccordionContent className="pl-8 pr-24 pb-4">
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}
      </div>
    </div>
  )
}
