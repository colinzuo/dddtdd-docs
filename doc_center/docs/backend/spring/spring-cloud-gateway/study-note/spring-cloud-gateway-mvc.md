## pom

开发依赖
- spring-boot-starter-web
- spring-boot-autoconfigure-processor
- spring-boot-configuration-processor

测试依赖
- spring-boot-starter-test
- junit-vintage-engine
- spring-boot-starter-actuator

## src/main

### ProxyResponseAutoConfiguration
定义ProxyExchangeArgumentResolver用于解析参数ProxyExchange

- spring-web在classpath代表SERVLET可用
- spring-webflux在classpath代表REACTIVE可用
- spring-webmvc定义WebMvcConfigurer

```java
@ConditionalOnWebApplication
@ConditionalOnClass({ HandlerMethodReturnValueHandler.class })
@EnableConfigurationProperties(ProxyProperties.class)
public class ProxyResponseAutoConfiguration implements WebMvcConfigurer {
```

### ProxyProperties
ConfigurationProperties用于配置
- headers: Fixed header values that will be added to all downstream requests.
- autoForward: A set of header names that should be send downstream by default.
- sensitive: A set of sensitive header names that will not be sent downstream by default.

### ProxyExchangeArgumentResolver

```java
public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer,
			NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {
		ProxyExchange<?> proxy = new ProxyExchange<>(rest, webRequest, mavContainer, binderFactory, type(parameter));
		proxy.headers(headers);
		if (this.autoForwardedHeaders.size() > 0) {
			proxy.headers(extractAutoForwardedHeaders(webRequest));
		}
		if (sensitive != null) {
			proxy.sensitive(sensitive.toArray(new String[0]));
		}
		return proxy;
	}
```

### ProxyExchange

- 通过header，body，sensitive，uri等接口修改消息
- 通过forward接口在servlet容器内转发，原理是通过request的dispatcher来forward
- 通过get，post，delete，put接口向外部转发，原理是通过resttemplate

### ProductionConfigurationTests

基于JUnit4的测试，通过SpringBootTest设置属性，通过ContextConfiguration设置
Configuration，在TestApplication中创建Controller，通过TestRestTemplate模拟
客户端

```java
@RunWith(SpringRunner.class)
@SpringBootTest(properties = { "spring.cloud.gateway.proxy.auto-forward=Baz" },
		webEnvironment = WebEnvironment.RANDOM_PORT)
@ContextConfiguration(classes = TestApplication.class)
public class ProductionConfigurationTests {
```

TestRestTemplate的使用
- 直接使用相对地址，比如rest.getForEntity("/forward/special/foos/0", Foo.class)
- 获取绝对地址，比如rest.getRestTemplate().getUriTemplateHandler().expand("/forward/special/bars")，然后生成RequestEntity，再用rest.exchange

测试方面
- 不同method，比如get，put，post，delete
- 不同header，发送端设置header，响应侧验证header
- 不同path，有的path触发forward，有的触发proxy
- 对收到的response进行转换，比如通过取list首项将list转为single
