# Visual Testing

## Functional vs. visual testing

Typically such plugins take an image snapshot of the entire application under test **or a specific element**, and then compare the image to a previously approved baseline image. If the images are the same (**within a set pixel tolerance**), it is determined that the web application looks the same to the user.

```ts
it('completes todo', () => {
  cy.visit('/')
  cy.get('.new-todo').type('write tests{enter}')
  cy.contains('.todo-list li', 'write tests').find('.toggle').check()

  cy.contains('.todo-list li', 'write tests').should('have.class', 'completed')

  // run 'npm install cypress-plugin-snapshots --save'
  // capture the element screenshot and
  // compare to the baseline image
  cy.get('.todoapp').toMatchImageSnapshot({
    imageConfig: {
      threshold: 0.001,
    },
  })
})
```


