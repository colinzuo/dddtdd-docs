---
title: Spring Cloud Sleuth
---

<https://github.com/openzipkin/brave>  
<https://www.baeldung.com/spring-cloud-sleuth-single-application>  
<https://www.baeldung.com/tracing-services-with-zipkin>

## add new span
```java
@Autowired
private Tracer tracer;
// ...
public void doSomeWorkNewSpan() throws InterruptedException {
    logger.info("I'm in the original span");

    Span newSpan = tracer.nextSpan().name("newSpan").start();
    try (SpanInScope ws = tracer.withSpanInScope(newSpan.start())) {
        Thread.sleep(1000L);
        logger.info("I'm in the new span doing some cool work that needs its own span");
    } finally {
        newSpan.finish();
    }

    logger.info("I'm in the original span");
}
```
