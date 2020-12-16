---
title: 可观测性
---

## Meter类型

<https://prometheus.io/docs/concepts/metric_types/>

Counter类型获取变化率，比如 QPS 消息数/N秒
```
MeterRegistry registry = ...
Counter counter = registry.counter("counter");

# Prometheus Query
rate(counter[10s])
```

Timer类型获取变化率，比如 QPS 消息数/N秒
获取平均延迟，比如 XX ms
```
public interface Timer extends Meter {
    ...
    void record(long amount, TimeUnit unit);
    double totalTime(TimeUnit unit);
}

# Prometheus Query
rate(timer_count[10s])

rate(timer_sum[10s])/rate(timer_count[10s])
```

LongTaskTimer类型获取已经处理的时间，比如一个与三方系统同步
数据的任务，会展示本次执行已经消耗的时间
```
@Timed(value = "aws_scrape", longTask = true)
@Scheduled(fixedDelay = 360000)
void scrapeResources() {
    // find instances, volumes, auto-scaling groups, etc...
}

# Prometheus Query
longTaskTimer{statistic="duration"}
```

Distribution Summary类型

Quantile Statistics是对Timer和Summary类型的一种配置来提供额外
的信息，比如50%以内的延迟是，95%以内的延迟是，对外提供服务时很多
供应商会在合同里提供SLA service level agreement，可能包括这些。

```java
Timer timer = meterRegistry.timerBuilder("my_timer")
// highlight-next-line
                .quantiles(WindowSketchQuantiles.quantiles(0.5, 0.95).create())
                .create();

@RestController
public class MyController {
    // highlight-next-line
    @Timed(value = "list_people", quantiles = {0.5, 0.95})
    @GetMapping("/api/people")
    public List<Person> listPeople() { ... }                
```

Histogram Statistics是对Timer和Summary类型通过桶配置来提供额外
的信息，比如不同消息大小桶，1KB以下，1KB到10KB，10KB以上之类的，
在收集端可以对多个源过来的数据做汇总分析

```java
DistributionSummary hist = meterRegistry.summaryBuilder("hist")
        .histogram(CumulativeHistogram.buckets(linear(0, 10, 20)))
        .create();
```

### Cache监控

```java
@Repository
class PersonRepository {
    LoadingCache<String, Person> personBySsn;

    public PersonRepository(MeterRegistry registry) {
        personBySsn = Meters.monitor(registry, CacheBuilder.newBuilder().recordStats().build(),
            "people_cache", // base metric name
            "lookup_key", "ssn" // <- any number of tag key/value pairs
        );
    }
}
```

### Data Source监控

```java
@Configuration
class MyConfiguration {
    @Autowired
    private DataSource dataSource;

    @Autowired
    private Collection<DataSourcePoolMetadataProvider> metadataProviders;

    @Autowired
    private Environment env;

    @PostConstruct
    private void instrumentDataSource() {
        Meters.monitor(
            registry,
            dataSource,
            metadataProviders,
            "data_source", // base metric name
            "stack", env.acceptsProfiles("prod") ? "prod" : "test", // <- any number of tags
        );
    }
}
```

### ExecutorService监控

```java
@Configuration
class MyConfiguration {
    @Bean("worker_pool")
    ExecutorService workerPool(MeterRegistry registry) {
        return Meters.monitor(registry,
            Executors.newFixedThreadPool(8),
            "worker_pool",
            "threads", "8" // any number of tag key value pairs
        );
    }
}
```

### Web Server监控

定义management.metrics.web.server.request.autotime.enabled为true使能所有
接口的metric
> management.metrics.web.server.request.autotime.enabled=true

### WebFlux

```java
RouterFunctionMetrics metrics = new RouterFunctionMetrics(registry);

// OPTIONAL: the default is to record tags on method and status
metrics.defaultTags((req, resp) -> { /* custom tags here */ });

RouterFunction<ServerResponse> routes = RouterFunctions
    .route(GET("/person/").and(accept(APPLICATION_JSON)),
        request -> ServerResponse.ok().build())
    .filter(metrics.timer(
        "http_server_requests", // metric name
        "instance", MY_INSTANCE_ID // optional tags
    ));

PrometheusMeterRegistry meterRegistry = new PrometheusMeterRegistry();
RouterFunction<ServerResponse> route = route(GET("/prometheus"),
    PrometheusFunctions.scrape(meterRegistry));    
```

### Web Client监控

使能metric后Spring Boot会通过BeanPostProcessor对对应client进行配置。

### Scheduling监控

```java
@Timed("beep")
@Timed(value = "long_beep", longTask = true)
@Scheduled(fixedRate = 1000)
void longBeep() {
    // calculate the meaning of life, then beep...
    System.out.println("beep");
}
```

## 参考文档

### spring-metrics
这个文档讲了在spring中如何使用spring-metrics来暴露metric信息，可能actuator-starter
里就利用了这个库，然后具体讲了通过MeterRegistry注册meter，meter如何命名，比如不要
定义区分度太低的名字像是size，然后建议使用'_'来分隔，因为'-'和'.'在某些情况有特定意义
会引起冲突，之后讲解了micrometer支持的几种meter，比如Counter, 
<https://docs.spring.io/spring-metrics/docs/current/public/prometheus>

### monitor-spring-boot-microservices
这个文章讲了有哪些方面metric需要收集，在spring boot下如何
通过micrometer和actuator对外提供，如果通过AOP来收集相应metric，
还提供了示例图和参考代码。

<https://developer.ibm.com/languages/java/tutorials/monitor-spring-boot-microservices/>

<https://github.com/IBM/microsvcengineering/blob/master/microsvcframework/src/main/java/com/ibm/dip/microsvcengineering/framework/monitoring/MonitoringAOPConfig.java>


