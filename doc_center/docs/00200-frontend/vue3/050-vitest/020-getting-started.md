# Getting Started

## Adding Vitest to Your Project

```bash
npm install -D vitest
```

## Writing Tests

```js
// sum.test.js
import { expect, test } from 'vitest'
import { sum } from './sum'

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3)
})
```

:::tip
By default, tests must contain ".test." or ".spec." in their file name.
:::

## Configuring Vitest

```ts
import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config.mjs'

export default mergeConfig(viteConfig, defineConfig({
  test: {
    // ...
  }
}))
```

## IDE Integrations

[Install from VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=vitest.explorer)
