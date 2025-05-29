/**
 * src/lib/sync/sync-service.ts
 *
 * Main synchronization service for REI API CCA data
 *
 * This module provides the core functionality for synchronizing data
 * between the REI API CCA and the local Supabase database.
 */

import { createServerComponentClient } from "../supabase/server";
import { Database } from "../types/supabase";
import { SupabaseClient } from "@supabase/supabase-js";

// This type is used internally for type checking but isn't part of the generated types
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type SyncMetadataType = {
  id: string;
  entity_type: string;
  brand: string;
  last_sync_time: string;
  created_at: string;
  updated_at: string;
};
import {
  createReiApiCcaClient,
  ApiCredentials,
  BrandType,
} from "../api/rei-api-cca";
import { SyncOptions, SyncResult, SyncLog, SyncLogEntry } from "./types";
import { syncProperties } from "./property-sync";
import { syncAgents } from "./agent-sync";

// Default API credentials for each brand
const API_CREDENTIALS: Record<BrandType, ApiCredentials> = {
  AZURA: {
    apiUrl: process.env.AZURA_API_URL || "https://remax-cca.com/api/v1",
    apiKey: process.env.AZURA_API_KEY || "3CD7819D-FD26-4DD6-ACAF-04D36E6365F5",
    integratorId: process.env.AZURA_INTEGRATOR_ID || "R1040029",
    secretKey:
      process.env.AZURA_SECRET_KEY || "27097A65-9E97-460F-B6DA-8BBB548A893E",
  },
  BLUE_OCEAN: {
    apiUrl: process.env.BLUE_OCEAN_API_URL || "https://remax-cca.com/api/v1",
    apiKey:
      process.env.BLUE_OCEAN_API_KEY || "07D693F7-12DC-4E7D-B652-E5CD38B591B4",
    integratorId: process.env.BLUE_OCEAN_INTEGRATOR_ID || "R1040028",
    secretKey:
      process.env.BLUE_OCEAN_SECRET_KEY ||
      "050DC15F-C892-445A-A516-05459A07B2F1",
  },
};

/**
 * Default sync options
 */
const DEFAULT_SYNC_OPTIONS: Partial<SyncOptions> = {
  forceSync: false,
  batchSize: 50,
  verbose: false,
};

/**
 * Implementation of the SyncLog interface
 */
class SyncLogImpl implements SyncLog {
  entries: SyncLogEntry[] = [];

  addEntry(entry: SyncLogEntry): void {
    this.entries.push(entry);

    // Log to console if verbose logging is enabled
    if (process.env.SYNC_VERBOSE_LOGGING === "true") {
      console.log(
        `src/lib/sync/sync-service.ts: ${entry.timestamp.toISOString()} - ${entry.operation.toUpperCase()} ${
          entry.entityType
        } ${entry.entityId}${entry.details ? `: ${entry.details}` : ""}`
      );
    }
  }

  getEntries(): SyncLogEntry[] {
    return [...this.entries];
  }

  clear(): void {
    this.entries = [];
  }
}

/**
 * Create a new sync log
 * @returns A new SyncLog instance
 */
export function createSyncLog(): SyncLog {
  return new SyncLogImpl();
}

/**
 * Synchronize all data for a specific brand
 *
 * @param options - Synchronization options
 * @returns A promise that resolves to a SyncResult
 */
