# Key Differences

## What you'll learn

- How its architecture **differs from Selenium**
- **New testing approaches** not possible before

## Architecture

Most testing tools (like Selenium) operate by running outside of the browser and executing remote commands across the network. **Cypress is the exact opposite. Cypress is executed in the same run loop as your application**

Behind Cypress is a Node server process. Cypress and the Node process constantly communicate, synchronize, and perform tasks on behalf of each other

Cypress also operates at the network layer by reading and altering web traffic on the fly

Because Cypress is **installed locally on your machine**, it can additionally tap into the operating system for automation tasks. This makes performing tasks such as **taking screenshots, recording videos, general file system operations and network operations** possible

## Native access

Because Cypress operates within your application, that means it has **native access to every single object**. Whether it is the `window`, the `document`, a DOM element

## New kind of testing

Instead of slow and expensive tests, such as creating the state required for a given situation, you can create these states artificially **like you would in an unit test**. For instance you can

- Expose data stores (like in Redux) so you can programmatically alter the state of your application directly from your test code
- Test edge cases like 'empty views' by forcing your server to send empty responses
- Test how your application responds to errors on your server by modifying response status codes to be 500
- Control time by moving forward or backward so that timers or polls automatically fire without having to wait for the required time in your tests

## Shortcuts

Cypress allows for browser context to be cached with `cy.session()`. This means as a user, you only need to perform authentication once for the entirety of your test suite, and restore the saved session between each test.

## Debuggability

There are hundreds of custom error messages describing the exact reason Cypress failed your test.

There is a rich UI which visually shows you the command execution, assertions, network requests, spies, stubs, page loads, or URL changes.

Cypress takes snapshots of your application and enables you to time travel back to the state it was in when commands ran.

You can use the Developer Tools while your tests run, you can see every console message, every network request. You can inspect elements, and you can even use debugger statements in your spec code or your application code. There is no fidelity loss - you can use all the tools you're already comfortable with. This enables you to test and develop all at the same time.
