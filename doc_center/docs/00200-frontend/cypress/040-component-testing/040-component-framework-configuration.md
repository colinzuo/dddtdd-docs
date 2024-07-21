# Component Testing Config

## Custom Index File

By default, Cypress renders your components into an HTML file located at `cypress/support/component-index.html`

```ts
{
  component: {
    devServer,
    indexHtmlFile: '/custom/path/to/component-index.html'
  }
}
```

## Custom Dev Server

```ts
import { defineConfig } from 'cypress'

export default defineConfig({
  component: {
    async devServer({
      specs,
      cypressConfig,
      devServerEvents,
    }: DevServerOptions) {
      const { port, close } = await startDevServer(
        specs,
        cypressConfig,
        devServerEvents
      )

      return {
        port,
        close,
      }
    },
  },
})
```

Any requests triggered during a test using the `devServerPublicPathRoute` as defined in the `cypressConfig` will be forwarded to your server. Cypress will trigger a request for `[devServerPublicPathRoute]/index.html` when a test is started. Your server needs to reply with the html-file referenced in `cypressConfig.indexHtmlFile` and inject a script to load the support files and the actual test

For a real-world example, you can refer to this [loader](https://github.com/cypress-io/cypress/blob/466155c2125476374d9f9549530f67d0c6354a41/npm/vite-dev-server/src/plugins/cypress.ts#L82-L92) used by the **Vite Dev Server**

## Spec Pattern for Component Tests

```ts
{
  component: {
    specPattern: 'src/**/*.cy.{js,jsx,ts,tsx}'
  }
}
```


