/**
 * src/lib/sync/sync-service-fallback.ts
 *
 * Fallback synchronization service for REI API CCA data
 *
 * This module provides a simplified version of the sync service that doesn't
 * require the sync_metadata table to work. It's intended as a temporary solution
 * until the database issues are resolved.
 */

import { createUniversalClient } from "../supabase/universal";
import { Database } from "../types/supabase";
import { SupabaseClient } from "@supabase/supabase-js";
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
        `src/lib/sync/sync-service-fallback.ts: ${entry.timestamp.toISOString()} - ${entry.operation.toUpperCase()} ${
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
 * Synchronize all data for a specific brand without using sync_metadata
 *
 * @param options - Synchronization options
 * @returns A promise that resolves to a SyncResult
 */
export async function syncAllWithoutMetadata(options: SyncOptions): Promise<SyncResult> {
  const startTime = new Date();
  const syncLog = createSyncLog();

  // Merge default options with provided options
  const syncOptions: SyncOptions = {
    ...DEFAULT_SYNC_OPTIONS,
    ...options,
  };

  console.log(
    `src/lib/sync/sync-service-fallback.ts: Starting full sync for ${
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
    const supabase: SupabaseClient<Database> = createUniversalClient();

    // Sync properties
    console.log(
      `src/lib/sync/sync-service-fallback.ts: Syncing properties for ${syncOptions.brand}...`
    );
    
    // Always perform a full sync since we're not tracking sync times
    const modifiedOptions = { ...syncOptions, forceSync: true };
    
    const propertyResult = await syncProperties(
      apiClient,
      supabase,
      modifiedOptions,
      syncLog
    );

    // Sync agents
    console.log(
      `src/lib/sync/sync-service-fallback.ts: Syncing agents for ${syncOptions.brand}...`
    );
    const agentResult = await syncAgents(
      apiClient,
      supabase,
      modifiedOptions,
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
      `src/lib/sync/sync-service-fallback.ts: Sync completed for ${syncOptions.brand} in ${durationMs}ms`
    );
    console.log(
      `src/lib/sync/sync-service-fallback.ts: Results: Added=${result.added}, Updated=${result.updated}, Skipped=${result.skipped}, Failed=${result.failed}`
    );

    return result;
  } catch (error) {
    const endTime = new Date();
    const durationMs = endTime.getTime() - startTime.getTime();

    console.error(
      `src/lib/sync/sync-service-fallback.ts: Sync failed for ${syncOptions.brand}:`,
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
 * Synchronize properties for a specific brand without using sync_metadata
 *
 * @param options - Synchronization options
 * @returns A promise that resolves to a SyncResult
 */
export async function syncPropertiesOnlyWithoutMetadata(
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
    `src/lib/sync/sync-service-fallback.ts: Starting property sync for ${
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
    const supabase: SupabaseClient<Database> = createUniversalClient();

    // Always perform a full sync since we're not tracking sync times
    const modifiedOptions = { ...syncOptions, forceSync: true };
    
    // Sync properties
    const result = await syncProperties(
      apiClient,
      supabase,
      modifiedOptions,
      syncLog
    );

    // Calculate results
    const endTime = new Date();
    const durationMs = endTime.getTime() - startTime.getTime();

    // Add timing information to result
    result.startTime = startTime;
    result.endTime = endTime;
    result.durationMs = durationMs;

    // Log completion
    console.log(
      `src/lib/sync/sync-service-fallback.ts: Property sync completed for ${syncOptions.brand} in ${durationMs}ms`
    );
    console.log(
      `src/lib/sync/sync-service-fallback.ts: Results: Added=${result.added}, Updated=${result.updated}, Skipped=${result.skipped}, Failed=${result.failed}`
    );

    return result;
  } catch (error) {
    const endTime = new Date();
    const durationMs = endTime.getTime() - startTime.getTime();

    console.error(
      `src/lib/sync/sync-service-fallback.ts: Property sync failed for ${syncOptions.brand}:`,
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
 * Synchronize agents for a specific brand without using sync_metadata
 *
 * @param options - Synchronization options
 * @returns A promise that resolves to a SyncResult
 */
export async function syncAgentsOnlyWithoutMetadata(
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
    `src/lib/sync/sync-service-fallback.ts: Starting agent sync for ${
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
    const supabase: SupabaseClient<Database> = createUniversalClient();

    // Always perform a full sync since we're not tracking sync times
    const modifiedOptions = { ...syncOptions, forceSync: true };
    
    // Sync agents
    const result = await syncAgents(
      apiClient,
      supabase,
      modifiedOptions,
      syncLog
    );

    // Calculate results
    const endTime = new Date();
    const durationMs = endTime.getTime() - startTime.getTime();

    // Add timing information to result
    result.startTime = startTime;
    result.endTime = endTime;
    result.durationMs = durationMs;

    // Log completion
    console.log(
      `src/lib/sync/sync-service-fallback.ts: Agent sync completed for ${syncOptions.brand} in ${durationMs}ms`
    );
    console.log(
      `src/lib/sync/sync-service-fallback.ts: Results: Added=${result.added}, Updated=${result.updated}, Skipped=${result.skipped}, Failed=${result.failed}`
    );

    return result;
  } catch (error) {
    const endTime = new Date();
    const durationMs = endTime.getTime() - startTime.getTime();

    console.error(
      `src/lib/sync/sync-service-fallback.ts: Agent sync failed for ${syncOptions.brand}:`,
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
