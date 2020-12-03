---
title: create-react-app
---

## 入门指引
[getting-started](https://create-react-app.dev/docs/getting-started)

```
npx create-react-app create-react-app-template --template typescript
```

Create React App分为两部分，create-react-app被用来创建新工程，而react-scripts则是开发依赖，也就是说已有工程升级只需关心react-scripts。

[updating-to-new-releases](https://create-react-app.dev/docs/updating-to-new-releases)

```
Create React App is divided into two packages:

create-react-app is a global command-line utility that you use to create new projects.
react-scripts is a development dependency in the generated projects (including this one).
```

```
In most cases bumping the react-scripts version in package.json and running npm install (or yarn install) in this folder should be enough, but it’s good to consult the changelog for potential breaking changes
```

## 开发

[setting-up-your-editor](https://create-react-app.dev/docs/setting-up-your-editor)

他这里推荐使用prettier来规范代码样式

```
If you want to enforce a coding style for your project, consider using Prettier instead of ESLint style rules
```

文档给出了如何扩展ESLint设置

文档给出了如何使用Visual Studio Code进行调试，包括安装VS Code Chrome Debugger Extension，配置launch.json等

文档给出了如何安装prettier依赖包和如何配置

```
yarn add husky lint-staged prettier
```

## 测试

[jest](https://jestjs.io/)

[react-testing-library](https://testing-library.com/docs/react-testing-library/intro/)

```
Focusing and Excluding Tests

You can replace it() with xit() to temporarily exclude a test from being executed.

Similarly, fit() lets you focus on a specific test without running any other tests.
```
