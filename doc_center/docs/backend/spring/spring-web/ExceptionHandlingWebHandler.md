
`public class ExceptionHandlingWebHandler extends WebHandlerDecorator {`

添加CheckpointInsertingHandler用于在有exception时配置checkpoint

```java
	public ExceptionHandlingWebHandler(WebHandler delegate, List<WebExceptionHandler> handlers) {
		super(delegate);
		List<WebExceptionHandler> handlersToUse = new ArrayList<>();
		handlersToUse.add(new CheckpointInsertingHandler());
		handlersToUse.addAll(handlers);
		this.exceptionHandlers = Collections.unmodifiableList(handlersToUse);
	}
```

decorate delegate handle，当发现Throwable时候遍历
exceptionHandlers处理

```java
	public Mono<Void> handle(ServerWebExchange exchange) {
		Mono<Void> completion;
		try {
			completion = super.handle(exchange);
		}
		catch (Throwable ex) {
			completion = Mono.error(ex);
		}

		for (WebExceptionHandler handler : this.exceptionHandlers) {
			completion = completion.onErrorResume(ex -> handler.handle(exchange, ex));
		}
		return completion;
	}
```