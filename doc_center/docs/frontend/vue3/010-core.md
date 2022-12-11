
## introduction

### API Styles

- Options API

With Options API, we define a component's logic using an object of **options such as data, methods, and mounted**

- Composition API

With Composition API, we define a component's logic using **imported API functions**.

In SFCs, Composition API is typically used with `<script setup>`. The **setup attribute is a hint** that makes Vue perform **compile-time transforms** that allow us to use Composition API with less boilerplate. For example, imports and top-level variables / functions declared in `<script setup>` are directly usable in the template.

## Creating a Vue Application

The object we are passing into createApp is in fact a component. Every app requires a "**root component**" that can contain other components as its children.

```ts
import { createApp } from 'vue'
// import the root component App from a single-file component.
import App from './App.vue'

const app = createApp(App)
```

An application instance won't render anything until its .mount() method is called. It expects a "**container**" argument, which can either be **an actual DOM element or a selector string**

```ts
<div id="app"></div>

app.mount('#app')
```

## Template Syntax

```ts
<p>Using text interpolation: {{ rawHtml }}</p>
<p>Using v-html directive: <span v-html="rawHtml"></span></p>

<div v-bind:id="dynamicId"></div>
<div :id="dynamicId"></div>
```

- Dynamically Binding Multiple Attributes

```ts
<div v-bind="objectOfAttrs"></div>
```

- Using JavaScript Expressions

```ts
{{ number + 1 }}

{{ ok ? 'YES' : 'NO' }}

{{ message.split('').reverse().join('') }}

<div :id="`list-${id}`"></div>

<span :title="toTitleDate(date)">
  {{ formatDate(date) }}
</span>
```

### Directives

Some directives can take an "argument", denoted by a colon after the directive name.

Modifiers are special **postfixes denoted by a dot**, which indicate that a directive should be bound in some special way. 

```ts
<p v-if="seen">Now you see me</p>

<a v-bind:href="url"> ... </a>

<a v-bind:[attributeName]="url"> ... </a>

<form @submit.prevent="onSubmit">...</form>
```

## Reactivity Fundamentals

Reactive objects are **JavaScript Proxies** and behave just like normal objects


```ts
import { reactive } from 'vue'

const state = reactive({ count: 0 })
```

To use reactive state in a component's template, declare and return them from a component's setup() function

```ts
<button @click="increment">
  {{ state.count }}
</button>

import { reactive } from 'vue'

export default {
  setup() {
    const state = reactive({ count: 0 })

    function increment() {
      state.count++
    }

    // don't forget to expose the function as well.
    return {
      state,
      increment
    }
  }
}
```

Manually exposing state and methods via setup() can be verbose. Luckily, it is **only necessary when not using a build step.**

```vue
<script setup>
import { reactive } from 'vue'

const state = reactive({ count: 0 })

function increment() {
  state.count++
}
</script>

<template>
  <button @click="increment">
    {{ state.count }}
  </button>
</template>
```

```ts
import { nextTick } from 'vue'

function increment() {
  state.count++
  nextTick(() => {
    // access updated DOM
  })
}
```

### Reactive Variables with ref()

Vue also provides a ref() function which allows us to create reactive "refs" that can hold **any value type**

Similar to properties on a reactive object, the **.value property of a ref is reactive**. In addition, when holding object types, ref **automatically converts its .value with reactive()**

When refs are accessed as top-level properties in the template, they are **automatically "unwrapped"** so there is no need to use .value

Note that the unwrapping **only applies if the ref is a top-level property** on the template render context.

```ts
import { ref } from 'vue'

const count = ref(0)

console.log(count) // { value: 0 }
console.log(count.value) // 0

count.value++
console.log(count.value) // 1
```

### Ref Unwrapping in Reactive Objects

When a ref is accessed or mutated as a property of a reactive object, it is also **automatically unwrapped** so it behaves like a normal property

```ts
const count = ref(0)
const state = reactive({
  count
})

console.log(state.count) // 0

state.count = 1
console.log(count.value) // 1
```

## Computed Properties

The computed() function expects to be passed a getter function, and the returned value is a **computed ref**. Similar to normal refs, you can access the computed result as publishedBooksMessage.value. Computed refs are also **auto-unwrapped in templates** so you can reference them without .value in template expressions

