
## Introduction

### Why should I use Pinia

even in small single page applications, you get a lot from using Pinia

- Devtools support
- Hot module replacement
- Plugins: extend Pinia features with plugins
- Proper TypeScript support or autocompletion for JS users
- Server Side Rendering Support

### Basic example

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

## getting-started

```bash
npm install pinia
```

```js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.mount('#app')
```

### What is a Store

It has three concepts, the **state, getters and actions** and it's safe to assume these concepts are the equivalent of **data, computed and methods** in components.

## Defining a Store

`defineStore()` accepts two distinct values for its second argument: a **Setup function** or an **Options object**

### Setup Stores

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

### Using the store

We are defining a store because the store **won't be created until** `use...Store()` is called inside of `setup()`

Once the store is instantiated, you can **access any property defined in state, getters, and actions directly** on the store

In order to extract properties from the store while keeping its reactivity, you need to use `storeToRefs()`

```js
import { storeToRefs } from 'pinia'

export default defineComponent({
  setup() {
    const store = useCounterStore()
    // `name` and `doubleCount` are reactive refs
    // This will also create refs for properties added by plugins
    // but skip any action or non reactive (non ref/reactive) property
    const { name, doubleCount } = storeToRefs(store)
    // the increment action can just be extracted
    const { increment } = store

    return {
      name,
      doubleCount,
      increment,
    }
  },
})
```

## State

### TypeScript

You don't need to do much in order to make your state compatible with TS: make sure `strict`, or at the very least, `noImplicitThis`, are enabled and Pinia will **infer the type of your state automatically**

```ts
interface State {
  userList: UserInfo[]
  user: UserInfo | null
}

export const useUserStore = defineStore('user', {
  state: (): State => {
    return {
      userList: [],
      user: null,
    }
  },
})

interface UserInfo {
  name: string
  age: number
}
```

### Mutating the state

```js
store.$patch({
  count: store.count + 1,
  age: 120,
  name: 'DIO',
})
```

```js
store.$patch((state) => {
  state.items.push({ name: 'shoes', quantity: 1 })
  state.hasChanged = true
})
```

### Subscribing to the state

```js
cartStore.$subscribe((mutation, state) => {
  // import { MutationType } from 'pinia'
  mutation.type // 'direct' | 'patch object' | 'patch function'
  // same as cartStore.$id
  mutation.storeId // 'cart'
  // only available with mutation.type === 'patch object'
  mutation.payload // patch object passed to cartStore.$patch()

  // persist the whole state to the local storage whenever it changes
  localStorage.setItem('cart', JSON.stringify(state))
})
```

## Getters

Most of the time, getters will only rely on the state, however, they **might need to use other getters**. Because of this, we can get access to the whole store instance through this when defining a regular function **but it is necessary to define the type of the return type (in TypeScript)**. This is due to a known limitation in TypeScript and doesn't affect getters defined with an arrow function nor getters not using this

```ts
export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
  getters: {
    // automatically infers the return type as a number
    doubleCount(state) {
      return state.count * 2
    },
    // the return type **must** be explicitly set
    doublePlusOne(): number {
      // autocompletion and typings for the whole store ✨
      return this.doubleCount + 1
    },
  },
})
```

## Actions

Unlike getters, actions can be asynchronous, you can **await inside of actions** any API call or even other actions

## Plugins

This is useful to add global objects like the router, modal, or **toast managers**

### Augmenting a Store

Note that every store is wrapped with reactive, automatically unwrapping any Ref (ref(), computed(), ...) it contains

This is why you can **access all computed properties without .value** and why they are reactive.

```js
const sharedRef = ref('shared')
pinia.use(({ store }) => {
  // each store has its individual `hello` property
  store.hello = ref('secret')
  // it gets automatically unwrapped
  store.hello // 'secret'

  // all stores are sharing the value `shared` property
  store.shared = sharedRef
  store.shared // 'shared'
})
```

### Adding new external properties

When adding external properties, class instances that come from other libraries, or simply things that are not reactive, you should wrap the object with `markRaw()` before passing it to pinia

```js
import { markRaw } from 'vue'
// adapt this based on where your router is
import { router } from './router'

pinia.use(({ store }) => {
  store.router = markRaw(router)
})
```

### Adding new options

```js
defineStore('search', {
  actions: {
    searchContacts() {
      // ...
    },
  },

  // this will be read by a plugin later on
  debounce: {
    // debounce the action searchContacts by 300ms
    searchContacts: 300,
  },
})
```

```js
// use any debounce library
import debounce from 'lodash/debounce'

pinia.use(({ options, store }) => {
  if (options.debounce) {
    // we are overriding the actions with new ones
    return Object.keys(options.debounce).reduce((debouncedActions, action) => {
      debouncedActions[action] = debounce(
        store[action],
        options.debounce[action]
      )
      return debouncedActions
    }, {})
  }
})
```

Note that custom options are passed as the 3rd argument when using the setup syntax

```js
defineStore(
  'search',
  () => {
    // ...
  },
  {
    // this will be read by a plugin later on
    debounce: {
      // debounce the action searchContacts by 300ms
      searchContacts: 300,
    },
  }
)
```

### TypeScript

