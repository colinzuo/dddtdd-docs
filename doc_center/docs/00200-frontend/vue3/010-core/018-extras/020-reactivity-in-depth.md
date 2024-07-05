# Reactivity in Depth

## How Reactivity Works in Vue

There are two ways of intercepting property access in JavaScript: [getter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get#description) / [setters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set#description) and [Proxies](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)

In Vue 3, **Proxies are used for reactive objects and getter / setters are used for refs**

```js
function reactive(obj) {
  return new Proxy(obj, {
    get(target, key) {
      track(target, key)
      return target[key]
    },
    set(target, key, value) {
      target[key] = value
      trigger(target, key)
    }
  })
}

function ref(value) {
  const refObject = {
    get value() {
      track(refObject, 'value')
      return value
    },
    set value(newValue) {
      value = newValue
      trigger(refObject, 'value')
    }
  }
  return refObject
}
```

```js
// This will be set right before an effect is about
// to be run. We'll deal with this later.
let activeEffect

function track(target, key) {
  if (activeEffect) {
    const effects = getSubscribersForProperty(target, key)
    effects.add(activeEffect)
  }
}
```

Effect subscriptions are stored in a global `WeakMap<target, Map<key, Set<effect>>>` data structure

```js
function trigger(target, key) {
  const effects = getSubscribersForProperty(target, key)
  effects.forEach((effect) => effect())
}
```

```js
function whenDepsChange(update) {
  const effect = () => {
    activeEffect = effect
    update()
    activeEffect = null
  }
  effect()
}
```

At this point, we have created an effect that automatically tracks its dependencies, and re-runs whenever a dependency changes. We call this a **Reactive Effect**.

Vue provides an API that allows you to create reactive effects: [watchEffect()](https://vuejs.org/api/reactivity-core#watcheffect)

```js
import { ref, watchEffect } from 'vue'

const count = ref(0)

watchEffect(() => {
  document.body.innerHTML = `Count is: ${count.value}`
})

// updates the DOM
count.value++
```
