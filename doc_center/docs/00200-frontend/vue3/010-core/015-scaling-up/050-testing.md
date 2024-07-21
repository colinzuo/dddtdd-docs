# Testing

## Why Test?

Automated tests help you and your team build complex Vue applications quickly and confidently by **preventing regressions** and **encouraging you to break apart** your application into testable functions, modules, classes, and components

## Unit Testing

[Vitest](https://vitest.dev/)

## Component Testing

Much of your Vue Application should be covered by a component test and we **recommend** that each Vue component has its own spec file

Component tests **should not mock** child components, but instead test the interactions between your component and its children by interacting with the components as a user would

Component tests should focus on the component's **public interfaces** rather than internal implementation details

When testing, remember to **test what a component does, not how it does it**

### Recommendation

- [Cypress Component Testing](https://docs.cypress.io/guides/component-testing/overview) for components whose expected behavior depends on properly rendering styles or triggering native DOM events

```js
const valueSelector = '[data-testid=stepper-value]'
const buttonSelector = '[data-testid=increment]'

mount(Stepper, {
  props: {
    max: 1
  }
})

cy.get(valueSelector).should('be.visible').and('contain.text', '0')
  .get(buttonSelector).click()
  .get(valueSelector).should('contain.text', '1')
```

## E2E Testing

### Visibility in headless mode

When end-to-end (E2E) tests are run in continuous integration/deployment pipelines, they are often run in **headless browsers** (i.e., no visible browser is opened for the user to watch). A critical feature of modern E2E testing frameworks is the ability to **see snapshots and/or videos** of the application during testing

Overall, we believe **Cypress** provides the **most complete E2E solution** with features like an informative graphical interface, excellent debuggability, built-in assertions, stubs, flake-resistance, parallelization, and snapshots
