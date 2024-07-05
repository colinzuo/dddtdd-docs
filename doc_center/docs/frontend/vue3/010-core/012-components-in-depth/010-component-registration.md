# Component Registration

## Global Registration

```js
import MyComponent from './App.vue'

app.component('MyComponent', MyComponent)
```

## Local Registration

- Global registration prevents build systems from removing unused components (a.k.a "tree-shaking")
- Global registration makes dependency relationships less explicit in large applications

When using SFC with `<script setup>`, imported components can be locally used without registration

```ts
<script setup>
import ComponentA from './ComponentA.vue'
</script>

<template>
  <ComponentA />
</template>
```

## Component Name Casing

Luckily, Vue supports **resolving kebab-case tags to components registered using PascalCase**. This means a component registered as MyComponent can be referenced in the template via both `<MyComponent>` and `<my-component>`
