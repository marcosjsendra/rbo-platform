/**
 * scripts/sync-data.ts
 * 
 * Command-line script to trigger data synchronization
 * 
 * This script provides a command-line interface for triggering
 * data synchronization between the REI API CCA and the local Supabase database.
 * 
 * Usage:
 *   npx tsx scripts/sync-data.ts --brand=AZURA --entity=properties --force
 */

import { syncAll, syncPropertiesOnly, syncAgentsOnly } from '../src/lib/sync';
import { BrandType } from '../src/lib/api/rei-api-cca';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Parse command-line arguments
const args = process.argv.slice(2);
const options: {
  brand?: string;
  entity?: string;
  force?: boolean;
  batchSize?: number;
  verbose?: boolean;
} = {};

// Parse arguments
for (const arg of args) {
  if (arg.startsWith('--brand=')) {
    options.brand = arg.replace('--brand=', '');
  } else if (arg.startsWith('--entity=')) {
    options.entity = arg.replace('--entity=', '');
  } else if (arg === '--force') {
    options.force = true;
  } else if (arg.startsWith('--batch-size=')) {
    const size = parseInt(arg.replace('--batch-size=', ''), 10);
    if (!isNaN(size) && size > 0) {
      options.batchSize = size;
    }
  } else if (arg === '--verbose') {
    options.verbose = true;
  } else if (arg === '--help' || arg === '-h') {
    printHelp();
    process.exit(0);
  }
}

/**
 * Print help information
 */
function printHelp() {
  console.log(`
RE/MAX Blue Ocean Data Synchronization Tool

Usage:
  npx tsx scripts/sync-data.ts [options]

Options:
  --brand=BRAND       Brand to synchronize (AZURA or BLUE_OCEAN) [required]
  --entity=ENTITY     Entity type to synchronize (properties, agents, or all) [default: all]
  --force             Force full synchronization even if data is up to date
  --batch-size=SIZE   Number of items to process in each batch [default: 50]
  --verbose           Enable verbose logging
  --help, -h          Show this help message

Examples:
  npx tsx scripts/sync-data.ts --brand=AZURA
  npx tsx scripts/sync-data.ts --brand=BLUE_OCEAN --entity=properties --force
  npx tsx scripts/sync-data.ts --brand=AZURA --entity=agents --batch-size=100 --verbose
  `);
}

/**
 * Validate the brand
 * @param brand - The brand to validate
 * @returns The validated brand or null if invalid
 */
function validateBrand(brand?: string): BrandType | null {
  if (!brand) return null;
  
  const upperBrand = brand.toUpperCase();
  if (upperBrand === 'AZURA' || upperBrand === 'BLUE_OCEAN') {
    return upperBrand as BrandType;
  }
  
  return null;
}

/**
 * Run the synchronization
 */
async function runSync() {
  // Validate brand
  const brand = validateBrand(options.brand);
  if (!brand) {
    console.error('Error: Invalid or missing brand (must be AZURA or BLUE_OCEAN)');
    console.error('Use --help for usage information');
    process.exit(1);
  }
  
  // Parse options
  const forceSync = options.force === true;
  const batchSize = options.batchSize || 50;
  const verbose = options.verbose === true;
  
  console.log(`Starting data synchronization for ${brand}`);
  console.log(`Options: forceSync=${forceSync}, batchSize=${batchSize}, verbose=${verbose}`);
  
  try {
    // Determine which entities to sync
    const entityType = options.entity?.toLowerCase();
    
    let result;
    
    if (entityType === 'properties') {
      // Sync only properties
      console.log('Synchronizing properties...');
      result = await syncPropertiesOnly({
        brand,
        forceSync,
        batchSize,
        verbose
      });
    } else if (entityType === 'agents') {
      // Sync only agents
      console.log('Synchronizing agents...');
      result = await syncAgentsOnly({
        brand,
        forceSync,
        batchSize,
        verbose
      });
    } else {
      // Sync all entities
      console.log('Synchronizing all entities...');
      result = await syncAll({
        brand,
        forceSync,
        batchSize,
        verbose
      });
    }
    
    // Print results
    console.log('\nSynchronization completed');
    console.log(`Success: ${result.success}`);
    console.log(`Added: ${result.added}`);
    console.log(`Updated: ${result.updated}`);
    console.log(`Skipped: ${result.skipped}`);
    console.log(`Failed: ${result.failed}`);
    console.log(`Duration: ${result.durationMs}ms`);
    console.log(`Start time: ${result.startTime.toISOString()}`);
    console.log(`End time: ${result.endTime.toISOString()}`);
    
    if (!result.success) {
      console.error(`Error: ${result.error?.message}`);
      process.exit(1);
    }
  } catch (error) {
    console.error('Error running synchronization:', error);
    process.exit(1);
  }
}

// Check if we have the required arguments
if (!options.brand) {
  console.error('Error: Missing required argument: --brand');
  console.error('Use --help for usage information');
  process.exit(1);
}

// Run the synchronization
runSync().catch(error => {
  console.error('Unhandled error:', error);
  process.exit(1);
});