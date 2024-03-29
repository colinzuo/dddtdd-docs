
从QueryParams，FormData，MultipartData提取MutablePropertyValues

```java
	public Mono<Void> bind(ServerWebExchange exchange) {
		return getValuesToBind(exchange)
				.doOnNext(values -> doBind(new MutablePropertyValues(values)))
				.then();
	}

	public Mono<Map<String, Object>> getValuesToBind(ServerWebExchange exchange) {
		return extractValuesToBind(exchange);
	}

	public static Mono<Map<String, Object>> extractValuesToBind(ServerWebExchange exchange) {
		MultiValueMap<String, String> queryParams = exchange.getRequest().getQueryParams();
		Mono<MultiValueMap<String, String>> formData = exchange.getFormData();
		Mono<MultiValueMap<String, Part>> multipartData = exchange.getMultipartData();

		return Mono.zip(Mono.just(queryParams), formData, multipartData)
				.map(tuple -> {
					Map<String, Object> result = new TreeMap<>();
					tuple.getT1().forEach((key, values) -> addBindValue(result, key, values));
					tuple.getT2().forEach((key, values) -> addBindValue(result, key, values));
					tuple.getT3().forEach((key, values) -> addBindValue(result, key, values));
					return result;
				});
	}
```