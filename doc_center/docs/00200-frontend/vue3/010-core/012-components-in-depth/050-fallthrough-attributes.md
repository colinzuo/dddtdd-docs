# Fallthrough Attributes

## Attribute Inheritance

A "fallthrough attribute" is an attribute or v-on event listener that is passed to a component, but is **not explicitly declared in the receiving component's props or emits**. Common examples of this include `class`, `style`, and `id` attributes.

When a component renders a single root element, fallthrough attributes will be **automatically added to the root element's attributes**

## Disabling Attribute Inheritance

If you do not want a component to automatically inherit attributes, you can set `inheritAttrs: false` in the component's options

```ts
<script setup>
defineOptions({
  inheritAttrs: false
})
// ...setup logic
</script>
```

These fallthrough attributes can be accessed directly in template expressions as `$attrs`

- Unlike props, fallthrough attributes **preserve their original casing** in JavaScript, so an attribute like foo-bar needs to be accessed as `$attrs['foo-bar']`
- A v-on event listener like `@click` will be exposed on the object as a function under `$attrs.onClick`

```ts
<div class="btn-wrapper">
  <button class="btn" v-bind="$attrs">click me</button>
</div>
```

## Accessing Fallthrough Attributes in JavaScript

```js
<script setup>
import { useAttrs } from 'vue'

const attrs = useAttrs()
</script>
```
