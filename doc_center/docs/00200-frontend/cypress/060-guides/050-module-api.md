# Module API

## cypress.run()

```ts
// e2e-run-tests.js
const cypress = require('cypress')

cypress.run({
  reporter: 'junit',
  browser: 'chrome',
  config: {
    baseUrl: 'http://localhost:8080',
    video: true,
  },
  env: {
    login_url: '/login',
    products_url: '/products',
  },
})
```
