
## drawer.ts

### drawerProps

- direction: `values: ['ltr', 'rtl', 'ttb', 'btt']`
- size: `default: '30%'`
- withHeader: `default: true`
- modalFade: `default: true`

```ts
import { dialogEmits, dialogProps } from '@element-plus/components/dialog'

export const drawerProps = buildProps({
  ...dialogProps,
  direction: {
```

### drawerEmits

`export const drawerEmits = dialogEmits`

## drawer.vue

### setup

```ts
    const drawerRef = ref<HTMLElement>()
    const focusStartRef = ref<HTMLElement>()
    const ns = useNamespace('drawer')
    const { t } = useLocale()

    const isHorizontal = computed(
      () => props.direction === 'rtl' || props.direction === 'ltr'
    )
    const drawerSize = computed(() => addUnit(props.size))
```

### template 

- 在transition时候加了动画

```html
    <transition
      :name="ns.b('fade')"
```

- 直接在overlay上设置了onClick处理

```html
      <el-overlay
        v-show="visible"
        :mask="modal"
        :overlay-class="modalClass"
        :z-index="zIndex"
        @click="onModalClick"
```

- 直接在focus trap上设置`focus-trap-el` (dialog是在dialog-content内通过inject得到后设置的)

```html
        <el-focus-trap
          loop
          :trapped="visible"
          :focus-trap-el="drawerRef"
          :focus-start-el="focusStartRef"
          @release-requested="onCloseRequested"
```

- 设置class，设置`width`或`height`，对click事件stop propogation (所以前面overlay那里没用useSameTarget)

```html
          <div
            ref="drawerRef"
            v-bind="$attrs"
            :class="[ns.b(), direction, visible && 'open', customClass]"
            :style="
              isHorizontal ? 'width: ' + drawerSize : 'height: ' + drawerSize
            "
            role="dialog"
            @click.stop
```

- 设置slots: `header`, `default`, `footer`

`packages\theme-chalk\src\drawer.scss`

```css
@include b(drawer) {
  position: absolute;
  box-sizing: border-box;
  background-color: getCssVar('drawer', 'bg-color');
  display: flex;
  flex-direction: column;

  &.ltr,
  &.rtl {
    height: 100%;
    top: 0;
    bottom: 0;
  }

  &.ltr {
    left: 0;
  }

  &.rtl {
    right: 0;
  }
```

