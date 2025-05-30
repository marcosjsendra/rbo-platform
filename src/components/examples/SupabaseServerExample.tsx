/**
 * src/components/examples/SupabaseServerExample.tsx
 * 
 * Example server component that uses the Supabase client to fetch properties
 * This demonstrates how to use the createServerComponentClient utility
 */

import { createServerComponentClient } from '@/lib/supabase/server'

/**
 * Server component that fetches and displays properties from Supabase
 * This component demonstrates how to use the Supabase client in a server component
 */
export default async function SupabaseServerExample() {
  // Create a Supabase client for server components
  const supabase = createServerComponentClient()
  
  // Fetch properties from the Supabase database
  const { data: properties, error } = await supabase
    .from('properties')
    .select('*')
    .limit(5)
  
  // Handle any errors
  if (error) {
    console.error('src/components/examples/SupabaseServerExample.tsx: Error fetching properties:', error)
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md">
        <h2 className="text-lg font-semibold text-red-600">Error Loading Properties</h2>
        <p className="text-red-500">{error.message}</p>
      </div>
    )
  }
  
  // Display the properties
  return (
    <div className="p-4 bg-white border rounded-md shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Properties (Server Component)</h2>
      
      {properties && properties.length > 0 ? (
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
