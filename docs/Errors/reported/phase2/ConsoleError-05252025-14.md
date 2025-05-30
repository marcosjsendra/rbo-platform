[Server] Requesting token for R1040029 {
url: 'https://api.remax-cca.com/oauth/token',
integratorId: 'R1040029'
}
[Server] Request details: {
url: 'https://api.remax-cca.com/api/v1/oauth/token',
headers: {
'X-API-KEY': '3CD7819D-FD26-4DD6-ACAF-04D36E6365F5',
'Content-Type': 'application/x-www-form-urlencoded',
Accept: 'application/json'
},
body: 'grant_type=client_credentials&client_id=R1040029&client_secret=27097A65-9E97-460F-B6DA-8BBB548A893E'
}
[Server] Authentication failed: Error [AxiosError]: Request failed with status code 404
at async POST (src/app/api/rei-cca/auth/route.ts:76:21)
74 | });
75 |

> 76 | const response = await axios.post(tokenUrl,

     |                     ^

77 | params,
78 | {
79 | headers: { {
code: 'ERR_BAD_REQUEST',
config: [Object],
request: [ClientRequest],
response: [Object],
status: 404,
constructor: [Function],
toJSON: [Function: toJSON]
}
[Server] Response status: 404
[Server] Response data: {
Message: "No HTTP resource was found that matches the request URI 'https://api.remax-cca.com/api/v1/oauth/token'.",
MessageDetail: "No type was found that matches the controller named 'v1'."
}
[Server] Response headers: Object [AxiosHeaders] {
'content-length': '193',
connection: 'close',
'content-type': 'application/json; charset=utf-8',
date: 'Sun, 25 May 2025 15:03:27 GMT',
server: 'Microsoft-IIS/10.0',
'cache-control': 'no-cache',
expires: '-1',
pragma: 'no-cache',
'set-cookie': [
'ARRAffinity=0fdfe8be422c56b73bbef16d31c608136df51f10da1095904f3dac983b0b6824;Path=/;HttpOnly;Secure;Domain=api.remax-cca.com',
'ARRAffinitySameSite=0fdfe8be422c56b73bbef16d31c608136df51f10da1095904f3dac983b0b6824;Path=/;HttpOnly;SameSite=None;Secure;Domain=api.remax-cca.com'
],
'x-aspnet-version': '4.0.30319',
'x-powered-by': 'ASP.NET'
}
POST /api/rei-cca/auth 404 in 1295ms
