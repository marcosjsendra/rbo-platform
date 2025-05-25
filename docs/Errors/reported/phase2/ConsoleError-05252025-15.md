Properties API Test

[Server] Received API request: { endpoint: 'GetProperties/take/5/skip/0', integratorId: 'R1040029' }
[Server] Getting new token for R1040029 {
  url: 'https://remax-cca.com/api/v1/oauth/token',
  apiKey: '3CD7819D-FD26-4DD6-ACAF-04D36E6365F5',
  integratorId: 'R1040029'
}
[Server] Error getting token for R1040029: Error [AxiosError]: Request failed with status code 400
    at async ensureValidToken (src/app/api/rei-cca/route.ts:55:21)
    at async GET (src/app/api/rei-cca/route.ts:149:18)
  53 |     // Get a new token from the API
  54 |     const tokenUrl = `${credentials.apiUrl}/oauth/token`;
> 55 |     const response = await axios.post(tokenUrl, null, {
     |                     ^
  56 |       headers: {
  57 |         'X-API-KEY': credentials.apiKey,
  58 |         'Content-Type': 'application/json' {
  code: 'ERR_BAD_REQUEST',
  config: [Object],
  request: [ClientRequest],
  response: [Object],
  status: 400,
  constructor: [Function],
  toJSON: [Function: toJSON]
}
[Server] Response status: 400
[Server] Response data: { error: 'unsupported_grant_type' }
[Server] Response headers: Object [AxiosHeaders] {
  'content-length': '34',
  connection: 'close',
  'content-type': 'application/json;charset=UTF-8',
  date: 'Sun, 25 May 2025 15:26:33 GMT',
  server: 'Microsoft-IIS/10.0',
  'access-control-expose-headers': 'Request-Context',
  'cache-control': 'no-cache',
  expires: '-1',
  pragma: 'no-cache',
  'set-cookie': [
    'ARRAffinity=0fdfe8be422c56b73bbef16d31c608136df51f10da1095904f3dac983b0b6824;Path=/;HttpOnly;Secure;Domain=remax-cca.com',
    'ARRAffinitySameSite=0fdfe8be422c56b73bbef16d31c608136df51f10da1095904f3dac983b0b6824;Path=/;HttpOnly;SameSite=None;Secure;Domain=remax-cca.com'
  ],
  'request-context': 'appId=cid-v1:be19fee3-8062-46ba-920d-ead6ba1c5c89',
  'x-powered-by': 'ASP.NET'
}
[Server] Error forwarding request to REI API CCA: Error: Failed to get access token: Request failed with status code 400
    at ensureValidToken (src/app/api/rei-cca/route.ts:84:12)
    at async GET (src/app/api/rei-cca/route.ts:149:18)
  82 |       console.error(`[Server] Response data:`, error.response.data);
  83 |       console.error(`[Server] Response headers:`, error.response.headers);
> 84 |       throw new Error(`Failed to get access token: ${error.response.data?.message || error.message}`);
     |            ^
  85 |     }
  86 |
  87 |     // Handle other errors
[Server] Error details: {
  message: 'Failed to get access token: Request failed with status code 400',
  response: undefined,
  status: undefined
}
 GET /api/rei-cca?endpoint=GetProperties%2Ftake%2F5%2Fskip%2F0&integratorId=R1040029 500 in 1170ms
