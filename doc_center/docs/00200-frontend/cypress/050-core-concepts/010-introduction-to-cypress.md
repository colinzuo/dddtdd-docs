# Introduction to Cypress

## What you'll learn

- How Cypress queries the DOM
- How Cypress manages subjects and chains of commands
- What assertions look like and how they work
- How timeouts are applied to commands

## Cypress Can Be Simple (Sometimes)

```ts
describe('Post Resource', () => {
  it('Creating a New Post', () => {
    cy.visit('/posts/new') // 1.

    cy.get("input.post-title") // 2.
      .type("My First Post"); // 3.

    cy.get("input.post-body") // 4.
      .type("Hello, world!"); // 5.

    cy.contains("Submit") // 6.
      .click(); // 7.

    cy.get("h1") // 8.
      .should("contain", "My First Post");
  });
});
```

```ts
describe('Post Resource', () => {
  it('Creating a New Post', () => {
    cy.mount(<PostBuilder />) // 1.

    cy.get("input.post-title") // 2.
      .type("My First Post"); // 3.

    cy.get("input.post-body") // 4.
      .type("Hello, world!"); // 5.

    cy.contains("Submit") // 6.
      .click(); // 7.

    cy.get("h1") // 8.
      .should("contain", "My First Post");
  });
});
```

## Querying Elements

### Cypress is Like jQuery

In fact, Cypress **bundles jQuery** and exposes many of its DOM traversal methods to you so you can work with complex HTML structures with ease using APIs you're already familiar with

```ts
// Each Cypress query is equivalent to its jQuery counterpart.
cy.get('#main-content').find('.article').children('img[src^="/static"]').first()
```

### Cypress is Not Like jQuery

```ts
cy
  // cy.get() looks for '#element', repeating the query until...
  .get('#element')

  // ...it finds the element!
  // You can now work with it by using .then
  .then(($myElement) => {
    doSomething($myElement)
  })
```

```ts
cy
  // cy.get() looks for '#element-does-not-exist', repeating the query until...
  // ...it doesn't find the element before its timeout.
  // Cypress halts and fails the test.
  .get('#element-does-not-exist')

  // ...this code is never run...
  .then(($myElement) => {
    doSomething($myElement)
  })
```

Before, you'd be forced to write custom code to protect against any and all of these issues: a nasty mashup of arbitrary waits, conditional retries, and null checks littering your tests. Not in Cypress! With **built-in retrying and customizable timeouts**, Cypress sidesteps all of these flaky issues

### Querying by Text Content

```ts
// Find an element in the document containing the text 'New Post'
cy.contains('New Post')

// Find an element within '.main' containing the text 'New Post'
cy.get('.main').contains('New Post')
```

### When Elements Are Missing

```ts
// Give this element 10 seconds to appear
cy.get('.my-slow-selector', { timeout: 10000 })
```

## Chains of Commands

It's very important to understand the mechanism Cypress uses to chain commands together. It manages a **Promise chain** on your behalf, with each command yielding a 'subject' to the next command, until the chain ends or an error is encountered

### Interacting With Elements

Here are even more action commands Cypress provides to interact with your app:

- `.blur()` - Make a focused DOM element blur.
- `.focus()` - Focus on a DOM element.
- `.clear()` - Clear the value of an input or textarea.
- `.check()` - Check checkbox(es) or radio(s).
- `.uncheck()` - Uncheck checkbox(es).
- `.select()` - Select an `<option>` within a `<select>`.
- `.dblclick()` - Double-click a DOM element.
- `.rightclick()` - Right-click a DOM element.

For example, when writing a `.click()` command, Cypress ensures that the element is able to be interacted with (like a real user would). It will automatically wait until the element reaches an "actionable" state by:

- Not being hidden
- Not being covered
- Not being disabled
- Not animating

### Asserting About Elements

Assertions let you do things like ensuring an element is **visible or has a particular attribute, CSS class, or state**

```ts
cy.get(':checkbox').should('be.disabled')

cy.get('form').should('have.class', 'form-horizontal')

cy.get('input').should('not.have.value', 'US')
```

### Subject Management

A new Cypress chain always starts with `cy.[command]`, where what is yielded by the command establishes what other commands can be called next (chained)

Each command specifies what value it yields. For example,

- `cy.clearCookies()` yields null. You can chain off commands that yield null, as long as the next command doesn't expect to receive a subject.
- `cy.contains()` yields a DOM element, allowing further commands to be chained (assuming they expect a DOM subject) like `.click()` or even `cy.contains()` again.
- `.click()` yields the same subject it was originally given

:::note
Don't continue a chain after acting on the DOM
While it's possible in Cypress to act on the DOM and then continue chaining, this is usually unsafe, and can lead to stale elements. See the Retry-ability Guide for more details.

But the rule of thumb is simple: If you perform an action, like navigating the page, clicking a button or scrolling the viewport, end the chain of commands there and start fresh from `cy`.
:::

#### Using Aliases to Refer to Previous Subjects

