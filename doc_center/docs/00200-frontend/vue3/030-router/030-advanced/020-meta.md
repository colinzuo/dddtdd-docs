# Route Meta Fields

**meta property** which accepts an object of properties and can be **accessed on the route location and navigation guards**

```js
const routes = [
  {
    path: '/posts',
    component: PostsLayout,
    children: [
      {
        path: 'new',
        component: PostsNew,
        // only authenticated users can create posts
        meta: { requiresAuth: true },
      },
      {
        path: ':id',
        component: PostsDetail,
        // anybody can read a post
        meta: { requiresAuth: false },
      },
    ],
  },
]
```

All route records matched by a route are exposed on the `route` object (and also route objects in navigation guards) as the **`route.matched`** Array. We could loop through that array to check all meta fields, but Vue Router also provides you a **`route.meta`** that is a non-recursive **merge of all meta fields from parent to child**

```js
router.beforeEach((to, from) => {
  // instead of having to check every route record with
  // to.matched.some(record => record.meta.requiresAuth)
  if (to.meta.requiresAuth && !auth.isLoggedIn()) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    return {
      path: '/login',
      // save the location we were at to come back later
      query: { redirect: to.fullPath },
    }
  }
})
```

## TypeScript

```ts
// This can be directly added to any of your `.ts` files like `router.ts`
// It can also be added to a `.d.ts` file, in which case you will need to add an export
// to ensure it is treated as a module
export {}

import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    // is optional
    isAdmin?: boolean
    // must be declared by every route
    requiresAuth: boolean
  }
}
```
