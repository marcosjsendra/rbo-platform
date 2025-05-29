/**
 * src/lib/api/rei-api-cca/client.ts
 * 
 * REI API CCA client implementation
 * Handles authentication and API requests for properties and agents
 */

// Base API URL
const API_BASE_URL = 'https://remax-cca.com/api/v1';

// Brand type definition
export type BrandType = 'AZURA' | 'BLUE_OCEAN';

// Client configuration interface
interface ReiApiCcaClientConfig {
  brand: BrandType;
  apiKey: string;
  integratorId: string;
  secretKey: string;
}

// Property interface
export interface Property {
  listingId: string;
  title?: string;
  remarks?: string;
  status: string;
  price?: number;
  currency?: string;
  propertyType?: string;
  bedrooms?: number;
  bathrooms?: number;
  size?: number;
  sizeUnit?: string;
  location?: string;
  address?: string;
  city?: string;
  stateProvince?: string;
  country?: string;
  postalCode?: string;
  latitude?: number;
  longitude?: number;
  features?: Record<string, any>;
  images?: Array<{ id: string; url: string; caption?: string }>;
  [key: string]: any;
}

// Agent interface
export interface Agent {
  agentId: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  bio?: string;
  imageUrl?: string;
  title?: string;
  specialties?: string[];
  languages?: string[];
  socialMedia?: Record<string, string>;
  [key: string]: any;
}

// Property query options interface
interface GetPropertiesOptions {
  modifiedSince?: string | null;
  take?: number;
  skip?: number;
}

// Agent query options interface
interface GetAgentsOptions {
  modifiedSince?: string | null;
  take?: number;
  skip?: number;
}

/**
 * REI API CCA client class
 * 
 * Handles authentication and API requests for properties and agents
 */
class ReiApiCcaClient {
  private brand: BrandType;
  private apiKey: string;
  private integratorId: string;
  private secretKey: string;
  private accessToken: string | null = null;
  private tokenExpiry: Date | null = null;
  
  /**
   * Constructor
   * 
   * @param config Client configuration
   */
  constructor(config: ReiApiCcaClientConfig) {
    this.brand = config.brand;
    this.apiKey = config.apiKey;
    this.integratorId = config.integratorId;
    this.secretKey = config.secretKey;
    
    console.log(`src/lib/api/rei-api-cca/client.ts: Initialized REI API CCA client for brand ${this.brand}`);
  }
  
  /**
   * Get an access token for API authentication
   * 
   * @returns The access token
   */
  private async getAccessToken(): Promise<string> {
    // Check if we already have a valid token
    if (this.accessToken && this.tokenExpiry && this.tokenExpiry > new Date()) {
      return this.accessToken;
    }
    
    console.log(`src/lib/api/rei-api-cca/client.ts: Getting new access token for brand ${this.brand}`);
    
    try {
      // Prepare the request body
      const body = new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: this.integratorId,
        client_secret: this.secretKey,
        api_key: this.apiKey
      });
      
