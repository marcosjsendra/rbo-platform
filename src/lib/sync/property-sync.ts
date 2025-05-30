/**
 * src/lib/sync/property-sync.ts
 * 
 * Property synchronization module
 * 
 * This module provides functionality for synchronizing property data
 * between the REI API CCA and the local Supabase database.
 */

import { SupabaseClient } from '@supabase/supabase-js';
import { Database, Json } from '../types/supabase';
import { ReiApiCcaClient } from '../api/rei-api-cca';
import { SyncOptions, SyncResult, SyncLog, ReiApiProperty, SupabaseProperty } from './types';

// Extended type to include brand field which is added in the migration but not yet in the generated types
type ExtendedSupabaseProperty = SupabaseProperty & { brand: string };
import { getLastSyncTime, updateLastSyncTime } from './sync-service';

/**
 * Synchronize properties from the REI API CCA to Supabase
 * 
 * @param apiClient - The REI API CCA client
 * @param supabase - The Supabase client
 * @param options - Synchronization options
 * @param syncLog - The sync log to record operations
 * @returns A promise that resolves to a SyncResult
 */
export async function syncProperties(
  apiClient: ReiApiCcaClient,
  supabase: SupabaseClient<Database>,
  options: SyncOptions,
  syncLog: SyncLog
): Promise<SyncResult> {
  const result: SyncResult = {
    success: true,
    added: 0,
    updated: 0,
    skipped: 0,
    failed: 0,
    startTime: new Date(),
    endTime: new Date(),
    durationMs: 0,
  };
  
  try {
    console.log(`src/lib/sync/property-sync.ts: Starting property synchronization for ${options.brand}`);
    
    // Get the last sync time if we're not forcing a full sync
    let lastSyncTime: Date | null = null;
    if (!options.forceSync) {
      lastSyncTime = await getLastSyncTime('property', options.brand);
      if (lastSyncTime) {
        console.log(`src/lib/sync/property-sync.ts: Last sync time: ${lastSyncTime.toISOString()}`);
      } else {
        console.log(`src/lib/sync/property-sync.ts: No previous sync found, performing full sync`);
      }
    } else {
      console.log(`src/lib/sync/property-sync.ts: Force sync enabled, ignoring last sync time`);
    }
    
    // Determine batch size
    const batchSize = options.batchSize || 50;
    console.log(`src/lib/sync/property-sync.ts: Using batch size: ${batchSize}`);
    
    // Initialize counters
    let skip = 0;
    let hasMoreProperties = true;
    
    // Process properties in batches
    while (hasMoreProperties) {
      console.log(`[PropertySync] Fetching properties batch: skip=${skip}, take=${batchSize}`);
      
      // Fetch a batch of properties from the API
      const propertiesResponse = await apiClient.getProperties(batchSize, skip);
      
      // Log the raw response for debugging
      console.log(`[PropertySync] Raw API response:`, JSON.stringify(propertiesResponse, null, 2));
      
      // Check if we have properties in the response
      if (!propertiesResponse || 
          !propertiesResponse.Properties || 
          !Array.isArray(propertiesResponse.Properties) || 
          propertiesResponse.Properties.length === 0) {
        console.log(`[PropertySync] No more properties to process`);
        console.log(`[PropertySync] Response structure:`, Object.keys(propertiesResponse || {}));
        hasMoreProperties = false;
        break;
      }
      
      const properties = propertiesResponse.Properties as ReiApiProperty[];
      console.log(`[PropertySync] Retrieved ${properties.length} properties`);
      
      // Process each property in the batch
      for (const property of properties) {
        try {
          // Convert the API property to a Supabase property
          const supabaseProperty = convertToSupabaseProperty(property, options.brand);
          
          // Check if the property already exists in the database
          const { data: existingProperty, error: lookupError } = await supabase
            .from('properties')
            .select('id, updated_at')
            .eq('listing_id', property.ListingID)
            .single();
          
          if (lookupError && lookupError.code !== 'PGRST116') { // PGRST116 is "no rows returned"
            console.error(`[PropertySync] Error looking up property ${property.ListingID}:`, lookupError);
            result.failed++;
            syncLog.addEntry({
              timestamp: new Date(),
              operation: 'fail',
              entityType: 'property',
              entityId: property.ListingID,
              details: `Error looking up property: ${lookupError.message}`
            });
            continue;
          }
          
          if (existingProperty) {
            // Property exists, check if it needs to be updated
            const existingUpdatedAt = new Date(existingProperty.updated_at);
            
            // If we have a last sync time and the property hasn't been updated since then,
            // and we're not forcing a full sync, skip it
            if (lastSyncTime && existingUpdatedAt > lastSyncTime && !options.forceSync) {
              result.skipped++;
              syncLog.addEntry({
                timestamp: new Date(),
                operation: 'skip',
                entityType: 'property',
                entityId: property.ListingID,
                details: 'Property already up to date'
              });
              continue;
            }
            
            // Update the existing property
            const { error: updateError } = await supabase
              .from('properties')
              .update(supabaseProperty)
              .eq('id', existingProperty.id);
            
            if (updateError) {
              console.error(`[PropertySync] Error updating property ${property.ListingID}:`, updateError);
              result.failed++;
              syncLog.addEntry({
                timestamp: new Date(),
                operation: 'fail',
                entityType: 'property',
                entityId: property.ListingID,
                details: `Error updating property: ${updateError.message}`
              });
            } else {
              result.updated++;
              syncLog.addEntry({
                timestamp: new Date(),
                operation: 'update',
                entityType: 'property',
                entityId: property.ListingID
              });
            }
          } else {
            // Property doesn't exist, insert it
            const { error: insertError } = await supabase
              .from('properties')
              .insert(supabaseProperty);
            
            if (insertError) {
              console.error(`[PropertySync] Error inserting property ${property.ListingID}:`, insertError);
              result.failed++;
              syncLog.addEntry({
                timestamp: new Date(),
                operation: 'fail',
                entityType: 'property',
                entityId: property.ListingID,
                details: `Error inserting property: ${insertError.message}`
              });
            } else {
              result.added++;
              syncLog.addEntry({
                timestamp: new Date(),
                operation: 'add',
                entityType: 'property',
                entityId: property.ListingID
              });
            }
          }
        } catch (error) {
          console.error(`[PropertySync] Error processing property ${property.ListingID}:`, error);
          result.failed++;
          syncLog.addEntry({
            timestamp: new Date(),
            operation: 'fail',
            entityType: 'property',
            entityId: property.ListingID,
            details: `Error processing property: ${error instanceof Error ? error.message : String(error)}`
          });
        }
      }
      
      // Update skip for the next batch
      skip += properties.length;
      
      // Check if we've reached the end of the properties
      if (properties.length < batchSize) {
        hasMoreProperties = false;
      }
    }
    
    // Update the last sync time
    const syncTime = new Date();
    await updateLastSyncTime('property', options.brand, syncTime);
    
    // Calculate duration
    result.endTime = new Date();
    result.durationMs = result.endTime.getTime() - result.startTime.getTime();
    
    console.log(`[PropertySync] Property synchronization completed in ${result.durationMs}ms`);
    console.log(`[PropertySync] Added: ${result.added}, Updated: ${result.updated}, Skipped: ${result.skipped}, Failed: ${result.failed}`);
    
    return result;
  } catch (error) {
    console.error(`[PropertySync] Error synchronizing properties:`, error);
    
    result.success = false;
    result.error = error instanceof Error ? error : new Error(String(error));
    result.endTime = new Date();
    result.durationMs = result.endTime.getTime() - result.startTime.getTime();
    
    return result;
  }
}

