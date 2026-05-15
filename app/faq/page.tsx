import type { Metadata } from "next"
import { Header, Footer, WhatsAppButton } from "@/components/layout"
import { FAQPageClient } from "./faq-client"
import { getActiveFAQs } from "@/lib/supabase/queries"

export const metadata: Metadata = {
  title: "Preguntas Frecuentes | Maquinaria Japonesa en España",
  description:
    "Resuelva sus dudas sobre importación de maquinaria japonesa, garantías, financiación, envíos y proceso de compra. Respuestas claras a las preguntas más comunes.",
  keywords: [
    "preguntas frecuentes maquinaria",
    "FAQ importación Japón",
    "garantía maquinaria japonesa",
    "financiación maquinaria industrial",
  ],
  openGraph: {
    title: "Preguntas Frecuentes sobre Maquinaria Japonesa",
    description:
      "Todo lo que necesita saber sobre la importación de maquinaria japonesa a España.",
    type: "website",
  },
}

export default async function FAQPage() {
  const faqs = await getActiveFAQs()

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <FAQPageClient faqs={faqs} />
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
