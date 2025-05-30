/**
 * scripts/test-sync-process.ts
 * 
 * Test script for synchronizing data from REI API CCA to Supabase
 * This script tests the synchronization process with real data and logs results
 */

import { createClient } from '@supabase/supabase-js';
import axios from 'axios';
import * as dotenv from 'dotenv';
import { Database } from '../src/lib/types/supabase';
import fs from 'fs';
import path from 'path';

// Load environment variables
dotenv.config({ path: '.env.local' });

// Validate environment variables
const requiredEnvVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
  'REI_API_URL',
  'REI_API_KEY_AZURA',
  'REI_INTEGRATOR_ID_AZURA',
  'REI_SECRET_KEY_AZURA',
  'REI_API_KEY_BLUE_OCEAN',
  'REI_INTEGRATOR_ID_BLUE_OCEAN',
  'REI_SECRET_KEY_BLUE_OCEAN'
];

const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);
if (missingEnvVars.length > 0) {
  console.error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
  process.exit(1);
}

// Create Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;
const supabase = createClient<Database>(supabaseUrl, supabaseKey);

// REI API credentials for both brands
const brands = [
  {
    name: 'AZURA',
    apiKey: process.env.REI_API_KEY_AZURA as string,
    integratorId: process.env.REI_INTEGRATOR_ID_AZURA as string,
    secretKey: process.env.REI_SECRET_KEY_AZURA as string
  },
  {
    name: 'BLUE OCEAN',
    apiKey: process.env.REI_API_KEY_BLUE_OCEAN as string,
    integratorId: process.env.REI_INTEGRATOR_ID_BLUE_OCEAN as string,
    secretKey: process.env.REI_SECRET_KEY_BLUE_OCEAN as string
  }
];

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Create log file
const timestamp = new Date().toISOString().replace(/:/g, '-');
const logFilePath = path.join(logsDir, `sync-test-${timestamp}.log`);
const logStream = fs.createWriteStream(logFilePath, { flags: 'a' });

// Log function that writes to console and file
function log(message: string) {
  const timestampedMessage = `[${new Date().toISOString()}] ${message}`;
  console.log(timestampedMessage);
  logStream.write(timestampedMessage + '\n');
}

// Get OAuth token from REI API
async function getToken(brand: typeof brands[0]): Promise<string> {
  try {
    log(`Getting token for ${brand.name}...`);
    
    const response = await axios.post(`${process.env.REI_API_URL}/oauth/token`, {
      grant_type: 'client_credentials',
      client_id: brand.integratorId,
      client_secret: brand.secretKey
    });
    
    log(`Successfully obtained token for ${brand.name}`);
    return response.data.access_token;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      log(`Error getting token for ${brand.name}: ${error.message}`);
      if (error.response) {
        log(`Response status: ${error.response.status}`);
        log(`Response data: ${JSON.stringify(error.response.data)}`);
      }
    } else {
      log(`Unknown error getting token for ${brand.name}: ${String(error)}`);
    }
    throw error;
  }
}

// Fetch properties from REI API
async function fetchProperties(brand: typeof brands[0], token: string, take = 10, skip = 0): Promise<any[]> {
  try {
    log(`Fetching properties for ${brand.name} (take: ${take}, skip: ${skip})...`);
    
    const response = await axios.get(
      `${process.env.REI_API_URL}/GetProperties/take/${take}/skip/${skip}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'X-Api-Key': brand.apiKey
        }
      }
    );
    
    log(`Successfully fetched ${response.data.length} properties for ${brand.name}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      log(`Error fetching properties for ${brand.name}: ${error.message}`);
      if (error.response) {
        log(`Response status: ${error.response.status}`);
        log(`Response data: ${JSON.stringify(error.response.data)}`);
      }
    } else {
      log(`Unknown error fetching properties for ${brand.name}: ${String(error)}`);
    }
    throw error;
  }
}

// Fetch agents from REI API
async function fetchAgents(brand: typeof brands[0], token: string, take = 10, skip = 0): Promise<any[]> {
  try {
    log(`Fetching agents for ${brand.name} (take: ${take}, skip: ${skip})...`);
    
    const response = await axios.get(
      `${process.env.REI_API_URL}/associates/take/${take}/skip/${skip}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'X-Api-Key': brand.apiKey
        }
      }
    );
    
    log(`Successfully fetched ${response.data.length} agents for ${brand.name}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      log(`Error fetching agents for ${brand.name}: ${error.message}`);
      if (error.response) {
        log(`Response status: ${error.response.status}`);
        log(`Response data: ${JSON.stringify(error.response.data)}`);
      }
    } else {
      log(`Unknown error fetching agents for ${brand.name}: ${String(error)}`);
    }
    throw error;
  }
}

// Insert property into Supabase
async function insertProperty(property: any, brand: string): Promise<void> {
  try {
    // Transform property data to match Supabase schema
    const transformedProperty = {
      listing_id: property.ListingID,
      title: property.Title,
      description: property.Remarks,
      price: property.Price ? parseFloat(property.Price) : null,
      currency: property.Currency,
      property_type: property.PropertyType,
      status: property.Status ? property.Status.toLowerCase() : 'for-sale',
      bedrooms: property.Bedrooms ? parseInt(property.Bedrooms) : null,
      bathrooms: property.Bathrooms ? parseFloat(property.Bathrooms) : null,
      size: property.LivingArea ? parseFloat(property.LivingArea) : null,
      size_unit: property.LivingAreaUnit,
      location: property.Location,
      address: property.Address,
      city: property.City,
      state: property.StateProvince,
      country: property.Country,
      postal_code: property.PostalCode,
      latitude: property.Latitude ? parseFloat(property.Latitude) : null,
      longitude: property.Longitude ? parseFloat(property.Longitude) : null,
      features: property.Features || {},
      images: property.Images || [],
      agent_id: property.AgentID,
      brand: brand,
      raw_data: property
    };

    const { error } = await supabase
      .from('properties')
      .upsert(
        { 
          ...transformedProperty,
          updated_at: new Date().toISOString()
        }, 
        { onConflict: 'listing_id', ignoreDuplicates: false }
      );

    if (error) {
      log(`Error inserting property ${property.ListingID}: ${error.message}`);
      throw error;
    }

    log(`Successfully inserted/updated property ${property.ListingID} for ${brand}`);
  } catch (error) {
    log(`Error processing property ${property.ListingID}: ${String(error)}`);
    throw error;
  }
}

