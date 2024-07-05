# Watchers

## Basic Example

there are cases where we need to **perform "side effects" in reaction to state changes** - for example, mutating the DOM, or changing another piece of state based on the result of an async operation

```js
<script setup>
import { ref, watch } from 'vue'

const question = ref('')
const answer = ref('Questions usually contain a question mark. ;-)')
const loading = ref(false)

// watch works directly on a ref
watch(question, async (newQuestion, oldQuestion) => {
  if (newQuestion.includes('?')) {
    loading.value = true
    answer.value = 'Thinking...'
    try {
      const res = await fetch('https://yesno.wtf/api')
      answer.value = (await res.json()).answer
    } catch (error) {
      answer.value = 'Error! Could not reach the API. ' + error
    } finally {
      loading.value = false
    }
  }
})
</script>

<template>
  <p>
    Ask a yes/no question:
    <input v-model="question" :disabled="loading" />
  </p>
  <p>{{ answer }}</p>
</template>
```

## Watch Source Types

watch's first argument can be different types of reactive "sources": it can be a `ref`(including computed refs), a `reactive object`, a `getter function`, or `an array of multiple sources`

```ts
const x = ref(0)
const y = ref(0)

// single ref
watch(x, (newX) => {
  console.log(`x is ${newX}`)
})

// getter
watch(
  () => x.value + y.value,
  (sum) => {
    console.log(`sum of x + y is: ${sum}`)
  }
)

// array of multiple sources
watch([x, () => y.value], ([newX, newY]) => {
  console.log(`x is ${newX} and y is ${newY}`)
})
```

**Do note** that you can't watch a property of a reactive object like this

```js
const obj = reactive({ count: 0 })

// this won't work because we are passing a number to watch()
watch(obj.count, (count) => {
  console.log(`Count is: ${count}`)
})
```

## Deep Watchers

When you call watch() directly on a reactive object, it will **implicitly create a deep watcher** - the callback will be triggered on all nested mutations

```ts
const obj = reactive({ count: 0 })

watch(obj, (newValue, oldValue) => {
  // fires on nested property mutations
  // Note: `newValue` will be equal to `oldValue` here
  // because they both point to the same object!
})

obj.count++
```

This should be **differentiated** with a getter that returns a reactive object - in the latter case, the callback will only fire if the getter returns a different object

You can, however, force the second case into a deep watcher by explicitly using the `deep` option

```ts
watch(
  () => state.someObject,
  (newValue, oldValue) => {
    // Note: `newValue` will be equal to `oldValue` here
    // *unless* state.someObject has been replaced
  },
  { deep: true }
)
```

## Eager Watchers

```js
watch(
  source,
  (newValue, oldValue) => {
    // executed immediately, then again when `source` changes
  },
  { immediate: true }
)
```

## watchEffect()

`watchEffect()` allows us to track the callback's reactive dependencies automatically

`watch()` is lazy: the callback won't be called until the watched source has changed

`watchEffect()` allows us to perform a side effect immediately while automatically tracking the effect's reactive dependencies

```ts
watchEffect(async () => {
  const response = await fetch(url.value)
  data.value = await response.json()
})
```

## watch vs. watchEffect

- `watch` only tracks the explicitly watched source
- `watchEffect` automatically tracks every reactive property accessed during its synchronous execution

## Callback Flush Timing

By default, a watcher's callback is called **after** parent component updates (if any), and **before** the owner component's DOM updates
