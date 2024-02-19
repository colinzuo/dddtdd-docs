

<https://docs.spring.io/spring-framework/docs/current/reference/pdf/web.pdf>

## WebSocketHandler

```java
import org.springframework.web.socket.WebSocketHandler; 
import org.springframework.web.socket.WebSocketSession; 
import org.springframework.web.socket.TextMessage; 

public class MyHandler extends TextWebSocketHandler {
  @Override
  public void handleTextMessage(WebSocketSession session, TextMessage message) {
    // ...
  } 
} 
```

```java
import org.springframework.web.socket.config.annotation.EnableWebSocket; 
import org.springframework.web.socket.config.annotation.WebSocketConfigurer; 
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration 
@EnableWebSocket 
public class WebSocketConfig implements WebSocketConfigurer {
  @Override
  public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
    registry.addHandler(myHandler(), "/myHandler")
      .setAllowedOrigins("https://mydomain.com");
  }
  
  @Bean
  public WebSocketHandler myHandler() {
    return new MyHandler();
  } 
} 
```

## WebSocket Handshake

```java
@Configuration 
@EnableWebSocket 
public class WebSocketConfig implements WebSocketConfigurer {
  @Override
  public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
    registry.addHandler(new MyHandler(), "/myHandler")
      .addInterceptors(new HttpSessionHandshakeInterceptor());
  } 
}
```

## Server Configuration

```java
@Configuration 
@EnableWebSocket 
public class WebSocketConfig implements WebSocketConfigurer {
  @Bean
  public ServletServerContainerFactoryBean createWebSocketContainer() {
    ServletServerContainerFactoryBean container = new ServletServerContainerFactoryBean();
    container.setMaxTextMessageBufferSize(8192);
    container.setMaxBinaryMessageBufferSize(8192);
    
    return container;
  } 
} 
```

## SockJS Fallback

On the Servlet stack, the Spring Framework provides both server (and also client) support for the SockJS protocol.

### Overview

All transport requests have the following URL structure: 

`https://host:port/myApp/myEndpoint/{server-id}/{session-id}/{transport} `

- {server-id} is useful for routing requests in a cluster but is not used otherwise. 
- {session-id} correlates HTTP requests belonging to a SockJS session. 
- {transport} indicates the transport type (for example, websocket, xhr-streaming, and others).

### Heartbeats

By default, a heartbeat is sent after 25 seconds, assuming no other messages were sent on that connection. This 25-second value is in line with the following IETF recommendation for public Internet applications. 

### SockJsClient

```java
List<Transport> transports = new ArrayList<>(2); 

transports.add(new WebSocketTransport(new StandardWebSocketClient())); 
transports.add(new RestTemplateXhrTransport()); 

SockJsClient sockJsClient = new SockJsClient(transports); 
sockJsClient.doHandshake(new MyWebSocketHandler(), 
  "ws://example.com:8080/sockjs"); 
```

## Stomp

### WebSocket Server

```java
@Configuration 
@EnableWebSocketMessageBroker 
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
  @Override
  public void registerStompEndpoints(StompEndpointRegistry registry) {
    registry.addEndpoint("/portfolio")
      .setHandshakeHandler(handshakeHandler());
  }
  
  @Bean
  public DefaultHandshakeHandler handshakeHandler() {
    WebSocketPolicy policy = new WebSocketPolicy(WebSocketBehavior.SERVER);
    policy.setInputBufferSize(8192);
    policy.setIdleTimeout(600000);
    
    return new DefaultHandshakeHandler(
      new JettyRequestUpgradeStrategy(
        new WebSocketServerFactory(policy)));
  } 
}
```

### Annotated Controllers

By default, the return value from a @MessageMapping  method is serialized to a payload through a matching MessageConverter and sent as a Message to the brokerChannel, from where it is broadcast to subscribers. The destination of the outbound message is the same as that of the inbound message but prefixed with /topic.

You can use the @SendTo  and @SendToUser  annotations to customize the destination of the output message. @SendTo  is used to customize the target destination or to specify multiple destinations. @SendToUser is used to direct the output message to only the user associated with the input message. See User Destinations. 

You can use both @SendTo  and @SendToUser  at the same time on the same method, and both are supported at the class level, in which case they act as a default for methods in the class. However, keep in mind that any method-level @SendTo  or @SendToUser  annotations override any such annotations at the class level

Messages can be handled asynchronously and a @MessageMapping method can return ListenableFuture, CompletableFuture, or CompletionStage.

Note that @SendTo and @SendToUser are merely a convenience that amounts to using the SimpMessagingTemplate to send messages. If necessary, for more advanced scenarios, @MessageMapping methods can fall back on using the SimpMessagingTemplate  directly. This can be done instead of, or possibly in addition to, returning a value. See Sending Messages. 

Typically, @MessageExceptionHandler methods apply within the @Controller class (or class hierarchy) in which they are declared. If you want such methods to apply more globally (across controllers), you can declare them in a class marked with @ControllerAdvice. This is comparable to the similar support available in Spring MVC

### Sending Messages

What if you want to send messages to connected clients from any part of the application? Any application component can **send messages to the brokerChannel**. The easiest way to do so is to inject a SimpMessagingTemplate  and use it to send messages

### Simple Broker

