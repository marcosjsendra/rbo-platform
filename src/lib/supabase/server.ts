/**
 * src/lib/supabase/server.ts
 * 
 * Server-side Supabase client utility
 * This file provides a Supabase client instance for server components
 * Uses environment variables for configuration
 */

import { createClient as createSupabaseClient } from '@supabase/supabase-js'

/**
 * Creates a Supabase client for server components
 * This simplified version doesn't handle cookies, which is fine for most read operations
 * For auth operations that require cookies, use the createServerComponentClient from @supabase/auth-helpers-nextjs
 */
export const createClient = () => {
  // Ensure environment variables are defined
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    console.error('src/lib/supabase/server.ts: Missing NEXT_PUBLIC_SUPABASE_URL environment variable')
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable')
  }
  
  if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.error('src/lib/supabase/server.ts: Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable')
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable')
  }

  // Create and return a Supabase client
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      auth: {
        persistSession: false, // Since this is for server components, we don't need to persist the session
      },
    }
  )
}
