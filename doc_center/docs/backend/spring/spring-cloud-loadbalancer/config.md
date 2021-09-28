
- 可以通过在route指定lb前缀来表示需要loadbalancer，然后在GlobalFilter中处理
- 可以通过在WebClient.Builder配置注解LoadBalanced来表示，然后通过
BeanPostProcessor来配置

## LoadBalancerAutoConfiguration

[LoadBalancerAutoConfiguration](./LoadBalancerAutoConfiguration.md)

[ReactorLoadBalancerClientAutoConfiguration](../spring-cloud-commons/ReactorLoadBalancerClientAutoConfiguration.md)

[LoadBalancerBeanPostProcessorAutoConfiguration](../spring-cloud-commons/LoadBalancerBeanPostProcessorAutoConfiguration.md)

## GatewayReactiveLoadBalancerClientAutoConfiguration

```java
@AutoConfigureAfter(LoadBalancerAutoConfiguration.class)
@EnableConfigurationProperties(GatewayLoadBalancerProperties.class)
public class GatewayReactiveLoadBalancerClientAutoConfiguration {
```