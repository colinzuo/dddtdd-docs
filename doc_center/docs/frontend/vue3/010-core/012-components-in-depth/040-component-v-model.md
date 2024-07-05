# Component v-model

## Basic Usage

Starting in Vue 3.4, the recommended approach to achieve this is using the `defineModel()` macro

```js
<!-- Child.vue -->
<script setup>
const model = defineModel()

function update() {
  model.value++
}
</script>

<template>
  <div>Parent bound v-model is: {{ model }}</div>
  <button @click="update">Increment</button>
</template>
```

The value returned by `defineModel()` is a `ref`. It can be accessed and mutated like any other ref, except that it acts as a two-way binding between a parent value and a local one

- Its `.value` is synced with the value bound by the parent `v-model`
- When it is mutated by the child, it causes the parent bound value to be updated as well

### Under the Hood

`defineModel` is a convenience macro. The compiler expands it to the following

- A prop named `modelValue`, which the local ref's value is synced with
- An event named `update:modelValue`, which is emitted when the local ref's value is mutated

```js
<!-- Child.vue -->
<script setup>
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <input
    :value="props.modelValue"
    @input="emit('update:modelValue', $event.target.value)"
  />
</template>

<!-- Parent.vue -->
<Child
  :modelValue="foo"
  @update:modelValue="$event => (foo = $event)"
/>
```

## v-model arguments

```ts
<MyComponent v-model:title="bookTitle" />

<!-- MyComponent.vue -->
<script setup>
const title = defineModel('title')
</script>

<template>
  <input type="text" v-model="title" />
</template>
```
