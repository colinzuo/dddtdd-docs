
## StringToZonedDateTimeConverter stringToZonedDateTimeConverter

`Converter<String, ZonedDateTime>`，String里或者为long或者为
ZonedDateTime格式化

## RouteLocatorBuilder routeLocatorBuilder

用于程序化构建RouteLocator，RouteLocator会返回`Flux<Route>`

## PropertiesRouteDefinitionLocator propertiesRouteDefinitionLocator

在application.properties配置RouteDefinition，然后从这个接口返回`Flux<RouteDefinition>`

## InMemoryRouteDefinitionRepository inMemoryRouteDefinitionRepository

在`LinkedHashMap`中保存`RouteDefinition`

## RouteDefinitionLocator routeDefinitionLocator

`CompositeRouteDefinitionLocator`，汇总所有`RouteDefinitionLocator`

- PropertiesRouteDefinitionLocator
- InMemoryRouteDefinitionRepository

## ConfigurationService gatewayConfigurationService

在RouteDefinitionRouteLocator处有用它将PredicateDefinition中的数据转换
为RoutePredicateFactory需要的Config，RoutePredicateFactory会指定Config的类型
和如何normalizeProperties

## RouteLocator routeDefinitionRouteLocator

将RouteDefinitionLocator获取到的RouteDefinition转换为Route

## RouteLocator cachedCompositeRouteLocator

首先`this.delegate.getRoutes()`，然后保存到本地map，然后每次请求replay

## RouteRefreshListener routeRefreshListener

监听ApplicationEvent，需要的时候发送RefreshRoutesEvent触发refresh routes

## FilteringWebHandler filteringWebHandler

将global filters和route的filters整合，排序，然后按顺序调用

这些filter是专用于gateway情况的，所以只有当RoutePredicateHandlerMapping
匹配时才会触发

```java
		Route route = exchange.getRequiredAttribute(GATEWAY_ROUTE_ATTR);
		List<GatewayFilter> gatewayFilters = route.getFilters();

		List<GatewayFilter> combined = new ArrayList<>(this.globalFilters);
		combined.addAll(gatewayFilters);
		// TODO: needed or cached?
		AnnotationAwareOrderComparator.sort(combined);
```

## GlobalCorsProperties globalCorsProperties

ConfigurationProperties用于配置Cors

## RoutePredicateHandlerMapping routePredicateHandlerMapping

order为1

遍历route找到第一个predicate匹配的route，设置到attribute中,
`exchange.getAttributes().put(GATEWAY_ROUTE_ATTR, r)`，返回
FilteringWebHandler做后续处理

## GatewayProperties gatewayProperties

ConfigurationProperties，`spring.cloud.gateway`，设置route，defaultFilters等

## SecureHeadersProperties secureHeadersProperties

`ConfigurationProperties("spring.cloud.gateway.filter.secure-headers")`

## ForwardedHeadersFilter forwardedHeadersFilter

添加当前处理host信息到Forwarded头

## RemoveHopByHopHeadersFilter removeHopByHopHeadersFilter

删掉下面这些header
`"connection", "keep-alive", "transfer-encoding", "te", "trailer", "proxy-authorization", "proxy-authenticate", "x-application-context", "upgrade"`

## XForwardedHeadersFilter xForwardedHeadersFilter

添加当前处理机信息到X-Forwarded-Host头

## AdaptCachedBodyGlobalFilter adaptCachedBodyGlobalFilter

配置某些route把body缓存到CACHED_REQUEST_BODY_ATTR属性

## RemoveCachedBodyFilter removeCachedBodyFilter

从CACHED_REQUEST_BODY_ATTR取出缓存的databuffer并调用`dataBuffer.release()`

## RouteToRequestUrlFilter routeToRequestUrlFilter

重新构建url，使用route中定义的scheme和host等，加上原来url的后面部分，将
合并的结果写入attribute GATEWAY_REQUEST_URL_ATTR中

## ForwardRoutingFilter forwardRoutingFilter

从GATEWAY_REQUEST_URL_ATTR中获取url，如果scheme是forward则
传给**dispatcherHandler**处理

