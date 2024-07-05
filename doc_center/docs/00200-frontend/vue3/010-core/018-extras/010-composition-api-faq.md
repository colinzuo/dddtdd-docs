# Composition API FAQ

## What is Composition API?

It is an umbrella term that covers the following APIs

- [Reactivity API](https://vuejs.org/api/reactivity-core), e.g. `ref()` and `reactive()`
- [Lifecycle Hooks](https://vuejs.org/api/composition-api-lifecycle), e.g. `onMounted()` and `onUnmounted()`
- [Dependency Injection](https://vuejs.org/api/composition-api-dependency-injection.html), i.e. `provide()` and `inject()`

## Why Composition API?

### Better Logic Reuse

The primary advantage of Composition API is that it enables clean, efficient logic reuse in the form of Composable functions.

[https://vueuse.org/](https://vueuse.org/)

### More Flexible Code Organization

code related to the same logical concern can now be grouped together

### Better Type Inference

Composition API utilizes mostly plain variables and functions, which are naturally type friendly


