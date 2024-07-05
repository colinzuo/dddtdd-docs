# Props

Vue components require **explicit props** declaration so that Vue knows what external props passed to the component should be treated as **fallthrough attributes**

## Prop Passing Details

### Prop Name Casing

We declare long prop names using camelCase because this avoids having to use quotes when using them as property keys, and allows us to reference them directly in template expressions because they are valid JavaScript identifiers

```js
defineProps({
  greetingMessage: String
})

<span>{{ greetingMessage }}</span>
```

the convention is using kebab-case in all cases to align with HTML attributes

```js
<MyComponent greeting-message="hello" />
```

### Binding Multiple Properties Using an Object

If you want to pass all the properties of an object as props, you can use `v-bind` without an argument

```js
const post = {
  id: 1,
  title: 'My Journey with Vue'
}

<BlogPost v-bind="post" />
```

## Prop Validation

```js
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
  // Required but nullable string
  propD: {
    type: [String, null],
    required: true
  },
  // Number with a default value
  propE: {
    type: Number,
    default: 100
  },
  // Object with a default value
  propF: {
    type: Object,
    // Object or array defaults must be returned from
    // a factory function. The function receives the raw
    // props received by the component as the argument.
    default(rawProps) {
      return { message: 'hello' }
    }
  },
  // Custom validator function
  // full props passed as 2nd argument in 3.4+
  propG: {
    validator(value, props) {
      // The value must match one of these strings
      return ['success', 'warning', 'danger'].includes(value)
    }
  },
  // Function with a default value
  propH: {
    type: Function,
    // Unlike object or array default, this is not a factory
    // function - this is a function to serve as a default value
    default() {
      return 'Default function'
    }
  }
})
```

- An absent optional prop other than Boolean will have undefined value
- The Boolean absent props will be cast to false
