## conditional

### ConditionalOnEnabledFilter

- 主要用于bean函数定义，多数情况用bean函数返回值类型做判断，
少数通过设置annotation的value来判断
- 少数情况用于Configuration class定义

判断标准为spring.cloud.gateway.filter.**COMPONENT-TYPE**.enabled是否为false

### ConditionalOnEnabledGlobalFilter

和ConditionalOnEnabledFilter类似，只是判断标准为

spring.cloud.gateway.global-filter.**COMPONENT-TYPE**.enabled

### ConditionalOnEnabledPredicate

和ConditionalOnEnabledFilter类似，只是判断标准为

spring.cloud.gateway.predicate.**COMPONENT-TYPE**.enabled

## GatewayAutoConfiguration

