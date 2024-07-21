# Interacting with Elements

## What you'll learn

- How Cypress calculates visibility
- How Cypress ensures elements are actionable
- How Cypress deals with animating elements
- How you can bypass these checks and force events

## Actionability

Some commands in Cypress are for interacting with the DOM such as:

- `.click()`
- `.dblclick()`
- `.rightclick()`
- `.type()`
- `.clear()`
- `.check()`
- `.uncheck()`
- `.select()`
- `.trigger()`
- `.selectFile()`

Checks and Actions Performed

- Scroll the element into view.
- Ensure the element is not hidden.
- Ensure the element is not disabled.
- Ensure the element is not detached.
- Ensure the element is not readonly.
- Ensure the element is not animating.
- Ensure the element is not covered.
- Scroll the page if still covered by an element with fixed position.
- Fire the event at the desired coordinates.

## Debugging

Although you should see a nice error message, nothing beats visually inspecting and poking at the DOM yourself to understand the reason why

The only way for you to "see" and debug why Cypress thought an element was not visible is to use a `debugger` statement

We **recommend** placing `debugger` or using the `.debug()` command directly BEFORE the action.

```ts
// break on a debugger before the action command
cy.get('button').debug().click()
```

## Forcing

Sometimes it's not worth trying to "act like a user" to get a robot to do the exact steps a user would to interact with an element

```ts
// force the click and all subsequent events
// to fire even if this element isn't considered 'actionable'
cy.get('button').click({ force: true })
```

