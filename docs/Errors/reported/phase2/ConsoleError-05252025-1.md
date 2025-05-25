Clicked on Authentication Test:

Status:Failed ❌

Error:

Failed to authenticate with REI API CCA

2 Issues

Console Error:

AxiosError: Network Error
at XMLHttpRequest.handleError (http://localhost:3000/_next/static/chunks/node_modules_67c34ef5._.js:4227:20)
at Axios.request (http://localhost:3000/_next/static/chunks/node_modules_67c34ef5._.js:4908:49)
at async ReiApiCcaClient.authenticate (http://localhost:3000/_next/static/chunks/src_75e988f8._.js:69:30)
at async ReiApiCcaClient.ensureValidToken (http://localhost:3000/_next/static/chunks/src_75e988f8._.js:59:13)
at async http://localhost:3000/_next/static/chunks/src_75e988f8._.js:45:13
at async Axios.request (http://localhost:3000/_next/static/chunks/node_modules_67c34ef5._.js:4904:20)
at async ReiApiCcaClient.getLookupNames (http://localhost:3000/_next/static/chunks/src_75e988f8._.js:172:30)
at async testAuthentication (http://localhost:3000/_next/static/chunks/src_75e988f8._.js:415:13)

Console Error 2:

Error: Failed to authenticate with REI API CCA
at ReiApiCcaClient.authenticate (http://localhost:3000/_next/static/chunks/src_75e988f8._.js:87:19)
at async ReiApiCcaClient.ensureValidToken (http://localhost:3000/_next/static/chunks/src_75e988f8._.js:59:13)
at async http://localhost:3000/_next/static/chunks/src_75e988f8._.js:45:13
at async Axios.request (http://localhost:3000/_next/static/chunks/node_modules_67c34ef5._.js:4904:20)
at async ReiApiCcaClient.getLookupNames (http://localhost:3000/_next/static/chunks/src_75e988f8._.js:172:30)
at async testAuthentication (http://localhost:3000/_next/static/chunks/src_75e988f8._.js:415:13)
