/**
 * src/lib/api/api-client.ts
 *
 * API Client Helper Module
 *
 * This module provides a singleton instance of the REI API CCA client
 * that can be used throughout the application. It also handles environment
 * variable configuration for API credentials.
 */

import {
  ReiApiCcaClient,
  createReiApiCcaClient,
  ApiCredentials,
} from "./rei-api-cca";
import { REMAX_AZURA_CREDENTIALS, REMAX_BLUE_OCEAN_CREDENTIALS } from "./index";

// Define environment variable names for API credentials
const ENV_API_URL = "REMAX_API_URL";
const ENV_API_KEY = "REMAX_API_KEY";
const ENV_INTEGRATOR_ID = "REMAX_INTEGRATOR_ID";
const ENV_SECRET_KEY = "REMAX_SECRET_KEY";

/**
 * Get API credentials from environment variables or fallback to default values
 *
 * @param brand - The brand to get credentials for ('AZURA' or 'BLUE_OCEAN')
 * @returns API credentials object
 */
export function getApiCredentials(
  brand: "AZURA" | "BLUE_OCEAN"
): ApiCredentials {
  // Log which brand's credentials we're retrieving
  console.log(
    `src/lib/api/api-client.ts: Getting API credentials for RE/MAX ${brand}`
  );

  // Get default credentials based on brand
  const defaultCredentials =
    brand === "AZURA" ? REMAX_AZURA_CREDENTIALS : REMAX_BLUE_OCEAN_CREDENTIALS;

  // Check if we're in a Node.js environment where process.env is available
  if (typeof process !== "undefined" && process.env) {
    // Override default credentials with environment variables if they exist
    return {
      apiUrl: process.env[ENV_API_URL] || defaultCredentials.apiUrl,
      apiKey: process.env[ENV_API_KEY] || defaultCredentials.apiKey,
      integratorId:
        process.env[ENV_INTEGRATOR_ID] || defaultCredentials.integratorId,
      secretKey: process.env[ENV_SECRET_KEY] || defaultCredentials.secretKey,
    };
  }

  // Return default credentials if environment variables are not available
  return defaultCredentials;
}

// Singleton instances for each brand
let azuraApiClient: ReiApiCcaClient | null = null;
let blueOceanApiClient: ReiApiCcaClient | null = null;

/**
 * Get a singleton instance of the REI API CCA client for RE/MAX AZURA
 *
 * @returns ReiApiCcaClient instance for AZURA
 */
export function getAzuraApiClient(): ReiApiCcaClient {
  if (!azuraApiClient) {
    console.log(
      "src/lib/api/api-client.ts: Creating new AZURA API client instance"
    );
    azuraApiClient = createReiApiCcaClient(getApiCredentials("AZURA"));
  }
  return azuraApiClient;
}

/**
 * Get a singleton instance of the REI API CCA client for RE/MAX BLUE OCEAN
 *
 * @returns ReiApiCcaClient instance for BLUE OCEAN
 */
export function getBlueOceanApiClient(): ReiApiCcaClient {
  if (!blueOceanApiClient) {
    console.log(
      "src/lib/api/api-client.ts: Creating new BLUE OCEAN API client instance"
    );
    blueOceanApiClient = createReiApiCcaClient(getApiCredentials("BLUE_OCEAN"));
  }
  return blueOceanApiClient;
}

/**
 * Get the appropriate API client based on the brand
 *
 * @param brand - The brand to get the client for ('AZURA' or 'BLUE_OCEAN')
 * @returns ReiApiCcaClient instance for the specified brand
 */
export function getApiClient(brand: "AZURA" | "BLUE_OCEAN"): ReiApiCcaClient {
  return brand === "AZURA" ? getAzuraApiClient() : getBlueOceanApiClient();
}
