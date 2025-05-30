# REI API CCA Integration

This module provides a client for interacting with the REI API CCA v1.0, which is used to retrieve property and agent data for the RE/MAX Blue Ocean website.

## Module Structure

- `rei-api-cca.ts` - Core API client implementation with authentication and endpoint methods
- `api-client.ts` - Helper functions for creating and managing API client instances
- `index.ts` - Exports all API-related components, clients, and types

## Usage Examples

### Basic Usage

```typescript
import { getBlueOceanApiClient } from "@/lib/api";

// Example: Fetch properties
async function fetchProperties() {
  const client = getBlueOceanApiClient();
  const properties = await client.getProperties({ take: 10, skip: 0 });
  return properties;
}

// Example: Fetch property details
async function fetchPropertyDetails(listingId: string) {
  const client = getBlueOceanApiClient();
  const propertyDetails = await client.getPropertyDetails(listingId);
  return propertyDetails;
}

// Example: Fetch agents
async function fetchAgents() {
  const client = getBlueOceanApiClient();
  const agents = await client.getAssociates({ take: 10, skip: 0 });
  return agents;
}
```

### Using Environment Variables

For production environments, it's recommended to use environment variables for API credentials:

1. Add the following variables to your `.env.local` file:

```
REMAX_API_URL=https://remax-cca.com/api/v1
REMAX_API_KEY=your-api-key
REMAX_INTEGRATOR_ID=your-integrator-id
REMAX_SECRET_KEY=your-secret-key
```

2. The API client will automatically use these environment variables if they exist.

## Authentication

The client handles OAuth 2.0 authentication automatically:

- Tokens are requested when needed and cached for subsequent requests
- Tokens are refreshed automatically when they expire
- All API requests include the necessary authorization headers

## Available Methods

### Properties

- `getProperties({ take, skip })` - Get a paginated list of properties
- `getPropertyDetails(listingId)` - Get detailed information for a specific property
- `getPropertyImages(listingId)` - Get images for a specific property

### Associates (Agents)

- `getAssociates({ take, skip })` - Get a paginated list of associates
- `getAssociateDetails(associateId)` - Get detailed information for a specific associate

### Lookups and Geo Data

- `getLookupNames()` - Get catalog names
- `getLookupDetailsById(id)` - Get catalog values
- `getCountries()` - Get countries
- `getStatesProvinces(countryId)` - Get states/provinces for a country
- `getLocations(countryId, stateProvinceId)` - Get locations for a state/province

## Error Handling

All methods include comprehensive error handling and logging:

- Errors are logged to the console with contextual information
- Original errors are re-thrown to allow for custom error handling at the call site

## Logging

All API operations are logged with detailed information:

- Authentication attempts and successes
- API requests with parameters
- Error details when requests fail

## Implementation Notes

- The client uses Axios for HTTP requests
- Authentication tokens are valid for approximately 24 hours
- A 5-minute buffer is applied to token expiration to prevent edge cases
- Singleton instances are maintained for each brand (AZURA and BLUE OCEAN)
