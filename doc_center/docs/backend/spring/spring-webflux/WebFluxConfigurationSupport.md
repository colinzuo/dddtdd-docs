
## DispatcherHandler webHandler
DispatcherHandler负责收集HandlerMapping、HandlerAdapter、HandlerResultHandler，
实现接口WebHandler，收到请求时首先在HandlerMapping找
匹配的Handler，然后在HandlerAdapter找匹配项处理得到HandlerResult，
然后在HandlerResultHandler找匹配项处理，如果处理失败利用
ExceptionHandler处理并将结果再次到HandlerResultHandler找匹配项并处理

```java
	protected void initStrategies(ApplicationContext context) {
		Map<String, HandlerMapping> mappingBeans = BeanFactoryUtils.beansOfTypeIncludingAncestors(
				context, HandlerMapping.class, true, false);

		ArrayList<HandlerMapping> mappings = new ArrayList<>(mappingBeans.values());
		AnnotationAwareOrderComparator.sort(mappings);
		this.handlerMappings = Collections.unmodifiableList(mappings);

	public Mono<Void> handle(ServerWebExchange exchange) {
		return Flux.fromIterable(this.handlerMappings)
				.concatMap(mapping -> mapping.getHandler(exchange))
				.next()
				.switchIfEmpty(createNotFoundError())
				.flatMap(handler -> invokeHandler(exchange, handler))
				.flatMap(result -> handleResult(exchange, result)); 

	private Mono<HandlerResult> invokeHandler(ServerWebExchange exchange, Object handler) {
		if (this.handlerAdapters != null) {
			for (HandlerAdapter handlerAdapter : this.handlerAdapters) {
				if (handlerAdapter.supports(handler)) {
					return handlerAdapter.handle(exchange, handler);
				}
			}
		}
		return Mono.error(new IllegalStateException("No HandlerAdapter: " + handler));
	}

	private Mono<Void> handleResult(ServerWebExchange exchange, HandlerResult result) {
		return getResultHandler(result).handleResult(exchange, result)
				.checkpoint("Handler " + result.getHandler() + " [DispatcherHandler]")
				.onErrorResume(ex ->
						result.applyExceptionHandler(ex).flatMap(exResult -> {
							String text = "Exception handler " + exResult.getHandler() +
									", error=\"" + ex.getMessage() + "\" [DispatcherHandler]";
							return getResultHandler(exResult).handleResult(exchange, exResult).checkpoint(text);
						}));
	}                 
```

## WebExceptionHandler responseStatusExceptionHandler

WebExceptionHandler用于处理ResponseStatusException，设置Exception配置的status code和headers

## RequestMappingHandlerMapping requestMappingHandlerMapping

按照RequestMapping注解提供的信息做匹配，首先按照directPath匹配，
如果匹配上则在结果集匹配其它条件，如果directPath匹配结果为空则遍历匹配，
如果匹配上则按照匹配项提取
 + uri variables并配置到URI_TEMPLATE_VARIABLES_ATTRIBUTE
 + handlerMethod到BEST_MATCHING_HANDLER_ATTRIBUTE
 + bestPattern到BEST_MATCHING_PATTERN_ATTRIBUTE
如果没匹配上的检查是否有partial match的，如果有则生成对应exception，优先级为0
重载`boolean isHandler(Class<?> beanType)`检查是否有注解Controller或RequestMapping
重载`RequestMappingInfo getMappingForMethod(Method method, Class<?> handlerType)`
提取RequestMapping注解上的信息，并且会combine方法上和类上的RequestMappingInfo
`info = typeInfo.combine(info)`
重载`void registerHandlerMethod(Object handler, Method method, RequestMappingInfo mapping)`
检查是否有RequestBody注解，相应配置BodyRequired

## RequestedContentTypeResolver webFluxContentTypeResolver

通过Accept header, query parameter等决定Content Type，未明确配置下将使用HeaderContentTypeResolver

## RouterFunctionMapping routerFunctionMapping

[RouterFunctionMapping](./RouterFunctionMapping.md)

优先级设为-1从而在ReqestMapping前处理

## ResourceUrlProvider resourceUrlProvider
收集类型为SimpleUrlHandlerMapping的Bean，提取其中的ResourceWebHandler，
然后整合到一个`Map<PathPattern, ResourceWebHandler>`中，看文档意思是
当一个文档含有一个链接时，这个可以提供将链接转为真正对外的public url的功能

## HandlerMapping resourceHandlerMapping
重载`addResourceHandlers`，然后通过WebFluxConfigurer调用
addResourceHandlers, 然后创建一个SimpleUrlHandlerMapping提供
path pattern到resourceHandler的映射

