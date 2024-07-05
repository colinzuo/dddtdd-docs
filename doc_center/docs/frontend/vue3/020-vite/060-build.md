# Building for Production

When it is time to deploy your app for production, simply run the `vite build` command. By default, it uses `<root>/index.html` as the build entry point

## Public Base Path

If you are deploying your project under a nested public path, simply specify the **base config option** and all asset paths will be rewritten accordingly

## Customizing the Build

The build can be customized via various **build config options**

```js
export default defineConfig({
  build: {
    rollupOptions: {
      // https://rollupjs.org/configuration-options/
    },
  },
})
```

## Chunking Strategy

You can configure how chunks are split using `build.rollupOptions.output.manualChunks`

```js
// vite.config.js
import { splitVendorChunkPlugin } from 'vite'
export default defineConfig({
  plugins: [splitVendorChunkPlugin()],
})
```

## Multi-Page App

During build, all you need to do is to specify multiple `.html` files as entry points

```js
// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        nested: resolve(__dirname, 'nested/index.html'),
      },
    },
  },
})
```
