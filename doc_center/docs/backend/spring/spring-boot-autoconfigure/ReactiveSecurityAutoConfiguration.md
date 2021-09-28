
如果是WebFlux项目并且`ConditionalOnMissingBean(WebFilterChainProxy.class)`
则使能`EnableWebFluxSecurity`

```java
@EnableConfigurationProperties(SecurityProperties.class)
@ConditionalOnClass({ Flux.class, EnableWebFluxSecurity.class, WebFilterChainProxy.class, WebFluxConfigurer.class })
public class ReactiveSecurityAutoConfiguration {

	@Configuration(proxyBeanMethods = false)
	@ConditionalOnMissingBean(WebFilterChainProxy.class)
	@ConditionalOnWebApplication(type = ConditionalOnWebApplication.Type.REACTIVE)
	@EnableWebFluxSecurity
	static class EnableWebFluxSecurityConfiguration {
```