export async function syncAll(options: SyncOptions): Promise<SyncResult> {
  const startTime = new Date();
  const syncLog = createSyncLog();

  // Merge default options with provided options
  const syncOptions: SyncOptions = {
    ...DEFAULT_SYNC_OPTIONS,
    ...options,
  };

  console.log(
    `src/lib/sync/sync-service.ts: Starting full sync for ${
      syncOptions.brand
    } at ${startTime.toISOString()}`
  );

  try {
    // Get API credentials for the specified brand
    const credentials = API_CREDENTIALS[syncOptions.brand];
    if (!credentials) {
      throw new Error(`Invalid brand: ${syncOptions.brand}`);
    }

    // Create API client
    const apiClient = createReiApiCcaClient(credentials);

    // Create Supabase client
    const supabase: SupabaseClient<Database> = createServerComponentClient();

    // Sync properties
    console.log(
      `src/lib/sync/sync-service.ts: Syncing properties for ${syncOptions.brand}...`
    );
    const propertyResult = await syncProperties(
      apiClient,
      supabase,
      syncOptions,
      syncLog
    );

    // Sync agents
    console.log(
      `src/lib/sync/sync-service.ts: Syncing agents for ${syncOptions.brand}...`
    );
    const agentResult = await syncAgents(
      apiClient,
      supabase,
      syncOptions,
      syncLog
    );

    // Calculate combined results
    const endTime = new Date();
    const durationMs = endTime.getTime() - startTime.getTime();

    const result: SyncResult = {
      success: propertyResult.success && agentResult.success,
      added: propertyResult.added + agentResult.added,
      updated: propertyResult.updated + agentResult.updated,
      skipped: propertyResult.skipped + agentResult.skipped,
      failed: propertyResult.failed + agentResult.failed,
      startTime,
      endTime,
      durationMs,
    };

    // Log completion
    console.log(
      `src/lib/sync/sync-service.ts: Sync completed for ${syncOptions.brand} in ${durationMs}ms`
    );
    console.log(
      `src/lib/sync/sync-service.ts: Results: Added=${result.added}, Updated=${result.updated}, Skipped=${result.skipped}, Failed=${result.failed}`
    );

    return result;
  } catch (error) {
    const endTime = new Date();
    const durationMs = endTime.getTime() - startTime.getTime();

    console.error(
      `src/lib/sync/sync-service.ts: Sync failed for ${syncOptions.brand}:`,
      error
    );

    return {
      success: false,
      added: 0,
      updated: 0,
      skipped: 0,
      failed: 0,
      error: error instanceof Error ? error : new Error(String(error)),
      startTime,
      endTime,
      durationMs,
    };
  }
}

/**
 * Synchronize properties for a specific brand
 *
 * @param options - Synchronization options
 * @returns A promise that resolves to a SyncResult
 */
export async function syncPropertiesOnly(
  options: SyncOptions
): Promise<SyncResult> {
  const startTime = new Date();
  const syncLog = createSyncLog();

  // Merge default options with provided options
  const syncOptions: SyncOptions = {
    ...DEFAULT_SYNC_OPTIONS,
    ...options,
  };

  console.log(
    `src/lib/sync/sync-service.ts: Starting property sync for ${
      syncOptions.brand
    } at ${startTime.toISOString()}`
  );

  try {
    // Get API credentials for the specified brand
    const credentials = API_CREDENTIALS[syncOptions.brand];
    if (!credentials) {
      throw new Error(`Invalid brand: ${syncOptions.brand}`);
    }

    // Create API client
    const apiClient = createReiApiCcaClient(credentials);

    // Create Supabase client
    const supabase: SupabaseClient<Database> = createServerComponentClient();

    // Sync properties
    const result = await syncProperties(
      apiClient,
      supabase,
      syncOptions,
      syncLog
    );

    // Calculate final results
    const endTime = new Date();
    const durationMs = endTime.getTime() - startTime.getTime();

    const finalResult: SyncResult = {
      ...result,
      startTime,
      endTime,
      durationMs,
    };

    // Log completion
    console.log(
      `src/lib/sync/sync-service.ts: Property sync completed for ${syncOptions.brand} in ${durationMs}ms`
    );
    console.log(
      `src/lib/sync/sync-service.ts: Results: Added=${finalResult.added}, Updated=${finalResult.updated}, Skipped=${finalResult.skipped}, Failed=${finalResult.failed}`
    );

    return finalResult;
  } catch (error) {
    const endTime = new Date();
    const durationMs = endTime.getTime() - startTime.getTime();

    console.error(
      `src/lib/sync/sync-service.ts: Property sync failed for ${syncOptions.brand}:`,
      error
    );

    return {
      success: false,
      added: 0,
      updated: 0,
      skipped: 0,
      failed: 0,
      error: error instanceof Error ? error : new Error(String(error)),
      startTime,
      endTime,
      durationMs,
    };
  }
}

/**
 * Synchronize agents for a specific brand
 *
 * @param options - Synchronization options
 * @returns A promise that resolves to a SyncResult
 */
