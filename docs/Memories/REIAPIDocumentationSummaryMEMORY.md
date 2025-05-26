### REI API CCA v1.0 Documentation Summary

tags: rei_api, api_documentation, authentication, endpoints, data_structure

## REI API CCA v1.0 Documentation Summary

The REI API CCA v1.0 is a JSON-based API that enables data retrieval and updates for the RECONNECT property publication system. It will be used for retrieving properties and agents for the RE/MAX Blue Ocean website.

### Authentication

- OAuth 2.0 authentication with token-based system
- Credentials for RE/MAX AZURA:
  - API URL: https://remax-cca.com/api/v1
  - API Key: 3CD7819D-FD26-4DD6-ACAF-04D36E6365F5
  - Integrator ID: R1040029
  - Secret Key: 27097A65-9E97-460F-B6DA-8BBB548A893E
- Credentials for RE/MAX BLUE OCEAN:
  - API URL: https://remax-cca.com/api/v1
  - API Key: 07D693F7-12DC-4E7D-B652-E5CD38B591B4
  - Integrator ID: R1040028
  - Secret Key: 050DC15F-C892-445A-A516-05459A07B2F1

### Key Endpoints

1. **Authentication**:

   - POST /api/v1/oauth/token (returns access token valid for ~24 hours)

2. **Properties**:

   - GET /api/v1/GetProperties/take/{take}/skip/{skip} (paginated property list)
   - GET /api/v1/GetPropertyDetails/{listingid} (detailed property info)

3. **Property Images**:

   - GET /api/v1/propertyimages/{listingid} (images for a property)

4. **Associates (Agents)**:

   - GET /api/v1/associates/take/{take}/skip/{skip} (paginated agent list)
   - GET /api/v1/associates/{associateid} (detailed agent info)

5. **Lookups and Geo Data**:
   - GET /api/v1/lookups/names (catalog names)
   - GET /api/v1/lookups/detailsbyid/{id} (catalog values)
   - GET /api/v1/geo/countries (countries)
   - GET /api/v1/geo/countries/{id}/StateProvincesInaCountry (states/provinces)
   - GET /api/v1/geo/countries/{countryid}/StateProvincesInaCountry/{stateDepProvID}/LocationsInAStateProvince (locations)

### Property Data Structure

The API provides extensive property data including:

- Basic info (ID, title, remarks, status)
- Location data (country, state, location, coordinates)
- Property details (bedrooms, bathrooms, size, amenities)
- Price information
- Media links

### Implementation Notes

- All requests require the Authorization header with bearer token
- Property data includes 71 fields with specific validation requirements
- Images are resized to 3:2 aspect ratio by the API
- Need to implement regular token refresh (tokens expire after ~24 hours)