## ForwardPathFilter forwardPathFilter

从GATEWAY_ROUTE_ATTR中获取uri，如果scheme是forward则
mutate path到`routeUri.getPath()`

## WebSocketService webSocketService

HandshakeWebSocketService，检查消息比如upgrade header是否是upgrade，
connection header是否含upgrade等，调用`this.upgradeStrategy.upgrade`

## WebsocketRoutingFilter websocketRoutingFilter

检查upgrade header等判断是否是websocket请求，如果是则设置GATEWAY_ALREADY_ROUTED_ATTR为true，并`this.webSocketService.handleRequest`使用ProxyWebSocketHandler，
在里面通过WebSocketClient和指定url做websocket通信

```java
					Mono<Void> proxySessionSend = proxySession
							.send(session.receive().doOnNext(WebSocketMessage::retain));
					// .log("proxySessionSend", Level.FINE);
					Mono<Void> serverSessionSend = session
							.send(proxySession.receive().doOnNext(WebSocketMessage::retain));
					// .log("sessionSend", Level.FINE);
					return Mono.zip(proxySessionSend, serverSessionSend).then();
```

## WeightCalculatorWebFilter weightCalculatorWebFilter

收集所有group下的route，做normalize

具体消息处理时，遍历所有group，通过random在各个group选择一个route，
将结果map写入到`WEIGHT_ATTR`属性中

## AfterRoutePredicateFactory afterRoutePredicateFactory

`now.isAfter(config.getDatetime())`

## BeforeRoutePredicateFactory beforeRoutePredicateFactory

`now.isBefore(config.getDatetime())`

## BetweenRoutePredicateFactory betweenRoutePredicateFactory

`now.isAfter(config.getDatetime1()) && now.isBefore(config.getDatetime2())`

## CookieRoutePredicateFactory cookieRoutePredicateFactory

`List<HttpCookie> cookies = exchange.getRequest().getCookies().get(config.name)`

`cookie.getValue().matches(config.regexp)`

## HeaderRoutePredicateFactory headerRoutePredicateFactory

判断指定header是否存在，或者是否与指定正则表达式匹配

`exchange.getRequest().getHeaders().getOrDefault(config.header,Collections.emptyList())`

`values.stream().anyMatch(value -> value.matches(config.regexp))`

## HostRoutePredicateFactory hostRoutePredicateFactory

获取host header，和`config.getPatterns()`匹配，如果匹配则提取UriTemplateVariables

## MethodRoutePredicateFactory methodRoutePredicateFactory

获取method，和`config.getMethods()`做匹配

## PathRoutePredicateFactory pathRoutePredicateFactory

解析`config.getPatterns()`到`ArrayList<PathPattern>`，提取path和
PathPatter做匹配，如果匹配则提取UriTemplateVariables

## QueryRoutePredicateFactory queryRoutePredicateFactory

检查query中某个param是否存在，或者是否和`config.regexp`匹配

## ReadBodyRoutePredicateFactory readBodyPredicateFactory

提取body并且cache，然后用`config.getPredicate()`检测

## RemoteAddrRoutePredicateFactory remoteAddrRoutePredicateFactory

提取远端地址和`config.sources`做匹配

## WeightRoutePredicateFactory weightRoutePredicateFactory

从exchange提取WEIGHT_ATTR和GATEWAY_PREDICATE_ROUTE_ATTR属性，
和`config.getGroup()`做匹配，比较两个属性对应routeId是否相等

## AddRequestHeaderGatewayFilterFactory addRequestHeaderGatewayFilterFactory

`ServerWebExchangeUtils.expand(exchange, config.getValue())`然后写入
到`config.getName()`头中

## MapRequestHeaderGatewayFilterFactory mapRequestHeaderGatewayFilterFactory

获取`config.getFromHeader()`中的header，写入到`config.getToHeader()`

## AddRequestParameterGatewayFilterFactory addRequestParameterGatewayFilterFactory

`ServerWebExchangeUtils.expand(exchange, config.getValue())`然后写入
到`config.getName()`这个query param中

