# Variables and Aliases

## What you'll learn

- How to deal with async commands
- What Aliases are and how they simplify your code
- Why you rarely need to use variables with Cypress
- How to use Aliases for objects, elements and routes

## Return Values

### Closures

```ts
cy.get('button').then(($btn) => {

  // store the button's text
  const txt = $btn.text()

  // submit a form
  cy.get('form').submit()

  // compare the two buttons' text
  // and make sure they are different
  cy.get('button').should(($btn2) => {
    expect($btn2.text()).not.to.eq(txt)
  })
})

// these commands run after all of the
// other previous commands have finished
cy.get(...).find(...).should(...)
```

### Debugging

```ts
cy.get('button').then(($btn) => {
  // inspect $btn <object>
  debugger

  cy.get('[data-testid="countries"]')
    .select('USA')
    .then(($select) => {
      // inspect $select <object>
      debugger

      cy.clock().then(($clock) => {
        // inspect $clock <object>
        debugger

        $btn // is still available
        $select // is still available too
      })
    })
})
```

### Variables

```ts
// cypress test code
cy.get('[data-testid="num"]').then(($span) => {
  // capture what num is right now
  const num1 = parseFloat($span.text())

  cy.get('button')
    .click()
    .then(() => {
      // now capture it again
      const num2 = parseFloat($span.text())

      // make sure it's what we expected
      expect(num2).to.eq(num1 + 1)
    })
})
```

## Aliases

### Sharing Context

```ts
beforeEach(() => {
  // alias the $btn.text() as 'text'
  cy.get('button').invoke('text').as('text')
})

it('has access to text', function () {
  this.text // is now available
})
```

Under the hood, aliasing basic objects and primitives utilizes **Mocha's shared context object**: that is, aliases are available as `this.*`

When using `this.users`, it is stored on the context when it is first evaluated. But when using `cy.get('@users')`, any queries are re-evaluated every time the alias is accessed

```ts
const favorites = { color: 'blue' }

cy.wrap(favorites).its('color').as('favoriteColor')

cy.then(function () {
  favorites.color = 'red'
})

cy.get('@favoriteColor').then(function (aliasValue) {
  expect(aliasValue).to.eql('red')

  expect(this.favoriteColor).to.eql('blue')
})
```

### Elements

```ts
// alias all of the tr's found in the table as 'rows'
cy.get('table').find('tr').as('rows')

// Cypress returns the reference to the <tr>'s
// which allows us to continue to chain commands
// finding the 1st row.
cy.get('@rows').first().click()
```

### Aliases are reset before each test

all aliases are **reset before each test**. A common user mistake is to create aliases using the before hook. Such aliases work in the first test only!


