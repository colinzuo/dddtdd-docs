# Writing and Organizing Tests

## Folder structure

```ts
E2E:
/cypress.config.ts
/cypress/fixtures/example.json
/cypress/support/commands.ts
/cypress/support/e2e.ts

Component:
/cypress.config.ts
/cypress/fixtures/example.json
/cypress/support/commands.ts
/cypress/support/component.ts
/cypress/support/component-index.html

Both:
/cypress.config.ts
/cypress/fixtures/example.json
/cypress/support/commands.ts
/cypress/support/e2e.ts
/cypress/support/component.ts
/cypress/support/component-index.html
```

### Spec files

Test files are located in `cypress/e2e` by default

Cypress also supports ES2015 out of the box

### Fixture Files

Fixtures are used as external pieces of static data that can be used by your tests. Fixture files are located in `cypress/fixtures` by default, but can be configured to another directory.

You would typically use them with the `cy.fixture()` command and most often when you're stubbing Network Requests.

### Asset Files

#### Download Files

Any files downloaded while testing an application's file download feature will be stored in the downloadsFolder which is set to `cypress/downloads` by default

#### Screenshot Files

If screenshots were taken via the `cy.screenshot()` command or automatically when a test fails, the screenshots are stored in the screenshotsFolder which is set to `cypress/screenshots` by default

#### Video Files

Any videos recorded of the run are stored in the videosFolder which is set to `cypress/videos` by default

### Support file

The support file is a great place to put reusable behavior such as custom commands or global overrides that you want applied and available to all of your spec files

You can define behaviors in a before or beforeEach within any of the `cypress/support` files

```ts
beforeEach(() => {
  cy.log('I run before every test in every spec file!!!!!!')
})
```

## Writing tests

Cypress is built **on top of Mocha and Chai**.

### Test Structure

The test interface, borrowed from Mocha, provides `describe()`, `context()`, `it()` and `specify()`

### Hooks

Cypress also provides hooks (borrowed from Mocha).

```ts
before(() => {
  // root-level hook
  // runs once before all tests
})

beforeEach(() => {
  // root-level hook
  // runs before every test block
})

afterEach(() => {
  // runs after each test block
})

after(() => {
  // runs once all tests are done
})

describe('Hooks', () => {
  before(() => {
    // runs once before all tests in the block
  })

  beforeEach(() => {
    // runs before each test in the block
  })

  afterEach(() => {
    // runs after each test in the block
  })

  after(() => {
    // runs once after all tests in the block
  })
})
```

### Excluding and Including Tests

To run a specified suite or test, append `.only` to the function.

To skip a specified suite or test, append `.skip()` to the function

### Test Isolation

:::tip
Best Practice: Tests should always be able to be run independently from one another and still pass.
:::

We do this by cleaning up test state and the browser context before each test to ensure that the operation of one test does not affect another test later on. The goal for each test should be to **reliably pass** whether run in isolation or consecutively with other tests

### Test Configuration

It is possible to apply test configuration values to a suite or test. Pass a configuration object to the test or suite function as the second argument

#### Syntax

```ts
describe(name, config, fn)
context(name, config, fn)
it(name, config, fn)
specify(name, config, fn)
```

### Assertion Styles

Cypress supports both BDD (`expect/should`) and TDD (`assert`) style plain assertions

## Running tests

You can run a test by clicking on the spec filename

## Test statuses

After the Cypress spec completes every test has one of four statuses: `passed`, `failed`, `pending`, or `skipped`. The behavior of these statuses are inherited from the Mocha, since this is the **test runner leveraged by Cypress**


