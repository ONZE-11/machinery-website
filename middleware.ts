import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

const isProtectedRoute = createRouteMatcher([
  "/admin(.*)",
  "/api/admin(.*)",
])

const isPublicAdminRoute = createRouteMatcher([
  "/admin/sign-in(.*)",
])

const isClerkConfigured =
  !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
  !!process.env.CLERK_SECRET_KEY

function nextWithPathname(req: Request) {
  const requestHeaders = new Headers(req.headers)
  const url = new URL(req.url)

  requestHeaders.set("x-pathname", url.pathname)

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })

  response.headers.set("X-Robots-Tag", "all")
  return response
}

export default clerkMiddleware(async (auth, req) => {
  if (!isClerkConfigured) {
    return nextWithPathname(req)
  }

  if (isProtectedRoute(req) && !isPublicAdminRoute(req)) {
    await auth.protect()
  }

  return nextWithPathname(req)
})

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/admin/:path*",
  ],
}