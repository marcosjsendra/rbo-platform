# Phase 2.2 Status Report: REI API CCA Integration

**Date:** May 28, 2025  
**Status:** In Progress - Requires Stabilization  
**Priority:** High

## Overview

Phase 2.2 focuses on integrating the REI API CCA to retrieve property and agent data for the RE/MAX Blue Ocean website. This phase is critical as it provides the foundation for displaying real property listings and agent information on the website.

## Current State

The integration is currently **unstable** due to several architectural and technical issues:

1. **Server vs. Client Component Conflicts**: The current implementation mixes server-only code in client components, causing runtime errors.
2. **Type System Issues**: The Supabase database schema doesn't include the `sync_metadata` table, causing TypeScript errors.
3. **Sync Process Complexity**: The current sync process is overly complex, with multiple interdependent components.
4. **Testing Difficulties**: The sync-test page has multiple implementations that conflict with each other.

## Task List and Progress Tracking

### Completed Tasks ✅

1. **REI API CCA Client Implementation**
   - [x] Created TypeScript interfaces for API responses
   - [x] Implemented authentication with token management
   - [x] Added support for both RE/MAX AZURA and RE/MAX BLUE OCEAN brands
   - [x] Implemented property data retrieval with pagination
   - [x] Implemented agent data retrieval with pagination
   - [x] Added proper error handling and logging
   - [x] Fixed TypeScript errors in the client implementation

2. **Admin UI Components**
   - [x] Created SyncControlPanel component for triggering sync operations
   - [x] Implemented SyncStatusPanel for displaying sync results
   - [x] Added SyncMetadataPanel for showing last sync times
   - [x] Fixed import path issues in admin components

3. **API Routes**
   - [x] Implemented /api/sync/properties route for property synchronization
   - [x] Implemented /api/sync/agents route for agent synchronization
   - [x] Added proper error handling and response formatting

4. **Database Schema**
   - [x] Added sync_metadata table to Supabase database schema types
   - [x] Created TypeScript interfaces for database tables

### Pending Tasks ⏳

1. **Database Migration**
   - [x] Create migration file for sync_metadata table
   - [x] Complete SQL with initial records for both brands and entity types
   - [x] Apply migration to the database

2. **Data Access Layer**
   - [x] Create functions for retrieving properties from Supabase
   - [x] Implement filtering and pagination for property queries
   - [x] Create functions for retrieving agents from Supabase
   - [x] Implement filtering and pagination for agent queries

3. **Property and Agent Components**
   - [x] Develop reusable property card components
   - [x] Create property detail page components
   - [x] Build agent card and profile components
   - [x] Implement search and filtering UI

4. **Testing and Validation**
   - [ ] Test synchronization process with real data
   - [ ] Verify data integrity between REI API and Supabase
   - [ ] Test admin UI functionality
   - [ ] Validate property and agent display components

5. **Documentation**
   - [ ] Complete implementation report
   - [ ] Document database schema
   - [ ] Create user guides for admin interface
   - [ ] Update project README with latest progress

## Implemented Components

### 1. REI API CCA Client

- Created a client for the REI API CCA that handles authentication and data retrieval
- Implemented proper error handling and response parsing
- Supports both RE/MAX AZURA and RE/MAX BLUE OCEAN brands

### 2. Sync Services

- **sync-service.ts**: Server-side implementation that requires the `sync_metadata` table
- **sync-service-fallback.ts**: Client-side implementation that can work without the `sync_metadata` table
- **property-sync.ts**: Handles property data synchronization
- **agent-sync.ts**: Handles agent data synchronization

### 3. Testing UI

- **direct-sql-creator.tsx**: Component that creates the `sync_metadata` table using direct SQL
- **simple-table-creator.tsx**: Alternative approach to create the table (has type errors)
- **simple-page.tsx**: UI for testing the sync functionality
- **page.tsx**: Entry point for the sync test page

## Root Issues

