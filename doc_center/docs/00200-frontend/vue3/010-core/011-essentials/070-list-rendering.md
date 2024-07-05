# List Rendering

## v-for

In fact, you can use **destructuring** on the v-for item alias similar to destructuring function arguments

```js
<li v-for="item in items">
  {{ item.message }}
</li>

<li v-for="(item, index) in items">
  {{ parentMessage }} - {{ index }} - {{ item.message }}
</li>

<li v-for="item in items">
  <span v-for="childItem in item.children">
    {{ item.message }} {{ childItem }}
  </span>
</li>

<!-- with index alias -->
<li v-for="({ message }, index) in items">
  {{ message }} {{ index }}
</li>
```

## v-for with an Object

```js
<ul>
  <li v-for="value in myObject">
    {{ value }}
  </li>
</ul>

<li v-for="(value, key) in myObject">
  {{ key }}: {{ value }}
</li>
```

## v-for with a Range

Note here n starts with an initial value of `1` instead of 0.

```js
<span v-for="n in 10">{{ n }}</span>
```

## v-for on `<template>`

```js
<ul>
  <template v-for="item in items">
    <li>{{ item.msg }}</li>
    <li class="divider" role="presentation"></li>
  </template>
</ul>
```

## Maintaining State with key

When Vue is updating a list of elements rendered with v-for, by default it uses an "**in-place patch**" strategy

This default mode is efficient, but **only suitable when your list render output does not rely on child component state or temporary DOM state (e.g. form input values)**

It is **recommended** to provide a `key` attribute with `v-for` whenever possible, unless the iterated DOM content is simple

```js
<div v-for="item in items" :key="item.id">
  <!-- content -->
</div>
```

## v-for with a Component

```js
<MyComponent
  v-for="(item, index) in items"
  :item="item"
  :index="index"
  :key="item.id"
/>
```

## Array Change Detection

- push
- pop
- shift
- unshift
- splice
- sort
- reverse

there are also non-mutating methods, e.g. filter(), concat() and slice(), which do not mutate the original array but always **return a new array**.

```js
// `items` is a ref with array value
items.value = items.value.filter((item) => item.message.match(/Foo/))
```
