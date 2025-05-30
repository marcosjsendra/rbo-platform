/**
 * src/lib/sync/agent-sync.ts
 * 
 * Agent synchronization module
 * 
 * This module provides functionality for synchronizing agent data
 * between the REI API CCA and the local Supabase database.
 */

import { SupabaseClient } from '@supabase/supabase-js';
import { Database, Json } from '../types/supabase';
import { ReiApiCcaClient } from '../api/rei-api-cca';
import { SyncOptions, SyncResult, SyncLog, ReiApiAgent, SupabaseAgent } from './types';

// Extended type to include brand field which is added in the migration but not yet in the generated types
type ExtendedSupabaseAgent = SupabaseAgent & { brand: string };
import { getLastSyncTime, updateLastSyncTime } from './sync-service';

/**
 * Synchronize agents from the REI API CCA to Supabase
 * 
 * @param apiClient - The REI API CCA client
 * @param supabase - The Supabase client
 * @param options - Synchronization options
 * @param syncLog - The sync log to record operations
 * @returns A promise that resolves to a SyncResult
 */
export async function syncAgents(
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
    console.log(`src/lib/sync/agent-sync.ts: Starting agent synchronization for ${options.brand}`)
    
    // Get the last sync time if we're not forcing a full sync
    let lastSyncTime: Date | null = null;
    if (!options.forceSync) {
      lastSyncTime = await getLastSyncTime('agent', options.brand);
      if (lastSyncTime) {
        console.log(`src/lib/sync/agent-sync.ts: Last sync time: ${lastSyncTime.toISOString()}`)
      } else {
        console.log(`src/lib/sync/agent-sync.ts: No previous sync found, performing full sync`)
      }
    } else {
      console.log(`src/lib/sync/agent-sync.ts: Force sync enabled, ignoring last sync time`)
    }
    
    // Determine batch size
    const batchSize = options.batchSize || 50;
    console.log(`src/lib/sync/agent-sync.ts: Using batch size: ${batchSize}`)
    
    // Initialize counters
    let skip = 0;
    let hasMoreAgents = true;
    
    // Process agents in batches
    while (hasMoreAgents) {
      console.log(`src/lib/sync/agent-sync.ts: Fetching agents batch: skip=${skip}, take=${batchSize}`)
      
      // Fetch a batch of agents from the API
      const associatesResponse = await apiClient.getAssociates(batchSize, skip);
      
      // Check if we have agents in the response
      if (!associatesResponse || 
          !associatesResponse.Associates || 
          !Array.isArray(associatesResponse.Associates) || 
          associatesResponse.Associates.length === 0) {
        console.log(`src/lib/sync/agent-sync.ts: No more agents to process`)
        hasMoreAgents = false;
        break;
      }
      
      const agents = associatesResponse.Associates as ReiApiAgent[];
      console.log(`src/lib/sync/agent-sync.ts: Retrieved ${agents.length} agents`)
      
      // Process each agent in the batch
      for (const agent of agents) {
        try {
          // Convert the API agent to a Supabase agent
          const supabaseAgent = convertToSupabaseAgent(agent, options.brand);
          
          // Check if the agent already exists in the database
          const { data: existingAgent, error: lookupError } = await supabase
            .from('agents')
            .select('id, updated_at')
            .eq('agent_id', agent.AssociateID)
            .single();
          
          if (lookupError && lookupError.code !== 'PGRST116') { // PGRST116 is "no rows returned"
            console.error(`src/lib/sync/agent-sync.ts: Error looking up agent ${agent.AssociateID}:`, lookupError)
            result.failed++;
            syncLog.addEntry({
              timestamp: new Date(),
              operation: 'fail',
              entityType: 'agent',
              entityId: agent.AssociateID,
              details: `Error looking up agent: ${lookupError.message}`
            });
            continue;
          }
          
          if (existingAgent) {
            // Agent exists, check if it needs to be updated
            const existingUpdatedAt = new Date(existingAgent.updated_at);
            
            // If we have a last sync time and the agent hasn't been updated since then,
            // and we're not forcing a full sync, skip it
            if (lastSyncTime && existingUpdatedAt > lastSyncTime && !options.forceSync) {
              result.skipped++;
              syncLog.addEntry({
                timestamp: new Date(),
                operation: 'skip',
                entityType: 'agent',
                entityId: agent.AssociateID,
                details: 'Agent already up to date'
              });
              continue;
            }
            
            // Update the existing agent
            const { error: updateError } = await supabase
              .from('agents')
              .update(supabaseAgent)
              .eq('id', existingAgent.id);
            
            if (updateError) {
              console.error(`src/lib/sync/agent-sync.ts: Error updating agent ${agent.AssociateID}:`, updateError)
              result.failed++;
              syncLog.addEntry({
                timestamp: new Date(),
                operation: 'fail',
                entityType: 'agent',
                entityId: agent.AssociateID,
                details: `Error updating agent: ${updateError.message}`
              });
            } else {
              result.updated++;
              syncLog.addEntry({
                timestamp: new Date(),
                operation: 'update',
                entityType: 'agent',
                entityId: agent.AssociateID
              });
            }
          } else {
            // Agent doesn't exist, insert it
            const { error: insertError } = await supabase
              .from('agents')
              .insert(supabaseAgent);
            
            if (insertError) {
              console.error(`src/lib/sync/agent-sync.ts: Error inserting agent ${agent.AssociateID}:`, insertError)
              result.failed++;
              syncLog.addEntry({
                timestamp: new Date(),
                operation: 'fail',
                entityType: 'agent',
                entityId: agent.AssociateID,
                details: `Error inserting agent: ${insertError.message}`
              });
            } else {
              result.added++;
              syncLog.addEntry({
                timestamp: new Date(),
                operation: 'add',
                entityType: 'agent',
                entityId: agent.AssociateID
              });
            }
          }
        } catch (error) {
          console.error(`src/lib/sync/agent-sync.ts: Error processing agent ${agent.AssociateID}:`, error)
          result.failed++;
          syncLog.addEntry({
            timestamp: new Date(),
            operation: 'fail',
            entityType: 'agent',
            entityId: agent.AssociateID,
            details: `Error processing agent: ${error instanceof Error ? error.message : String(error)}`
          });
        }
      }
      
      // Update skip for the next batch
      skip += agents.length;
      
      // Check if we've reached the end of the agents
      if (agents.length < batchSize) {
        hasMoreAgents = false;
      }
    }
    
    // Update the last sync time
    const syncTime = new Date();
    await updateLastSyncTime('agent', options.brand, syncTime);
    
    // Calculate duration
    result.endTime = new Date();
    result.durationMs = result.endTime.getTime() - result.startTime.getTime();
    
    console.log(`src/lib/sync/agent-sync.ts: Agent synchronization completed in ${result.durationMs}ms`)
    console.log(`src/lib/sync/agent-sync.ts: Added: ${result.added}, Updated: ${result.updated}, Skipped: ${result.skipped}, Failed: ${result.failed}`)
    
    return result;
  } catch (error) {
    console.error(`src/lib/sync/agent-sync.ts: Error synchronizing agents:`, error)
    
    result.success = false;
    result.error = error instanceof Error ? error : new Error(String(error));
    result.endTime = new Date();
    result.durationMs = result.endTime.getTime() - result.startTime.getTime();
    
    return result;
  }
}

/**
 * Convert an agent from the REI API CCA format to the Supabase format
 * 
 * @param agent - The agent data from the REI API CCA
 * @param brand - The brand the agent belongs to
 * @returns The agent data in Supabase format
 */
function convertToSupabaseAgent(agent: ReiApiAgent, brand: string): ExtendedSupabaseAgent {
  return {
    agent_id: agent.AssociateID,
    first_name: agent.FirstName,
    last_name: agent.LastName,
    email: agent.Email || null,
    phone: agent.Phone || null,
    bio: agent.Biography || null,
    image_url: agent.ImageURL || null,
    title: agent.Title || null,
    specialties: agent.Specialties || null,
    languages: agent.Languages || null,
    social_media: agent.SocialMedia as unknown as Json || null,
    raw_data: agent as unknown as Json,
    brand // Using shorthand property
  };
}