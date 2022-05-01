
<https://cli.vuejs.org/guide/>

## Overview

- Interactive project scaffolding via `@vue/cli`.
- A runtime dependency (`@vue/cli-service`) that is:
  - Upgradeable;
  - Built on top of webpack, with sensible defaults;
  - Configurable via in-project config file;
  - Extensible via plugins
- A rich collection of official plugins integrating the best tools in the frontend ecosystem.
- A full graphical user interface to create and manage Vue.js projects.

### Components of the System

- CLI
- CLI Service
- CLI Plugins

## Installation

```bash
npm install -g @vue/cli

vue --version

npm update -g @vue/cli

vue upgrade [plugin-name]
```

## Creating a Project

```sh
vue create hello-world
```

## Plugins and Presets

Plugins can modify the internal webpack configuration and inject commands to vue-cli-service

```sh
vue add eslint
```

A Vue CLI preset is a JSON object that contains pre-defined options and plugins for creating a new project so that the user doesn't have to go through the prompts to select them.

## CLI Service

```sh
npm run serve
```

- vue-cli-service serve
- vue-cli-service build
- vue-cli-service inspect
- Git Hooks

## Browser Compatibility

You will notice a browserslist field in package.json (or a separate .browserslistrc file) specifying a range of browsers the project is targeting

- Modern Mode

## HTML and Static Assets

### HTML

The file public/index.html is a template that will be processed with html-webpack-plugin. During build, asset links will be injected automatically. In addition, Vue CLI also automatically injects resource hints (preload/prefetch), manifest/icon links (when PWA plugin is used), and the asset links for the JavaScript and CSS files produced during the build

### Static Assets Handling

## Working with CSS

- Referencing Assets
- Pre-Processors
- PostCSS
- CSS Modules
- Passing Options to Pre-Processor Loaders

```sh
npm install -D sass-loader@^10 sass
```

## Working with Webpack

- Simple Configuration
- Chaining (Advanced)
- Inspecting the Project's Webpack Config
- Using Resolved Config as a File

Inside the function, you can either mutate the config directly, OR return an object which will be merged

```js
module.exports = {
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // mutate config for production...
    } else {
      // mutate for development...
    }
  }
}
```

```js
module.exports = {
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
        .tap(options => {
          // modify the options...
          return options
        })
  }
}
```

## Modes and Environment Variables

Note that only NODE_ENV, BASE_URL, and variables that start with VUE_APP_ will be statically embedded into the client bundle with webpack.DefinePlugin

## Build Targets

## Deployment


