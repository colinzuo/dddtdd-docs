
## routeMatcher

```java
	public void afterPropertiesSet() {

		// Initialize RouteMatcher before parent initializes handler mappings
		if (this.routeMatcher == null) {
			AntPathMatcher pathMatcher = new AntPathMatcher();
			pathMatcher.setPathSeparator(".");
			this.routeMatcher = new SimpleRouteMatcher(pathMatcher);
		}
```

## ArgumentResolvers

```java
		// Annotation-based resolvers
		resolvers.add(new HeaderMethodArgumentResolver(this.conversionService, beanFactory));
		resolvers.add(new HeadersMethodArgumentResolver());
		resolvers.add(new DestinationVariableMethodArgumentResolver(this.conversionService));

		// Custom resolvers
		resolvers.addAll(getArgumentResolverConfigurer().getCustomResolvers());

		// Catch-all
		resolvers.add(new PayloadMethodArgumentResolver(
				getDecoders(), this.validator, getReactiveAdapterRegistry(), true));    
```

## MappingForMethod

```java
	protected CompositeMessageCondition getMappingForMethod(Method method, Class<?> handlerType) {
		CompositeMessageCondition methodCondition = getCondition(method);

			CompositeMessageCondition typeCondition = getCondition(handlerType);

				return typeCondition.combine(methodCondition);

	protected CompositeMessageCondition getCondition(AnnotatedElement element) {
		MessageMapping ann = AnnotatedElementUtils.findMergedAnnotation(element, MessageMapping.class);

		String[] patterns = processDestinations(ann.value());
		return new CompositeMessageCondition(
				new DestinationPatternsMessageCondition(patterns, obtainRouteMatcher()));
```

## Destination

```java
	protected RouteMatcher.Route getDestination(Message<?> message) {
		return (RouteMatcher.Route) message.getHeaders()
				.get(DestinationPatternsMessageCondition.LOOKUP_DESTINATION_HEADER);
	}
```

## ExceptionMethodResolver

```java
	protected AbstractExceptionHandlerMethodResolver createExceptionMethodResolverFor(Class<?> beanType) {
		return new AnnotationExceptionHandlerMethodResolver(beanType);
```

## handleMatch

```java
			Map<String, String> vars = obtainRouteMatcher().matchAndExtract(pattern, destination);

				MessageHeaderAccessor mha = MessageHeaderAccessor.getAccessor(message, MessageHeaderAccessor.class);

				mha.setHeader(DestinationVariableMethodArgumentResolver.DESTINATION_TEMPLATE_VARIABLES_HEADER, vars);
```
