
## loadBalancerWebClientBuilderBeanPostProcessor

如果Bean为类型WebClient.Builder，并且上面上有注解LoadBalanced，
则配置`DeferringLoadBalancerExchangeFilterFunction`filter

```java
	public Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException {
		if (bean instanceof WebClient.Builder) {
			if (context.findAnnotationOnBean(beanName, LoadBalanced.class) == null) {
				return bean;
			}
			((WebClient.Builder) bean).filter(exchangeFilterFunction);
		}
```

## reactorDeferringLoadBalancerExchangeFilterFunction

lazy delegate，也就是当真正使用时候才获取delegate

```java
	void tryResolveDelegate() {
		if (delegate == null) {
			delegate = exchangeFilterFunctionProvider.getIfAvailable();
```
