
## Get Started

```bash
npm i @vueuse/core
```

```js
import { useLocalStorage, useMouse, usePreferredDark } from '@vueuse/core'

export default {
  setup() {
    // tracks mouse position
    const { x, y } = useMouse()

    // is user prefers dark theme
    const isDark = usePreferredDark()

    // persist state in localStorage
    const store = useLocalStorage(
      'my-storage',
      {
        name: 'Apple',
        color: 'red',
      },
    )

    return { x, y, isDark, store }
  },
}
```

## Best Practice

### Destructuring

Most of the functions in VueUse **return an object of refs** that you can use ES6's object **destructure syntax** on to take what you need

### Passing Ref as Argument

In Vue, we use the `setup()` function to construct the "connections" between the data and logics. **To make it flexible**, most of the VueUse function also **accpets ref** version of the arguments

```js
const isDark = useDark()
const title = computed(() => isDark.value ? '🌙 Good evening!' : '☀️ Good morning!')

useTitle(title)
```

## Configurations

### Event Filters

```js
import { debounceFilter, throttleFilter, useLocalStorage, useMouse } from '@vueuse/core'

// changes will write to localStorage with a throttled 1s
const storage = useLocalStorage('my-key', { foo: 'bar' }, { eventFilter: throttleFilter(1000) })

// mouse position will be updated after mouse idle for 100ms
const { x, y } = useMouse({ eventFilter: debounceFilter(100) })
```

## Guidelines

### General

- Use ref instead reactive whenever possible
- When using watch or watchEffect internally, also make the immediate and flush options configurable whenever possible
- Use tryOnUnmounted to clear the side-effects gracefully

### ShallowRef

```ts
export function useFetch<T>(url: MaybeRef<string>) {
  // use `shallowRef` to prevent deep reactivity
  const data = shallowRef<T | undefined>()
  const error = shallowRef<Error | undefined>()

  fetch(unref(url))
    .then(r => r.json())
    .then(r => data.value = r)
    .catch(e => error.value = e)

  /* ... */
}
```

### Watch Options

```js
import type { WatchOptions } from 'vue-demi'

// extend the watch options
export interface WatchDebouncedOptions extends WatchOptions {
  debounce?: number
}

export function watchDebounced(
  source: any,
  cb: any,
  options: WatchDebouncedOptions = {},
): WatchStopHandle {
  return watch(
    source,
    () => { /* ... */ },
    options, // pass watch options
  )
}
```
