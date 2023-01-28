
## message.ts

### messageProps

```ts
export const messageProps = buildProps({

  center: {
    type: Boolean,
    default: messageDefaults.center,
  },

  duration: {
    type: Number,
    default: messageDefaults.duration,
  },
  
  message: {
    type: definePropType<string | VNode | (() => VNode)>([
      String,
      Object,
      Function,
    ]),
    default: messageDefaults.message,
  },
  
  showClose: {
    type: Boolean,
    default: messageDefaults.showClose,
  },
  
  type: {
    type: String,
    values: messageTypes,
    default: messageDefaults.type,
  },

```  
  
## instance.ts

```ts
export type MessageContext = {
  id: string
  vnode: VNode
  handler: MessageHandler
  vm: ComponentInternalInstance
  props: Mutable<MessageProps>
}

export const instances: MessageContext[] = shallowReactive([])
```

- `getInstance = (id: string)`
- `getLastOffset = (id: string): number`

## message.vue

### state

```ts
const ns = useNamespace('message')

const messageRef = ref<HTMLDivElement>()
const visible = ref(false)
const height = ref(0)

let stopTimer: (() => void) | undefined = undefined

const badgeType = computed<BadgeProps['type']>(() =>
  props.type ? (props.type === 'error' ? 'danger' : props.type) : 'info'
)
const typeClass = computed(() => {
  const type = props.type
  return { [ns.bm('icon', type)]: type && TypeComponentsMap[type] }
})
const iconComponent = computed(
  () => props.icon || TypeComponentsMap[props.type] || ''
)

const lastOffset = computed(() => getLastOffset(props.id))
const offset = computed(() => props.offset + lastOffset.value)
const bottom = computed((): number => height.value + offset.value)
const customStyle = computed<CSSProperties>(() => ({
  top: `${offset.value}px`,
  zIndex: props.zIndex,
}))
```

### onClose回调触发

```html
  <transition
    :name="ns.b('fade')"
    @before-leave="onClose"
    @after-leave="$emit('destroy')"
```

### class & style & 自动关闭timer设置

```html
    <div
      v-show="visible"
      :id="id"
      ref="messageRef"
      :class="[
        ns.b(),
        { [ns.m(type)]: type && !icon },
        ns.is('center', center),
        ns.is('closable', showClose),
        customClass,
      ]"
      :style="customStyle"
      role="alert"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
```    

### content

```html
        <p v-if="!dangerouslyUseHTMLString" :class="ns.e('content')">
          {{ message }}
        </p>

      <el-icon v-if="showClose" :class="ns.e('closeBtn')" @click.stop="close">
        <Close />
      </el-icon>
```              

## method.ts

```ts
messageTypes.forEach((type) => {
  message[type] = (options = {}, appContext) => {
    const normalized = normalizeOptions(options)
    return message({ ...normalized, type }, appContext)
  }
})
```

```ts
const message: MessageFn &
  Partial<Message> & { _context: AppContext | null } = (
  options = {},
  context
) => {

  const instance = createMessage(normalized, context)

  instances.push(instance)
  return instance.handler
```      
