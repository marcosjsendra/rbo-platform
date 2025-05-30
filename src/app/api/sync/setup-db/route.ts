/**
 * src/app/api/sync/setup-db/route.ts
 *
 * API route for setting up the sync_metadata table directly
 */

import { NextRequest, NextResponse } from "next/server";

// Simple API key validation for demonstration purposes
const validateApiKey = (request: NextRequest) => {
  const apiKey = request.headers.get("x-api-key");
  // For testing purposes, we'll use a simple key
  return apiKey === process.env.SYNC_API_KEY || apiKey === "test-sync-key";
};

export async function POST(request: NextRequest) {
  // Validate API key
  if (!validateApiKey(request)) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    // Get the Supabase URL and API key for direct REST API calls
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: "Missing Supabase credentials" },
        { status: 500 }
      );
    }
    
    // Create the sync_metadata table directly
    const createTableSql = `
      CREATE TABLE IF NOT EXISTS public.sync_metadata (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        entity_type TEXT NOT NULL,
        brand TEXT NOT NULL,
        last_sync_time TIMESTAMPTZ NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        CONSTRAINT sync_metadata_entity_brand_unique UNIQUE (entity_type, brand)
      );
      
      -- Create trigger to automatically update updated_at column
      CREATE OR REPLACE FUNCTION public.update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = NOW();
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
      
      -- Apply the trigger to the sync_metadata table
      DROP TRIGGER IF EXISTS update_sync_metadata_updated_at ON public.sync_metadata;
      CREATE TRIGGER update_sync_metadata_updated_at
      BEFORE UPDATE ON public.sync_metadata
      FOR EACH ROW
      EXECUTE FUNCTION public.update_updated_at_column();
      
      -- Add brand column to properties table if it doesn't exist
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT FROM information_schema.columns 
          WHERE table_schema = 'public' 
          AND table_name = 'properties' 
          AND column_name = 'brand'
        ) THEN
          ALTER TABLE public.properties ADD COLUMN brand TEXT;
        END IF;
      END $$;
      
      -- Add brand column to agents table if it doesn't exist
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT FROM information_schema.columns 
          WHERE table_schema = 'public' 
          AND table_name = 'agents' 
          AND column_name = 'brand'
        ) THEN
          ALTER TABLE public.agents ADD COLUMN brand TEXT;
        END IF;
      END $$;
    `;
    
    // Execute SQL directly using the Supabase REST API
    console.log("Executing SQL to create sync_metadata table...");
    
    // Use the SQL HTTP API endpoint
    const sqlEndpoint = `${supabaseUrl}/rest/v1/sql`;
    const sqlResponse = await fetch(sqlEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      },
      body: JSON.stringify({
        query: createTableSql
      })
    });
    
    if (!sqlResponse.ok) {
      const errorText = await sqlResponse.text();
      console.error("Error executing SQL:", errorText);
      
      // Try a different approach with the SQL HTTP API
      const alternateSqlResponse = await fetch(`${supabaseUrl}/rest/v1/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Prefer': 'params=single-object'
        },
        body: JSON.stringify({
          query: createTableSql
        })
      });
      
      if (!alternateSqlResponse.ok) {
        const alternateErrorText = await alternateSqlResponse.text();
        console.error("Error with alternate SQL approach:", alternateErrorText);
        
        return NextResponse.json({
          success: false,
          error: "Failed to create sync_metadata table. Please run the SQL manually in the Supabase dashboard.",
          sql: createTableSql
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: `Database setup completed successfully`
    });
  } catch (error) {
    console.error("Error setting up database:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
