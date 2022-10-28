
## Custom

### SimpAttributesContextHolder

```java
	SimpAttributes simpAttributes = SimpAttributes.fromMessage(message);

	SimpAttributesContextHolder.setAttributes(simpAttributes);

	SimpAttributesContextHolder.resetAttributes();
```

### decorateWebSocketHandler

```java
	protected WebSocketHandler decorateWebSocketHandler(WebSocketHandler handler) {
		for (WebSocketHandlerDecoratorFactory factory : getTransportRegistration().getDecoratorFactories()) {
			handler = factory.decorate(handler);
		}
		return handler;
	}
```

### WebSocketHandlerDecoratorFactory

<https://github.com/spring-projects/spring-session/blob/main/spring-session-core/src/main/java/org/springframework/session/web/socket/handler/WebSocketConnectHandlerDecoratorFactory.java>

```java
/**
 * A factory for applying decorators to a WebSocketHandler.
 *
 * <p>Decoration should be done through sub-classing
 * {@link org.springframework.web.socket.handler.WebSocketHandlerDecorator
 * WebSocketHandlerDecorator} to allow any code to traverse decorators and/or
 * unwrap the original handler when necessary .
 */
public interface WebSocketHandlerDecoratorFactory {

	/**
	 * Decorate the given WebSocketHandler.
	 * @param handler the handler to be decorated.
	 * @return the same handler or the handler wrapped with a sub-class of
	 * {@code WebSocketHandlerDecorator}.
	 */
	WebSocketHandler decorate(WebSocketHandler handler);

}
```

### WebSocketHandlerDecorator

```java

/**
 * Wraps another {@link org.springframework.web.socket.WebSocketHandler}
 * instance and delegates to it.
 *
 * <p>Also provides a {@link #getDelegate()} method to return the decorated
 * handler as well as a {@link #getLastHandler()} method to go through all nested
 * delegates and return the "last" handler.0
 */
public class WebSocketHandlerDecorator implements WebSocketHandler {

	private final WebSocketHandler delegate;

	public void afterConnectionClosed(WebSocketSession session, CloseStatus closeStatus) throws Exception {
		this.delegate.afterConnectionClosed(session, closeStatus);
	}
```

## EnableWebSocketMessageBroker

```java
@Import(DelegatingWebSocketMessageBrokerConfiguration.class)
public @interface EnableWebSocketMessageBroker {
```

### DelegatingWebSocketMessageBrokerConfiguration

```java
@Configuration(proxyBeanMethods = false)
public class DelegatingWebSocketMessageBrokerConfiguration extends WebSocketMessageBrokerConfigurationSupport {

	private final List<WebSocketMessageBrokerConfigurer> configurers = new ArrayList<>();

	protected void registerStompEndpoints(StompEndpointRegistry registry) {
		for (WebSocketMessageBrokerConfigurer configurer : this.configurers) {
			configurer.registerStompEndpoints(registry);
		}
	}		
```

### WebSocketMessageBrokerConfigurationSupport

- stompWebSocketHandlerMapping
- subProtocolWebSocketHandler
- WebSocketAnnotationMethodMessageHandler
- webSocketMessageBrokerStats

```java
/**
 * Extends {@link AbstractMessageBrokerConfiguration} and adds configuration for
 * receiving and responding to STOMP messages from WebSocket clients.
 *
 * <p>Typically used in conjunction with
 * {@link EnableWebSocketMessageBroker @EnableWebSocketMessageBroker} but can
 * also be extended directly.
 */
public abstract class WebSocketMessageBrokerConfigurationSupport extends AbstractMessageBrokerConfiguration {
```

### stompWebSocketHandlerMapping

- WebMvcStompEndpointRegistry
- decorateWebSocketHandler

```java
	public HandlerMapping stompWebSocketHandlerMapping(
			WebSocketHandler subProtocolWebSocketHandler, TaskScheduler messageBrokerTaskScheduler) {

		WebSocketHandler handler = decorateWebSocketHandler(subProtocolWebSocketHandler);
		WebMvcStompEndpointRegistry registry =
				new WebMvcStompEndpointRegistry(handler, getTransportRegistration(), messageBrokerTaskScheduler);

		registerStompEndpoints(registry);
		return registry.getHandlerMapping();								
```


### subProtocolWebSocketHandler

```java
	@Bean
	public WebSocketHandler subProtocolWebSocketHandler(
			AbstractSubscribableChannel clientInboundChannel, AbstractSubscribableChannel clientOutboundChannel) {

		return new SubProtocolWebSocketHandler(clientInboundChannel, clientOutboundChannel);
	}
```

### webSocketMessageBrokerStats

```java
	@Bean
	public WebSocketMessageBrokerStats webSocketMessageBrokerStats(
			@Nullable AbstractBrokerMessageHandler stompBrokerRelayMessageHandler,
			WebSocketHandler subProtocolWebSocketHandler, TaskExecutor clientInboundChannelExecutor,
			TaskExecutor clientOutboundChannelExecutor, TaskScheduler messageBrokerTaskScheduler) {

		WebSocketMessageBrokerStats stats = new WebSocketMessageBrokerStats();
```		

### WebMvcStompEndpointRegistry

- StompSubProtocolHandler

HandlerMapping by order 
	-> WebSocketHandlerMapping 
	-> WebSocketHttpRequestHandler by path
	-> WebSocketHandler
	-> subProtocolWebSocketHandler
	-> StompSubProtocolHandler

```java
	public WebMvcStompEndpointRegistry(WebSocketHandler webSocketHandler,
			WebSocketTransportRegistration transportRegistration, TaskScheduler defaultSockJsTaskScheduler) {

		this.webSocketHandler = webSocketHandler;
		this.subProtocolWebSocketHandler = unwrapSubProtocolWebSocketHandler(webSocketHandler);

		this.stompHandler = new StompSubProtocolHandler();	
				
	public StompWebSocketEndpointRegistration addEndpoint(String... paths) {
		this.subProtocolWebSocketHandler.addProtocolHandler(this.stompHandler);
		WebMvcStompWebSocketEndpointRegistration registration =
				new WebMvcStompWebSocketEndpointRegistration(paths, this.webSocketHandler, this.sockJsScheduler);
		this.registrations.add(registration);
		return registration;
	}			

	public AbstractHandlerMapping getHandlerMapping() {
		Map<String, Object> urlMap = new LinkedHashMap<>();
		for (WebMvcStompWebSocketEndpointRegistration registration : this.registrations) {

				for (String pattern : patterns) {
					urlMap.put(pattern, httpHandler);											

		WebSocketHandlerMapping hm = new WebSocketHandlerMapping();
		hm.setUrlMap(urlMap);
		hm.setOrder(this.order);												
```

