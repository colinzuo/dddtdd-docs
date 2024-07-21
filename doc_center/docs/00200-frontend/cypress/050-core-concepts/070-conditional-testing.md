# Conditional Testing

## What you'll learn

- When conditional testing is a good choice for your tests
- Situations where conditional testing is impossible
- Strategies to handle common scenarios of conditional testing

## The problem

The problem with **conditional testing** is that it can only be used when the state has stabilized. In modern day applications, knowing when state is stable is oftentimes impossible.

## The situations

The **only** way to do conditional testing on the DOM is if you are 100% sure that the state has "settled" and there is no possible way for it to change

## The strategies

### A/B campaign

#### Use URL query params:

```ts
// tell your back end server which campaign you want sent
// so you can deterministically know what it is ahead of time
cy.visit('https://example.cypress.io?campaign=A')

...

cy.visit('https://example.cypress.io?campaign=B')

...

cy.visit('https://example.cypress.io?campaign=C')
```

Yes, this may require server side updates, but you have to **make an untestable app testable** if you want to test it!

#### Embed data in the DOM

```ts
cy.get('html')
  .should('have.attr', 'data-campaign')
  .then((campaign) => {
    return campaigns.test(campaign)
  })
```


