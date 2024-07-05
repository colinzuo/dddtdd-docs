# RouterView slot

```html
<router-view v-slot="{ Component }">
  <component :is="Component" />
</router-view>
```

## KeepAlive & Transition

When working with the `KeepAlive` component, we would usually want it to keep the route components alive, not the `RouterView` itself

```html
<router-view v-slot="{ Component }">
  <transition>
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </transition>
</router-view>
```
