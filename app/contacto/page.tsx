import { Suspense } from "react"
import type { Metadata } from "next"
import { Header, Footer, WhatsAppButton } from "@/components/layout"
import { ContactoPageClient } from "./contacto-client"
import { getContactSettings, getProductsBasic } from "@/lib/supabase/queries"

export const metadata: Metadata = {
  title: "Contacto | Maquinaria Japonesa en España",
  description:
    "Contáctenos para consultas sobre maquinaria japonesa. Presupuestos sin compromiso, asesoramiento experto y atención personalizada. Envío a toda España.",
  keywords: [
    "contacto maquinaria japonesa",
    "presupuesto excavadora",
    "consulta grúa japonesa",
    "comprar maquinaria Japón España",
  ],
  openGraph: {
    title: "Contacte con Nosotros",
    description:
      "Solicite información o presupuesto sin compromiso. Nuestro equipo de expertos le atenderá personalmente.",
    type: "website",
  },
}

export default async function ContactoPage() {
  const [settings, products] = await Promise.all([
    getContactSettings(),
    getProductsBasic(),
  ])

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Suspense fallback={null}>
        <ContactoPageClient settings={settings} products={products} />
      </Suspense>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
