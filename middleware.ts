import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

const isProtectedRoute = createRouteMatcher([
  "/admin(.*)",
])

const isPublicAdminRoute = createRouteMatcher([
  "/admin/sign-in(.*)",
])

const isClerkConfigured =
  !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
  !!process.env.CLERK_SECRET_KEY

export default clerkMiddleware(async (auth, req) => {
  if (!isClerkConfigured) {
    const response = NextResponse.next()
    response.headers.set("X-Robots-Tag", "all")
    return response
  }

  if (isProtectedRoute(req) && !isPublicAdminRoute(req)) {
    await auth.protect()
  }

  const response = NextResponse.next()
  response.headers.set("X-Robots-Tag", "all")
  return response
})

export const config = {
  matcher: [
    "/((?!_next|.*\\..*|favicon.ico|sitemap.xml|robots.txt).*)",
    "/(api|trpc)(.*)",
  ],
}