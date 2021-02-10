## pom

开发依赖
- spring-boot-starter-webflux
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
- spring-webflux定义WebFluxConfigurer

```java
@ConditionalOnWebApplication
@ConditionalOnClass({ HandlerMethodReturnValueHandler.class })
@EnableConfigurationProperties(ProxyProperties.class)
public class ProxyResponseAutoConfiguration implements WebFluxConfigurer {

  @Override
	public void configureArgumentResolvers(ArgumentResolverConfigurer configurer) {
		WebFluxConfigurer.super.configureArgumentResolvers(configurer);
		configurer.addCustomResolver(context.getBean(ProxyExchangeArgumentResolver.class));
	}
```

### ProxyProperties
ConfigurationProperties用于配置
- headers: Fixed header values that will be added to all downstream requests.
- autoForward: A set of header names that should be send downstream by default.
- sensitive: A set of sensitive header names that will not be sent downstream by default.

### ProxyExchangeArgumentResolver

```java
public Mono<Object> resolveArgument(MethodParameter parameter, BindingContext bindingContext,
			ServerWebExchange exchange) {
		ProxyExchange<?> proxy = new ProxyExchange<>(rest, exchange, bindingContext, type(parameter));
		proxy.headers(headers);
		if (this.autoForwardedHeaders.size() > 0) {
			proxy.headers(extractAutoForwardedHeaders(exchange));
		}
		if (sensitive != null) {
			proxy.sensitive(sensitive.toArray(new String[0]));
		}
		return Mono.just(proxy);
	}  
```

### ProxyExchange

- 通过header，body，sensitive，uri等接口修改消息
- forward并无特殊处理
- 通过get，post，delete，put接口调用下一个EP，原理是通过WebClient
