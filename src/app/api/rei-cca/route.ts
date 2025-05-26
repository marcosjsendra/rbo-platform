/**
 * src/app/api/rei-cca/route.ts
 *
 * Server-side API route for REI API CCA
 *
 * This route acts as a proxy between the client and the REI API CCA,
 * handling authentication and forwarding requests to avoid CORS issues.
 */

import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import {
  REMAX_AZURA_CREDENTIALS,
  REMAX_BLUE_OCEAN_CREDENTIALS,
} from "@/lib/api";

// Cache for access tokens
const tokenCache: Record<string, { token: string; expiresAt: number }> = {};

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
  if (tokenCache[cacheKey] && tokenCache[cacheKey].expiresAt > Date.now()) {
    console.log(`[Server] Using cached token for ${integratorId}`);
    return tokenCache[cacheKey].token;
  }

  try {
    console.log(`[Server] Getting new token for ${integratorId}`, {
      url: `${credentials.apiUrl}/oauth/token`,
      apiKey: credentials.apiKey,
      integratorId: credentials.integratorId,
    });

    // Get a new token from the API
    const tokenUrl = `${credentials.apiUrl}/oauth/token`;

    // Use the same authentication approach that works in the auth route
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

    // Cache the token with expiry time (24 hours - 5 minutes buffer)
    const expiresIn = 24 * 60 * 60 * 1000 - 5 * 60 * 1000;
    tokenCache[cacheKey] = {
      token: response.data.access_token,
      expiresAt: Date.now() + expiresIn,
    };

    console.log(`[Server] Successfully obtained new token for ${integratorId}`);
    return response.data.access_token;
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
