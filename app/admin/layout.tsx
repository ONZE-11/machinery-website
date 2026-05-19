import type { Metadata } from "next"
import { headers } from "next/headers"
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
  const pathname = (await headers()).get("x-pathname") ?? ""

  // The sign-in page lives under /admin/ so this layout wraps it too.
  // Without this guard, the auth check below would redirect unauthenticated
  // visitors back to /admin/sign-in — creating an infinite redirect loop.
  if (pathname.startsWith("/admin/sign-in")) {
    return <>{children}</>
  }

  const user = await currentUser()

  if (!user) {
    redirect("/admin/sign-in")
  }

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