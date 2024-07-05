# Conditional Rendering

## v-if

```js
<h1 v-if="awesome">Vue is awesome!</h1>
```

## v-else

```js
<button @click="awesome = !awesome">Toggle</button>

<h1 v-if="awesome">Vue is awesome!</h1>
<h1 v-else>Oh no 😢</h1>
```

## v-else-if

```js
<div v-if="type === 'A'">
  A
</div>
<div v-else-if="type === 'B'">
  B
</div>
<div v-else-if="type === 'C'">
  C
</div>
<div v-else>
  Not A/B/C
</div>
```

## v-if on `<template>`

```js
<template v-if="ok">
  <h1>Title</h1>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</template>
```

## v-show

`v-show` only toggles the display CSS property of the element.

`v-show` doesn't support the `<template>` element, nor does it work with `v-else`
