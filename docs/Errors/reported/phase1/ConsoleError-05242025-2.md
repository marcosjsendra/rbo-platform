Error: A tree hydrated but some attributes of the server rendered HTML didn't match the client properties. This won't be patched up. This can happen if a SSR-ed Client Component used:

- A server/client branch `if (typeof window !== 'undefined')`.
- Variable input such as `Date.now()` or `Math.random()` which changes each time it's called.
- Date formatting in a user's locale which doesn't match the server.
- External changing data without sending a snapshot of it along with the HTML.
- Invalid HTML tag nesting.

It can also happen if the client has a browser extension installed which messes with the HTML before React loaded.

https://react.dev/link/hydration-mismatch

  ...
    <HotReload assetPrefix="">
      <ReactDevOverlay state={{nextId:1, ...}} dispatcher={{...}}>
        <DevRootHTTPAccessFallbackBoundary>
          <HTTPAccessFallbackBoundary notFound={<NotAllowedRootHTTPFallbackError>}>
            <HTTPAccessFallbackErrorBoundary pathname="/" notFound={<NotAllowedRootHTTPFallbackError>} ...>
              <RedirectBoundary>
                <RedirectErrorBoundary router={{...}}>
                  <Head>
                  <link>
                  <script>
                  <script>
                  <RootLayout>
                    <html lang="en">
                      <body
                        className="geist_e531dabc-module__QGiZLq__variable geist_mono_68a01160-module__YLcDdW__variabl..."
-                       cz-shortcut-listen="true"
                      >
                  ...
        ...

    at createUnhandledError (http://localhost:3000/_next/static/chunks/node_modules_next_dist_client_523921._.js:689:49)
    at handleClientError (http://localhost:3000/_next/static/chunks/node_modules_next_dist_client_523921._.js:856:56)
    at console.error (http://localhost:3000/_next/static/chunks/node_modules_next_dist_client_523921._.js:991:56)
    at emitPendingHydrationWarnings (http://localhost:3000/_next/static/chunks/node_modules_next_dist_compiled_react-dom_1f56dc._.js:2768:103)
    at completeWork (http://localhost:3000/_next/static/chunks/node_modules_next_dist_compiled_react-dom_1f56dc._.js:7238:102)
    at runWithFiberInDEV (http://localhost:3000/_next/static/chunks/node_modules_next_dist_compiled_react-dom_1f56dc._.js:631:20)
    at completeUnitOfWork (http://localhost:3000/_next/static/chunks/node_modules_next_dist_compiled_react-dom_1f56dc._.js:8020:23)
    at performUnitOfWork (http://localhost:3000/_next/static/chunks/node_modules_next_dist_compiled_react-dom_1f56dc._.js:7957:28)
    at workLoopConcurrent (http://localhost:3000/_next/static/chunks/node_modules_next_dist_compiled_react-dom_1f56dc._.js:7951:58)
    at renderRootConcurrent (http://localhost:3000/_next/static/chunks/node_modules_next_dist_compiled_react-dom_1f56dc._.js:7933:71)
    at performWorkOnRoot (http://localhost:3000/_next/static/chunks/node_modules_next_dist_compiled_react-dom_1f56dc._.js:7565:175)
    at performWorkOnRootViaSchedulerTask (http://localhost:3000/_next/static/chunks/node_modules_next_dist_compiled_react-dom_1f56dc._.js:8394:9)
    at MessagePort.performWorkUntilDeadline (http://localhost:3000/_next/static/chunks/node_modules_next_dist_compiled_107ce8._.js:2353:64)