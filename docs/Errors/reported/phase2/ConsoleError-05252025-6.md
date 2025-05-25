Console Error 1

AxiosError: Request failed with status code 401
at settle (http://localhost:3000/_next/static/chunks/node_modules_67c34ef5._.js:3679:16)
at XMLHttpRequest.onloadend (http://localhost:3000/_next/static/chunks/node_modules_67c34ef5._.js:4183:174)
at Axios.request (http://localhost:3000/_next/static/chunks/node_modules_67c34ef5._.js:4908:49)
at async ReiApiCcaClient.testAuthentication (http://localhost:3000/_next/static/chunks/src_75e988f8._.js:84:30)
at async testAuthentication (http://localhost:3000/_next/static/chunks/src_75e988f8._.js:350:28)

143 |
144 | // Make a request to the test auth endpoint

> 145 | const response = await axios.get('/api/rei-cca', {

      |                        ^

146 | params: {
147 | testAuth: this.credentials.integratorId
148 | }

Console error 2

Error: [Client] Response status: 401
at createConsoleError (http://localhost:3000/_next/static/chunks/node_modules_next_dist_client_8f19e6fb._.js:882:71)
at handleConsoleError (http://localhost:3000/_next/static/chunks/node_modules_next_dist_client_8f19e6fb._.js:1058:54)
at console.error (http://localhost:3000/_next/static/chunks/node_modules_next_dist_client_8f19e6fb._.js:1223:57)
at ReiApiCcaClient.testAuthentication (http://localhost:3000/_next/static/chunks/src_75e988f8._.js:95:25)
at async testAuthentication (http://localhost:3000/_next/static/chunks/src_75e988f8._.js:350:28)
156 | // Provide more detailed error information
157 | if (error.response) {

> 158 | console.error(`[Client] Response status: ${error.response.status}`);

      |                 ^

159 | console.error(`[Client] Response data:`, error.response.data);
160 | }
161 |

Console error 3

Error: [Client] Response data: {}
at createConsoleError (http://localhost:3000/_next/static/chunks/node_modules_next_dist_client_8f19e6fb._.js:882:71)
at handleConsoleError (http://localhost:3000/_next/static/chunks/node_modules_next_dist_client_8f19e6fb._.js:1058:54)
at console.error (http://localhost:3000/_next/static/chunks/node_modules_next_dist_client_8f19e6fb._.js:1223:57)
at ReiApiCcaClient.testAuthentication (http://localhost:3000/_next/static/chunks/src_75e988f8._.js:96:25)
at async testAuthentication (http://localhost:3000/_next/static/chunks/src_75e988f8._.js:350:28)

157 | if (error.response) {
158 | console.error(`[Client] Response status: ${error.response.status}`);

> 159 | console.error(`[Client] Response data:`, error.response.data);

      |                 ^

160 | }
161 |
162 | throw new Error(`Authentication test failed: ${error.message}`);
Console error 4

Error: Authentication test failed: Request failed with status code 401
at ReiApiCcaClient.testAuthentication (http://localhost:3000/_next/static/chunks/src_75e988f8._.js:98:19)
at async testAuthentication (http://localhost:3000/_next/static/chunks/src_75e988f8._.js:350:28)
160 | }
161 |

> 162 | throw new Error(`Authentication test failed: ${error.message}`);

      |             ^

163 | }
164 | }
165 |
