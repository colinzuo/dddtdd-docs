# Data Fetching

## Fetching After Navigation

```ts
<template>
  <div class="post">
    <div v-if="loading" class="loading">Loading...</div>

    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="post" class="content">
      <h2>{{ post.title }}</h2>
      <p>{{ post.body }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getPost } from './api.js'

const route = useRoute()

const loading = ref(false)
const post = ref(null)
const error = ref(null)

// watch the params of the route to fetch the data again
watch(() => route.params.id, fetchData, { immediate: true })

async function fetchData(id) {
  error.value = post.value = null
  loading.value = true
  
  try {
    // replace `getPost` with your data fetching util / API wrapper
    post.value = await getPost(id)  
  } catch (err) {
    error.value = err.toString()
  } finally {
    loading.value = false
  }
}
</script>
```  
