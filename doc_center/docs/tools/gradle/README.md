---
title: Gradle介绍
slug: /tools/gradle/
---

## 过滤测试

<https://docs.gradle.org/current/userguide/java_testing.html#simple_name_pattern>

```bash
# Executes all tests in SomeTestClass
gradle test --tests SomeTestClass

# Executes a single specified test in SomeTestClass
gradle test --tests SomeTestClass.someSpecificMethod

gradle test --tests SomeTestClass.*someMethod*
```