## AddResponseHeaderGatewayFilterFactory addResponseHeaderGatewayFilterFactory

在response中添加指定header

## ModifyRequestBodyGatewayFilterFactory modifyRequestBodyGatewayFilterFactory

读取body，使用`config.getRewriteFunction()`转换到类型`config.getOutClass()`，
然后创建新request组合原来request和这个新body

## DedupeResponseHeaderGatewayFilterFactory dedupeResponseHeaderGatewayFilterFactory

对指定`config.getName()`做按配置`config.getStrategy()`做去重处理

## ModifyResponseBodyGatewayFilterFactory modifyResponseBodyGatewayFilterFactory

提取response body，然后按照`config.getInClass()`使用messageBodyDecoders解码，
之后使用`config.getRewriteFunction()`转换，然后按照`config.getOutClass()`使用
messageBodyEncoders编码

## PrefixPathGatewayFilterFactory prefixPathGatewayFilterFactory

修改path为`config.prefix + req.getURI().getRawPath()`并写入属性
GATEWAY_REQUEST_URL_ATTR中

## PreserveHostHeaderGatewayFilterFactory preserveHostHeaderGatewayFilterFactory

设置属性`PRESERVE_HOST_HEADER_ATTRIBUTE`为true

## RedirectToGatewayFilterFactory redirectToGatewayFilterFactory

按照配置设置status为`config.status`，设置`HttpHeaders.LOCATION`为
`config.url`

## RemoveRequestHeaderGatewayFilterFactory removeRequestHeaderGatewayFilterFactory

删除`config.getName()`对应header

## RemoveRequestParameterGatewayFilterFactory removeRequestParameterGatewayFilterFactory

删除`config.getName()`对应param

## RemoveResponseHeaderGatewayFilterFactory removeResponseHeaderGatewayFilterFactory

删除response header

## PrincipalNameKeyResolver principalNameKeyResolver

从principal获取name做为key

## RequestRateLimiterGatewayFilterFactory requestRateLimiterGatewayFilterFactory

`config.keyResolver`提取key，如果提取不到按照`config.denyEmptyKey`配置
决定是否deny，使用`config.rateLimiter`检查`isAllowed(routeId, key)`，
如果不通过按照`config.getStatusCode()`设置status

## RewritePathGatewayFilterFactory rewritePathGatewayFilterFactory

修改path，`path.replaceAll(config.regexp, replacement)`，结果写入
GATEWAY_REQUEST_URL_ATTR属性中

## RetryGatewayFilterFactory retryGatewayFilterFactory

使用retryWhen和repeatWhen设置重试

```java
	// chain.filter returns a Mono<Void>
	Publisher<Void> publisher = chain.filter(exchange)
			// .log("retry-filter", Level.INFO)
			.doOnSuccess(aVoid -> updateIteration(exchange)).doOnError(throwable -> updateIteration(exchange));

	if (retry != null) {
		// retryWhen returns a Mono<Void>
		// retry needs to go before repeat
		publisher = ((Mono<Void>) publisher)
				.retryWhen(reactor.util.retry.Retry.withThrowable(retry.withApplicationContext(exchange)));
	}
	if (repeat != null) {
		// repeatWhen returns a Flux<Void>
		// so this needs to be last and the variable a Publisher<Void>
		publisher = ((Mono<Void>) publisher).repeatWhen(repeat.withApplicationContext(exchange));
	}
```

## SetPathGatewayFilterFactory setPathGatewayFilterFactory

使用`config.template`生成新path `uriTemplate.expand(uriVariables)`，
并写入GATEWAY_REQUEST_URL_ATTR中

## SecureHeadersGatewayFilterFactory secureHeadersGatewayFilterFactory

按照SecureHeadersProperties配置写入安全相关header

## SetRequestHeaderGatewayFilterFactory setRequestHeaderGatewayFilterFactory

设置request header

## SetRequestHostHeaderGatewayFilterFactory setRequestHostHeaderGatewayFilterFactory

设置host header为`config.getHost()`

## SetResponseHeaderGatewayFilterFactory setResponseHeaderGatewayFilterFactory

设置response header

