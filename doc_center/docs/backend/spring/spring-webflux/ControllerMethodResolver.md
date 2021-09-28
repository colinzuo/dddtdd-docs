
管理各种方法参数的resolver

- initBinderResolvers：类型为SyncHandlerMethodArgumentResolver，supportDataBinding为false，MessageReader为空
- modelAttributeResolvers：supportDataBinding为true，MessageReader为空
- requestMappingResolvers：supportDataBinding为true，MessageReader不为空
- exceptionHandlerResolvers：supportDataBinding为false，MessageReader为空

## AdviceCache

首先从BeanFactory找所有有ControllerAdvice注解的Bean

- modelAttributeAdviceCache: 找Bean中有ModelAttribute注解的方法
- initBinderAdviceCache：找Bean中有InitBinder注解的方法
- exceptionHandlerAdviceCache: 找Bean中有ExceptionHandler注解的方法，
这个注解的value为它所能处理的Exceptions，或者Method中有参数为Exception类型，
然后生成Exception到Method的映射

## getRequestMappingMethod

创建InvocableHandlerMethod，并配置requestMappingResolvers到ArgumentResolvers

## getInitBinderMethods

首先从initBinderAdviceCache获取匹配handler对应BeanType的全局函数
列表，然后从handler自己BeanType上查本地函数列表

## getModelAttributeMethods

首先从modelAttributeAdviceCache获取匹配handler对应BeanType的全局函数
列表，然后从handler自己BeanType上查本地函数列表

## getExceptionHandlerMethod

首先从exceptionHandlerCache找本地配置的ExceptionHandler，
如果没找到则从exceptionHandlerAdviceCache找全局配置的第一个
能处理的ExceptionHandler

## getSessionAttributesHandler

根据handler的BeanType从sessionAttributesHandlerCache获取对应
SessionAttributesHandler，支持保存和获取session attributes

## 不同的Resolver

### NamedValueArgumentResolver流程

首先提取NamedValueInfo，比如通过Annotation或者parameter name，
然后解析名字中的变量生成新的名字，然后调用resolveName从请求中提取对应信息，
然后如果为空字符串则解析缺省值，然后创建变量名字对应的WebDataBinder，
`bindingContext.createDataBinder(exchange, namedValueInfo.name)`这个
里面会触发WebBindingInitializer的initBinder被调用，然后会触发initDataBinder
函数列表被调用，然后通过Binder来convert前面结果到需要的变量类型

- RequestParamMethodArgumentResolver： `exchange.getRequest().getQueryParams().get(name)`
- RequestParamMapMethodArgumentResolver: `exchange.getRequest().getQueryParams()`
- PathVariableMethodArgumentResolver: `exchange.getAttributeOrDefault(HandlerMapping.URI_TEMPLATE_VARIABLES_ATTRIBUTE, Collections.emptyMap()).get(name)`
- RequestHeaderMethodArgumentResolver：`exchange.getRequest().getHeaders().get(name)`
- CookieValueMethodArgumentResolver: `exchange.getRequest().getCookies().getFirst(name)`
- ExpressionValueMethodArgumentResolver: 通过`resolveNamedValue`返回null触发直接
使用`namedValueInfo.defaultValue`，也就是annotation中value的值
- SessionAttributeMethodArgumentResolver：`exchange.getSession().map(session -> session.getAttribute(name))`
- RequestAttributeMethodArgumentResolver: `exchange.getAttribute(name)`

### MessageReaderArgumentResolver

通过`exchange.getRequest()`获取request，通过`request.getHeaders().getContentType()`
获取ContentType, 遍历HttpMessageReader列表，如果canRead为真，通过
`reader.readMono`读取body，如果isBodyRequired则`mono.switchIfEmpty(Mono.error(() -> handleMissingBody(bodyParam)))`，如果有配置validation，则`mono.doOnNext(target -> validate(target, hints, bodyParam, bindingContext, exchange))`，

- HttpEntityMethodArgumentResolver: 先通过readBody读取body，然后和`exchange.getRequest()`中的信息组合生成RequestEntity或者HttpEntity

### RequestPartMethodArgumentResolver

通过`parameter.getParameterAnnotation(RequestPart.class)`获取part名字，
通过`exchange.getMultipartData()`获取Multipart数据，然后过滤选择指定名字
的part，如果parameter的类型是Part类型，直接返回，否则通过Part生成PartServerHttpRequest，然后对它readBody进行和RequestBody一样的类型转换

### ModelAttributeMethodArgumentResolver

通过WebExchangeDataBinder提取exchange中可bind的values map，
提取ModelAttribute的Constructor的参数列表，从bindValues提取
对应值并当需要时通过`binder.convertIfNecessary`做类型转换，
准备好后调用Constructor生成对应ModelAttribute，然后调用
`binder.bind(exchange)`继续bind Property，然后调用`binder.validate`
来验证，如果Binding有Errors并且下一个参数不是`Errors.class`则
报WebExchangeBindException

### ErrorsMethodArgumentResolver

通过上一个parameter index获取name，然后通过`context.getModel().asMap().get(BindingResult.MODEL_KEY_PREFIX + name)`获取BindingResult

### ServerWebExchangeMethodArgumentResolver

从ServerWebExchange提取相应信息，比如`exchange`, `exchange.getRequest()`,
`exchange.getResponse()`, `exchange.getRequest().getMethod()`

### PrincipalMethodArgumentResolver

`exchange.getPrincipal`

### SessionStatusMethodArgumentResolver

`((InitBinderBindingContext) bindingContext).getSessionStatus()`

### WebSessionMethodArgumentResolver

`exchange.getSession()`