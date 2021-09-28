
## afterPropertiesSet

`void afterPropertiesSet()`

+ 从ServerCodecConfigurer获取HttpMessageReader列表
+ 创建ControllerMethodResolver用于解析函数参数

## handle

`Mono<HandlerResult> handle(ServerWebExchange exchange, Object handler)`

+ 创建InitBinderBindingContext，从initBinderAdviceCache中提取匹配对应handlerMethod
的advice中的initBinder方法集和handlerMethod对应BeanType上的initBinder方法集

这个InitBinderBindingContext将在后面需要时用于创建DataBinder

+ 生成invocableMethod `this.methodResolver.getRequestMappingMethod(handlerMethod)`

InvocableHandlerMethod提供接口`Mono<HandlerResult> invoke(ServerWebExchange exchange, BindingContext bindingContext, Object... providedArgs)`，在这个接口中
会通过`this.resolvers.resolveArgument(parameter, bindingContext, exchange)`
解析每一个参数

+ 生成exceptionHandler `ex -> handleException(ex, handlerMethod, bindingContext, exchange)`，里头通过`this.methodResolver.getExceptionHandlerMethod(exception, handlerMethod)`获取具体的ExceptionHandler，如果找不到则通过
`Mono.error(exception)`向外传递

+ initModel `this.modelInitializer.initModel(handlerMethod, bindingContext, exchange)`

获取ModelAttributeMethods，执行将ModelAttribute写入BindingContext中的Model

+ invoke `invocableMethod.invoke(exchange, bindingContext)`，先遍历parameter列表，
然后通过argumentResolver来解析，然后通过反射调用

AbstractNamedValueArgumentResolver中会通过WebDataBinder做类型转换

```java
	private Object applyConversion(@Nullable Object value, NamedValueInfo namedValueInfo, MethodParameter parameter,
			BindingContext bindingContext, ServerWebExchange exchange) {

		WebDataBinder binder = bindingContext.createDataBinder(exchange, namedValueInfo.name);
		try {
			value = binder.convertIfNecessary(value, parameter.getParameterType(), parameter);
		}
```

+ 给handlerResult配置 `result.setExceptionHandler(exceptionHandler)`

如果后面处理handlerResult时出现exception，那么会用它处理

+ 配置处理Exception `onErrorResume(exceptionHandler)`


