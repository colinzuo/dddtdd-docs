# Debugging

## What you'll learn

- How Cypress runs in the same event loop with your code, keeping debugging less demanding and more understandable
- How Cypress embraces the standard Developer Tools
- How and when to use debugger and the shorthand .debug() command

## Using debugger

```ts
it('let me debug when the after the command executes', () => {
  cy.mount(<MyComponent />)

  cy.get('[data-testid="selector-in-question"]').then(($selectedElement) => {
    // Debugger is hit after the cy.visit
    // and cy.get commands have completed
    debugger
  })
})
```

```ts
it('let me debug like a fiend', () => {
  cy.mount(<MyComponent />)

  cy.get('[data-testid="selector-in-question"]').debug()
})
```

The current subject that is yielded by the `cy.get()` is exposed as the variable `subject` within your Developer Tools so that you can interact with it in the console

## Step through test commands

```ts
it('adds items', () => {
  cy.pause()
  cy.get('[data-testid="new-todo"]')
  // more commands
})
```

## Using the Developer Tools

All of Cypress's commands, when clicked on within the Command Log, print extra information about the command, its subject, and its yielded result

## More info

- [When Can The Test Start?](https://www.cypress.io/blog/2018/02/05/when-can-the-test-start/)
- [When Can The Test Stop?](https://www.cypress.io/blog/2020/01/16/when-can-the-test-stop/)
- [When Can The Test Click?](https://www.cypress.io/blog/2019/01/22/when-can-the-test-click/)
- [When Can The Test Log Out?](https://www.cypress.io/blog/2020/06/25/when-can-the-test-log-out)
- [Do Not Get Too Detached](https://www.cypress.io/blog/2020/07/22/do-not-get-too-detached)
