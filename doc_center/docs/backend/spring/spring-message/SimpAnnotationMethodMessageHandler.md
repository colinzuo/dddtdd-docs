
## initArgumentResolvers

### HeaderMethodArgumentResolver

```java
	@Override
	public boolean supportsParameter(MethodParameter parameter) {
		return parameter.hasParameterAnnotation(Header.class);
	}

	@Override
	protected NamedValueInfo createNamedValueInfo(MethodParameter parameter) {
		Header annot = parameter.getParameterAnnotation(Header.class);
		Assert.state(annot != null, "No Header annotation");
		return new HeaderNamedValueInfo(annot);
	}

	@Override
	@Nullable
	protected Object resolveArgumentInternal(MethodParameter parameter, Message<?> message, String name)
			throws Exception {

		Object headerValue = message.getHeaders().get(name);
		Object nativeHeaderValue = getNativeHeaderValue(message, name);

		if (headerValue != null && nativeHeaderValue != null) {
			if (logger.isDebugEnabled()) {
				logger.debug("A value was found for '" + name + "', in both the top level header map " +
						"and also in the nested map for native headers. Using the value from top level map. " +
						"Use 'nativeHeader.myHeader' to resolve the native header.");
			}
		}

		return (headerValue != null ? headerValue : nativeHeaderValue);
	}  
```

### HeadersMethodArgumentResolver

```java
	@Override
	public boolean supportsParameter(MethodParameter parameter) {
		Class<?> paramType = parameter.getParameterType();
		return ((parameter.hasParameterAnnotation(Headers.class) && Map.class.isAssignableFrom(paramType)) ||
				MessageHeaders.class == paramType || MessageHeaderAccessor.class.isAssignableFrom(paramType));
	}

	@Override
	@Nullable
	public Object resolveArgument(MethodParameter parameter, Message<?> message) throws Exception {
		Class<?> paramType = parameter.getParameterType();
		if (Map.class.isAssignableFrom(paramType)) {
      // highlight-next-line
			return message.getHeaders();
		}
		else if (MessageHeaderAccessor.class == paramType) {
			MessageHeaderAccessor accessor = MessageHeaderAccessor.getAccessor(message, MessageHeaderAccessor.class);
			return accessor != null ? accessor : new MessageHeaderAccessor(message);
		}
		else if (MessageHeaderAccessor.class.isAssignableFrom(paramType)) {
			MessageHeaderAccessor accessor = MessageHeaderAccessor.getAccessor(message, MessageHeaderAccessor.class);
			if (accessor != null && paramType.isAssignableFrom(accessor.getClass())) {
				return accessor;
			}
			else {
				Method method = ReflectionUtils.findMethod(paramType, "wrap", Message.class);
				if (method == null) {
					throw new IllegalStateException(
							"Cannot create accessor of type " + paramType + " for message " + message);
				}
				return ReflectionUtils.invokeMethod(method, null, message);
			}
		}
		else {
			throw new IllegalStateException("Unexpected parameter of type " + paramType +
					" in method " + parameter.getMethod() + ". ");
		}
	}
```

### DestinationVariableMethodArgumentResolver

```java
	@Override
	public boolean supportsParameter(MethodParameter parameter) {
		return parameter.hasParameterAnnotation(DestinationVariable.class);
	}

	@Override
	protected NamedValueInfo createNamedValueInfo(MethodParameter parameter) {
		DestinationVariable annot = parameter.getParameterAnnotation(DestinationVariable.class);
		Assert.state(annot != null, "No DestinationVariable annotation");
		return new DestinationVariableNamedValueInfo(annot);
	}

	@Override
	@Nullable
	@SuppressWarnings("unchecked")
	protected Object resolveArgumentInternal(MethodParameter parameter, Message<?> message, String name) {
		MessageHeaders headers = message.getHeaders();
		Map<String, String> vars = (Map<String, String>) headers.get(DESTINATION_TEMPLATE_VARIABLES_HEADER);
		return vars != null ? vars.get(name) : null;
	}    
```

### PrincipalMethodArgumentResolver

```java
	@Override
	public boolean supportsParameter(MethodParameter parameter) {
		MethodParameter nestedParameter = parameter.nestedIfOptional();
		Class<?> paramType = nestedParameter.getNestedParameterType();
		return Principal.class.isAssignableFrom(paramType);
	}

	@Override
	public Object resolveArgument(MethodParameter parameter, Message<?> message){
		Principal user = SimpMessageHeaderAccessor.getUser(message.getHeaders());
		return parameter.isOptional() ? Optional.ofNullable(user) : user;
	}
```

### MessageMethodArgumentResolver

```java
	@Override
	public boolean supportsParameter(MethodParameter parameter) {
		return Message.class.isAssignableFrom(parameter.getParameterType());
	}

	@Override
	public Object resolveArgument(MethodParameter parameter, Message<?> message) throws Exception {
		Class<?> targetMessageType = parameter.getParameterType();
		Class<?> targetPayloadType = getPayloadType(parameter, message);

		if (!targetMessageType.isAssignableFrom(message.getClass())) {
			throw new MethodArgumentTypeMismatchException(message, parameter, "Actual message type '" +
					ClassUtils.getDescriptiveType(message) + "' does not match expected type '" +
					ClassUtils.getQualifiedName(targetMessageType) + "'");
		}

		Object payload = message.getPayload();
		if (targetPayloadType.isInstance(payload)) {
			return message;
		}

		if (isEmptyPayload(payload)) {
			throw new MessageConversionException(message, "Cannot convert from actual payload type '" +
					ClassUtils.getDescriptiveType(payload) + "' to expected payload type '" +
					ClassUtils.getQualifiedName(targetPayloadType) + "' when payload is empty");
		}

		payload = convertPayload(message, parameter, targetPayloadType);
		return MessageBuilder.createMessage(payload, message.getHeaders());
	}
```