1. **Architecture Mismatch**: Next.js App Router's strict separation between server and client components is not properly respected in the current implementation.

2. **Database Schema Issues**: The Supabase database schema doesn't include the `sync_metadata` table, causing type errors when trying to use it with the typed Supabase client.

3. **Dependency Cycles**: The sync service components have circular dependencies and unclear responsibilities.

## Recommended Path Forward

### Option 1: Complete Redesign (Recommended)

1. **Delete the entire sync-test folder** and start fresh with a clear architecture
2. **Implement a clean API-based approach**:
   - Create dedicated API routes for syncing properties and agents
   - Use server components only for server-side operations
   - Use client components only for UI and API calls
3. **Simplify the sync process**:
   - Create a direct SQL migration for the `sync_metadata` table
   - Update the database type definitions to include this table
   - Implement a simpler sync service with clear responsibilities

### Option 2: Targeted Fixes

If a complete redesign is not feasible, we should:

1. **Fix the server-only import issues**:
   - Ensure all server-only code is isolated in API routes
   - Create a clean client-side interface for the sync test page
2. **Resolve type system issues**:
   - Add the `sync_metadata` table to the database type definitions
   - Use type assertions where necessary to bypass type errors
3. **Simplify the testing UI**:
   - Consolidate the multiple table creator components
   - Create a clear, step-by-step UI for testing

## How Phase 2.2 Should Work

The ideal implementation of Phase 2.2 should follow this flow:

1. **Database Setup**:
   - The `sync_metadata` table should be created as part of the database migration process
   - This table should track the last sync time for each entity type (properties, agents) and brand (AZURA, BLUE_OCEAN)

2. **API Routes**:
   - `/api/sync/properties?brand=[BRAND]`: Syncs properties for the specified brand
   - `/api/sync/agents?brand=[BRAND]`: Syncs agents for the specified brand
   - `/api/sync/status`: Returns the current sync status

3. **Sync Process**:
   - The sync process should check the last sync time from the `sync_metadata` table
   - It should retrieve only new or updated data from the REI API CCA
   - It should update the Supabase database with the new data
   - It should update the last sync time in the `sync_metadata` table

4. **Testing UI**:
   - A simple UI that allows triggering the sync process via API calls
   - Displays the sync status and results
   - Provides links to view the synced data

## Next Steps

1. **Make a decision** on whether to proceed with Option 1 (complete redesign) or Option 2 (targeted fixes)
2. **Create a detailed implementation plan** based on the chosen option
3. **Implement the changes** with a focus on stability and maintainability
4. **Test thoroughly** to ensure the sync process works correctly
5. **Document the final implementation** for future reference

## Research Findings: Best Practices for Next.js + Supabase Integration

### Official Next.js and Supabase Patterns

After researching similar cases and solutions, I've identified the following best practices for integrating Next.js App Router with Supabase, specifically addressing our server/client component issues:

### 1. Proper Client Structure (Supabase Official Pattern)

The official Supabase documentation recommends creating separate utility files for different client types:

```
/utils/supabase/
  ├── server.js  - For Server Components only (uses server-only)
  ├── client.js  - For Client Components only
  └── middleware.js - For middleware functions
```

This separation ensures that server-only code is never imported in client components.

### 2. Recommended Implementation Pattern

