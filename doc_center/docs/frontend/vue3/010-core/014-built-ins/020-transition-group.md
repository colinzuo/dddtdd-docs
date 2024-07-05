# TransitionGroup

## Differences from `<Transition>`

- By default, it doesn't render a wrapper element. But you can specify an element to be rendered with the `tag` prop
- Elements inside are always required to have a unique `key` attribute

## Enter / Leave Transitions

```html
<TransitionGroup name="list" tag="ul">
  <li v-for="item in items" :key="item">
    {{ item }}
  </li>
</TransitionGroup>
```

## Move Transitions

The above demo has some obvious flaws: when an item is inserted or removed, its surrounding items instantly "jump" into place instead of moving smoothly

```css
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
```


