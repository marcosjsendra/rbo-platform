/**
 * src/lib/sync/types.ts
 * 
 * Type definitions for the data synchronization service
 */

import { Database } from '../types/supabase';
import { BrandType } from '../api/rei-api-cca';

/**
 * Synchronization options
 */
export interface SyncOptions {
  /** The brand to synchronize data for (AZURA or BLUE_OCEAN) */
  brand: BrandType;
  /** Whether to force a full sync even if data is up to date */
  forceSync?: boolean;
  /** Maximum number of items to sync in a single batch */
  batchSize?: number;
  /** Whether to log detailed information during sync */
  verbose?: boolean;
}

/**
 * Synchronization result
 */
export interface SyncResult {
  /** Whether the sync was successful */
  success: boolean;
  /** Number of items added */
  added: number;
  /** Number of items updated */
  updated: number;
  /** Number of items skipped (already up to date) */
  skipped: number;
  /** Number of items that failed to sync */
  failed: number;
  /** Any error that occurred during sync */
  error?: Error;
  /** Timestamp when the sync started */
  startTime: Date;
  /** Timestamp when the sync completed */
  endTime: Date;
  /** Duration of the sync in milliseconds */
  durationMs: number;
}

/**
 * Property data from the REI API CCA
 * This represents the structure of property data as returned by the API
 */
export interface ReiApiProperty {
  ListingID: string;
  ListingTitle: string;
  ListingDescription?: string;
  ListingPrice?: number;
  ListingCurrency?: string;
  PropertyType?: string;
  Status?: string;
  Bedrooms?: number;
  Bathrooms?: number;
  LivingArea?: number;
  LivingAreaUnits?: string;
  Location?: string;
  Address?: string;
  City?: string;
  StateProvince?: string;
  Country?: string;
  PostalCode?: string;
  Latitude?: number;
  Longitude?: number;
  Features?: Record<string, unknown>;
  Images?: string[];
  AssociateID?: string;
  [key: string]: unknown;
}

/**
 * Agent data from the REI API CCA
 * This represents the structure of agent data as returned by the API
 */
export interface ReiApiAgent {
  AssociateID: string;
  FirstName: string;
  LastName: string;
  Email?: string;
  Phone?: string;
  Biography?: string;
  ImageURL?: string;
  Title?: string;
  Specialties?: string[];
  Languages?: string[];
  SocialMedia?: Record<string, unknown>;
  [key: string]: unknown;
}

/**
 * Property data for Supabase
 * This represents the structure of property data as stored in Supabase
 */
export type SupabaseProperty = Database['public']['Tables']['properties']['Insert'];

/**
 * Agent data for Supabase
 * This represents the structure of agent data as stored in Supabase
 */
export type SupabaseAgent = Database['public']['Tables']['agents']['Insert'];

/**
 * Sync log entry
 */
export interface SyncLogEntry {
  timestamp: Date;
  operation: 'add' | 'update' | 'skip' | 'fail';
  entityType: 'property' | 'agent';
  entityId: string;
  details?: string;
}

/**
 * Sync log
 */
export interface SyncLog {
  entries: SyncLogEntry[];
  addEntry(entry: SyncLogEntry): void;
  getEntries(): SyncLogEntry[];
  clear(): void;
}