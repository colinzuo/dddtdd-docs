---
title: Spring Cloud Circuit Breaker
---

Circuit Breaker类似于电路保险丝，当下游业务出问题时，一般短时间再次
调用也是会报错的并且如果出错时候下游响应很慢的话也可能会累积很大量的
调用，这时候我们希望一段时间内不调用给下游时间恢复，这个期间
如果直接给上游报错可能体验不好，如果有更好的fallback选择下可以提供fallback
给上游，比如在推荐业务中，与其报错，不如返回缓存的top推荐之类的。

[官方文档](https://spring.io/projects/spring-cloud-circuitbreaker)

主要对接[Resilience4J](https://github.com/resilience4j/resilience4j)

官方示例如下
```java
@Service
public static class DemoControllerService {
	private ReactiveCircuitBreakerFactory cbFactory;
	private WebClient webClient;


	public DemoControllerService(WebClient webClient, ReactiveCircuitBreakerFactory cbFactory) {
		this.webClient = webClient;
		this.cbFactory = cbFactory;
	}

	public Mono<String> slow() {
		return webClient.get().uri("/slow").retrieve().bodyToMono(String.class).transform(
		it -> cbFactory.create("slow").run(it, throwable -> return Mono.just("fallback")));
	}
}
```

>The ReactiveCircuitBreakerFactory.create API will create an instance of a class called ReactiveCircuitBreaker. The run method takes with a Mono or Flux and wraps it in a circuit breaker. You can optionally profile a fallback Function which will be called if the circuit breaker is tripped and will be passed the Throwable that caused the failure

[transform operator文档](https://projectreactor.io/docs/core/release/reference/#_using_the_transform_operator)
