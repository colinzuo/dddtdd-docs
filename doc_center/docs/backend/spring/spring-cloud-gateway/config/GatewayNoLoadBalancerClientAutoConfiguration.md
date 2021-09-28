
## NoLoadBalancerClientFilter noLoadBalancerClientFilter

如果没有ReactiveLoadBalancerClientFilter，则当有lb路由时报错

```java
  if (url == null || (!"lb".equals(url.getScheme()) && !"lb".equals(schemePrefix))) {
    return chain.filter(exchange);
  }

  throw NotFoundException.create(use404, "Unable to find instance for " + url.getHost());
```
