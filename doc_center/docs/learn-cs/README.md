---
title: 学习CS介绍
---

关于学习Computer Science的个人建议

## 编程语言选择

个人建议java

- 难度适中
- 有许多开源代码可以参考，尤其是spring这个框架，既可以使用，又可以学习代码实现
- 长期看java的工作岗位也比较多

## 工具

### 远程桌面

推荐teamviewer

<https://www.teamviewer.cn/cn/>

可远程连接过来帮助，比如软件运行有问题，可以远程连接帮助调试

### IDE

推荐 IntelliJ IDEA

<https://www.jetbrains.com.cn/en-us/idea/download/#section=windows>

主要特性
- 智能提示: 输入一个变量或函数前几个字母，就会提示完整变量，提高编辑效率
- 支持调试:  开发过程中可以调试对于找问题很有帮助，设置断点，然后查看变量值与预期比较
- 支持重构: 变量或函数命名不合理，可以方便重命名，也可以移动文件位置

### 版本控制

推荐git

<https://git-scm.com/>

版本控制可以保存不同版本，比如编译通过了保存一个版本，功能1完成了保存一个版本，功能2完成
了保存一个版本

同时正在修改中的版本控制工具能告诉你都做了哪些修改

### 代码仓库

推荐github

连接时使用ssh key就不用每次输入密码，使用参照 

<https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent>

### java构建工具

推荐使用maven，比较简单

<https://maven.apache.org/what-is-maven.html>

后面的demo项目使用的是gradle，gradle的基本用法也比较简单

<https://gradle.org/>

### 单元测试

java推荐使用JUnit

<https://junit.org/junit5/docs/current/user-guide/>

### 初期 文档

初期为了入手简单，建议使用 有道云笔记，养成记录总结的习惯

### 长期 文档

长期建议使用基于markdown格式的文档工具，比如 docusaurus

<https://github.com/facebook/docusaurus>

<https://daringfireball.net/projects/markdown/syntax>

## 项目搭建

### demo项目介绍

<https://github.com/colinzuo/data-structures-in-java>

项目是一个含多子项目的gradle工程，目前里头包括4个示例

#### exercise-4

这个示例的特点是有处理外部文件，工程根目录有data文件夹，这个子项目有处理里面的文件

```java
    String processedContent = preprocess.preprocess("data/header1.h");
```

#### exercise-13

这个示例是一个基本的集合，同时使用了JUnit做测试

#### exercise-14

这个示例是一个排序了的集合，同时也是用了JUnit做测试

#### exercise-15

这个示例的特点是有多个源文件，同时使用了**package**管理

```python
package exercise15;

import java.util.Objects;

public class Rectangle {
```

###  新项目创建

- 拷贝demo目录重命名
- 修改settings.gradle
  + rootProject.name 修改为前面给目录起的名字
  + include 为子项目列表，按需配置即可
- 参考demo子项目，拷贝修改

#### 子项目创建示例

因为大的项目肯定会使用packge，所以我们以exercise-15为模板创建

- 拷贝exercise-15，重命名到exercise-15-Copy
- 修改settings.gradle，来include这个子项目
- 删掉老package，比如src/main/java/exercise15目录和src/test/java/exercise15目录
- 创建新package目录，比如src/main/java/exercise15copy目录和src/test/java/exercise15copy目录
- 按实际需要创建源文件，测试文件

