/**
 * src/app/api/sync-test/route.ts
 *
 * API route for testing the data synchronization service
 * This route provides endpoints for syncing data and checking sync status
 */

import { NextRequest, NextResponse } from "next/server";
import { BrandType } from "@/lib/api/rei-api-cca";
import { 
  syncAll, 
  syncPropertiesOnly, 
  syncAgentsOnly,
  getLastSyncTime
} from "@/lib/sync";

// Simple API key validation for demonstration purposes
// In a real application, use a more secure authentication method
const validateApiKey = (request: NextRequest) => {
  const apiKey = request.headers.get("x-api-key");
  // For testing purposes, we'll use a simple key
  return apiKey === process.env.SYNC_API_KEY || apiKey === "test-sync-key";
};

// GET handler for fetching last sync times
export async function GET(request: NextRequest) {
  // Validate API key
  if (!validateApiKey(request)) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    // Get brand from query parameters
    const { searchParams } = new URL(request.url);
    const brand = searchParams.get("brand") as BrandType;

    if (!brand || (brand !== "AZURA" && brand !== "BLUE_OCEAN")) {
      return NextResponse.json(
        { error: "Invalid brand parameter" },
        { status: 400 }
      );
    }

    // Get last sync times for both properties and agents
    const propertyLastSync = await getLastSyncTime("property", brand);
    const agentLastSync = await getLastSyncTime("agent", brand);

    return NextResponse.json({
      property: propertyLastSync ? propertyLastSync.toISOString() : null,
      agent: agentLastSync ? agentLastSync.toISOString() : null
    });
  } catch (error) {
    console.error("Error fetching last sync times:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

// POST handler for running sync operations
export async function POST(request: NextRequest) {
  // Validate API key
  if (!validateApiKey(request)) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    // Parse request body
    const body = await request.json();
    
    // Validate required parameters
    const { brand, entityType, forceSync, batchSize, verbose } = body;

    if (!brand || (brand !== "AZURA" && brand !== "BLUE_OCEAN")) {
      return NextResponse.json(
        { error: "Invalid brand parameter" },
        { status: 400 }
      );
    }

    if (!entityType || !["all", "properties", "agents"].includes(entityType)) {
      return NextResponse.json(
        { error: "Invalid entityType parameter" },
        { status: 400 }
      );
    }

    // Create sync options
    const syncOptions = {
      brand,
      forceSync: Boolean(forceSync),
      batchSize: Number(batchSize) || 50,
      verbose: Boolean(verbose)
    };

    console.log(`API: Starting sync for ${brand} (${entityType})...`, syncOptions);

    // Run the appropriate sync function based on entity type
    let result;
    if (entityType === "properties") {
      result = await syncPropertiesOnly(syncOptions);
    } else if (entityType === "agents") {
      result = await syncAgentsOnly(syncOptions);
    } else {
      result = await syncAll(syncOptions);
    }

    console.log("API: Sync completed:", result);
    return NextResponse.json(result);
  } catch (error) {
    console.error("API: Sync error:", error);
    return NextResponse.json(
      { 
        success: false,
        error: error instanceof Error ? error.message : String(error),
        added: 0,
        updated: 0,
        skipped: 0,
        failed: 0,
        startTime: new Date(),
        endTime: new Date(),
        durationMs: 0
      },
      { status: 500 }
    );
  }
}