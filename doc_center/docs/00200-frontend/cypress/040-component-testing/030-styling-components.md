# Styling Components

## What you'll learn

- How to load CSS libraries like Tailwind or Bootstrap
- How to render icon fonts like Font Awesome
- Where to import your application's global stylesheets
- How to use indexHtmlFile to define a custom DOM mounting point

## Component Support File

When you load a component or end-to-end spec file, it will **first load something called a supportFile**. By default, this is created for you during first-time setup of Cypress Component Testing and is located at `cypress/support/component.js`

For component specs, you use this file to set up **page-level concerns** that would usually exist by the time you mount the component. Some examples include:

- **Run-time JavaScript code** (state management, routers, UI libraries)
- **Global styles** (style resets, Tailwind)

## Why Test Your Component's Styles?

**JSDom doesn't have a box model and** certain kinds of assertions, such as if a parent is covering a child and preventing clicks, are not possible to test without a more realistic environment.

On the other hand, browser-based runners like Cypress allow you to render your application's styles and components and allow Cypress's Driver to take advantage of the real box-model and style rendering engine

## Importing Stylesheets

We'll go over a few methods and describe how you can quickly restructure your components to **become more testable**

## Rules for Setting Up Your Styles

We expose two hooks for you to configure your styles:

- An HTML file called `cypress/support/component-index.html`
- A JavaScript support file called `cypress/support/component.js`

When creating a production-like test environment, you should always mimic your own application's setup. If your application has multiple `<link>` tags to load fonts or other stylesheets within the head, ensure that the `cypress/support/component-index.html` file contains the same `<link>` tags. The same logic follows for any styles loaded in your Application's `main.js` file. If you import a `./styles.css` at the top of your `main.js` file, make sure to import it in your `cypress/support/component.js` file

For this reason, it's **strongly suggested** to make a `src/setup.js` file that will be re-used in your `main.js` entrypoint as well as in your test setup. An example project structure would look like so

```
> /cypress
>   /support
>    /component.js
> /src
>  /main.js
>  /main.css
>  /setup.js
```

The contents of `setup.js` may look like so

```js
import '~normalize/normalize.css'
import 'font-awesome'
import './main.css'

export const createStore = () => {
  return /* store */
}

export const createRouter = () => {
  return /* router */
}

export const createApp = () => {
  return <App router={createRouter()} store={createStore()}></App>
}
```

### Global App Styles

Your global application styles are usually in one of the following places:

- A `styles.css` file you import within the head of your application
- Within a root-level component like App.jsx, `App.vue`, App.svelte, etc

Decouple your Root CSS from your App or Entrypoint component by pulling out these global styles into a top-level stylesheet

```ts
/* App.vue */ <style src="./app.css" />

/* cypress/support/component.js */ import '../../src/app.css'
```

- Within the `main.js` file of your application (which subsequently mounts your root-level component)
