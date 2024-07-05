# Features

## NPM Dependency Resolving and Pre-Bundling

```js
import { someMethod } from 'my-dep'
```

- **Pre-bundle** them to improve page loading speed and convert CommonJS / UMD modules to ESM
- Rewrite the imports to valid URLs like `/node_modules/.vite/deps/my-dep.js?v=f3sf2ebd` so that the browser can import them properly

## TypeScript

### Transpile Only

Vite only performs transpilation on `.ts` files and does NOT perform type checking

It assumes type checking is taken care of by your IDE and build process

### TypeScript Compiler Options

- isolatedModules Should be set to true
- useDefineForClassFields Starting from Vite 2.5.0, the default value will be true

## Vue

- Vue 3 SFC support via `@vitejs/plugin-vue`

## CSS

### @import Inlining and Rebasing

Vite is pre-configured to support CSS `@import` inlining via `postcss-import`

`@import` aliases and URL rebasing are also supported for Sass and Less files

### CSS Pre-processors

```bash
# .scss and .sass
npm add -D sass

# .less
npm add -D less
```

## Static Assets

Importing a static asset will return the resolved public URL when it is served

```js
import imgUrl from './img.png'
document.getElementById('hero-img').src = imgUrl
```

## JSON

```js
// import the entire object
import json from './example.json'
// import a root field as named exports - helps with tree-shaking!
import { field } from './example.json'
```
