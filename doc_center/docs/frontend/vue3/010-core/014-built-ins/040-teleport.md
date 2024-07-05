# Teleport

`<Teleport>` is a built-in component that allows us to "teleport" a part of a component's template into a DOM node that **exists outside the DOM hierarchy of that component**

## Basic Usage

The most common example of this is when building a full-screen modal

- `position: fixed` only places the element relative to the viewport when no ancestor element has transform, perspective or filter property set

```html
<button @click="open = true">Open Modal</button>

<Teleport to="body">
  <div v-if="open" class="modal">
    <p>Hello from the modal!</p>
    <button @click="open = false">Close</button>
  </div>
</Teleport>
```
