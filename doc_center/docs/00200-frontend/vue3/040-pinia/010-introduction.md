# Introduction

## Why should I use Pinia

even in small single page applications, you get a lot from using Pinia

- Plugins: extend Pinia features with plugins
- Proper TypeScript support or autocompletion for JS users
- Devtools support
- Hot module replacement

## Basic example

```js
// stores/counter.js
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => {
    return { count: 0 }
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  getters: {
    double: (state) => state.count * 2,
  },  
  actions: {
    increment() {
      this.count++
    },
  },
})
```

```js
import { useCounterStore } from '@/stores/counter'

export default {
  setup() {
    const counter = useCounterStore()

    counter.count++
    // with autocompletion ✨
    counter.$patch({ count: counter.count + 1 })
    // or using an action instead
    counter.increment()
  },
}
```

```js
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  function increment() {
    count.value++
  }

  return { count, increment }
})
```

## Comparison with Vuex

Compared to Vuex, Pinia provides a simpler API with less ceremony, offers Composition-API-style APIs, and most importantly, has **solid type inference support** when used with TypeScript