```ts
import { PiniaPluginContext } from 'pinia'

export function myPiniaPlugin(context: PiniaPluginContext) {
  // ...
}
```

When adding new properties to stores, you should also extend the `PiniaCustomProperties` interface

```ts
import 'pinia'

declare module 'pinia' {
  export interface PiniaCustomProperties {
    // by using a setter we can allow both strings and refs
    set hello(value: string | Ref<string>)
    get hello(): string

    // you can define simpler values too
    simpleNumber: number
  }
}
```

```ts
import 'pinia'

declare module 'pinia' {
  export interface PiniaCustomStateProperties<S> {
    hello: string
  }
}
```

```ts
import 'pinia'

declare module 'pinia' {
  export interface DefineStoreOptionsBase<S, Store> {
    // allow defining a number of ms for any of the actions
    debounce?: Partial<Record<keyof StoreActions<Store>, number>>
  }
}
```

## Using a store outside of a component

Behind the scenes, `useStore()` **injects the pinia instance** you gave to your app

```js
import { createRouter } from 'vue-router'
const router = createRouter({
  // ...
})

router.beforeEach((to) => {
  // ✅ This will work because the router starts its navigation after
  // the router is installed and pinia will be installed too
  const store = useStore()

  if (to.meta.requiresAuth && !store.isLoggedIn) return '/login'
})
```

## HMR (Hot Module Replacement)

```js
// auth.js
import { defineStore, acceptHMRUpdate } from 'pinia'

const useAuth = defineStore('auth', {
  // options...
})

// make sure to pass the right store definition, `useAuth` in this case.
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuth, import.meta.hot))
}
```

## Testing stores

### Unit testing a store

```ts
// stores/counter.spec.ts
import { setActivePinia, createPinia } from 'pinia'
import { useCounter } from '../src/stores/counter'

describe('Counter Store', () => {
  beforeEach(() => {
    // creates a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia())
  })

  it('increments', () => {
    const counter = useCounter()
    expect(counter.n).toBe(0)
    counter.increment()
    expect(counter.n).toBe(1)
  })

  it('increments by amount', () => {
    const counter = useCounter()
    counter.increment(10)
    expect(counter.n).toBe(10)
  })
})
```

If you have any store plugins, there is one important thing to know: **plugins won't be used until pinia is installed in an App**. This can be solved by creating an empty App or a fake one

```js
import { setActivePinia, createPinia } from 'pinia'
import { createApp } from 'vue'
import { somePlugin } from '../src/stores/plugin'

// same code as above...

// you don't need to create one app per test
const app = createApp({})
beforeEach(() => {
  const pinia = createPinia().use(somePlugin)
  app.use(pinia)
  setActivePinia(pinia)
})
```

### Unit testing components

```bash
npm i -D @pinia/testing
```

```js
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
// import any store you want to interact with in tests
import { useSomeStore } from '@/stores/myStore'

const wrapper = mount(Counter, {
  global: {
    plugins: [createTestingPinia()],
  },
})

const store = useSomeStore() // uses the testing pinia!

// state can be directly manipulated
store.name = 'my new name'
// can also be done through patch
store.$patch({ name: 'new name' })
expect(store.name).toBe('new name')

// actions are stubbed by default, meaning they don't execute their code by default.
// See below to customize this behavior.
store.someAction()

expect(store.someAction).toHaveBeenCalledTimes(1)
expect(store.someAction).toHaveBeenLastCalledWith()
```

#### Initial State

You can set the initial state of **all of your stores** when creating a testing pinia by passing an initialState object.

```ts
// somewhere in your test
const wrapper = mount(Counter, {
  global: {
    plugins: [
      createTestingPinia({
        initialState: {
          counter: { n: 20 }, // start the counter at 20 instead of 0
        },
      }),
    ],
  },
})

const store = useSomeStore() // uses the testing pinia!
store.n // 20
```

#### Customizing behavior of actions

createTestingPinia **stubs out all store actions unless told otherwise**. This allows you to test your components and stores separately.

If you want to revert this behavior and normally execute your actions during tests, specify `stubActions: false` when calling createTestingPinia

```js
const wrapper = mount(Counter, {
  global: {
    plugins: [createTestingPinia({ stubActions: false })],
  },
})

const store = useSomeStore()

// Now this call WILL execute the implementation defined by the store
store.someAction()

// ...but it's still wrapped with a spy, so you can inspect calls
expect(store.someAction).toHaveBeenCalledTimes(1)
```

<https://github.com/vuejs/pinia/blob/v2/packages/testing/src/testing.spec.ts>

## Dealing with Composables

```js
import { defineStore, skipHydrate } from 'pinia'
import { useMediaControls } from '@vueuse/core'

export const useVideoPlayer = defineStore('video', () => {
  // we won't expose this element directly
  const videoElement = ref<HTMLVideoElement>()
  const src = ref('/data/video.mp4')
  const { playing, volume, currentTime, togglePictureInPicture } =
    useMediaControls(video, { src })

  function loadVideo(element: HTMLVideoElement, src: string) {
    videoElement.value = element
    src.value = src
  }

  return {
    src,
    playing,
    volume,
    currentTime,

    loadVideo,
    togglePictureInPicture,
  }
})
```
