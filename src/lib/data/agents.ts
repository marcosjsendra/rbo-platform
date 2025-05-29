/**
 * src/lib/data/agents.ts
 * 
 * Data access layer for agents
 * Provides functions for retrieving and filtering agents from Supabase
 */

import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';

// Define agent filter options interface
export interface AgentFilterOptions {
  brand?: 'AZURA' | 'BLUE_OCEAN';
  specialty?: string;
  language?: string;
  searchTerm?: string;
}

// Define agent pagination options interface
export interface AgentPaginationOptions {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
}

/**
 * Get agents from Supabase with filtering and pagination
 * 
 * @param filterOptions - Options for filtering agents
 * @param paginationOptions - Options for paginating results
 * @returns Agents and total count
 */
export async function getAgents(
  filterOptions: AgentFilterOptions = {},
  paginationOptions: AgentPaginationOptions = {}
): Promise<{ agents: Database['public']['Tables']['agents']['Row'][]; totalCount: number }> {
  // Create Supabase client
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
  const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
  
  // Log the function call
  console.log('src/lib/data/agents.ts: Getting agents with filters:', filterOptions, 'and pagination:', paginationOptions);
  
  try {
    // Set default pagination values
    const page = paginationOptions.page || 1;
    const pageSize = paginationOptions.pageSize || 10;
    const sortBy = paginationOptions.sortBy || 'last_name';
    const sortDirection = paginationOptions.sortDirection || 'asc';
    
    // Calculate offset
    const offset = (page - 1) * pageSize;
    
    // Start building the query
    let query = supabase
      .from('agents')
      .select('*', { count: 'exact' });
    
    // Apply filters
    if (filterOptions.brand) {
      query = query.eq('brand', filterOptions.brand);
    }
    
    if (filterOptions.specialty) {
      // Assuming specialties is stored as a JSON array or with JSONB containment operators
      query = query.contains('specialties', [filterOptions.specialty]);
    }
    
    if (filterOptions.language) {
      // Assuming languages is stored as a JSON array or with JSONB containment operators
      query = query.contains('languages', [filterOptions.language]);
    }
    
    if (filterOptions.searchTerm) {
      query = query.or(`first_name.ilike.%${filterOptions.searchTerm}%,last_name.ilike.%${filterOptions.searchTerm}%,bio.ilike.%${filterOptions.searchTerm}%`);
    }
    
    // Apply pagination and sorting
    query = query
      .order(sortBy, { ascending: sortDirection === 'asc' })
      .range(offset, offset + pageSize - 1);
    
    // Execute the query
    const { data: agents, error, count } = await query;
    
    if (error) {
      console.error('src/lib/data/agents.ts: Error getting agents:', error);
      throw new Error(`Failed to get agents: ${error.message}`);
    }
    
    // Log the result
    console.log(`src/lib/data/agents.ts: Got ${agents?.length || 0} agents out of ${count || 0} total`);
    
    return {
      agents: agents || [],
      totalCount: count || 0
    };
  } catch (error) {
    console.error('src/lib/data/agents.ts: Unhandled error getting agents:', error);
    throw new Error(`Failed to get agents: ${String(error)}`);
  }
}

/**
 * Get a single agent by ID
 * 
 * @param id - Agent ID
 * @returns Agent or null if not found
 */
export async function getAgentById(id: string): Promise<Database['public']['Tables']['agents']['Row'] | null> {
  // Create Supabase client
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
  const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
  
  // Log the function call
  console.log(`src/lib/data/agents.ts: Getting agent with ID: ${id}`);
  
  try {
    // Execute the query
    const { data: agent, error } = await supabase
      .from('agents')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        // PGRST116 means no rows returned (not found)
        console.log(`src/lib/data/agents.ts: Agent with ID ${id} not found`);
        return null;
      }
      
      console.error(`src/lib/data/agents.ts: Error getting agent with ID ${id}:`, error);
      throw new Error(`Failed to get agent: ${error.message}`);
    }
    
    // Log the result
    console.log(`src/lib/data/agents.ts: Got agent with ID ${id}`);
    
    return agent;
  } catch (error) {
    console.error(`src/lib/data/agents.ts: Unhandled error getting agent with ID ${id}:`, error);
    throw new Error(`Failed to get agent: ${String(error)}`);
  }
}

/**
 * Get agent specialties from Supabase
 * 
 * @returns Array of unique specialties
 */
export async function getAgentSpecialties(): Promise<string[]> {
  // Create Supabase client
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
  const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
  
  // Log the function call
  console.log('src/lib/data/agents.ts: Getting agent specialties');
  
  try {
    // Execute the query
    const { data, error } = await supabase
      .from('agents')
      .select('specialties')
      .not('specialties', 'is', null);
    
    if (error) {
      console.error('src/lib/data/agents.ts: Error getting agent specialties:', error);
      throw new Error(`Failed to get agent specialties: ${error.message}`);
    }
    
    // Extract unique specialties from all agents' specialty arrays
    const allSpecialties = data.flatMap(agent => agent.specialties || []);
    const uniqueSpecialties = [...new Set(allSpecialties)];
    
    // Log the result
    console.log(`src/lib/data/agents.ts: Got ${uniqueSpecialties.length} agent specialties`);
    
    return uniqueSpecialties;
  } catch (error) {
    console.error('src/lib/data/agents.ts: Unhandled error getting agent specialties:', error);
    throw new Error(`Failed to get agent specialties: ${String(error)}`);
  }
}

/**
 * Get agent languages from Supabase
 * 
 * @returns Array of unique languages
 */
export async function getAgentLanguages(): Promise<string[]> {
  // Create Supabase client
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
  const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
  
  // Log the function call
  console.log('src/lib/data/agents.ts: Getting agent languages');
  
  try {
    // Execute the query
    const { data, error } = await supabase
      .from('agents')
      .select('languages')
      .not('languages', 'is', null);
    
    if (error) {
      console.error('src/lib/data/agents.ts: Error getting agent languages:', error);
      throw new Error(`Failed to get agent languages: ${error.message}`);
    }
    
    // Extract unique languages from all agents' language arrays
    const allLanguages = data.flatMap(agent => agent.languages || []);
    const uniqueLanguages = [...new Set(allLanguages)];
    
    // Log the result
    console.log(`src/lib/data/agents.ts: Got ${uniqueLanguages.length} agent languages`);
    
    return uniqueLanguages;
  } catch (error) {
    console.error('src/lib/data/agents.ts: Unhandled error getting agent languages:', error);
    throw new Error(`Failed to get agent languages: ${String(error)}`);
  }
}
