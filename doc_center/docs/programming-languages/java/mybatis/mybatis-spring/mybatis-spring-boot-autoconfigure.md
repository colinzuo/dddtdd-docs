---
sidebar_position: 7
---

## Installation

```xml
<dependency>
    <groupId>org.mybatis.spring.boot</groupId>
    <artifactId>mybatis-spring-boot-starter</artifactId>
    <version>2.2.0</version>
</dependency>
```

## Quick Setup

MyBatis-Spring-Boot-Starter will:

- Autodetect an existing DataSource
- Will create and register an instance of a SqlSessionFactory passing that DataSource as an input using the SqlSessionFactoryBean
- Will create and register an instance of a SqlSessionTemplate got out of the SqlSessionFactory
- Auto-scan your mappers, link them to the SqlSessionTemplate and register them to Spring context so they can be injected into your beans

## Configuration

```yaml
# application.yml
mybatis:
    type-aliases-package: com.example.domain.model
    type-handlers-package: com.example.typehandler
    configuration:
        map-underscore-to-camel-case: true
        default-fetch-size: 100
        default-statement-timeout: 30
...
```

## Detecting MyBatis components

The MyBatis-Spring-Boot-Starter will detects
- Interceptor
- TypeHandler
- LanguageDriver (Requires to use together with mybatis-spring 2.0.2+)
- DatabaseIdProvider

```java
@Configuration
public class MyBatisConfig {
  @Bean
  MyInterceptor myInterceptor() {
    return MyInterceptor();
  }
  @Bean
  MyTypeHandler myTypeHandler() {
    return MyTypeHandler();
  }
  @Bean
  MyLanguageDriver myLanguageDriver() {
    return MyLanguageDriver();
  }
  @Bean
  VendorDatabaseIdProvider databaseIdProvider() {
    VendorDatabaseIdProvider databaseIdProvider = new VendorDatabaseIdProvider();
    Properties properties = new Properties();
    properties.put("SQL Server", "sqlserver");
    properties.put("DB2", "db2");
    properties.put("H2", "h2");
    databaseIdProvider.setProperties(properties);
    return databaseIdProvider;
  }  
}
```
