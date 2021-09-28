
## ArgumentResolvers

```java
		List<? extends HandlerMethodArgumentResolver> resolvers = initArgumentResolvers();
		if (resolvers.isEmpty()) {
			resolvers = new ArrayList<>(this.argumentResolverConfigurer.getCustomResolvers());
		}
		this.invocableHelper.addArgumentResolvers(resolvers);
```

## ReturnValueHandlers

```java
		List<? extends HandlerMethodReturnValueHandler> handlers = initReturnValueHandlers();
		if (handlers.isEmpty()) {
			handlers = new ArrayList<>(this.returnValueHandlerConfigurer.getCustomHandlers());
		}
		this.invocableHelper.addReturnValueHandlers(handlers);
```

## HandlerMethods

```java
		if (this.handlers != null) {
			for (Object handler : this.handlers) {
				detectHandlerMethods(handler);
			}
		}
		Predicate<Class<?>> predicate = this.handlerPredicate;

		for (String beanName : this.applicationContext.getBeanNamesForType(Object.class)) {

					beanType = this.applicationContext.getType(beanName);

				if (beanType != null && predicate.test(beanType)) {
					detectHandlerMethods(beanName);
				}    

	protected final void detectHandlerMethods(Object handler) {

			Map<Method, T> methods = MethodIntrospector.selectMethods(userType,
					(MethodIntrospector.MetadataLookup<T>) method -> getMappingForMethod(method, userType));

			methods.forEach((key, value) -> registerHandlerMethod(handler, key, value));

	public final void registerHandlerMethod(Object handler, Method method, T mapping) {

		HandlerMethod newHandlerMethod = createHandlerMethod(handler, method);

		mapping = extendMapping(mapping, newHandlerMethod);
		this.handlerMethods.put(mapping, newHandlerMethod);

		for (String pattern : getDirectLookupMappings(mapping)) {
			List<T> values = this.destinationLookup.computeIfAbsent(pattern, p -> new CopyOnWriteArrayList<>());
			values.add(mapping);
		}                                          
```

## handleMessage

```java
	public Mono<Void> handleMessage(Message<?> message) throws MessagingException {

			match = getHandlerMethod(message);

		return handleMatch(match.mapping, match.handlerMethod, message);

	protected Mono<Void> handleMatch(T mapping, HandlerMethod handlerMethod, Message<?> message) {
		handlerMethod = handlerMethod.createWithResolvedBean();
		return this.invocableHelper.handleMessage(handlerMethod, message);
	}

	private Match<T> getHandlerMethod(Message<?> message) {

		RouteMatcher.Route destination = getDestination(message);
		List<T> mappingsByUrl = (destination != null ? this.destinationLookup.get(destination.value()) : null);
		if (mappingsByUrl != null) {
			addMatchesToCollection(mappingsByUrl, message, matches);
		}
		if (matches.isEmpty()) {
			// No direct hits, go through all mappings
			Set<T> allMappings = this.handlerMethods.keySet();
			addMatchesToCollection(allMappings, message, matches);
		}              
```
