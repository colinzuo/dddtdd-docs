
## loading.ts

`export function createLoadingComponent(options: LoadingOptionsResolved) {`

### elLoadingComponent

通过`h`函数组装，包括`div`, `spinner`(svg), `spinnerText`

其中root div通过class设置了

```css
.el-loading-mask {
    position: absolute;
    z-index: 2000;
    background-color: var(--el-mask-color);
    margin: 0;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transition: opacity var(--el-transition-duration);
}
```

### vm

```ts
  const loadingInstance = createApp(elLoadingComponent)
  const vm = loadingInstance.mount(document.createElement('div'))
```

### 方法

- setText: 设置spinnerText
- removeElLoadingChild: 删除dom node
- close: 先设置`data.visible = false`，然后过几百毫秒后`destroySelf()`
- destroySelf(): 调用`destroySelf()`

## service.ts

### resolveOptions

```ts
    target =
      document.querySelector<HTMLElement>(options.target) ?? document.body

  return {
    parent: target === document.body || options.body ? document.body : target,
    
    fullscreen: target === document.body && (options.fullscreen ?? true),
    lock: options.lock ?? false,
    visible: options.visible ?? true,
    target,    
```

### addStyle

- zIndex
- top
- left
- height
- width

### addClassList

- el-loading-parent--relative

### Loading

通过`addClassList`设置parent的`position: relative`

```ts
  const resolved = resolveOptions(options)

  const instance = createLoadingComponent({
    ...resolved,
    closed: () => {
      resolved.closed?.()
      if (resolved.fullscreen) fullscreenInstance = undefined
    },
  })
  
  addStyle(resolved, resolved.parent, instance)
  addClassList(resolved, resolved.parent, instance)
  
  resolved.parent.setAttribute('loading-number', loadingNumber)

  resolved.parent.appendChild(instance.$el)
  
  nextTick(() => (instance.visible.value = resolved.visible))  
```

## directive.ts

```ts
    const instance = el[INSTANCE_KEY]
    if (binding.oldValue !== binding.value) {
      if (binding.value && !binding.oldValue) {
        createInstance(el, binding)
      } else if (binding.value && binding.oldValue) {
        if (isObject(binding.value))
          updateOptions(binding.value, instance!.options)
      } else {
        instance?.instance.close()
      }
    }
```

### createInstance

```ts
  const fullscreen =
    getBindingProp('fullscreen') ?? binding.modifiers.fullscreen

  const options: LoadingOptions = {
    text: getProp('text'),

    fullscreen,
    target: getBindingProp('target') ?? (fullscreen ? undefined : el),
  }
  el[INSTANCE_KEY] = {
    options,
    instance: Loading(options),
  }
```  
