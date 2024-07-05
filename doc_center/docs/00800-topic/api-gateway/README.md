---
title: API网关介绍
slug: /topic/api-gateway/
---

现在的应用一般都是微服务模式，如果让用户直接访问每个具体服务会
不方便管理，并且有一些通用的功能，比如安全、监控、健壮性等每个
模块都需要，都单独实现会很消耗资源，这时候可以通过在前面架一个
API网关来提供这部分功能，类似Spring Cloud Gateway中的描述。

[spring-cloud-gateway](https://spring.io/projects/spring-cloud-gateway)

>Spring Cloud Gateway aims to provide a simple, yet effective way to route to APIs and provide cross cutting concerns to them such as: security, monitoring/metrics, and resiliency.

同时现在很多应用是SPA类型，需要服务器提供静态文件，所以个人当前建议的部署
方式是在最前面放nginx来提供静态文件服务，https终止，然后在后面放基于Spring
Cloud Gateway实现的API网关，这里可实现用户鉴权，metric收集，路由，retry等功能，
再下层才是具体的微服务模块。

Nginx -> API网关(基于Spring Cloud Gateway) -> 微服务

## Spring Cloud Gateway

见[文档](../../backend/spring/spring-cloud-gateway)

## Amazon API Gateway

[https://aws.amazon.com/api-gateway/](https://aws.amazon.com/api-gateway/)

主要功能包括:
- 多版本API
- 监控：调用次数，延迟，错误率等，Amazon CloudWatch
- 限流：throttle
- 认证：authentication和authorization，比如基于OAuth2
- 缓存：API Gateway Cache
