GET /favicon.ico?favicon.6f77a0a2.ico 200 in 526ms
[Server] Requesting token for R1040028 {
url: 'https://remax-cca.com/api/v1/oauth/token',
integratorId: 'R1040028'
}
[Server] Request details: {
url: 'https://remax-cca.com/api/v1',
headers: {
'X-API-KEY': '07D693F7-12DC-4E7D-B652-E5CD38B591B4',
'Content-Type': 'application/x-www-form-urlencoded',
Accept: 'application/json'
},
body: 'grant_type=client_credentials&client_id=R1040028&client_secret=050DC15F-C892-445A-A516-05459A07B2F1'
}
[Server] Authentication failed: Error [AxiosError]: Request failed with status code 404
at async POST (src/app/api/rei-cca/auth/route.ts:72:21)
70 | });
71 |

> 72 | const response = await axios.post(credentials.apiUrl,

     |                     ^

73 | params,
74 | {
75 | headers: { {
code: 'ERR_BAD_REQUEST',
config: [Object],
request: [ClientRequest],
response: [Object],
status: 404,
constructor: [Function],
toJSON: [Function: toJSON]
}
[Server] Response status: 404
[Server] Response data: The resource you are looking for has been removed, had its name changed, or is temporarily unavailable.
[Server] Response headers: Object [AxiosHeaders] {
'content-length': '103',
connection: 'close',
'content-type': 'text/html',
date: 'Sun, 25 May 2025 14:56:10 GMT',
server: 'Microsoft-IIS/10.0',
'set-cookie': [
'ARRAffinity=0fdfe8be422c56b73bbef16d31c608136df51f10da1095904f3dac983b0b6824;Path=/;HttpOnly;Secure;Domain=remax-cca.com',
'ARRAffinitySameSite=0fdfe8be422c56b73bbef16d31c608136df51f10da1095904f3dac983b0b6824;Path=/;HttpOnly;SameSite=None;Secure;Domain=remax-cca.com'
],
'x-powered-by': 'ASP.NET'
}
POST /api/rei-cca/auth 404 in 1033ms
GET /api-test 200 in 52ms
GET /favicon.ico?favicon.6f77a0a2.ico 200 in 235ms
[Server] Requesting token for R1040028 {
url: 'https://remax-cca.com/api/v1/oauth/token',
integratorId: 'R1040028'
}
[Server] Request details: {
url: 'https://remax-cca.com/api/v1/oauth/token',
headers: {
'X-API-KEY': '07D693F7-12DC-4E7D-B652-E5CD38B591B4',
'Content-Type': 'application/x-www-form-urlencoded',
Accept: 'application/json'
},
body: 'grant_type=client_credentials&client_id=R1040028&client_secret=050DC15F-C892-445A-A516-05459A07B2F1'
}
[Server] Authentication failed: Error [AxiosError]: Request failed with status code 400
at async POST (src/app/api/rei-cca/auth/route.ts:75:21)
73 | });
74 |

> 75 | const response = await axios.post(tokenUrl,

     |                     ^

76 | params,
77 | {
78 | headers: { {
code: 'ERR_BAD_REQUEST',
config: [Object],
request: [ClientRequest],
response: [Object],
status: 400,
constructor: [Function],
toJSON: [Function: toJSON]
}
[Server] Response status: 400
[Server] Response data: { error: 'unauthorized_client' }
[Server] Response headers: Object [AxiosHeaders] {
'content-length': '31',
connection: 'close',
'content-type': 'application/json;charset=UTF-8',
date: 'Sun, 25 May 2025 14:57:52 GMT',
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
POST /api/rei-cca/auth 400 in 804ms

AxiosError: Request failed with status code 400
at settle (http://localhost:3000/_next/static/chunks/node_modules_67c34ef5._.js:3679:16)
at XMLHttpRequest.onloadend (http://localhost:3000/_next/static/chunks/node_modules_67c34ef5._.js:4183:174)
at Axios.request (http://localhost:3000/_next/static/chunks/node_modules_67c34ef5._.js:4908:49)
at async ReiApiCcaClient.testAuthentication (http://localhost:3000/_next/static/chunks/src_75e988f8._.js:84:30)
at async testAuthentication (http://localhost:3000/_next/static/chunks/src_75e988f8._.js:348:28)

    Error: [Client] Response status: 400
    at createConsoleError (http://localhost:3000/_next/static/chunks/node_modules_next_dist_client_8f19e6fb._.js:882:71)
    at handleConsoleError (http://localhost:3000/_next/static/chunks/node_modules_next_dist_client_8f19e6fb._.js:1058:54)
    at console.error (http://localhost:3000/_next/static/chunks/node_modules_next_dist_client_8f19e6fb._.js:1223:57)
    at ReiApiCcaClient.testAuthentication (http://localhost:3000/_next/static/chunks/src_75e988f8._.js:93:25)
    at async testAuthentication (http://localhost:3000/_next/static/chunks/src_75e988f8._.js:348:28)

    Error: [Client] Response data: {}
    at createConsoleError (http://localhost:3000/_next/static/chunks/node_modules_next_dist_client_8f19e6fb._.js:882:71)
    at handleConsoleError (http://localhost:3000/_next/static/chunks/node_modules_next_dist_client_8f19e6fb._.js:1058:54)
    at console.error (http://localhost:3000/_next/static/chunks/node_modules_next_dist_client_8f19e6fb._.js:1223:57)
    at ReiApiCcaClient.testAuthentication (http://localhost:3000/_next/static/chunks/src_75e988f8._.js:94:25)
    at async testAuthentication (http://localhost:3000/_next/static/chunks/src_75e988f8._.js:348:28)

    Error: Authentication test failed: Request failed with status code 400
    at ReiApiCcaClient.testAuthentication (http://localhost:3000/_next/static/chunks/src_75e988f8._.js:96:19)
    at async testAuthentication (http://localhost:3000/_next/static/chunks/src_75e988f8._.js:348:28)
