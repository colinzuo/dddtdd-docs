---
sidebar_position: 15
---

## RSocketWebSocketNettyRouteProvider rSocketWebsocketRouteProvider

```java
		RSocketWebSocketNettyRouteProvider rSocketWebsocketRouteProvider(RSocketProperties properties,
				RSocketMessageHandler messageHandler, ObjectProvider<RSocketServerCustomizer> customizers) {
			return new RSocketWebSocketNettyRouteProvider(properties.getServer().getMappingPath(),
					messageHandler.responder(), customizers.orderedStream());
		}
```
