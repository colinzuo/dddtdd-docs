# State

## TypeScript

You don't need to do much in order to make your state compatible with TS: make sure `strict`, or at the very least, `noImplicitThis`, are enabled and Pinia will **infer the type of your state automatically**

```ts
interface State {
  userList: UserInfo[]
  user: UserInfo | null
}

export const useUserStore = defineStore('user', {
  state: (): State => {
    return {
      userList: [],
      user: null,
    }
  },
})

interface UserInfo {
  name: string
  age: number
}
```

## Accessing the state

```ts
const store = useStore()

store.count++
```

## Mutating the state

```js
store.$patch({
  count: store.count + 1,
  age: 120,
  name: 'DIO',
})
```

```js
store.$patch((state) => {
  state.items.push({ name: 'shoes', quantity: 1 })
  state.hasChanged = true
})
```

## Subscribing to the state

The advantage of using `$subscribe()` over a regular `watch()` is that subscriptions will trigger only once after patches

```js
cartStore.$subscribe((mutation, state) => {
  // import { MutationType } from 'pinia'
  mutation.type // 'direct' | 'patch object' | 'patch function'
  // same as cartStore.$id
  mutation.storeId // 'cart'
  // only available with mutation.type === 'patch object'
  mutation.payload // patch object passed to cartStore.$patch()

  // persist the whole state to the local storage whenever it changes
  localStorage.setItem('cart', JSON.stringify(state))
})
```
