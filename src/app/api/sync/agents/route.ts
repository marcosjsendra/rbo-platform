/**
 * src/app/api/sync/agents/route.ts
 * 
 * API route for syncing agents from REI API CCA to Supabase
 * This route handles the synchronization of agent data from the REI API CCA
 * to the local Supabase database for both AZURA and BLUE_OCEAN brands.
 */

import { NextRequest, NextResponse } from 'next/server';
import { createServerComponentClient } from '@/lib/supabase/server';
import { createReiApiCcaClient, BrandType } from '@/lib/api/rei-api-cca/client';

/**
 * GET handler for agent synchronization
 * 
 * @param request The incoming request object
 * @returns A JSON response with the sync results
 */
export async function GET(request: NextRequest) {
  console.log('src/app/api/sync/agents/route.ts: Starting agent sync');
  
  // Extract query parameters
  const searchParams = request.nextUrl.searchParams;
  const brand = searchParams.get('brand') as BrandType || 'AZURA';
  const forceSync = searchParams.get('force') === 'true';
  const batchSize = parseInt(searchParams.get('batchSize') || '50', 10);
  const verbose = searchParams.get('verbose') === 'true';
  
  console.log(`src/app/api/sync/agents/route.ts: Syncing agents for brand ${brand}, forceSync=${forceSync}, batchSize=${batchSize}`);
  
  try {
    // Create API client with appropriate credentials based on brand
    const apiClient = createReiApiCcaClient({
      brand,
      apiKey: process.env[`REI_API_CCA_${brand}_API_KEY`]!,
      integratorId: process.env[`REI_API_CCA_${brand}_INTEGRATOR_ID`]!,
      secretKey: process.env[`REI_API_CCA_${brand}_SECRET_KEY`]!,
    });
    
    // Create Supabase client
    const supabase = createServerComponentClient();
    
    // Get last sync time from sync_metadata table
    let lastSyncTime: string | null = null;
    if (!forceSync) {
      const { data: syncData, error: syncError } = await supabase
        .from('sync_metadata')
        .select('last_sync_time')
        .eq('entity_type', 'agent')
        .eq('brand', brand)
        .single();
      
      if (syncError) {
        console.error(`src/app/api/sync/agents/route.ts: Error fetching last sync time: ${syncError.message}`);
        
        // If the error is because the record doesn't exist, we'll create it later
        if (syncError.code !== 'PGRST116') {
          throw syncError;
        }
      } else {
        lastSyncTime = syncData?.last_sync_time || null;
        console.log(`src/app/api/sync/agents/route.ts: Last sync time: ${lastSyncTime}`);
      }
    }
    
    // Record start time for this sync operation
    const startTime = new Date();
    
    // Initialize results object
    const results = {
      added: 0,
      updated: 0,
      skipped: 0,
      failed: 0,
      errors: [] as string[],
    };
    
    // Fetch agents from API
    console.log(`src/app/api/sync/agents/route.ts: Fetching agents from REI API CCA`);
    const { agents, totalCount } = await apiClient.getAgents({
      modifiedSince: lastSyncTime,
      take: batchSize,
      skip: 0
    });
    
    console.log(`src/app/api/sync/agents/route.ts: Fetched ${agents.length} agents out of ${totalCount} total`);
    
    // Process and store agents
    for (const agent of agents) {
      try {
        if (verbose) {
          console.log(`src/app/api/sync/agents/route.ts: Processing agent ${agent.agentId}`);
        }
        
        // Check if agent exists
        const { data: existingAgent, error: lookupError } = await supabase
          .from('agents')
          .select('id')
          .eq('agent_id', agent.agentId)
          .single();
        
        if (lookupError && lookupError.code !== 'PGRST116') {
          // PGRST116 means no rows returned, which is fine for new agents
          console.error(`src/app/api/sync/agents/route.ts: Error looking up agent ${agent.agentId}: ${lookupError.message}`);
          results.failed++;
          results.errors.push(`Error looking up agent ${agent.agentId}: ${lookupError.message}`);
          continue;
        }
        
        // Prepare agent data for database
        const agentData = {
          agent_id: agent.agentId,
          first_name: agent.firstName || '',
          last_name: agent.lastName || '',
          email: agent.email,
          phone: agent.phone,
          bio: agent.bio,
          image_url: agent.imageUrl,
          title: agent.title,
          specialties: agent.specialties,
          languages: agent.languages,
          social_media: agent.socialMedia,
          brand,
          raw_data: agent
        };
        
        if (existingAgent) {
          // Update existing agent
          const { error: updateError } = await supabase
            .from('agents')
            .update({
              ...agentData,
              updated_at: new Date().toISOString()
            })
            .eq('id', existingAgent.id);
          
          if (updateError) {
            console.error(`src/app/api/sync/agents/route.ts: Error updating agent ${agent.agentId}: ${updateError.message}`);
            results.failed++;
            results.errors.push(`Error updating agent ${agent.agentId}: ${updateError.message}`);
          } else {
            results.updated++;
            if (verbose) {
              console.log(`src/app/api/sync/agents/route.ts: Updated agent ${agent.agentId}`);
            }
          }
        } else {
          // Insert new agent
          const { error: insertError } = await supabase
            .from('agents')
            .insert(agentData);
          
          if (insertError) {
            console.error(`src/app/api/sync/agents/route.ts: Error inserting agent ${agent.agentId}: ${insertError.message}`);
            results.failed++;
            results.errors.push(`Error inserting agent ${agent.agentId}: ${insertError.message}`);
          } else {
            results.added++;
            if (verbose) {
              console.log(`src/app/api/sync/agents/route.ts: Added agent ${agent.agentId}`);
            }
          }
        }
      } catch (error) {
        console.error(`src/app/api/sync/agents/route.ts: Error processing agent ${agent.agentId}:`, error);
        results.failed++;
        results.errors.push(`Error processing agent ${agent.agentId}: ${String(error)}`);
      }
    }
    
    // Update last sync time in sync_metadata table
    const { error: upsertError } = await supabase
      .from('sync_metadata')
      .upsert({
        entity_type: 'agent',
        brand,
        last_sync_time: startTime.toISOString()
      }, {
        onConflict: 'entity_type,brand'
      });
    
    if (upsertError) {
      console.error(`src/app/api/sync/agents/route.ts: Error updating sync metadata: ${upsertError.message}`);
      results.errors.push(`Error updating sync metadata: ${upsertError.message}`);
    }
    
    // Calculate duration
    const endTime = new Date();
    const durationMs = endTime.getTime() - startTime.getTime();
    
    console.log(`src/app/api/sync/agents/route.ts: Sync completed in ${durationMs}ms. Added: ${results.added}, Updated: ${results.updated}, Failed: ${results.failed}`);
    
    // Return results
    return NextResponse.json({
      success: true,
      brand,
      totalCount,
      processed: agents.length,
      ...results,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      durationMs,
      hasMore: agents.length < totalCount
    });
  } catch (error) {
    console.error('src/app/api/sync/agents/route.ts: Error syncing agents:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: String(error),
        brand
      },
      { status: 500 }
    );
  }
}
