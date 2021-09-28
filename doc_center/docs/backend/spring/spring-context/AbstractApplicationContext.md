
```java
public abstract class AbstractApplicationContext extends DefaultResourceLoader
		implements ConfigurableApplicationContext {
```

```java
	public void refresh() throws BeansException, IllegalStateException {
		synchronized (this.startupShutdownMonitor) {
			StartupStep contextRefresh = this.applicationStartup.start("spring.context.refresh");

			// Prepare this context for refreshing.
      // this.startupDate = System.currentTimeMillis();
		  // this.closed.set(false);
		  // this.active.set(true);
      // initPropertySources()
      // getEnvironment().validateRequiredProperties()
      // this.earlyApplicationListeners = new LinkedHashSet<>(this.applicationListeners);
      // this.earlyApplicationEvents = new LinkedHashSet<>();
			prepareRefresh();

			// Tell the subclass to refresh the internal bean factory.
			ConfigurableListableBeanFactory beanFactory = obtainFreshBeanFactory();

			// Prepare the bean factory for use in this context.
      // beanFactory.setBeanClassLoader(getClassLoader());
      // beanFactory.setBeanExpressionResolver(new StandardBeanExpressionResolver(beanFactory.getBeanClassLoader()));
      // beanFactory.addPropertyEditorRegistrar(new ResourceEditorRegistrar(this, getEnvironment()));
      // beanFactory.addBeanPostProcessor(new ApplicationContextAwareProcessor(this));
      // beanFactory.registerResolvableDependency(BeanFactory.class, beanFactory);
      // beanFactory.addBeanPostProcessor(new ApplicationListenerDetector(this))
      // beanFactory.registerSingleton(ENVIRONMENT_BEAN_NAME, getEnvironment());
      // beanFactory.registerSingleton(APPLICATION_STARTUP_BEAN_NAME, getApplicationStartup());
			prepareBeanFactory(beanFactory);

			try {
				// Allows post-processing of the bean factory in context subclasses.
				postProcessBeanFactory(beanFactory);

				StartupStep beanPostProcess = this.applicationStartup.start("spring.context.beans.post-process");
				// Invoke factory processors registered as beans in the context.
				invokeBeanFactoryPostProcessors(beanFactory);

				// Register bean processors that intercept bean creation.
        // String[] postProcessorNames = beanFactory.getBeanNamesForType(BeanPostProcessor.class, true, false);
				registerBeanPostProcessors(beanFactory);
				beanPostProcess.end();

				// Initialize message source for this context.
				initMessageSource();

				// Initialize event multicaster for this context.
        // this.applicationEventMulticaster = new SimpleApplicationEventMulticaster(beanFactory)
				initApplicationEventMulticaster();

				// Initialize other special beans in specific context subclasses.
				onRefresh();

				// Check for listener beans and register them.
				registerListeners();

				// Instantiate all remaining (non-lazy-init) singletons.
        // beanFactory.setConversionService(
				//	beanFactory.getBean(CONVERSION_SERVICE_BEAN_NAME, ConversionService.class));
        // beanFactory.preInstantiateSingletons()
				finishBeanFactoryInitialization(beanFactory);

				// Last step: publish corresponding event.
        // publishEvent(new ContextRefreshedEvent(this));
				finishRefresh();
			}    
```
