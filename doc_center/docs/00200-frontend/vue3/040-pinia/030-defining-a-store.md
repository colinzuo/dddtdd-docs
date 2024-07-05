# Defining a Store

`defineStore()` accepts two distinct values for its second argument: a **Setup function** or an **Options object**

## Setup Stores

Similar to the **Vue Composition API's setup function**, we can pass in a function that defines reactive properties and methods and returns an object with the properties and methods we want to expose

```js
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const name = ref('Eduardo')
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, name, doubleCount, increment }
})
```

Setup stores bring a lot more flexibility than Option Stores as you can **create watchers within a store and freely use any composable**

## Using the store

We are defining a store because the store **won't be created until** `use...Store()` is called inside of `setup()`

Once the store is instantiated, you can **access any property defined in state, getters, and actions directly** on the store

Note that **store is an object wrapped with reactive**, meaning there is no need to write `.value` after getters but, 
like props in setup, we **cannot destructure it**

## Destructuring from a Store

In order to extract properties from the store while keeping its reactivity, you need to use `storeToRefs()`

```ts
<script setup>
import { useCounterStore } from '@/stores/counter'
import { storeToRefs } from 'pinia'

const store = useCounterStore()
// `name` and `doubleCount` are reactive refs
// This will also extract refs for properties added by plugins
// but skip any action or non reactive (non ref/reactive) property
const { name, doubleCount } = storeToRefs(store)
// the increment action can just be destructured
const { increment } = store
</script>
```