## RewriteResponseHeaderGatewayFilterFactory rewriteResponseHeaderGatewayFilterFactory

对response头`config.getName()`，使用`config.getRegexp()`和
`config.getReplacement()`做替换

## RewriteLocationResponseHeaderGatewayFilterFactory rewriteLocationResponseHeaderGatewayFilterFactory

重写location header

## SetStatusGatewayFilterFactory setStatusGatewayFilterFactory

更改status code

## SaveSessionGatewayFilterFactory saveSessionGatewayFilterFactory

先调用`WebSession::save再继续处理

## StripPrefixGatewayFilterFactory stripPrefixGatewayFilterFactory

从path中删掉指定数量`config.parts`的前缀

## RequestHeaderToRequestUriGatewayFilterFactory requestHeaderToRequestUriGatewayFilterFactory

从header提取url替换

## RequestSizeGatewayFilterFactory requestSizeGatewayFilterFactory

检查`content-length`是否超过限制，超过了则设置`HttpStatus.PAYLOAD_TOO_LARGE`

## RequestHeaderSizeGatewayFilterFactory requestHeaderSizeGatewayFilterFactory

检查header的size是否超过限制 `HttpStatus.REQUEST_HEADER_FIELDS_TOO_LARGE`

## GzipMessageBodyResolver gzipMessageBodyResolver

通过GZIPInputStream和GZIPOutputStream做编解码

## NettyConfiguration

### HttpClient gatewayHttpClient

按照HttpClientProperties配置和HttpClientCustomizer创建

### NettyRoutingFilter routingFilter

优先级`Ordered.LOWEST_PRECEDENCE`最低  
提取`exchange.getRequiredAttribute(GATEWAY_REQUEST_URL_ATTR)`
提取`route.getMetadata().get(CONNECT_TIMEOUT_ATTR)`设置timeout  
添加HeadersFilters过滤后的headers，如果PRESERVE_HOST_HEADER_ATTRIBUTE
设置为true则设置Host
收到response后提取headers，并对之应用HeadersFilters
提取`route.getMetadata().get(RESPONSE_TIMEOUT_ATTR)`然后通过
timeout operator设置到responseFlux

### NettyWriteResponseFilter nettyWriteResponseFilter

优先级-1，普通的GlobalFilter优先级没配置应该缺省是优先级最低

首先从reactor netty的connection读取body，然后通过ServerHttpResponse
的`writeWith(body)`写response

### ReactorNettyWebSocketClient reactorNettyWebSocketClient

提供`Mono<Void> execute(URI url, HttpHeaders requestHeaders, WebSocketHandler handler)`接口

使用httpClient建立websocket连接，创建`ReactorNettyWebSocketSession`，
然后用传入的WebSocketHandler处理`handler.handle(session)`

### ReactorNettyRequestUpgradeStrategy reactorNettyRequestUpgradeStrategy

提供`Mono<Void> upgrade(ServerWebExchange exchange, WebSocketHandler handler,@Nullable String subProtocol, Supplier<HandshakeInfo> handshakeInfoFactory)`接口

upgrade流程，从response中提取HttpServerResponse，然后调用
`reactorResponse.sendWebsocket`，在回调里创建ReactorNettyWebSocketSession，
然后`handler.handle(session)`

## GatewayActuatorConfiguration

### GatewayControllerEndpoint gatewayControllerEndpoint

`spring.cloud.gateway.actuator.verbose.enabled`为true或未定义时

actuator endpoint

### GatewayLegacyControllerEndpoint gatewayLegacyControllerEndpoint

`spring.cloud.gateway.actuator.verbose.enabled`为false时

## TokenRelayConfiguration

### TokenRelayGatewayFilterFactory tokenRelayGatewayFilterFactory

获取oauth token，设置Bearer Auth

```java
	.filter(principal -> principal instanceof OAuth2AuthenticationToken)
	.cast(OAuth2AuthenticationToken.class)
	.flatMap(authentication -> authorizedClient(exchange, authentication))
	.map(OAuth2AuthorizedClient::getAccessToken).map(token -> withBearerAuth(exchange, token))
```				