### WebMvcStompWebSocketEndpointRegistration

```java
	public final MultiValueMap<HttpRequestHandler, String> getMappings() {
		MultiValueMap<HttpRequestHandler, String> mappings = new LinkedMultiValueMap<>();		

			for (String path : this.paths) {
				WebSocketHttpRequestHandler handler;
					handler = new WebSocketHttpRequestHandler(this.webSocketHandler);

				mappings.add(handler, path);
```

### StompSubProtocolHandler

- handleMessageFromClient
- handleMessageToClient

```java
/**
 * A {@link SubProtocolHandler} for STOMP that supports versions 1.0, 1.1, and 1.2
 * of the STOMP specification.
 */
public class StompSubProtocolHandler implements SubProtocolHandler, ApplicationEventPublisherAware {

	private StompEncoder stompEncoder = new StompEncoder();

	private StompDecoder stompDecoder = new StompDecoder();	

	private final Map<String, BufferingStompDecoder> decoders = new ConcurrentHashMap<>();

	public void handleMessageFromClient(WebSocketSession session,
			WebSocketMessage<?> webSocketMessage, MessageChannel outputChannel) {		

			BufferingStompDecoder decoder = this.decoders.get(session.getId());

			messages = decoder.decode(byteBuffer);

		for (Message<byte[]> message : messages) {
			StompHeaderAccessor headerAccessor =
					MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);

				headerAccessor.setSessionId(session.getId());
				headerAccessor.setSessionAttributes(session.getAttributes());
				headerAccessor.setUser(getUser(session));

					SimpAttributesContextHolder.setAttributesFromMessage(message);
					sent = outputChannel.send(message);									

	/**
	 * Handle STOMP messages going back out to WebSocket clients.
	 */
	@Override
	@SuppressWarnings("unchecked")
	public void handleMessageToClient(WebSocketSession session, Message<?> message) {	

		sendToClient(session, accessor, payload);

	private void sendToClient(WebSocketSession session, StompHeaderAccessor stompAccessor, byte[] payload) {

			byte[] bytes = this.stompEncoder.encode(stompAccessor.getMessageHeaders(), payload);

				session.sendMessage(new TextMessage(bytes));	

		finally {
			if (StompCommand.ERROR.equals(command)) {
				try {
					session.close(CloseStatus.PROTOCOL_ERROR);
				}
				catch (IOException ex) {
					// Ignore
				}
			}
		}
		
	public void afterSessionStarted(WebSocketSession session, MessageChannel outputChannel) {
		if (session.getTextMessageSizeLimit() < MINIMUM_WEBSOCKET_MESSAGE_SIZE) {
			session.setTextMessageSizeLimit(MINIMUM_WEBSOCKET_MESSAGE_SIZE);
		}
		this.decoders.put(session.getId(), new BufferingStompDecoder(this.stompDecoder, getMessageSizeLimit()));
	}

```

### WebSocketHttpRequestHandler

- HttpRequestHandler
- ExceptionWebSocketHandlerDecorator

```java
/**
 * A {@link HttpRequestHandler} for processing WebSocket handshake requests.
 *
 * <p>This is the main class to use when configuring a server WebSocket at a specific URL.
 * It is a very thin wrapper around a {@link WebSocketHandler} and a {@link HandshakeHandler},
 * also adapting the {@link HttpServletRequest} and {@link HttpServletResponse} to
 * {@link ServerHttpRequest} and {@link ServerHttpResponse}, respectively.
 */
public class WebSocketHttpRequestHandler implements HttpRequestHandler, Lifecycle, ServletContextAware {

	public WebSocketHttpRequestHandler(WebSocketHandler wsHandler, HandshakeHandler handshakeHandler) {
		this.wsHandler = decorate(wsHandler);
		this.handshakeHandler = handshakeHandler;
	}

	protected WebSocketHandler decorate(WebSocketHandler handler) {
		return new ExceptionWebSocketHandlerDecorator(new LoggingWebSocketHandlerDecorator(handler));
	}

	public void handleRequest(HttpServletRequest servletRequest, HttpServletResponse servletResponse)
			throws ServletException, IOException {

			this.handshakeHandler.doHandshake(request, response, this.wsHandler, attributes);					
```

### AbstractHandshakeHandler

```java
	public final boolean doHandshake(ServerHttpRequest request, ServerHttpResponse response,
			WebSocketHandler wsHandler, Map<String, Object> attributes) throws HandshakeFailureException {

		this.requestUpgradeStrategy.upgrade(request, response, subProtocol, extensions, user, wsHandler, attributes);				
```

### SubProtocolWebSocketHandler

- 接收方向WebSocketHandler
	-> `handleMessage(WebSocketSession session, WebSocketMessage<?> message)`
	-> clientInboundChannel 
	-> Subscriber
- 发送方向clientOutboundChannel 
	-> Subscriber 
	-> `handleMessage(Message<?> message)` 
	-> `findProtocolHandler(session).handleMessageToClient(session, message)`

```java
/**
 * An implementation of {@link WebSocketHandler} that delegates incoming WebSocket
 * messages to a {@link SubProtocolHandler} along with a {@link MessageChannel} to which
 * the sub-protocol handler can send messages from WebSocket clients to the application.
 *
 * <p>Also an implementation of {@link MessageHandler} that finds the WebSocket session
 * associated with the {@link Message} and passes it, along with the message, to the
 * sub-protocol handler to send messages from the application back to the client.
 */
public class SubProtocolWebSocketHandler
		implements WebSocketHandler, SubProtocolCapable, MessageHandler, SmartLifecycle {

	public final void start() {

			this.clientOutboundChannel.subscribe(this);

	public void afterConnectionEstablished(WebSocketSession session) throws Exception {

		session = decorateSession(session);
		this.sessions.put(session.getId(), new WebSocketSessionHolder(session));
		findProtocolHandler(session).afterSessionStarted(session, this.clientInboundChannel);
											
	public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) throws Exception {
		WebSocketSessionHolder holder = this.sessions.get(session.getId());

		SubProtocolHandler protocolHandler = findProtocolHandler(session);
		protocolHandler.handleMessageFromClient(session, message, this.clientInboundChannel);

	public void handleMessage(Message<?> message) throws MessagingException {
		String sessionId = resolveSessionId(message);		

		WebSocketSessionHolder holder = this.sessions.get(sessionId);

		WebSocketSession session = holder.getSession();

		findProtocolHandler(session).handleMessageToClient(session, message);

	public void afterConnectionClosed(WebSocketSession session, CloseStatus closeStatus) throws Exception {
		clearSession(session, closeStatus);
	}				
```