```ts
cy.get('.my-selector')
  .as('myElement') // sets the alias
  .click()

/* many more actions */

cy.get('@myElement') // re-queries the DOM as before
  .click()
```

This lets us reuse our queries for more readable tests, and it automatically handles **re-querying the DOM for us as it updates**. This is particularly helpful when dealing with front end frameworks that do a lot of re-rendering

### Commands Are Asynchronous

```ts
it('does not work as we expect', () => {
  cy.visit('/my/resource/path') // Nothing happens yet

  cy.get('.awesome-selector') // Still nothing happening
    .click() // Nope, nothing
    .then(() => {
      // placing this code inside the .then() ensures
      // it runs after the cypress commands 'execute'
      let el = Cypress.$('.new-el') // evaluates after .then()

      if (el.length) {
        cy.get('.another-selector')
      } else {
        cy.get('.optional-selector')
      }
    })
})

// Ok, the test function has finished executing...
// We've queued all of these commands and now
// Cypress will begin running them in order!
```

### The Cypress Command Queue

While the API may look similar to Promises, with its `then()` syntax, Cypress commands and queries are **not promises** - they are serial commands passed into a central queue, to be executed asynchronously at a later date

## Assertions

What makes Cypress unique from other testing tools is that assertions **automatically retry**

### Asserting in English

```ts
cy.get('button').click()
cy.get('button').should('have.class', 'active')
```

This above test will pass even if the `.active` class is applied to the button asynchronously, after an indeterminate period of time or **even if** the button is removed from the DOM entirely for a while (replaced with a waiting spinner, for example).

### Implicit Assertions

For instance:
- `cy.visit()` expects the page to send text/html content with a 200 status code.
- `cy.request()` expects the remote server to exist and provide a response.
- `cy.contains()` expects the element with content to eventually exist in the DOM.
- `cy.get()` expects the element to eventually exist in the DOM.
- `.find()` also expects the element to eventually exist in the DOM.
- `.type()` expects the element to eventually be in a typeable state.
- `.click()` expects the element to eventually be in an actionable state.
- `.its()` expects to eventually find a property on the current subject

### List of Assertions

Cypress bundles [Chai](https://docs.cypress.io/guides/references/bundled-libraries#Chai), [Chai-jQuery](https://docs.cypress.io/guides/references/bundled-libraries#Chai-jQuery), and [Sinon-Chai](https://docs.cypress.io/guides/references/bundled-libraries#Sinon-Chai) to provide built-in assertions

### Writing Assertions

There are two ways to write assertions in Cypress:

- As Cypress Commands: Using `.should()` or `.and()`.
- As Mocha Assertions: Using `expect`.

### Command Assertions

Using `.should()` or `.and()` commands is the **preferred way** of making assertions in Cypress

```ts
cy.get('#header a')
  .should('have.class', 'active')
  .and('have.attr', 'href', '/users')
```

### Mocha Assertions

Using `expect` allows you to assert on any JavaScript object, not just the current subject

```ts
// the explicit subject here is the boolean: true
expect(true).to.be.true
```

Mocha assertions are great when you want to:

- Perform custom logic prior to making the assertion.
- Make multiple assertions against the same subject

The `.should()` assertion allows us to pass a callback function that takes the yielded subject as its first argument. This works like `.then()`, except Cypress automatically **waits and retries** for everything inside of the callback function to pass

```ts
cy.get('p').should(($p) => {
  // massage our subject from a DOM element
  // into an array of texts from all of the p's
  let texts = $p.map((i, el) => {
    return Cypress.$(el).text()
  })

  // jQuery map returns jQuery object
  // and .get() converts this to an array
  texts = texts.get()

  // array should have length of 3
  expect(texts).to.have.length(3)

  // with this specific content
  expect(texts).to.deep.eq([
    'Some text from first p',
    'More text from second p',
    'And even more text from third p',
  ])
})
```

## Timeouts

### Applying Timeouts

You can modify a commands's timeout. This timeout affects **both its default assertions (if any) and any specific assertions you've added**

```ts
// we've modified the timeout which affects the implicit
// assertions as well as all explicit ones.
cy.get('.mobile-nav', { timeout: 10000 })
  .should('be.visible')
  .and('contain', 'Home')
```

Notice that this timeout has **flowed down to all assertions** and Cypress will now wait up to 10 seconds total for all of them to pass

### Default Values

We've set their default timeout durations based on how long we expect certain actions to take

For instance:

- `cy.visit()` loads a remote page and does not resolve until all of the external resources complete their loading phase. This may take awhile, so its default timeout is set to `60000ms`.
- `cy.exec()` runs a system command such as seeding a database. We expect this to potentially take a long time, and its default timeout is set to `60000ms`.
- `cy.wait()` actually uses 2 different timeouts. When waiting for a routing alias, we wait for a matching request for `5000ms`, and then additionally for the server's response for `30000ms`. We expect your application to make a matching request quickly, but we expect the server's response to potentially take much longer.

That leaves most other commands including all DOM queries to time out by default after `4000ms`
