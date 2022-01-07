
## 函数级测试

函数无依赖，给定输入有确定输出，比如

```java
  @Test
	@Order(20)
	public void simpleAdd() {
		// given
		int a = 2;
		int b = 3;

		// when
		int c = a + b;

		// then
		assertThat(c).isEqualTo(5);
	}
```

## 有少量外部调用

### 外部调用仅通过少量服务接口

可以对接口类做mock来测试，比如

```java
  // given
  ISomeService someService = spy(userClient.getSomeService());
  userClient.setSomeService(someService);

  ServiceResponse rsp = ****;

  doReturn(rsp).when(someService).serviceMethod(any(), any());

  // when
  ClientResult result = userClient.clientMethod(****);

  // then
  assertThat(****);
```

### 外部调用通过rpc，未提取接口

复杂度允许的情况下可以实现一个对端的MockServer，比如

```java
  public class MockFooServer {
    private final int port;
    private final Server server;

    public MockFooServer(int port) {
        this.port = port;
        server = ServerBuilder.forPort(port)
          .addService(new FooService())
          .build();
    }

    public void start() throws IOException {
        server.start();
    }
  }

  ****

  public class BarServiceTest {
    @Test
    public void interactWithFoo() {
      MockFooServer server = new MockFooServer(8980);
      server.start();

      ***
    }
  }
```

## 测试需要数据库

使用内存数据库比如H2，容易保证每次测试开始时候数据是符合预期的，比如

可以针对不同的测试文件准备不同的数据，很灵活，结合DirtiesContext可以保证
每次测试的前置条件是确定的

```java
  @TestConfiguration
  public class MapperTestConfig {
      @Bean
      DataSource dataSource() {
          return new EmbeddedDatabaseBuilder().generateUniqueName(true)
                  .setType(EmbeddedDatabaseType.H2)
                  .setScriptEncoding("UTF-8").ignoreFailedDrops(true)
                  .addScript("db/test/schema.sql")
                  .addScript("db/test/dataload.sql")
                  .addScript("db/test/dataload_for_foo.sql")
                  .build();
      }  
  }

  @TestConfiguration
  @Import({
          ****,
          MapperTestConfig.class,
          ****})
  public class FooServiceTestConfig {}

  @SpringJUnitConfig({FooServiceTestConfig.class})
  public class FooServiceTest {

  }
```

### mysql to h2

如果生产数据库是mysql，然后需要提取一部分数据到h2中做测试

- 首先可以通过mysql workbench执行查询语句得到对应recordset，然后通过
"export recordset to an external file"导出到sql文件
- 然后可以在IDEA中通过[Mysql-to-H2][]插件转换成h2接受的格式，注意如果字符串里嵌套
有`"`，比如`\"field1\" : \"{\\\"field1_1\\\": 1`，那插件转换时会变成
`"field1" : "{\\"field1_1\\": 1`，还需要手动把`\\`换成`\`


[Mysql-to-H2]: https://plugins.jetbrains.com/plugin/14580-mysql-to-h2