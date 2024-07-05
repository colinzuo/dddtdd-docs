# Lifecycle Hooks

## Registering Lifecycle Hooks

```ts
<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  console.log(`the component is now mounted.`)
})
</script>
```

## Lifecycle Diagram

![Lifecycle Diagram](https://vuejs.org/assets/lifecycle.MuZLBFAS.png)

- setup (Composition API)
- beforeCreate
- created
- beforeMount
- mounted
- beforeUpdate
- updated
- beforeUnmount
- unmounted
