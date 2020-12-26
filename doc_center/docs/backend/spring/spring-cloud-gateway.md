---
title: Spring Cloud Gateway
---

## 参考链接
[官方项目地址][Spring Cloud Gateway]  
[官方文档](https://cloud.spring.io/spring-cloud-gateway/reference/html/)  
[上手指南](https://spring.io/guides/gs/gateway/)

## 与Nginx对比
和Nginx很不同的是[Spring Cloud Gateway][]是基于java的，并且本身
提供了predicate机制来做request路由，提供了filter机器来修改request
或者response，所以非常容易做定制化。

示例如下，其中**path**是一个predicate，意思是匹配路径/get的request，
**filters**里addRequestHeader是一个修改request的filter，这个filter
添加了一个key为Hello值为World的header，hystrix是一个circuit breaker
类型的filter，当远端出错比如超时时提供fallback方案，这里是forward到一个
本地endpoint。
```java
@Bean
public RouteLocator myRoutes(RouteLocatorBuilder builder) {
    return builder.routes()
        .route(p -> p
            .path("/get")
            .filters(f -> f.addRequestHeader("Hello", "World"))
            .uri("http://httpbin.org:80"))
        .route(p -> p
            .host("*.hystrix.com")
            .filters(f -> f.hystrix(config -> config
                .setName("mycmd")
                .setFallbackUri("forward:/fallback")))
            .uri("http://httpbin.org:80"))
        .build();
}
```

## 编译

需要注意的是[Spring Cloud Gateway][]依赖[Spring Cloud Build][]，而[Spring Cloud Build][]里配置了使用checkstyle，
并且这个插件的配置文件是在github上host的，在国内可能会下载失败，如果下载失败它并不报错，但是后面mvn install的时候
会触发checkstyle检查，但是因为对应的suppression文件没下载下来，会导致checkstyle检查失败

另外如果是用master分支，会经常需要与upstream同步，因为依赖项也是snapshot版本，有时会有不兼容的更新，比如某个类的位置
被移动之类的。


[Spring Cloud Gateway]: https://spring.io/projects/spring-cloud-gateway
[Spring Cloud Build]: https://github.com/spring-cloud/spring-cloud-build
