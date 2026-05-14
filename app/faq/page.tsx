import type { Metadata } from "next"
import { FAQPageClient } from "./faq-client"

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

export default function FAQPage() {
  return <FAQPageClient />
}