### WebSocketHandler

```java
/**
 * A handler for WebSocket messages and lifecycle events.
 *
 * <p>Implementations of this interface are encouraged to handle exceptions locally where
 * it makes sense or alternatively let the exception bubble up in which case by default
 * the exception is logged and the session closed with
 * {@link CloseStatus#SERVER_ERROR SERVER_ERROR(1011)}. The exception handling
 * strategy is provided by
 * {@link org.springframework.web.socket.handler.ExceptionWebSocketHandlerDecorator
 * ExceptionWebSocketHandlerDecorator} and it can be customized or replaced by decorating
 * the {@link WebSocketHandler} with a different decorator.
 */
public interface WebSocketHandler {

	/**
	 * Invoked after WebSocket negotiation has succeeded and the WebSocket connection is
	 * opened and ready for use.
	 * @throws Exception this method can handle or propagate exceptions; see class-level
	 * Javadoc for details.
	 */
	void afterConnectionEstablished(WebSocketSession session) throws Exception;

	/**
	 * Invoked when a new WebSocket message arrives.
	 * @throws Exception this method can handle or propagate exceptions; see class-level
	 * Javadoc for details.
	 */
	void handleMessage(WebSocketSession session, WebSocketMessage<?> message) throws Exception;

	/**
	 * Handle an error from the underlying WebSocket message transport.
	 * @throws Exception this method can handle or propagate exceptions; see class-level
	 * Javadoc for details.
	 */
	void handleTransportError(WebSocketSession session, Throwable exception) throws Exception;

	/**
	 * Invoked after the WebSocket connection has been closed by either side, or after a
	 * transport error has occurred. Although the session may technically still be open,
	 * depending on the underlying implementation, sending messages at this point is
	 * discouraged and most likely will not succeed.
	 * @throws Exception this method can handle or propagate exceptions; see class-level
	 * Javadoc for details.
	 */
	void afterConnectionClosed(WebSocketSession session, CloseStatus closeStatus) throws Exception;

	/**
	 * Whether the WebSocketHandler handles partial messages. If this flag is set to
	 * {@code true} and the underlying WebSocket server supports partial messages,
	 * then a large WebSocket message, or one of an unknown size may be split and
	 * maybe received over multiple calls to
	 * {@link #handleMessage(WebSocketSession, WebSocketMessage)}. The flag
	 * {@link org.springframework.web.socket.WebSocketMessage#isLast()} indicates if
	 * the message is partial and whether it is the last part.
	 */
	boolean supportsPartialMessages();

}
```

### WebSocketSession

```java
/**
 * A WebSocket session abstraction. Allows sending messages over a WebSocket
 * connection and closing it.
 */
public interface WebSocketSession extends Closeable {

	/**
	 * Return a unique session identifier.
	 */
	String getId();

	/**
	 * Return the URI used to open the WebSocket connection.
	 */
	@Nullable
	URI getUri();

	/**
	 * Return the headers used in the handshake request (never {@code null}).
	 */
	HttpHeaders getHandshakeHeaders();

	/**
	 * Return the map with attributes associated with the WebSocket session.
	 * <p>On the server side the map can be populated initially through a
	 * {@link org.springframework.web.socket.server.HandshakeInterceptor
	 * HandshakeInterceptor}. On the client side the map can be populated via
	 * {@link org.springframework.web.socket.client.WebSocketClient
	 * WebSocketClient} handshake methods.
	 * @return a Map with the session attributes (never {@code null})
	 */
	Map<String, Object> getAttributes();

	/**
	 * Return a {@link java.security.Principal} instance containing the name
	 * of the authenticated user.
	 * <p>If the user has not been authenticated, the method returns <code>null</code>.
	 */
	@Nullable
	Principal getPrincipal();

	/**
	 * Return the address on which the request was received.
	 */
	@Nullable
	InetSocketAddress getLocalAddress();

	/**
	 * Return the address of the remote client.
	 */
	@Nullable
	InetSocketAddress getRemoteAddress();

	/**
	 * Return the negotiated sub-protocol.
	 * @return the protocol identifier, or {@code null} if no protocol
	 * was specified or negotiated successfully
	 */
	@Nullable
	String getAcceptedProtocol();

	/**
	 * Configure the maximum size for an incoming text message.
	 */
	void setTextMessageSizeLimit(int messageSizeLimit);

	/**
	 * Get the configured maximum size for an incoming text message.
	 */
	int getTextMessageSizeLimit();

	/**
	 * Configure the maximum size for an incoming binary message.
	 */
	void setBinaryMessageSizeLimit(int messageSizeLimit);

	/**
	 * Get the configured maximum size for an incoming binary message.
	 */
	int getBinaryMessageSizeLimit();

	/**
	 * Determine the negotiated extensions.
	 * @return the list of extensions, or an empty list if no extension
	 * was specified or negotiated successfully
	 */
	List<WebSocketExtension> getExtensions();

	/**
	 * Send a WebSocket message: either {@link TextMessage} or {@link BinaryMessage}.
	 * <p><strong>Note:</strong> The underlying standard WebSocket session (JSR-356) does
	 * not allow concurrent sending. Therefore sending must be synchronized. To ensure
	 * that, one option is to wrap the {@code WebSocketSession} with the
	 * {@link org.springframework.web.socket.handler.ConcurrentWebSocketSessionDecorator
	 * ConcurrentWebSocketSessionDecorator}.
	 * @see org.springframework.web.socket.handler.ConcurrentWebSocketSessionDecorator
	 */
	void sendMessage(WebSocketMessage<?> message) throws IOException;

	/**
	 * Whether the underlying connection is open.
	 */
	boolean isOpen();

	/**
	 * Close the WebSocket connection with status 1000, i.e. equivalent to:
	 * <pre class="code">
	 * session.close(CloseStatus.NORMAL);
	 * </pre>
	 */
	@Override
	void close() throws IOException;

	/**
	 * Close the WebSocket connection with the given close status.
	 */
	void close(CloseStatus status) throws IOException;

}
```

### WebSocketAnnotationMethodMessageHandler

- ControllerAdvice
- MessageExceptionHandler

```java
/**
 * A sub-class of {@link SimpAnnotationMethodMessageHandler} to provide support
 * for {@link org.springframework.web.bind.annotation.ControllerAdvice
 * ControllerAdvice} with global {@code @MessageExceptionHandler} methods.
 */
public class WebSocketAnnotationMethodMessageHandler extends SimpAnnotationMethodMessageHandler {
```

### AbstractMessageBrokerConfiguration

