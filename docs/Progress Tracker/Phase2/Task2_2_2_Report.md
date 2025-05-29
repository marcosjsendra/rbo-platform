# Task 2.2.2: Implement OAuth token management with refresh mechanism

## Task Description
Implement a robust OAuth token management system for the REI API CCA with automatic token refresh capabilities to ensure uninterrupted API access.

## Implementation Summary

We have successfully implemented a comprehensive OAuth token management system with automatic token refresh for the REI API CCA. The implementation includes:

1. A dedicated token management service
2. Automatic token refresh before expiry
3. Background token refresh to prevent request blocking
4. Proper error handling and retry mechanisms
5. Environment variable configuration for credentials and refresh settings

## Components Implemented

### 1. Token Manager (`src/lib/api/token-manager.ts`)

Created a dedicated token management service that handles:
- Token acquisition and caching
- Token validation and expiry checking
- Automatic token refresh before expiration
- Configurable refresh buffer via environment variables

```typescript
// Key features
const TOKEN_REFRESH_BUFFER_MINUTES = typeof process !== 'undefined' && process.env.TOKEN_REFRESH_BUFFER_MINUTES
  ? parseInt(process.env.TOKEN_REFRESH_BUFFER_MINUTES, 10)
  : 30;

// Token cache with refresh mechanism
interface TokenCacheEntry {
  token: string;
  expiresAt: number;
  refreshAt: number;
}

// Functions for token management
export async function getValidToken(credentials: ApiCredentials): Promise<string>
export async function forceRefreshToken(credentials: ApiCredentials): Promise<string>
export function tokenNeedsRefresh(credentials: ApiCredentials): boolean
```

### 2. Enhanced API Client (`src/lib/api/rei-api-cca.ts`)

Updated the REI API CCA client to:
- Use the token management service
- Check for token expiry before making requests
- Automatically refresh tokens when needed
- Handle 401 errors by refreshing tokens and retrying requests
- Support both GET and POST requests with proper error handling

```typescript
// Enhanced makeRequest method with token refresh
async makeRequest(
  endpoint: string, 
  options: { method?: 'GET' | 'POST'; data?: unknown } = { method: 'GET' }
): Promise<Record<string, unknown>> {
  // Check if token needs refresh before making the request
  if (tokenNeedsRefresh(this.credentials)) {
    await forceRefreshToken(this.credentials);
  }
  
  // Handle token-related errors with automatic retry
  if (axios.isAxiosError(error) && error.response?.status === 401) {
    // Force refresh the token and retry the request
    await forceRefreshToken(this.credentials);
    return this.makeRequest(endpoint, options);
  }
}
```

### 3. Server-Side API Routes

#### Authentication Route (`src/app/api/rei-cca/auth/route.ts`)

- Implemented token caching with refresh mechanism
- Added support for forced token refresh
- Enhanced error handling and logging
- Improved security by masking sensitive credentials in logs

#### API Proxy Route (`src/app/api/rei-cca/route.ts`)

- Added background token refresh to prevent blocking requests
- Implemented proper token expiry and refresh time calculation
- Enhanced error handling and logging

### 4. Environment Variables Configuration

- Created `.env.example` with documentation for required variables
- Implemented separate environment variables for each brand (AZURA and BLUE OCEAN)
- Added configurable token refresh buffer setting

```
# REI API CCA Credentials for RE/MAX AZURA
REMAX_AZURA_API_URL=https://remax-cca.com/api/v1
REMAX_AZURA_API_KEY=your-api-key-here
REMAX_AZURA_INTEGRATOR_ID=your-integrator-id-here
REMAX_AZURA_SECRET_KEY=your-secret-key-here

# REI API CCA Credentials for RE/MAX BLUE OCEAN
REMAX_BLUE_OCEAN_API_URL=https://remax-cca.com/api/v1
REMAX_BLUE_OCEAN_API_KEY=your-api-key-here
REMAX_BLUE_OCEAN_INTEGRATOR_ID=your-integrator-id-here
REMAX_BLUE_OCEAN_SECRET_KEY=your-secret-key-here

# Token Refresh Settings
TOKEN_REFRESH_BUFFER_MINUTES=30
```

## Challenges and Solutions

### Challenge 1: Token Refresh Without Blocking Requests

**Problem**: Refreshing tokens could potentially block API requests, causing delays.

**Solution**: Implemented a background token refresh mechanism that allows requests to proceed with the current valid token while refreshing in the background.

```typescript
// If token is due for refresh but still valid, refresh in background
if (tokenCache[cacheKey].refreshAt <= now) {
  console.log(`[Server] Token for ${integratorId} due for refresh, refreshing in background`);
  // Refresh token in background but still return the current valid token
  refreshTokenInBackground(integratorId);
}
return tokenCache[cacheKey].token;
```

### Challenge 2: Handling 401 Unauthorized Errors

**Problem**: When tokens expire unexpectedly, API requests would fail with 401 errors.

**Solution**: Implemented automatic token refresh and request retry when 401 errors are encountered.

```typescript
// Handle token-related errors
if (axios.isAxiosError(error) && error.response?.status === 401) {
  console.log(`[Client] Received 401 Unauthorized, attempting token refresh`);
  
  try {
    // Force refresh the token
    await forceRefreshToken(this.credentials);
    
    // Retry the request
    console.log(`[Client] Retrying request to ${endpoint} after token refresh`);
    return this.makeRequest(endpoint, options);
  } catch (refreshError) {
    console.error(`[Client] Token refresh failed:`, refreshError);
    throw new Error(`Token refresh failed: ${refreshError instanceof Error ? refreshError.message : 'Unknown error'}`);
  }
}
```

### Challenge 3: Environment-Specific Configuration

**Problem**: Different environments (development, production) need different credentials.

**Solution**: Implemented environment variable support with fallback to default values, allowing for flexible configuration across environments.

## Testing

The implementation was tested with the following scenarios:

1. Initial token acquisition
2. Using cached tokens for subsequent requests
3. Automatic token refresh when approaching expiry
4. Handling 401 errors with token refresh and retry
5. Force refreshing tokens when needed

## Next Steps

1. Implement token refresh monitoring and alerting
2. Add metrics collection for token usage and refresh patterns
3. Enhance security by implementing secure token storage
4. Add unit and integration tests for the token management system

## Related Tasks

- [x] 2.2.1 Create API service module for REI API CCA
- [ ] 2.2.3 Set up environment variables for API credentials
- [ ] 2.2.4 Create Supabase client utilities for server and client components
- [ ] 2.2.5 Implement data synchronization service
