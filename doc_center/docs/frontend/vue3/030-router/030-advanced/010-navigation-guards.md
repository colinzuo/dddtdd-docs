# Navigation Guards

guard navigations either by **redirecting it or canceling it**

## Global Before Guards

Guards may be resolved asynchronously, and the navigation is considered **pending** before all hooks have been resolved

Every guard function receives two arguments:

- to: the target route location in a **normalized format** being navigated to.
- from: the current route location in a normalized format being navigated away from.

```js
const router = createRouter({ ... })

router.beforeEach((to, from) => {
  // ...
  // explicitly return false to cancel the navigation
  return false
})
```

can optionally return any of the following values

- false
- A Route Location
- throw an Error
- nothing, undefined or true: the navigation is validated

```js
router.beforeEach(async (to, from) => {
  // canUserAccess() returns `true` or `false`
  const canAccess = await canUserAccess(to)
  if (!canAccess) return '/login'
})
```

## Global After Hooks

They are useful for analytics, changing the title of the page, accessibility features like announcing the page and many other things

```js
router.afterEach((to, from, failure) => {
  if (!failure) sendToAnalytics(to.fullPath)
})
```

## Global injections within guards

Since Vue 3.3, it is possible to use `inject()` within navigation guards. This is useful for injecting global properties like the **pinia stores**

```js
// main.ts
const app = createApp(App)
app.provide('global', 'hello injections')

// router.ts or main.ts
router.beforeEach((to, from) => {
  const global = inject('global') // 'hello injections'
  // a pinia store
  const userStore = useAuthStore()
  // ...
})
```

## In-Component Guards

- Using the composition API: you can add update and leave guards through `onBeforeRouteUpdate` and `onBeforeRouteLeave` respectively

## The Full Navigation Resolution Flow

- Navigation triggered.
- Call `beforeRouteLeave` guards in deactivated components.
- Call global `beforeEach` guards.
- Call `beforeRouteUpdate` guards in reused components.
- Call `beforeEnter` in route configs.
- Resolve async route components.
- Call `beforeRouteEnter` in activated components.
- Call global `beforeResolve` guards.
- Navigation is confirmed.
- Call global `afterEach` hooks.
- DOM updates triggered.
- Call callbacks passed to next in `beforeRouteEnter` guards with instantiated instances
