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

```java
private Mono<ResponseEntity<T>> exchange(RequestEntity<?> requestEntity) {
		Type type = this.responseType;
		RequestBodySpec builder = rest.method(requestEntity.getMethod()).uri(requestEntity.getUrl())
				.headers(headers -> addHeaders(headers, requestEntity.getHeaders()));
		Mono<ClientResponse> result;
		if (requestEntity.getBody() instanceof Publisher) {
			@SuppressWarnings("unchecked")
			Publisher<Object> publisher = (Publisher<Object>) requestEntity.getBody();
			result = builder.body(publisher, Object.class).exchange();
		}
		else if (requestEntity.getBody() != null) {
			result = builder.body(BodyInserters.fromValue(requestEntity.getBody())).exchange();
		}
		else {
			if (hasBody) {
				result = builder.headers(headers -> addHeaders(headers, exchange.getRequest().getHeaders()))
						.body(exchange.getRequest().getBody(), DataBuffer.class).exchange();
			}
			else {
				result = builder.headers(headers -> addHeaders(headers, exchange.getRequest().getHeaders())).exchange();
			}
		}
		return result.flatMap(response -> response.toEntity(ParameterizedTypeReference.forType(type)));
	}
```

### ProductionConfigurationTests

通过TestApplication的ProxyController然后到TestController来验证gateway功能。

### ReactiveTests

- 在handler接口用到Flux类型，比如`@RequestBody Flux<Foo> foos`
- 在handler接口用到ServerWebExchange，然后在函数体里利用DispatcherHandler进行
内部转发