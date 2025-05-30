Error: ./src/lib/supabase/server.ts:10:1
Ecmascript file had an error
[0m [90m 8 |[39m[0m
[0m [90m 9 |[39m [36mimport[39m { createServerClient } [36mfrom[39m [32m'@supabase/ssr'[39m[0m
[0m[31m[1m>[22m[39m[90m 10 |[39m [36mimport[39m { cookies } [36mfrom[39m [32m'next/headers'[39m[0m
[0m [90m |[39m [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[0m
[0m [90m 11 |[39m [36mimport[39m type { [33mDatabase[39m } [36mfrom[39m [32m'../types/supabase'[39m[0m
[0m [90m 12 |[39m[0m
[0m [90m 13 |[39m [90m/\*\*[39m[0m

You're importing a component that needs "next/headers". That only works in a Server Component which is not supported in the pages/ directory. Read more: https://nextjs.org/docs/app/building-your-application/rendering/server-components
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
