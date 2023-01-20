
## config-provider.ts

### configProviderProps

- a11y
- locale
- size
- button
- experimentalFeatures
- keyboardNavigation
- message
- zIndex
- namespace

### component

```ts
const ConfigProvider = defineComponent({

  setup(props, { slots }) {

    const config = provideGlobalConfig(props)
    return () => renderSlot(slots, 'default', { config: config?.value })
  },
```
