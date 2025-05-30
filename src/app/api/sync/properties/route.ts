/**
 * src/app/api/sync/properties/route.ts
 * 
 * API route for syncing properties from REI API CCA to Supabase
 * This route handles the synchronization of property data from the REI API CCA
 * to the local Supabase database for both AZURA and BLUE_OCEAN brands.
 */

import { NextRequest, NextResponse } from 'next/server';
import { createServerComponentClient } from '@/lib/supabase/server';
import { createReiApiCcaClient, BrandType } from '@/lib/api/rei-api-cca/client';

/**
 * GET handler for property synchronization
 * 
 * @param request The incoming request object
 * @returns A JSON response with the sync results
 */
export async function GET(request: NextRequest) {
  console.log('src/app/api/sync/properties/route.ts: Starting property sync');
  
  // Extract query parameters
  const searchParams = request.nextUrl.searchParams;
  const brand = searchParams.get('brand') as BrandType || 'AZURA';
  const forceSync = searchParams.get('force') === 'true';
  const batchSize = parseInt(searchParams.get('batchSize') || '50', 10);
  const verbose = searchParams.get('verbose') === 'true';
  
  console.log(`src/app/api/sync/properties/route.ts: Syncing properties for brand ${brand}, forceSync=${forceSync}, batchSize=${batchSize}`);
  
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
        .eq('entity_type', 'property')
        .eq('brand', brand)
        .single();
      
      if (syncError) {
        console.error(`src/app/api/sync/properties/route.ts: Error fetching last sync time: ${syncError.message}`);
        
        // If the error is because the record doesn't exist, we'll create it later
        if (syncError.code !== 'PGRST116') {
          throw syncError;
        }
      } else {
        lastSyncTime = syncData?.last_sync_time || null;
        console.log(`src/app/api/sync/properties/route.ts: Last sync time: ${lastSyncTime}`);
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
    
    // Fetch properties from API
    console.log(`src/app/api/sync/properties/route.ts: Fetching properties from REI API CCA`);
    const { properties, totalCount } = await apiClient.getProperties({
      modifiedSince: lastSyncTime,
      take: batchSize,
      skip: 0
    });
    
    console.log(`src/app/api/sync/properties/route.ts: Fetched ${properties.length} properties out of ${totalCount} total`);
    
    // Process and store properties
    for (const property of properties) {
      try {
        if (verbose) {
          console.log(`src/app/api/sync/properties/route.ts: Processing property ${property.listingId}`);
        }
        
        // Check if property exists
        const { data: existingProperty, error: lookupError } = await supabase
          .from('properties')
          .select('id')
          .eq('listing_id', property.listingId)
          .single();
        
        if (lookupError && lookupError.code !== 'PGRST116') {
          // PGRST116 means no rows returned, which is fine for new properties
          console.error(`src/app/api/sync/properties/route.ts: Error looking up property ${property.listingId}: ${lookupError.message}`);
          results.failed++;
          results.errors.push(`Error looking up property ${property.listingId}: ${lookupError.message}`);
          continue;
        }
        
        // Prepare property data for database
        const propertyData = {
          listing_id: property.listingId,
          title: property.title || '',
          description: property.remarks,
          price: property.price,
          currency: property.currency,
          property_type: property.propertyType,
          status: property.status,
          bedrooms: property.bedrooms,
          bathrooms: property.bathrooms,
          size: property.size,
          size_unit: property.sizeUnit,
          location: property.location,
          address: property.address,
          city: property.city,
          state: property.stateProvince,
          country: property.country,
          postal_code: property.postalCode,
          latitude: property.latitude,
          longitude: property.longitude,
          features: property.features,
          images: property.images?.map(img => img.url) || [],
          brand,
          raw_data: property
        };
        
        if (existingProperty) {
          // Update existing property
          const { error: updateError } = await supabase
            .from('properties')
            .update({
              ...propertyData,
              updated_at: new Date().toISOString()
            })
            .eq('id', existingProperty.id);
          
          if (updateError) {
            console.error(`src/app/api/sync/properties/route.ts: Error updating property ${property.listingId}: ${updateError.message}`);
            results.failed++;
            results.errors.push(`Error updating property ${property.listingId}: ${updateError.message}`);
          } else {
            results.updated++;
            if (verbose) {
              console.log(`src/app/api/sync/properties/route.ts: Updated property ${property.listingId}`);
            }
          }
        } else {
          // Insert new property
          const { error: insertError } = await supabase
            .from('properties')
            .insert(propertyData);
          
          if (insertError) {
            console.error(`src/app/api/sync/properties/route.ts: Error inserting property ${property.listingId}: ${insertError.message}`);
            results.failed++;
            results.errors.push(`Error inserting property ${property.listingId}: ${insertError.message}`);
          } else {
            results.added++;
            if (verbose) {
              console.log(`src/app/api/sync/properties/route.ts: Added property ${property.listingId}`);
            }
          }
        }
      } catch (error) {
        console.error(`src/app/api/sync/properties/route.ts: Error processing property ${property.listingId}:`, error);
        results.failed++;
        results.errors.push(`Error processing property ${property.listingId}: ${String(error)}`);
      }
    }
    
    // Update last sync time in sync_metadata table
    const { error: upsertError } = await supabase
      .from('sync_metadata')
      .upsert({
        entity_type: 'property',
        brand,
        last_sync_time: startTime.toISOString()
      }, {
        onConflict: 'entity_type,brand'
      });
    
    if (upsertError) {
      console.error(`src/app/api/sync/properties/route.ts: Error updating sync metadata: ${upsertError.message}`);
      results.errors.push(`Error updating sync metadata: ${upsertError.message}`);
    }
    
    // Calculate duration
    const endTime = new Date();
    const durationMs = endTime.getTime() - startTime.getTime();
    
    console.log(`src/app/api/sync/properties/route.ts: Sync completed in ${durationMs}ms. Added: ${results.added}, Updated: ${results.updated}, Failed: ${results.failed}`);
    
    // Return results
    return NextResponse.json({
      success: true,
      brand,
      totalCount,
      processed: properties.length,
      ...results,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      durationMs,
      hasMore: properties.length < totalCount
    });
  } catch (error) {
    console.error('src/app/api/sync/properties/route.ts: Error syncing properties:', error);
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
