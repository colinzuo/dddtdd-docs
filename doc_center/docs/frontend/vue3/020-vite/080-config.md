# config

## Configuring Vite

### Config Intellisense

```ts
import { defineConfig } from 'vite'

export default defineConfig({
  // ...
})
```

## Shared Options

- root: Project root directory (where `index.html` is located)
- base: Base public path when served in development or production
- mode: 'development' for serve, 'production' for build
- define: Define global constant replacements
- plugins: Array of plugins to use.
- publicDir: Directory to serve as plain static assets
- resolve.alias: Will be passed to `@rollup/plugin-alias` as its entries option
- css.modules: Configure CSS modules behavior. The options are passed on to postcss-modules.

## Server Options

- server.port
- server.proxy: Uses `http-proxy`

```js
export default defineConfig({
  server: {
    proxy: {
      // string shorthand: http://localhost:5173/foo -> http://localhost:4567/foo
      '/foo': 'http://localhost:4567',
      // with options: http://localhost:5173/api/bar-> http://jsonplaceholder.typicode.com/bar
      '/api': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      // with RegEx: http://localhost:5173/fallback/ -> http://jsonplaceholder.typicode.com/
      '^/fallback/.*': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/fallback/, ''),
      },
      // Using the proxy instance
      '/api': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        configure: (proxy, options) => {
          // proxy will be an instance of 'http-proxy'
        },
      },
      // Proxying websockets or socket.io: ws://localhost:5173/socket.io -> ws://localhost:5174/socket.io
      '/socket.io': {
        target: 'ws://localhost:5174',
        ws: true,
      },
    },
  },
})
```

## Build Options

- build.target: Browser compatibility target for the final bundle
- build.outDir: Specify the output directory (relative to project root)
- build.assetsDir: Specify the directory to nest generated assets under (relative to build.outDir)
- build.assetsInlineLimit: Imported or referenced assets that are smaller than this threshold will be **inlined as base64 URLs** to avoid extra http requests
- build.cssCodeSplit: When enabled, CSS imported in async chunks will be inlined into the async chunk itself and inserted when the chunk is loaded
- build.emptyOutDir: By default, Vite will empty the outDir on build if it is inside project root.
