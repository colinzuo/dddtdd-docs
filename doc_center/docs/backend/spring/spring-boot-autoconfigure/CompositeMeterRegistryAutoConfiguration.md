
`@Import({ NoOpMeterRegistryConfiguration.class, CompositeMeterRegistryConfiguration.class })`

## NoOpMeterRegistryConfiguration

### CompositeMeterRegistry noOpMeterRegistry

CompositeMeterRegistry需要挂载具体的MeterRegistry才能把Meter数据export
给对应工具，缺省没有配置MeterRegistry

```java
	CompositeMeterRegistry noOpMeterRegistry(Clock clock) {
		return new CompositeMeterRegistry(clock);
	}
```

## CompositeMeterRegistryConfiguration

如果定义了多个NonPrimary的MeterRegistry时使能

```java
@Conditional(MultipleNonPrimaryMeterRegistriesCondition.class)
class CompositeMeterRegistryConfiguration {
```

### AutoConfiguredCompositeMeterRegistry compositeMeterRegistry

通过CompositeMeterRegistry将配置的`List<MeterRegistry>`整合成一个
