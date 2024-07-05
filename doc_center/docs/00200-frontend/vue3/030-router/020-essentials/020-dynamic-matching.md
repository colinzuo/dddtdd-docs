# Dynamic Route Matching with Params

```js
import User from './User.vue'

// these are passed to `createRouter`
const routes = [
  // dynamic segments start with a colon
  { path: '/users/:id', component: User },
]
```

```html
<template>
  <div>
    <!-- The current route is accessible as $route in the template -->
    User {{ $route.params.id }}
  </div>
</template>
```

In addition to `$route.params`, the `$route` object also exposes other useful information such as `$route.query` (if there is a query in the URL), `$route.hash`, etc

## Reacting to Params Changes

One thing to note when using routes with params is that when the user navigates from `/users/johnny` to `/users/jolyne`, **the same component instance will be reused**

```ts
<script setup>
import { watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

watch(
  () => route.params.id,
  (newId, oldId) => {
    // react to route changes...
  }
)
</script>
```

```ts
<script setup>
import { onBeforeRouteUpdate } from 'vue-router'
// ...

onBeforeRouteUpdate(async (to, from) => {
  // react to route changes...
  userData.value = await fetchUser(to.params.id)
})
</script>
```

## Catch all / 404 Not found Route

If we want to match anything, we can use a **custom param regexp** by adding the regexp inside parentheses right after the param:

```js
const routes = [
  // will match everything and put it under `$route.params.pathMatch`
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
  // will match anything starting with `/user-` and put it under `$route.params.afterUser`
  { path: '/user-:afterUser(.*)', component: UserGeneric },
]
```

```js
router.push({
  name: 'NotFound',
  // preserve current path and remove the first char to avoid the target URL starting with `//`
  params: { pathMatch: route.path.substring(1).split('/') },
  // preserve existing query and hash if any
  query: route.query,
  hash: route.hash,
})
```
