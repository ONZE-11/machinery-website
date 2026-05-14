import type { Metadata } from "next"
import { MarcasPageClient } from "./marcas-client"

export const metadata: Metadata = {
  title: "Marcas Japonesas de Maquinaria | Komatsu, Tadano, Toyota, Hitachi",
  description:
    "Descubre las mejores marcas japonesas de maquinaria industrial: Komatsu, Tadano, Toyota, Hitachi, Kobelco. Tradición de excelencia y calidad desde Japón a España.",
  keywords: [
    "marcas maquinaria japonesa",
    "Komatsu España",
    "Tadano grúas",
    "Toyota carretillas",
    "Hitachi excavadoras",
    "Kobelco maquinaria",
  ],
  openGraph: {
    title: "Marcas Japonesas de Maquinaria",
    description:
      "Las mejores marcas japonesas de maquinaria industrial. Calidad, durabilidad y tecnología de vanguardia.",
    type: "website",
  },
}

export default function MarcasPage() {
  return <MarcasPageClient />
}