## FormattingConversionService webFluxConversionService
Format分为通过Printer转换为String和通过Parser从String转换两种转换，
对外通过接口`addFormatters`暴露给子类进行配置，DefaultFormattingConversionService
同时支持缺省Converter和缺省Formater

```java
  DefaultConversionService.addDefaultConverters(this);
  if (registerDefaultFormatters) {
    addDefaultFormatters(this);
  }
```

## Validator webFluxValidator

首先看子类是否有通过getValidator提供，没有则
检查是否有`javax.validation.Validator`实现在类路径，有则通过
`org.springframework.validation.beanvalidation.OptionalValidatorFactoryBean`
调用`BeanUtils.instantiateClass`生成

## RequestMappingHandlerAdapter requestMappingHandlerAdapter

[RequestMappingHandlerAdapter](./RequestMappingHandlerAdapter.md)

设置MessageReaders，WebBindingInitializer，ArgumentResolverConfigurer

WebBindingInitializer通过接口`initBinder`设置ConversionService，Validator等

```java
		adapter.setMessageReaders(serverCodecConfigurer.getReaders());
		adapter.setWebBindingInitializer(getConfigurableWebBindingInitializer(conversionService, validator));
		adapter.setReactiveAdapterRegistry(reactiveAdapterRegistry);

		ArgumentResolverConfigurer configurer = new ArgumentResolverConfigurer();
		configureArgumentResolvers(configurer);
		adapter.setArgumentResolverConfigurer(configurer);
```

## ServerCodecConfigurer serverCodecConfigurer

提供接口`configureHttpMessageCodecs`让子类配置Http MessageReaders和Writers

## LocaleContextResolver localeContextResolver
通过Header Accept-Language来解析客户端支持语言

## ReactiveAdapterRegistry webFluxAdapterRegistry

按照类是否存在注册相应的Adapter

不同异步库之间的转换，比如RxJava和Reactor之间

## HandlerFunctionAdapter handlerFunctionAdapter

[HandlerFunctionAdapter](./HandlerFunctionAdapter.md)

## SimpleHandlerAdapter simpleHandlerAdapter

适配WebHandler
  + `webHandler.handle(exchange)`

## WebSocketHandlerAdapter webFluxWebSocketHandlerAdapter

适配WebSocketHandler，检查请求满足websocket要求，比如method为Get，Upgrade头为WebSocket等，优先级为3
  + `WebSocketHandler.class.isAssignableFrom(handler.getClass())`
  + `getWebSocketService().handleRequest(exchange, webSocketHandler)`
	+ `HandshakeWebSocketService.handleRequest`
	+ `org.springframework.web.reactive.socket.server.upgrade.ReactorNettyRequestUpgradeStrategy`
	+ `this.upgradeStrategy.upgrade(exchange, handler, protocol, () -> createHandshakeInfo(exchange, request, protocol, attributes)`

## ResponseEntityResultHandler responseEntityResultHandler

处理结果为HttpEntity或者HttpHeaders类型，优先级为0
  + 将httpEntity上配置的header配置到最终的response上
```java
			HttpHeaders entityHeaders = httpEntity.getHeaders();
			HttpHeaders responseHeaders = exchange.getResponse().getHeaders();
			if (!entityHeaders.isEmpty()) {
				entityHeaders.entrySet().stream()
						.forEach(entry -> responseHeaders.put(entry.getKey(), entry.getValue()));
			}
```
  + 处理last modified
```java
			String etag = entityHeaders.getETag();
			Instant lastModified = Instant.ofEpochMilli(entityHeaders.getLastModified());
			HttpMethod httpMethod = exchange.getRequest().getMethod();
			if (SAFE_METHODS.contains(httpMethod) && exchange.checkNotModified(etag, lastModified)) {
				return exchange.getResponse().setComplete();
			}
```
  + 通过`HttpMessageWriter`写入body
```java
			for (HttpMessageWriter<?> writer : getMessageWriters()) {
				if (writer.canWrite(actualElementType, bestMediaType)) {
					return writer.write((Publisher) publisher, actualType, elementType,
							bestMediaType, exchange.getRequest(), exchange.getResponse(),
							Hints.from(Hints.LOG_PREFIX_HINT, logPrefix));
				}
			}
```

## ResponseBodyResultHandler responseBodyResultHandler

处理结果有注解ResponseBody的情况，优先级为100

## ServerResponseResultHandler serverResponseResultHandler

处理结果为ServerResponse类型，优先级为0，通过`response.writeTo`写response

