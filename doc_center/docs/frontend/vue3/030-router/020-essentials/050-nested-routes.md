# Nested Routes

```js
const routes = [
  {
    path: '/user/:id',
    component: User,
    children: [
      // UserHome will be rendered inside User's <router-view>
      // when /user/:id is matched
      { path: '', component: UserHome },

      {
        // UserProfile will be rendered inside User's <router-view>
        // when /user/:id/profile is matched
        path: 'profile',
        component: UserProfile,
      },
      {
        // UserPosts will be rendered inside User's <router-view>
        // when /user/:id/posts is matched
        path: 'posts',
        component: UserPosts,
      },
    ],
  },
]
```
