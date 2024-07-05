# State Management

## Simple State Management with Reactivity API

The fact that Vue's reactivity system is decoupled from the component model makes it extremely flexible

```js
import { ref } from 'vue'

// global state, created in module scope
const globalCount = ref(1)

export function useCount() {
  // local state, created per-component
  const localCount = ref(1)

  return {
    globalCount,
    localCount
  }
}
```

## Pinia

[Pinia](https://pinia.vuejs.org/)

Compared to Vuex, Pinia provides a simpler API with less ceremony, offers **Composition-API-style APIs**, and most importantly, has **solid type inference** support when used with TypeScript
