# getting-started

```bash
npm install pinia
```

```js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.mount('#app')
```

## What is a Store

It has three concepts, the **state, getters and actions** and it's safe to assume these concepts are the equivalent of **data, computed and methods** in components.
