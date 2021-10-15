---
sidebar_position: 5
---

SqlSessionTemplate is the heart of MyBatis-Spring. It **implements SqlSession** and is meant to be a drop-in replacement for any existing use of SqlSession in your code. SqlSessionTemplate is thread safe and can be shared by multiple DAOs or mappers

When calling SQL methods, including any method from Mappers returned by getMapper(), SqlSessionTemplate will ensure that the SqlSession used is the one associated with the current Spring transaction. In addition, it manages the session life-cycle, including closing, committing or rolling back the session as necessary. It will also translate MyBatis exceptions into Spring DataAccessExceptions.

SqlSessionTemplate should always be used instead of default MyBatis implementation DefaultSqlSession because the template can participate in Spring transactions and is thread safe for use by multiple injected mapper classes. Switching between the two classes in the same application can cause data integrity issues.

```java
@Configuration
public class MyBatisConfig {
  @Bean
  public SqlSessionTemplate sqlSession() throws Exception {
    return new SqlSessionTemplate(sqlSessionFactory());
  }
}
```
