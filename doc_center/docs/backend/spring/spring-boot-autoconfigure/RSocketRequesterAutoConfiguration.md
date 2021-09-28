---
sidebar_position: 14
---

## RSocketRequester.Builder rSocketRequesterBuilder

```java
	@Scope("prototype")
	@ConditionalOnMissingBean
	public RSocketRequester.Builder rSocketRequesterBuilder(RSocketStrategies strategies) {
		return RSocketRequester.builder().rsocketStrategies(strategies);
	}
```
