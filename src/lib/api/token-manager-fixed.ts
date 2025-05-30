/**
 * src/lib/api/token-manager-fixed.ts
 * 
 * OAuth Token Management Service - Fixed Version
 * 
 * This module provides functionality for managing OAuth tokens for the REI API CCA,
 * including token acquisition, storage, validation, and automatic refresh.
 */

import axios from 'axios';
import { ApiCredentials, TokenResponse } from './rei-api-cca';

// Interface for token cache entry
interface TokenCacheEntry {
  token: string;
  expiresAt: number;
  refreshAt: number;
}

// Token cache structure
interface TokenCache {
  [key: string]: TokenCacheEntry;
}

// Default token cache
const tokenCache: TokenCache = {};

// Buffer time (in ms) before token expiry when we should refresh
// Get from environment variable or default to 30 minutes
// Use NEXT_PUBLIC_ prefix for client-side access
const TOKEN_REFRESH_BUFFER_MINUTES = typeof process !== 'undefined' && 
  (process.env.NEXT_PUBLIC_TOKEN_REFRESH_BUFFER_MINUTES || process.env.TOKEN_REFRESH_BUFFER_MINUTES)
  ? parseInt(process.env.NEXT_PUBLIC_TOKEN_REFRESH_BUFFER_MINUTES || process.env.TOKEN_REFRESH_BUFFER_MINUTES as string, 10)
  : 30;

// Convert minutes to milliseconds
const TOKEN_REFRESH_BUFFER = TOKEN_REFRESH_BUFFER_MINUTES * 60 * 1000;

// Log the configured refresh buffer
console.log(`[TokenManager] Token refresh buffer set to ${TOKEN_REFRESH_BUFFER_MINUTES} minutes`);


/**
 * Get a cached token if it's valid and not due for refresh
 * 
 * @param cacheKey - The cache key for the token
 * @returns The cached token if valid, null otherwise
 */
function getCachedToken(cacheKey: string): string | null {
  const cachedEntry = tokenCache[cacheKey];
  
  if (!cachedEntry) {
    console.log(`[TokenManager] No cached token found for ${cacheKey}`);
    return null;
  }
  
  const now = Date.now();
  
  // If token is expired, return null
  if (cachedEntry.expiresAt <= now) {
    console.log(`[TokenManager] Cached token for ${cacheKey} has expired`);
    return null;
  }
  
  // If token should be refreshed, return null
  if (cachedEntry.refreshAt <= now) {
    console.log(`[TokenManager] Cached token for ${cacheKey} is due for refresh`);
    return null;
  }
  
  console.log(`[TokenManager] Using cached token for ${cacheKey}`);
  return cachedEntry.token;
}

/**
 * Cache a token with appropriate expiry and refresh times
 * 
 * @param cacheKey - The cache key for the token
 * @param token - The token to cache
 * @param expiresIn - The token expiry time in seconds
 */
function cacheToken(cacheKey: string, token: string, expiresIn: number): void {
  // Convert expiresIn from seconds to milliseconds
  const expiryMs = expiresIn * 1000;
  
  // Calculate absolute expiry time
  const expiresAt = Date.now() + expiryMs;
  
  // Calculate refresh time (expiresAt - buffer)
  const refreshAt = expiresAt - TOKEN_REFRESH_BUFFER;
  
  // Store token in cache
  tokenCache[cacheKey] = {
    token,
    expiresAt,
    refreshAt
  };
  
  console.log(`[TokenManager] Cached token for ${cacheKey}`, {
    expiresAt: new Date(expiresAt).toISOString(),
    refreshAt: new Date(refreshAt).toISOString(),
    expiresIn: `${expiresIn} seconds`
  });
}

/**
 * Acquire a new token from the REI API CCA
 * 
 * @param credentials - The API credentials to use
 * @returns The token response
 */
