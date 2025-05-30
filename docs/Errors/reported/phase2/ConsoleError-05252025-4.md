Build Error
Export createReiApiCcaClient doesn't exist in target module

Error: ./src/lib/api/api-client.ts:11:1
Export createReiApiCcaClient doesn't exist in target module
[0m [90m 9 |[39m [90m \*/[39m[0m
[0m [90m 10 |[39m[0m
[0m[31m[1m>[22m[39m[90m 11 |[39m [36mimport[39m {[0m
[0m [90m |[39m [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[0m
[0m[31m[1m>[22m[39m[90m 12 |[39m [33mReiApiCcaClient[39m[33m,[39m[0m
[0m [90m |[39m [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[0m
[0m[31m[1m>[22m[39m[90m 13 |[39m createReiApiCcaClient[33m,[39m[0m
[0m [90m |[39m [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[0m
[0m[31m[1m>[22m[39m[90m 14 |[39m [33mApiCredentials[39m[33m,[39m[0m
[0m [90m |[39m [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[0m
[0m[31m[1m>[22m[39m[90m 15 |[39m } [36mfrom[39m [32m"./rei-api-cca"[39m[33m;[39m[0m
[0m [90m |[39m [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[0m
[0m [90m 16 |[39m [36mimport[39m { [33mREMAX_AZURA_CREDENTIALS[39m[33m,[39m [33mREMAX_BLUE_OCEAN_CREDENTIALS[39m } [36mfrom[39m [32m"./index"[39m[33m;[39m[0m
[0m [90m 17 |[39m[0m
[0m [90m 18 |[39m [90m// Define environment variable names for API credentials[39m[0m

The export createReiApiCcaClient was not found in module [project]/src/lib/api/rei-api-cca.ts [app-client] (ecmascript).
Did you mean to import ReiApiCcaClient?
All exports of the module are statically known (It doesn't have dynamic exports). So it's known statically that the requested export doesn't exist.
at BuildError (http://localhost:3001/_next/static/chunks/%5Broot-of-the-server%5D\_\_e2c08166._.js:17395:41)
at react-stack-bottom-frame (http://localhost:3001/_next/static/chunks/node_modules_react-dom_82bb97c6._.js:13596:24)
at renderWithHooksAgain (http://localhost:3001/_next/static/chunks/node_modules_react-dom_82bb97c6._.js:3615:24)
at renderWithHooks (http://localhost:3001/_next/static/chunks/node_modules_react-dom_82bb97c6._.js:3566:28)
at updateFunctionComponent (http://localhost:3001/_next/static/chunks/node_modules_react-dom_82bb97c6._.js:5317:21)
at beginWork (http://localhost:3001/_next/static/chunks/node_modules_react-dom_82bb97c6._.js:5916:24)
at runWithFiberInDEV (http://localhost:3001/_next/static/chunks/node_modules_react-dom_82bb97c6._.js:1335:74)
at performUnitOfWork (http://localhost:3001/_next/static/chunks/node_modules_react-dom_82bb97c6._.js:7988:97)
at workLoopSync (http://localhost:3001/_next/static/chunks/node_modules_react-dom_82bb97c6._.js:7880:40)
at renderRootSync (http://localhost:3001/_next/static/chunks/node_modules_react-dom_82bb97c6._.js:7863:13)
at performWorkOnRoot (http://localhost:3001/_next/static/chunks/node_modules_react-dom_82bb97c6._.js:7602:212)
at performWorkOnRootViaSchedulerTask (http://localhost:3001/_next/static/chunks/node_modules_react-dom_82bb97c6._.js:8566:9)
at MessagePort.performWorkUntilDeadline (http://localhost:3001/_next/static/chunks/node_modules_a51498a5._.js:1119:64)
