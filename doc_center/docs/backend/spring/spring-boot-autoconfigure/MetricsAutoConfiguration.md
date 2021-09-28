
可通过MetricsProperties `management.metrics`配置

比如可以通过`management.metrics.distribution.slo`设置slo

## Clock micrometerClock

```java
	public Clock micrometerClock() {
		return Clock.SYSTEM;
	}
```

## MeterRegistryPostProcessor meterRegistryPostProcessor

收集MeterBinder，MeterFilter，MeterRegistryCustomizer，MetricsProperties，
然后在后处理是通过MeterRegistryConfigurer配置MeterRegistry

```java
	public Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {
		if (bean instanceof MeterRegistry) {
			getConfigurer().configure((MeterRegistry) bean);

	private MeterRegistryConfigurer getConfigurer() {
		if (this.configurer == null) {
			boolean hasCompositeMeterRegistry = this.applicationContext
					.getBeanNamesForType(CompositeMeterRegistry.class, false, false).length != 0;
			this.configurer = new MeterRegistryConfigurer(this.meterRegistryCustomizers, this.meterFilters,
					this.meterBinders, this.metricsProperties.getObject().isUseGlobalRegistry(),
					hasCompositeMeterRegistry);      
```

### MeterRegistryConfigurer

```java
	void configure(MeterRegistry registry) {
		// Customizers must be applied before binders, as they may add custom
		// tags or alter timer or summary configuration.
		customize(registry);
		if (!(registry instanceof AutoConfiguredCompositeMeterRegistry)) {
			addFilters(registry);
		}
		if (!this.hasCompositeMeterRegistry || registry instanceof CompositeMeterRegistry) {
			addBinders(registry);
		}
		if (this.addToGlobalRegistry && registry != Metrics.globalRegistry) {
			Metrics.addRegistry(registry);
		}
	}
```

## PropertiesMeterFilter propertiesMeterFilter

- 调用`properties.getTags()`添加到commonTags
- 调用`properties.getEnable()`判断指定Meter Id是否使能
- 调用`properties.getDistribution()`生成指定Meter Id的DistributionStatisticConfig