```java
/*
Provides essential configuration for handling messages with simple messaging protocols such as STOMP.
clientInboundChannel and clientOutboundChannel deliver messages to and from remote clients to several message handlers such as the following.
simpAnnotationMethodMessageHandler
simpleBrokerMessageHandler
stompBrokerRelayMessageHandler
userDestinationMessageHandler
brokerChannel delivers messages from within the application to the respective message handlers. brokerMessagingTemplate can be injected into any application component to send messages.
Subclasses are responsible for the parts of the configuration that feed messages to and from the client inbound/outbound channels (e.g. STOMP over WebSocket).
*/
public abstract class AbstractMessageBrokerConfiguration implements ApplicationContextAware {
```

### clientInboundChannel

```java
	@Bean
	public AbstractSubscribableChannel clientInboundChannel(TaskExecutor clientInboundChannelExecutor) {
		ExecutorSubscribableChannel channel = new ExecutorSubscribableChannel(clientInboundChannelExecutor);
		channel.setLogger(SimpLogging.forLog(channel.getLogger()));
		ChannelRegistration reg = getClientInboundChannelRegistration();
		if (reg.hasInterceptors()) {
			channel.setInterceptors(reg.getInterceptors());
		}
		return channel;
	}
```

### clientInboundChannelExecutor

```java
	@Bean
	public TaskExecutor clientInboundChannelExecutor() {
		TaskExecutorRegistration reg = getClientInboundChannelRegistration().taskExecutor();
		ThreadPoolTaskExecutor executor = reg.getTaskExecutor();
		executor.setThreadNamePrefix("clientInboundChannel-");
		return executor;
	}
```

### clientOutboundChannel

```java
	@Bean
	public AbstractSubscribableChannel clientOutboundChannel(TaskExecutor clientOutboundChannelExecutor) {
		ExecutorSubscribableChannel channel = new ExecutorSubscribableChannel(clientOutboundChannelExecutor);
		channel.setLogger(SimpLogging.forLog(channel.getLogger()));
		ChannelRegistration reg = getClientOutboundChannelRegistration();
		if (reg.hasInterceptors()) {
			channel.setInterceptors(reg.getInterceptors());
		}
		return channel;
	}
```

### clientOutboundChannelExecutor

```java
	@Bean
	public TaskExecutor clientOutboundChannelExecutor() {
		TaskExecutorRegistration reg = getClientOutboundChannelRegistration().taskExecutor();
		ThreadPoolTaskExecutor executor = reg.getTaskExecutor();
		executor.setThreadNamePrefix("clientOutboundChannel-");
		return executor;
	}
```

### brokerChannel

```java
	public AbstractSubscribableChannel brokerChannel(AbstractSubscribableChannel clientInboundChannel,
			AbstractSubscribableChannel clientOutboundChannel, TaskExecutor brokerChannelExecutor) {

		MessageBrokerRegistry registry = getBrokerRegistry(clientInboundChannel, clientOutboundChannel);
		ChannelRegistration registration = registry.getBrokerChannelRegistration();
		ExecutorSubscribableChannel channel = (registration.hasTaskExecutor() ?
				new ExecutorSubscribableChannel(brokerChannelExecutor) : new ExecutorSubscribableChannel());
		registration.interceptors(new ImmutableMessageChannelInterceptor());
		channel.setLogger(SimpLogging.forLog(channel.getLogger()));
		channel.setInterceptors(registration.getInterceptors());
		return channel;
	}
```

### brokerChannelExecutor

```java
	public TaskExecutor brokerChannelExecutor(
			AbstractSubscribableChannel clientInboundChannel, AbstractSubscribableChannel clientOutboundChannel) {

		MessageBrokerRegistry registry = getBrokerRegistry(clientInboundChannel, clientOutboundChannel);
		ChannelRegistration registration = registry.getBrokerChannelRegistration();
		ThreadPoolTaskExecutor executor;
		if (registration.hasTaskExecutor()) {
			executor = registration.taskExecutor().getTaskExecutor();
		}
		else {
			// Should never be used
			executor = new ThreadPoolTaskExecutor();
			executor.setCorePoolSize(0);
			executor.setMaxPoolSize(1);
			executor.setQueueCapacity(0);
		}
		executor.setThreadNamePrefix("brokerChannel-");
		return executor;
	}
```

### simpAnnotationMethodMessageHandler

```java
	public SimpAnnotationMethodMessageHandler simpAnnotationMethodMessageHandler(
			AbstractSubscribableChannel clientInboundChannel, AbstractSubscribableChannel clientOutboundChannel,
			SimpMessagingTemplate brokerMessagingTemplate, CompositeMessageConverter brokerMessageConverter) {

		SimpAnnotationMethodMessageHandler handler = createAnnotationMethodMessageHandler(
						clientInboundChannel, clientOutboundChannel, brokerMessagingTemplate);

		MessageBrokerRegistry brokerRegistry = getBrokerRegistry(clientInboundChannel, clientOutboundChannel);
		handler.setDestinationPrefixes(brokerRegistry.getApplicationDestinationPrefixes());
		handler.setMessageConverter(brokerMessageConverter);
		handler.setValidator(simpValidator());

		List<HandlerMethodArgumentResolver> argumentResolvers = new ArrayList<>();
		addArgumentResolvers(argumentResolvers);
		handler.setCustomArgumentResolvers(argumentResolvers);

		List<HandlerMethodReturnValueHandler> returnValueHandlers = new ArrayList<>();
		addReturnValueHandlers(returnValueHandlers);
		handler.setCustomReturnValueHandlers(returnValueHandlers);

		PathMatcher pathMatcher = brokerRegistry.getPathMatcher();
		if (pathMatcher != null) {
			handler.setPathMatcher(pathMatcher);
		}
		return handler;
	}
```

