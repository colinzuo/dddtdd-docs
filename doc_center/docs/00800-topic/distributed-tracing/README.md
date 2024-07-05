---
title: 分布式tracing介绍
slug: /topic/distributed-tracing/
---

在分布式系统中一个业务请求通常由多个微服务模块协同完全，单纯从
log来定位问题不方便，分布式tracing通过给入口请求分配一个唯一的
reqId，然后给每一段处理分配一个spanId，并在入口通过制定sample算法
决定这个reqId是否收集，如果收集后面所有模块都把对应span数据传递
给distributed tracing服务器，然后在那里就可以单纯按时间浏览，或者
按指定reqId搜索来查看整个业务请求链路，常见的需求包括请求是否报错，
处理时间等，有的框架还支持绑定一些更细节的数据，可以按需求绑定。
