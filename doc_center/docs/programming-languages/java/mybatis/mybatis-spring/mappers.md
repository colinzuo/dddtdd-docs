---
sidebar_position: 6
---

## Registering a mapper

### With XML Config

```xml
<bean id="userMapper" class="org.mybatis.spring.mapper.MapperFactoryBean">
  <property name="mapperInterface" value="org.mybatis.spring.sample.mapper.UserMapper" />
  <property name="sqlSessionFactory" ref="sqlSessionFactory" />
</bean>
```

If the UserMapper has a corresponding MyBatis XML mapper file in the **same classpath location as the mapper interface**, it will be parsed automatically by the MapperFactoryBean. There is no need to specify the mapper in a MyBatis configuration file unless the mapper XML files are in a different classpath location

### With Java Config

```java
@Configuration
public class MyBatisConfig {
  @Bean
  public MapperFactoryBean<UserMapper> userMapper() throws Exception {
    MapperFactoryBean<UserMapper> factoryBean = new MapperFactoryBean<>(UserMapper.class);
    factoryBean.setSqlSessionFactory(sqlSessionFactory());
    return factoryBean;
  }
}
```

## Scanning for mappers

`<context:component-scan/>` won’t be able to scan and register mappers. Mappers are interfaces and, in order to register them to Spring, the scanner must know how to create a MapperFactoryBean for each interface it finds.

### MapperScan

```java
@Configuration
@MapperScan("org.mybatis.spring.sample.mapper")
public class AppConfig {
  // ...
}
```