```java
/**
 * A handler for messages delegating to {@link MessageMapping @MessageMapping}
 * and {@link SubscribeMapping @SubscribeMapping} annotated methods.
 *
 * <p>Supports Ant-style path patterns with template variables.
 */
public class SimpAnnotationMethodMessageHandler extends AbstractMethodMessageHandler<SimpMessageMappingInfo>
		implements EmbeddedValueResolverAware, SmartLifecycle {

	private final SubscribableChannel clientInboundChannel;

	private final SimpMessageSendingOperations clientMessagingTemplate;

	private final SimpMessageSendingOperations brokerTemplate;

	private MessageConverter messageConverter;

	private ConversionService conversionService = new DefaultFormattingConversionService();

	private PathMatcher pathMatcher = new AntPathMatcher();

	public SimpAnnotationMethodMessageHandler(SubscribableChannel clientInboundChannel,
			MessageChannel clientOutboundChannel, SimpMessageSendingOperations brokerTemplate) {

		this.clientInboundChannel = clientInboundChannel;
		this.clientMessagingTemplate = new SimpMessagingTemplate(clientOutboundChannel);
		this.brokerTemplate = brokerTemplate;

	public final void start() {
		synchronized (this.lifecycleMonitor) {
			this.clientInboundChannel.subscribe(this);
			this.running = true;
		}
	}

	protected List<HandlerMethodArgumentResolver> initArgumentResolvers() {
		ApplicationContext context = getApplicationContext();
		ConfigurableBeanFactory beanFactory = (context instanceof ConfigurableApplicationContext ?
				((ConfigurableApplicationContext) context).getBeanFactory() : null);

		List<HandlerMethodArgumentResolver> resolvers = new ArrayList<>();

		// Annotation-based argument resolution
		resolvers.add(new HeaderMethodArgumentResolver(this.conversionService, beanFactory));
		resolvers.add(new HeadersMethodArgumentResolver());
		resolvers.add(new DestinationVariableMethodArgumentResolver(this.conversionService));

		// Type-based argument resolution
		resolvers.add(new PrincipalMethodArgumentResolver());
		resolvers.add(new MessageMethodArgumentResolver(this.messageConverter));

		resolvers.addAll(getCustomArgumentResolvers());
		resolvers.add(new PayloadMethodArgumentResolver(this.messageConverter, this.validator));

		return resolvers;
	}	
```

### AbstractMethodMessageHandler

```java
	public void handleMessage(Message<?> message) throws MessagingException {

		String destination = getDestination(message);

		String lookupDestination = getLookupDestination(destination);
		if (lookupDestination == null) {
			return;
		}			

		handleMessageInternal(message, lookupDestination);

	protected void handleMessageInternal(Message<?> message, String lookupDestination) {

		handleMatch(bestMatch.mapping, bestMatch.handlerMethod, lookupDestination, message);

	protected void handleMatch(T mapping, HandlerMethod handlerMethod, String lookupDestination, Message<?> message) {

		InvocableHandlerMethod invocable = new InvocableHandlerMethod(handlerMethod);

		invocable.setMessageMethodArgumentResolvers(this.argumentResolvers);

			Object returnValue = invocable.invoke(message);
			MethodParameter returnType = handlerMethod.getReturnType();
			if (void.class == returnType.getParameterType()) {
				return;
			}
			if (returnValue != null && this.returnValueHandlers.isAsyncReturnValue(returnValue, returnType)) {
				ListenableFuture<?> future = this.returnValueHandlers.toListenableFuture(returnValue, returnType);
				if (future != null) {
					future.addCallback(new ReturnValueListenableFutureCallback(invocable, message));
				}
			}
			else {
				this.returnValueHandlers.handleReturnValue(returnValue, returnType, message);
			}															
```

### simpleBrokerMessageHandler

```java
	public AbstractBrokerMessageHandler simpleBrokerMessageHandler(
			AbstractSubscribableChannel clientInboundChannel, AbstractSubscribableChannel clientOutboundChannel,
			AbstractSubscribableChannel brokerChannel, UserDestinationResolver userDestinationResolver) {

		MessageBrokerRegistry registry = getBrokerRegistry(clientInboundChannel, clientOutboundChannel);
		SimpleBrokerMessageHandler handler = registry.getSimpleBroker(brokerChannel);
		if (handler == null) {
			return null;
		}
		updateUserDestinationResolver(handler, userDestinationResolver, registry.getUserDestinationPrefix());
		return handler;
	}
```

### brokerMessageConverter

```java
	public CompositeMessageConverter brokerMessageConverter() {
		List<MessageConverter> converters = new ArrayList<>();
		boolean registerDefaults = configureMessageConverters(converters);
		if (registerDefaults) {
			converters.add(new StringMessageConverter());
			converters.add(new ByteArrayMessageConverter());
			if (jackson2Present) {
				converters.add(createJacksonConverter());
			}
		}
		return new CompositeMessageConverter(converters);
	}
```

### brokerMessagingTemplate

```java
	@Bean
	public SimpMessagingTemplate brokerMessagingTemplate(
			AbstractSubscribableChannel brokerChannel, AbstractSubscribableChannel clientInboundChannel,
			AbstractSubscribableChannel clientOutboundChannel, CompositeMessageConverter brokerMessageConverter) {

		SimpMessagingTemplate template = new SimpMessagingTemplate(brokerChannel);

		template.setMessageConverter(brokerMessageConverter);		
```

### MessageBrokerRegistry

```java
/**
 * A registry for configuring message broker options.
 */
public class MessageBrokerRegistry {

	private final SubscribableChannel clientInboundChannel;

	private final MessageChannel clientOutboundChannel;

	@Nullable
	private SimpleBrokerRegistration simpleBrokerRegistration;


	/**
	 * Enable a simple message broker and configure one or more prefixes to filter
	 * destinations targeting the broker (e.g. destinations prefixed with "/topic").
	 */
	public SimpleBrokerRegistration enableSimpleBroker(String... destinationPrefixes) {
		this.simpleBrokerRegistration = new SimpleBrokerRegistration(
				this.clientInboundChannel, this.clientOutboundChannel, destinationPrefixes);
		return this.simpleBrokerRegistration;
	}    


	/**
	 * Configure one or more prefixes to filter destinations targeting application
	 * annotated methods. For example destinations prefixed with "/app" may be
	 * processed by annotated methods while other destinations may target the
	 * message broker (e.g. "/topic", "/queue").
	 * <p>When messages are processed, the matching prefix is removed from the destination
	 * in order to form the lookup path. This means annotations should not contain the
	 * destination prefix.
	 * <p>Prefixes that do not have a trailing slash will have one automatically appended.
	 */
	public MessageBrokerRegistry setApplicationDestinationPrefixes(String... prefixes) {
		this.applicationDestinationPrefixes = prefixes;
		return this;
	}

	/**
	 * Configure the prefix used to identify user destinations. User destinations
	 * provide the ability for a user to subscribe to queue names unique to their
	 * session as well as for others to send messages to those unique,
	 * user-specific queues.
	 * <p>For example when a user attempts to subscribe to "/user/queue/position-updates",
	 * the destination may be translated to "/queue/position-updatesi9oqdfzo" yielding a
	 * unique queue name that does not collide with any other user attempting to do the same.
	 * Subsequently when messages are sent to "/user/{username}/queue/position-updates",
	 * the destination is translated to "/queue/position-updatesi9oqdfzo".
	 * <p>The default prefix used to identify such destinations is "/user/".
	 */
	public MessageBrokerRegistry setUserDestinationPrefix(String destinationPrefix) {
		this.userDestinationPrefix = destinationPrefix;
		return this;
	}

	@Nullable
	protected SimpleBrokerMessageHandler getSimpleBroker(SubscribableChannel brokerChannel) {
		if (this.simpleBrokerRegistration == null && this.brokerRelayRegistration == null) {
			enableSimpleBroker();
		}
		if (this.simpleBrokerRegistration != null) {
			SimpleBrokerMessageHandler handler = this.simpleBrokerRegistration.getMessageHandler(brokerChannel);
			handler.setPathMatcher(this.pathMatcher);
			handler.setCacheLimit(this.cacheLimit);
			handler.setPreservePublishOrder(this.preservePublishOrder);
			return handler;
		}
		return null;
	}  
```