export async function syncAgentsOnly(
  options: SyncOptions
): Promise<SyncResult> {
  const startTime = new Date();
  const syncLog = createSyncLog();

  // Merge default options with provided options
  const syncOptions: SyncOptions = {
    ...DEFAULT_SYNC_OPTIONS,
    ...options,
  };

  console.log(
    `src/lib/sync/sync-service.ts: Starting agent sync for ${
      syncOptions.brand
    } at ${startTime.toISOString()}`
  );

  try {
    // Get API credentials for the specified brand
    const credentials = API_CREDENTIALS[syncOptions.brand];
    if (!credentials) {
      throw new Error(`Invalid brand: ${syncOptions.brand}`);
    }

    // Create API client
    const apiClient = createReiApiCcaClient(credentials);

    // Create Supabase client
    const supabase: SupabaseClient<Database> = createServerComponentClient();

    // Sync agents
    const result = await syncAgents(apiClient, supabase, syncOptions, syncLog);

    // Calculate final results
    const endTime = new Date();
    const durationMs = endTime.getTime() - startTime.getTime();

    const finalResult: SyncResult = {
      ...result,
      startTime,
      endTime,
      durationMs,
    };

    // Log completion
    console.log(
      `src/lib/sync/sync-service.ts: Agent sync completed for ${syncOptions.brand} in ${durationMs}ms`
    );
    console.log(
      `src/lib/sync/sync-service.ts: Results: Added=${finalResult.added}, Updated=${finalResult.updated}, Skipped=${finalResult.skipped}, Failed=${finalResult.failed}`
    );

    return finalResult;
  } catch (error) {
    const endTime = new Date();
    const durationMs = endTime.getTime() - startTime.getTime();

    console.error(
      `src/lib/sync/sync-service.ts: Agent sync failed for ${syncOptions.brand}:`,
      error
    );

    return {
      success: false,
      added: 0,
      updated: 0,
      skipped: 0,
      failed: 0,
      error: error instanceof Error ? error : new Error(String(error)),
      startTime,
      endTime,
      durationMs,
    };
  }
}

/**
 * Get the last sync time for a specific entity type and brand
 *
 * @param entityType - The type of entity (property or agent)
 * @param brand - The brand to get the last sync time for
 * @returns A promise that resolves to the last sync time or null if no sync has been performed
 */

export async function getLastSyncTime(
  entityType: "property" | "agent",
  brand: BrandType
): Promise<Date | null> {
  try {
    const supabase = createServerComponentClient();

    // Get the last sync time from the sync_metadata table
    // Using any type for the query since sync_metadata isn't in the generated types
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase as any)
      .from("sync_metadata")
      .select("last_sync_time")
      .eq("entity_type", entityType)
      .eq("brand", brand)
      .single();

    if (error) {
      console.error(
        `src/lib/sync/sync-service.ts: Error getting last sync time for ${entityType} (${brand}):`,
        error
      );
      return null;
    }

    return data?.last_sync_time ? new Date(data.last_sync_time) : null;
  } catch (error) {
    console.error(
      `src/lib/sync/sync-service.ts: Error getting last sync time for ${entityType} (${brand}):`,
      error
    );
    return null;
  }
}

/**
 * Update the last sync time for a specific entity type and brand
 *
 * @param entityType - The type of entity (property or agent)
 * @param brand - The brand to update the last sync time for
 * @param syncTime - The sync time to set (defaults to now)
 * @returns A promise that resolves to true if the update was successful, false otherwise
 */
export async function updateLastSyncTime(
  entityType: "property" | "agent",
  brand: BrandType,
  syncTime: Date = new Date()
): Promise<boolean> {
  try {
    const supabase = createServerComponentClient();

    // Update the last sync time in the sync_metadata table
    // Using any type for the query since sync_metadata isn't in the generated types
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any).from("sync_metadata").upsert(
      {
        entity_type: entityType,
        brand,
        last_sync_time: syncTime.toISOString(),
      },
      {
        onConflict: "entity_type,brand",
      }
    );

    if (error) {
      console.error(
        `src/lib/sync/sync-service.ts: Error updating last sync time for ${entityType} (${brand}):`,
        error
      );
      return false;
    }

    return true;
  } catch (error) {
    console.error(
      `src/lib/sync/sync-service.ts: Error updating last sync time for ${entityType} (${brand}):`,
      error
    );
    return false;
  }
}
