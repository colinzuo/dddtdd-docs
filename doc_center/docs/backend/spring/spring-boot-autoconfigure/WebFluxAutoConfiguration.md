---
sidebar_position: 7
---

## OrderedHiddenHttpMethodFilter hiddenHttpMethodFilter

根据param修改method，比如实际使用post，但是param说是put

## WelcomePageConfiguration

### RouterFunctionMapping welcomePageRouterFunctionMapping

搜索配置的static-locations找index.html，如果存在则创建对应RouterFunction也就是"/"
对应到"index.html"Resource，和包含这个单一RouterFunction的RouterFunctionMapping，
Order设为1

[RouterFunctionMapping](../spring-webflux/RouterFunctionMapping.md)

## WebFluxConfig implements WebFluxConfigurer

通过Constuctor注入收集HandlerMethodArgumentResolver、CodecCustomizer和
ResourceHandlerRegistrationCustomizer列表，然后实现接口WebFluxConfigurer来
调用它们

### addResourceHandlers

在addResourceHandlers中有配置缺省静态资源

```java
			// highlight-next-line
			String staticPathPattern = this.webFluxProperties.getStaticPathPattern();
			if (!registry.hasMappingForPattern(staticPathPattern)) {
				ResourceHandlerRegistration registration = registry.addResourceHandler(staticPathPattern) 
				// highlight-next-line
						.addResourceLocations(this.resourceProperties.getStaticLocations());
				configureResourceCaching(registration);
				customizeResourceHandlerRegistration(registration);
			}
```

### addFormatters

搜索所有类型为GenericConverter，Converter，Printer和Parser的Bean，
添加到registry中

## EnableWebFluxConfiguration extends DelegatingWebFluxConfiguration

[DelegatingWebFluxConfiguration](../spring-webflux/DelegatingWebFluxConfiguration.md)

`DelegatingWebFluxConfiguration extends WebFluxConfigurationSupport`

[WebFluxConfigurationSupport](../spring-webflux/WebFluxConfigurationSupport.md)

### FormattingConversionService webFluxConversionService

创建WebConversionService，和缺省DefaultFormattingConversionService相比
就是多了配置date time format的能力

如果通过ConfigurationProperties spring.webflux设置了datetime format则相应
注册formatter

### Validator webFluxValidator

通过ValidatorAdapter封装使得只暴露SmartValidator的接口而不暴露`javax.validation.Validator`的接口
