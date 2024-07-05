# Using Vue with TypeScript

## Project Setup

### IDE Support

- Visual Studio Code (VS Code) is **strongly recommended** for its great out-of-the-box support for TypeScript.
    + `Vue - Official` (previously Volar) is the official VS Code extension that provides TypeScript support inside Vue SFCs

### Configuring tsconfig.json

Projects scaffolded via `create-vue` include pre-configured `tsconfig.json`
The base config is abstracted in the `@vue/tsconfig` package

- `compilerOptions.isolatedModules` is set to `true` because Vite uses **esbuild** for transpiling TypeScript and is subject to single-file transpile limitations. `compilerOptions.verbatimModuleSyntax` is a superset of isolatedModules and is a good choice, too - it's what @vue/tsconfig uses
- If you have configured resolver aliases in your build tool, for example the `@/*` alias configured by default in a create-vue project, you need to also configure it for TypeScript via `compilerOptions.paths`

## General Usage Notes

### Usage in Single-File Components

To use TypeScript in SFCs, add the `lang="ts"` attribute to `<script>` tags. **When lang="ts" is present, all template expressions also enjoy stricter type checking**

```ts
<script setup lang="ts">
// TypeScript enabled
import { ref } from 'vue'

const count = ref(1)
</script>

<template>
  <!-- type checking and auto-completion enabled -->
  {{ count.toFixed(2) }}
</template>
```
