---
title: Spring Cloud Gateway介绍
slug: /backend/spring/spring-cloud-gateway/
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

## 培训视频

[Spring Cloud Gateway for Stateless Microservice Authorization](https://www.youtube.com/watch?v=RRMO4oNptoQ)


[Spring Cloud Gateway]: https://spring.io/projects/spring-cloud-gateway
