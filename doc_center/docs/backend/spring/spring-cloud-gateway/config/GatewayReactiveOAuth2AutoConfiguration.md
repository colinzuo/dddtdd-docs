
## ReactiveOAuth2AuthorizedClientManager gatewayReactiveOAuth2AuthorizedClientManager

组合ReactiveClientRegistrationRepository, 
ServerOAuth2AuthorizedClientRepository,
ReactiveOAuth2AuthorizedClientProvider到
DefaultReactiveOAuth2AuthorizedClientManager

- `authorizationCode().refreshToken()`

```java
	public ReactiveOAuth2AuthorizedClientManager gatewayReactiveOAuth2AuthorizedClientManager(
			ReactiveClientRegistrationRepository clientRegistrationRepository,
			ServerOAuth2AuthorizedClientRepository authorizedClientRepository) {
		ReactiveOAuth2AuthorizedClientProvider authorizedClientProvider = ReactiveOAuth2AuthorizedClientProviderBuilder
				.builder().authorizationCode().refreshToken().build();
		DefaultReactiveOAuth2AuthorizedClientManager authorizedClientManager = new DefaultReactiveOAuth2AuthorizedClientManager(
				clientRegistrationRepository, authorizedClientRepository);
		authorizedClientManager.setAuthorizedClientProvider(authorizedClientProvider);
		return authorizedClientManager;
	}
```
