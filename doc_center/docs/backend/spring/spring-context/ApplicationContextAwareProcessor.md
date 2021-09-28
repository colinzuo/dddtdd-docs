
BeanPostProcessor implementation that supplies the ApplicationContext, Environment, or StringValueResolver for the ApplicationContext to beans that implement the EnvironmentAware, EmbeddedValueResolverAware, ResourceLoaderAware, ApplicationEventPublisherAware, MessageSourceAware, and/or ApplicationContextAware interfaces

```java
class ApplicationContextAwareProcessor implements BeanPostProcessor {
```