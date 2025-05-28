/**
 * src/lib/supabase/client.ts
 * 
 * Client-side Supabase client utility
 * This file provides a Supabase client instance for client components
 * Uses environment variables for configuration
 */

import { createClient as createSupabaseClient } from '@supabase/supabase-js'

// Create a single supabase client for the entire client-side application
export const createClient = () => {
  // Ensure environment variables are defined
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    console.error('src/lib/supabase/client.ts: Missing NEXT_PUBLIC_SUPABASE_URL environment variable')
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable')
  }
  
  if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.error('src/lib/supabase/client.ts: Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable')
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable')
  }

  // Create and return a Supabase client
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      auth: {
        persistSession: true, // For client components, we want to persist the session
      },
    }
  )
}
