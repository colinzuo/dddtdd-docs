# Named Routes

Alongside the path, you can provide a name to any route. This has the following **advantages**

- No hardcoded URLs
- Automatic encoding/decoding of params
- Bypassing path ranking

```js
const routes = [
  {
    path: '/user/:username',
    name: 'user',
    component: User
  }
]

<router-link :to="{ name: 'user', params: { username: 'erina' }}">
  User
</router-link>

router.push({ name: 'user', params: { username: 'erina' } })
```
