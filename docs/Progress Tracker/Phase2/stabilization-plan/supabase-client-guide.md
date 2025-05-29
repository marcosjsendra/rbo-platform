# Supabase Client Utilities Guide

This guide explains how to use the Supabase client utilities implemented for the RE/MAX Blue Ocean website. These utilities provide optimized ways to interact with Supabase from different contexts in a Next.js App Router application.

## Overview

We've implemented three main client utilities for different contexts:

1. **Server Component Client** - For use in Server Components
2. **Client Component Client** - For use in Client Components
3. **Route Handler Client** - For use in API Routes

These utilities are built using the `@supabase/supabase-js` package for a simplified and reliable implementation with Next.js App Router.

## Import Structure

To prevent errors with server-only code being imported in client components, we've separated the client utilities into different files:

- **Server Components & API Routes**: Import from `@/lib/supabase/server`
- **Client Components**: Import from `@/lib/supabase/client`
- **Types**: Import from `@/lib/types/supabase`

## Environment Variables

All Supabase clients require the following environment variables:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Usage Examples

### In Server Components

Server Components can directly fetch data from Supabase without client-side JavaScript:

```tsx
// In a Server Component
import { createServerComponentClient } from '@/lib/supabase/server'

export default async function ServerComponent() {
  // Create a Supabase client for server components
  // No need to await the client creation
  const supabase = createServerComponentClient()
  
  // Fetch data from Supabase (await the query operation)
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .limit(10)
  
  if (error) {
    console.error('Error fetching properties:', error)
    return <div>Error loading properties</div>
  }
  
  return (
    <div>
      <h1>Properties</h1>
      <ul>
        {data.map(property => (
          <li key={property.id}>
            {property.title} - {property.location}
            {property.price && (
              <span> - {property.currency} {property.price.toLocaleString()}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
```

### In Client Components

Client Components need to use React hooks to manage state and effects:

```tsx
'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@/lib/supabase/client'
import type { Database } from '@/lib/types/supabase'

export default function ClientComponent() {
  const [properties, setProperties] = useState<Database['public']['Tables']['properties']['Row'][]>([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    // Create a Supabase client for client components
    const supabase = createClientComponentClient()
    
    async function fetchProperties() {
      console.log('Fetching properties from client component')
      
      // Fetch data from Supabase
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .limit(10)
      
      if (error) {
        console.error('Error fetching properties:', error)
        return
      }
      
      setProperties(data || [])
      setLoading(false)
    }
    
    fetchProperties()
  }, [])
  
  if (loading) return <div>Loading...</div>
  
  return (
    <div>
      <h1>Properties</h1>
      <ul>
        {properties.map(property => (
          <li key={property.id}>{property.title}</li>
        ))}
      </ul>
    </div>
  )
}
```

### In API Routes (Route Handlers)

API Routes can use the Route Handler Client to interact with Supabase:

```tsx
// In a Route Handler (app/api/properties/route.ts)
import { NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  // Create a Supabase client for route handlers
  // No need to await the client creation
  const supabase = createRouteHandlerClient()
  
  // Fetch data from Supabase (await the query operation)
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .limit(10)
  
  if (error) {
    console.error('src/app/api/properties/route.ts: Error fetching properties:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  
  return NextResponse.json({ data })
}
```

## TypeScript Support

The Supabase clients are fully typed with TypeScript. The Database type is defined in `src/lib/types/supabase.ts` and includes the schema for all tables in the database.

You can use these types in your components:

```tsx
import type { Database } from '@/lib/types/supabase'

// Type for a property row
type Property = Database['public']['Tables']['properties']['Row']

// Type for property insert
type PropertyInsert = Database['public']['Tables']['properties']['Insert']
```

## Best Practices

1. **Use the right client for the context**:
   - Server Components → `createServerComponentClient`
   - Client Components → `createClientComponentClient`
   - API Routes → `createRouteHandlerClient`

2. **Error Handling**: Always handle errors from Supabase operations.

3. **TypeScript**: Use the provided types for better type safety.

4. **Authentication**: The clients handle cookie-based authentication automatically.

5. **Environment Variables**: Ensure your environment variables are correctly set up.

## Example Page

Visit `/supabase-examples` to see working examples of both server and client components using Supabase.

## API Reference

### `createServerComponentClient()`

Creates a Supabase client for use in Server Components.

### `createClientComponentClient()`

Creates a Supabase client for use in Client Components.

### `createRouteHandlerClient()`

Creates a Supabase client for use in API Routes with full cookie management.

### `createBrowserClient()` (alias for `createClientComponentClient`)

Backward compatibility alias.

### `createClient()`

Backward compatibility alias that returns the appropriate client based on context.
