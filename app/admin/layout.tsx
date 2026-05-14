import type { Metadata } from "next"
import { AdminLayoutClient } from "./admin-layout-client"

export const metadata: Metadata = {
  title: "Admin Dashboard | Maquinaria Japonesa",
  description: "Panel de administración para gestión de productos, categorías y contenido.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>
}
