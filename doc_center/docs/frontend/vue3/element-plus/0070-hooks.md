
## useAttrs

<https://vuejs.org/api/sfc-script-setup.html>

相比官方的区别是提供了exclude部分attrs的功能

```ts
interface Params {
  excludeListeners?: boolean
  excludeKeys?: ComputedRef<string[]>
}
```

## use-common-props

### useSizeProp

size这个prop的通用定义

### useSize

- 从prop获取size设置
- 通过inject获取form、formItem的size设置
- 从globalConfig获取size设置

### useDisabled

- 从prop获取disabled设置
- 通过inject获取form的disabled设置
- 缺省false

## useCursor

用于input在format后重新设置cursor

- recordCursor: 从HTMLInputElement中提取selection信息
- setCursor: 通过`HTMLInputElement.setSelectionRange`设置

## useDelayedToggle

- onOpen: 封装传入open提供delay showAfter后调用
- onClose: 封装传入close提供delay hideAfter后调用

## useDeprecated

当传入的condition为true时通过debugWarn警告

当使用了deprecated的prop时设置condition为true

## useDraggable

当drag dragRef这个HTMLElement时，根据mouse的移动偏移，
设置targetRef这个HTMLElement的`style.transform = translate(xxx, yyy)`

## useEscapeKeydown

维护一个handler列表，当`event.key === EVENT_CODE.esc`时遍历调用

`document.addEventListener('keydown', cachedHandler)`

## useFloating

通过`@floating-ui/dom`计算popup的位置

## useFocus

和reactive没关系，就是一个函数封装，提供输入参数的focus功能

## useFormItemInputId

- 从props提取id: `toRef(props, 'id')`
- 或者通过useId生成: `!disableIdGeneration ? useId().value : undefined`

## useForwardRef

通过provide，inject提供一种在内层给外层设置element的方法

## useGlobalConfig

- provideGlobalConfig: 合并传入的config和上层的config
- useGlobalConfig: 从inject获取的config提取需要的配置项

## useId

`inject(ID_INJECTION_KEY, defaultIdInjection)`，然后生成一个唯一id

## useLocale

提供一个Translator: `(path: string, option?: TranslatorOption) => string`

## useLockscreen

- hiddenCls名字: `el-popup-parent--hidden`
- 根据输入trigger的变量增减这个class

## useModal

```ts
  if (e.code === EVENT_CODE.esc) {
    e.stopPropagation()
    const topModal = modalStack[modalStack.length - 1]
    topModal.handleClose()
  }
```



## useNamespace

css变量的命名等，比如

`${namespace}-${block}-${blockSuffix}__${element}--${modifier}`

## useProp

从`vm.proxy?.$props`提取指定prop

## useTimeout

- registerTimeout: 调用setTimeout
- cancelTimeout: 调用setTimeout
- 在tryOnScopeDispose时自动cancelTimeout
