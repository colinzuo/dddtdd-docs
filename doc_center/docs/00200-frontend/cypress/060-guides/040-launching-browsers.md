# Launching Browsers

When you run tests in Cypress, we launch a browser for you. This enables us to:

- Create a clean, pristine testing environment.
- Access the **privileged browser APIs** for automation

## Browsers

### Customize available browsers

```ts
import { defineConfig } from 'cypress'

export default defineConfig({
  // setupNodeEvents can be defined in either
  // the e2e or component configuration
  e2e: {
    setupNodeEvents(on, config) {
      // inside config.browsers array each object has information like
      // {
      //   name: 'chrome',
      //   channel: 'canary',
      //   family: 'chromium',
      //   displayName: 'Canary',
      //   version: '80.0.3966.0',
      //   path:
      //    '/Applications/Canary.app/Contents/MacOS/Canary',
      //   majorVersion: 80
      // }
      return {
        browsers: config.browsers.filter(
          (b) => b.family === 'chromium' && b.name !== 'electron'
        ),
      }
    },
  },
})
```

## Browser Environment

Cypress launches the browser in a way that's **different from a regular browser** environment. But it launches in a way that we believe makes testing **more reliable and accessible**.

### Launching Browsers

When Cypress goes to launch your browser it will give you an opportunity to modify the arguments used to launch the browser.

This enables you to do things like:

- Load your own extension
- Enable or disable experimental features

### Cypress Profile

Cypress generates its own isolated profile apart from your normal browser profile. This means things like `history` entries, `cookies`, and `3rd party extensions` from your regular browsing session will not affect your tests in Cypress

### Disabled Barriers

The Cypress launched browser automatically:

- Ignores certificate errors.
- Allows blocked pop-ups.
- Disables 'Saving passwords'.
- Disables 'Autofill forms and passwords'.
- Disables asking to become your primary browser.
- Disables device discovery notifications.
- Disables language translations.
- Disables restoring sessions.
- Disables background network traffic.
- Disables background and renderer throttling.
- Disables prompts requesting permission to use devices like cameras or mics
- Disables user gesture requirements for autoplaying videos
