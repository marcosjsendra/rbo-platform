Error: ./src/components/examples/SupabaseExample.tsx:11:1
Export [32msupabaseClient[39m doesn't exist in target module
[0m [90m 9 |[39m[0m
[0m [90m 10 |[39m [36mimport[39m { useState[33m,[39m useEffect } [36mfrom[39m [32m'react'[39m[0m
[0m[31m[1m>[22m[39m[90m 11 |[39m [36mimport[39m { supabaseClient } [36mfrom[39m [32m'@/lib/supabase'[39m[0m
[0m [90m |[39m [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[0m
[0m [90m 12 |[39m[0m
[0m [90m 13 |[39m [90m// Define the Zone type based on our database schema[39m[0m
[0m [90m 14 |[39m type [33mZone[39m [33m=[39m {[0m

The export [32msupabaseClient[39m was not found in module [1m[31m[project]/src/lib/supabase/index.ts [app-client] (ecmascript)[39m[22m.
[1m[31mThe module has no exports at all.[39m[22m
All exports of the module are statically known (It doesn't have dynamic exports). So it's known statically that the requested export doesn't exist.
at BuildError (http://localhost:3000/_next/static/chunks/node_modules_next_dist_client_8f19e6fb._.js:11144:41)
at react-stack-bottom-frame (http://localhost:3000/_next/static/chunks/node_modules_next_dist_compiled_2ce9398a._.js:14911:24)
at renderWithHooksAgain (http://localhost:3000/_next/static/chunks/node_modules_next_dist_compiled_2ce9398a._.js:6256:24)
at renderWithHooks (http://localhost:3000/_next/static/chunks/node_modules_next_dist_compiled_2ce9398a._.js:6207:28)
at updateFunctionComponent (http://localhost:3000/_next/static/chunks/node_modules_next_dist_compiled_2ce9398a._.js:7543:21)
at beginWork (http://localhost:3000/_next/static/chunks/node_modules_next_dist_compiled_2ce9398a._.js:8142:24)
at runWithFiberInDEV (http://localhost:3000/_next/static/chunks/node_modules_next_dist_compiled_2ce9398a._.js:3073:74)
at performUnitOfWork (http://localhost:3000/_next/static/chunks/node_modules_next_dist_compiled_2ce9398a._.js:10243:97)
at workLoopSync (http://localhost:3000/_next/static/chunks/node_modules_next_dist_compiled_2ce9398a._.js:10135:40)
at renderRootSync (http://localhost:3000/_next/static/chunks/node_modules_next_dist_compiled_2ce9398a._.js:10118:13)
at performWorkOnRoot (http://localhost:3000/_next/static/chunks/node_modules_next_dist_compiled_2ce9398a._.js:9853:212)
at performWorkOnRootViaSchedulerTask (http://localhost:3000/_next/static/chunks/node_modules_next_dist_compiled_2ce9398a._.js:10826:9)
at MessagePort.performWorkUntilDeadline (http://localhost:3000/_next/static/chunks/node_modules_next_dist_compiled_2ce9398a._.js:1982:64)
