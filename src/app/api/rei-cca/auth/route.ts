/**
 * src/app/api/rei-cca/auth/route.ts
 *
 * Authentication endpoint for REI API CCA
 *
 * This route handles authentication with the REI API CCA,
 * obtaining and managing access tokens with automatic refresh capabilities.
 */

import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import {
  REMAX_AZURA_CREDENTIALS,
  REMAX_BLUE_OCEAN_CREDENTIALS,
} from "@/lib/api";
import { TokenResponse, ApiCredentials } from "@/lib/api/rei-api-cca";

/**
 * Gets the API credentials for a given integrator ID
 * @param integratorId - The integrator ID to get credentials for
 * @returns The API credentials for the integrator ID
 */
function getCredentialsForIntegrator(integratorId: string) {
  if (integratorId === REMAX_AZURA_CREDENTIALS.integratorId) {
    return REMAX_AZURA_CREDENTIALS;
  } else if (integratorId === REMAX_BLUE_OCEAN_CREDENTIALS.integratorId) {
    return REMAX_BLUE_OCEAN_CREDENTIALS;
  }
  throw new Error(`Invalid integrator ID: ${integratorId}`);
}

// Token cache with refresh mechanism
const tokenCache: Record<string, { token: string; expiresAt: number; refreshAt: number }> = {};

/**
 * POST handler for authentication requests
 * @param request - The incoming request
 * @returns A response with the authentication result
 */
