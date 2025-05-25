Clicked the Authentication Test

Status:Failed ❌

Error:

Authentication test failed: Request failed with status code 400

Requesting token for R1040028 {
url: 'https://remax-cca.com/api/v1/oauth/token',
integratorId: 'R1040028'
}
[Server] Authentication failed: Error [AxiosError]: Request failed with status code 400
at async POST (src/app/api/rei-cca/auth/route.ts:55:21)
53 | });
54 |

> 55 | const response = await axios.post(`${credentials.apiUrl}/oauth/token`, null, {

     |                     ^

56 | headers: {
57 | 'X-API-KEY': credentials.apiKey,
58 | 'Content-Type': 'application/json' {
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
date: 'Sun, 25 May 2025 14:40:19 GMT',
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

Console error 1

AxiosError: Request failed with status code 400
at settle (http://localhost:3000/_next/static/chunks/node_modules_67c34ef5._.js:3679:16)
at XMLHttpRequest.onloadend (http://localhost:3000/_next/static/chunks/node_modules_67c34ef5._.js:4183:174)
at Axios.request (http://localhost:3000/_next/static/chunks/node_modules_67c34ef5._.js:4908:49)
at async ReiApiCcaClient.testAuthentication (http://localhost:3000/_next/static/chunks/src_75e988f8._.js:84:30)
at async testAuthentication (http://localhost:3000/_next/static/chunks/src_75e988f8._.js:348:28)

Console error 2

Error: [Client] Response status: 400
at createConsoleError (http://localhost:3000/_next/static/chunks/node_modules_next_dist_client_8f19e6fb._.js:882:71)
at handleConsoleError (http://localhost:3000/_next/static/chunks/node_modules_next_dist_client_8f19e6fb._.js:1058:54)
at console.error (http://localhost:3000/_next/static/chunks/node_modules_next_dist_client_8f19e6fb._.js:1223:57)
at ReiApiCcaClient.testAuthentication (http://localhost:3000/_next/static/chunks/src_75e988f8._.js:93:25)
at async testAuthentication (http://localhost:3000/_next/static/chunks/src_75e988f8._.js:348:28)

Console error 3

Error: [Client] Response data: {}
at createConsoleError (http://localhost:3000/_next/static/chunks/node_modules_next_dist_client_8f19e6fb._.js:882:71)
at handleConsoleError (http://localhost:3000/_next/static/chunks/node_modules_next_dist_client_8f19e6fb._.js:1058:54)
at console.error (http://localhost:3000/_next/static/chunks/node_modules_next_dist_client_8f19e6fb._.js:1223:57)
at ReiApiCcaClient.testAuthentication (http://localhost:3000/_next/static/chunks/src_75e988f8._.js:94:25)
at async testAuthentication (http://localhost:3000/_next/static/chunks/src_75e988f8._.js:348:28)

Console error 4

Error: Authentication test failed: Request failed with status code 400
at ReiApiCcaClient.testAuthentication (http://localhost:3000/_next/static/chunks/src_75e988f8._.js:96:19)
at async testAuthentication (http://localhost:3000/_next/static/chunks/src_75e988f8._.js:348:28)
