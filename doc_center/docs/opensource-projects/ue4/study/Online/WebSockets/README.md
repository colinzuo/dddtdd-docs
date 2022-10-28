
## IWebSocket.h

```c++
	/**
	 * Initiate a client connection to the server.
	 * Use this after setting up event handlers or to reconnect after connection errors.
	 */
	virtual void Connect() = 0;

	/**
	 * Close the current connection.
	 * @param Code Numeric status code explaining why the connection is being closed. Default is 1000. See WebSockets spec for valid codes.
	 * @param Reason Human readable string explaining why the connection is closing.
	 */
	virtual void Close(int32 Code = 1000, const FString& Reason = FString()) = 0;

	/**
	 * Inquire if this web socket instance is connected to a server.
	 */
	virtual bool IsConnected() = 0;
	
	/**
	 * Transmit data over the connection.
	 * @param Data data to be sent as a UTF-8 encoded string.
	 */
	virtual void Send(const FString& Data) = 0;

	/**
	 * Transmit data over the connection.
	 * @param Data raw binary data to be sent.
	 * @param Size number of bytes to send.
	 * @param bIsBinary set to true to send binary frame to the peer instead of text.
	 */
	virtual void Send(const void* Data, SIZE_T Size, bool bIsBinary = false) = 0;

	/**
	 * Delegate called when a web socket connection has been established successfully.
	 *
	 */
	DECLARE_EVENT(IWebSocket, FWebSocketConnectedEvent);
	virtual FWebSocketConnectedEvent& OnConnected() = 0;

	/**
	 * Delegate called when a web socket connection could not be established.
	 *
	 */
	DECLARE_EVENT_OneParam(IWebSocket, FWebSocketConnectionErrorEvent, const FString& /* Error */);
	virtual FWebSocketConnectionErrorEvent& OnConnectionError() = 0;

	/**
	 * Delegate called when a web socket connection has been closed.
	 *
	 */
	DECLARE_EVENT_ThreeParams(IWebSocket, FWebSocketClosedEvent, int32 /* StatusCode */, const FString& /* Reason */, bool /* bWasClean */);
	virtual FWebSocketClosedEvent& OnClosed() = 0;

	/**
	 * Delegate called when a web socket text message has been received.
	 * Assumes the payload is encoded as UTF8. For binary data, bind to OnRawMessage instead.
	 *
	 */
	DECLARE_EVENT_OneParam(IWebSocket, FWebSocketMessageEvent, const FString& /* MessageString */);
	virtual FWebSocketMessageEvent& OnMessage() = 0;

	/**
	 * Delegate called when a web socket data has been received.
	 * May be called multiple times for a message if the message was split into multiple frames. 
	 * The last parameter will be 0 on the last frame in the packet.
	 *
	 */
	DECLARE_EVENT_ThreeParams(IWebSocket, FWebSocketRawMessageEvent, const void* /* Data */, SIZE_T /* Size */, SIZE_T /* BytesRemaining */);
	virtual FWebSocketRawMessageEvent& OnRawMessage() = 0;

	/**
	* Delegate called when a web socket text message has been sent.
	* Assume UTF-8 encoding.
	*/
	DECLARE_EVENT_OneParam(IWebSocket, FWebSocketMessageSentEvent, const FString& /* MessageString */);
	virtual FWebSocketMessageSentEvent& OnMessageSent() = 0;
```

## IWebSocketsManager.h

```c++
	/**
	 * Web sockets start-up: call before creating any web sockets
	 */ 
	virtual void InitWebSockets(TArrayView<const FString> Protocols) = 0;


	/**
	 * Web sockets teardown: call at shutdown, in particular after all use of SSL has finished
	 */ 
	virtual void ShutdownWebSockets() = 0;

	/**
	 * Instantiates a new web socket for the current platform
	 *
	 * @param Url The URL to which to connect; this should be the URL to which the WebSocket server will respond.
	 * @param Protocols a list of protocols the client will handle.
	 * @return new IWebSocket instance
	 */
	virtual TSharedRef<IWebSocket> CreateWebSocket(const FString& Url, const TArray<FString>& Protocols, const TMap<FString, FString>& UpgradeHeaders) = 0;
```

## WebSocketsModule.h

```c++
/**
 * Module for web socket implementations
 */
class WEBSOCKETS_API FWebSocketsModule :
	public IModuleInterface

	/**
	 * Singleton-like access to this module's interface.  This is just for convenience!
	 * Beware of calling this during the shutdown phase, though.  Your module might have been unloaded already.
	 *
	 * @return Returns singleton instance, loading the module on demand if needed
	 */
	static FWebSocketsModule& Get();

	/**
	 * Instantiates a new web socket for the current platform
	 *
	 * @param Url The URL to which to connect; this should be the URL to which the WebSocket server will respond.
	 * @param Protocols a list of protocols the client will handle.
	 * @return new IWebSocket instance
	 */
	virtual TSharedRef<IWebSocket> CreateWebSocket(const FString& Url, const TArray<FString>& Protocols, const TMap<FString, FString>& UpgradeHeaders = TMap<FString, FString>());


	/**
	 * Instantiates a new web socket for the current platform
	 *
	 * @param Url The URL to which to connect; this should be the URL to which the WebSocket server will respond.
	 * @param Protocol an optional sub-protocol. If missing, an empty string is assumed.
	 * @return new IWebSocket instance
	 */
	virtual TSharedRef<IWebSocket> CreateWebSocket(const FString& Url, const FString& Protocol = FString(), const TMap<FString, FString>& UpgradeHeaders = TMap<FString, FString>());

	/** Manages active web sockets */
	IWebSocketsManager* WebSocketsManager;
	friend class FLwsWebSocketsManager;
	friend class FLwsWebSocket;      
```

## PlatformWebSocket.h

```c++
typedef FLwsWebSocketsManager FPlatformWebSocketsManager;
```

## WebSocketsModule.cpp

```c++
void FWebSocketsModule::StartupModule()

	// Default configuration values can be found in BaseEngine.ini
	TArray<FString> Protocols;
	GConfig->GetArray(TEXT("WebSockets"), TEXT("WebSocketsProtocols"), Protocols, GEngineIni);

	WebSocketsManager = new FPlatformWebSocketsManager;
	WebSocketsManager->InitWebSockets(Protocols);
```
