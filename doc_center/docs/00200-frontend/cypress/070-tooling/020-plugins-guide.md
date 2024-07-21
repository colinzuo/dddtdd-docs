# Plugins

## Use Cases

### Run Lifecycle

The events `before:run` and `after:run` occur before and after a run, respectively

### Spec Lifecycle

The events `before:spec` and `after:spec` run before and after a single spec is run, respectively

### Browser Launching

The event `before:browser:launch` can be used to modify the launch arguments for each particular browser

### cy.task

The event task is used in conjunction with the `cy.task()` command. It allows you to write arbitrary code in Node to accomplish tasks that aren't possible in the browser.

You can use the task event to do things like:

- Manipulating a database (seeding, reading, writing, etc.)
- Storing state in Node that you want persisted (since the driver is fully refreshed on visits)
- Performing parallel tasks (like making multiple http requests outside of Cypress)
- Running an external process (like spinning up a Webdriver instance of another browser like Safari or puppeteer)

## Using a plugin

There are two ways to use a plugin in Cypress:

- As of Cypress version 10.0.0, you will need to add your plugin to the `setupNodeEvents` function in the Cypress configuration.

```ts
import { defineConfig } from 'cypress'

export default defineConfig({
  // setupNodeEvents can be defined in either
  // the e2e or component configuration
  e2e: {
    setupNodeEvents(on, config) {
      // bind to the event we care about
      on('<event>', (arg1, arg2) => {
        // plugin stuff here
      })
    },
  },
})
```
