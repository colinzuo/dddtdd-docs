# Cypress Component Testing

## Configuring Component Testing

### Config Files

![scaffolded-files](https://docs.cypress.io/img/guides/component-testing/scaffolded-files.jpg)

## Writing Your First Test

```ts
import Stepper from './Stepper.vue'

describe('<Stepper />', () => {
  it('mounts', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(Stepper)
  })
})
```

## Running the Test

There are various ways to select items from the DOM using Cypress. We will use `cy.get()`, which allows us to pass in a CSS-like selector

### Passing Props to Components

```ts
it('supports a "count" prop to set the value', () => {
  cy.mount(Stepper, { props: { count: 100 } })
  cy.get('[data-cy=counter]').should('have.text', '100')
})
```

### Testing Interactions

```ts
it('when the increment button is pressed, the counter is incremented', () => {
  cy.mount(Stepper)
  cy.get('[data-cy=increment]').click()
  cy.get('[data-cy=counter]').should('have.text', '1')
})

it('when the decrement button is pressed, the counter is decremented', () => {
  cy.mount(Stepper)
  cy.get('[data-cy=decrement]').click()
  cy.get('[data-cy=counter]').should('have.text', '-1')
})
```

## Testing Components with Events

### Using Spies

We use `cy.get()` to grab the alias to the spy (by prepending an "`@`" to the alias name)

```ts
it('clicking + fires a change event with the incremented value', () => {
  const onChangeSpy = cy.spy().as('onChangeSpy')
  cy.mount(Stepper, { props: { onChange: onChangeSpy } })
  cy.get('[data-cy=increment]').click()
  cy.get('@onChangeSpy').should('have.been.calledWith', 1)
})
```
