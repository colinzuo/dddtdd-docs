
## ReactorLoadBalancerExchangeFilterFunction loadBalancerExchangeFilterFunction

`spring.cloud.loadbalancer.retry.enabled`为false或者未配置时使能

- 获取service id，`String serviceId = originalUrl.getHost()`

- 从loadBalancerFactory中获取类型为LoadBalancerLifecycle并且支持
指定类型request，response等的列表supportedLifecycleProcessors

- 根据输入的ClientRequest和LoadBalancerProperties中的hint信息组建lbRequest

- 遍历supportedLifecycleProcessors，调用`lifecycle.onStart`

- 选择ServiceInstance  
`loadBalancerFactory.getInstance(serviceId)`  
`loadBalancer.choose(request)`

- 如果无可用service instance，则调用`lifecycle.onComplete`，并返回503

- 如果有可用service instance，则根据service instance地址重新构造ClientRequest，
然后调用`lifecycle.onStartRequest`，然后`next.exchange(newRequest)`，收到
响应后调用`lifecycle.onComplete`

## RetryableLoadBalancerExchangeFilterFunction retryableLoadBalancerExchangeFilterFunction

`spring.cloud.loadbalancer.retry.enabled`为true时使能

- 首先构建LoadBalancerRetryContext，用于保存retriesSameServiceInstance，
retriesNextServiceInstance等
- 创建retry配置，exchangeRetry用于配置同一个service instance上的retry配置,
filterRetry用于选择新的service instance

- 创建RetryableRequestContext用于创建lbRequest

- 配置retryWhen

## LoadBalancerRetryPolicy loadBalancerRetryPolicy

- canRetrySameServiceInstance
- canRetryNextServiceInstance
- retryableStatusCode
- canRetryOnMethod
