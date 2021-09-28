
```java
public interface ConfigurableApplicationContext extends ApplicationContext, Lifecycle, Closeable {
```

- `void setId(String id)`
- `void setParent(@Nullable ApplicationContext parent)`
- `void setEnvironment(ConfigurableEnvironment environment)`
- `ConfigurableEnvironment getEnvironment()`
- `void setApplicationStartup(ApplicationStartup applicationStartup)`
- `ApplicationStartup getApplicationStartup()`
- `void addBeanFactoryPostProcessor(BeanFactoryPostProcessor postProcessor)`
- `void addApplicationListener(ApplicationListener<?> listener)`
- `void addProtocolResolver(ProtocolResolver resolver)`
- `void refresh()`
- `void registerShutdownHook()`
- `void close()`
- `boolean isActive()`
- `ConfigurableListableBeanFactory getBeanFactory()`