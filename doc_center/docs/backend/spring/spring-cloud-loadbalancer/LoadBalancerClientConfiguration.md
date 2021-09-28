
每个service都有自己的application context，然后都有单独的
这个Configuration

## reactorServiceInstanceLoadBalancer

Environment为这个service自己的application context独有的，里头的
`LoadBalancerClientFactory.PROPERTY_NAME`被配置为service的名字

```java
	public ReactorLoadBalancer<ServiceInstance> reactorServiceInstanceLoadBalancer(Environment environment,
			LoadBalancerClientFactory loadBalancerClientFactory) {
		String name = environment.getProperty(LoadBalancerClientFactory.PROPERTY_NAME);
		return new RoundRobinLoadBalancer(
				loadBalancerClientFactory.getLazyProvider(name, ServiceInstanceListSupplier.class), name);
	}
```

### RoundRobinLoadBalancer

RoundRobin方式选择

```java
		int pos = Math.abs(this.position.incrementAndGet());

		ServiceInstance instance = instances.get(pos % instances.size());
```

### discoveryClientServiceInstanceListSupplier

`spring.cloud.loadbalancer.configurations`为default，或者未配置时使用

会通过service discovery client获取service instance list

会使用Cache，具体值会以Flux Signal的形式储存在Cache中，然后当需要时候replay

### zonePreferenceDiscoveryClientServiceInstanceListSupplier

`spring.cloud.loadbalancer.configurations`为zone-preference使能

和default的区别是会将收到的service instance list按照meta data里的zone过滤，
当过滤后结果不为空时返回过滤后的，否则返回原始全部

### healthCheckDiscoveryClientServiceInstanceListSupplier

`spring.cloud.loadbalancer.configurations`为health-check使能

这个没有使能Cache，但是通过replay实现了类似效果，并且按照RefetchInstancesInterval
间隔重新获取列表，获取后会调用health检查过滤掉不healthy的

### requestBasedStickySessionDiscoveryClientServiceInstanceListSupplier

`spring.cloud.loadbalancer.configurations`为request-based-sticky-session使能

这个没有使能Cache，然后是通过Cookie来判断转发给哪个instance，如果没有匹配的就
返回所有

这个每次都要从delegate先取列表，未使能Cache应该效率比较低

### sameInstancePreferenceServiceInstanceListSupplier

`spring.cloud.loadbalancer.configurations`为same-instance-preference使能

这个没有使能Cache，然后是通过保存上一个选择的service instance在后续选择中直接
返回来实现的

这个每次都要从delegate先取列表，未使能Cache应该效率比较低

### retryAwareDiscoveryClientServiceInstanceListSupplier

retry时候过滤掉上次使用的service instance

### ReactiveOnAvoidPreviousInstanceAndRetryEnabledCondition

`spring.cloud.loadbalancer.retry.enabled`

`spring.cloud.loadbalancer.retry.avoid-previous-instance`
