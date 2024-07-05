
## click-outside

通过`Node.contains`判断是否在外部点击，如果是则调用binding函数

```ts
    const isContainedByEl =
      el.contains(mouseUpTarget) || el.contains(mouseDownTarget)
```

通过全局Map变量nodeList维护el与handler的映射关系

```ts
    nodeList.get(el)!.push({
      documentHandler: createDocumentHandler(el, binding),
      bindingFn: binding.value,
    })
```

## mousewheel

在el上绑定`wheel`事件

```ts
element.addEventListener('wheel', fn, { passive: true })
```

## repeat-click

如果左键点击后，会重复调用handler，比如用于点击+号持续递增

```ts
    el.addEventListener('mousedown', (evt: MouseEvent) => {
      if (evt.button !== 0) return
      clear()
      handler()

      document.addEventListener('mouseup', () => clear(), {
        once: true,
      })

      delayId = setTimeout(() => {
        intervalId = setInterval(() => {
          handler()
        }, interval)
      }, delay)
    })
```    

## trap-focus

在keydown回调中处理focus变化

```ts
    if (FOCUS_STACK.length <= 1) {
      document.addEventListener('keydown', FOCUS_HANDLER)
    }
```    
