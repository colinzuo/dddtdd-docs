---
title: Lws
---

## LwsWebSocketsManager.h

```c++
class FLwsWebSocketsManager
	: public IWebSocketsManager
	, public FRunnable
	, public FSingleThreadRunnable

	/**
	 * Start processing a websocket on our thread.  Called by FLwsWebSocket on the game thread.
	 * @param Socket websocket to process on our thread
	 */
	void StartProcessingWebSocket(FLwsWebSocket* Socket);

	//~ Begin FRunnable Interface
	virtual bool Init() override;
	virtual uint32 Run() override;
	virtual void Stop() override;
	virtual void Exit() override;
	//~ End FRunnable Interface

	virtual void Tick() override;

	// FLwsWebSocketsManager
	/** Game thread tick to flush events etc */
	bool GameThreadTick(float DeltaTime);

	/** libwebsockets context */
	lws_context* LwsContext;
	/** array of protocols that we have registered with libwebsockets */
	TArray<lws_protocols> LwsProtocols;

	/** Array of all WebSockets we know about.  Shared ref count modifications only occurs on the game thread */
	TArray<TSharedRef<FLwsWebSocket>> Sockets;
	/** Array of all WebSockets we are ticking on our thread */
	TArray<FLwsWebSocket*> SocketsTickingOnThread;
	/** Queue of WebSockets to start processing on our thread */
	TQueue<FLwsWebSocket*> SocketsToStart;
	/** Queue of WebSockets that we are done processing on our thread and want to be removed from our Sockets array */
	TQueue<FLwsWebSocket*> SocketsToStop;
	/** Array of WebSockets destroyed during our call to lws_service, to be added to SocketsToStop after lws_service completes */
	TArray<FLwsWebSocket*> SocketsDestroyedDuringService;

	/** Delegate for callbacks to GameThreadTick */
	FTSTicker::FDelegateHandle TickHandle;

	// Thread variables
	/** Pointer to Runnable Thread */
	FRunnableThread* Thread;

	/** signal request to stop and exit thread */
	FThreadSafeCounter ExitRequest;        
```

## LwsWebSocketsManager.cpp

```c++
FLwsWebSocketsManager::FLwsWebSocketsManager()

	ThreadTargetFrameTimeInSeconds = 1.0f / 30.0f; // 30Hz
	GConfig->GetDouble(TEXT("WebSockets.LibWebSockets"), TEXT("ThreadTargetFrameTimeInSeconds"), ThreadTargetFrameTimeInSeconds, GEngineIni);

	ThreadMinimumSleepTimeInSeconds = 0.0f;
	GConfig->GetDouble(TEXT("WebSockets.LibWebSockets"), TEXT("ThreadMinimumSleepTimeInSeconds"), ThreadMinimumSleepTimeInSeconds, GEngineIni);

	GConfig->GetBool(TEXT("LwsWebSocket"), TEXT("bDisableDomainWhitelist"), bDisableDomainAllowlist, GEngineIni);
	GConfig->GetBool(TEXT("LwsWebSocket"), TEXT("bDisableCertValidation"), bDisableCertValidation, GEngineIni);

FLwsWebSocketsManager& FLwsWebSocketsManager::Get()

	FLwsWebSocketsManager* Manager = static_cast<FLwsWebSocketsManager*>(FWebSocketsModule::Get().WebSocketsManager);

void FLwsWebSocketsManager::InitWebSockets(TArrayView<const FString> Protocols)

	GConfig->GetInt(TEXT("WebSockets.LibWebSockets"), TEXT("ThreadStackSize"), ThreadStackSize, GEngineIni);
	Thread = FForkProcessHelper::CreateForkableThread(this, TEXT("LibwebsocketsThread"), 128 * 1024, TPri_Normal, FPlatformAffinity::GetNoAffinityMask());

	// Setup our game thread tick
	FTickerDelegate TickDelegate = FTickerDelegate::CreateRaw(this, &FLwsWebSocketsManager::GameThreadTick);
	TickHandle = FTSBackgroundableTicker::GetCoreTicker().AddTicker(TickDelegate, 0.0f);

uint32 FLwsWebSocketsManager::Run()
{
	while (!ExitRequest.GetValue())
	{
		double BeginTime = FPlatformTime::Seconds();
		Tick();
		double EndTime = FPlatformTime::Seconds();

		double TotalTime = EndTime - BeginTime;
		double SleepTime = FMath::Max(ThreadTargetFrameTimeInSeconds - TotalTime, ThreadMinimumSleepTimeInSeconds);
		FPlatformProcess::SleepNoStats(SleepTime);
	}

	return 0;
}

void FLwsWebSocketsManager::Stop()
{
	ExitRequest.Set(true);
	// Safe to call from other threads
	lws_cancel_service(LwsContext);
}

void FLwsWebSocketsManager::Tick()
{
	QUICK_SCOPE_CYCLE_COUNTER(STAT_FLwsWebSocketsManager_Tick);
	LLM_SCOPE(ELLMTag::Networking);

	{
		FLwsWebSocket* SocketToStart;
		while (SocketsToStart.Dequeue(SocketToStart))
		{
			if (LwsContext && SocketToStart->LwsThreadInitialize(*LwsContext))
			{
				SocketsTickingOnThread.Add(SocketToStart);
			}
			else
			{
				// avoid destroying it twice
				if (!SocketsDestroyedDuringService.Contains(SocketToStart))
				{
					SocketsToStop.Enqueue(SocketToStart);
				}
			}
		}
	}
	for (FLwsWebSocket* Socket : SocketsTickingOnThread)
	{
		Socket->LwsThreadTick();
	}
	if (LwsContext)
	{
		lws_service(LwsContext, 0);
	}
	for (FLwsWebSocket* Socket : SocketsDestroyedDuringService)
	{
		SocketsTickingOnThread.RemoveSwap(Socket);
		SocketsToStop.Enqueue(Socket);
	}
	SocketsDestroyedDuringService.Empty();
}

TSharedRef<IWebSocket> FLwsWebSocketsManager::CreateWebSocket(const FString& Url, const TArray<FString>& Protocols, const TMap<FString, FString>& UpgradeHeaders)

	FLwsWebSocketRef Socket = MakeShared<FLwsWebSocket>(FLwsWebSocket::FPrivateToken{}, Url, Protocols, UpgradeHeaderString);
	return Socket;

bool FLwsWebSocketsManager::GameThreadTick(float DeltaTime)
{
    QUICK_SCOPE_CYCLE_COUNTER(STAT_FLwsWebSocketsManager_GameThreadTick);

	for (const FLwsWebSocketRef& Socket : Sockets)
	{
		Socket->GameThreadTick();
	}
	{
		FLwsWebSocket* Socket;
		while (SocketsToStop.Dequeue(Socket))
		{
			// Add reference then remove from Sockets, so the final callback delegates can let the owner immediately re-use the socket
			TSharedRef<FLwsWebSocket> SocketRef(Socket->AsShared());
			Sockets.RemoveSwap(SocketRef);
			// Trigger final delegates.
			Socket->GameThreadFinalize();
		}
	}
	return true;
}
```
