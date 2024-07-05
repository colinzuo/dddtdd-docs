# Computed Properties

## Basic Example

That's why for **complex logic that includes reactive data**, it is recommended to use a computed property

The `computed()` function expects to be passed a `getter function`, and the returned value is a **computed ref**. Similar to normal refs, you can access the computed result as `publishedBooksMessage.value`. Computed refs are also **auto-unwrapped in templates** so you can reference them without .value in template expressions

A computed property automatically tracks its reactive dependencies

```ts
<script setup>
import { reactive, computed } from 'vue'

const author = reactive({
  name: 'John Doe',
  books: [
    'Vue 2 - Advanced Guide',
    'Vue 3 - Basic Guide',
    'Vue 4 - The Mystery'
  ]
})

// a computed ref
const publishedBooksMessage = computed(() => {
  return author.books.length > 0 ? 'Yes' : 'No'
})
</script>

<template>
  <p>Has published books:</p>
  <span>{{ publishedBooksMessage }}</span>
</template>
```

## Computed Caching vs. Methods

**computed properties are cached based on their reactive dependencies**

## Best Practices

- Getters should be side-effect free
- Avoid mutating computed value