A computed property automatically tracks its reactive dependencies

**computed properties are cached based on their reactive dependencies**

```ts
<script setup>
import { reactive, computed } from 'vue'

const author = reactive({
  name: 'John Doe',
  books: [
    'Vue 2 - Advanced Guide',
    'Vue 3 - Basic Guide',
    'Vue 4 - The Mystery'
  ]
})

// a computed ref
const publishedBooksMessage = computed(() => {
  return author.books.length > 0 ? 'Yes' : 'No'
})
</script>

<template>
  <p>Has published books:</p>
  <span>{{ publishedBooksMessage }}</span>
</template>
```

## Class and Style Bindings

We can **pass an object** to :class (short for v-bind:class) to dynamically toggle classes:

In addition, the :class directive can also **co-exist** with the plain class attribute

```ts
<div
  class="static"
  :class="{ active: isActive, 'text-danger': hasError }"
></div>
```

```ts
const classObject = reactive({
  active: true,
  'text-danger': false
})

<div :class="classObject"></div>
```

We can bind :class to an **array** to apply a list of classes

```ts
<div :class="[activeClass, errorClass]"></div>

<div :class="[isActive ? activeClass : '', errorClass]"></div>

<div :class="[{ active: isActive }, errorClass]"></div>
```

When you use the class attribute on a component with a single root element, those classes will be **added to the component's root element**, and merged with any existing class already on it.

```ts
<!-- MyComponent template using $attrs -->
<p :class="$attrs.class">Hi!</p>
<span>This is a child component</span>


<MyComponent class="baz" />
```

### Binding Inline Styles

Although **camelCase keys are recommended**, :style also supports kebab-cased CSS property keys (corresponds to how they are used in actual CSS)

```ts
<div :style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>

<div :style="{ 'font-size': fontSize + 'px' }"></div>
```

```ts
const styleObject = reactive({
  color: 'red',
  fontSize: '13px'
})

<div :style="styleObject"></div>
```

We can bind :style to an array of multiple style objects. These objects will be merged and applied to the same element

## List Rendering

```ts
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

<li v-for="(value, key) in myObject">
  {{ key }}: {{ value }}
</li>

<span v-for="n in 10">{{ n }}</span>

<ul>
  <template v-for="item in items">
    <li>{{ item.msg }}</li>
    <li class="divider" role="presentation"></li>
  </template>
</ul>

<div v-for="item in items" :key="item.id">
  <!-- content -->
</div>
```

### Array Change Detection

- push
- pop
- shift
- unshift
- splice
- sort
- reverse

there are also non-mutating methods, e.g. filter(), concat() and slice(), which do not mutate the original array but always **return a new array**.

```ts
// `items` is a ref with array value
items.value = items.value.filter((item) => item.message.match(/Foo/))
```

## Event Handling

```ts
<button @click="count++">Add 1</button>
<p>Count is: {{ count }}</p>

<!-- `greet` is the name of the method defined above -->
<button @click="greet">Greet</button>

<button @click="say('hello')">Say hello</button>
<button @click="say('bye')">Say bye</button>

<!-- using $event special variable -->
<button @click="warn('Form cannot be submitted yet.', $event)">
  Submit
</button>

<!-- using inline arrow function -->
<button @click="(event) => warn('Form cannot be submitted yet.', event)">
  Submit
</button>
```

### Event Modifiers

- .stop
- .prevent
- .self
- .capture
- .once
- .passive

```ts
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

### Key Modifiers

```ts
<!-- only call `submit` when the `key` is `Enter` -->
<input @keyup.enter="submit" />

<input @keyup.page-down="onPageDown" />
```

## Form Input Bindings

```ts
<input
  :value="text"
  @input="event => text = event.target.value">

<input v-model="text">

<textarea v-model="text"></textarea>

<input type="checkbox" id="checkbox" v-model="checked" />

<input type="radio" id="one" value="One" v-model="picked" />
<input type="radio" id="two" value="Two" v-model="picked" />

<select v-model="selected">
  <option disabled value="">Please select one</option>
  <option>A</option>
  <option>B</option>
  <option>C</option>
</select>

<select v-model="selected">
  <option v-for="option in options" :value="option.value">
    {{ option.text }}
  </option>
