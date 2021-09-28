
## OAuth2ClientWebFluxSecurityConfiguration

首先通过AutoWire收集

```java
		private ReactiveClientRegistrationRepository clientRegistrationRepository;

		private ServerOAuth2AuthorizedClientRepository authorizedClientRepository;

		private ReactiveOAuth2AuthorizedClientService authorizedClientService;
```

### configureArgumentResolvers OAuth2AuthorizedClientArgumentResolver

用于在添加了RegisteredOAuth2AuthorizedClient注解的参数上使用

```java
  @GetMapping("/authorized-client")
  public String authorizedClient(@RegisteredOAuth2AuthorizedClient("login-client") OAuth2AuthorizedClient authorizedClient) {
```

首先从clientRegistrationId，currentAuthentication生成OAuth2AuthorizeRequest，
然后通过authorizedClientManager获得OAuth2AuthorizedClient

```java
	public Mono<Object> resolveArgument(MethodParameter parameter, BindingContext bindingContext,
			ServerWebExchange exchange) {

			return authorizeRequest(clientRegistrationId, exchange).flatMap(this.authorizedClientManager::authorize);
```
