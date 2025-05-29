/**
 * src/lib/sync/index.ts
 * 
 * Data Synchronization Service
 * 
 * This module exports the main synchronization service and related utilities
 * for keeping the local Supabase database in sync with the REI API CCA data.
 */

// Temporarily export the fallback sync service instead of the server-only sync service
// This allows the sync test page to work without the 'server-only' import error
export * from './sync-service-fallback';
export * from './property-sync';
export * from './agent-sync';
export * from './types';