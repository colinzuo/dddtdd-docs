
## GatewayHttpTagsProvider gatewayHttpTagsProvider

outcome代表status类别，status是字符串版，httpStatusCode是整数版

比如CLIENT_ERROR, REQUEST_TIMEOUT, 408

```java
		return Tags.of("outcome", outcome, "status", status, "httpStatusCode", httpStatusCodeStr, "httpMethod",
				httpMethod);
```

## GatewayRouteTagsProvider gatewayRouteTagsProvider

routeId和routeUri

```java
		Route route = exchange.getAttribute(GATEWAY_ROUTE_ATTR);

		if (route != null) {
			return Tags.of("routeId", route.getId(), "routeUri", route.getUri().toString());
		}
```

## PropertiesTagsProvider propertiesTagsProvider

`properties.getTags()`

```java
	public PropertiesTagsProvider propertiesTagsProvider(GatewayMetricsProperties properties) {
		return new PropertiesTagsProvider(properties.getTags());
	}

	public PropertiesTagsProvider(Map<String, String> tagsMap) {
		this.propertiesTags = Tags.of(tagsMap.entrySet().stream().map(entry -> Tag.of(entry.getKey(), entry.getValue()))
				.collect(Collectors.toList()));
	}
```

## GatewayMetricsFilter gatewayMetricFilter

优先级为`NettyWriteResponseFilter.WRITE_RESPONSE_FILTER_ORDER + 1`，也就是
在发出response前调用

- `Timer.start`记录开始时间
- `compositeTagsProvider.apply(exchange)`提取tags
- `sample.stop(meterRegistry.timer(metricsPrefix + ".requests", tags))`，
生成metric采样

```java
		this.compositeTagsProvider = tagsProviders.stream().reduce(exchange -> Tags.empty(), GatewayTagsProvider::and);

	public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
		Sample sample = Timer.start(meterRegistry);

		return chain.filter(exchange).doOnSuccess(aVoid -> endTimerRespectingCommit(exchange, sample))
				.doOnError(throwable -> endTimerRespectingCommit(exchange, sample));
	}

	private void endTimerInner(ServerWebExchange exchange, Sample sample) {
		Tags tags = compositeTagsProvider.apply(exchange);

		if (log.isTraceEnabled()) {
			log.trace(metricsPrefix + ".requests tags: " + tags);
		}
		sample.stop(meterRegistry.timer(metricsPrefix + ".requests", tags));
	}  
```
