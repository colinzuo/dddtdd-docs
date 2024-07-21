# TypeScript

## Configure tsconfig.json

```ts
{
  "compilerOptions": {
    "types": ["cypress", "node"]
  }
}
```

## Types for Custom Commands

```ts
// cypress/support/index.ts
Cypress.Commands.add('dataCy', (value) => {
  return cy.get(`[data-cy=${value}]`)
})
```

```ts
// cypress/support/index.ts
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      dataCy(value: string): Chainable<JQuery<HTMLElement>>
    }
  }
}
```


