/**
 * src/lib/supabase/index.ts
 * 
 * Exports Supabase client utilities for both client and server components
 * This file provides a convenient way to import Supabase clients
 */

// Re-export client and server utilities
export * as supabaseClient from './client'
export * as supabaseServer from './server'

// Export types
export type { SupabaseClient } from '@supabase/supabase-js'
