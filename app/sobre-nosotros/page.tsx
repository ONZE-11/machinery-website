export const dynamic = 'force-dynamic'

import type { Metadata } from "next"
import { Header, Footer, WhatsAppButton } from "@/components/layout"
import { SobreNosotrosClient } from "./sobre-nosotros-client"
import { getHomepageSection } from "@/lib/supabase/queries"

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

export default async function SobreNosotrosPage() {
  const section = await getHomepageSection('trust')
  const imageUrl = section?.image || null

  console.log("PAGE IMAGE DEBUG", {
    page: "/sobre-nosotros",
    section_key: section?.section_key,
    image: section?.image,
  })

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <SobreNosotrosClient imageUrl={imageUrl} />
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
