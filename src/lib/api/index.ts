/**
 * src/lib/api/index.ts
 *
 * API Module Index
 *
 * This file exports all API-related components, clients, and types
 * for easier imports throughout the application.
 */

// Export REI API CCA client and types
export {
  ReiApiCcaClient,
  createReiApiCcaClient,
  type ApiCredentials,
  type TokenResponse,
  type PropertyListParams,
  type AssociateListParams,
} from "./rei-api-cca";

// Export API client helper functions
export {
  getApiCredentials,
  getAzuraApiClient,
  getBlueOceanApiClient,
  getApiClient,
} from "./api-client";

// Export constants for RE/MAX AZURA and BLUE OCEAN credentials
export const REMAX_AZURA_CREDENTIALS = {
  apiUrl: 'https://remax-cca.com/api/v1',  // Exact URL from documentation
  apiKey: '3CD7819D-FD26-4DD6-ACAF-04D36E6365F5',
  integratorId: 'R1040029',
  secretKey: '27097A65-9E97-460F-B6DA-8BBB548A893E'
};

export const REMAX_BLUE_OCEAN_CREDENTIALS = {
  apiUrl: 'https://remax-cca.com/api/v1',  // Exact URL from documentation
  apiKey: '07D693F7-12DC-4E7D-B652-E5CD38B591B4',
  integratorId: 'R1040028',
  secretKey: '050DC15F-C892-445A-A516-05459A07B2F1'
};

