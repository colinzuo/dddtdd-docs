
## Getting Started

A dev server that provides rich feature enhancements **over native ES modules**, for example extremely fast **Hot Module Replacement (HMR)**.

A build command that bundles your code with **Rollup**

The default build **targets browsers that support native ES Modules**

```bash
npm create vite@latest my-vue-app -- --template vue
```

One thing you may have noticed is that in a Vite project, index.html is front-and-central instead of being tucked away inside public. 

Vite treats index.html as source code and part of the module graph. It resolves `<script type="module" src="...">` that references your JavaScript source code.

## Features

### NPM Dependency Resolving and Pre-Bundling

```js
import { someMethod } from 'my-dep'
```

- Pre-bundle them to improve page loading speed and convert CommonJS / UMD modules to ESM
- Rewrite the imports to valid URLs like `/node_modules/.vite/deps/my-dep.js?v=f3sf2ebd` so that the browser can import them properly

### TypeScript

Vite only performs transpilation on .ts files and does NOT perform type checking

### CSS

Vite is pre-configured to support CSS **@import inlining via postcss-import**.

### Static Assets

Importing a static asset will return the resolved public URL when it is served

```js
import imgUrl from './img.png'
document.getElementById('hero-img').src = imgUrl
```

### JSON

```js
// import the entire object
import json from './example.json'
// import a root field as named exports - helps with tree-shaking!
import { field } from './example.json'
```

## Using Plugins

### Adding a Plugin

To use a plugin, it needs to be added to the **devDependencies** of the project and included in the **plugins array in the vite.config.js** config file

```bash
$ npm add -D @vitejs/plugin-legacy
```

```js
// vite.config.js
import legacy from '@vitejs/plugin-legacy'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
  ],
})
```

## Static Asset Handling

### Importing Asset as URL

```js
import imgUrl from './img.png'
document.getElementById('hero-img').src = imgUrl
```

For example, imgUrl will be /img.png during development, and become `/assets/img.2d8efhg.png` in the production build.

### The public Directory

you can place the asset in a special public directory under your project root. Assets in this directory will be served at root path / during dev, and copied to the root of the dist directory as-is.

The directory defaults to `<root>/public`, but can be configured via the `publicDir` option.

## Building for Production

### Public Base Path

If you are deploying your project under a nested public path, simply specify the **base config option** and all asset paths will be rewritten accordingly

### Customizing the Build

The build can be customized via various **build config options**

### Chunking Strategy

You can configure how chunks are split using `build.rollupOptions.output.manualChunks`

```js
// vite.config.js
import { splitVendorChunkPlugin } from 'vite'
export default defineConfig({
  plugins: [splitVendorChunkPlugin()],
})
```

## Env Variables and Modes

Vite exposes env variables on the special `import.meta.env` object.

- import.meta.env.MODE
- import.meta.env.BASE_URL
- import.meta.env.PROD
- import.meta.env.DEV

### .env Files

Vite uses **dotenv** to load additional environment variables from the following files in your environment directory:

```
.env                # loaded in all cases
.env.local          # loaded in all cases, ignored by git
.env.[mode]         # only loaded in specified mode
.env.[mode].local   # only loaded in specified mode, ignored by git
```

To prevent accidentally leaking env variables to the client, only variables prefixed with `VITE_` are exposed to your Vite-processed code

### Modes

By default, the dev server (dev command) runs in `development` mode and the build command runs in `production` mode

## Plugin API

### Plugins config

plugins also accepts presets including several plugins as a single element. 

```js
// framework-plugin
import frameworkRefresh from 'vite-plugin-framework-refresh'
import frameworkDevtools from 'vite-plugin-framework-devtools'

export default function framework(config) {
  return [frameworkRefresh(config), frameworkDevTools(config)]
}
```

```js
// vite.config.js
import { defineConfig } from 'vite'
import framework from 'vite-plugin-framework'

export default defineConfig({
  plugins: [framework()],
})
```

### Simple Examples

```js
const fileRegex = /\.(my-file-ext)$/

export default function myPlugin() {
  return {
    name: 'transform-file',

    transform(src, id) {
      if (fileRegex.test(id)) {
        return {
          code: compileFileToJS(src),
          map: null, // provide source map if available
        }
      }
    },
  }
}
```

### Universal Hooks

The following hooks are called once on server start:

- options
- buildStart
- 
The following hooks are called on each incoming module request:

- resolveId
- load
- transform

The following hooks are called when the server is closed:

- buildEnd
- closeBundle

### Vite Specific Hooks

- config

Modify Vite config before it's resolved.

`(config: UserConfig, env: { mode: string, command: string }) => UserConfig | null | void`

```js
// return partial config (recommended)
const partialConfigPlugin = () => ({
  name: 'return-partial',
  config: () => ({
    resolve: {
      alias: {
        foo: 'bar',
      },
    },
  }),
})

// mutate the config directly (use only when merging doesn't work)
const mutateConfigPlugin = () => ({
  name: 'mutate-config',
  config(config, { command }) {
    if (command === 'build') {
      config.root = 'foo'
    }
  },
})
```

- configResolved

Called after the Vite config is resolved.

```js
const examplePlugin = () => {
  let config

  return {
    name: 'read-config',

    configResolved(resolvedConfig) {
      // store the resolved config
      config = resolvedConfig
    },

    // use stored config in other hooks
    transform(code, id) {
      if (config.command === 'serve') {
        // dev: plugin invoked by dev server
      } else {
        // build: plugin invoked by Rollup
      }
    },
  }
}
```

- configureServer

Hook for configuring the dev server.

### Plugin Ordering

The resolved plugins will be in the following order

- Alias
- User plugins with enforce: 'pre'
- Vite core plugins
- User plugins without enforce value
- Vite build plugins
- User plugins with enforce: 'post'
- Vite post build plugins (minify, manifest, reporting)

## config

### Configuring Vite

```ts
import { defineConfig } from 'vite'

export default defineConfig({
  // ...
})
```

### Shared Options

- root: Project root directory (where index.html is located)
- base: Base public path when served in development or production
- mode: 'development' for serve, 'production' for build
- define: Define global constant replacements
- plugins: Array of plugins to use.
- publicDir: Directory to serve as plain static assets
- resolve.alias: Will be passed to `@rollup/plugin-alias` as its entries option
- css.modules: Configure CSS modules behavior. The options are passed on to postcss-modules.

### Server Options

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

### Build Options

- build.outDir: Specify the output directory (relative to project root)
- build.assetsDir: Specify the directory to nest generated assets under (relative to build.outDir)
- build.assetsInlineLimit: Imported or referenced assets that are smaller than this threshold will be inlined as base64 URLs to avoid extra http requests
- build.cssCodeSplit: When enabled, CSS imported in async chunks will be inlined into the async chunk itself and inserted when the chunk is loaded
- build.emptyOutDir: By default, Vite will empty the outDir on build if it is inside project root.

## @vitejs/plugin-vue

```js
// vite.config.js
import vue from '@vitejs/plugin-vue'

export default {
  plugins: [vue()],
}
```
