

## Annotated Responders

To use annotated responders on the server side, add RSocketMessageHandler to your Spring configuration to detect @Controller beans with `@MessageMapping` and `@ConnectMapping` methods

By default SimpleRouteMatcher is used for matching routes via AntPathMatcher. We recommend plugging in the PathPatternRouteMatcher from spring-web for efficient route matching. RSocket routes can be hierarchical but are not URL paths. Both route matchers are configured to use "." as separator by default and there is no URL decoding as with HTTP URLs.

```java
    @Bean
    public RSocketMessageHandler rsocketMessageHandler() {
        RSocketMessageHandler handler = new RSocketMessageHandler();
        handler.routeMatcher(new PathPatternRouteMatcher());
        return handler;
    }
```

## auto configuration

```java
org.springframework.boot.autoconfigure

rsocket.RSocketMessagingAutoConfiguration
rsocket.RSocketRequesterAutoConfiguration
rsocket.RSocketServerAutoConfiguration
rsocket.RSocketStrategiesAutoConfiguration

security.rsocket.RSocketSecurityAutoConfiguration
```

## message flow

`org.springframework.messaging.rsocket.annotation.support.MessagingRSocket`
