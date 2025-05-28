/**
 * src/app/supabase-test/page.tsx
 * 
 * Test page to demonstrate Supabase integration
 * This page includes both server and client components using Supabase
 */

import { Suspense } from 'react'
import SupabaseExample from '@/components/examples/SupabaseExample'
import { supabaseServer } from '@/lib/supabase'

// Server component to fetch and display zone count
async function ZoneStats() {
  try {
    console.log('src/app/supabase-test/page.tsx: Creating Supabase server client')
    // Create a Supabase server client
    const supabase = supabaseServer.createClient()
    
    console.log('src/app/supabase-test/page.tsx: Querying zones table')
    // Query the zones table to get count
    const { count, error } = await supabase
      .from('zones')
      .select('*', { count: 'exact', head: true })
  
    if (error) {
      console.error('src/app/supabase-test/page.tsx: Error fetching zone count:', error)
      return (
        <div className="p-4 mb-6 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="text-lg font-semibold text-red-600">Server Error</h3>
          <p className="text-red-700">{error.message}</p>
        </div>
      )
    }
    
    return (
      <div className="p-4 mb-6 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-700">Server Component</h3>
        <p>Total zones in database: <span className="font-bold">{count}</span></p>
        <p className="text-sm text-gray-600 mt-2">
          This data was fetched using the Supabase server client directly in a React Server Component.
        </p>
      </div>
    )
  } catch (error) {
    console.error('src/app/supabase-test/page.tsx: Unexpected error:', error)
    return (
      <div className="p-4 mb-6 bg-red-50 border border-red-200 rounded-lg">
        <h3 className="text-lg font-semibold text-red-600">Server Error</h3>
        <p className="text-red-700">An unexpected error occurred</p>
      </div>
    )
  }
}

export default function SupabaseTestPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">Supabase Integration Test</h1>
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Server Component Example</h2>
        <Suspense fallback={<div className="p-4 bg-gray-100 rounded-lg animate-pulse h-24"></div>}>
          <ZoneStats />
        </Suspense>
      </div>
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Client Component Example</h2>
        <SupabaseExample />
      </div>
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">API Route Test</h2>
        <p className="mb-4">
          Test the server-side API route that uses Supabase:
        </p>
        <a 
          href="/api/supabase-test" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Test API Route
        </a>
      </div>
    </div>
  )
}
