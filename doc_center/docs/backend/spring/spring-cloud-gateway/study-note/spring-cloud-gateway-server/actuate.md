## GatewayControllerEndpoint

通过注解RestControllerEndpoint让accuator发现这个endpoint，具体
提供的operation就是查询路由定义等

```java
@RestControllerEndpoint(id = "gateway")
public class GatewayControllerEndpoint extends AbstractGatewayControllerEndpoint {
```

## GatewayLegacyControllerEndpoint

从名字看是老版的Endpoint，通过配置文件切换