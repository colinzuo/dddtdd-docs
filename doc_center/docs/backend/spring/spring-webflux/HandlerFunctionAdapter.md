
RouterFunction返回的handler类型为HandlerFunction
  + `exchange.getRequiredAttribute(RouterFunctions.REQUEST_ATTRIBUTE)`
  + `handlerFunction.handle(request)`
  + `new HandlerResult(handlerFunction, response, HANDLER_FUNCTION_RETURN_TYPE)`

```java
	public Mono<HandlerResult> handle(ServerWebExchange exchange, Object handler) {
		HandlerFunction<?> handlerFunction = (HandlerFunction<?>) handler;
		ServerRequest request = exchange.getRequiredAttribute(RouterFunctions.REQUEST_ATTRIBUTE);
		return handlerFunction.handle(request)
				.map(response -> new HandlerResult(handlerFunction, response, HANDLER_FUNCTION_RETURN_TYPE));
	}
```