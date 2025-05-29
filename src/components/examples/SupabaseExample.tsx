'use client'

/**
 * src/components/examples/SupabaseExample.tsx
 * 
 * Example client component demonstrating Supabase client usage
 * This component fetches and displays zone data from Supabase
 */

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@/lib/supabase/client'

// Define the Zone type based on our database schema
type Zone = {
  id: string
  name: string
  description: string | null
  image_url: string | null
  latitude: number | null
  longitude: number | null
  created_at: string
  updated_at: string
}

export default function SupabaseExample() {
  const [zones, setZones] = useState<Zone[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Create a Supabase client
    const supabase = createClientComponentClient()
    
    async function fetchZones() {
      try {
        console.log('src/components/examples/SupabaseExample.tsx: Fetching zones from Supabase')
        setLoading(true)
        
        // Query the zones table
        const { data, error } = await supabase
          .from('zones')
          .select('*')
          .order('name', { ascending: true })
        
        if (error) {
          console.error('src/components/examples/SupabaseExample.tsx: Error fetching zones:', error)
          setError(error.message)
          return
        }
        
        console.log(`src/components/examples/SupabaseExample.tsx: Successfully fetched ${data.length} zones`)
        setZones(data as Zone[])
      } catch (err) {
        console.error('src/components/examples/SupabaseExample.tsx: Unexpected error:', err)
        setError('An unexpected error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchZones()
  }, [])

  if (loading) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Loading Zones...</h2>
        <div className="animate-pulse space-y-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-24 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-red-600">Error Loading Zones</h2>
        <p className="mb-4">{error}</p>
        <p>Please check your Supabase configuration and ensure the zones table exists.</p>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">RE/MAX Blue Ocean Zones</h2>
      
      {zones.length === 0 ? (
        <p>No zones found. Please ensure the zones table is populated.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {zones.map((zone) => (
            <div key={zone.id} className="border rounded-lg overflow-hidden shadow-md">
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{zone.name}</h3>
                <p className="text-gray-600 mb-3">{zone.description || 'No description available'}</p>
                {zone.latitude && zone.longitude && (
                  <p className="text-sm text-gray-500">
                    Location: {zone.latitude.toFixed(4)}, {zone.longitude.toFixed(4)}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
