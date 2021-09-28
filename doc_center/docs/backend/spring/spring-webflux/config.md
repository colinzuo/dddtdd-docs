
## spring-boot-autoconfigure
### PrimaryDefaultValidatorPostProcessor

检查Validator类型的Beans是否有配置Primary，然后如果没有但有名字叫defaultValidator类型
为LocalValidatorFactoryBean的Bean存在，则相应设置它的Primary属性

### ValidationAutoConfiguration

`@ConditionalOnResource(resources = "classpath:META-INF/services/javax.validation.spi.ValidationProvider")`，如果有这个资源则继续

- LocalValidatorFactoryBean defaultValidator：如果不存在类型为Validator的Bean
则创建
- MethodValidationPostProcessor：如果不存在则创建，类上需要有Validated注解，然后
方法上可以用限制性注解比如@NotNull、@Max(10)等触发，通过Aop来创建相应class的proxy

### WebFluxAutoConfiguration

[WebFluxAutoConfiguration](../spring-boot-autoconfigure/WebFluxAutoConfiguration.md)

### WebFluxConfigurationSupport

#### InvocableHandlerMethod

遍历MethodParameter，如果没提供某个arg则通过`resolvers.resolveArgument`
解析对应参数，通过反射调用后将结果用HandlerResult封装返回

### RequestMappingInfo

`public final class RequestMappingInfo implements RequestCondition<RequestMappingInfo> {`

`T getMatchingCondition(ServerWebExchange exchange)`

通过RequestCondition中的getMatchingCondition来判断是否匹配，具体由下面Patters，RequestMethod
等判断，两个匹配的优先级为`patternsCondition > paramsCondition > headersCondition > consumesCondition > producesCondition > methodsCondition > customConditionHolder`

- PatternsRequestCondition: 按照路径匹配，`exchange.getRequest().getPath().pathWithinApplication`，其中DirectPaths代表可以直接简单字符串对比的类型
- RequestMethodsRequestCondition：按照Http Method匹配, `exchange.getRequest().getMethod`
- ParamsRequestCondition: 按照QueryParams匹配，`exchange.getRequest().getQueryParams().containsKey(this.name)`, `exchange.getRequest().getQueryParams().getFirst(this.name)`
- HeadersRequestCondition: 按照Headers匹配，`exchange.getRequest().getHeaders().get(this.name)`, `exchange.getRequest().getHeaders().getFirst(this.name)`
- ConsumesRequestCondition: 按照consumes或headers匹配，`exchange.getRequest().getHeaders().getContentType`
- ProducesRequestCondition: 按照produces或headers accept匹配，缺省通过HeaderContentTypeResolver解析accept头，`exchange.getRequest().getHeaders().getAccept()`
