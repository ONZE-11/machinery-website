import { createBrowserClient } from '@supabase/ssr'

// =============================================================================
// SUPABASE BROWSER CLIENT
// =============================================================================
// Use this client in Client Components (components with "use client")
// This client respects Row Level Security policies
// =============================================================================

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Return null if Supabase is not configured (development mode)
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('[Supabase] Client not configured - using mock data')
    return null
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}

// Export a singleton for convenience
let browserClient: ReturnType<typeof createBrowserClient> | null = null

export function getSupabaseBrowserClient() {
  if (browserClient) return browserClient
  
  const client = createClient()
  if (client) {
    browserClient = client
  }
  return client
}
