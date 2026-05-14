import type { Metadata } from "next"
import { CatalogoPageClient } from "./catalogo-client"

export const metadata: Metadata = {
  title: "Catálogo de Maquinaria Japonesa | Excavadoras, Grúas, Carretillas",
  description:
    "Explora nuestro catálogo completo de maquinaria japonesa de segunda mano: excavadoras Komatsu, grúas Tadano, carretillas Toyota y más. Importación directa desde Japón a España.",
  keywords: [
    "catálogo maquinaria japonesa",
    "excavadoras japonesas España",
    "grúas Tadano segunda mano",
    "carretillas elevadoras Toyota",
    "maquinaria industrial japonesa",
    "importación maquinaria Japón",
  ],
  openGraph: {
    title: "Catálogo de Maquinaria Japonesa",
    description:
      "Descubre nuestra selección de maquinaria japonesa de alta calidad. Excavadoras, grúas, carretillas y más, directamente desde Japón.",
    type: "website",
  },
}

export default function CatalogoPage() {
  return <CatalogoPageClient />
}
