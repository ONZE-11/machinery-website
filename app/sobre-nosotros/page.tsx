import type { Metadata } from "next"
import { Header, Footer, WhatsAppButton } from "@/components/layout"
import { SobreNosotrosClient } from "./sobre-nosotros-client"

export const metadata: Metadata = {
  title: "Sobre Nosotros | Especialistas en Maquinaria Japonesa",
  description:
    "Conozca nuestra historia, misión y compromiso con la calidad. Más de 15 años importando maquinaria japonesa premium para empresas españolas.",
  keywords: [
    "sobre nosotros",
    "importador maquinaria japonesa",
    "empresa maquinaria industrial España",
    "especialistas Japón",
  ],
  openGraph: {
    title: "Sobre Nosotros - Maquinaria Japonesa",
    description:
      "Especialistas en importación de maquinaria japonesa de alta calidad para el mercado español.",
    type: "website",
  },
}

export default function SobreNosotrosPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <SobreNosotrosClient />
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
