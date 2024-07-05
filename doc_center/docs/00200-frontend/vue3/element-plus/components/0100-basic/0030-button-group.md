
## button-group.vue

### 设置 div attribute

```vue
  <div :class="`${ns.b('group')}`">
    <slot />
  </div>
```  

### 提供button group context

```ts
provide(
  buttonGroupContextKey,
  reactive({
    size: toRef(props, 'size'),
    type: toRef(props, 'type'),
  })
)
```

## packages\theme-chalk\src\button-group.scss

```scss
  & > .#{$namespace}-button {
    float: left;
    position: relative;
    & + .#{$namespace}-button {
      margin-left: 0;
    }
```    
