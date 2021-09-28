
首先通过AutoWired配置

- `List<SecurityWebFilterChain> securityWebFilterChains`

## WebFilterChainProxy springSecurityWebFilterChainFilter

如果没有专门配置SecurityWebFilterChain则从ServerHttpSecurity中
配置提取

```java
		http.authorizeExchange().anyExchange().authenticated();
		if (isOAuth2Present && OAuth2ClasspathGuard.shouldConfigure(this.context)) {
			OAuth2ClasspathGuard.configure(this.context, http);
		}
		else {
			http.httpBasic();
			http.formLogin();
		}
```

遍历securityWebFilterChains找到第一个匹配的chain，然后把chain中
配置的filters插入到当前WebFilterChain

```java
	public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
		return Flux.fromIterable(this.filters)
				.filterWhen((securityWebFilterChain) -> securityWebFilterChain.matches(exchange)).next()
				.switchIfEmpty(chain.filter(exchange).then(Mono.empty()))
				.flatMap((securityWebFilterChain) -> securityWebFilterChain.getWebFilters().collectList())
				.map((filters) -> new FilteringWebHandler(chain::filter, filters)).map(DefaultWebFilterChain::new)
				.flatMap((securedChain) -> securedChain.filter(exchange));
```

## CsrfRequestDataValueProcessor requestDataValueProcessor

处理Csrf token

## BeanFactoryPostProcessor conversionServicePostProcessor

添加RSAPrivateKey和RSAPublicKey到String的Converter到ConversionService


