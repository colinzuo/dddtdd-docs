# Provide / Inject

## Prop Drilling

With only props, we would have to pass the same prop across the entire parent chain.
This is called "props drilling" and definitely isn't fun to deal with.

A parent component can serve as a **dependency provider** for all its descendants

## Provide

The first argument is called the **injection key**, which can be a string or a `Symbol`

```ts
<script setup>
import { provide } from 'vue'

provide(/* key */ 'message', /* value */ 'hello!')
</script>
```

The second argument is the provided value. The value can be of **any type, including reactive state** such as refs

```ts
import { ref, provide } from 'vue'

const count = ref(0)
provide('key', count)
```

## App-level Provide

App-level provides are available to all components rendered in the app. This is especially useful when writing plugins

```ts
import { createApp } from 'vue'

const app = createApp({})

app.provide(/* key */ 'message', /* value */ 'hello!')
```

## Inject

```ts
<script setup>
import { inject } from 'vue'

const message = inject('message')
</script>
```

```ts
// `value` will be "default value"
// if no data matching "message" was provided
const value = inject('message', 'default value')

const value = inject('key', () => new ExpensiveClass())
```

## Working with Reactivity

When using reactive provide / inject values, **it is recommended to keep any mutations to reactive state inside of the provider whenever possible**

There may be times when we need to update the data from an injector component. In such cases, we **recommend providing a function** that is responsible for mutating the state

```ts
<!-- inside provider component -->
<script setup>
import { provide, ref } from 'vue'

const location = ref('North Pole')

function updateLocation() {
  location.value = 'South Pole'
}

provide('location', {
  location,
  updateLocation
})
</script>
```

## Working with Symbol Keys

It's recommended to export the Symbols in a dedicated file

```js
// keys.js
export const myInjectionKey = Symbol()

// in provider component
import { provide } from 'vue'
import { myInjectionKey } from './keys.js'

provide(myInjectionKey, {
  /* data to provide */
})

// in injector component
import { inject } from 'vue'
import { myInjectionKey } from './keys.js'

const injected = inject(myInjectionKey)
```


