import { Suspense } from "react"
import type { Metadata } from "next"
import { ContactoPageClient } from "./contacto-client"

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

export default function ContactoPage() {
  return (
    <Suspense fallback={null}>
      <ContactoPageClient />
    </Suspense>
  )
}
