/**
 * src/lib/supabase/index.ts
 * 
 * Exports Supabase client utilities for both client and server components
 * This file provides a convenient way to import Supabase clients
 * 
 * IMPORTANT: This file has been restructured to avoid server-only imports in client components
 * - For client components: import from '@/lib/supabase/client'
 * - For server components: import from '@/lib/supabase/server'
 * - For shared types: import from '@/lib/types/supabase'
 */

// Re-export client utilities only (safe for both client and server components)
import * as clientModule from './client';
export { clientModule as supabaseClient };

// Export the client component client for convenience (safe for both client and server)
export { createClientComponentClient, createClient as createBrowserClient } from './client';

// Export types
export type { SupabaseClient } from '@supabase/supabase-js';
export type { Database } from '../types/supabase';

// Note: We do NOT re-export server utilities from this file
// to prevent accidental imports of server-only code in client components
// For server utilities, import directly from '@/lib/supabase/server'
