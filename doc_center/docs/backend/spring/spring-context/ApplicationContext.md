
```java
public interface ApplicationContext extends EnvironmentCapable, ListableBeanFactory, HierarchicalBeanFactory,
		MessageSource, ApplicationEventPublisher, ResourcePatternResolver {
```

- `String getId()`
- `String getApplicationName()`
- `String getDisplayName()`
- `long getStartupDate()`
- `ApplicationContext getParent()`
- `AutowireCapableBeanFactory getAutowireCapableBeanFactory()`