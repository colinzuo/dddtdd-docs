# Vue Component Testing

## Installation

```bash
npm install cypress --save-dev

npx cypress open
```

The Cypress Launchpad will guide you through configuring your project.

## Vue with Vite

```ts
import { defineConfig } from 'cypress'

export default defineConfig({
  component: {
    devServer: {
      framework: 'vue',
      bundler: 'vite',
    },
  },
})
```

[](https://github.com/cypress-io/cypress-component-testing-apps/tree/main/vue3-vite-ts)
