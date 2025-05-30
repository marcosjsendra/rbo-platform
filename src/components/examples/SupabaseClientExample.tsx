'use client'

/**
 * src/components/examples/SupabaseClientExample.tsx
 * 
 * Example client component that uses the Supabase client to fetch properties
 * This demonstrates how to use the createClientComponentClient utility
 */

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@/lib/supabase/client'
import type { Database } from '@/lib/types/supabase'

/**
 * Client component that fetches and displays properties from Supabase
 * This component demonstrates how to use the Supabase client in a client component
 */
export default function SupabaseClientExample() {
  // Define state for properties and loading state
  const [properties, setProperties] = useState<Database['public']['Tables']['properties']['Row'][]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Fetch properties on component mount
  useEffect(() => {
    // Create a Supabase client for client components
    const supabase = createClientComponentClient()
    
    async function fetchProperties() {
      try {
        setLoading(true)
        
        // Fetch properties from the Supabase database
        const { data, error } = await supabase
          .from('properties')
          .select('*')
          .limit(5)
        
        // Handle any errors
        if (error) {
          console.error('src/components/examples/SupabaseClientExample.tsx: Error fetching properties:', error)
          setError(error.message)
          return
        }
        
        // Update state with fetched properties
        setProperties(data || [])
      } catch (err) {
        console.error('src/components/examples/SupabaseClientExample.tsx: Unexpected error:', err)
        setError('An unexpected error occurred')
      } finally {
        setLoading(false)
      }
    }
    
    // Call the fetch function
    fetchProperties()
  }, [])
  
  // Display loading state
  if (loading) {
    return (
      <div className="p-4 bg-white border rounded-md shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Properties (Client Component)</h2>
        <p className="text-gray-500">Loading properties...</p>
      </div>
    )
  }
  
  // Display error state
  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md">
        <h2 className="text-lg font-semibold text-red-600">Error Loading Properties</h2>
        <p className="text-red-500">{error}</p>
      </div>
    )
  }
  
  // Display the properties
  return (
    <div className="p-4 bg-white border rounded-md shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Properties (Client Component)</h2>
      
      {properties.length > 0 ? (
        <ul className="space-y-4">
          {properties.map((property) => (
            <li key={property.id} className="p-3 bg-gray-50 rounded-md">
              <h3 className="font-medium">{property.title}</h3>
              <p className="text-sm text-gray-600">{property.location}</p>
              <p className="text-sm font-semibold mt-1">
                {property.price ? `${property.currency || '$'}${property.price.toLocaleString()}` : 'Price not available'}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No properties found.</p>
      )}
    </div>
  )
}
