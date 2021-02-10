---
title: 学习笔记介绍
slug: /backend/spring/spring-cloud-gateway/study-note/
---

## pom.xml

### parent
parent是[spring-cloud-build][]，从那里继承了依赖库的版本，比如spring boot的版本等，
还有一些配置项，比如plugin用到的一些配置

例如
```
<spring-boot.version>2.4.2-SNAPSHOT</spring-boot.version>
<spring-cloud-build.version>3.0.1-SNAPSHOT</spring-cloud-build.version>

<spring-javaformat.version>0.0.26</spring-javaformat.version>

<javadoc.failOnError>false</javadoc.failOnError>
```

### properties
定义了项目用到的一些库的版本，比如blockhound，junit-pioneer, spring-cloud-circuitbreaker，spring-cloud-commons, testcontainers等

```
<blockhound.version>1.0.4.RELEASE</blockhound.version>
<junit-pioneer.version>1.0.0</junit-pioneer.version>
<spring-cloud-circuitbreaker.version>2.0.1-SNAPSHOT</spring-cloud-circuitbreaker.version>
<spring-cloud-commons.version>3.0.1-SNAPSHOT</spring-cloud-commons.version>
<testcontainers.version>1.15.1</testcontainers.version>
```

### dependencyManagement
- spring-cloud-gateway-dependencies: 子项目
- spring-cloud-commons-dependencies: [spring-cloud-commons][]子项目
- spring-cloud-test-support: [spring-cloud-commons][]子项目
- spring-cloud-circuitbreaker-dependencies: [spring-cloud-circuitbreaker][]子项目
- spring-cloud-starter-circuitbreaker-reactor-resilience4j: [spring-cloud-circuitbreaker][]子项目
- spring-boot-devtools: [spring-boot][]子项目
- blockhound-junit-platform: [blockhound][]子项目
- junit-pioneer: [junit-pioneer][]
- testcontainers-bom: [testcontainers][]

### modules
- spring-cloud-gateway-dependencies
- spring-cloud-gateway-mvc
- spring-cloud-gateway-webflux
- spring-cloud-gateway-server
- spring-cloud-starter-gateway
- spring-cloud-gateway-sample
- docs

[spring-cloud-build]: https://github.com/spring-cloud/spring-cloud-build
[spring-cloud-commons]: https://github.com/spring-cloud/spring-cloud-commons
[spring-cloud-circuitbreaker]: https://github.com/spring-cloud/spring-cloud-circuitbreaker
[spring-boot]: https://github.com/spring-projects/spring-boot
[blockhound]: https://github.com/reactor/BlockHound
[junit-pioneer]: https://github.com/junit-pioneer/junit-pioneer
[testcontainers]: https://github.com/testcontainers/testcontainers-java
