# Redirect and Alias

## Redirect

```js
const routes = [{ path: '/home', redirect: '/' }]

const routes = [{ path: '/home', redirect: { name: 'homepage' } }]
```

## Alias

An alias of `/` as `/home` means when the user visits `/home`, the URL remains `/home`, but it will be matched as if the user is visiting `/`

```js
const routes = [
  {
    path: '/users',
    component: UsersLayout,
    children: [
      // this will render the UserList for these 3 URLs
      // - /users
      // - /users/list
      // - /people
      { path: '', component: UserList, alias: ['/people', 'list'] },
    ],
  },
]
```
