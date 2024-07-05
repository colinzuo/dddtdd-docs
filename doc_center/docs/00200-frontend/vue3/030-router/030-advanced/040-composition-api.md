# Vue Router and the Composition API

## Accessing the Router and current Route inside setup

```ts
<script setup>
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

function pushWithQuery(query) {
  router.push({
    name: 'search',
    query: {
      ...route.query,
      ...query,
    },
  })
}
</script>
```

The `route` object is a reactive object. In most scenarios, you should **avoid watching the whole** route object. Instead, you can directly watch the properties you are expecting to change

```ts
<script setup>
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'

const route = useRoute()
const userData = ref()

// fetch the user information when params change
watch(
  () => route.params.id,
  async newId => {
    userData.value = await fetchUser(newId)
  }
)
</script>
```

## Navigation Guards

```ts
<script setup>
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
import { ref } from 'vue'

// same as beforeRouteLeave option but with no access to `this`
onBeforeRouteLeave((to, from) => {
  const answer = window.confirm(
    'Do you really want to leave? you have unsaved changes!'
  )
  // cancel the navigation and stay on the same page
  if (!answer) return false
})

const userData = ref()

// same as beforeRouteUpdate option but with no access to `this`
onBeforeRouteUpdate(async (to, from) => {
  // only fetch the user if the id changed as maybe only the query or the hash changed
  if (to.params.id !== from.params.id) {
    userData.value = await fetchUser(to.params.id)
  }
})
</script>
```