</select>
```

## Lifecycle Hooks

```ts
<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  console.log(`the component is now mounted.`)
})
</script>
```

### Lifecycle Diagram

- setup (Composition API)
- created
- beforeMount
- mounted
- beforeUpdate
- updated
- beforeUnmount
- unmounted

## Watchers

watch's first argument can be different types of reactive "sources": it can be a ref (including computed refs), a reactive object, a getter function, or an array of multiple sources

```ts
<script setup>
import { ref, watch } from 'vue'

const question = ref('')
const answer = ref('Questions usually contain a question mark. ;-)')

// watch works directly on a ref
watch(question, async (newQuestion, oldQuestion) => {
  if (newQuestion.indexOf('?') > -1) {
    answer.value = 'Thinking...'
    try {
      const res = await fetch('https://yesno.wtf/api')
      answer.value = (await res.json()).answer
    } catch (error) {
      answer.value = 'Error! Could not reach the API. ' + error
    }
  }
})
</script>

<template>
  <p>
    Ask a yes/no question:
    <input v-model="question" />
  </p>
  <p>{{ answer }}</p>
</template>
```

### Deep Watchers

When you call watch() directly on a reactive object, it will **implicitly create a deep watcher** - the callback will be triggered on all nested mutations

```ts
const obj = reactive({ count: 0 })

watch(obj, (newValue, oldValue) => {
  // fires on nested property mutations
  // Note: `newValue` will be equal to `oldValue` here
  // because they both point to the same object!
})

obj.count++
```

```ts
watch(
  () => state.someObject,
  (newValue, oldValue) => {
    // Note: `newValue` will be equal to `oldValue` here
    // *unless* state.someObject has been replaced
  },
  { deep: true }
)
```

### watchEffect()

watch() is lazy: the callback won't be called until the watched source has changed

watchEffect() allows us to perform a side effect immediately while automatically tracking the effect's reactive dependencies

```ts
watchEffect(async () => {
  const response = await fetch(url.value)
  data.value = await response.json()
})
```

- watch only tracks the explicitly watched source
- automatically tracks every reactive property accessed during its synchronous execution

## Template Refs

### Accessing the Refs

```ts
<script setup>
import { ref, onMounted } from 'vue'

// declare a ref to hold the element reference
// the name must match template ref value
const input = ref(null)

onMounted(() => {
  input.value.focus()
})
</script>

<template>
  <input ref="input" />
</template>
```

## Components Basics

defineProps is a compile-time macro that is only available inside `<script setup>` and does not need to be explicitly imported. Declared props are automatically exposed to the template

```ts
const props = defineProps(['title'])
console.log(props.title)
```

```ts
<script setup>
const emit = defineEmits(['enlarge-text'])

emit('enlarge-text')
</script>
```

```ts
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

## Component Registration

```ts
import MyComponent from './App.vue'

app.component('MyComponent', MyComponent)
```

When using SFC with `<script setup>`, imported components can be locally used without registration

```ts
<script setup>
import ComponentA from './ComponentA.vue'
</script>

<template>
  <ComponentA />
</template>
```

Luckily, Vue supports **resolving kebab-case tags to components registered using PascalCase**. This means a component registered as MyComponent can be referenced in the template via both `<MyComponent>` and `<my-component>`

## Props

the convention is using kebab-case in all cases to align with HTML attributes

```ts
defineProps({
  // Basic type check
  //  (`null` and `undefined` values will allow any type)
  propA: Number,
  // Multiple possible types
  propB: [String, Number],
  // Required string
  propC: {
    type: String,
    required: true
  },
  // Number with a default value
  propD: {
    type: Number,
    default: 100
  },
  // Object with a default value
  propE: {
    type: Object,
    // Object or array defaults must be returned from
    // a factory function. The function receives the raw
    // props received by the component as the argument.
    default(rawProps) {
      return { message: 'hello' }
    }
  },
  // Custom validator function
  propF: {
    validator(value) {
      // The value must match one of these strings
      return ['success', 'warning', 'danger'].includes(value)
    }
  },
  // Function with a default value
  propG: {
    type: Function,
    // Unlike object or array default, this is not a factory function - this is a function to serve as a default value
    default() {
      return 'Default function'
    }
  }
})
```

- An absent optional prop other than Boolean will have undefined value
- The Boolean absent props will be cast to false

## Component Events

