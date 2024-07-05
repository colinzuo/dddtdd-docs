# Using Plugins

## Adding a Plugin

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

`plugins` also accepts **presets** including several plugins as a single element. This is useful for complex features (like framework integration) that are implemented using several plugins. The array will be flattened internally
