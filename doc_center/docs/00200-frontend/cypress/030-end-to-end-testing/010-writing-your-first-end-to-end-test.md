# Your First Test with Cypress

## What you'll learn

- How to start testing a new project in Cypress.
- What passing and failing tests look like.
- Testing web navigation, DOM querying, and writing assertions.

## Add a test file

![create-new-spec](https://docs.cypress.io/img/guides/end-to-end-testing/writing-your-first-end-to-end-test/create-new-spec.png)

## Write your first test

```ts
describe('My First Test', () => {
  it('Does not do much!', () => {
    expect(true).to.equal(true)
  })
})
```

## Write a real test

```ts
describe('My First Test', () => {
  it('Gets, types and asserts', () => {
    cy.visit('https://example.cypress.io')

    cy.contains('type').click()

    // Should be on a new URL which
    // includes '/commands/actions'
    cy.url().should('include', '/commands/actions')

    // Get an input, type into it
    cy.get('.action-email').type('fake@email.com')

    //  Verify that the value has been updated
    cy.get('.action-email').should('have.value', 'fake@email.com')
  })
})
```
