
通过Autowire收集`List<WebFluxConfigurer>`，然后重载配置接口并通过WebFluxConfigurerComposite来配置，比如
```java
	public void configurePathMatching(PathMatchConfigurer configurer) {
		this.configurers.configurePathMatching(configurer);
	}
```

- configureContentTypeResolver
- addCorsMappings
- configurePathMatching
- addResourceHandlers
- configureArgumentResolvers
- configureHttpMessageCodecs
- addFormatters
- getValidator
- getMessageCodesResolver
- getWebSocketService
- configureViewResolvers
