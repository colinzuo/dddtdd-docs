# Components Basics

## Using a Component

Although native HTML tag names are case-insensitive, **Vue SFC is a compiled format so we are able to use case-sensitive tag names** in it. We are also able to use `/>` to close a tag

## Passing Props

Props are **custom attributes** you can register on a component. To pass a title to our blog post component, we must declare it in the list of props this component accepts, using the `defineProps` macro

`defineProps` is a compile-time macro that is only available inside `<script setup>` and does not need to be explicitly imported. Declared props are automatically exposed to the template

`defineProps` also returns an object that contains all the props passed to the component, so that we can access them in JavaScript if needed

```js
const props = defineProps(['title'])
console.log(props.title)
```

## Listening to Events

```js
<BlogPost
  ...
  @enlarge-text="postFontSize += 0.1"
 />

<!-- BlogPost.vue, omitting <script> -->
<template>
  <div class="blog-post">
    <h4>{{ title }}</h4>
    <button @click="$emit('enlarge-text')">Enlarge text</button>
  </div>
</template> 
```

We can optionally declare emitted events using the `defineEmits` macro

It returns an emit function that is equivalent to the $emit method. It can be used to emit events in the `<script setup>` section of a component, where `$emit` isn't directly accessible

```js
<script setup>
const emit = defineEmits(['enlarge-text'])

emit('enlarge-text')
</script>
```

## Content Distribution with Slots

```js
<AlertBox>
  Something bad happened.
</AlertBox>

<!-- AlertBox.vue -->
<template>
  <div class="alert-box">
    <strong>This is an Error for Demo Purposes</strong>
    <slot />
  </div>
</template>

<style scoped>
.alert-box {
  /* ... */
}
</style>
```

## Dynamic Components

```js
<!-- Component changes when currentTab changes -->
<component :is="tabs[currentTab]"></component>
```

When switching between multiple components with `<component :is="...">`, a component will be unmounted when it is switched away from. We can force the inactive components to stay "alive" with the built-in `<KeepAlive>` component
