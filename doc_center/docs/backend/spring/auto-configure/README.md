---
title: Auto Configure介绍
slug: /backend/spring/auto-configure/
---

## OnWebApplicationCondition

### isServletWebApplication

- org.springframework.web.context.support.GenericWebApplicationContext: 首先检查
这个class是否存在
- ConfigurableWebEnvironment: 然后检查Environment是否是这个class的实例
- WebApplicationContext: 然后检查ResourceLoader是否是这个class的实例

### isReactiveWebApplication

- org.springframework.web.reactive.HandlerResult： 首先检查这个class是否存在
- ConfigurableReactiveWebEnvironment：然后检查Environment是否是这个class的实例
- ReactiveWebApplicationContext：然后检查ResourceLoader是否是这个class的实例