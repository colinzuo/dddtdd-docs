
## SpringCloudCircuitBreakerResilience4JFilterFactory springCloudCircuitBreakerResilience4JFilterFactory

创建SpringCloudCircuitBreakerResilience4JFilterFactory，
配置ReactiveResilience4JCircuitBreakerFactory和DispatcherHandler

具体请求通过ReactiveCircuitBreaker封装，如果报错或者status为给定值则
尝试fallback

```java
		return new GatewayFilter() {
			@Override
			public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
				return cb.run(chain.filter(exchange).doOnSuccess(v -> {
					if (statuses.contains(exchange.getResponse().getStatusCode())) {
						HttpStatus status = exchange.getResponse().getStatusCode();
						exchange.getResponse().setStatusCode(null);
						reset(exchange);
						throw new CircuitBreakerStatusCodeException(status);
					}
				}), t -> {
					if (config.getFallbackUri() == null) {
						return Mono.error(t);
					}
```

## FallbackHeadersGatewayFilterFactory fallbackHeadersGatewayFilterFactory

添加一些fallback信息到header，比如

- `Execution-Exception-Type`
- `Execution-Exception-Message`
- `Root-Cause-Exception-Type`
- `Root-Cause-Exception-Message`
