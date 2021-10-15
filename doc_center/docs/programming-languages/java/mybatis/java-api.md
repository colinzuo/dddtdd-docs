---
sidebar_position: 5
---

## SqlSessions

When using MyBatis with a dependency injection framework like **Spring** or Guice, SqlSessions are created and injected by the DI framework so you don't need to use the SqlSessionFactoryBuilder or SqlSessionFactory and can go directly to the SqlSession section

### SqlSessionFactoryBuilder

```java
SqlSessionFactory build(InputStream inputStream)
SqlSessionFactory build(InputStream inputStream, String environment)
SqlSessionFactory build(InputStream inputStream, Properties properties)
SqlSessionFactory build(InputStream inputStream, String env, Properties props)
SqlSessionFactory build(Configuration config)

String resource = "org/mybatis/builder/mybatis-config.xml";
InputStream inputStream = Resources.getResourceAsStream(resource);
SqlSessionFactoryBuilder builder = new SqlSessionFactoryBuilder();
SqlSessionFactory factory = builder.build(inputStream);
```

## SqlSessionFactory

- Transaction: Do you want to use a transaction scope for the session, or use auto-commit (usually means no transaction with most databases and/or JDBC drivers)?
- Connection: Do you want MyBatis to acquire a Connection from the configured DataSource for you, or do you want to provide your own?
- Execution: Do you want MyBatis to reuse PreparedStatements and/or batch updates (including inserts and deletes)?

```java
SqlSession openSession()
SqlSession openSession(boolean autoCommit)
SqlSession openSession(Connection connection)
SqlSession openSession(TransactionIsolationLevel level)
SqlSession openSession(ExecutorType execType, TransactionIsolationLevel level)
SqlSession openSession(ExecutorType execType)
SqlSession openSession(ExecutorType execType, boolean autoCommit)
SqlSession openSession(ExecutorType execType, Connection connection)
Configuration getConfiguration();
```

The default openSession() method that takes no parameters will create a SqlSession with the following characteristics:
- A transaction scope will be started (i.e. NOT auto-commit).
- A Connection object will be acquired from the DataSource instance configured by the active environment.
- The transaction isolation level will be the default used by the driver or data source.
- No PreparedStatements will be reused, and no updates will be batched.

MyBatis uses a Java enumeration wrapper for transaction isolation levels, called TransactionIsolationLevel, but otherwise they work as expected and have the 5 levels supported by JDBC **(NONE, READ_UNCOMMITTED, READ_COMMITTED, REPEATABLE_READ, SERIALIZABLE)**.

The one parameter that might be new to you is ExecutorType. This enumeration defines 3 values:

- ExecutorType.SIMPLE: This type of executor does nothing special. It creates a new PreparedStatement for each execution of a statement.
- ExecutorType.REUSE: This type of executor will reuse PreparedStatements.
- ExecutorType.BATCH: This executor will batch all update statements and demarcate them as necessary if SELECTs are executed between them, to ensure an easy-to-understand behavior

## SqlSession

### Statement Execution Methods

These methods are used to execute SELECT, INSERT, UPDATE and DELETE statements that are defined in your SQL Mapping XML files. They are pretty self explanatory, each takes the ID of the statement and the Parameter Object, which can be a primitive (auto-boxed or wrapper), a JavaBean, a POJO or a Map

```java
<T> T selectOne(String statement, Object parameter)
<E> List<E> selectList(String statement, Object parameter)
<T> Cursor<T> selectCursor(String statement, Object parameter)
<K,V> Map<K,V> selectMap(String statement, Object parameter, String mapKey)
int insert(String statement, Object parameter)
int update(String statement, Object parameter)
int delete(String statement, Object parameter)
```

Different drivers are able to achieve different levels of efficiency in this regard. For the best performance, use result set types of SCROLL_SENSITIVE or SCROLL_INSENSITIVE (in other words: not FORWARD_ONLY).

### Batch update statement Flush Method

```java
List<BatchResult> flushStatements()
```

### Transaction Control Methods

```java
void commit()
void commit(boolean force)
void rollback()
void rollback(boolean force)
```

By default MyBatis does not actually commit unless it detects that the database has been changed by a call to insert, update or delete. If you've somehow made changes without calling these methods, then you can pass true into the commit and rollback methods to guarantee that they will be committed

### Local Cache

MyBatis uses two caches: a local cache and a second level cache

Each time a new session is created MyBatis creates a local cache and attaches it to the session. Any query executed within the session will be stored in the local cache so further executions of the same query with the same input parameters will not hit the database. The local cache is cleared upon update, commit, rollback and close.

### Ensuring that SqlSession is Closed

```java
void close()

try (SqlSession session = sqlSessionFactory.openSession()) {
    // following 3 lines are pseudocode for "doing some work"
    session.insert(...);
    session.update(...);
    session.delete(...);
    session.commit();
}
```