### SimpleBrokerRegistration

```java
	@Override
	protected SimpleBrokerMessageHandler getMessageHandler(SubscribableChannel brokerChannel) {
		SimpleBrokerMessageHandler handler = new SimpleBrokerMessageHandler(getClientInboundChannel(),
				getClientOutboundChannel(), brokerChannel, getDestinationPrefixes());
		if (this.taskScheduler != null) {
			handler.setTaskScheduler(this.taskScheduler);
		}
		if (this.heartbeat != null) {
			handler.setHeartbeatValue(this.heartbeat);
		}
		handler.setSelectorHeaderName(this.selectorHeaderName);
		return handler;
	}
```

### AbstractBrokerRegistration

```java
/**
 * Base class for message broker registration classes.
 */
public abstract class AbstractBrokerRegistration {

	private final SubscribableChannel clientInboundChannel;

	private final MessageChannel clientOutboundChannel;

	private final List<String> destinationPrefixes;

	protected abstract AbstractBrokerMessageHandler getMessageHandler(SubscribableChannel brokerChannel);  
```

### SimpleBrokerMessageHandler

- heartbeat
- subscription
- sessions

```java
	@Nullable
	private TaskScheduler taskScheduler;

	@Nullable
	private long[] heartbeatValue;

	@Nullable
	private MessageHeaderInitializer headerInitializer;


	private SubscriptionRegistry subscriptionRegistry;

	private final Map<String, SessionInfo> sessions = new ConcurrentHashMap<>();

	@Nullable
	private ScheduledFuture<?> heartbeatFuture;

	public void setTaskScheduler(@Nullable TaskScheduler taskScheduler) {
		this.taskScheduler = taskScheduler;
		if (taskScheduler != null && this.heartbeatValue == null) {
			this.heartbeatValue = new long[] {10000, 10000};
		}
	}

	@Override
	public void startInternal() {
		publishBrokerAvailableEvent();
		if (this.taskScheduler != null) {
			long interval = initHeartbeatTaskDelay();
			if (interval > 0) {
				this.heartbeatFuture = this.taskScheduler.scheduleWithFixedDelay(new HeartbeatTask(), interval);
			}
		}

	protected void handleMessageInternal(Message<?> message) {
		MessageHeaders headers = message.getHeaders();
		String destination = SimpMessageHeaderAccessor.getDestination(headers);
		String sessionId = SimpMessageHeaderAccessor.getSessionId(headers);

		updateSessionReadTime(sessionId);

		if (!checkDestinationPrefix(destination)) {
			return;
		}

		SimpMessageType messageType = SimpMessageHeaderAccessor.getMessageType(headers);
		if (SimpMessageType.MESSAGE.equals(messageType)) {
			logMessage(message);
			sendMessageToSubscribers(destination, message);
		}
		else if (SimpMessageType.CONNECT.equals(messageType)) {
			logMessage(message);
			if (sessionId != null) {
				long[] heartbeatIn = SimpMessageHeaderAccessor.getHeartbeat(headers);
				long[] heartbeatOut = getHeartbeatValue();
				Principal user = SimpMessageHeaderAccessor.getUser(headers);
				MessageChannel outChannel = getClientOutboundChannelForSession(sessionId);
				this.sessions.put(sessionId, new SessionInfo(sessionId, user, outChannel, heartbeatIn, heartbeatOut));
				SimpMessageHeaderAccessor connectAck = SimpMessageHeaderAccessor.create(SimpMessageType.CONNECT_ACK);
				initHeaders(connectAck);
				connectAck.setSessionId(sessionId);
				if (user != null) {
					connectAck.setUser(user);
				}
				connectAck.setHeader(SimpMessageHeaderAccessor.CONNECT_MESSAGE_HEADER, message);
				connectAck.setHeader(SimpMessageHeaderAccessor.HEART_BEAT_HEADER, heartbeatOut);
				Message<byte[]> messageOut = MessageBuilder.createMessage(EMPTY_PAYLOAD, connectAck.getMessageHeaders());
				getClientOutboundChannel().send(messageOut);
			}
		}
		else if (SimpMessageType.DISCONNECT.equals(messageType)) {
			logMessage(message);
			if (sessionId != null) {
				Principal user = SimpMessageHeaderAccessor.getUser(headers);
				handleDisconnect(sessionId, user, message);
			}
		}
		else if (SimpMessageType.SUBSCRIBE.equals(messageType)) {
			logMessage(message);
			this.subscriptionRegistry.registerSubscription(message);
		}
		else if (SimpMessageType.UNSUBSCRIBE.equals(messageType)) {
			logMessage(message);
			this.subscriptionRegistry.unregisterSubscription(message);
		}
	}      

	protected void sendMessageToSubscribers(@Nullable String destination, Message<?> message) {

		subscriptions.forEach((sessionId, subscriptionIds) -> {
			for (String subscriptionId : subscriptionIds) {
				SimpMessageHeaderAccessor headerAccessor = SimpMessageHeaderAccessor.create(SimpMessageType.MESSAGE);
				initHeaders(headerAccessor);
				headerAccessor.setSessionId(sessionId);
				headerAccessor.setSubscriptionId(subscriptionId);
				headerAccessor.copyHeadersIfAbsent(message.getHeaders());
				headerAccessor.setLeaveMutable(true);
				Object payload = message.getPayload();
				Message<?> reply = MessageBuilder.createMessage(payload, headerAccessor.getMessageHeaders());
				SessionInfo info = this.sessions.get(sessionId);

						info.getClientOutboundChannel().send(reply);				

```

### DefaultSubscriptionRegistry

