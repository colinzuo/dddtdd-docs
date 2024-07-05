# Class and Style Bindings

## Binding HTML Classes

### Binding to Objects

We can **pass an object** to `:class` (short for `v-bind:class`) to dynamically toggle classes

In addition, the `:class` directive can also **co-exist** with the plain class attribute

```js
<div
  class="static"
  :class="{ active: isActive, 'text-danger': hasError }"
></div>
```

```js
const classObject = reactive({
  active: true,
  'text-danger': false
})

<div :class="classObject"></div>
```

### Binding to Arrays

We can bind `:class` to an **array** to apply a list of classes

```js
const activeClass = ref('active')
const errorClass = ref('text-danger')

<div :class="[activeClass, errorClass]"></div>

<div :class="[isActive ? activeClass : '', errorClass]"></div>

<div :class="[{ active: isActive }, errorClass]"></div>
```

### With Components

When you use the class attribute on a component with a single root element, those classes will be **added to the component's root element**, and **merged** with any existing class already on it.

```html
<!-- MyComponent template using $attrs -->
<p :class="$attrs.class">Hi!</p>
<span>This is a child component</span>


<MyComponent class="baz" />
```

## Binding Inline Styles

### Binding to Objects

Although **camelCase keys are recommended**, `:style` also supports kebab-cased CSS property keys (corresponds to how they are used in actual CSS)

```js
const activeColor = ref('red')
const fontSize = ref(30)

<div :style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>

<div :style="{ 'font-size': fontSize + 'px' }"></div>
```

```js
const styleObject = reactive({
  color: 'red',
  fontSize: '13px'
})

<div :style="styleObject"></div>
```

### Binding to Arrays

We can bind `:style` to an array of multiple style objects. These objects will be merged and applied to the same element

```js
<div :style="[baseStyles, overridingStyles]"></div>
```