/**
 * Convert a property from the REI API CCA format to the Supabase format
 * 
 * @param property - The property data from the REI API CCA
 * @param brand - The brand the property belongs to
 * @returns The property data in Supabase format
 */
function convertToSupabaseProperty(property: ReiApiProperty, brand: string): ExtendedSupabaseProperty {
  // Extract the zone ID based on location or coordinates
  // This is a placeholder implementation - you'll need to implement
  // proper zone matching based on your specific requirements
  const zoneId = determineZoneId(property);
  
  return {
    listing_id: property.ListingID,
    title: property.ListingTitle,
    description: property.ListingDescription || null,
    price: property.ListingPrice || null,
    currency: property.ListingCurrency || null,
    property_type: property.PropertyType || null,
    status: property.Status || null,
    bedrooms: property.Bedrooms || null,
    bathrooms: property.Bathrooms || null,
    size: property.LivingArea || null,
    size_unit: property.LivingAreaUnits || null,
    location: property.Location || null,
    address: property.Address || null,
    city: property.City || null,
    state: property.StateProvince || null,
    country: property.Country || null,
    postal_code: property.PostalCode || null,
    latitude: property.Latitude || null,
    longitude: property.Longitude || null,
    features: property.Features as unknown as Json || null,
    images: property.Images || null,
    agent_id: property.AssociateID || null,
    zone_id: zoneId,
    raw_data: property as unknown as Json,
    brand
  };
}

/**
 * Determine the zone ID for a property based on its location or coordinates
 * 
 * @param property - The property data from the REI API CCA
 * @returns The zone ID or null if no matching zone is found
 */
function determineZoneId(property: ReiApiProperty): string | null {
  // This is a placeholder implementation
  // In a real implementation, you would:
  // 1. Check if the property's location matches one of the known zones
  // 2. If not, check if the property's coordinates fall within a zone's boundaries
  // 3. Return the matching zone ID or null if no match is found
  
  // Example implementation (very simplified):
  const location = property.Location?.toLowerCase() || '';
  
  if (location.includes('nosara')) {
    return 'nosara';
  } else if (location.includes('punta islita')) {
    return 'punta-islita';
  } else if (location.includes('samara')) {
    return 'samara';
  } else if (location.includes('playa marbella')) {
    return 'playa-marbella';
  } else if (location.includes('puerto carrillo')) {
    return 'puerto-carrillo';
  } else if (location.includes('playa ostional')) {
    return 'playa-ostional';
  }
  
  // If no match is found, return null
  return null;
}