### Using Mappers

A Mapper class is simply an interface with method definitions that match up against the SqlSession methods

```java
<T> T getMapper(Class<T> type)

public interface AuthorMapper {
  // (Author) selectOne("selectAuthor", 5);
  Author selectAuthor(int id);

  // (List<Author>) selectList("selectAuthors")
  List<Author> selectAuthors();

  // (Map<Integer,Author>) selectMap("selectAuthors", "id")
  @MapKey("id")
  Map<Integer, Author> selectAuthors();

  // insert("insertAuthor", author)
  int insertAuthor(Author author);

  // update("updateAuthor", author)
  int updateAuthor(Author author);

  // delete("deleteAuthor", 5)
  int deleteAuthor(int id);
}
```

In a nutshell, each Mapper method signature should match that of the SqlSession method that it's associated to, but without the String parameter ID. Instead, **the method name must match the mapped statement ID**.

In addition, the return type must match that of the expected result type for single results or an array or collection for multiple results or Cursor. All of the usual types are supported, including: Primitives, Maps, POJOs and JavaBeans

You can pass multiple parameters to a mapper method. If you do, they will be named by the literal "param" followed by their position in the parameter list by default, for example: **#{param1}, #{param2}** etc. If you wish to change the name of the parameters (multiple only), then you can use the **@Param("paramName")** annotation on the parameter.

You can also pass a RowBounds instance to the method to limit query results

### Mapper Annotations

MyBatis 3 builds on top of a comprehensive and powerful **Java based Configuration API**. This Configuration API is the foundation for the **XML based** MyBatis configuration, as well as the new **annotation-based** configuration

You will notice that **join mapping is not supported via the Annotations API**. This is due to the limitation in Java Annotations that does not allow for circular references

It's important to understand that **with Java Annotations, there is no way to specify null as a value**. Therefore, once you engage the Options annotation, your statement is subject to all of the default values

#### XxxProvider

Allows for creation of dynamic SQL. These alternative SQL annotations allow you to specify **a class and a method name** that will return the SQL to run at execution time

#### Mapper Annotation Examples

```java
@Insert("insert into table3 (id, name) values(#{nameId}, #{name})")
@SelectKey(statement="call next value for TestSequence", keyProperty="nameId", before=true, resultType=int.class)
int insertTable3(Name name);

@Insert("insert into table2 (name) values(#{name})")
@SelectKey(statement="call identity()", keyProperty="nameId", before=false, resultType=int.class)
int insertTable2(Name name);

@Flush
List<BatchResult> flush();
```
```java
@Results(id = "userResult", value = {
  @Result(property = "id", column = "uid", id = true),
  @Result(property = "firstName", column = "first_name"),
  @Result(property = "lastName", column = "last_name")
})
@Select("select * from users where id = #{id}")
User getUserById(Integer id);

@Results(id = "companyResults")
@ConstructorArgs({
  @Arg(column = "cid", javaType = Integer.class, id = true),
  @Arg(column = "name", javaType = String.class)
})
@Select("select * from company where id = #{id}")
Company getCompanyById(Integer id);
```

```java
@SelectProvider(type = UserSqlBuilder.class, method = "buildGetUsersByName")
List<User> getUsersByName(String name);

class UserSqlBuilder {
  public static String buildGetUsersByName(final String name) {
    return new SQL(){{
      SELECT("*");
      FROM("users");
      if (name != null) {
        WHERE("name like #{value} || '%'");
      }
      ORDER_BY("id");
    }}.toString();
  }
}
```

```java
@SelectProvider(type = UserSqlBuilder.class, method = "buildGetUsersByName")
List<User> getUsersByName(
    @Param("name") String name, @Param("orderByColumn") String orderByColumn);

class UserSqlBuilder {

  // If not use @Param, you should be define same arguments with mapper method
  public static String buildGetUsersByName(
      final String name, final String orderByColumn) {
    return new SQL(){{
      SELECT("*");
      FROM("users");
      WHERE("name like #{name} || '%'");
      ORDER_BY(orderByColumn);
    }}.toString();
  }

  // If use @Param, you can define only arguments to be used
  public static String buildGetUsersByName(@Param("orderByColumn") final String orderByColumn) {
    return new SQL(){{
      SELECT("*");
      FROM("users");
      WHERE("name like #{name} || '%'");
      ORDER_BY(orderByColumn);
    }}.toString();
  }
}
```

```java
@Select(value = "SELECT SYS_GUID() FROM dual", databaseId = "oracle") // Use this statement if DatabaseIdProvider provide "oracle"
@Select(value = "SELECT uuid_generate_v4()", databaseId = "postgres") // Use this statement if DatabaseIdProvider provide "postgres"
@Select("SELECT RANDOM_UUID()") // Use this statement if the DatabaseIdProvider not configured or not matches databaseId
String generateId();
```