### PayloadMethodArgumentResolver

```java
	@Override
	public boolean supportsParameter(MethodParameter parameter) {
		return (parameter.hasParameterAnnotation(Payload.class) || this.useDefaultResolution);
	}

	@Override
	@Nullable
	public Object resolveArgument(MethodParameter parameter, Message<?> message) throws Exception {
		Payload ann = parameter.getParameterAnnotation(Payload.class);
		if (ann != null && StringUtils.hasText(ann.expression())) {
			throw new IllegalStateException("@Payload SpEL expressions not supported by this resolver");
		}

		Object payload = message.getPayload();
		if (isEmptyPayload(payload)) {
			if (ann == null || ann.required()) {
				String paramName = getParameterName(parameter);
				BindingResult bindingResult = new BeanPropertyBindingResult(payload, paramName);
				bindingResult.addError(new ObjectError(paramName, "Payload value must not be empty"));
				throw new MethodArgumentNotValidException(message, parameter, bindingResult);
			}
			else {
				return null;
			}
		}

		Class<?> targetClass = resolveTargetClass(parameter, message);
		Class<?> payloadClass = payload.getClass();
		if (ClassUtils.isAssignable(targetClass, payloadClass)) {
			validate(message, parameter, payload);
			return payload;
		}
		else {
			if (this.converter instanceof SmartMessageConverter) {
				SmartMessageConverter smartConverter = (SmartMessageConverter) this.converter;
				payload = smartConverter.fromMessage(message, targetClass, parameter);
			}
			else {
				payload = this.converter.fromMessage(message, targetClass);
			}
			if (payload == null) {
				throw new MessageConversionException(message, "Cannot convert from [" +
						payloadClass.getName() + "] to [" + targetClass.getName() + "] for " + message);
			}
			validate(message, parameter, payload);
			return payload;
		}
	}
```

## initReturnValueHandlers

### ListenableFutureReturnValueHandler

```java
	@Override
	public boolean supportsReturnType(MethodParameter returnType) {
		return ListenableFuture.class.isAssignableFrom(returnType.getParameterType());
	}

	@Override
	@SuppressWarnings("unchecked")
	public ListenableFuture<?> toListenableFuture(Object returnValue, MethodParameter returnType) {
		return (ListenableFuture<?>) returnValue;
	}
```

### CompletableFutureReturnValueHandler

```java
	@Override
	public boolean supportsReturnType(MethodParameter returnType) {
		return CompletionStage.class.isAssignableFrom(returnType.getParameterType());
	}

	@Override
	@SuppressWarnings("unchecked")
	public ListenableFuture<?> toListenableFuture(Object returnValue, MethodParameter returnType) {
		return new CompletableToListenableFutureAdapter<>((CompletionStage<Object>) returnValue);
	}
```

### ReactiveReturnValueHandler

```java
	@Override
	public boolean supportsReturnType(MethodParameter returnType) {
		return (this.adapterRegistry.getAdapter(returnType.getParameterType()) != null);
	}

	@Override
	public boolean isAsyncReturnValue(Object returnValue, MethodParameter returnType) {
		ReactiveAdapter adapter = this.adapterRegistry.getAdapter(returnType.getParameterType(), returnValue);
		return (adapter != null && !adapter.isMultiValue() && !adapter.isNoValue());
	}

	@Override
	public ListenableFuture<?> toListenableFuture(Object returnValue, MethodParameter returnType) {
		ReactiveAdapter adapter = this.adapterRegistry.getAdapter(returnType.getParameterType(), returnValue);
		if (adapter != null) {
			return new MonoToListenableFutureAdapter<>(Mono.from(adapter.toPublisher(returnValue)));
		}
		return null;
	}
```

### SendToMethodReturnValueHandler

```java
	@Override
	public boolean supportsReturnType(MethodParameter returnType) {
		return (returnType.hasMethodAnnotation(SendTo.class) ||
				AnnotatedElementUtils.hasAnnotation(returnType.getDeclaringClass(), SendTo.class) ||
				returnType.hasMethodAnnotation(SendToUser.class) ||
				AnnotatedElementUtils.hasAnnotation(returnType.getDeclaringClass(), SendToUser.class) ||
				!this.annotationRequired);
	}
```

### SubscriptionMethodReturnValueHandler

```java
	@Override
	public boolean supportsReturnType(MethodParameter returnType) {
		return (returnType.hasMethodAnnotation(SubscribeMapping.class) &&
				!returnType.hasMethodAnnotation(SendTo.class) &&
				!returnType.hasMethodAnnotation(SendToUser.class));
	}

	@Override
	public void handleReturnValue(@Nullable Object returnValue, MethodParameter returnType, Message<?> message)
			throws Exception {

		if (returnValue == null) {
			return;
		}

		MessageHeaders headers = message.getHeaders();
		String sessionId = SimpMessageHeaderAccessor.getSessionId(headers);
		String subscriptionId = SimpMessageHeaderAccessor.getSubscriptionId(headers);
		String destination = SimpMessageHeaderAccessor.getDestination(headers);

		if (subscriptionId == null) {
			throw new IllegalStateException("No simpSubscriptionId in " + message +
					" returned by: " + returnType.getMethod());
		}
		if (destination == null) {
			throw new IllegalStateException("No simpDestination in " + message +
					" returned by: " + returnType.getMethod());
		}

		if (logger.isDebugEnabled()) {
			logger.debug("Reply to @SubscribeMapping: " + returnValue);
		}
		MessageHeaders headersToSend = createHeaders(sessionId, subscriptionId, returnType);
		this.messagingTemplate.convertAndSend(destination, returnValue, headersToSend);
	}
```
