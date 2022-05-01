
## Getting Started

- HTML
- JavaScript

```html
    <router-link to="/foo">Go to Foo</router-link>
    <router-link to="/bar">Go to Bar</router-link>

  <router-view></router-view>    
```

```js
  username() {
    // We will see what `params` is shortly
    return this.$route.params.username
  }

  goBack() {
    window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
  }
```

Notice that a `<router-link>` automatically gets the .router-link-active class when its target route is matched

## Dynamic Route Matching

- Reacting to Params Changes
- Catch all / 404 Not found Route
- Advanced Matching Patterns `path-to-regexp`
- Matching Priority

the earlier a route is defined, the higher priority it gets

```js
  routes: [
    // dynamic segments start with a colon
    { path: '/user/:id', component: User }
  ]
```

```js
  watch: {
    $route(to, from) {
      // react to route changes...
    }
  }
```

## Nested Routes

```js
const router = new VueRouter({
  routes: [
    {
      path: '/user/:id',
      component: User,
      children: [
        {
          // UserProfile will be rendered inside User's <router-view>
          // when /user/:id/profile is matched
          path: 'profile',
          component: UserProfile
        },
        {
          // UserPosts will be rendered inside User's <router-view>
          // when /user/:id/posts is matched
          path: 'posts',
          component: UserPosts
        }
      ]
    }
  ]
})
```

## Programmatic Navigation

- `router.push(location, onComplete?, onAbort?)`
- `router.replace(location, onComplete?, onAbort?)`
- `router.go(n)`

params are ignored if a path is provided

```js
const userId = '123'
router.push({ name: 'user', params: { userId } }) // -> /user/123
router.push({ path: `/user/${userId}` }) // -> /user/123
```

If the destination is the same as the current route and only params are changing (e.g. going from one profile to another /users/1 -> /users/2), you will have to use **beforeRouteUpdate** to react to changes

## Named Routes

```js
<router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>

router.push({ name: 'user', params: { userId: 123 } })
```

## Named Views

- Nested Named Views

```html
<router-view class="view one"></router-view>
<router-view class="view two" name="a"></router-view>
<router-view class="view three" name="b"></router-view>
```

```js
const router = new VueRouter({
  routes: [
    {
      path: '/',
      components: {
        default: Foo,
        a: Bar,
        b: Baz
      }
    }
  ]
})
```

## Redirect and Alias

```js
{ path: '/a', redirect: '/b' }

{ path: '/a', redirect: { name: 'foo' }}

{ path: '/a', component: A, alias: '/b' }
```

## Passing Props to Route Components

- Boolean mode
- Object mode
- Function mode

```js
{ path: '/user/:id', component: User, props: true },

{
  path: '/search',
  component: SearchUser,
  props: route => ({ query: route.query.q })
}
```

## HTML5 History Mode

```js
const router = new VueRouter({
  mode: 'history',
  routes: [...]
})
```

## Navigation Guards

- Global Before Guards
- Global Resolve Guards
- Global After Hooks
- Per-Route Guard
- In-Component Guards
- The Full Navigation Resolution Flow

```js
router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
  else next()
})
```

```js
beforeRouteLeave (to, from, next) {
  const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
  if (answer) {
    next()
  } else {
    next(false)
  }
}
```

## Route Meta Fields

Sometimes, you might want to attach arbitrary information to routes like transition names, who can access the route, etc. This can be achieved through the meta property which accepts an object of properties and can be accessed on the route location and navigation guards.

All route records matched by a route are exposed on the $route object (and also route objects in navigation guards) as the $route.matched Array.

```js
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!auth.loggedIn()) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})
```

## Transitions

```html
<transition>
  <router-view></router-view>
</transition>
```

## Data Fetching

- Fetching After Navigation

When using this approach, we navigate and render the incoming component immediately, and fetch data in the component's created hook

```js
export default {
  data () {
    return {
      loading: false,
      post: null,
      error: null
    }
  },
  created () {
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchData()
  },
  watch: {
    // call again the method if the route changes
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      this.error = this.post = null
      this.loading = true
      const fetchedId = this.$route.params.id
      // replace `getPost` with your data fetching util / API wrapper
      getPost(fetchedId, (err, post) => {
        // make sure this request is the last one we did, discard otherwise
        if (this.$route.params.id !== fetchedId) return
        this.loading = false
        if (err) {
          this.error = err.toString()
        } else {
          this.post = post
        }
      })
    }
  }
}
```

## Scroll Behavior

When using client-side routing, we may want to scroll to top when navigating to a new route, or preserve the scrolling position of history entries just like real page reload does

```js
const router = new VueRouter({
  routes: [...],
  scrollBehavior (to, from, savedPosition) {
    // return desired position
  }
})

scrollBehavior (to, from, savedPosition) {
  if (savedPosition) {
    return savedPosition
  } else {
    return { x: 0, y: 0 }
  }
}

scrollBehavior (to, from, savedPosition) {
  if (to.hash) {
    return {
      selector: to.hash
      // , offset: { x: 0, y: 10 }
    }
  }
}
```

## Lazy Loading Routes

- Grouping Components in the Same Chunk

```js
const Foo = () => import(/* webpackChunkName: "group-foo" */ './Foo.vue')
const Bar = () => import(/* webpackChunkName: "group-foo" */ './Bar.vue')
const Baz = () => import(/* webpackChunkName: "group-foo" */ './Baz.vue')

const router = new VueRouter({
  routes: [{ path: '/foo', component: Foo }]
})
```

## Navigation Failures

```js
import VueRouter from 'vue-router'
const { isNavigationFailure, NavigationFailureType } = VueRouter

// trying to access the admin page
router.push('/admin').catch(failure => {
  if (isNavigationFailure(failure, NavigationFailureType.redirected)) {
    // show a small notification to the user
    showToast('Login in order to access the admin panel')
  }
})
```
