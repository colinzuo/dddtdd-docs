# Composables

## What is a "Composable"?

In the context of Vue applications, a "composable" is a function that leverages Vue's Composition API to **encapsulate and reuse stateful logic**.

## Mouse Tracker Example

```ts
// event.js
import { onMounted, onUnmounted } from 'vue'

export function useEventListener(target, event, callback) {
  // if you want, you can also make this
  // support selector strings as target
  onMounted(() => target.addEventListener(event, callback))
  onUnmounted(() => target.removeEventListener(event, callback))
}

// mouse.js
import { ref } from 'vue'
import { useEventListener } from './event'

export function useMouse() {
  const x = ref(0)
  const y = ref(0)

  useEventListener(window, 'mousemove', (event) => {
    x.value = event.pageX
    y.value = event.pageY
  })

  return { x, y }
}
```

```js
<script setup>
import { useMouse } from './mouse.js'

const { x, y } = useMouse()
</script>

<template>Mouse position is at: {{ x }}, {{ y }}</template>
```

## Async State Example

`toValue()` is an API added in 3.3. It is designed to normalize refs or getters into values. If the argument is a ref, it returns the ref's value; if the argument is a function, it will call the function and return its return value. Otherwise, it returns the argument as-is

```js
// fetch.js
import { ref, watchEffect, toValue } from 'vue'

export function useFetch(url) {
  const data = ref(null)
  const error = ref(null)

  const fetchData = () => {
    // reset state before fetching..
    data.value = null
    error.value = null

    fetch(toValue(url))
      .then((res) => res.json())
      .then((json) => (data.value = json))
      .catch((err) => (error.value = err))
  }

  watchEffect(() => {
    fetchData()
  })

  return { data, error }
}
```

## Conventions and Best Practices

### Input Arguments

If your composable creates reactive effects when the input is a ref or a getter, make sure to either explicitly watch the ref / getter with `watch()`, or call `toValue()` inside a `watchEffect()` so that it is properly tracked

### Return Values

The **recommended convention** is for composables to always return a plain, non-reactive object containing multiple refs

```ts
// x and y are refs
const { x, y } = useMouse()
```

If you prefer to use returned state from composables as object properties, you can wrap the returned object with `reactive()` so that the refs are unwrapped

```js
const mouse = reactive(useMouse())
// mouse.x is linked to original ref
console.log(mouse.x)
```
