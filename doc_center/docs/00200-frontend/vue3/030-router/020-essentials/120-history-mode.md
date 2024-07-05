# Different History modes

The **history option** when creating the router instance allows us to choose among different history modes

## Hash Mode

```js
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    //...
  ],
})
```

## HTML5 Mode

The HTML5 mode is created with `createWebHistory()` and is the **recommended mode**

```js
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    //...
  ],
})
```

## Example Server Configurations

### nginx

```
location / {
  try_files $uri $uri/ /index.html;
}
```