```java
/**
 * Implementation of {@link SubscriptionRegistry} that stores subscriptions
 * in memory and uses a {@link org.springframework.util.PathMatcher PathMatcher}
 * for matching destinations.
 *
 * <p>As of 4.2, this class supports a {@link #setSelectorHeaderName selector}
 * header on subscription messages with Spring EL expressions evaluated against
 * the headers to filter out messages in addition to destination matching.
 */
public class DefaultSubscriptionRegistry extends AbstractSubscriptionRegistry {

  private PathMatcher pathMatcher = new AntPathMatcher();

  private final SessionRegistry sessionRegistry = new SessionRegistry();

	@Override
	protected void addSubscriptionInternal(
			String sessionId, String subscriptionId, String destination, Message<?> message) {

		boolean isPattern = this.pathMatcher.isPattern(destination);
		Expression expression = getSelectorExpression(message.getHeaders());
		Subscription subscription = new Subscription(subscriptionId, destination, isPattern, expression);

		this.sessionRegistry.addSubscription(sessionId, subscription);
		this.destinationCache.updateAfterNewSubscription(sessionId, subscription);
	}  
```

### AbstractSubscriptionRegistry

```java
/**
 * Abstract base class for implementations of {@link SubscriptionRegistry} that
 * looks up information in messages but delegates to abstract methods for the
 * actual storage and retrieval.
 */
public abstract class AbstractSubscriptionRegistry implements SubscriptionRegistry {

	@Override
	public final void registerSubscription(Message<?> message) {

    String sessionId = SimpMessageHeaderAccessor.getSessionId(headers);

    String subscriptionId = SimpMessageHeaderAccessor.getSubscriptionId(headers);

    String destination = SimpMessageHeaderAccessor.getDestination(headers);

    addSubscriptionInternal(sessionId, subscriptionId, destination, message);

	@Override
	public final MultiValueMap<String, String> findSubscriptions(Message<?> message) {

    String destination = SimpMessageHeaderAccessor.getDestination(headers);

    return findSubscriptionsInternal(destination, message);      
```

### SubscriptionRegistry

```java
/**
 * A registry of subscription by session that allows looking up subscriptions.
 */
public interface SubscriptionRegistry {

	/**
	 * Register a subscription represented by the given message.
	 * @param subscribeMessage the subscription request
	 */
	void registerSubscription(Message<?> subscribeMessage);

	/**
	 * Unregister a subscription.
	 * @param unsubscribeMessage the request to unsubscribe
	 */
	void unregisterSubscription(Message<?> unsubscribeMessage);

	/**
	 * Remove all subscriptions associated with the given sessionId.
	 */
	void unregisterAllSubscriptions(String sessionId);

	/**
	 * Find all subscriptions that should receive the given message.
	 * The map returned is safe to iterate and will never be modified.
	 * @param message the message
	 * @return a {@code MultiValueMap} with sessionId-subscriptionId pairs
	 * (possibly empty)
	 */
	MultiValueMap<String, String> findSubscriptions(Message<?> message);

}
```

### AbstractBrokerMessageHandler

```java

	/**
	 * Constructor with destination prefixes to match to destinations of messages.
	 * @param inboundChannel the channel for receiving messages from clients (e.g. WebSocket clients)
	 * @param outboundChannel the channel for sending messages to clients (e.g. WebSocket clients)
	 * @param brokerChannel the channel for the application to send messages to the broker
	 * @param destinationPrefixes prefixes to use to filter out messages
	 */
	public AbstractBrokerMessageHandler(SubscribableChannel inboundChannel, MessageChannel outboundChannel,
			SubscribableChannel brokerChannel, @Nullable Collection<String> destinationPrefixes) {

	public void start() {
		synchronized (this.lifecycleMonitor) {
			logger.info("Starting...");
			this.clientInboundChannel.subscribe(this);
			this.brokerChannel.subscribe(this);
			if (this.clientInboundChannel instanceof InterceptableChannel) {
				((InterceptableChannel) this.clientInboundChannel).addInterceptor(0, this.unsentDisconnectInterceptor);
			}
			startInternal();
			this.running = true;
			logger.info("Started.");
		}
	}

	@Override
	public void handleMessage(Message<?> message) {
		if (!this.running) {
			if (logger.isTraceEnabled()) {
				logger.trace(this + " not running yet. Ignoring " + message);
			}
			return;
		}
		handleMessageInternal(message);
	}

	protected abstract void handleMessageInternal(Message<?> message);          
```        

### ExecutorSubscribableChannel

```java
/**
 * A {@link SubscribableChannel} that sends messages to each of its subscribers.
 */
public class ExecutorSubscribableChannel extends AbstractSubscribableChannel {

	@Nullable
	private final Executor executor;

	private final List<ExecutorChannelInterceptor> executorInterceptors = new ArrayList<>(4);

	public boolean sendInternal(Message<?> message, long timeout) {
		for (MessageHandler handler : getSubscribers()) {
			SendTask sendTask = new SendTask(message, handler);
			if (this.executor == null) {
				sendTask.run();
			}
			else {
				this.executor.execute(sendTask);
			}
		}
		return true;
	}
```

### ExecutorChannelInterceptor

```java

/**
 * An extension of {@link ChannelInterceptor} with callbacks to intercept the
 * asynchronous sending of a {@link org.springframework.messaging.Message} to
 * a specific subscriber through an {@link java.util.concurrent.Executor}.
 * Supported on {@link org.springframework.messaging.MessageChannel}
 * implementations that can be configured with an {@code Executor}.
 * @see Message
 * @see MessageChannel
 * @see MessageHandler
 */
public interface ExecutorChannelInterceptor extends ChannelInterceptor {

	/**
	 * Invoked inside the {@link Runnable} submitted to the Executor just before
	 * calling the target MessageHandler to handle the message. Allows for
	 * modification of the Message if necessary or when {@code null} is returned
	 * the MessageHandler is not invoked.
	 * @param message the message to be handled
	 * @param channel the channel on which the message was sent to
	 * @param handler the target handler to handle the message
	 * @return the input message, or a new instance, or {@code null}
	 */
	@Nullable
	default Message<?> beforeHandle(Message<?> message, MessageChannel channel, MessageHandler handler) {
		return message;
	}

	/**
	 * Invoked inside the {@link Runnable} submitted to the Executor after calling
	 * the target MessageHandler regardless of the outcome (i.e. Exception raised
	 * or not) thus allowing for proper resource cleanup.
	 * <p>Note that this will be invoked only if beforeHandle successfully completed
	 * and returned a Message, i.e. it did not return {@code null}.
	 * @param message the message handled
	 * @param channel the channel on which the message was sent to
	 * @param handler the target handler that handled the message
	 * @param ex any exception that may been raised by the handler
	 */
	default void afterMessageHandled(Message<?> message, MessageChannel channel, MessageHandler handler,
			@Nullable Exception ex) {
	}
}
```

