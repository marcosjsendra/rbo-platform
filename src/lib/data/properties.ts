/**
 * src/lib/data/properties.ts
 * 
 * Data access layer for properties
 * Provides functions for retrieving and filtering properties from Supabase
 */

import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';

// Define property filter options interface
export interface PropertyFilterOptions {
  brand?: 'AZURA' | 'BLUE_OCEAN';
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  propertyType?: string;
  location?: string;
  searchTerm?: string;
}

// Define property pagination options interface
export interface PropertyPaginationOptions {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
}

/**
 * Get properties from Supabase with filtering and pagination
 * 
 * @param filterOptions - Options for filtering properties
 * @param paginationOptions - Options for paginating results
 * @returns Properties and total count
 */
export async function getProperties(
  filterOptions: PropertyFilterOptions = {},
  paginationOptions: PropertyPaginationOptions = {}
): Promise<{ properties: Database['public']['Tables']['properties']['Row'][]; totalCount: number }> {
  // Create Supabase client
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
  const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
  
  // Log the function call
  console.log('src/lib/data/properties.ts: Getting properties with filters:', filterOptions, 'and pagination:', paginationOptions);
  
  try {
    // Set default pagination values
    const page = paginationOptions.page || 1;
    const pageSize = paginationOptions.pageSize || 10;
    const sortBy = paginationOptions.sortBy || 'created_at';
    const sortDirection = paginationOptions.sortDirection || 'desc';
    
    // Calculate offset
    const offset = (page - 1) * pageSize;
    
    // Start building the query
    let query = supabase
      .from('properties')
      .select('*', { count: 'exact' });
    
    // Apply filters
    if (filterOptions.brand) {
      query = query.eq('brand', filterOptions.brand);
    }
    
    if (filterOptions.minPrice) {
      query = query.gte('price', filterOptions.minPrice);
    }
    
    if (filterOptions.maxPrice) {
      query = query.lte('price', filterOptions.maxPrice);
    }
    
    if (filterOptions.bedrooms) {
      query = query.eq('bedrooms', filterOptions.bedrooms);
    }
    
    if (filterOptions.bathrooms) {
      query = query.eq('bathrooms', filterOptions.bathrooms);
    }
    
    if (filterOptions.propertyType) {
      query = query.eq('property_type', filterOptions.propertyType);
    }
    
    if (filterOptions.location) {
      query = query.eq('location', filterOptions.location);
    }
    
    if (filterOptions.searchTerm) {
      query = query.or(`title.ilike.%${filterOptions.searchTerm}%,description.ilike.%${filterOptions.searchTerm}%`);
    }
    
    // Apply pagination and sorting
    query = query
      .order(sortBy, { ascending: sortDirection === 'asc' })
      .range(offset, offset + pageSize - 1);
    
    // Execute the query
    const { data: properties, error, count } = await query;
    
    if (error) {
      console.error('src/lib/data/properties.ts: Error getting properties:', error);
      throw new Error(`Failed to get properties: ${error.message}`);
    }
    
    // Log the result
    console.log(`src/lib/data/properties.ts: Got ${properties?.length || 0} properties out of ${count || 0} total`);
    
    return {
      properties: properties || [],
      totalCount: count || 0
    };
  } catch (error) {
    console.error('src/lib/data/properties.ts: Unhandled error getting properties:', error);
    throw new Error(`Failed to get properties: ${String(error)}`);
  }
}

/**
 * Get a single property by ID
 * 
 * @param id - Property ID
 * @returns Property or null if not found
 */
export async function getPropertyById(id: string): Promise<Database['public']['Tables']['properties']['Row'] | null> {
  // Create Supabase client
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
  const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
  
  // Log the function call
  console.log(`src/lib/data/properties.ts: Getting property with ID: ${id}`);
  
  try {
    // Execute the query
    const { data: property, error } = await supabase
      .from('properties')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        // PGRST116 means no rows returned (not found)
        console.log(`src/lib/data/properties.ts: Property with ID ${id} not found`);
        return null;
      }
      
      console.error(`src/lib/data/properties.ts: Error getting property with ID ${id}:`, error);
      throw new Error(`Failed to get property: ${error.message}`);
    }
    
    // Log the result
    console.log(`src/lib/data/properties.ts: Got property with ID ${id}`);
    
    return property;
  } catch (error) {
    console.error(`src/lib/data/properties.ts: Unhandled error getting property with ID ${id}:`, error);
    throw new Error(`Failed to get property: ${String(error)}`);
  }
}

/**
 * Get property types from Supabase
 * 
 * @returns Array of unique property types
 */
export async function getPropertyTypes(): Promise<string[]> {
  // Create Supabase client
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
  const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
  
  // Log the function call
  console.log('src/lib/data/properties.ts: Getting property types');
  
  try {
    // Execute the query
    const { data, error } = await supabase
      .from('properties')
      .select('property_type')
      .not('property_type', 'is', null);
    
    if (error) {
      console.error('src/lib/data/properties.ts: Error getting property types:', error);
      throw new Error(`Failed to get property types: ${error.message}`);
    }
    
    // Extract unique property types
    const propertyTypes = [...new Set(data.map(item => item.property_type as string))];
    
    // Log the result
    console.log(`src/lib/data/properties.ts: Got ${propertyTypes.length} property types`);
    
    return propertyTypes;
  } catch (error) {
    console.error('src/lib/data/properties.ts: Unhandled error getting property types:', error);
    throw new Error(`Failed to get property types: ${String(error)}`);
  }
}

/**
 * Get locations from Supabase
 * 
 * @returns Array of unique locations
 */
export async function getLocations(): Promise<string[]> {
  // Create Supabase client
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
  const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
  
  // Log the function call
  console.log('src/lib/data/properties.ts: Getting locations');
  
  try {
    // Execute the query
    const { data, error } = await supabase
      .from('properties')
      .select('location')
      .not('location', 'is', null);
    
    if (error) {
      console.error('src/lib/data/properties.ts: Error getting locations:', error);
      throw new Error(`Failed to get locations: ${error.message}`);
    }
    
    // Extract unique locations
    const locations = [...new Set(data.map(item => item.location as string))];
    
    // Log the result
    console.log(`src/lib/data/properties.ts: Got ${locations.length} locations`);
    
    return locations;
  } catch (error) {
    console.error('src/lib/data/properties.ts: Unhandled error getting locations:', error);
    throw new Error(`Failed to get locations: ${String(error)}`);
  }
}
