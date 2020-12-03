---
title: 打包大小
---

## Create react app


初始安装后调用yarn build

```
File sizes after gzip:

  41.21 KB  build\static\js\2.94a5539a.chunk.js
  1.4 KB    build\static\js\3.abbeb53d.chunk.js
  1.17 KB   build\static\js\runtime-main.be6d1f25.js
  600 B     build\static\js\main.8217f176.chunk.js
  546 B     build\static\css\main.ab7136cd.chunk.css

```

添加storybook示例代码后

```
File sizes after gzip:

  46.91 KB  build\static\js\2.b031f079.chunk.js
  3.67 KB   build\static\css\main.76793e28.chunk.css
  1.41 KB   build\static\js\3.33d01bbb.chunk.js
  1.35 KB   build\static\js\main.d01dd3b1.chunk.js
  1.18 KB   build\static\js\runtime-main.b931983d.js
```

yarn analyze给出的结果是，压缩前总大小158.48KB

+ react-dom: 116.1 KB
+ react-redux: 10.56 KB
+ react: 6.46 KB
+ scheduler: 4.29 KB
+ redux: 3.27 KB

storybook引入的示例代码大小如下

+ TaskList: 1.35 KB
+ Task: 800 B
+ InboxScreen: 678 B
+ lib/redux: 625 B

添加antd，并引入官方快速上手上的示例后

```
File sizes after gzip:

  142.67 KB (+95.76 KB)  build\static\js\2.605baf63.chunk.js
  64.64 KB               build\static\css\2.617c3bb8.chunk.css
  3.67 KB (-1 B)         build\static\css\main.7256cea5.chunk.css
  1.64 KB (+293 B)       build\static\js\main.e89d89ac.chunk.js
  1.41 KB (+2 B)         build\static\js\3.a25414be.chunk.js
  1.18 KB                build\static\js\runtime-main.95932ccb.js

```

yarn analyze给出的结果是，压缩前总大小480.37KB

+ react-dom: 116.1 KB
+ moment: 61.01 KB
+ rc-picker: 53.96 KB
+ antd: 37.32 KB
+ rc-field-form: 28.7 KB
+ @ant-design: 20.35 KB
+ rc-trigger: 15.63 KB
+ tinycolor: 14.26 KB
+ rc-util: 12.79 KB
+ react-redux: 10.33 KB
+ @babel: 9.98 KB
+ rc-motion: 8.56 KB
+ ResizeObserver: 7.47 KB
+ react: 6.46 KB
+ regenerator-runtime/runtime.js: 6.26 KB
+ rc-notification: 4.95 KB
+ scheduler: 4.29 KB
+ redux: 3.27 KB
