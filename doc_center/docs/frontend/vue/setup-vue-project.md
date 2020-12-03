---
title: 搭建Vue工程
---

## 使用vue cli创建工程

[Vue Cli][]

```
vue create proj-name
```

## 参照vue-admin-template修改

[vue-admin-template][]

+ 添加.editorconfig
  vscode会按照这个配置做格式化
+ 配置.eslintrc.js
  相对vue cli生成的版本，[vue-admin-template]的增加了很多rules
+ 配置babel.config.js
  在development环境下使用dynamic-import-node插件，将动态import改为静态require
+ 添加jsconfig.json
  当有这个文件时vscode会将对应目录认定为js项目
+ 修改package.json
  - 添加script脚本svgo，用于svg优化
  - 添加dependencies，axios用于rest请求，element-ui用于ui component，path-to-regexp用于在breadcrumb组件中生成完整路由
  - 添加devDependencies，autoprefixer用于多浏览器适配添加浏览器相关前缀，babel-plugin-dynamic-import-node和前面babel配置中对应，svg-sprite-loader用于将svg文件打包成sprite，svgo用于svg优化去掉一些comment之类
  - 添加browserslist，设置支持的浏览器列表，babel编译时会对照生成响应polyfill
  - 添加engines，node版本要求
+ 修改public/index.html，支持在vue.config.js中配置title
+ 拷贝组件，Breadcrumb，Hamburger，SvgIcon
+ 拷贝icons目录，icons/svg目录为用到的图标svg文件，可按需添加，[vue-admin-template]有对应文档
+ 修改src/main.js，import ElementUI，全局css @/styles/index.scss，图标@/icons， 配置使用ElementUI
+ 添加src/settings.js，做为全局配置文件
+ 添加src/styles/，全局css styles
+ 添加src/utils/validate.js，SvgIcon有使用其中isExternal函数
+ 添加vue.config.js，配置publicPath，监听port，webpack alias，svg-sprite-loader，webpack打包等

[Vue Cli]: https://cli.vuejs.org/
[vue-admin-template]: https://github.com/PanJiaChen/vue-admin-template
