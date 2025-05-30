/**
 * src/app/api/rei-cca/route.ts
 *
 * Server-side API route for REI API CCA
 *
 * This route acts as a proxy between the client and the REI API CCA,
 * handling authentication and forwarding requests to avoid CORS issues.
 * 
 * Uses the token management service for OAuth token handling with automatic refresh.
 */

import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import {
  REMAX_AZURA_CREDENTIALS,
  REMAX_BLUE_OCEAN_CREDENTIALS,
} from "@/lib/api";
import { TokenResponse } from "@/lib/api/rei-api-cca";

// Cache for access tokens with refresh mechanism
const tokenCache: Record<string, { token: string; expiresAt: number; refreshAt: number }> = {};

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

/**
 * Ensures we have a valid token for API requests
 * @param integratorId - The integrator ID to authenticate with
 * @returns A valid access token
 */
async function ensureValidToken(integratorId: string): Promise<string> {
  const credentials = getCredentialsForIntegrator(integratorId);
  const cacheKey = integratorId;

  // Check if we have a valid token in cache
  const now = Date.now();
  if (tokenCache[cacheKey]) {
    // If token is still valid and not due for refresh
    if (tokenCache[cacheKey].expiresAt > now) {
      // Check if we should proactively refresh the token
      if (tokenCache[cacheKey].refreshAt <= now) {
        console.log(`[Server] Token for ${integratorId} due for refresh, refreshing in background`);
        // Refresh token in background but still return the current valid token
        refreshTokenInBackground(integratorId);
      } else {
        console.log(`[Server] Using cached token for ${integratorId}`);
      }
      return tokenCache[cacheKey].token;
    }
    console.log(`[Server] Token for ${integratorId} has expired, getting new token`);
  } else {
    console.log(`[Server] No token found for ${integratorId}, getting new token`);
  }

  // Get a new token
  return await getNewToken(integratorId);
}

/**
 * Refreshes a token in the background without blocking the current request
 * @param integratorId - The integrator ID to refresh the token for
 */
async function refreshTokenInBackground(integratorId: string): Promise<void> {
  try {
    console.log(`[Server] Starting background token refresh for ${integratorId}`);
    await getNewToken(integratorId);
    console.log(`[Server] Background token refresh completed for ${integratorId}`);
  } catch (error) {
    console.error(`[Server] Background token refresh failed for ${integratorId}:`, error);
    // We don't throw here since this is a background operation
  }
}

/**
 * Gets a new token from the API and caches it
 * @param integratorId - The integrator ID to get a token for
 * @returns The new token
 */
async function getNewToken(integratorId: string): Promise<string> {
  const credentials = getCredentialsForIntegrator(integratorId);
  const cacheKey = integratorId;

  try {
    console.log(`[Server] Getting new token for ${integratorId}`, {
      url: `${credentials.apiUrl}/oauth/token`,
      apiKey: credentials.apiKey,
      integratorId: credentials.integratorId,
    });

    // Get a new token from the API
    const tokenUrl = `${credentials.apiUrl}/oauth/token`;

    // Standard OAuth 2.0 password grant type with form-urlencoded format
    const params = new URLSearchParams();
    params.append("grant_type", "password"); // Use password grant type as specified in docs
    params.append("apikey", credentials.apiKey);
    params.append("integratorID", credentials.integratorId); // Use exact case as in documentation
    params.append("secretkey", credentials.secretKey);

    const requestBody = params.toString();

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

    console.log(`[Server] Successfully obtained new token for ${integratorId}`, {
      expiresAt: new Date(expiresAt).toISOString(),
      refreshAt: new Date(refreshAt).toISOString(),
      expiresIn: `${tokenResponse.expires_in} seconds`
    });
    
    return tokenResponse.access_token;
  } catch (error) {
    console.error(`[Server] Error getting token for ${integratorId}:`, error);

    // Handle axios error
    if (axios.isAxiosError(error) && error.response) {
      console.error(`[Server] Response status:`, error.response.status);
      console.error(`[Server] Response data:`, error.response.data);
      console.error(`[Server] Response headers:`, error.response.headers);
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

/**
 * GET handler for API requests
 * @param request - The incoming request
 * @returns A response with the API data or an error
 */
export async function GET(request: NextRequest) {
  // Extract query parameters
  const searchParams = request.nextUrl.searchParams;
  const endpoint = searchParams.get("endpoint");
  const integratorId = searchParams.get("integratorId");

  // Log the request details
  console.log(`[Server] Received API request:`, {
    endpoint,
    integratorId,
  });

  // For testing authentication
  const testAuth = searchParams.get("testAuth");
  if (testAuth) {
    try {
      // Test authentication by getting a token
      await ensureValidToken(testAuth);

      return NextResponse.json({
        status: "ok",
        message: "Authentication successful",
        integrator: testAuth,
        tokenExpiry: tokenCache[testAuth]?.expiresAt,
      });
    } catch (error) {
      console.error(
        `[Server] Authentication test failed for ${testAuth}:`,
        error
      );
      return NextResponse.json(
        {
          status: "error",
          message: "Authentication failed",
          error: error instanceof Error ? error.message : String(error),
        },
        { status: 401 }
      );
    }
  }

  // Ensure required parameters are provided
  if (!endpoint || !integratorId) {
    return NextResponse.json(
      {
        status: "error",
        message: "Missing required parameters: endpoint and integratorId",
      },
      { status: 400 }
    );
  }

  try {
    // Get credentials based on integratorId
    const credentials = getCredentialsForIntegrator(integratorId);

    // Get a valid token
    const token = await ensureValidToken(integratorId);

    // Ensure the endpoint has the correct format
    const formattedEndpoint = endpoint.startsWith("/")
      ? endpoint.substring(1)
      : endpoint;

    // Forward the request to the REI API CCA
    console.log(
      `[Server] Forwarding request to REI API CCA: ${formattedEndpoint}`
    );
    const response = await axios.get(
      `${credentials.apiUrl}/${formattedEndpoint}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "X-API-KEY": credentials.apiKey,
        },
      }
    );

    console.log(`[Server] Successfully forwarded request to REI API CCA`);
    return NextResponse.json(response.data);
  } catch (error: unknown) {
    console.error(`[Server] Error forwarding request to REI API CCA:`, error);
    console.error(`[Server] Error details:`, {
      message: error instanceof Error ? error.message : String(error),
    });
    
    // Check if it's an Axios error with response data
    if (axios.isAxiosError(error) && error.response) {
      console.error(`[Server] Response details:`, {
        data: error.response.data,
        status: error.response.status
      });
    }

    return NextResponse.json(
      {
        status: "error",
        message: "API request failed",
        error: axios.isAxiosError(error) && error.response ? error.response.data : (error instanceof Error ? error.message : String(error)),
        statusCode: axios.isAxiosError(error) && error.response ? error.response.status : 500,
      },
      { status: axios.isAxiosError(error) && error.response ? error.response.status : 500 }
    );
  }
}
