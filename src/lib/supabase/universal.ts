/**
 * src/lib/supabase/universal.ts
 * 
 * Universal Supabase client utilities for Next.js App Router
 * This file provides Supabase client instances that can be used in both client and server components
 * 
 * IMPORTANT: This is a modified version of server.ts that removes the 'server-only' import
 * to allow usage in client components and pages directory
 */

import { createClient } from '@supabase/supabase-js'
import type { Database } from '../types/supabase'

/**
 * Validates that required environment variables are defined
 */
const validateEnvironmentVars = () => {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    console.error('src/lib/supabase/universal.ts: Missing NEXT_PUBLIC_SUPABASE_URL environment variable')
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable')
  }
  
  if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.error('src/lib/supabase/universal.ts: Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable')
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable')
  }
}

/**
 * Creates a Supabase client that can be used in both client and server components
 * 
 * @returns A Supabase client instance
 * @example
 * import { createUniversalClient } from '@/lib/supabase/universal'
 * 
 * // Can be used in both client and server components
 * const supabase = createUniversalClient()
 * const { data } = await supabase.from('properties').select('*')
 */
export const createUniversalClient = () => {
  validateEnvironmentVars()
  
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    }
  )
}

// For backward compatibility
export { createUniversalClient as createClient }
