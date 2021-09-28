
## Websocket API

### Server

To create a WebSocket server, you can first create a WebSocketHandler

```java
import org.springframework.web.reactive.socket.WebSocketHandler; 
import org.springframework.web.reactive.socket.WebSocketSession; 

public class MyWebSocketHandler implements WebSocketHandler {
  @Override
  public Mono<Void> handle(WebSocketSession session) {
    // ...
  } 
} 
```

Then you can map it to a URL

```java
@Configuration 
class WebConfig {
  @Bean
  public HandlerMapping handlerMapping() {
    Map<String, WebSocketHandler> map = new HashMap<>();
    map.put("/path", new MyWebSocketHandler());
    int order = -1; // before annotated controllers
    
    return new SimpleUrlHandlerMapping(map, order);
  } 
} 
```

### WebSocketHandler

The session is handled through two streams, one for inbound and one for outbound messages.

A WebSocketHandler  must compose the inbound and outbound streams into a unified flow and return a `Mono<Void>` that reflects the completion of that flow.

```java
public Mono<Void> handle(WebSocketSession session) {
  Mono<Void> input = session.receive()
    .doOnNext(message -> {
      // ...
    })
    .concatMap(message -> {
      // ...
    })
    .then();

  Flux<String> source = ... ;
  Mono<Void> output = session.send(source.map(session::textMessage));
  
  return Mono.zip(input, output).then();
} 
```

### DataBuffer

When running on Netty, applications must use DataBufferUtils.retain(dataBuffer)  if they wish to hold on input data buffers in order to ensure they are not released, and subsequently use DataBufferUtils.release(dataBuffer) when the buffers are consumed. 

### Handshake

HandshakeWebSocketService  exposes a sessionAttributePredicate  property that allows setting a `Predicate<String>` to extract attributes from the WebSession and insert them into the attributes of the WebSocketSession

### Server Configuration

```java
@Configuration 
class WebConfig {
  @Bean
  public WebSocketHandlerAdapter handlerAdapter() {
    return new WebSocketHandlerAdapter(webSocketService());
  }
  
  @Bean
  public WebSocketService webSocketService() {
    TomcatRequestUpgradeStrategy strategy = new TomcatRequestUpgradeStrategy();
    strategy.setMaxSessionIdleTimeout(0L);
    return new HandshakeWebSocketService(strategy);
  } 
} 
```

### Client

<https://www.baeldung.com/spring-5-reactive-websockets>

```java
WebSocketClient client = new ReactorNettyWebSocketClient(); 

URI url = new URI("ws://localhost:8080/path"); 
client.execute(url, session ->
  session.receive()
    .doOnNext(System.out::println)
    .then());
```
