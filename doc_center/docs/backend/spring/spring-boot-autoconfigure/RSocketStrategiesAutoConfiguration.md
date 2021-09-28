---
sidebar_position: 12
---

## RSocketStrategies rSocketStrategies

```java
  if (ClassUtils.isPresent(PATHPATTERN_ROUTEMATCHER_CLASS, null)) {
    builder.routeMatcher(new PathPatternRouteMatcher());
  }
  customizers.orderedStream().forEach((customizer) -> customizer.customize(builder));
```

## RSocketStrategiesCustomizer jacksonCborRSocketStrategyCustomizer

```java
  return (strategy) -> {
    ObjectMapper objectMapper = builder.createXmlMapper(false).factory(new CBORFactory()).build();
    strategy.decoder(new Jackson2CborDecoder(objectMapper, SUPPORTED_TYPES));
    strategy.encoder(new Jackson2CborEncoder(objectMapper, SUPPORTED_TYPES));
  };
```

## RSocketStrategiesCustomizer jacksonJsonRSocketStrategyCustomizer

```java
  return (strategy) -> {
    strategy.decoder(new Jackson2JsonDecoder(objectMapper, SUPPORTED_TYPES));
    strategy.encoder(new Jackson2JsonEncoder(objectMapper, SUPPORTED_TYPES));
  };
```