```ts
<script setup lang="ts">
const emit = defineEmits<{
  (e: 'change', id: number): void
  (e: 'update', value: string): void
}>()
</script>
```

### Events Validation

```ts
<script setup>
const emit = defineEmits({
  // No validation
  click: null,

  // Validate submit event
  submit: ({ email, password }) => {
    if (email && password) {
      return true
    } else {
      console.warn('Invalid submit event payload!')
      return false
    }
  }
})

function submitForm(email, password) {
  emit('submit', { email, password })
}
</script>
```

### Usage with v-model

```ts
<input v-model="searchText" />

<input
  :value="searchText"
  @input="searchText = $event.target.value"
/>

<CustomInput
  :modelValue="searchText"
  @update:modelValue="newValue => searchText = newValue"
/>

<UserName
  v-model:first-name="first"
  v-model:last-name="last"
/>
```

## Fallthrough Attributes

A "fallthrough attribute" is an attribute or v-on event listener that is passed to a component, but is **not explicitly declared in the receiving component's props or emits**. Common examples of this include class, style, and id attributes.

When a component renders a single root element, fallthrough attributes will be **automatically added to the root element's attributes**

### Disabling Attribute Inheritance

If using `<script setup>`, you will need to declare this option using a **separate**, normal `<script>` block

```ts
<script>
// use normal <script> to declare options
export default {
  inheritAttrs: false
}
</script>

<script setup>
// ...setup logic
</script>
```

- Unlike props, fallthrough attributes **preserve their original casing** in JavaScript, so an attribute like foo-bar needs to be accessed as `$attrs['foo-bar']`

```ts
<div class="btn-wrapper">
  <button class="btn" v-bind="$attrs">click me</button>
</div>
```

## Slots

The `<slot>` element is a slot outlet that indicates where the parent-provided slot content should be rendered

### Fallback Content

```ts
<button type="submit">
  <slot>
    Submit <!-- fallback content -->
  </slot>
</button>
```

### Named Slots

```ts
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
```

```ts
<BaseLayout>
  <template #header>
    <h1>Here might be a page title</h1>
  </template>

  <template #default>
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>
  </template>

  <template #footer>
    <p>Here's some contact info</p>
  </template>
</BaseLayout>
```

### Scoped Slots

```ts
<!-- <MyComponent> template -->
<div>
  <slot :text="greetingMessage" :count="1"></slot>
</div>


<MyComponent v-slot="{ text, count }">
  {{ text }} {{ count }}
</MyComponent>

<MyComponent>
  <template #header="headerProps">
    {{ headerProps }}
  </template>

  <template #default="defaultProps">
    {{ defaultProps }}
  </template>

  <template #footer="footerProps">
    {{ footerProps }}
  </template>
</MyComponent>
```

## Provide / Inject

The first argument is called the injection key, which can be **a string or a Symbol**

```ts
<script setup>
import { provide } from 'vue'

provide(/* key */ 'message', /* value */ 'hello!')
</script>
```

The second argument is the provided value. The value can be of **any type, including reactive state** such as refs

```ts
import { ref, provide } from 'vue'

const count = ref(0)
provide('key', count)
```

### App-level Provide

```ts
import { createApp } from 'vue'

const app = createApp({})

app.provide(/* key */ 'message', /* value */ 'hello!')
```

### Inject

```ts
<script setup>
import { inject } from 'vue'

const message = inject('message')
</script>
```

```ts
// `value` will be "default value"
// if no data matching "message" was provided
const value = inject('message', 'default value')

const value = inject('key', () => new ExpensiveClass())
```

### Working with Symbol Keys

```ts
// keys.js
export const myInjectionKey = Symbol()

// in provider component
import { provide } from 'vue'
import { myInjectionKey } from './keys.js'

provide(myInjectionKey, {
  /* data to provide */
})

// in injector component
import { inject } from 'vue'
import { myInjectionKey } from './keys.js'

const injected = inject(myInjectionKey)
```

## Composables

In the context of Vue applications, a "composable" is a function that leverages Vue's Composition API to **encapsulate and reuse stateful logic**.

