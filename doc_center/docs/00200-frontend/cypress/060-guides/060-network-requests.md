# Network Requests

## What you'll learn

- How Cypress enables you to stub out the back end with `cy.intercept()`
- What tradeoffs we make when we stub our network requests
- How Cypress visualizes network management in the Command Log
- How to use Aliases to refer back to requests and wait on them
- How to write declarative tests that resist flake

## Testing Strategies

Common testing scenarios:

- Asserting on a request's body
- Asserting on a request's url
- Asserting on a request's headers
- Stubbing a response's body
- Stubbing a response's status code
- Stubbing a response's headers
- Delaying a response
- Waiting for a response to happen

## Routing

```ts
cy.intercept(
  {
    method: 'GET', // Route all GET requests
    url: '/users/*', // that have a URL that matches '/users/*'
  },
  [] // and force the response to be: []
).as('getUsers') // and assign an alias
```

## Fixtures

A fixture is a fixed set of **data located in a file** that is used in your tests. The purpose of a test fixture is to ensure that there is a well known and fixed environment in which tests are run so that results are repeatable. Fixtures are accessed within tests by calling the `cy.fixture()` command

```ts
// we set the response to be the activites.json fixture
cy.intercept('GET', '/activities/*', { fixture: 'activities.json' })
```

## Waiting

Whether or not you choose to stub responses, Cypress enables you to declaratively `cy.wait()` for requests and their responses

```ts
cy.intercept('/activities/*', { fixture: 'activities' }).as('getActivities')
cy.intercept('/messages/*', { fixture: 'messages' }).as('getMessages')

// mounting the dashboard should make requests that match
// the two routes above
cy.mount(<Dashboard />)

// pass an array of Route Aliases that forces Cypress to wait
// until it sees a response for each request that matches
// each of these aliases
cy.wait(['@getActivities', '@getMessages'])

// these commands will not run until the wait command resolves above
cy.get('h1').should('contain', 'Dashboard')
```

```ts
cy.intercept({
  method: 'POST',
  url: '/myApi',
}).as('apiCheck')

cy.visit('/')
cy.wait('@apiCheck').then((interception) => {
  assert.isNotNull(interception.response.body, '1st API call has data')
})

cy.wait('@apiCheck').then((interception) => {
  assert.isNotNull(interception.response.body, '2nd API call has data')
})

cy.wait('@apiCheck').then((interception) => {
  assert.isNotNull(interception.response.body, '3rd API call has data')
})
```
