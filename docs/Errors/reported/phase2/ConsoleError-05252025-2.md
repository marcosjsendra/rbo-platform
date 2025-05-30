Test Authentication
Status:Failed ❌

Error:

Request failed with status code 500

AxiosError: Request failed with status code 500
at settle (http://localhost:3000/_next/static/chunks/node_modules_67c34ef5._.js:3679:16)
at XMLHttpRequest.onloadend (http://localhost:3000/_next/static/chunks/node_modules_67c34ef5._.js:4183:174)
at Axios.request (http://localhost:3000/_next/static/chunks/node_modules_67c34ef5._.js:4908:49)
at async ReiApiCcaClient.makeRequest (http://localhost:3000/_next/static/chunks/src_75e988f8._.js:51:30)
at async testAuthentication (http://localhost:3000/_next/static/chunks/src_75e988f8._.js:327:13)

76 | console.log(`src/lib/api/rei-api-cca.ts: Making request to ${endpoint}`);
77 |

> 78 | const response = await this.axiosInstance.post('', {

     |                        ^

79 | endpoint,
80 | params,
81 | brand: this.brand,
