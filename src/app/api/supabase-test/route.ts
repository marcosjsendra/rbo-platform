/**
 * src/app/api/supabase-test/route.ts
 * 
 * Server-side API route demonstrating Supabase server client usage
 * This route fetches and returns zone data from Supabase
 */

import { NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase'

export async function GET() {
  try {
    console.log('src/app/api/supabase-test/route.ts: Handling GET request to test Supabase connection')
    
    // Create a Supabase server client
    const supabase = supabaseServer.createClient()
    
    // Query the zones table
    const { data, error } = await supabase
      .from('zones')
      .select('*')
      .order('name', { ascending: true })
    
    if (error) {
      console.error('src/app/api/supabase-test/route.ts: Error fetching zones:', error)
      return NextResponse.json(
        { error: 'Failed to fetch zones', details: error.message },
        { status: 500 }
      )
    }
    
    console.log(`src/app/api/supabase-test/route.ts: Successfully fetched ${data.length} zones`)
    
    // Return the zones data
    return NextResponse.json({ 
      success: true, 
      message: 'Supabase connection successful',
      count: data.length,
      zones: data 
    })
  } catch (err) {
    console.error('src/app/api/supabase-test/route.ts: Unexpected error:', err)
    return NextResponse.json(
      { error: 'An unexpected error occurred', details: String(err) },
      { status: 500 }
    )
  }
}
