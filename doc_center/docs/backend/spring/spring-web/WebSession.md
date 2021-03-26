
## 存储相关
- `String getId()`
- `Map<String, Object> getAttributes()`
- `<T> T getAttribute(String name)`
- `<T> T getRequiredAttribute(String name)`
- `<T> T getAttributeOrDefault(String name, T defaultValue)`

## 创建相关
- `void start()`
- `boolean isStarted()`
- `Mono<Void> changeSessionId()`
- `Mono<Void> invalidate()`
- `Mono<Void> save()`

## 时间相关
- `boolean isExpired()`
- `Instant getCreationTime()`
- `Instant getLastAccessTime()`
- `void setMaxIdleTime(Duration maxIdleTime)`
- `Duration getMaxIdleTime()`