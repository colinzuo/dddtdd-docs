# Dynamic Routing

```js
router.addRoute({ path: '/about', component: About })
// we could also use this.$route or route = useRoute() (inside a setup)
router.replace(router.currentRoute.value.fullPath)
```