      // Make the request
      const response = await fetch(`${API_BASE_URL}/oauth/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: body.toString()
      });
      
      // Parse the response
      const data = await response.json();
      
      // Check for errors
      if (!response.ok) {
        throw new Error(`Authentication failed: ${data.error_description || data.error || 'Unknown error'}`);
      }
      
      // Store the token and expiry
      this.accessToken = data.access_token;
      
      // Set token expiry (usually 24 hours, but subtract 5 minutes to be safe)
      const expiresInSeconds = data.expires_in || 86400; // Default to 24 hours
      this.tokenExpiry = new Date(Date.now() + (expiresInSeconds - 300) * 1000);
      
      console.log(`src/lib/api/rei-api-cca/client.ts: Got new access token for brand ${this.brand}, expires in ${expiresInSeconds} seconds`);
      
      // Ensure we never return null
      if (!this.accessToken) {
        throw new Error('Failed to get access token from API response');
      }
      
      return this.accessToken;
    } catch (error) {
      console.error(`src/lib/api/rei-api-cca/client.ts: Error getting access token for brand ${this.brand}:`, error);
      throw new Error(`Failed to authenticate with REI API CCA: ${String(error)}`);
    }
  }
  
  /**
   * Make an authenticated API request
   * 
   * @param endpoint API endpoint
   * @param options Request options
   * @returns The response data
   */
  private async makeRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    try {
      // Get an access token
      const token = await this.getAccessToken();
      
      // Prepare the request
      const url = `${API_BASE_URL}${endpoint}`;
      const requestHeaders = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...(options.headers || {})
      };
      
      // Make the request
      const response = await fetch(url, {
        ...options,
        headers: requestHeaders
      });
      
      // Parse the response
      const data = await response.json();
      
      // Check for errors
      if (!response.ok) {
        throw new Error(`API request failed: ${data.error_description || data.error || data.message || 'Unknown error'}`);
      }
      
      return data as T;
    } catch (error) {
      console.error(`src/lib/api/rei-api-cca/client.ts: Error making API request to ${endpoint}:`, error);
      throw error;
    }
  }
  
  /**
   * Get properties from the API
   * 
   * @param options Query options
   * @returns Properties and total count
   */
  async getProperties(options: GetPropertiesOptions = {}): Promise<{ properties: Property[]; totalCount: number }> {
    const take = options.take || 50;
    const skip = options.skip || 0;
    
    try {
      console.log(`src/lib/api/rei-api-cca/client.ts: Getting properties for brand ${this.brand}, take=${take}, skip=${skip}`);
      
      // Make the request
      const data = await this.makeRequest<{ properties: any[]; totalCount: number }>(`/GetProperties/take/${take}/skip/${skip}`);
      
      // Extract properties and total count
      const properties = data.properties || [];
      const totalCount = data.totalCount || properties.length;
      
      console.log(`src/lib/api/rei-api-cca/client.ts: Got ${properties.length} properties out of ${totalCount} total for brand ${this.brand}`);
      
      // For each property, get detailed information and images
      const enhancedProperties = await Promise.all(
        properties.map(async (property: any) => {
          try {
            // Get property details
            const details = await this.makeRequest<any>(`/GetPropertyDetails/${property.listingId}`);
            
            // Get property images
            const images = await this.makeRequest<{ images: any[] }>(`/propertyimages/${property.listingId}`);
            
            // Combine the data
            return {
              ...property,
              ...details,
              images: images.images || []
            };
          } catch (error) {
            console.error(`src/lib/api/rei-api-cca/client.ts: Error getting details for property ${property.listingId}:`, error);
            return property;
          }
        })
      );
      
      return {
        properties: enhancedProperties as Property[],
        totalCount
      };
    } catch (error) {
      console.error(`src/lib/api/rei-api-cca/client.ts: Error getting properties for brand ${this.brand}:`, error);
      throw error;
    }
  }
  
  /**
   * Get agents from the API
   * 
   * @param options Query options
   * @returns Agents and total count
   */
  async getAgents(options: GetAgentsOptions = {}): Promise<{ agents: Agent[]; totalCount: number }> {
    const take = options.take || 50;
    const skip = options.skip || 0;
    
    try {
      console.log(`src/lib/api/rei-api-cca/client.ts: Getting agents for brand ${this.brand}, take=${take}, skip=${skip}`);
      
      // Make the request
      const data = await this.makeRequest<{ associates: any[]; totalCount: number }>(`/associates/take/${take}/skip/${skip}`);
      
      // Extract agents and total count
      const agents = data.associates || [];
      const totalCount = data.totalCount || agents.length;
      
      console.log(`src/lib/api/rei-api-cca/client.ts: Got ${agents.length} agents out of ${totalCount} total for brand ${this.brand}`);
      
      // For each agent, get detailed information
      const enhancedAgents = await Promise.all(
        agents.map(async (agent: any) => {
          try {
            // Get agent details
            const details = await this.makeRequest<any>(`/associates/${agent.agentId}`);
            
            // Combine the data
            return {
              ...agent,
              ...details
            };
          } catch (error) {
            console.error(`src/lib/api/rei-api-cca/client.ts: Error getting details for agent ${agent.agentId}:`, error);
            return agent;
          }
        })
      );
      
      return {
        agents: enhancedAgents as Agent[],
        totalCount
      };
    } catch (error) {
      console.error(`src/lib/api/rei-api-cca/client.ts: Error getting agents for brand ${this.brand}:`, error);
      throw error;
    }
  }
}

/**
 * Create a new REI API CCA client
 * 
 * @param config Client configuration
 * @returns A new REI API CCA client instance
 */
export function createReiApiCcaClient(config: ReiApiCcaClientConfig): ReiApiCcaClient {
  return new ReiApiCcaClient(config);
}
