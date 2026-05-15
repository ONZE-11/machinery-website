"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { FAQForm } from "@/components/admin/faq-form"
import type { FAQ } from "@/types/database"
import { Loader2 } from "lucide-react"

export default function EditFAQPage() {
  const { id } = useParams<{ id: string }>()
  const [faq, setFaq] = useState<FAQ | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    fetch(`/api/faq/${id}`)
      .then((r) => {
        if (r.status === 404) { setNotFound(true); return null }
        return r.json()
      })
      .then((data) => { if (data) setFaq(data) })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (notFound || !faq) {
    return <div className="text-center py-24 text-muted-foreground">FAQ not found</div>
  }

  return (
    <FAQForm
      faqId={id}
      defaultValues={{
        question: faq.question,
        answer: faq.answer,
        category: faq.category,
        display_order: faq.display_order,
        active: faq.active,
      }}
    />
  )
}
