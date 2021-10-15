---
sidebar_position: 8
---

With MyBatis-Spring, you can continue to **directly use the MyBatis API**. Simply create an SqlSessionFactory in Spring using SqlSessionFactoryBean and use the factory in your code.

```java
public class UserDaoImpl implements UserDao {
  // SqlSessionFactory would normally be set by SqlSessionDaoSupport
  private final SqlSessionFactory sqlSessionFactory;

  public UserDaoImpl(SqlSessionFactory sqlSessionFactory) {
    this.sqlSessionFactory = sqlSessionFactory;
  }

  public User getUser(String userId) {
    // note standard MyBatis API usage - opening and closing the session manually
    try (SqlSession session = sqlSessionFactory.openSession()) {
      return session.selectOne("org.mybatis.spring.sample.mapper.UserMapper.getUser", userId);
    }
  }
}
```

Be aware of the following caveats with direct API usage:

- It will not participate in any Spring transactions.
- If the SqlSession is using a DataSource that is also being used by a Spring transaction manager and there is currently a transaction in progress, this code will throw an exception.
- MyBatis’ DefaultSqlSession is not thread safe. If you inject it in your beans you will get errors.
- Mappers created using DefaultSqlSession are not thread safe either. If you inject them it in your beans you will get errors.
- You must make sure that your SqlSessions are always closed in a finally block.
