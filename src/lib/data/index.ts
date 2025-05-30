/**
 * src/lib/data/index.ts
 * 
 * Data access layer entry point
 * Exports all data access functions for properties and agents
 */

// Export property data access functions
export {
  getProperties,
  getPropertyById,
  getPropertyTypes,
  getLocations,
  type PropertyFilterOptions,
  type PropertyPaginationOptions
} from './properties';

// Export agent data access functions
export {
  getAgents,
  getAgentById,
  getAgentSpecialties,
  getAgentLanguages,
  type AgentFilterOptions,
  type AgentPaginationOptions
} from './agents';

// Export Supabase client utilities
export {
  getSupabaseClient,
  handleSupabaseError
} from './supabase-client';
