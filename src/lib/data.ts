/**
 * src/lib/data.ts
 * Data fetching utilities for properties and agents
 */

import { createClient } from '@supabase/supabase-js'
import { Database } from './types/supabase'

// Initialize Supabase client
const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export type PropertyFilterOptions = {
  propertyType?: string
  location?: string
  minPrice?: number
  maxPrice?: number
}

export type AgentFilterOptions = {
  location?: string
  specialization?: string
}

/**
 * Fetch properties from Supabase with optional filters
 */
export async function getProperties(filters?: PropertyFilterOptions) {
  let query = supabase.from('properties').select('*')

  if (filters) {
    if (filters.propertyType) {
      query = query.eq('property_type', filters.propertyType)
    }
    if (filters.location) {
      query = query.eq('location', filters.location)
    }
    if (filters.minPrice) {
      query = query.gte('price', filters.minPrice)
    }
    if (filters.maxPrice) {
      query = query.lte('price', filters.maxPrice)
    }
  }

  const { data, error } = await query

  if (error) {
    console.error('src/lib/data.ts: Error fetching properties:', error)
    throw error
  }

  return data
}

/**
 * Fetch agents from Supabase with optional filters
 */
export async function getAgents(filters?: AgentFilterOptions) {
  let query = supabase.from('agents').select('*')

  if (filters) {
    if (filters.location) {
      query = query.eq('location', filters.location)
    }
    if (filters.specialization) {
      query = query.eq('specialization', filters.specialization)
    }
  }

  const { data, error } = await query

  if (error) {
    console.error('src/lib/data.ts: Error fetching agents:', error)
    throw error
  }

  return data
}