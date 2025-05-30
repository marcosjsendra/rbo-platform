# RE/MAX Real Estate Website - Implementation Plan

## 1. Project Overview

### Objectives

- Create a modern real estate website for RE/MAX AZURA and RE/MAX BLUE OCEAN
- Implement property and agent listings with data from REI API CCA
- Store data in Supabase for improved performance and reliability
- Provide search and filtering functionality for property listings
- Deliver responsive, accessible, and SEO-optimized user experience

### Core Features

- **Property Listings**: Grid/list view with filtering and sorting
- **Property Details**: Image gallery, specifications, location map
- **Agent Directory**: Agent cards with contact information
- **Search & Filtering**: Advanced search with multiple criteria
- **Realtime Updates**: Live property status changes

## 2. Technology Stack

### Core Technologies

- **Frontend Framework**: Next.js 14 (App Router) with TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI (built on Radix UI primitives)
- **State Management**: React Query (TanStack Query)
- **HTTP Client**: Axios
- **Form Handling**: React Hook Form with Zod
- **Maps**: Mapbox / Google Maps
- **Deployment**: Vercel
- **Authentication**: NextAuth.js
- **Database**: Supabase PostgreSQL
- **ORM**: Prisma

## 3. REI API CCA Integration (Updated May 29, 2025)

### Authentication Configuration ✅

#### Stable Configuration
- **Base URL**: https://remax-cca.com/api/v1/oauth/token
- **Grant Type**: password
- **Parameters**: 
  - integratorID (capital ID)
  - apikey
  - secretkey
- **Content-Type**: application/x-www-form-urlencoded
- **Token Validity**: 24 hours (86399 seconds)

#### Critical Stability Rules
1. Never use `/reiapi` path in URLs
2. Always use password grant type for authentication
3. Maintain exact parameter casing (especially 'integratorID')
4. Include all three credentials in form data
5. Keep minimal standard headers
6. Implement proper token refresh before 24-hour expiry

#### Implementation Guidelines
1. **Token Management**
   ```typescript
   // In token-manager.ts
   class TokenManager {
     private tokenCache: Map<string, TokenData>;
     private readonly REFRESH_THRESHOLD = 3600; // Refresh 1 hour before expiry

     async getToken(office: 'AZURA' | 'BLUE_OCEAN'): Promise<string> {
       const cached = this.tokenCache.get(office);
       if (this.isTokenValid(cached)) {
         return cached.token;
       }
       return this.refreshToken(office);
     }

     private isTokenValid(data: TokenData): boolean {
       if (!data) return false;
       const expiresAt = data.issuedAt + data.expiresIn;
       const now = Date.now() / 1000;
       return expiresAt - now > this.REFRESH_THRESHOLD;
     }
   }
   ```

2. **Error Handling**
   ```typescript
   // In error-handler.ts
   class ApiErrorHandler {
     handleAuthError(error: ApiError): void {
       if (error.type === 'unauthorized_client') {
         // Trigger token refresh
       } else if (error.status === 404) {
         // Check URL configuration
       }
       // Log error for monitoring
     }
   }
   ```

3. **Monitoring**
   ```typescript
   // In monitoring.ts
   class ApiMonitoring {
     trackTokenUsage(office: string): void {
       // Track token usage metrics
     }

     trackAuthSuccess(office: string): void {
       // Track successful authentications
     }
   }
   ```

### API Endpoints

1. **Properties**
   - GET /api/v1/GetProperties/take/{take}/skip/{skip}
   - GET /api/v1/GetPropertyDetails/{listingid}
   - GET /api/v1/propertyimages/{listingid}

2. **Agents**
   - GET /api/v1/associates/take/{take}/skip/{skip}
   - GET /api/v1/associates/{associateid}

3. **Lookups**
   - GET /api/v1/lookups/names
   - GET /api/v1/lookups/detailsbyid/{id}
   - GET /api/v1/geo/* (various geo endpoints)

## 4. Database Schema

### Properties Table
```sql
CREATE TABLE properties (
  id SERIAL PRIMARY KEY,
  listing_id TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  price DECIMAL(12,2),
  bedrooms INTEGER,
  bathrooms INTEGER,
  property_type TEXT,
  status TEXT,
  location JSONB,
  features JSONB,
  images JSONB,
  last_sync TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Agents Table
```sql
CREATE TABLE agents (
  id SERIAL PRIMARY KEY,
  agent_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  bio TEXT,
  image_url TEXT,
  specializations JSONB,
  last_sync TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Zones Table
```sql
CREATE TABLE zones (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  description TEXT,
  image_url TEXT,
  location JSONB,
  features JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 5. Project Constraints

### Technical Constraints

1. **API Integration**
   - Token expiration every 24 hours
   - Rate limiting considerations
   - Data format standardization needs
   - Proper attribution of listing data to RE/MAX

2. **User Experience**
   - Responsive design across devices
   - Accessibility compliance (WCAG)
   - Load time optimization
   - Browser compatibility

3. **Security**
   - Secure credential storage
   - Token management
   - Data access control
   - API request validation

### Implementation Constraints

1. **Resource Constraints**
   - Development timeline
   - Edge Function limits
   - Vercel deployment limits
   - Testing requirements

2. **Integration Constraints**
   - Sync frequency limits
   - Error handling
   - Data transformation
   - Status change handling

### Mitigation Strategies

1. **API Stability**
   - Follow established authentication rules
   - Implement comprehensive error handling
   - Monitor API health and usage
   - Regular token refresh implementation

2. **Performance**
   - Image optimization
   - Lazy loading
   - Efficient caching
   - Query optimization

3. **Data Integrity**
   - Validation at all levels
   - Comprehensive logging
   - Automated testing
   - Sync monitoring

## 6. Documentation

- Full API documentation: `/docs/API/`
- Error reports and fixes: `/docs/Errors/`
- Progress tracking: `/docs/Progress Tracker/`
- Authentication stabilization report: `/docs/Errors/fixedReport/phase2/REI_API_CCA_Authentication_Stabilization.md`