```ts
// event.js
import { onMounted, onUnmounted } from 'vue'

export function useEventListener(target, event, callback) {
  // if you want, you can also make this
  // support selector strings as target
  onMounted(() => target.addEventListener(event, callback))
  onUnmounted(() => target.removeEventListener(event, callback))
}

// mouse.js
import { ref } from 'vue'
import { useEventListener } from './event'

export function useMouse() {
  const x = ref(0)
  const y = ref(0)

  useEventListener(window, 'mousemove', (event) => {
    x.value = event.pageX
    y.value = event.pageY
  })

  return { x, y }
}
```

```ts
<script setup>
import { useMouse } from './mouse.js'

const { x, y } = useMouse()
</script>

<template>Mouse position is at: {{ x }}, {{ y }}</template>
```

### Async State Example

```ts
// fetch.js
import { ref, isRef, unref, watchEffect } from 'vue'

export function useFetch(url) {
  const data = ref(null)
  const error = ref(null)

  function doFetch() {
    // reset state before fetching..
    data.value = null
    error.value = null
    // unref() unwraps potential refs
    fetch(unref(url))
      .then((res) => res.json())
      .then((json) => (data.value = json))
      .catch((err) => (error.value = err))
  }

  if (isRef(url)) {
    // setup reactive re-fetch if input URL is a ref
    watchEffect(doFetch)
  } else {
    // otherwise, just fetch once
    // and avoid the overhead of a watcher
    doFetch()
  }

  return { data, error }
}
```

The **recommended convention** is for composables to always return a plain, non-reactive object containing multiple refs

```ts
// x and y are refs
const { x, y } = useMouse()
```

## Custom Directives

A custom directive is defined as an object **containing lifecycle hooks** similar to those of a component. The hooks **receive the element** the directive is bound to

In `<script setup>`, any camelCase variable that **starts with the v prefix** can be used as a custom directive

```ts
<script setup>
// enables v-focus in templates
const vFocus = {
  mounted: (el) => el.focus()
}
</script>

<template>
  <input v-focus />
</template>
```

```ts
const app = createApp({})

// make v-focus usable in all components
app.directive('focus', {
  /* ... */
})
```

## Plugins

A plugin is defined as either an object that **exposes an install() method**, or simply a function that acts as the install function itself

```ts
// plugins/i18n.js
export default {
  install: (app, options) => {
    // inject a globally available $translate() method
    app.config.globalProperties.$translate = (key) => {
      // retrieve a nested property in `options`
      // using `key` as the path
      return key.split('.').reduce((o, i) => {
        if (o) return o[i]
      }, options)
    }
  }
}
```

```ts
import i18nPlugin from './plugins/i18n'

app.use(i18nPlugin, {
  greetings: {
    hello: 'Bonjour!'
  }
})
```

## Using Vue with TypeScript

To use TypeScript in SFCs, add the lang="ts" attribute to `<script>` tags. **When lang="ts" is present, all template expressions also enjoy stricter type checking**

```ts
<script setup lang="ts">
let x: string | number = 1
</script>

<template>
  {{ (x as number).toFixed(2) }}
</template>
```

## TypeScript with Composition API

```ts
<script setup lang="ts">
const props = defineProps({
  foo: { type: String, required: true },
  bar: Number
})

props.foo // string
props.bar // number | undefined
</script>
```

### Typing Component Emits

```ts
<script setup lang="ts">
// runtime
const emit = defineEmits(['change', 'update'])

// type-based
const emit = defineEmits<{
  (e: 'change', id: number): void
  (e: 'update', value: string): void
}>()
</script>
```

The type argument should be a **type literal** with Call Signatures.

### Typing ref()

```ts
import { ref } from 'vue'
import type { Ref } from 'vue'

const year: Ref<string | number> = ref('2020')

year.value = 2020 // ok!
```

```ts
// resulting type: Ref<string | number>
const year = ref<string | number>('2020')

year.value = 2020 // ok!
```

### Typing Template Refs

```ts
<script setup lang="ts">
import { ref, onMounted } from 'vue'

const el = ref<HTMLInputElement | null>(null)

onMounted(() => {
  el.value?.focus()
})
</script>

<template>
  <input ref="el" />
</template>
```

## Composition API FAQ

- [Reactivity API](https://vuejs.org/api/reactivity-core.html)
- [Lifecycle Hooks](https://vuejs.org/api/composition-api-lifecycle.html)
- [Dependency Injection](https://vuejs.org/api/composition-api-dependency-injection.html)

<https://vueuse.org/>


