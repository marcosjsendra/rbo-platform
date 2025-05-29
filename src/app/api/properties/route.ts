/**
 * src/app/api/properties/route.ts
 * 
 * Example API route that uses the Supabase client to fetch and manage properties
 * This demonstrates how to use the createRouteHandlerClient utility
 */

import { NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@/lib/supabase/server'

/**
 * GET handler for fetching properties
 * @param request The incoming request
 * @returns A JSON response with the properties data
 */
export async function GET(request: Request) {
  // Get query parameters
  const url = new URL(request.url)
  const limit = parseInt(url.searchParams.get('limit') || '10')
  const offset = parseInt(url.searchParams.get('offset') || '0')
  
  // Create a Supabase client for route handlers
  const supabase = createRouteHandlerClient()
  
  try {
    // Fetch properties from the Supabase database
    const { data, error, count } = await supabase
      .from('properties')
      .select('*', { count: 'exact' })
      .range(offset, offset + limit - 1)
    
    // Handle any errors
    if (error) {
      console.error('src/app/api/properties/route.ts: Error fetching properties:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    // Return the properties data
    return NextResponse.json({
      data,
      count,
      limit,
      offset,
    })
  } catch (err) {
    console.error('src/app/api/properties/route.ts: Unexpected error:', err)
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 })
  }
}

/**
 * POST handler for creating a new property
 * @param request The incoming request with property data
 * @returns A JSON response with the created property
 */
export async function POST(request: Request) {
  try {
    // Parse the request body
    const propertyData = await request.json()
    
    // Create a Supabase client for route handlers
    const supabase = createRouteHandlerClient()
    
    // Insert the new property into the database
    const { data, error } = await supabase
      .from('properties')
      .insert(propertyData)
      .select()
    
    // Handle any errors
    if (error) {
      console.error('src/app/api/properties/route.ts: Error creating property:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    // Return the created property
    return NextResponse.json({ data }, { status: 201 })
  } catch (err) {
    console.error('src/app/api/properties/route.ts: Unexpected error:', err)
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 })
  }
}
