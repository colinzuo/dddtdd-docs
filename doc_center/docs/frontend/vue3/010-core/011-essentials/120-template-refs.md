# Template Refs

This may be useful when you want to, for example, programmatically **focus** an input on component mount, or initialize a 3rd party library on an element

## Accessing the Refs

```ts
<script setup>
import { ref, onMounted } from 'vue'

// declare a ref to hold the element reference
// the name must match template ref value
const input = ref(null)

onMounted(() => {
  input.value.focus()
})
</script>

<template>
  <input ref="input" />
</template>
```
