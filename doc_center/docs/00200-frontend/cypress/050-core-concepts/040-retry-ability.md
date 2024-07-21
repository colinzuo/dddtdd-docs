# Retry-ability

## What you'll learn

- How Cypress retries commands and assertions
- When commands are retried and when they are not
- How to address some situations of flaky tests

## Commands, Queries and Assertions

the different rules by which they operate.

- Queries link up, **retrying the entire chain together**.
- Assertions are a type of query that's specially displayed in the command log.
- Non-queries only **execute once**.

## Multiple assertions

Queries and assertions are always executed in order, and always retry 'from the top'. 

## Implicit Assertions

Cypress tries to act like a human user would using the browser.

- Can a user click on the element?
- Is the element invisible?
- Is the element behind another element?
- Does the element have the disabled attribute?

## Timeouts

### Increase time to retry

```ts
// we've modified the timeout which affects default + added assertions
cy.get('[data-testid="mobile-nav"]', { timeout: 10000 })
  .should('be.visible')
  .and('contain', 'Home')
```

### Disable retry

Overriding the timeout to `0` will essentially disable retrying the query, since it will spend `0` milliseconds retrying

```ts
// check synchronously that the element does not exist (no retry)
// for example just after a server-side render
cy.get('[data-testid="ssr-error"]', { timeout: 0 }).should('not.exist')
```

## Only queries are retried

Cypress will retry any queries **leading up to a command**, and retry any assertions **after a command**, but commands themselves only execute once


