---
sidebar_position: 3
---

## 配置缺省feature

```java
		featureDefaults.put(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
		featureDefaults.put(SerializationFeature.WRITE_DURATIONS_AS_TIMESTAMPS, false);
		FEATURE_DEFAULTS = Collections.unmodifiableMap(featureDefaults);
```

## JsonComponentModule

Jackson Module，通过InitializingBean来注册各种JsonComponent，比如
+ JsonSerializer
+ JsonDeserializer
+ KeyDeserializer

	最终组建的Module会被注册到ObjectMapperBuilder

```java
	private void addJsonBeans(ListableBeanFactory beanFactory) {
    // 查找所有JsonComponent类型的Bean
		Map<String, Object> beans = beanFactory.getBeansWithAnnotation(JsonComponent.class);

	private void addJsonBean(Object bean) {
		MergedAnnotation<JsonComponent> annotation = MergedAnnotations
				.from(bean.getClass(), SearchStrategy.TYPE_HIERARCHY).get(JsonComponent.class);
    // 从annatation中提取type和scope，type代表serialize类型，scope代表是key还是value
		Class<?>[] types = annotation.getClassArray("type");
		Scope scope = annotation.getEnum("scope", JsonComponent.Scope.class);

	private void addJsonBean(Object bean, Class<?>[] types, Scope scope) {
		if (bean instanceof JsonSerializer) {
			addJsonSerializerBean((JsonSerializer<?>) bean, scope, types);
		}

	private <T> void addJsonSerializerBean(JsonSerializer<T> serializer, JsonComponent.Scope scope, Class<?>[] types) {
    // 从Generic中提取类型参数
		Class<T> baseType = (Class<T>) ResolvableType.forClass(JsonSerializer.class, serializer.getClass())
				.resolveGeneric();
    // 调用jackson提供的addSerializer和addKeySerializer添加
		addBeanToModule(serializer, baseType, types,
				(scope == Scope.VALUES) ? this::addSerializer : this::addKeySerializer);    
```

## JacksonObjectMapperConfiguration

ObjectMapper: 如果不存在则创建缺省ObjectMapper

```java
		@Bean
		@Primary
		@ConditionalOnMissingBean
		ObjectMapper jacksonObjectMapper(Jackson2ObjectMapperBuilder builder) {
			return builder.createXmlMapper(false).build();
```

## ParameterNamesModuleConfiguration

ParameterNamesModule: 通过反射来获取参数名字

`java.lang.reflect.Parameter`

## JacksonObjectMapperBuilderConfiguration

Jackson2ObjectMapperBuilder：Scope是prototype，并且通过Jackson2ObjectMapperBuilderCustomizer来定制

```java
/**
A builder used to create ObjectMapper instances with a fluent API.
It customizes Jackson's default properties with the following ones:
MapperFeature.DEFAULT_VIEW_INCLUSION is disabled
DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES is disabled
It also automatically registers the following well-known modules if they are detected on the classpath:
jackson-datatype-jdk8 : support for other Java 8 types like java.util.Optional
jackson-datatype-jsr310 : support for Java 8 Date & Time API types
*/

	private void customizeDefaultFeatures(ObjectMapper objectMapper) {
		if (!this.features.containsKey(MapperFeature.DEFAULT_VIEW_INCLUSION)) {
			configureFeature(objectMapper, MapperFeature.DEFAULT_VIEW_INCLUSION, false);
		}
		if (!this.features.containsKey(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES)) {
			configureFeature(objectMapper, DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
		}
	}
```

## Jackson2ObjectMapperBuilderCustomizerConfiguration

### StandardJackson2ObjectMapperBuilderCustomizer

定制JacksonProperties，Features，Modules等

```java
				if (this.jacksonProperties.getTimeZone() != null) {
					builder.timeZone(this.jacksonProperties.getTimeZone());
				}

				configureFeatures(builder, FEATURE_DEFAULTS);

				configureFeatures(builder, this.jacksonProperties.getSerialization());
                
				Collection<Module> moduleBeans = getBeans(this.applicationContext, Module.class);
				builder.modulesToInstall(moduleBeans.toArray(new Module[0]));        
```

