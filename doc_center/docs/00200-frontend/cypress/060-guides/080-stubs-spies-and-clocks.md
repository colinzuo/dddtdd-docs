# Stubs, Spies, and Clocks

## What you'll learn

- Which libraries Cypress includes to provide typical testing functionality
- How to use stubs for asserting that code was called but preventing it from executing
- How to use spies for asserting that code was called without interfering with its execution
- How to control time for deterministically testing code that is time-dependent
- How Cypress improves and extends the included libraries

## Capabilities

Cypress comes built in with the ability to stub and spy with `cy.stub()`, `cy.spy()` or modify your application's time with `cy.clock()` - which lets you manipulate `Date`, `setTimeout`, `clearTimeout`, `setInterval`, or `clearInterval`

## Libraries and Tools

Cypress automatically bundles and wraps these libraries:

- **sinon**	provides the `cy.stub()` and `cy.spy()` APIs
- **lolex**	provides the `cy.clock()` and `cy.tick()` APIs
- **sinon-chai**	adds `chai` assertions for stubs and spies

## Common Scenarios

### Stubs

```ts
// create a standalone stub (generally for use in unit test)
cy.stub()

// replace obj.method() with a stubbed function
cy.stub(obj, 'method')

// force obj.method() to return "foo"
cy.stub(obj, 'method').returns('foo')

// force obj.method() when called with "bar" argument to return "foo"
cy.stub(obj, 'method').withArgs('bar').returns('foo')

// force obj.method() to return a promise which resolves to "foo"
cy.stub(obj, 'method').resolves('foo')

// force obj.method() to return a promise rejected with an error
cy.stub(obj, 'method').rejects(new Error('foo'))
```

### Spies

```ts
cy.spy(obj, 'method')
```

### Clock

With `cy.clock()` you can control:

- Date
- setTimeout
- setInterval

```ts
cy.clock()
cy.visit('http://localhost:3333')
cy.get('#search').type('Acme Company')
cy.tick(1000)
// more test code here

// restore the clock
cy.clock().then((clock) => {
  clock.restore()
})
// more test code here
```
