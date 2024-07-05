# TypeScript with Composition API

## Typing Component Props

```ts
<script setup lang="ts">
const props = defineProps({
  foo: { type: String, required: true },
  bar: Number
})

props.foo // string
props.bar // number | undefined
</script>
```

You can use either type-based declaration OR runtime declaration, but you cannot use both at the same time

```ts
<script setup lang="ts">
interface Props {
  foo: string
  bar?: number
}

const props = defineProps<Props>()
</script>
```

### Props Default Values

```ts
export interface Props {
  msg?: string
  labels?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  msg: 'hello',
  labels: () => ['one', 'two']
})
```

### Complex prop types

```ts
import type { PropType } from 'vue'

const props = defineProps({
  book: Object as PropType<Book>
})
```

## Typing Component Emits

```ts
<script setup lang="ts">
// runtime
const emit = defineEmits(['change', 'update'])

// type-based
const emit = defineEmits<{
  (e: 'change', id: number): void
  (e: 'update', value: string): void
}>()

// 3.3+: alternative, more succinct syntax
const emit = defineEmits<{
  change: [id: number]
  update: [value: string]
}>()
</script>
```

## Typing ref()

```ts
// resulting type: Ref<string | number>
const year = ref<string | number>('2020')

year.value = 2020 // ok!
```

## Typing reactive()

```ts
import { reactive } from 'vue'

interface Book {
  title: string
  year?: number
}

const book: Book = reactive({ title: 'Vue 3 Guide' })
```

:::tip
It's not recommended to use the generic argument of `reactive()` because the returned type, which handles nested ref unwrapping, is different from the generic argument type.
:::

## Typing Event Handlers

```ts
function handleChange(event: Event) {
  console.log((event.target as HTMLInputElement).value)
}
```

## Typing Template Refs

```ts
<script setup lang="ts">
import { ref, onMounted } from 'vue'

const el = ref<HTMLInputElement | null>(null)

onMounted(() => {
  el.value?.focus()
})
</script>

<template>
  <input ref="el" />
</template>
```
