/**
 * src/lib/supabase/client.ts
 *
 * Client-side Supabase client utility for Next.js App Router
 * This file provides a Supabase client instance for client components
 * Uses createBrowserClient from @supabase/ssr for optimal client-side usage
 */

import { createBrowserClient } from "@supabase/ssr";
// Import the Database type from our local types file
import type { Database } from "../types/supabase.ts";

/**
 * Creates a Supabase client for client components
 * This uses createBrowserClient from @supabase/ssr which is optimized for client-side usage
 * and handles cookie management automatically
 *
 * @returns A Supabase client instance for client components
 * @example
 * 'use client'
 *
 * import { createClientComponentClient } from '@/lib/supabase/client'
 *
 * export default function ClientComponent() {
 *   const supabase = createClientComponentClient()
 *   // Use supabase client here
 * }
 */
export const createClientComponentClient = () => {
  // Ensure environment variables are defined
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    console.error(
      "src/lib/supabase/client.ts: Missing NEXT_PUBLIC_SUPABASE_URL environment variable"
    );
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL environment variable");
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.error(
      "src/lib/supabase/client.ts: Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable"
    );
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable"
    );
  }

  // Create and return a Supabase client optimized for client components
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
};

// For backward compatibility
export const createClient = createClientComponentClient;