async function acquireToken(credentials: ApiCredentials): Promise<TokenResponse> {
  try {
    console.log(`[TokenManager] Acquiring new token for ${credentials.integratorId}`);
    
    // Make a request directly to the REI API CCA token endpoint
    // Using URL-encoded form data as required by OAuth2 standard
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('client_id', credentials.apiKey);
    params.append('client_secret', credentials.secretKey);
    
    // Simplified axios call to avoid any syntax errors
    const response = await axios({
      method: 'post',
      url: `${credentials.apiUrl}/oauth/token`,
      data: params,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'X-Integrator-Id': credentials.integratorId
      }
    });
    
    // The OAuth token endpoint returns the token directly in the response data
    if (!response.data?.access_token) {
      console.error(`[TokenManager] Invalid token response:`, response.data);
      throw new Error('Invalid token response: missing access_token');
    }
    
    console.log(`[TokenManager] Successfully acquired token for ${credentials.integratorId}`);
    return response.data as TokenResponse;
  } catch (error) {
    console.error(`[TokenManager] Error acquiring token for ${credentials.integratorId}:`, error);
    
    // Provide more detailed error information
    if (axios.isAxiosError(error) && error.response) {
      console.error(`[TokenManager] Response status:`, error.response.status);
      console.error(`[TokenManager] Response data:`, error.response.data);
      throw new Error(`Failed to acquire token: ${error.message}`);
    }
    
    throw new Error(`Failed to acquire token: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Get a valid token, either from cache or by acquiring a new one
 * 
 * @param credentials - The API credentials to use
 * @returns A valid token
 */
export async function getValidToken(credentials: ApiCredentials): Promise<string> {
  const cacheKey = credentials.integratorId;
  
  // Try to get a cached token
  const cachedToken = getCachedToken(cacheKey);
  if (cachedToken) {
    return cachedToken;
  }
  
  // Acquire a new token
  const tokenResponse = await acquireToken(credentials);
  
  // Cache the token
  cacheToken(cacheKey, tokenResponse.access_token, tokenResponse.expires_in);
  
  return tokenResponse.access_token;
}

/**
 * Force refresh a token regardless of its current state
 * 
 * @param credentials - The API credentials to use
 * @returns A new valid token
 */
export async function forceRefreshToken(credentials: ApiCredentials): Promise<string> {
  console.log(`[TokenManager] Force refreshing token for ${credentials.integratorId}`);
  
  // Remove the token from cache
  const cacheKey = credentials.integratorId;
  delete tokenCache[cacheKey];
  
  // Acquire a new token
  const tokenResponse = await acquireToken(credentials);
  
  // Cache the token
  cacheToken(cacheKey, tokenResponse.access_token, tokenResponse.expires_in);
  
  return tokenResponse.access_token;
}

/**
 * Check if a token needs to be refreshed
 * 
 * @param credentials - The API credentials to check
 * @returns True if the token needs to be refreshed, false otherwise
 */
export function tokenNeedsRefresh(credentials: ApiCredentials): boolean {
  const cacheKey = credentials.integratorId;
  const cachedEntry = tokenCache[cacheKey];
  
  if (!cachedEntry) {
    return true;
  }
  
  const now = Date.now();
  return cachedEntry.refreshAt <= now;
}

/**
 * Get token expiry information
 * 
 * @param credentials - The API credentials to check
 * @returns Token expiry information or null if no token is cached
 */
export function getTokenExpiryInfo(credentials: ApiCredentials): { expiresAt: Date; refreshAt: Date } | null {
  const cacheKey = credentials.integratorId;
  const cachedEntry = tokenCache[cacheKey];
  
  if (!cachedEntry) {
    return null;
  }
  
  return {
    expiresAt: new Date(cachedEntry.expiresAt),
    refreshAt: new Date(cachedEntry.refreshAt)
  };
}

/**
 * Clear all tokens from the cache
 */
export function clearTokenCache(): void {
  Object.keys(tokenCache).forEach(key => {
    delete tokenCache[key];
  });
  console.log('[TokenManager] Token cache cleared');
}

/**
 * Clear a specific token from the cache
 * 
 * @param integratorId - The integrator ID to clear the token for
 */
export function clearToken(integratorId: string): void {
  delete tokenCache[integratorId];
  console.log(`[TokenManager] Token for ${integratorId} cleared from cache`);
}
