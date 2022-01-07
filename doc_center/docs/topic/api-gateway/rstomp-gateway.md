
## websocket监听

Spring Webflux负责websocket监听，收到新连接后首先处于Connecting状态

## Connecting状态

按照rstomp协议检查connect消息，没问题则进入Registering状态

## Registering状态

收到register消息后通过RStompServerSessionService进行鉴权及session的创建，具体
的session如果是业务session则内含stomp session

成功的话则通知MessageRelayService有新session

然后启动keepalive

然后发送RStompServerAppSessionStartEvent事件

## Registered状态

通过RStompMessageHandler对消息进行dispatch

## session结束

如果之前appSessionStarted则发送RStompServerAppSessionEndEvent

