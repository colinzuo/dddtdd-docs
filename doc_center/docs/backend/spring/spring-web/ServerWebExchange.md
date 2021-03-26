
## 基本
- `ServerHttpRequest getRequest()`
- `ServerHttpResponse getResponse()`
- `Map<String, Object> getAttributes()`

## 属性
- `<T> T getAttribute(String name)`
- `<T> T getRequiredAttribute(String name)`
- `<T> T getAttributeOrDefault(String name, T defaultValue)`

## 特定属性
- `Mono<WebSession> getSession()`
- `<T extends Principal> Mono<T> getPrincipal()`
- `LocaleContext getLocaleContext()`

## 特定内容
- `Mono<MultiValueMap<String, String>> getFormData()`
- `Mono<MultiValueMap<String, Part>> getMultipartData()`

## 辅助
- `ApplicationContext getApplicationContext()`

## 处理相关
- `boolean isNotModified()`
- `boolean checkNotModified(Instant lastModified)`
- `boolean checkNotModified(String etag)`
- `boolean checkNotModified(@Nullable String etag, Instant lastModified)`
- `String transformUrl(String url)`
- `void addUrlTransformer(Function<String, String> transformer)`
- `String getLogPrefix()`
- `Builder mutate()`