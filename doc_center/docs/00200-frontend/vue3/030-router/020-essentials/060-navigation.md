# Programmatic Navigation

## Navigate to a different location

This is the method called internally when you click a `<router-link>`, so clicking `<router-link :to="...">` is the equivalent of calling `router.push(...)`

```js
// literal string path
router.push('/users/eduardo')

// object with path
router.push({ path: '/users/eduardo' })

// named route with params to let the router build the url
router.push({ name: 'user', params: { username: 'eduardo' } })

// with query, resulting in /register?plan=private
router.push({ path: '/register', query: { plan: 'private' } })

// with hash, resulting in /about#team
router.push({ path: '/about', hash: '#team' })
```

**params are ignored if a path is provided**

`router.push` and all the other navigation methods **return a Promise**

## Replace current location

It acts like router.push, the only difference is that it navigates without pushing a new history entry

```js
router.push({ path: '/home', replace: true })
// equivalent to
router.replace({ path: '/home' })
```

## Traverse history

```js
// go forward by one record, the same as router.forward()
router.go(1)

// go back by one record, the same as router.back()
router.go(-1)

// go forward by 3 records
router.go(3)

// fails silently if there aren't that many records
router.go(-100)
router.go(100)
```

