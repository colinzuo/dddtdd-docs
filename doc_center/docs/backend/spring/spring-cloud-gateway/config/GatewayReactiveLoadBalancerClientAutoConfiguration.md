
## ReactiveLoadBalancerClientFilter gatewayLoadBalancerClientFilter

实现GlobalFilter和Ordered接口

`public class ReactiveLoadBalancerClientFilter implements GlobalFilter, Ordered {`

`public static final int LOAD_BALANCER_CLIENT_FILTER_ORDER = 10150;`

首先判断url是否是lb开头

`if (url == null || (!"lb".equals(url.getScheme()) && !"lb".equals(schemePrefix))) {`

然后保存原始url到一个LinkedHashSet

`addOriginalRequestUrl(exchange, url);`

选择service id

`choose(lbRequest, serviceId, supportedLifecycleProcessors)`

更新request url，写入属性`GATEWAY_REQUEST_URL_ATTR`，遍历调用onStartRequest

```java
			exchange.getAttributes().put(GATEWAY_REQUEST_URL_ATTR, requestUrl);
			exchange.getAttributes().put(GATEWAY_LOADBALANCER_RESPONSE_ATTR, response);
			supportedLifecycleProcessors.forEach(lifecycle -> lifecycle.onStartRequest(lbRequest, response));
```

调用chain的下一个filter

`then(chain.filter(exchange))`

调用`lifecycle.onComplete`
