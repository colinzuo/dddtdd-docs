
## OnEnabledComponent

### getComponentType

首先从注解的value获取，如果值`target != defaultValueClass()`则返回，
否则从Bean Method的返回值类型获取`methodMetadata.getReturnTypeName()`

