
## button.ts

- buttonTypes
- buttonNativeTypes
- buttonProps
- buttonEmits

## use-button.ts

```ts
  return {
    _disabled,
    _size,
    _type,
    _ref,
    shouldAddSpace,
    handleClick,
  }
```  

## button-custom.ts

```ts
  const _disabled = useDisabled()
  const ns = useNamespace('button')

        const hoverBgColor = props.dark
          ? darken(color, 30)
          : color.tint(30).toString()
        const textColor = color.isDark()
          ? `var(${ns.cssVarName('color-white')})`
          : `var(${ns.cssVarName('color-black')})`
```

## button.vue

### 按状态设置 button attribute

```ts
    :class="[
      ns.b(),
      ns.m(_type),
      ns.m(_size),
      ns.is('disabled', _disabled),
      ns.is('loading', loading),
      ns.is('plain', plain),
      ns.is('round', round),
      ns.is('circle', circle),
      ns.is('text', text),
      ns.is('link', link),
      ns.is('has-bg', bg),
    ]"
    :disabled="_disabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
    :style="buttonStyle"
    @click="handleClick"    
```    

### 按用户输入render

```ts
    <template v-if="loading">
      <slot v-if="$slots.loading" name="loading" />
      <el-icon v-else :class="ns.is('loading')">
        <component :is="loadingIcon" />
      </el-icon>
    </template>
    <el-icon v-else-if="icon || $slots.icon">
      <component :is="icon" v-if="icon" />
      <slot v-else name="icon" />
    </el-icon>
    <span
      v-if="$slots.default"
      :class="{ [ns.em('text', 'expand')]: shouldAddSpace }"
    >
      <slot />
    </span>
```
    