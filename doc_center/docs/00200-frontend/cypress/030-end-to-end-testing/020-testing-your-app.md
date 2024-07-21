# Testing Your App

## What you'll learn

- The relationship between Cypress and your back end
- How to configure Cypress to fit your app
- Working with (or without!) your authentication mechanism
- Effectively leveraging test data

## Step 1: Start your server

Assuming you've successfully installed Cypress and opened Cypress in your project, the first thing you'll want to do is **start your local development server** that hosts the application

:::note
Many of our users run the **majority** of their integration tests against a local development server, but then reserve a **smaller set of smoke tests** that run only against a deployed production app
:::

## Step 2: Visit your server

```ts
describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.visit('http://localhost:8080') // change URL to match your dev URL
  })
})
```

## Step 3: Configure Cypress

```ts title="cypress.config.ts"
import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8080',
  },
})
```

```ts
describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.visit('/')
  })
})
```

## Testing strategies

modern web testing has a few wrinkles that every team experiences, so here are some quick tips on common situations you're likely to run into

### Seeding data

Traditionally when writing `e2e` tests using Selenium, before you automate the browser you do some kind of **set up and tear down** on the server.

**While there is a lot more to this strategy, you generally have three ways to facilitate this with Cypress**:

- `cy.exec()` - to run system commands
- `cy.task()` - to run code in Node via the setupNodeEvents function
- `cy.request()` - to make HTTP requests

```ts
describe('The Home Page', () => {
  beforeEach(() => {
    // reset and seed the database prior to every test
    cy.exec('npm run db:reset && npm run db:seed')

    // seed a post in the DB that we control from our tests
    cy.request('POST', '/test/seed/post', {
      title: 'First Post',
      authorId: 1,
      body: '...',
    })

    // seed a user in the DB that we can control from our tests
    cy.request('POST', '/test/seed/user', { name: 'Jane' })
      .its('body')
      .as('currentUser')
  })

  it('successfully loads', () => {
    // this.currentUser will now point to the response
    // body of the cy.request() that we could use
    // to log in or work with in some way

    cy.visit('/')
  })
})
```

**With Cypress, there are several other approaches that can offer an arguably better and faster experience**

### Stubbing the server

Another upside is that this enables you to **build out your application** without needing the contract of the server to exist

#### Write a single e2e test without stubs, and then stub the rest

Another more balanced approach is to integrate both strategies. You likely want to have a single test that takes a **true e2e approach and stubs nothing**. It'll use the feature for real - including seeding the database and setting up state

Once you've established it's working you can then **use stubs to test all of the edge cases and additional scenarios**.

We **recommend** that the vast majority of tests use stub data. They will be orders of magnitude faster, and much less complex

### Logging in

#### Fully test the login flow -- but only once!

Logging in is one of those features that are **mission critical** and should likely involve your server. We **recommend** you test signup and login using your UI as a real user would

#### Reusing the login code

A much better solution is to write a custom `cy.login()` command.

```ts
// In cypress/support/commands.js

Cypress.Commands.add('login', (username, password) => {
  cy.visit('/login')

  cy.get('input[name=username]').type(username)

  // {enter} causes the form to submit
  cy.get('input[name=password]').type(`${password}{enter}`, { log: false })

  // we should be redirected to /dashboard
  cy.url().should('include', '/dashboard')

  // our auth cookie should be present
  cy.getCookie('your-session-cookie').should('exist')

  // UI should reflect this user being logged in
  cy.get('h1').should('contain', username)
})

// In your spec file

it('does something on a secured page', function () {
  const { username, password } = this.currentUser
  cy.login(username, password)

  // ...rest of test
})
```

#### Improving performance

Luckily, Cypress provides the `cy.session()` command, a powerful performance tool that lets you **cache the browser context** associated with your user and reuse it for multiple tests without going through multiple login flows

```ts
Cypress.Commands.add('login', (username, password) => {
  cy.session(
    username,
    () => {
      cy.visit('/login')
      cy.get('input[name=username]').type(username)
      cy.get('input[name=password]').type(`${password}{enter}`, { log: false })
      cy.url().should('include', '/dashboard')
      cy.get('h1').should('contain', username)
    },
    {
      validate: () => {
        cy.getCookie('your-session-cookie').should('exist')
      },
    }
  )
})
```
