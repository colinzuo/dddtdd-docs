# Integrating with Cypress Component Testing

All officially supported libraries feature a first class onboarding experience, where we detect and scaffold the correct files, and a framework-specific mount adapter to render your components. We call this collection of features a **Framework Definition** since it defines the requirements for a library or framework to work in Cypress

## Concepts

There are a few requirements for authoring a Framework Definition.

- Definition File (we recommending naming this `definition.cjs`)
- Mount Adapter (we recommending naming this `index.mjs`)
- A `package.json` with the correct conventions

The Definition is required **when users configure Component Testing for the first** time. The Mount adapter is used to **render components when writing tests**

## Mount Adapter

```ts
import { getContainerEl, setupHooks } from '@cypress/mount-utils'
import { render } from 'solid-js/web'

let dispose

function cleanup() {
  dispose?.()
}

/**
 * @param {() => JSX.Element} - component to render
 */
export function mount(component, options = {}) {
  // Retrieve root DOM element that Cypress has prepared for this test
  const root = getContainerEl()

  dispose = render(() => component, root)

  // Wait until next microtick to ensure any async render logic has executed
  return cy.wait(0, { log: false }).then(() => {
    if (options.log !== false) {
      Cypress.log({
        name: 'mount',
        message: 'Mounted component',
      })
    }
  })
}

// Cleanup between each test
setupHooks(cleanup)
```

