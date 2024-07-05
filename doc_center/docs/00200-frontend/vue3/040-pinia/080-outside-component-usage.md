# Using a store outside of a component

Behind the scenes, `useStore()` **injects the pinia instance** you gave to your app

This means that if the pinia instance cannot be automatically injected, you have to **manually provide it to the useStore()** function

If you are not doing any SSR (Server Side Rendering), **any call of useStore() after installing the pinia plugin with app.use(pinia) will work**

```ts
const pinia = createPinia()
const app = createApp(App)
app.use(pinia)

// ✅ works because the pinia instance is now active
const userStore = useUserStore()
```
