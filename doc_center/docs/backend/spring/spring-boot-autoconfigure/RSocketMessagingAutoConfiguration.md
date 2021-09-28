---
sidebar_position: 13
---

## RSocketMessageHandler messageHandler

```java
  RSocketMessageHandler messageHandler = new RSocketMessageHandler();
  messageHandler.setRSocketStrategies(rSocketStrategies);
  customizers.orderedStream().forEach((customizer) -> customizer.customize(messageHandler));
```
