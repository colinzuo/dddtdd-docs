# Cypress Component Testing

## Quick Example

```ts
import Button from './Button.vue'

it('uses custom text for the button label', () => {
  cy.mount(Button, {
    slots: {
      default: 'Click me!',
    },
  })
  cy.get('button').should('contains.text', 'Click me!')
})
```

## Why Cypress Component Testing?

Our Test Runner is browser-based, allowing you to test not only your component's functionality but **also styles and appearance**

## Component Testing vs. End-to-End Testing

The primary difference is that Cypress Component Testing builds your components using a development server instead of rendering within a complete website, which results in faster tests and fewer dependencies on infrastructure than end-to-end tests covering the same code paths.