```java
@Configuration 
@EnableWebSocketMessageBroker 
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
  private TaskScheduler messageBrokerTaskScheduler;
  
  @Autowired
  public void setMessageBrokerTaskScheduler(TaskScheduler taskScheduler) {
    this.messageBrokerTaskScheduler = taskScheduler;
  }
  
  @Override
  public void configureMessageBroker(MessageBrokerRegistry registry) {
    registry.enableSimpleBroker("/queue/", "/topic/")
      .setHeartbeatValue(new long[] {10000, 20000})
      .setTaskScheduler(this.messageBrokerTaskScheduler);
    // ...
  } 
} 
```

### External Broker

```java
@Configuration 
@EnableWebSocketMessageBroker 
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
  @Override
  public void registerStompEndpoints(StompEndpointRegistry registry) {
    registry.addEndpoint("/portfolio").withSockJS();
  }
  
  @Override
  public void configureMessageBroker(MessageBrokerRegistry registry) {
    registry.enableStompBrokerRelay("/topic", "/queue");
    registry.setApplicationDestinationPrefixes("/app");
  } 
}
```

### Connecting to a Broker

A STOMP broker relay maintains a single “system” TCP connection to the broker. This connection is used for messages originating from the server-side application only, not for receiving messages

The STOMP broker relay also creates a separate TCP connection for every connected WebSocket client.

Any Spring bean can implement `ApplicationListener<BrokerAvailabilityEvent>` to receive notifications when the “system” connection to the broker is lost and re-established. For example, a Stock Quote service that broadcasts stock quotes can stop trying to send messages when there is no active “system” connection

```java
@Configuration 
@EnableWebSocketMessageBroker 
public class WebSocketConfig extends AbstractWebSocketMessageBrokerConfigurer {
  @Override
  public void configureMessageBroker(MessageBrokerRegistry registry) {
    registry.enableStompBrokerRelay("/queue/", "/topic/")
      .setTcpClient(createTcpClient());
    registry.setApplicationDestinationPrefixes("/app");
  }
  
  private ReactorNettyTcpClient<byte[]> createTcpClient() {
    return new ReactorNettyTcpClient<>(
      client -> client.addressSupplier(() -> ... ),
      new StompReactorNettyCodec());
  } 
} 
```

### Dots as Separators

```java
public void configureMessageBroker(MessageBrokerRegistry registry) {
  registry.setPathMatcher(new AntPathMatcher("."));
  registry.enableStompBrokerRelay("/queue", "/topic");
  registry.setApplicationDestinationPrefixes("/app");
} 
```

### User Destinations

An application can send messages that target a specific user, and Spring’s STOMP support recognizes destinations **prefixed with /user/** for this purpose. For example, a client might subscribe to the /user/queue/position-updates destination. This destination is handled by the UserDestinationMessageHandler and transformed into a destination unique to the user session (such as /queue/position-updates-user123)

On the sending side, messages can be sent to a destination such as /user/{username}/queue/position-updates, which in turn is translated by the UserDestinationMessageHandler  into one or more destinations, one for each session associated with the user

If the user has more than one session, by default, all of the sessions subscribed to the given destination are targeted. However, sometimes, it may be necessary to target only the session that sent the message being handled. You can do so by setting the **broadcast attribute to false**

### Interception

```java
@Configuration 
@EnableWebSocketMessageBroker 
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
  @Override
  public void configureClientInboundChannel(ChannelRegistration registration) {
    registration.interceptors(new MyChannelInterceptor());
  } 
} 

public class MyChannelInterceptor implements ChannelInterceptor {
  @Override
  public Message<?> preSend(Message<?> message, MessageChannel channel) {
    StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
    StompCommand command = accessor.getStompCommand();
    // ...
    return message;
  } 
}
```

### Stomp Client

```java
WebSocketClient webSocketClient = new StandardWebSocketClient(); 
WebSocketStompClient stompClient = new WebSocketStompClient(webSocketClient); 
stompClient.setMessageConverter(new StringMessageConverter()); 
stompClient.setTaskScheduler(taskScheduler); // for heartbeats

String url = "ws://127.0.0.1:8080/endpoint"; 
StompSessionHandler sessionHandler = new MyStompSessionHandler(); 
stompClient.connect(url, sessionHandler); 
```

### WebSocket Scope

```java
@MessageMapping("/action")
public void handle(SimpMessageHeaderAccessor headerAccessor) {
  Map<String, Object> attrs = headerAccessor.getSessionAttributes();
  // ...
} 
```

### Monitoring

The configuration also declares a bean of type WebSocketMessageBrokerStats that gathers all available information in one place and by default logs it at the INFO  level once every 30 minutes

```java

```

<https://www.toptal.com/java/stomp-spring-boot-websocket>

## Building the WebSocket Client

### Step 1. Autowire Spring STOMP client

```java
@Autowired
private WebSocketStompClient stompClient;
```

### Step 2. Open a connection

```java
StompSessionHandler sessionHandler = new CustmStompSessionHandler();

StompSession stompSession = stompClient.connect(loggerServerQueueUrl, 
sessionHandler).get();

stompSession.send("topic/greetings", "Hello new user");

session.subscribe("topic/greetings", this);

@Override
public void handleFrame(StompHeaders headers, Object payload) {
    Message msg = (Message) payload;
    logger.info("Received : " + msg.getText()+ " from : " + 
    msg.getFrom());
}

@MessageMapping("/greetings")
@SendToUser("/queue/greetings")
public String reply(@Payload String message,
   Principal user) {
 return  "Hello " + message;
}
```
