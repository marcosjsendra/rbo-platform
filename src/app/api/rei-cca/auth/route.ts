/**
 * src/app/api/rei-cca/auth/route.ts
 *
 * Authentication endpoint for REI API CCA
 *
 * This route handles authentication with the REI API CCA,
 * obtaining and managing access tokens.
 */

import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import {
  REMAX_AZURA_CREDENTIALS,
  REMAX_BLUE_OCEAN_CREDENTIALS,
} from "@/lib/api";

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
 * POST handler for authentication requests
 * @param request - The incoming request
 * @returns A response with the authentication result
 */
export async function POST(request: NextRequest) {
  try {
    // Get the integrator ID from the request body
    const body = await request.json();
    const { integratorId } = body;

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

    // Make the token request to the REI API CCA
    console.log(`[Server] Requesting token for ${integratorId}`, {
      url: `${credentials.apiUrl}/oauth/token`,
      integratorId: credentials.integratorId,
    });

    // Use the exact token endpoint from documentation
    const tokenUrl = `${credentials.apiUrl}/oauth/token`;

    // According to OAuth 2.0 specification and REI API CCA documentation
    // The API expects a specific format for the token request
    // Try multiple approaches to handle potential format issues

    // Approach 1: Standard OAuth 2.0 password grant type with form-urlencoded format
    const params = new URLSearchParams();
    params.append("grant_type", "password"); // Use password grant type as specified in docs
    params.append("apikey", credentials.apiKey);
    params.append("integratorID", credentials.integratorId); // Use exact case as in documentation
    params.append("secretkey", credentials.secretKey);

    const requestBody = params.toString();

    // Log the formatted request body for debugging

    // Log detailed information for debugging
    console.log("[Server] Full credentials:", {
      apiUrl: credentials.apiUrl,
      apiKey: credentials.apiKey,
      integratorId: credentials.integratorId,
      secretKey: credentials.secretKey.substring(0, 5) + "...", // Only show part of the secret for security
    });

    // Try to access the API root to check if the API is accessible
    try {
      console.log("[Server] Testing API accessibility...");
      const apiRootResponse = await axios.get(
        credentials.apiUrl.replace("/api/v1", ""),
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      console.log("[Server] API root response:", {
        status: apiRootResponse.status,
        headers: apiRootResponse.headers,
        data:
          typeof apiRootResponse.data === "string"
            ? apiRootResponse.data.substring(0, 100) + "..."
            : apiRootResponse.data,
      });
    } catch (error) {
      const apiRootError = error as Error;
      console.error("[Server] API root access failed:", apiRootError.message);
      if (axios.isAxiosError(apiRootError) && apiRootError.response) {
        console.error(
          "[Server] API root response status:",
          apiRootError.response.status
        );
        console.error(
          "[Server] API root response data:",
          apiRootError.response.data
        );
      }
    }

    // Log the exact request details as specified in the documentation
    console.log("[Server] Request details:", {
      url: tokenUrl,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cache-Control": "no-cache",
      },
      body: requestBody,
    });

    const response = await axios.post(tokenUrl, requestBody, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cache-Control": "no-cache",
        Accept: "application/json",
      },
    });

    // Return the successful response
    return NextResponse.json({
      status: "ok",
      message: "Authentication successful",
      data: response.data,
    });
  } catch (error) {
    console.error("[Server] Authentication failed:", error);

    // Handle axios error with detailed information
    if (axios.isAxiosError(error) && error.response) {
      console.error("[Server] Response status:", error.response.status);
      console.error("[Server] Response data:", error.response.data);
      console.error("[Server] Response headers:", error.response.headers);

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
