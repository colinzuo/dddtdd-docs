# Getting Started

## An example

### App.vue

```html
<template>
  <h1>Hello App!</h1>
  <p>
    <strong>Current route path:</strong> {{ $route.fullPath }}
  </p>
  <nav>
    <RouterLink to="/">Go to Home</RouterLink>
    <RouterLink to="/about">Go to About</RouterLink>
  </nav>
  <main>
    <RouterView />
  </main>
</template>
```

### Creating the router instance

```js
import { createMemoryHistory, createRouter } from 'vue-router'

import HomeView from './HomeView.vue'
import AboutView from './AboutView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/about', component: AboutView },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})
```

### Registering the router plugin

```js
const app = createApp(App)
app.use(router)
app.mount('#app')
```

If you're curious about what this plugin does, some of its responsibilities include:

- Globally registering the RouterView and RouterLink components.
- Adding the global `$router` and `$route` properties.
- Enabling the `useRouter()` and `useRoute()` composables.
- Triggering the router to resolve the initial route

### Accessing the router and current route

```ts
<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const search = computed({
  get() {
    return route.query.search ?? ''
  },
  set(search) {
    router.replace({ query: { search } })
  }
})
</script>
```
