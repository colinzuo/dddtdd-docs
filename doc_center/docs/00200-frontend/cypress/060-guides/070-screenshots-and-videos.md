# Screenshots and Videos

## What you'll learn

- How Cypress captures screenshots of test failures automatically
- How to manually capture your own screenshot
- How Cypress can record a video of the entire run
- Some options of what to do with screenshot and video artifacts

## Screenshots

To take a manual screenshot you can use the `cy.screenshot()` command

Additionally, Cypress will automatically capture screenshots when a failure happens during `cypress run`. Screenshots on failure are not automatically taken during `cypress open`

## Videos

Video recording is disabled by default, but can be turned on by setting `video` to true from within your configuration

If enabled, Cypress records a video for each spec file when running tests during `cypress run`. Videos are not recorded during `cypress open`.

```ts
import { defineConfig } from 'cypress'

export default defineConfig({
  video: true,
})
```
