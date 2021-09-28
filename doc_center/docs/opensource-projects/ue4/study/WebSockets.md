
## [FWebSocketsModule][]

```cpp
static FWebSocketsModule & Get()
```

## [IWebSocketsManager][]

### InitWebSockets

Web sockets start-up: call before creating any web sockets

```cpp
  void InitWebSockets
  (
      TArrayView < const FString > Protocols
  )
```

### CreateWebSocket

Instantiates a new web socket for the current platform

```cpp
  TSharedRef < IWebSocket > CreateWebSocket
  (
      const FString & Url,
      const TArray < FString > & Protocols,
      const TMap < FString , FString > & UpgradeHeaders
  )
```

### ShutdownWebSockets

Web sockets teardown: call at shutdown, in particular after all use of SSL has finished

```cpp
  void ShutdownWebSockets()
```

## [IWebSocket][]

- Close: Close the current connection
- Connect: Initiate a client connection to the server
- IsConnected: Inquire if this web socket instance is connected to a server
- OnClosed
- OnConnected
- OnConnectionError
- OnMessage
- OnMessageSent
- OnRawMessage
- Send

## 参考

<https://github.com/tiax615/UE4_Network/blob/master/Source/UE4_Network/ActorWebSocket.cpp>

[FWebSocketsModule]: https://docs.unrealengine.com/en-US/API/Runtime/WebSockets/FWebSocketsModule/index.html

[IWebSocketsManager]: https://docs.unrealengine.com/en-US/API/Runtime/WebSockets/IWebSocketsManager/index.html

[IWebSocket]: https://docs.unrealengine.com/en-US/API/Runtime/WebSockets/IWebSocket/index.html
