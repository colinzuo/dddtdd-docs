
## dialog-content.ts

- dialogContentProps
- dialogContentEmits: `close`

### dialogContentProps

- center
- alignCenter
- closeIcon
- customClass
- draggable
- fullscreen
- showClose
- title

## dialog-content.vue

### draggable

```ts
const { dialogRef, headerRef, bodyId, ns, style } = inject(dialogInjectionKey)!

const draggable = computed(() => props.draggable)
useDraggable(dialogRef, headerRef, draggable)
```

### 设置div attribute

这个div就是整个dialog overlay上的root，在这里同时设置到inject进来的ref上
外侧的overlay设置了`zindex`和`position: fixed`，然后这个div通过设置`position: relative`来layout

`const composedDialogRef = composeRefs(focusTrapRef, dialogRef)`

```html
  <div
    :ref="composedDialogRef"
    :class="[
      ns.b(),
      ns.is('fullscreen', fullscreen),
      ns.is('draggable', draggable),
      ns.is('align-center', alignCenter),
      { [ns.m('center')]: center },
      customClass,
    ]"
    :style="style"
    tabindex="-1"
  >
```

### 设置header

显示title，如果配置了`showClose`则显示close button

```html
    <header ref="headerRef" :class="ns.e('header')">
      <slot name="header">
        <span role="heading" :class="ns.e('title')">
          {{ title }}
        </span>
      </slot>
      <button
        v-if="showClose"
        :aria-label="t('el.dialog.close')"
        :class="ns.e('headerbtn')"
        type="button"
        @click="$emit('close')"
      >
        <el-icon :class="ns.e('close')">
          <component :is="closeIcon || Close" />
        </el-icon>
      </button>
    </header>
```   

### 设置dialog body

```html
    <div :id="bodyId" :class="ns.e('body')">
      <slot />
    </div>
```

### 设置dialog footer

```html
    <footer v-if="$slots.footer" :class="ns.e('footer')">
      <slot name="footer" />
    </footer>
```    

## packages\theme-chalk\src\dialog.scss

```css
@include b(dialog) {
  @include set-component-css-var('dialog', $dialog);

  position: relative;
  margin: var(#{getCssVarName('dialog-margin-top')}, 15vh) auto 50px;
  background: getCssVar('dialog', 'bg-color');
  border-radius: getCssVar('dialog', 'border-radius');
  box-shadow: getCssVar('dialog', 'box-shadow');
  box-sizing: border-box;
  width: var(#{getCssVarName('dialog-width')}, 50%);

  &:focus {
    outline: none !important;
  }

  @include when(align-center) {
    margin: auto;
  }
```  

## dialog.ts

### dialogProps

- appendToBody
- beforeClose
- destroyOnClose
- closeOnClickModal
- closeOnPressEscape
- lockScroll
- modal
- openDelay
- closeDelay
- top
- modelValue
- modalClass
- width
- zIndex
- trapFocus

```ts
export const dialogProps = buildProps({
  ...dialogContentProps,
  appendToBody: {
    type: Boolean,
    default: false,
  },
```  

### dialogEmits

```ts
export const dialogEmits = {
  open: () => true,
  opened: () => true,
  close: () => true,
  closed: () => true,
  [UPDATE_MODEL_EVENT]: (value: boolean) => isBoolean(value),
  openAutoFocus: () => true,
  closeAutoFocus: () => true,
}
```

## use-dialog.ts

### style

```ts
    const varPrefix = `--${namespace.value}-dialog` as const
    if (!props.fullscreen) {
      if (props.top) {
        style[`${varPrefix}-margin-top`] = props.top
      }
      if (props.width) {
        style[`${varPrefix}-width`] = addUnit(props.width)
      }
    }
```

### functions

```ts
  function afterEnter() {
    emit('opened')
  }

  function afterLeave() {
    emit('closed')
    emit(UPDATE_MODEL_EVENT, false)
    if (props.destroyOnClose) {
      rendered.value = false
    }
  }

  function beforeLeave() {
    emit('close')
  }
```

```ts
  return {
    afterEnter,
    afterLeave,
    beforeLeave,
    handleClose,
    onModalClick,
    close,
    doClose,
    onOpenAutoFocus,
    onCloseAutoFocus,
    onCloseRequested,
    onFocusoutPrevented,
    titleId,
    bodyId,
    closed,
    style,
    overlayDialogStyle,
    rendered,
    visible,
    zIndex,
  }
```

## dialog.vue

### transition

[https://vuejs.org/guide/built-ins/transition.html](https://vuejs.org/guide/built-ins/transition.html)

The enter or leave can be triggered by one of the following:

- Conditional rendering via v-if
- Conditional display via v-show
- Dynamic components toggling via the `<component>` special element

```html
    <transition
      name="dialog-fade"
      @after-enter="afterEnter"
      @after-leave="afterLeave"
      @before-leave="beforeLeave"
    >
      <el-overlay
        v-show="visible"
        custom-mask-event
        :mask="modal"
        :overlay-class="modalClass"
        :z-index="zIndex"
      >
```

### overlay

`overlay`的child div被`css`设置为同样全屏，然后事件都绑定在child div上
`overlay`控制`visible`, `z-index`，添加背景色0.5 alpha的白色遮罩

```html
     <el-overlay
        v-show="visible"
        custom-mask-event
        :mask="modal"
        :overlay-class="modalClass"
        :z-index="zIndex"
      >
        <div
          role="dialog"
          aria-modal="true"
          :aria-label="title || undefined"
          :aria-labelledby="!title ? titleId : undefined"
          :aria-describedby="bodyId"
          :class="`${ns.namespace.value}-overlay-dialog`"
          :style="overlayDialogStyle"
          @click="overlayEvent.onClick"
          @mousedown="overlayEvent.onMousedown"
          @mouseup="overlayEvent.onMouseup"
        >
```        

`packages\theme-chalk\src\dialog.scss`

```css
.#{$namespace}-overlay-dialog {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
}
```

判断是否mousedown和mouseup都是点击在overlay本体上

```ts
const overlayEvent = useSameTarget(onModalClick)

  function onModalClick() {
    if (props.closeOnClickModal) {
      handleClose()
    }
  }
```

### focus-trap

- 控制focus
- 按esc键时会触发`release-requested`，进而触发dialog close

```html
          <el-focus-trap
            loop
            :trapped="visible"
            focus-start-el="container"
            @focus-after-trapped="onOpenAutoFocus"
            @focus-after-released="onCloseAutoFocus"
            @focusout-prevented="onFocusoutPrevented"
            @release-requested="onCloseRequested"
          >
```

```ts
  function onCloseRequested() {
    if (props.closeOnPressEscape) {
      handleClose()
    }
  }
```  

### dialog-content

基本就是透传slot到`el-dialog-content`

```html
            <el-dialog-content
              v-if="rendered"
              ref="dialogContentRef"
              v-bind="$attrs"
              :custom-class="customClass"
              :center="center"
              :align-center="alignCenter"
              :close-icon="closeIcon"
              :draggable="draggable"
              :fullscreen="fullscreen"
              :show-close="showClose"
              :title="title"
              @close="handleClose"
            >
              <template #header>
                <slot
                  v-if="!$slots.title"
                  name="header"
                  :close="handleClose"
                  :title-id="titleId"
                  :title-class="ns.e('title')"
                />
                <slot v-else name="title" />
              </template>
              <slot />
              <template v-if="$slots.footer" #footer>
                <slot name="footer" />
              </template>
            </el-dialog-content>
```
