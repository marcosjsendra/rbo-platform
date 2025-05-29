/**
 * scripts/verify-data-integrity.ts
 * 
 * Script to verify data integrity between REI API CCA and Supabase
 * This script compares data from both sources and reports any discrepancies
 */

import { createClient } from '@supabase/supabase-js';
import axios from 'axios';
import * as dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { Database } from '../src/lib/types/supabase';

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
const logFilePath = path.join(logsDir, `data-integrity-${timestamp}.log`);
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
async function fetchProperties(brand: typeof brands[0], token: string, take = 20, skip = 0): Promise<any[]> {
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
async function fetchAgents(brand: typeof brands[0], token: string, take = 20, skip = 0): Promise<any[]> {
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

// Get properties from Supabase
async function getPropertiesFromSupabase(brand: string): Promise<any[]> {
  try {
    log(`Fetching properties from Supabase for brand ${brand}...`);
    
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('brand', brand);
    
    if (error) {
      log(`Error fetching properties from Supabase: ${error.message}`);
      throw error;
    }
    
    log(`Successfully fetched ${data.length} properties from Supabase for brand ${brand}`);
    return data;
  } catch (error) {
    log(`Error fetching properties from Supabase: ${String(error)}`);
    throw error;
  }
}

// Get agents from Supabase
async function getAgentsFromSupabase(brand: string): Promise<any[]> {
  try {
    log(`Fetching agents from Supabase for brand ${brand}...`);
    
    const { data, error } = await supabase
      .from('agents')
      .select('*')
      .eq('brand', brand);
    
    if (error) {
      log(`Error fetching agents from Supabase: ${error.message}`);
      throw error;
    }
    
    log(`Successfully fetched ${data.length} agents from Supabase for brand ${brand}`);
    return data;
  } catch (error) {
    log(`Error fetching agents from Supabase: ${String(error)}`);
    throw error;
  }
}

// Compare property data
function comparePropertyData(apiProperty: any, dbProperty: any): { isMatch: boolean; differences: string[] } {
  const differences: string[] = [];
  
  // Define fields to compare
  const fieldsToCompare = [
    { api: 'ListingID', db: 'listing_id' },
    { api: 'Title', db: 'title' },
    { api: 'Price', db: 'price', transform: (val: string) => parseFloat(val) },
    { api: 'Currency', db: 'currency' },
    { api: 'PropertyType', db: 'property_type' },
    { api: 'Status', db: 'status', transform: (val: string) => val.toLowerCase() },
    { api: 'Bedrooms', db: 'bedrooms', transform: (val: string) => parseInt(val) },
    { api: 'Bathrooms', db: 'bathrooms', transform: (val: string) => parseFloat(val) },
    { api: 'LivingArea', db: 'size', transform: (val: string) => parseFloat(val) },
    { api: 'LivingAreaUnit', db: 'size_unit' },
    { api: 'Location', db: 'location' },
    { api: 'Address', db: 'address' },
    { api: 'City', db: 'city' },
    { api: 'StateProvince', db: 'state' },
    { api: 'Country', db: 'country' },
    { api: 'PostalCode', db: 'postal_code' },
    { api: 'Latitude', db: 'latitude', transform: (val: string) => parseFloat(val) },
    { api: 'Longitude', db: 'longitude', transform: (val: string) => parseFloat(val) }
  ];
  
  // Compare each field
  for (const field of fieldsToCompare) {
    const apiValue = field.transform ? field.transform(apiProperty[field.api]) : apiProperty[field.api];
    const dbValue = dbProperty[field.db];
    
    // Handle null values
    if ((apiValue === null || apiValue === undefined) && (dbValue === null || dbValue === undefined)) {
      continue;
    }
    
    // Compare values
    if (apiValue !== dbValue) {
      differences.push(`Field ${field.db}: API value "${apiValue}" != DB value "${dbValue}"`);
    }
  }
  
  return {
    isMatch: differences.length === 0,
    differences
  };
}

// Compare agent data
function compareAgentData(apiAgent: any, dbAgent: any): { isMatch: boolean; differences: string[] } {
  const differences: string[] = [];
  
  // Define fields to compare
  const fieldsToCompare = [
    { api: 'AssociateID', db: 'agent_id' },
    { api: 'FirstName', db: 'first_name' },
    { api: 'LastName', db: 'last_name' },
    { api: 'Email', db: 'email' },
    { api: 'Phone', db: 'phone' },
    { api: 'Bio', db: 'bio' },
    { api: 'ImageURL', db: 'image_url' },
    { api: 'Title', db: 'title' }
  ];
  
  // Compare each field
  for (const field of fieldsToCompare) {
    const apiValue = apiAgent[field.api];
    const dbValue = dbAgent[field.db];
    
    // Handle null values
    if ((apiValue === null || apiValue === undefined) && (dbValue === null || dbValue === undefined)) {
      continue;
    }
    
    // Compare values
    if (apiValue !== dbValue) {
      differences.push(`Field ${field.db}: API value "${apiValue}" != DB value "${dbValue}"`);
    }
  }
  
  // Compare arrays (specialties, languages)
  if (apiAgent.Specialties && dbAgent.specialties) {
    if (!arraysEqual(apiAgent.Specialties, dbAgent.specialties)) {
      differences.push('Specialties arrays do not match');
    }
  }
  
  if (apiAgent.Languages && dbAgent.languages) {
    if (!arraysEqual(apiAgent.Languages, dbAgent.languages)) {
      differences.push('Languages arrays do not match');
    }
  }
  
  return {
    isMatch: differences.length === 0,
    differences
  };
}

// Helper function to compare arrays
function arraysEqual(a: any[], b: any[]): boolean {
  if (a.length !== b.length) return false;
  
  const sortedA = [...a].sort();
  const sortedB = [...b].sort();
  
  for (let i = 0; i < sortedA.length; i++) {
    if (sortedA[i] !== sortedB[i]) return false;
  }
  
  return true;
}

// Verify property data integrity
async function verifyPropertyDataIntegrity(brand: typeof brands[0], token: string): Promise<void> {
  try {
    log(`Verifying property data integrity for ${brand.name}...`);
    
    // Fetch properties from API
    const apiProperties = await fetchProperties(brand, token);
    
    // Fetch properties from Supabase
    const dbProperties = await getPropertiesFromSupabase(brand.name);
    
    // Create lookup for DB properties
    const dbPropertiesMap = new Map();
    dbProperties.forEach(property => {
      dbPropertiesMap.set(property.listing_id, property);
    });
    
    // Compare properties
    let matchCount = 0;
    let mismatchCount = 0;
    let missingCount = 0;
    
    for (const apiProperty of apiProperties) {
      const listingId = apiProperty.ListingID;
      const dbProperty = dbPropertiesMap.get(listingId);
      
      if (!dbProperty) {
        log(`WARNING: Property ${listingId} exists in API but not in Supabase`);
        missingCount++;
        continue;
      }
      
      const comparison = comparePropertyData(apiProperty, dbProperty);
      
      if (comparison.isMatch) {
        matchCount++;
      } else {
        mismatchCount++;
        log(`MISMATCH: Property ${listingId} has differences:`);
        comparison.differences.forEach(diff => log(`  - ${diff}`));
      }
    }
    
    // Check for extra properties in DB
    const apiPropertyIds = new Set(apiProperties.map(p => p.ListingID));
    const extraCount = dbProperties.filter(p => !apiPropertyIds.has(p.listing_id)).length;
    
    // Log summary
    log(`Property data integrity verification for ${brand.name} completed:`);
    log(`  - Total API properties: ${apiProperties.length}`);
    log(`  - Total DB properties: ${dbProperties.length}`);
    log(`  - Matching properties: ${matchCount}`);
    log(`  - Mismatched properties: ${mismatchCount}`);
    log(`  - Missing in DB: ${missingCount}`);
    log(`  - Extra in DB: ${extraCount}`);
    
    // Calculate match percentage
    const matchPercentage = (matchCount / apiProperties.length) * 100;
    log(`  - Match percentage: ${matchPercentage.toFixed(2)}%`);
    
    if (matchPercentage < 90) {
      log(`WARNING: Match percentage is below 90% for ${brand.name} properties`);
    } else {
      log(`SUCCESS: Match percentage is above 90% for ${brand.name} properties`);
    }
  } catch (error) {
    log(`Error verifying property data integrity for ${brand.name}: ${String(error)}`);
    throw error;
  }
}

// Verify agent data integrity
async function verifyAgentDataIntegrity(brand: typeof brands[0], token: string): Promise<void> {
  try {
    log(`Verifying agent data integrity for ${brand.name}...`);
    
    // Fetch agents from API
    const apiAgents = await fetchAgents(brand, token);
    
    // Fetch agents from Supabase
    const dbAgents = await getAgentsFromSupabase(brand.name);
    
    // Create lookup for DB agents
    const dbAgentsMap = new Map();
    dbAgents.forEach(agent => {
      dbAgentsMap.set(agent.agent_id, agent);
    });
    
    // Compare agents
    let matchCount = 0;
    let mismatchCount = 0;
    let missingCount = 0;
    
    for (const apiAgent of apiAgents) {
      const agentId = apiAgent.AssociateID;
      const dbAgent = dbAgentsMap.get(agentId);
      
      if (!dbAgent) {
        log(`WARNING: Agent ${agentId} exists in API but not in Supabase`);
        missingCount++;
        continue;
      }
      
      const comparison = compareAgentData(apiAgent, dbAgent);
      
      if (comparison.isMatch) {
        matchCount++;
      } else {
        mismatchCount++;
        log(`MISMATCH: Agent ${agentId} has differences:`);
        comparison.differences.forEach(diff => log(`  - ${diff}`));
      }
    }
    
    // Check for extra agents in DB
    const apiAgentIds = new Set(apiAgents.map(a => a.AssociateID));
    const extraCount = dbAgents.filter(a => !apiAgentIds.has(a.agent_id)).length;
    
    // Log summary
    log(`Agent data integrity verification for ${brand.name} completed:`);
    log(`  - Total API agents: ${apiAgents.length}`);
    log(`  - Total DB agents: ${dbAgents.length}`);
    log(`  - Matching agents: ${matchCount}`);
    log(`  - Mismatched agents: ${mismatchCount}`);
    log(`  - Missing in DB: ${missingCount}`);
    log(`  - Extra in DB: ${extraCount}`);
    
    // Calculate match percentage
    const matchPercentage = (matchCount / apiAgents.length) * 100;
    log(`  - Match percentage: ${matchPercentage.toFixed(2)}%`);
    
    if (matchPercentage < 90) {
      log(`WARNING: Match percentage is below 90% for ${brand.name} agents`);
    } else {
      log(`SUCCESS: Match percentage is above 90% for ${brand.name} agents`);
    }
  } catch (error) {
    log(`Error verifying agent data integrity for ${brand.name}: ${String(error)}`);
    throw error;
  }
}

// Main function
async function main() {
  log('Starting data integrity verification');
  
  try {
    for (const brand of brands) {
      log(`Processing brand: ${brand.name}`);
      
      // Get token
      const token = await getToken(brand);
      
      // Verify property data integrity
      await verifyPropertyDataIntegrity(brand, token);
      
      // Verify agent data integrity
      await verifyAgentDataIntegrity(brand, token);
    }
    
    log('Data integrity verification completed successfully');
  } catch (error) {
    log(`Data integrity verification failed: ${String(error)}`);
  } finally {
    // Close log file
    logStream.end();
    log(`Log file saved to: ${logFilePath}`);
  }
}

// Run the main function
main();
