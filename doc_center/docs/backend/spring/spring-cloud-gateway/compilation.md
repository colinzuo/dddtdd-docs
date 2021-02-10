---
title: 编译
---

需要注意的是[Spring Cloud Gateway][]依赖[Spring Cloud Build][]，而[Spring Cloud Build][]里配置了使用checkstyle，
并且这个插件的配置文件是在github上host的，在国内可能会下载失败，如果下载失败它并不报错，但是后面mvn install的时候
会触发checkstyle检查，但是因为对应的suppression文件没下载下来，会导致checkstyle检查失败

另外如果是用master分支，会经常需要与upstream同步，因为依赖项也是snapshot版本，有时会有不兼容的更新，比如某个类的位置
被移动之类的。

## 编译Spring Cloud Build

因为个人有时候会通过虚拟机linux系统开发，但是在windows上编辑对应文件，所以
需要把git的换行设置成linux模式，这个项目里用到了插件spring-javaformat，当前
版本不支持设置换行，而新版本支持，所以个人把这个版本设置成了新的。

```
-               <spring-javaformat.version>0.0.25</spring-javaformat.version>
+               <spring-javaformat.version>0.0.26</spring-javaformat.version>
```

具体编译安装命令如下
```bash
mvn install -s .settings.xml
```

## 编译Spring Cloud Gateway

[Spring Cloud Gateway]: https://spring.io/projects/spring-cloud-gateway
[Spring Cloud Build]: https://github.com/spring-cloud/spring-cloud-build
