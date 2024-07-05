# Event Handling

## Listening to Events

## Inline Handlers

```ts
<button @click="count++">Add 1</button>
<p>Count is: {{ count }}</p>
```

## Method Handlers

```js
<!-- `greet` is the name of the method defined above -->
<button @click="greet">Greet</button>
```

## Calling Methods in Inline Handlers

```js
<button @click="say('hello')">Say hello</button>
<button @click="say('bye')">Say bye</button>
```

## Accessing Event Argument in Inline Handlers

```js
<!-- using $event special variable -->
<button @click="warn('Form cannot be submitted yet.', $event)">
  Submit
</button>

<!-- using inline arrow function -->
<button @click="(event) => warn('Form cannot be submitted yet.', event)">
  Submit
</button>
```

## Event Modifiers

- .stop
- .prevent
- .self
- .capture
- .once
- .passive

```html
<!-- the click event's propagation will be stopped -->
<a @click.stop="doThis"></a>

<!-- the submit event will no longer reload the page -->
<form @submit.prevent="onSubmit"></form>

<!-- modifiers can be chained -->
<a @click.stop.prevent="doThat"></a>

<!-- just the modifier -->
<form @submit.prevent></form>

<!-- only trigger handler if event.target is the element itself -->
<!-- i.e. not from a child element -->
<div @click.self="doThat">...</div>
```

```html
<!-- use capture mode when adding the event listener     -->
<!-- i.e. an event targeting an inner element is handled -->
<!-- here before being handled by that element           -->
<div @click.capture="doThis">...</div>

<!-- the click event will be triggered at most once -->
<a @click.once="doThis"></a>

<!-- the scroll event's default behavior (scrolling) will happen -->
<!-- immediately, instead of waiting for `onScroll` to complete  -->
<!-- in case it contains `event.preventDefault()`                -->
<div @scroll.passive="onScroll">...</div>
```

## Key Modifiers

```html
<!-- only call `submit` when the `key` is `Enter` -->
<input @keyup.enter="submit" />

<input @keyup.page-down="onPageDown" />
```
