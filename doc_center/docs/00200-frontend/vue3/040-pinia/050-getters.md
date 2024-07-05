# Getters

Most of the time, getters will only rely on the state, however, they **might need to use other getters**. Because of this, we can get access to the whole store instance through this when defining a regular function **but it is necessary to define the type of the return type (in TypeScript)**. This is due to a known limitation in TypeScript and doesn't affect getters defined with an arrow function nor getters not using this

```ts
export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
  getters: {
    // automatically infers the return type as a number
    doubleCount(state) {
      return state.count * 2
    },
    // the return type **must** be explicitly set
    doublePlusOne(): number {
      // autocompletion and typings for the whole store ✨
      return this.doubleCount + 1
    },
  },
})
```
