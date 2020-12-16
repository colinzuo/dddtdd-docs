---
title: Spring Cloud Netflix
---

[官方文档](https://spring.io/projects/spring-cloud-netflix)  
[上手指南](https://spring.io/guides/gs/service-registration-and-discovery/)

主要是用于服务发现的Eureka服务器和客户端，这部分比较有用，是一个
常见的功能，比kubernets原生的好处是客户端可以上报zone之类的meta
数据，然后用户侧可以按情况选择，并且在不同kubernetes集群间，或者
集群外都可以方便的调用，目前感觉尤其适合结合边缘计算的场景。

官方示例如下
```java
@EnableDiscoveryClient
@SpringBootApplication
public class ServiceRegistrationAndDiscoveryClientApplication {

	public static void main(String[] args) {
		SpringApplication.run(ServiceRegistrationAndDiscoveryClientApplication.class, args);
	}
}

@RestController
class ServiceInstanceRestController {

	@Autowired
	private DiscoveryClient discoveryClient;

	@RequestMapping("/service-instances/{applicationName}")
	public List<ServiceInstance> serviceInstancesByApplicationName(
			@PathVariable String applicationName) {
		return this.discoveryClient.getInstances(applicationName);
	}
}
```

Feign是类似于retrofit的一种声明式服务接口提供方式，没实际使用过。

Circuit Breaker这部分因为Netflix对Hystrix转入maintenance
模式，所以Spring Cloud自己新提供了专门的Spring Cloud Circuit Breaker
项目。
