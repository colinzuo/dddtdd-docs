
## initExceptionMappings

```java
		Map<Method, MessageExceptionHandler> methods = MethodIntrospector.selectMethods(handlerType,
				(MethodIntrospector.MetadataLookup<MessageExceptionHandler>) method ->
						AnnotatedElementUtils.findMergedAnnotation(method, MessageExceptionHandler.class));

		for (Map.Entry<Method, MessageExceptionHandler> entry : methods.entrySet()) {

			List<Class<? extends Throwable>> exceptionTypes = new ArrayList<>(Arrays.asList(entry.getValue().value()));

			for (Class<? extends Throwable> exceptionType : exceptionTypes) {
				Method oldMethod = result.put(exceptionType, method);
```
