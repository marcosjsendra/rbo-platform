Terminal:

npm run dev

> remax-blueocean@0.1.0 dev
> next dev --turbopack

   ▲ Next.js 15.1.8 (Turbopack)
   - Local:        http://localhost:3000
   - Network:      http://192.168.0.37:3000

 ✓ Starting...
 ✓ Ready in 1236ms
 ○ Compiling / ...
 ✓ Compiled / in 2.6s
 ⨯ ./src/app/globals.css
Error evaluating Node.js code
CssSyntaxError: C:\dev\remax-blueocean\src\app\globals.css:1:1: The `border-border` class does not exist. If `border-border` is a custom class, make sure it is defined within a `@layer` directive.
    [at Input.error (turbopack://[project]/node_modules/postcss/lib/input.js:113:16)]
    [at AtRule.error (turbopack://[project]/node_modules/postcss/lib/node.js:149:32)]
    [at processApply (C:\dev\remax-blueocean\node_modules\tailwindcss\lib\lib\expandApplyAtRules.js:380:29)]
    [at C:\dev\remax-blueocean\node_modules\tailwindcss\lib\lib\expandApplyAtRules.js:551:9]
    [at C:\dev\remax-blueocean\node_modules\tailwindcss\lib\processTailwindFeatures.js:55:50]
    [at async plugins (C:\dev\remax-blueocean\node_modules\tailwindcss\lib\plugin.js:38:17)]
    [at async LazyResult.runAsync (turbopack://[project]/node_modules/postcss/lib/lazy-result.js:293:11)]
    [at async transform (turbopack://[project]/postcss.config.js/transform.ts:79:34)]
    [at async run (turbopack://[turbopack-node]/ipc/evaluate.ts:92:23)]


 ○ Compiling /_error ...
 ✓ Compiled /_error in 869ms
 GET / 500 in 3723ms
 ✓ Compiled /favicon.ico in 125ms
 GET /favicon.ico 500 in 168ms