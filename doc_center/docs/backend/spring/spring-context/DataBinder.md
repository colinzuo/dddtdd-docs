
将MutablePropertyValues中的值配置到target里

```java
	protected void doBind(MutablePropertyValues mpvs) {
    // 删掉不允许的字段
		checkAllowedFields(mpvs);
    // 检查Required，processMissingFieldError
		checkRequiredFields(mpvs);
    // 通过PropertyAccessor设置
		applyPropertyValues(mpvs);
	}
```

- `Object getTarget()`
- `String getObjectName()`
- `void setAutoGrowNestedPaths(boolean autoGrowNestedPaths)`
- `boolean isAutoGrowNestedPaths()`
- `void setAutoGrowCollectionLimit(int autoGrowCollectionLimit)`
- `int getAutoGrowCollectionLimit()`
- `void initBeanPropertyAccess()`
- `void initDirectFieldAccess()`
- `BindingResult getBindingResult()`
- `void setIgnoreUnknownFields(boolean ignoreUnknownFields)`
- `boolean isIgnoreUnknownFields()`
- `void setIgnoreInvalidFields(boolean ignoreInvalidFields)`
- `boolean isIgnoreInvalidFields()`
- `void setAllowedFields(@Nullable String... allowedFields)`
- `String[] getAllowedFields()`
- `void setDisallowedFields(@Nullable String... disallowedFields)`
- `String[] getDisallowedFields()`
- `void setRequiredFields(@Nullable String... requiredFields)`
- `String[] getRequiredFields()`
- `void setMessageCodesResolver(@Nullable MessageCodesResolver messageCodesResolver)`
- `void setBindingErrorProcessor(BindingErrorProcessor bindingErrorProcessor)`
- `BindingErrorProcessor getBindingErrorProcessor()`

- `void setValidator(@Nullable Validator validator)`
- `void addValidators(Validator... validators)`
- `void replaceValidators(Validator... validators)`
- `Validator getValidator()`
- `List<Validator> getValidators()`

- `void setConversionService(@Nullable ConversionService conversionService)`
- `ConversionService getConversionService()`
- `void addCustomFormatter(Formatter<?> formatter)`
- `void addCustomFormatter(Formatter<?> formatter, String... fields)`
- `void addCustomFormatter(Formatter<?> formatter, Class<?>... fieldTypes)`
- `void registerCustomEditor(Class<?> requiredType, PropertyEditor propertyEditor)`
- `void registerCustomEditor(@Nullable Class<?> requiredType, @Nullable String field, PropertyEditor propertyEditor)`
- `PropertyEditor findCustomEditor(@Nullable Class<?> requiredType, @Nullable String propertyPath)`
- `<T> T convertIfNecessary(@Nullable Object value, @Nullable Class<T> requiredType)`
- `<T> T convertIfNecessary(@Nullable Object value, @Nullable Class<T> requiredType, @Nullable MethodParameter methodParam)`
- `<T> T convertIfNecessary(@Nullable Object value, @Nullable Class<T> requiredType, @Nullable Field field)`
- `<T> T convertIfNecessary(@Nullable Object value, @Nullable Class<T> requiredType, @Nullable TypeDescriptor typeDescriptor)`
- `void bind(PropertyValues pvs)`
- `void validate()`
- `void validate(Object... validationHints)`
- `Map<?, ?> close()`