### MessageHandler

```java
/**
 * Simple contract for handling a {@link Message}.
 * @see ReactiveMessageHandler
 */
@FunctionalInterface
public interface MessageHandler {

	/**
	 * Handle the given message.
	 * @param message the message to be handled
	 * @throws MessagingException if the handler failed to process the message
	 */
	void handleMessage(Message<?> message) throws MessagingException;

}
```

### AbstractSubscribableChannel

```java

/**
 * Abstract base class for {@link SubscribableChannel} implementations.
 */
public abstract class AbstractSubscribableChannel extends AbstractMessageChannel implements SubscribableChannel {

	private final Set<MessageHandler> handlers = new CopyOnWriteArraySet<>();
```

### SubscribableChannel

```java
/**
 * A {@link MessageChannel} that maintains a registry of subscribers and invokes
 * them to handle messages sent through this channel.
 */
public interface SubscribableChannel extends MessageChannel {

	/**
	 * Register a message handler.
	 * @return {@code true} if the handler was subscribed or {@code false} if it
	 * was already subscribed.
	 */
	boolean subscribe(MessageHandler handler);

	/**
	 * Un-register a message handler.
	 * @return {@code true} if the handler was un-registered, or {@code false}
	 * if was not registered.
	 */
	boolean unsubscribe(MessageHandler handler);

}
```

### AbstractMessageChannel

管理interceptors相关，包括消息发送时

```java
/**
 * Abstract base class for {@link MessageChannel} implementations.
 */
public abstract class AbstractMessageChannel implements MessageChannel, InterceptableChannel, BeanNameAware {

  private final List<ChannelInterceptor> interceptors = new   ArrayList<>(5);

	public final boolean send(Message<?> message, long timeout) {
		Assert.notNull(message, "Message must not be null");
		Message<?> messageToUse = message;
		ChannelInterceptorChain chain = new ChannelInterceptorChain();
		boolean sent = false;
		try {
			messageToUse = chain.applyPreSend(messageToUse, this);
			if (messageToUse == null) {
				return false;
			}
			sent = sendInternal(messageToUse, timeout);
			chain.applyPostSend(messageToUse, this, sent);
			chain.triggerAfterSendCompletion(messageToUse, this, sent, null);
			return sent;
		}
		catch (Exception ex) {
			chain.triggerAfterSendCompletion(messageToUse, this, sent, ex);
			if (ex instanceof MessagingException) {
				throw (MessagingException) ex;
			}
			throw new MessageDeliveryException(messageToUse,"Failed to send message to " + this, ex);
		}
		catch (Throwable err) {
			MessageDeliveryException ex2 =
					new MessageDeliveryException(messageToUse, "Failed to send message to " + this, err);
			chain.triggerAfterSendCompletion(messageToUse, this, sent, ex2);
			throw ex2;
		}
	}

	protected abstract boolean sendInternal(Message<?> message, long timeout);
```

### MessageDeliveryException

```java
/**
 * Exception that indicates an error occurred during message delivery.
 */
@SuppressWarnings("serial")
public class MessageDeliveryException extends MessagingException {
```

### ChannelInterceptorChain

管理interceptor chain的具体调用

### MessageChannel

```java
/*Defines methods for sending messages*/
@FunctionalInterface
public interface MessageChannel {

	default boolean send(Message<?> message) {
		return send(message, INDEFINITE_TIMEOUT);
	}

  boolean send(Message<?> message, long timeout);
```

### InterceptableChannel

```java
/*A MessageChannel that maintains a list ChannelInterceptors and allows interception of message sending.*/
public interface InterceptableChannel {

	/**
	 * Set the list of channel interceptors clearing any existing interceptors.
	 */
	void setInterceptors(List<ChannelInterceptor> interceptors);

	/**
	 * Add a channel interceptor to the end of the list.
	 */
	void addInterceptor(ChannelInterceptor interceptor);

	/**
	 * Add a channel interceptor at the specified index.
	 */
	void addInterceptor(int index, ChannelInterceptor interceptor);

	/**
	 * Return the list of configured interceptors.
	 */
	List<ChannelInterceptor> getInterceptors();

	/**
	 * Remove the given interceptor.
	 */
	boolean removeInterceptor(ChannelInterceptor interceptor);

	/**
	 * Remove the interceptor at the given index.
	 */
	ChannelInterceptor removeInterceptor(int index);
```


### ChannelInterceptor

```java
/**
 * Interface for interceptors that are able to view and/or modify the
 * {@link Message Messages} being sent-to and/or received-from a
 * {@link MessageChannel}.

 * @see Message
 * @see MessageChannel
 */
public interface ChannelInterceptor {

	/**
	 * Invoked before the Message is actually sent to the channel.
	 * This allows for modification of the Message if necessary.
	 * If this method returns {@code null} then the actual
	 * send invocation will not occur.
	 */
	@Nullable
	default Message<?> preSend(Message<?> message, MessageChannel channel) {
		return message;
	}

	/**
	 * Invoked immediately after the send invocation. The boolean
	 * value argument represents the return value of that invocation.
	 */
	default void postSend(Message<?> message, MessageChannel channel, boolean sent) {
	}

	/**
	 * Invoked after the completion of a send regardless of any exception that
	 * have been raised thus allowing for proper resource cleanup.
	 * <p>Note that this will be invoked only if {@link #preSend} successfully
	 * completed and returned a Message, i.e. it did not return {@code null}.
	 * @since 4.1
	 */
	default void afterSendCompletion(
			Message<?> message, MessageChannel channel, boolean sent, @Nullable Exception ex) {
	}

	/**
	 * Invoked as soon as receive is called and before a Message is
	 * actually retrieved. If the return value is 'false', then no
	 * Message will be retrieved. This only applies to PollableChannels.
	 */
	default boolean preReceive(MessageChannel channel) {
		return true;
	}

	/**
	 * Invoked immediately after a Message has been retrieved but before
	 * it is returned to the caller. The Message may be modified if
	 * necessary; {@code null} aborts further interceptor invocations.
	 * This only applies to PollableChannels.
	 */
	@Nullable
	default Message<?> postReceive(Message<?> message, MessageChannel channel) {
		return message;
	}

	/**
	 * Invoked after the completion of a receive regardless of any exception that
	 * have been raised thus allowing for proper resource cleanup.
	 * <p>Note that this will be invoked only if {@link #preReceive} successfully
	 * completed and returned {@code true}.
	 * @since 4.1
	 */
	default void afterReceiveCompletion(@Nullable Message<?> message, MessageChannel channel,
			@Nullable Exception ex) {
	}

}
```
