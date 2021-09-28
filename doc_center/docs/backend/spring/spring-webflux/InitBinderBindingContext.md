
遍历binderMethods，检查这个binderMethod是否被配置为用于这个target object

```java
	protected WebExchangeDataBinder initDataBinder(WebExchangeDataBinder dataBinder, ServerWebExchange exchange) {
		this.binderMethods.stream()
				.filter(binderMethod -> {
					InitBinder ann = binderMethod.getMethodAnnotation(InitBinder.class);
					Assert.state(ann != null, "No InitBinder annotation");
					String[] names = ann.value();
					return (ObjectUtils.isEmpty(names) ||
							ObjectUtils.containsElement(names, dataBinder.getObjectName()));
				})
				.forEach(method -> invokeBinderMethod(dataBinder, exchange, method));

		return dataBinder;
	}
```

调用binderMethod，从调用方式表明binderMethod的第一个参数总是
`WebExchangeDataBinder dataBinder`

```java
	private void invokeBinderMethod(
			WebExchangeDataBinder dataBinder, ServerWebExchange exchange, SyncInvocableHandlerMethod binderMethod) {

		HandlerResult result = binderMethod.invokeForHandlerResult(exchange, this.binderMethodContext, dataBinder);
```
