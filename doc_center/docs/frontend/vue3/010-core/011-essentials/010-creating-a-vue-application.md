# Creating a Vue Application

The object we are passing into createApp is in fact a component. Every app requires a "**root component**" that can contain other components as its children.

```ts
import { createApp } from 'vue'
// import the root component App from a single-file component.
import App from './App.vue'

const app = createApp(App)
```

## Mounting the App

An application instance won't render anything until its .mount() method is called. It expects a "**container**" argument, which can either be **an actual DOM element or a selector string**

The content of the app's root component will be rendered inside the container element. The **container element itself is not considered part of the app**

The `.mount()` method should always be called **after all** app configurations and asset registrations are done

```ts
<div id="app"></div>

app.mount('#app')
```

## App Configurations

The application instance exposes a `.config` object that allows us to configure a few app-level options

The application instance also provides a few methods for registering app-scoped assets

```js
app.config.errorHandler = (err) => {
  /* handle error */
}

app.component('TodoDeleteButton', TodoDeleteButton)
```
