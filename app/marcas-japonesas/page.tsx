import type { Metadata } from "next"
import { Header, Footer, WhatsAppButton } from "@/components/layout"
import { MarcasPageClient } from "./marcas-client"
import { getActiveBrands, getPublishedProducts } from "@/lib/supabase/queries"

export const metadata: Metadata = {
  title: "Marcas Japonesas de Maquinaria | Komatsu, Tadano, Toyota, Hitachi",
  description:
    "Descubre las mejores marcas japonesas de maquinaria industrial: Komatsu, Tadano, Toyota, Hitachi, Kobelco. Tradición de excelencia y calidad desde Japón a España.",
  openGraph: {
    title: "Marcas Japonesas de Maquinaria",
    description:
      "Las mejores marcas japonesas de maquinaria industrial. Calidad, durabilidad y tecnología de vanguardia.",
    type: "website",
  },
}

export default async function MarcasJaponesasPage() {
  const [brands, products] = await Promise.all([
    getActiveBrands(),
    getPublishedProducts(),
  ])

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <MarcasPageClient brands={brands} products={products} />
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