// Insert agent into Supabase
async function insertAgent(agent: any, brand: string): Promise<void> {
  try {
    // Transform agent data to match Supabase schema
    const transformedAgent = {
      agent_id: agent.AssociateID,
      first_name: agent.FirstName,
      last_name: agent.LastName,
      email: agent.Email,
      phone: agent.Phone,
      bio: agent.Bio,
      image_url: agent.ImageURL,
      title: agent.Title,
      specialties: agent.Specialties || [],
      languages: agent.Languages || [],
      social_media: agent.SocialMedia || {},
      brand: brand,
      raw_data: agent
    };

    const { error } = await supabase
      .from('agents')
      .upsert(
        { 
          ...transformedAgent,
          updated_at: new Date().toISOString()
        }, 
        { onConflict: 'agent_id', ignoreDuplicates: false }
      );

    if (error) {
      log(`Error inserting agent ${agent.AssociateID}: ${error.message}`);
      throw error;
    }

    log(`Successfully inserted/updated agent ${agent.AssociateID} for ${brand}`);
  } catch (error) {
    log(`Error processing agent ${agent.AssociateID}: ${String(error)}`);
    throw error;
  }
}

// Update sync_metadata
async function updateSyncMetadata(entityType: 'property' | 'agent', brand: string): Promise<void> {
  try {
    const timestamp = new Date().toISOString();
    
    const { error } = await supabase
      .from('sync_metadata')
      .upsert(
        {
          entity_type: entityType,
          brand: brand,
          last_sync_time: timestamp,  // Changed from last_sync to last_sync_time to match DB schema
          updated_at: timestamp
        },
        { onConflict: 'entity_type, brand', ignoreDuplicates: false }
      );

    if (error) {
      log(`Error updating sync_metadata for ${entityType} (${brand}): ${error.message}`);
      throw error;
    }

    log(`Successfully updated sync_metadata for ${entityType} (${brand})`);
  } catch (error) {
    log(`Error updating sync_metadata for ${entityType} (${brand}): ${String(error)}`);
    throw error;
  }
}

// Verify data integrity
async function verifyDataIntegrity(
  apiData: any[], 
  tableName: 'properties' | 'agents', 
  idField: 'listing_id' | 'agent_id',
  brand: string
): Promise<void> {
  try {
    log(`Verifying data integrity for ${tableName} (${brand})...`);
    
    // Get IDs from API data
    const apiIds = apiData.map(item => {
      return tableName === 'properties' ? item.ListingID : item.AssociateID;
    });
    
    // Get IDs from Supabase
    const { data: dbData, error } = await supabase
      .from(tableName)
      .select(idField)
      .eq('brand', brand);
    
    if (error) {
      log(`Error fetching ${tableName} from Supabase: ${error.message}`);
      throw error;
    }
    
    const dbIds = dbData.map(item => item[idField as keyof typeof item]);
    
    // Check for missing items
    const missingInDb = apiIds.filter(id => !dbIds.includes(id as never));
    if (missingInDb.length > 0) {
      log(`WARNING: ${missingInDb.length} ${tableName} from API are missing in Supabase`);
      log(`Missing IDs: ${missingInDb.join(', ')}`);
    } else {
      log(`All ${tableName} from API exist in Supabase`);
    }
    
    // Check for extra items
    const extraInDb = dbIds.filter(id => !apiIds.includes(id));
    if (extraInDb.length > 0) {
      log(`INFO: ${extraInDb.length} ${tableName} in Supabase are not in the current API batch`);
      // This is not necessarily an error, as we're only fetching a limited number of items from the API
    }
    
    log(`Data integrity verification completed for ${tableName} (${brand})`);
  } catch (error) {
    log(`Error verifying data integrity for ${tableName} (${brand}): ${String(error)}`);
    throw error;
  }
}

// Main test function
async function runTest() {
  log('Starting synchronization test');
  
  try {
    for (const brand of brands) {
      log(`Processing brand: ${brand.name}`);
      
      // Get token
      const token = await getToken(brand);
      
      // Fetch and process properties
      const properties = await fetchProperties(brand, token);
      for (const property of properties) {
        await insertProperty(property, brand.name);
      }
      await updateSyncMetadata('property', brand.name);
      await verifyDataIntegrity(properties, 'properties', 'listing_id', brand.name);
      
      // Fetch and process agents
      const agents = await fetchAgents(brand, token);
      for (const agent of agents) {
        await insertAgent(agent, brand.name);
      }
      await updateSyncMetadata('agent', brand.name);
      await verifyDataIntegrity(agents, 'agents', 'agent_id', brand.name);
    }
    
    log('Synchronization test completed successfully');
  } catch (error) {
    log(`Synchronization test failed: ${String(error)}`);
  } finally {
    // Close log file
    logStream.end();
    log(`Log file saved to: ${logFilePath}`);
  }
}

// Run the test
runTest();
