/**
 * src/lib/data/supabase-client.ts
 * 
 * Supabase client provider for data access layer
 * Provides a consistent way to create Supabase clients
 */

import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';

// Cache for the Supabase client to avoid creating multiple instances
let cachedClient: ReturnType<typeof createClient<Database>> | null = null;

/**
 * Get a Supabase client for data access
 * 
 * This function caches the client to avoid creating multiple instances
 * 
 * @returns Supabase client
 */
export function getSupabaseClient(): ReturnType<typeof createClient<Database>> {
  // If we already have a cached client, return it
  if (cachedClient) {
    return cachedClient;
  }
  
  // Get Supabase URL and anon key from environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  // Validate environment variables
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('src/lib/data/supabase-client.ts: Missing Supabase environment variables');
    throw new Error('Missing Supabase environment variables');
  }
  
  // Create a new Supabase client
  cachedClient = createClient<Database>(supabaseUrl, supabaseAnonKey);
  
  // Log client creation
  console.log('src/lib/data/supabase-client.ts: Created new Supabase client');
  
  return cachedClient;
}

/**
 * Handle Supabase errors consistently
 * 
 * @param error - Error from Supabase
 * @param context - Context for the error
 * @returns Error message
 */
export function handleSupabaseError(error: unknown, context: string): string {
  // Log the error
  console.error(`src/lib/data/supabase-client.ts: ${context}:`, error);
  
  // Extract error message
  let errorMessage = 'Unknown error';
  
  if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  } else if (typeof error === 'object' && error !== null) {
    // Try to extract message from Supabase error object
    const supabaseError = error as Record<string, unknown>;
    if (supabaseError.message && typeof supabaseError.message === 'string') {
      errorMessage = supabaseError.message;
    } else if (supabaseError.error && typeof supabaseError.error === 'string') {
      errorMessage = supabaseError.error;
    }
  }
  
  return errorMessage;
}
