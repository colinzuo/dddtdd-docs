# Rendering Mechanism

## Virtual DOM

```js
const vnode = {
  type: 'div',
  props: {
    id: 'hello'
  },
  children: [
    /* more vnodes */
  ]
}
```

A runtime renderer can walk a virtual DOM tree and construct a real DOM tree from it. This process is called **mount**

If we have two copies of virtual DOM trees, the renderer can also walk and compare the two trees, figuring out the differences, and apply those changes to the actual DOM. This process is called **patch**, also known as "diffing" or "reconciliation"

The **main benefit** of virtual DOM is that it gives the developer the ability to programmatically create, inspect and compose desired UI structures **in a declarative way**, while leaving the direct DOM manipulation to the renderer

## Render Pipeline

- Compile: Vue templates are compiled into **render functions**: functions that return virtual DOM trees
- Mount: The runtime renderer invokes the render functions, walks the returned virtual DOM tree, and creates actual DOM nodes based on it. This step is performed as a **reactive effect**, so it keeps track of all reactive dependencies that were used
- Patch: When a dependency used during mount changes, the effect re-runs. This time, a new, updated Virtual DOM tree is created. **The runtime renderer walks the new tree, compares it with the old one**, and applies necessary updates to the actual DOM

## Compiler-Informed Virtual DOM

In Vue, the framework controls both the compiler and the runtime. This allows us to implement many compile-time optimizations that only a tightly-coupled renderer can take advantage of. The compiler can statically analyze the template and leave hints in the generated code so that the runtime can take shortcuts whenever possible. At the same time, we still preserve the capability for the user to drop down to the render function layer for more direct control in edge cases. We call this hybrid approach **Compiler-Informed Virtual DOM**


