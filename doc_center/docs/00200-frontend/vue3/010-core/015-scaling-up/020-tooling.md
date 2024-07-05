# Tooling

## Project Scaffolding

### Vite

```bash
npm create vue@latest
```

## IDE Support

- The recommended IDE setup is VS Code + the [Vue - Official extension](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (previously Volar)

## TypeScript

- Vue - Official extension provides type checking for SFCs using `<script lang="ts">` blocks, including template expressions and cross-component props validation

## Testing

- Cypress is recommended for E2E tests
- Vitest for unit / component testing

## Linting

The Vue team maintains `eslint-plugin-vue`, an ESLint plugin that supports SFC-specific linting rules

- Setup ESLint IDE extensions, for example `ESLint for VS Code`

## Formatting

- The `Vue - Official VS Code extension` provides formatting for Vue SFCs out of the box

## Lower-Level Packages

- `@vue/compiler-sfc`
- `@vitejs/plugin-vue`
