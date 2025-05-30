Test Authentication
Status:Failed ❌

Error:

Request failed with status code 500

1

Error: src/lib/api/rei-api-cca.ts: Response error details: {}
    at createConsoleError (http://localhost:3000/_next/static/chunks/node_modules_next_dist_client_8f19e6fb._.js:882:71)
    at handleConsoleError (http://localhost:3000/_next/static/chunks/node_modules_next_dist_client_8f19e6fb._.js:1058:54)
    at console.error (http://localhost:3000/_next/static/chunks/node_modules_next_dist_client_8f19e6fb._.js:1223:57)
    at ReiApiCcaClient.makeRequest (http://localhost:3000/_next/static/chunks/src_75e988f8._.js:80:33)
    at async testAuthentication (http://localhost:3000/_next/static/chunks/src_75e988f8._.js:356:13)

      110 |           const axiosError = error as any;
  111 |           if (axiosError.response) {
> 112 |             console.error('src/lib/api/rei-api-cca.ts: Response error details:', {
      |                     ^
  113 |               status: axiosError.response.status,
  114 |               statusText: axiosError.response.statusText,
  115 |               data: axiosError.response.data,

2

AxiosError: Request failed with status code 500
    at settle (http://localhost:3000/_next/static/chunks/node_modules_67c34ef5._.js:3679:16)
    at XMLHttpRequest.onloadend (http://localhost:3000/_next/static/chunks/node_modules_67c34ef5._.js:4183:174)
    at Axios.request (http://localhost:3000/_next/static/chunks/node_modules_67c34ef5._.js:4908:49)
    at async ReiApiCcaClient.makeRequest (http://localhost:3000/_next/static/chunks/src_75e988f8._.js:60:30)
    at async testAuthentication (http://localhost:3000/_next/static/chunks/src_75e988f8._.js:356:13)

  87 |
  88 |       // Make the request to the server-side API route
> 89 |       const response = await this.axiosInstance.post('', {
     |                        ^
  90 |         endpoint: formattedEndpoint,
  91 |         params,
  92 |         brand: this.brand,
