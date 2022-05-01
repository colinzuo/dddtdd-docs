
<https://vue-loader.vuejs.org/>

## Introduction

vue-loader is a loader for webpack that allows you to author Vue components in a format called Single-File Components (SFCs)

## Getting Started

vue cli会自动安装

```sh
npm install -D vue-loader vue-template-compiler
```

```js
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  module: {
    rules: [
      // ... other rules
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    // make sure to include the plugin!
    new VueLoaderPlugin()
  ]
}
```

The plugin is required! It is responsible for cloning any other rules you have defined and applying them to the corresponding language blocks in .vue files. For example, if you have a rule matching /\.js$/, it will be applied to `<script>` blocks in .vue files.

## Asset URL Handling

When Vue Loader compiles the `<template>` blocks in SFCs, it also converts any encountered asset URLs into webpack module requests

## Using Pre-Processors

In webpack, all pre-processors need to be applied with a corresponding loader. vue-loader allows you to use other webpack loaders to process a part of a Vue component. It will automatically infer the proper loaders to use based on the lang attribute of a language block and the rules in your webpack config.

```sh
npm install -D sass-loader node-sass

npm install -D postcss-loader

npm install -D babel-core babel-loader
```

## Scoped CSS

- Mixing Local and Global Styles
- Child Component Root Elements

## Hot Reload

When editing the `<template>` of a component, instances of the edited component will re-render in place, preserving all current private state. This is possible because templates are compiled into new render functions that produce no side-effects.

## CSS Extraction

```sh
npm install -D mini-css-extract-plugin
```

## Linting

```js
// .eslintrc.js
module.exports = {
  extends: [
    "plugin:vue/essential"
  ]
}
```

