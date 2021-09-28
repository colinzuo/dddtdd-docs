
## afterPropertiesSet

收集类型为RouterFunction的Bean，通过RouterFunction::andOther组合成一个
RouterFunction用来做HandlerMapping

```java
		if (this.routerFunction == null) {
			initRouterFunctions();
		}
		if (this.routerFunction != null) {
			RouterFunctions.changeParser(this.routerFunction, getPathPatternParser());
		}
```

RouterFunctionMapping会根据ServerWebExchange查找匹配的Handler，不同的
AbstractHandlerMapping区别在getHandlerInternal，RouterFunction的route
接口会根据ServerRequest来查找匹配的HandlerFunction

```java
	protected Mono<?> getHandlerInternal(ServerWebExchange exchange) {
		if (this.routerFunction != null) {
			ServerRequest request = ServerRequest.create(exchange, this.messageReaders);
			return this.routerFunction.route(request)
					.doOnNext(handler -> setAttributes(exchange.getAttributes(), request, handler));
		}    
```

在匹配后会写入属性
- RouterFunctions.REQUEST_ATTRIBUTE
- BEST_MATCHING_HANDLER_ATTRIBUTE
- BEST_MATCHING_PATTERN_ATTRIBUTE
- URI_TEMPLATE_VARIABLES_ATTRIBUTE