# Environment Variables

Environment variables are useful when:

- Values are different across developer machines.
- Values are different across multiple environments: (dev, staging, qa, prod)
- Values change frequently and are highly dynamic.

```ts
cy.request(Cypress.env('EXTERNAL_API')) // points to a dynamic env var
```

## Setting

### Option #1: configuration file

```ts
import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: '128076ed-9868-4e98-9cef-98dd8b705d75',
  env: {
    login_url: '/login',
    products_url: '/products',
  },
})
```

### Option #2: cypress.env.json

```json
{
  "host": "veronica.dev.local",
  "api_server": "http://localhost:8888/api/v1/"
}
```

### Option #3: CYPRESS_*

```bash
export CYPRESS_HOST=laura.dev.local
export cypress_api_server=http://localhost:8888/api/v1/
```

### Option #4: --env

```bash
cypress run --env host=kevin.dev.local,api_server=http://localhost:8888/api/v1
```

### Option #5: Test Configuration

```ts
// change environment variable for single suite of tests
describe(
  'test against Spanish content',
  {
    env: {
      language: 'es',
    },
  },
  () => {
    it('displays Spanish', () => {
      cy.mount(<International lang={Cypress.env('language')} />)
      cy.contains('¿Por qué Cypress?')
    })
  }
)
```
