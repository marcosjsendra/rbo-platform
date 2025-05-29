We've been troubleshooting authentication issues with the REI API CCA. The API documentation specifies using OAuth 2.0 with the following credentials:

For RE/MAX AZURA:

- API URL: https://remax-cca.com/api/v1
- API Key: 3CD7819D-FD26-4DD6-ACAF-04D36E6365F5
- Integrator ID: R1040029
- Secret Key: 27097A65-9E97-460F-B6DA-8BBB548A893E

For RE/MAX BLUE OCEAN:

- API URL: https://remax-cca.com/api/v1
- API Key: 07D693F7-12DC-4E7D-B652-E5CD38B591B4
- Integrator ID: R1040028
- Secret Key: 050DC15F-C892-445A-A516-05459A07B2F1

We've tried multiple authentication approaches:

1. Standard OAuth2 client credentials flow
2. Password grant type as specified in documentation
3. Including API key in headers and/or request body
4. Different URL structures

Despite following the documentation exactly, we're still getting authentication errors:

- 400 Bad Request with "unsupported_grant_type" or "unauthorized_client"

The API root is accessible (returns 200 OK), but we can't authenticate to get a token.
