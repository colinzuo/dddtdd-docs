# Async Components

## Basic Usage

Bundlers like **Vite** and webpack also support the syntax (and will use it as bundle split points)

```js
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent(() =>
  import('./components/MyComponent.vue')
)
```

## Loading and Error States

```js
const AsyncComp = defineAsyncComponent({
  // the loader function
  loader: () => import('./Foo.vue'),

  // A component to use while the async component is loading
  loadingComponent: LoadingComponent,
  // Delay before showing the loading component. Default: 200ms.
  delay: 200,

  // A component to use if the load fails
  errorComponent: ErrorComponent,
  // The error component will be displayed if a timeout is
  // provided and exceeded. Default: Infinity.
  timeout: 3000
})
```
