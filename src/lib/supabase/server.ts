/**
 * src/lib/supabase/server.ts
 * 
 * Server-side Supabase client utilities for Next.js App Router
 * This file provides Supabase client instances for server components and route handlers
 * Uses createServerClient from @supabase/ssr for optimal server-side usage
 * 
 * IMPORTANT: This file should only be imported in server components or API routes
 * It uses next/headers which is not compatible with client components
 */

// Use 'server-only' package to prevent this module from being used in client components
import 'server-only';

import { createClient } from '@supabase/supabase-js'
import type { Database } from '../types/supabase'

/**
 * Validates that required environment variables are defined
 */
const validateEnvironmentVars = () => {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    console.error('src/lib/supabase/server.ts: Missing NEXT_PUBLIC_SUPABASE_URL environment variable')
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable')
  }
  
  if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.error('src/lib/supabase/server.ts: Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable')
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable')
  }
}

/**
 * Creates a Supabase client for server components
 * 
 * @returns A Supabase client instance for server components
 * @example
 * // In a Server Component
 * import { createServerComponentClient } from '@/lib/supabase/server'
 * 
 * export default async function ServerComponent() {
 *   const supabase = createServerComponentClient()
 *   const { data } = await supabase.from('properties').select('*')
 *   // Use data here
 * }
 */
export const createServerComponentClient = () => {
  validateEnvironmentVars()
  
  // Create a Supabase client for server components
  // For server components, we don't need cookie handling since we're not managing auth
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

/**
 * Creates a Supabase client for route handlers
 * 
 * @returns A Supabase client instance for route handlers
 * @example
 * // In a Route Handler
 * import { createRouteHandlerClient } from '@/lib/supabase/server'
 * import { NextResponse } from 'next/server'
 * 
 * export async function POST(request: Request) {
 *   const { title } = await request.json()
 *   const supabase = createRouteHandlerClient()
 *   const { data } = await supabase.from('properties').insert({ title }).select()
 *   return NextResponse.json(data)
 * }
 */
export const createRouteHandlerClient = () => {
  validateEnvironmentVars()
  
  // Create a Supabase client for route handlers
  // For route handlers, we don't need cookie handling since we're not managing auth
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

// For backward compatibility
export { createServerComponentClient as createClient }
