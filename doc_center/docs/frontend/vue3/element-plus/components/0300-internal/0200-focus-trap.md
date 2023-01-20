
## tokens.ts

- FOCUS_AFTER_TRAPPED
- FOCUS_AFTER_RELEASED
- FOCUSOUT_PREVENTED
- FOCUS_AFTER_TRAPPED_OPTS
- FOCUSOUT_PREVENTED_OPTS
- ON_TRAP_FOCUS_EVT
- ON_RELEASE_FOCUS_EVT

## utils.ts

- obtainAllFocusableElements: 通过`document.createTreeWalker`和`node.tabIndex >= 0`获取列表
- getVisibleElement: 找到列表第一个visible element
- getEdges: `obtainAllFocusableElements` -> `getVisibleElement`
- tryFocus: 如果能focus则调用`element.focus({ preventScroll: true })`, `element.select()`
- focusFirstDescendant：挨个尝试，直到`document.activeElement`改变
- focusableStack
- isFocusCausedByUserEvent
- useFocusReason: `focusReason = ref<'pointer' | 'keyboard'>()`
- createFocusOutPreventedEvent

### useFocusReason

```ts
      document.addEventListener('mousedown', notifyFocusReasonPointer)
      document.addEventListener('touchstart', notifyFocusReasonPointer)
      document.addEventListener('keydown', notifyFocusReasonKeydown)
```      

## focus-trap.vue

### props

```ts
  props: {
    loop: Boolean,
    trapped: Boolean,
    focusTrapEl: Object as PropType<HTMLElement>,
    focusStartEl: {
      type: [Object, String] as PropType<'container' | 'first' | HTMLElement>,
      default: 'first',
    },
  },
```  

### emits

```ts
  emits: [
    ON_TRAP_FOCUS_EVT,
    ON_RELEASE_FOCUS_EVT,
    'focusin',
    'focusout',
    'focusout-prevented',
    'release-requested',
  ],
```

### component setup

- escape key: `!focusLayer.paused`也就是最上层focusLayer，`emit('release-requested', event)`
- onKeydown: 当按键tab且正常应该focus离开当前container时，，限制focus只在内部变化，并发送`emit('focusout-prevented', focusoutPreventedEvent)`
- onFocusOut: 如果`props.trapped`为真则, 发送`emit('focusout-prevented', focusoutPreventedEvent)`, `tryFocus(lastFocusAfterTrapped, true)`
- startTrap: 如果当前focus在外部，则尝试focus `props.focusStartEl`，如果失败则尝试`tryFocus(trapContainer)`

```ts
    useEscapeKeydown((event) => {
      if (props.trapped && !focusLayer.paused) {
        emit('release-requested', event)
      }
    })

    const onKeydown = (e: KeyboardEvent) => {....

    provide(FOCUS_TRAP_INJECTION_KEY, {
      focusTrapRef: forwardRef,
      onKeydown,
    })    

    watch([forwardRef], ([forwardRef], [oldForwardRef]) => {
      if (forwardRef) {
        forwardRef.addEventListener('keydown', onKeydown)
        forwardRef.addEventListener('focusin', onFocusIn)
        forwardRef.addEventListener('focusout', onFocusOut)
      }    
```
