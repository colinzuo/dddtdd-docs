# Passing Props to Route Components

We can then configure the route to pass the `id` param as a prop by setting `props: true`

```js
<!-- User.vue -->
<script setup>
defineProps({
  id: String
})
</script>

const routes = [{ path: '/user/:id', component: User, props: true }]
```

## Boolean mode

When **props is set to true**, the `route.params` will be set as the component props

## Named views

```js
const routes = [
  {
    path: '/user/:id',
    components: { default: User, sidebar: Sidebar },
    props: { default: true, sidebar: false }
  }
]
```

## Object mode

When props is an object, this will be set as the component props **as-is**

```js
const routes = [
  {
    path: '/promotion/from-newsletter',
    component: Promotion,
    props: { newsletterPopup: false }
  }
]
```

## Function mode

```js
const routes = [
  {
    path: '/search',
    component: SearchUser,
    props: route => ({ query: route.query.q })
  }
]
```
