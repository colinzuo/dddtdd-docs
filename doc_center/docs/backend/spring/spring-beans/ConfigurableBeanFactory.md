
- `void setParentBeanFactory(BeanFactory parentBeanFactory)`

- `void setBeanClassLoader(@Nullable ClassLoader beanClassLoader)`
- `ClassLoader getBeanClassLoader()`

- `void setTempClassLoader(@Nullable ClassLoader tempClassLoader)`
- `ClassLoader getTempClassLoader()`

- `void setCacheBeanMetadata(boolean cacheBeanMetadata)`
- `boolean isCacheBeanMetadata()`

- `void setBeanExpressionResolver(@Nullable BeanExpressionResolver resolver)`
- `BeanExpressionResolver getBeanExpressionResolver()`

- `void setConversionService(@Nullable ConversionService conversionService)`
- `ConversionService getConversionService()`

- `void addPropertyEditorRegistrar(PropertyEditorRegistrar registrar)`
- `void registerCustomEditor(Class<?> requiredType, Class<? extends PropertyEditor> propertyEditorClass)`
- `void copyRegisteredEditorsTo(PropertyEditorRegistry registry)`

- `void setTypeConverter(TypeConverter typeConverter)`
- `TypeConverter getTypeConverter()`

- `void addEmbeddedValueResolver(StringValueResolver valueResolver)`
- `boolean hasEmbeddedValueResolver()`
- `String resolveEmbeddedValue(String value)`

- `void addBeanPostProcessor(BeanPostProcessor beanPostProcessor)`
- `int getBeanPostProcessorCount()`

- `void registerScope(String scopeName, Scope scope)`
- `String[] getRegisteredScopeNames()`
- `Scope getRegisteredScope(String scopeName)`

- `void setApplicationStartup(ApplicationStartup applicationStartup)`
- `ApplicationStartup getApplicationStartup()`

- `AccessControlContext getAccessControlContext()`

- `void copyConfigurationFrom(ConfigurableBeanFactory otherFactory)`

- `void registerAlias(String beanName, String alias)`
- `void resolveAliases(StringValueResolver valueResolver)`

- `BeanDefinition getMergedBeanDefinition(String beanName)`
- `boolean isFactoryBean(String name)`
- `void setCurrentlyInCreation(String beanName, boolean inCreation)`
- `boolean isCurrentlyInCreation(String beanName)`
- `void registerDependentBean(String beanName, String dependentBeanName)`
- `String[] getDependentBeans(String beanName)`
- `String[] getDependenciesForBean(String beanName)`
- `void destroyBean(String beanName, Object beanInstance)`
- `void destroyScopedBean(String beanName)`
- `void destroySingletons()`
