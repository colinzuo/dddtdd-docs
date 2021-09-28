
`private final ObjectProvider<List<LoadBalancerClientSpecification>> configurations;`

收集不同service对应的Configuration配置

## LoadBalancerZoneConfig zoneConfig

- LoadBalancerZoneConfig zoneConfig: 如果不存在则通过环境变量
`spring.cloud.loadbalancer.zone`创建

## LoadBalancerClientFactory loadBalancerClientFactory

如果不存在则创建，并将收集到的Configurations配置上去

提供接口`ReactiveLoadBalancer<ServiceInstance> getInstance(String serviceId)`


