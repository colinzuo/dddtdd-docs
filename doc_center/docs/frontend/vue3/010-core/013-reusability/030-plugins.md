# Plugins

## Introduction

A plugin is defined as either an object that **exposes an install() method**, or simply a function that acts as the install function itself

```js
const myPlugin = {
  install(app, options) {
    // configure the app
  }
}
```

## Writing a Plugin

```js
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

```js
import i18nPlugin from './plugins/i18n'

app.use(i18nPlugin, {
  greetings: {
    hello: 'Bonjour!'
  }
})
```
