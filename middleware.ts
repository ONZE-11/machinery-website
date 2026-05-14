import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Define protected routes that require authentication
const isProtectedRoute = createRouteMatcher([
  '/admin(.*)',
])

// Define public routes that should never be protected
const isPublicRoute = createRouteMatcher([
  '/',
  '/catalogo(.*)',
  '/producto(.*)',
  '/marcas-japonesas(.*)',
  '/por-que-maquinaria-japonesa(.*)',
  '/sobre-nosotros(.*)',
  '/faq(.*)',
  '/contacto(.*)',
  '/privacidad(.*)',
  '/aviso-legal(.*)',
  '/api/contact(.*)',
  '/sitemap.xml',
  '/robots.txt',
])

// Check if Clerk is configured
const isClerkConfigured = 
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && 
  process.env.CLERK_SECRET_KEY

export default clerkMiddleware(async (auth, req: NextRequest) => {
  // If Clerk is not configured, allow all requests (development mode)
  if (!isClerkConfigured) {
    // Still add security headers for all requests
    const response = NextResponse.next()
    
    // Add additional security headers
    response.headers.set('X-Robots-Tag', 'all')
    
    return response
  }

  // If it's a protected route and user is not authenticated
  if (isProtectedRoute(req)) {
    await auth.protect()
  }

  // For all requests, continue with response
  const response = NextResponse.next()
  
  // Add additional headers
  response.headers.set('X-Robots-Tag', 'all')
  
  return response
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