export async function POST(request: NextRequest) {
  try {
    // Get the integrator ID from the request body
    const body = await request.json();
    const { integratorId, forceRefresh } = body;

    if (!integratorId) {
      return NextResponse.json(
        {
          status: "error",
          message: "Missing required parameter: integratorId",
        },
        { status: 400 }
      );
    }

    // Get credentials for the integrator
    const credentials = getCredentialsForIntegrator(integratorId);
    
    // Check if we should force a refresh or if we have a valid cached token
    const cacheKey = integratorId;
    const now = Date.now();
    
    if (!forceRefresh && tokenCache[cacheKey] && tokenCache[cacheKey].expiresAt > now) {
      console.log(`[Server/Auth] Using cached token for ${integratorId}`);
      
      // If token is due for refresh but still valid, refresh in background
      if (tokenCache[cacheKey].refreshAt <= now) {
        console.log(`[Server/Auth] Token for ${integratorId} due for refresh, refreshing in background`);
        // Don't await, let it run in background
        refreshTokenInBackground(credentials);
      }
      
      // Return the cached token
      return NextResponse.json({
        status: "ok",
        message: "Authentication successful (cached)",
        data: {
          access_token: tokenCache[cacheKey].token,
          token_type: "bearer",
          expires_in: Math.floor((tokenCache[cacheKey].expiresAt - now) / 1000),
          refresh_at: new Date(tokenCache[cacheKey].refreshAt).toISOString(),
          expires_at: new Date(tokenCache[cacheKey].expiresAt).toISOString(),
        },
      });
    }

    // Get a new token
    const tokenResponse = await getNewToken(credentials);
    
    // Return the successful response
    return NextResponse.json({
      status: "ok",
      message: "Authentication successful",
      data: {
        ...tokenResponse,
        refresh_at: new Date(tokenCache[cacheKey].refreshAt).toISOString(),
        expires_at: new Date(tokenCache[cacheKey].expiresAt).toISOString(),
      },
    });
  } catch (error) {
    console.error("[Server/Auth] Authentication failed:", error);

    // Handle axios error with detailed information
    if (axios.isAxiosError(error) && error.response) {
      console.error("[Server/Auth] Response status:", error.response.status);
      console.error("[Server/Auth] Response data:", error.response.data);
      console.error("[Server/Auth] Response headers:", error.response.headers);

      return NextResponse.json(
        {
          status: "error",
          message: "Authentication failed",
          error: error.response.data?.message || error.message,
          details: error.response.data,
        },
        { status: error.response.status }
      );
    }

    // Handle other errors
    return NextResponse.json(
      {
        status: "error",
        message: "Authentication failed",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

/**
 * Refreshes a token in the background without blocking the current request
 * @param credentials - The API credentials to refresh the token for
 */
async function refreshTokenInBackground(credentials: ApiCredentials): Promise<void> {
  try {
    console.log(`[Server/Auth] Starting background token refresh for ${credentials.integratorId}`);
    await getNewToken(credentials);
    console.log(`[Server/Auth] Background token refresh completed for ${credentials.integratorId}`);
  } catch (error) {
    console.error(`[Server/Auth] Background token refresh failed for ${credentials.integratorId}:`, error);
    // We don't throw here since this is a background operation
  }
}

/**
 * Gets a new token from the API and caches it
 * @param credentials - The API credentials to get a token for
 * @returns The new token response
 */
async function getNewToken(credentials: ApiCredentials): Promise<TokenResponse> {
  const cacheKey = credentials.integratorId;

  try {
    console.log(`[Server/Auth] Getting new token for ${credentials.integratorId}`, {
      url: `${credentials.apiUrl}/oauth/token`,
      integratorId: credentials.integratorId,
    });

    // Use the exact token endpoint from documentation
    const tokenUrl = `${credentials.apiUrl}/oauth/token`;

    // Standard OAuth 2.0 password grant type with form-urlencoded format
    const params = new URLSearchParams();
    params.append("grant_type", "password"); // Use password grant type as specified in docs
    params.append("apikey", credentials.apiKey);
    params.append("integratorID", credentials.integratorId); // Use exact case as in documentation
    params.append("secretkey", credentials.secretKey);

    const requestBody = params.toString();

    // Log detailed information for debugging (with sensitive info masked)
    console.log("[Server/Auth] Request details:", {
      url: tokenUrl,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cache-Control": "no-cache",
        Accept: "application/json",
      },
      credentials: {
        apiUrl: credentials.apiUrl,
        apiKey: `${credentials.apiKey.substring(0, 5)}...${credentials.apiKey.substring(credentials.apiKey.length - 5)}`,
        integratorId: credentials.integratorId,
        secretKey: `${credentials.secretKey.substring(0, 5)}...${credentials.secretKey.substring(credentials.secretKey.length - 5)}`,
      },
    });

    const response = await axios.post(tokenUrl, requestBody, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cache-Control": "no-cache",
        Accept: "application/json",
      },
    });

    // Get token response data
    const tokenResponse = response.data as TokenResponse;
    
    // Convert expires_in from seconds to milliseconds
    const expiryMs = tokenResponse.expires_in * 1000;
    
    // Calculate absolute expiry time
    const expiresAt = Date.now() + expiryMs;
    
    // Calculate refresh time (30 minutes before expiry)
    const refreshBuffer = 30 * 60 * 1000; // 30 minutes
    const refreshAt = expiresAt - refreshBuffer;

    // Cache the token with expiry and refresh times
    tokenCache[cacheKey] = {
      token: tokenResponse.access_token,
      expiresAt: expiresAt,
      refreshAt: refreshAt
    };

    console.log(`[Server/Auth] Successfully obtained new token for ${credentials.integratorId}`, {
      expiresAt: new Date(expiresAt).toISOString(),
      refreshAt: new Date(refreshAt).toISOString(),
      expiresIn: `${tokenResponse.expires_in} seconds`
    });
    
    return tokenResponse;
  } catch (error) {
    console.error(`[Server/Auth] Error getting token for ${credentials.integratorId}:`, error);

    // Handle axios error
    if (axios.isAxiosError(error) && error.response) {
      console.error(`[Server/Auth] Response status:`, error.response.status);
      console.error(`[Server/Auth] Response data:`, error.response.data);
      console.error(`[Server/Auth] Response headers:`, error.response.headers);
      throw new Error(
        `Failed to get access token: ${
          error.response.data?.message || error.message
        }`
      );
    }

    // Handle other errors
    throw new Error(
      `Failed to get access token: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}
