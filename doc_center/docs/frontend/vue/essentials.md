
## Installation

<https://cli.vuejs.org/guide/>

## The Vue Instance

- Creating a Vue Instance
- Data and Methods
- Instance Lifecycle Hooks
- Lifecycle Diagram

In addition to data properties, Vue instances expose a number of useful instance properties and methods. These are prefixed with $ to differentiate them from user-defined properties

## Template Syntax

- Interpolations
- Directives
- Shorthands

## Computed Properties and Watchers

- Computed Properties
- Watchers

## Class and Style Bindings

- Binding HTML Classes
- Binding Inline Styles

## Conditional Rendering

- v-if
- v-show
- v-if vs v-show
- v-if with v-for

## List Rendering

- Mapping an Array to Elements with v-for
- v-for with an Object
- Maintaining State
- Array Change Detection
- Displaying Filtered/Sorted Results
- v-for with a Range
- v-for on a `<template>`
- v-for with v-if
- v-for with a Component

## Event Handling

- Listening to Events
- Method Event Handlers
- Methods in Inline Handlers
- Event Modifiers
- Key Modifiers
- System Modifier Keys
- Why Listeners in HTML?

## Form Input Bindings

- Basic Usage
- Value Bindings
- Modifiers
- v-model with Components

## Components Basics

- Base Example
- Reusing Components
- Organizing Components
- Passing Data to Child Components with Props
- A Single Root Element
- Listening to Child Components Events
- Content Distribution with Slots
- Dynamic Components
- DOM Template Parsing Caveats

## Component Registration

- Component Names
- Global Registration
- Local Registration
- Module Systems

## Props

- Prop Casing (camelCase vs kebab-case)
- Prop Types
- Passing Static or Dynamic Props
- One-Way Data Flow
- Prop Validation
- Non-Prop Attributes

While explicitly defined props are preferred for passing information to a child component, authors of component libraries can’t always foresee the contexts in which their components might be used. That’s why components can accept arbitrary attributes, which are added to the component’s root element.

If you do not want the root element of a component to inherit attributes, you can set inheritAttrs: false in the component’s options

With inheritAttrs: false and $attrs, you can manually decide which element you want to forward attributes to, which is often desirable for base components

## Custom Events

- Event Names
- Customizing Component v-model
- Binding Native Events to Components
- .sync Modifier

Vue provides a $listeners property containing an object of listeners being used on the component

Using the $listeners property, you can forward all event listeners on the component to a specific child element with v-on="$listeners"

## Slots

- Slot Content
- Compilation Scope
- Fallback Content
- Named Slots
- Scoped Slots
- Dynamic Slot Names
- Named Slots Shorthand

```vue
<base-layout>
  <template v-slot:header>
    <h1>Here might be a page title</h1>
  </template>

  <p>A paragraph for the main content.</p>
  <p>And another one.</p>

  <template v-slot:footer>
    <p>Here's some contact info</p>
  </template>
</base-layout>
```

```vue
<span>
  <slot v-bind:user="user">
    {{ user.lastName }}
  </slot>
</span>

<current-user>
  <template v-slot:default="slotProps">
    {{ slotProps.user.firstName }}
  </template>
</current-user>

<current-user v-slot="slotProps">
  {{ slotProps.user.firstName }}
</current-user>
```

## Dynamic & Async Components

- keep-alive with Dynamic Components
- Async Components

## Handling Edge Cases

- Element & Component Access
- Programmatic Event Listeners
- Circular References
- Alternate Template Definitions
- Controlling Updates

```js
provide: function () {
  return {
    getMap: this.getMap
  }
}

inject: ['getMap']
```

## Enter/Leave & List Transitions

- Transitioning Single Elements/Components
- Transitions on Initial Render
- Transitioning Between Elements
- Transitioning Between Components
- List Transitions
- Reusable Transitions
- Dynamic Transitions

```vue
<transition name="fade">
  <p v-if="show">hello</p>
</transition>

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
```

## State Transitions

- Animating State with Watchers
- Dynamic State Transitions
- Organizing Transitions into Components
- Bringing Designs to Life

## Mixins

- Basics
- Option Merging
- Global Mixin
- Custom Option Merge Strategies

When a component uses a mixin, all options in the mixin will be “mixed” into the component’s own options.

## Custom Directives

- Intro
- Hook Functions
- Directive Hook Arguments
- Function Shorthand
- Object Literals

there may be cases where you need some low-level DOM access on plain elements, and this is where custom directives would still be useful

```js
Vue.directive('focus', {
  // When the bound element is inserted into the DOM...
  inserted: function (el) {
    // Focus the element
    el.focus()
  }
})
```

## Render Functions & JSX

- Basics
- Nodes, Trees, and the Virtual DOM
- createElement Arguments
- Replacing Template Features with Plain JavaScript
- JSX
- Template Compilation

```js
  render: function (createElement) {
    return createElement(
      'h' + this.level,   // tag name
      this.$slots.default // array of children
    )
  },
```

## Plugins

- Using a Plugin
- Writing a Plugin

```js
MyPlugin.install = function (Vue, options) {
  // 1. add global method or property
  Vue.myGlobalMethod = function () {
    // some logic ...
  }

  // 2. add a global asset
  Vue.directive('my-directive', {
    bind (el, binding, vnode, oldVnode) {
      // some logic ...
    }
    ...
  })

  // 3. inject some component options
  Vue.mixin({
    created: function () {
      // some logic ...
    }
    ...
  })

  // 4. add an instance method
  Vue.prototype.$myMethod = function (methodOptions) {
    // some logic ...
  }
}
```

## Filters

## Single File Components

## Testing

## State Management

Vuex is different in that it knows it’s in a Vue app. This allows it to better integrate with Vue, offering a more intuitive API and improved development experience.

## Reactivity in Depth

When you pass a plain JavaScript object to a Vue instance as its data option, Vue will walk through all of its properties and convert them to getter/setters using Object.defineProperty. 

Every component instance has a corresponding watcher instance, which records any properties “touched” during the component’s render as dependencies. Later on when a dependency’s setter is triggered, it notifies the watcher, which in turn causes the component to re-render.

```js
methods: {
  updateMessage: async function () {
    this.message = 'updated'
    console.log(this.$el.textContent) // => 'not updated'
    await this.$nextTick()
    console.log(this.$el.textContent) // => 'updated'
  }
}
```
