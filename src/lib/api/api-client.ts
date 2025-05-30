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
// Public variables (prefixed with NEXT_PUBLIC_) are accessible in both client and server
// Private variables are only accessible on the server
const ENV_AZURA_API_URL = "NEXT_PUBLIC_REMAX_AZURA_API_URL";
const ENV_AZURA_API_KEY = "REMAX_AZURA_API_KEY";
const ENV_AZURA_INTEGRATOR_ID = "REMAX_AZURA_INTEGRATOR_ID";
const ENV_AZURA_SECRET_KEY = "REMAX_AZURA_SECRET_KEY";

const ENV_BLUE_OCEAN_API_URL = "NEXT_PUBLIC_REMAX_BLUE_OCEAN_API_URL";
const ENV_BLUE_OCEAN_API_KEY = "REMAX_BLUE_OCEAN_API_KEY";
const ENV_BLUE_OCEAN_INTEGRATOR_ID = "REMAX_BLUE_OCEAN_INTEGRATOR_ID";
const ENV_BLUE_OCEAN_SECRET_KEY = "REMAX_BLUE_OCEAN_SECRET_KEY";

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
    // Select the appropriate environment variable names based on brand
    const envApiUrl = brand === "AZURA" ? ENV_AZURA_API_URL : ENV_BLUE_OCEAN_API_URL;
    const envApiKey = brand === "AZURA" ? ENV_AZURA_API_KEY : ENV_BLUE_OCEAN_API_KEY;
    const envIntegratorId = brand === "AZURA" ? ENV_AZURA_INTEGRATOR_ID : ENV_BLUE_OCEAN_INTEGRATOR_ID;
    const envSecretKey = brand === "AZURA" ? ENV_AZURA_SECRET_KEY : ENV_BLUE_OCEAN_SECRET_KEY;
    
    // Override default credentials with environment variables if they exist
    const credentials = {
      apiUrl: process.env[envApiUrl] || defaultCredentials.apiUrl,
      apiKey: process.env[envApiKey] || defaultCredentials.apiKey,
      integratorId: process.env[envIntegratorId] || defaultCredentials.integratorId,
      secretKey: process.env[envSecretKey] || defaultCredentials.secretKey,
    };
    
    console.log(`src/lib/api/api-client.ts: Using ${process.env[envApiUrl] ? 'environment' : 'default'} credentials for RE/MAX ${brand}`);
    
    return credentials;
  }

  // Return default credentials if environment variables are not available
  console.log(`src/lib/api/api-client.ts: Using default credentials for RE/MAX ${brand}`);
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
