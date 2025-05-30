/**
 * src/app/api/sync/route.ts
 * 
 * API route for triggering data synchronization
 * 
 * This route handler provides endpoints for triggering data synchronization
 * between the REI API CCA and the local Supabase database.
 */

import { NextRequest, NextResponse } from 'next/server';
import { syncAll, syncPropertiesOnly, syncAgentsOnly } from '@/lib/sync';
import { BrandType } from '@/lib/api/rei-api-cca';

/**
 * Validate API key from request headers
 * @param request - The incoming request
 * @returns True if the API key is valid, false otherwise
 */
function validateApiKey(request: NextRequest): boolean {
  const apiKey = request.headers.get('x-api-key');
  const validApiKey = process.env.SYNC_API_KEY;
  
  if (!validApiKey) {
    console.error('[SyncAPI] SYNC_API_KEY environment variable not set');
    return false;
  }
  
  return apiKey === validApiKey;
}

/**
 * Parse and validate the brand from the request
 * @param brand - The brand string from the request
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
 * POST handler for /api/sync
 * Triggers a full data synchronization for the specified brand
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  // Validate API key
  if (!validateApiKey(request)) {
    return NextResponse.json(
      { error: 'Unauthorized - Invalid or missing API key' },
      { status: 401 }
    );
  }
  
  try {
    // Parse request body
    const body = await request.json();
    
    // Validate brand
    const brand = validateBrand(body.brand);
    if (!brand) {
      return NextResponse.json(
        { error: 'Bad Request - Invalid or missing brand (must be AZURA or BLUE_OCEAN)' },
        { status: 400 }
      );
    }
    
    // Parse options
    const forceSync = body.forceSync === true;
    const batchSize = typeof body.batchSize === 'number' ? body.batchSize : 50;
    const verbose = body.verbose === true;
    
    // Determine which entities to sync
    const entityType = body.entityType?.toLowerCase();
    
    let result;
    
    if (entityType === 'properties') {
      // Sync only properties
      result = await syncPropertiesOnly({
        brand,
        forceSync,
        batchSize,
        verbose
      });
    } else if (entityType === 'agents') {
      // Sync only agents
      result = await syncAgentsOnly({
        brand,
        forceSync,
        batchSize,
        verbose
      });
    } else {
      // Sync all entities
      result = await syncAll({
        brand,
        forceSync,
        batchSize,
        verbose
      });
    }
    
    // Return the result
    return NextResponse.json({
      success: result.success,
      stats: {
        added: result.added,
        updated: result.updated,
        skipped: result.skipped,
        failed: result.failed,
        durationMs: result.durationMs
      },
      startTime: result.startTime.toISOString(),
      endTime: result.endTime.toISOString()
    });
  } catch (error) {
    console.error('[SyncAPI] Error processing sync request:', error);
    
    return NextResponse.json(
      { 
        error: 'Internal Server Error',
        message: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}

/**
 * GET handler for /api/sync
 * Returns information about the sync API
 */
export async function GET(): Promise<NextResponse> {
  return NextResponse.json({
    name: 'RE/MAX Blue Ocean Data Synchronization API',
    version: '1.0.0',
    endpoints: {
      '/api/sync': {
        methods: ['POST'],
        description: 'Trigger data synchronization',
        requiresApiKey: true,
        body: {
          brand: 'AZURA or BLUE_OCEAN (required)',
          entityType: 'properties, agents, or omit for all (optional)',
          forceSync: 'boolean, default: false (optional)',
          batchSize: 'number, default: 50 (optional)',
          verbose: 'boolean, default: false (optional)'
        }
      }
    },
    documentation: 'See README.md in the project root for more information'
  });
}