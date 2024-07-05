# Getting Started

## Overview

It consists of two major parts

- A **dev server** that provides rich feature enhancements over native ES modules, for example extremely fast Hot Module Replacement (HMR).
- A **build command** that bundles your code with **Rollup**

## Scaffolding Your First Vite Project

```bash
npm create vite@latest my-vue-app -- --template vue
```

## index.html and Project Root

One thing you may have noticed is that in a Vite project, `index.html` is front-and-central instead of being tucked away inside public. 

Vite treats index.html as source code and part of the module graph. It resolves `<script type="module" src="...">` that references your JavaScript source code.

URLs inside index.html are automatically rebased so there's no need for special `%PUBLIC_URL%` placeholders
