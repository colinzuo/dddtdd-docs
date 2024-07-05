# Routes' Matching Syntax

## Custom regex in params

```js
const routes = [
  // /:orderId -> matches only numbers
  { path: '/:orderId(\\d+)' },
  // /:productName -> matches anything else
  { path: '/:productName' },
]
```

Now, going to `/25` will match `/:orderId` while going to anything else will match `/:productName`. The **order of the routes array doesn't even matter**!

## Repeatable params

```js
const routes = [
  // /:chapters -> matches /one, /one/two, /one/two/three, etc
  { path: '/:chapters+' },
  // /:chapters -> matches /, /one, /one/two, /one/two/three, etc
  { path: '/:chapters*' },
]
```

```js
// given { path: '/:chapters*', name: 'chapters' },
router.resolve({ name: 'chapters', params: { chapters: [] } }).href
// produces /
router.resolve({ name: 'chapters', params: { chapters: ['a', 'b'] } }).href
// produces /a/b

// given { path: '/:chapters+', name: 'chapters' },
router.resolve({ name: 'chapters', params: { chapters: [] } }).href
// throws an Error because `chapters` is empty
```

## Sensitive and strict route options

By default, all routes are **case-insensitive** and match routes **with or without a trailing slash**
