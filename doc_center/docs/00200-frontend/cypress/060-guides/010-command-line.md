# Command Line

## What you'll learn

- How to run Cypress from the command line
- How to specify which spec files to run
- How to launch other browsers
- How to record your tests to Cypress Cloud

## Using scripts

```json
{
  "scripts": {
    "e2e:chrome": "cypress run --browser chrome"
  }
}
```

```bash
npm run e2e:chrome
```

### Extending script options

```bash
npm run e2e:chrome -- --spec "cypress/e2e/my-spec.cy.js"
```
