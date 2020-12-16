---
title: Spring Boot Actuator
---

## Liveness and Readiness探针
[Spring Boot Actuator][]中提供了适用于kubernetes环境下Liveness Probe和
Readiness Probe的机制，具体可参考[Spring Boot Actuator][] Application Availability章节

## 程序信息
[Spring Boot Actuator][]提供了GitInfoContributor和BuildInfoContributor，分别用来
提供git信息，比如commit id，时间，提供build信息，比如gradle中配置的版本号等，并
通过http对外提供rest接口，具体可参考[Spring Boot Actuator][] Application Information章节

## Metric
[Spring Boot Actuator][]通过micrometer对外提供metric信息，具体可参考
[Spring Boot Actuator][] Metrics章节

[Spring Boot Actuator]: https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#production-ready
