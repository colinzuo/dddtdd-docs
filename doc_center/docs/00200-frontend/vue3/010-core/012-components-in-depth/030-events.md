# Component Events

## Emitting and Listening to Events

```js
<!-- MyComponent -->
<button @click="$emit('someEvent')">Click Me</button>

<MyComponent @some-event="callback" />
```

:::tip
Unlike native DOM events, component emitted events do not bubble. You can only listen to the events emitted by a direct child component. If there is a need to communicate between sibling or deeply nested components, use an external event bus or a global state management solution.
:::

## Event Arguments

:::tip
All extra arguments passed to `$emit()` after the event name will be forwarded to the listener. For example, with `$emit('foo', 1, 2, 3)` the listener function will receive three arguments
:::

## Declaring Emitted Events

```ts
<script setup lang="ts">
const emit = defineEmits<{
  (e: 'change', id: number): void
  (e: 'update', value: string): void
}>()
</script>
```

## Events Validation

```ts
<script setup>
const emit = defineEmits({
  // No validation
  click: null,

  // Validate submit event
  submit: ({ email, password }) => {
    if (email && password) {
      return true
    } else {
      console.warn('Invalid submit event payload!')
      return false
    }
  }
})

function submitForm(email, password) {
  emit('submit', { email, password })
}
</script>
```
