---
sidebar_position: 2
---

## ReactiveWebServerFactoryAutoConfiguration.BeanPostProcessorsRegistrar

如果不存在WebServerFactoryCustomizerBeanPostProcessor则注册一个

```java
		public void registerBeanDefinitions(AnnotationMetadata importingClassMetadata,
				BeanDefinitionRegistry registry) {

			registerSyntheticBeanIfMissing(registry, "webServerFactoryCustomizerBeanPostProcessor",
					WebServerFactoryCustomizerBeanPostProcessor.class,
					WebServerFactoryCustomizerBeanPostProcessor::new);
		}
```

### WebServerFactoryCustomizerBeanPostProcessor

BeanPostProcessor that applies all WebServerFactoryCustomizer beans from the bean factory to WebServerFactory beans.

应用所有WebServerFactoryCustomizer类型的Beans来定制化WebServerFactory

```java
public class WebServerFactoryCustomizerBeanPostProcessor implements BeanPostProcessor, BeanFactoryAware {

	private void postProcessBeforeInitialization(WebServerFactory webServerFactory) {
		LambdaSafe.callbacks(WebServerFactoryCustomizer.class, getCustomizers(), webServerFactory)
				.withLogger(WebServerFactoryCustomizerBeanPostProcessor.class)
				.invoke((customizer) -> customizer.customize(webServerFactory));
	}

  // 找类型为WebServerFactoryCustomizer的Beans并按照Order排序
	private Collection<WebServerFactoryCustomizer<?>> getCustomizers() {
		if (this.customizers == null) {
			// Look up does not include the parent context
			this.customizers = new ArrayList<>(getWebServerFactoryCustomizerBeans());
			this.customizers.sort(AnnotationAwareOrderComparator.INSTANCE);
			this.customizers = Collections.unmodifiableList(this.customizers);
		}
		return this.customizers;
	}

  // 找类型为WebServerFactoryCustomizer的Beans
	private Collection<WebServerFactoryCustomizer<?>> getWebServerFactoryCustomizerBeans() {
		return (Collection) this.beanFactory.getBeansOfType(WebServerFactoryCustomizer.class, false, false).values();
	}  
```

## ReactiveWebServerFactoryConfiguration.EmbeddedNetty

当不存在ReactiveWebServerFactory并且Netty在路径中时

- ReactorResourceFactory: Netty运行资源配置，比如LoopResources、ConnectionProvider
- NettyReactiveWebServerFactory: 工厂类用于生成NettyServer并通过NettyRouteProvider、NettyServerCustomizer配置

```java
		NettyReactiveWebServerFactory nettyReactiveWebServerFactory(ReactorResourceFactory resourceFactory,
				ObjectProvider<NettyRouteProvider> routes, ObjectProvider<NettyServerCustomizer> serverCustomizers) {
			NettyReactiveWebServerFactory serverFactory = new NettyReactiveWebServerFactory();
      // Netty运行资源配置
			serverFactory.setResourceFactory(resourceFactory);

      // addRouteProviders
			routes.orderedStream().forEach(serverFactory::addRouteProviders);

      // 添加serverCustomizers
			serverFactory.getServerCustomizers().addAll(serverCustomizers.orderedStream().collect(Collectors.toList()));
			return serverFactory;          
```

## ReactiveWebServerFactoryAutoConfiguration

- ReactiveWebServerFactoryCustomizer：通过ConfigurableWebServerFactory接口，
配置ServerProperties相关信息，比如监听端口，地址，压缩等
- ForwardedHeaderTransformer: 从forward头提取远端地址配置到remoteAddress