Based on the [Supabase Auth with Next.js App Router](https://supabase.com/docs/guides/auth/server-side/nextjs) documentation:

1. **For API Routes and Server Actions**:
   ```typescript
   import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
   import { cookies } from 'next/headers'
   
   export async function POST(request) {
     const supabase = createRouteHandlerClient({ cookies })
     // Server-side operations
   }
   ```

2. **For Client Components**:
   ```typescript
   'use client'
   import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
   
   export default function ClientComponent() {
     const supabase = createClientComponentClient()
     // Client-side operations
   }
   ```

### 3. Data Synchronization Pattern

For data synchronization services like our REI API integration, the recommended pattern is:

1. **Create API Routes** for all synchronization operations
2. **Use Server Actions** for database operations
3. **Use Client Components** only for UI and triggering API calls

### 4. Handling Database Schema Issues

To address the type system issues with missing tables:

1. **Update Database Types**: Generate complete types including all tables
2. **Use Schema Migrations**: Create proper migrations for new tables
3. **Type Assertions**: When necessary, use type assertions to bypass type checking

### 5. Real-World Examples

Several developers have faced similar issues with the "server-only" error in Next.js App Router. The most successful solutions involve:

1. Complete separation of server and client code
2. Using API routes for all data operations
3. Creating a clean client-side interface for UI components

## Detailed Implementation Plan

Based on the official Next.js examples and Supabase documentation, here's a detailed implementation plan for rebuilding the REI API integration:

### 1. Project Structure

```
/src
  /lib
    /supabase
      /server.ts     # Server-only Supabase client
      /client.ts     # Client-side Supabase client
      /types.ts      # Shared types
    /api
      /rei-api-cca
        /client.ts   # REI API client
        /types.ts    # REI API types
    /sync
      /types.ts      # Sync types
  /app
    /api
      /sync
        /properties
          /route.ts  # API route for property sync
        /agents
          /route.ts  # API route for agent sync
        /status
          /route.ts  # API route for sync status
    /admin
      /sync
        /page.tsx    # Admin UI for sync operations
        /components
          /SyncStatusPanel.tsx
          /SyncControlPanel.tsx
```

### 2. Database Migration

Create a proper migration for the `sync_metadata` table:

```sql
CREATE TABLE IF NOT EXISTS public.sync_metadata (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type TEXT NOT NULL,
  brand TEXT NOT NULL,
  last_sync_time TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  UNIQUE(entity_type, brand)
);

-- Insert initial records
INSERT INTO public.sync_metadata (entity_type, brand, last_sync_time)
VALUES 
  ('property', 'AZURA', NOW()),
  ('property', 'BLUE_OCEAN', NOW()),
  ('agent', 'AZURA', NOW()),
  ('agent', 'BLUE_OCEAN', NOW())
ON CONFLICT (entity_type, brand) DO NOTHING;

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_sync_metadata_updated_at
BEFORE UPDATE ON public.sync_metadata
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();
```

### 3. Supabase Client Setup

**server.ts**
```typescript
import 'server-only';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { Database } from '../types/supabase';

export function createServerClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return cookies().get(name)?.value;
        },
      },
    }
  );
}
```

**client.ts**
```typescript
'use client';

import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';

export function createBrowserClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
```

### 4. API Routes Implementation

**/api/sync/properties/route.ts**
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import { createReiApiCcaClient } from '@/lib/api/rei-api-cca/client';
import { BrandType } from '@/lib/api/rei-api-cca/types';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const brand = searchParams.get('brand') as BrandType || 'AZURA';
  const forceSync = searchParams.get('force') === 'true';
  
  try {
    // Create API client
    const apiClient = createReiApiCcaClient({
      brand,
      apiKey: process.env[`REI_API_CCA_${brand}_API_KEY`]!,
      integratorId: process.env[`REI_API_CCA_${brand}_INTEGRATOR_ID`]!,
      secretKey: process.env[`REI_API_CCA_${brand}_SECRET_KEY`]!,
    });
    
    // Create Supabase client
    const supabase = createServerClient();
    
    // Get last sync time
    let lastSyncTime = null;
    if (!forceSync) {
      const { data: syncData } = await supabase
        .from('sync_metadata')
        .select('last_sync_time')
        .eq('entity_type', 'property')
        .eq('brand', brand)
        .single();
      
      lastSyncTime = syncData?.last_sync_time;
    }
    
    // Fetch properties from API
    const startTime = new Date();
    const { properties, totalCount } = await apiClient.getProperties({
      modifiedSince: lastSyncTime,
      take: 100,
      skip: 0
    });
    
    // Process and store properties
    const results = {
      added: 0,
      updated: 0,
      skipped: 0,
      failed: 0
    };
    
    for (const property of properties) {
      try {
        // Check if property exists
        const { data: existingProperty } = await supabase
          .from('properties')
          .select('id')
          .eq('listing_id', property.listingId)
          .single();
        
        if (existingProperty) {
          // Update existing property
          await supabase
            .from('properties')
            .update({
              title: property.title,
              description: property.remarks,
              price: property.price,
              // Add other fields...
              raw_data: property,
              updated_at: new Date().toISOString()
            })
            .eq('id', existingProperty.id);
          
          results.updated++;
        } else {
          // Insert new property
          await supabase
            .from('properties')
            .insert({
              listing_id: property.listingId,
              title: property.title,
              description: property.remarks,
              price: property.price,
              // Add other fields...
              raw_data: property
            });
          
          results.added++;
        }
      } catch (error) {
        console.error(`Error processing property ${property.listingId}:`, error);
        results.failed++;
      }
    }
    
    // Update last sync time
    await supabase
      .from('sync_metadata')
      .update({ last_sync_time: startTime.toISOString() })
      .eq('entity_type', 'property')
      .eq('brand', brand);
    
    const endTime = new Date();
    const durationMs = endTime.getTime() - startTime.getTime();
    
    return NextResponse.json({
      success: true,
      brand,
      totalCount,
      processed: properties.length,
      ...results,
      startTime,
      endTime,
      durationMs
    });
  } catch (error) {
    console.error('Error syncing properties:', error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}
```

### 5. Admin UI Implementation

**/admin/sync/page.tsx**
```tsx
'use client';

import { useState } from 'react';
import { BrandType } from '@/lib/api/rei-api-cca/types';
import SyncStatusPanel from './components/SyncStatusPanel';
import SyncControlPanel from './components/SyncControlPanel';

export default function SyncAdminPage() {
  const [syncStatus, setSyncStatus] = useState<{
    properties: { loading: boolean; result: any | null };
    agents: { loading: boolean; result: any | null };
  }>({ 
    properties: { loading: false, result: null },
    agents: { loading: false, result: null }
  });
  
  const syncProperties = async (brand: BrandType, forceSync: boolean) => {
    setSyncStatus(prev => ({
      ...prev,
      properties: { loading: true, result: null }
    }));
    
    try {
      const response = await fetch(
        `/api/sync/properties?brand=${brand}&force=${forceSync}`
      );
      const result = await response.json();
      
      setSyncStatus(prev => ({
        ...prev,
        properties: { loading: false, result }
      }));
    } catch (error) {
      setSyncStatus(prev => ({
        ...prev,
        properties: { 
          loading: false, 
          result: { success: false, error: String(error) }
        }
      }));
    }
  };
  
  const syncAgents = async (brand: BrandType, forceSync: boolean) => {
    // Similar implementation to syncProperties
  };
  
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Data Synchronization Admin</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <SyncControlPanel 
          onSyncProperties={syncProperties}
          onSyncAgents={syncAgents}
          isLoading={syncStatus.properties.loading || syncStatus.agents.loading}
        />
        
        <SyncStatusPanel 
          propertiesResult={syncStatus.properties.result}
          agentsResult={syncStatus.agents.result}
        />
      </div>
    </div>
  );
}
```

## Conclusion

Phase 2.2 is a critical component of the RE/MAX Blue Ocean website, as it provides the real property and agent data needed for the site. The current implementation has several issues that need to be addressed before we can proceed with confidence.

Based on research and best practices, I strongly recommend implementing Option 1 (complete redesign) following the patterns outlined above. This approach aligns with official Supabase recommendations and will provide a stable foundation for the rest of the project.

The detailed implementation plan provides a clear path forward with proper separation of concerns, type safety, and adherence to Next.js App Router best practices. This will ensure that the REI API integration is stable, maintainable, and scalable.

I recommend taking the time to stabilize this phase properly, even if it means a complete redesign, as this will save time and effort in the long run.
