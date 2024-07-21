# Test Isolation

## What is Test Isolation?

Cypress will start each test with a clean test slate by restoring and clearing all:

- aliases
- clock mocks
- intercepts
- spies
- stubs
- viewport changes

In addition to a clean test slate, Cypress also believes in running tests in a **clean browser context** such that the application or component under test behaves consistently when run. This behavior is described as `testIsolation`

## Test Isolation in End-to-End Testing

### Test Isolation Enabled

When test isolation is enabled, Cypress resets the browser context before each test by:

- clearing the dom state by visiting `about:blank`
- clearing cookies in all domains
- clearing localStorage in all domains
- clearing sessionStorage in all domains

Additionally, the `cy.session()` command will inherit this configuration and will clear the page and current browser context when establishing a browser session
