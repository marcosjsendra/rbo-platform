/**
 * src/app/api/test-connection/route.ts
 * 
 * Test endpoint for verifying database connectivity
 */

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/lib/types/supabase';

export async function GET() {
  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  try {
    console.log('src/app/api/test-connection/route.ts: Testing Supabase connection...');

    // Test properties table
    const propertiesResult = await supabase.from('properties').select('count').single();
    
    // Test agents table
    const agentsResult = await supabase.from('agents').select('count').single();
    
    // Test sync_metadata table
    const syncResult = await supabase.from('sync_metadata').select('count').single();

    return NextResponse.json({
      success: true,
      tables: {
        properties: {
          accessible: !propertiesResult.error,
          error: propertiesResult.error?.message
        },
        agents: {
          accessible: !agentsResult.error,
          error: agentsResult.error?.message
        },
        sync_metadata: {
          accessible: !syncResult.error,
          error: syncResult.error?.message
        }
      }
    });
  } catch (error) {
    console.error('src/app/api/test-connection/route.ts: Database connection error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 });
  }
}