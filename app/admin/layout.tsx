import type { Metadata } from "next"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { AdminLayoutClient } from "./admin-layout-client"
import { isAdminEmail } from "@/lib/admin-auth"

export const metadata: Metadata = {
  title: "Admin Dashboard | Maquinaria Japonesa",
  description: "Panel de administración para gestión de productos, categorías y contenido.",
  robots: {
    index: false,
    follow: false,
  },
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await currentUser()

  if (!user) {
    redirect("/sign-in")
  }

  // Resolve primary email (fall back to first address if primary not set)
  const primaryEmail =
    user.emailAddresses.find((e) => e.id === user.primaryEmailAddressId)
      ?.emailAddress ?? user.emailAddresses[0]?.emailAddress

  if (!primaryEmail || !isAdminEmail(primaryEmail)) {
    redirect("/?unauthorized=1")
  }

  const displayName =
    user.fullName ??
    user.username ??
    primaryEmail.split("@")[0]

  return (
    <AdminLayoutClient user={{ name: displayName, email: primaryEmail }}>
      {children}
    </AdminLayoutClient>
  )
}
