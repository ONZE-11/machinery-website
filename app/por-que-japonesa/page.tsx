import type { Metadata } from "next"
import { Header, Footer, WhatsAppButton } from "@/components/layout"
import { PorQueJaponesaClient } from "./por-que-japonesa-client"

export const metadata: Metadata = {
  title: "¿Por Qué Maquinaria Japonesa? | Ventajas y Beneficios",
  description:
    "Descubra por qué la maquinaria japonesa es la mejor inversión para su empresa. Calidad superior, durabilidad excepcional y tecnología de vanguardia desde Japón.",
  keywords: [
    "ventajas maquinaria japonesa",
    "calidad japonesa",
    "por qué comprar maquinaria Japón",
    "beneficios maquinaria industrial japonesa",
  ],
  openGraph: {
    title: "¿Por Qué Elegir Maquinaria Japonesa?",
    description:
      "Las razones por las que la maquinaria japonesa es líder mundial en calidad y fiabilidad.",
    type: "website",
  },
}

export default function PorQueJaponesaPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <PorQueJaponesaClient />
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
