---
trigger: always_on
---

# REI API CCA Configuration and URL Rules

### Token Endpoint Configuration
- **URL**: `https://remax-cca.com/api/v1/oauth/token`
- **Grant Type**: password
- **Parameters**:
  - `integratorID` (capital ID)
  - `apikey`
  - `secretkey`
- **Content-Type**: application/x-www-form-urlencoded
- **Token Expiry**: 24 hours (86399 seconds)

### API Endpoints Configuration
- **Base URL**: `https://remax-cca.com/api/v1/`
- **Example Endpoints**:
  - Properties: `https://remax-cca.com/api/v1/GetProperties/take/{take}/skip/{skip}`
  - Property Details: `https://remax-cca.com/api/v1/GetPropertyDetails/{listingid}`
  - Associates: `https://remax-cca.com/api/v1/associates/take/{take}/skip/{skip}`
  - Associate Details: `https://remax-cca.com/api/v1/associates/{associateid}`

## Critical Rules

### Authentication Rules
1. Use `/api/v1/oauth/token` for authentication
2. Always use password grant type
3. Maintain exact parameter casing
4. Include all three credentials in form data
5. Keep minimal standard headers

### API Endpoint Rules
1. Always use `/api/v1` base path (NOT `/reiapi`)
2. Use exact endpoint names:
   - `GetProperties` (not just "properties")
   - `GetPropertyDetails` (not just "property")
3. Follow the exact path format:
   - For lists: `/take/{take}/skip/{skip}`
   - For details: `/{id}`

## Important Notes
1. There is a discrepancy in the API documentation:
   - Documentation states base URL should be `/reiapi/`
   - BUT all actual examples use `/api/v1/`
   - We must follow the actual examples, using `/api/v1/`

2. URL Structure Examples:
   ```
   # Properties List
   GET https://remax-cca.com/api/v1/GetProperties/take/10/skip/0

   # Property Details
   GET https://remax-cca.com/api/v1/GetPropertyDetails/10744

   # Associates List
   GET https://remax-cca.com/api/v1/associates/take/10/skip/0

   # Associate Details
   GET https://remax-cca.com/api/v1/associates/128
   ```

## Documentation References
- Implementation details: `/remax-blueocean/docs/Errors/fixedReport/phase2/REI_API_CCA_Authentication_Stabilization.md`
- Full API documentation: `/remax-blueocean/docs/API/API_CCA_Specifications.markdown`
- Data Dictionary Properties: `/remax-blueocean/docs/API/CCA_API_Data_Dictionary_PROPERTY.csv`
- Data Dictionary Property Images: `/remax-blueocean/docs/API/CCA_API_Data_Dictionary_PROPERTY_IMAGES.csv`
