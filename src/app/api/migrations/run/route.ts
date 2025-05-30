/**
 * src/app/api/migrations/run/route.ts
 *
 * API route for running database migrations
 */

import { NextRequest, NextResponse } from "next/server";
import { createServerComponentClient } from "@/lib/supabase/server";
import fs from "fs";
import path from "path";

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
    // Parse request body
    const body = await request.json();
    const { migrationName } = body;

    if (!migrationName) {
      return NextResponse.json(
        { error: "Migration name is required" },
        { status: 400 }
      );
    }

    // Get the migration file path
    const migrationsDir = path.join(process.cwd(), "src", "lib", "supabase", "migrations");
    const migrationPath = path.join(migrationsDir, `${migrationName}.sql`);

    // Check if the migration file exists
    if (!fs.existsSync(migrationPath)) {
      return NextResponse.json(
        { error: `Migration file ${migrationName}.sql not found` },
        { status: 404 }
      );
    }

    // Read the migration file
    const migrationSql = fs.readFileSync(migrationPath, "utf8");

    // Create a Supabase client
    const supabase = createServerComponentClient();

    // Execute the migration SQL
    // Try different methods to execute the SQL
    let error = null;
    
    try {
      // Try using exec_sql RPC function
      // @ts-ignore - Ignoring type error for RPC function that might not be in the types
      const result = await supabase.rpc("exec_sql", { sql: migrationSql });
      error = result.error;
    } catch (err) {
      console.log("exec_sql RPC not found, trying direct SQL execution");
      
      try {
        // Try using direct SQL execution via REST API
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
        
        if (!supabaseUrl || !supabaseKey) {
          throw new Error("Missing Supabase credentials");
        }
        
        // Execute SQL directly using the REST API
        const sqlResponse = await fetch(`${supabaseUrl}/rest/v1/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`,
            'Prefer': 'params=single-object'
          },
          body: JSON.stringify({
            query: migrationSql
          })
        });
        
        if (!sqlResponse.ok) {
          const errorText = await sqlResponse.text();
          console.error("Error executing SQL:", errorText);
          error = new Error(errorText);
        }
      } catch (sqlErr) {
        console.error("Error executing SQL directly:", sqlErr);
        error = sqlErr;
      }
    }

    if (error) {
      console.error(`Error running migration ${migrationName}:`, error);
      // Safely extract error message regardless of error type
      const errorMessage = error instanceof Error 
        ? error.message 
        : (typeof error === 'object' && error !== null && 'message' in error)
          ? String(error.message)
          : String(error);
          
      return NextResponse.json(
        { error: `Error running migration: ${errorMessage}` },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Migration ${migrationName} executed successfully`
    });
  } catch (error) {
    console.error("Error running migration:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}