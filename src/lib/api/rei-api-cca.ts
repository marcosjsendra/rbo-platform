/**
 * src/lib/api/rei-api-cca.ts
 * 
 * REI API CCA Client
 * 
 * This module provides a client for interacting with the REI API CCA,
 * handling authentication and providing methods for accessing various
 * API endpoints. It works with both the real API and mock data.
 */

import axios from 'axios';

// Define the brand type
export type BrandType = 'AZURA' | 'BLUE_OCEAN';

/**
 * Token response from the API
 */
export interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

/**
 * Parameters for property list requests
 */
export interface PropertyListParams {
  take: number;
  skip: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * Parameters for associate list requests
 */
export interface AssociateListParams {
  take: number;
  skip: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * API credentials interface
 */
export interface ApiCredentials {
  apiUrl: string;
  apiKey: string;
  integratorId: string;
  secretKey: string;
}

/**
 * Create a new REI API CCA client instance
 * @param credentials - API credentials for the client
 * @returns A new ReiApiCcaClient instance
 */
export function createReiApiCcaClient(credentials: ApiCredentials): ReiApiCcaClient {
  return new ReiApiCcaClient(credentials);
}

/**
 * REI API CCA Client class
 * 
 * Provides methods for interacting with the REI API CCA
 */
export class ReiApiCcaClient {
  private credentials: ApiCredentials;

  /**
   * Constructor
   * @param credentials - The API credentials to use for requests
   */
  constructor(credentials: ApiCredentials) {
    this.credentials = credentials;
    console.log(`[Client] Initialized REI API CCA client for ${credentials.integratorId}`);
  }

  /**
   * Make a request to the REI API CCA
   * @param endpoint - The API endpoint to request
   * @returns The API response data
   */
  async makeRequest(endpoint: string): Promise<Record<string, unknown>> {
    try {
      console.log(`[Client] Making request to REI API CCA: ${endpoint}`);
      
      // Ensure the endpoint has the correct format
      const formattedEndpoint = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint;
      
      // Make the request via our server-side API route
      const response = await axios.get('/api/rei-cca', {
        params: {
          endpoint: formattedEndpoint,
          integratorId: this.credentials.integratorId
        }
      });
      
      console.log(`[Client] Request to ${endpoint} successful`);
      return response.data;
    } catch (error: unknown) {
      console.error(`[Client] Error making request to ${endpoint}:`, error);
      
      // Provide more detailed error information
      if (axios.isAxiosError(error) && error.response) {
        console.error(`[Client] Response status:`, error.response.status);
        console.error(`[Client] Response data:`, error.response.data);
        throw new Error(`API request to ${endpoint} failed: ${error.message}`);
      }
      
      throw new Error(`API request to ${endpoint} failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Test the API connection
   * @returns The API connection test response
   */
  async testConnection(): Promise<Record<string, unknown>> {
    try {
      console.log(`[Client] Testing API connection`);
      
      // Make a request to the test endpoint
      const response = await axios.get('/api/rei-cca');
      
      console.log(`[Client] API connection test successful:`, response.data);
      return response.data;
    } catch (error: unknown) {
      console.error(`[Client] API connection test failed:`, error);
      
      // Provide more detailed error information
      if (axios.isAxiosError(error) && error.response) {
        console.error(`[Client] Response status:`, error.response.status);
        console.error(`[Client] Response data:`, error.response.data);
        throw new Error(`API connection test failed: ${error.message}`);
      }
      
      throw new Error(`API connection test failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Test the authentication with the REI API CCA
   * @returns The authentication test response
   */
  async testAuthentication(): Promise<Record<string, unknown>> {
    try {
      console.log(`[Client] Testing authentication for ${this.credentials.integratorId}`);
      
      // Make a request to the test auth endpoint
      const response = await axios.post('/api/rei-cca/auth', {
        integratorId: this.credentials.integratorId
      });
      
      console.log(`[Client] Authentication test successful for ${this.credentials.integratorId}:`, response.data);
      return response.data;
    } catch (error: unknown) {
      console.error(`[Client] Authentication test failed for ${this.credentials.integratorId}:`, error);
      
      // Provide more detailed error information
      if (axios.isAxiosError(error) && error.response) {
        console.error(`[Client] Response status:`, error.response.status);
        console.error(`[Client] Response data:`, error.response.data);
        throw new Error(`Authentication test failed for ${this.credentials.integratorId}: ${error.message}`);
      }
      
      throw new Error(`Authentication test failed for ${this.credentials.integratorId}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get properties from the REI API CCA
   * @param take - Number of properties to take
   * @param skip - Number of properties to skip
   * @returns The properties response
   */
  async getProperties(take: number = 10, skip: number = 0): Promise<Record<string, unknown>> {
    return this.makeRequest(`GetProperties/take/${take}/skip/${skip}`);
  }

  /**
   * Get property details from the REI API CCA
   * @param listingId - The listing ID
   * @returns The property details response
   */
  async getPropertyDetails(listingId: string): Promise<Record<string, unknown>> {
    return this.makeRequest(`GetPropertyDetails/${listingId}`);
  }

  /**
   * Get property images from the REI API CCA
   * @param listingId - The listing ID
   * @returns The property images response
   */
  async getPropertyImages(listingId: string): Promise<Record<string, unknown>> {
    return this.makeRequest(`propertyimages/${listingId}`);
  }

  /**
   * Get associates (agents) from the REI API CCA
   * @param take - Number of associates to take
   * @param skip - Number of associates to skip
   * @returns The associates response
   */
  async getAssociates(take: number = 10, skip: number = 0): Promise<Record<string, unknown>> {
    return this.makeRequest(`associates/take/${take}/skip/${skip}`);
  }

  /**
   * Get associate details from the REI API CCA
   * @param associateId - The associate ID
   * @returns The associate details response
   */
  async getAssociateDetails(associateId: string): Promise<Record<string, unknown>> {
    return this.makeRequest(`associates/${associateId}`);
  }

  /**
   * Get lookup names from the REI API CCA
   * @returns The lookup names response
   */
  async getLookupNames(): Promise<Record<string, unknown>> {
    return this.makeRequest('lookups/names');
  }

  /**
   * Get lookup details from the REI API CCA
   * @param id - The lookup ID
   * @returns The lookup details response
   */
  async getLookupDetails(id: string): Promise<Record<string, unknown>> {
    return this.makeRequest(`lookups/detailsbyid/${id}`);
  }

  /**
   * Get countries from the REI API CCA
   * @returns The countries response
   */
  async getCountries(): Promise<Record<string, unknown>> {
    return this.makeRequest('geo/countries');
  }

  /**
   * Get state/provinces in a country from the REI API CCA
   * @param countryId - The country ID
   * @returns The state/provinces response
   */
  async getStateProvinces(countryId: string): Promise<Record<string, unknown>> {
    return this.makeRequest(`geo/countries/${countryId}/StateProvincesInaCountry`);
  }

  /**
   * Get locations in a state/province from the REI API CCA
   * @param countryId - The country ID
   * @param stateProvinceId - The state/province ID
   * @returns The locations response
   */
  async getLocations(countryId: string, stateProvinceId: string): Promise<Record<string, unknown>> {
    return this.makeRequest(`geo/countries/${countryId}/StateProvincesInaCountry/${stateProvinceId}/LocationsInAStateProvince`);
  }
}
