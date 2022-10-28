---
title: HTTP
---

## HttpManager.h

```c++
/**
 * Manages Http request that are currently being processed
 */
class HTTP_API FHttpManager
	: public FTSTickerObjectBase

	/**
	 * Adds an Http request instance to the manager for tracking/ticking
	 * Manager should always have a list of requests currently being processed
	 *
	 * @param Request - the request object to add
	 */
	void AddRequest(const FHttpRequestRef& Request);

	/**
	 * Removes an Http request instance from the manager
	 * Presumably it is done being processed
	 *
	 * @param Request - the request object to remove
	 */
	void RemoveRequest(const FHttpRequestRef& Request);

	/**
	 * Block until all pending requests are finished processing
	 *
	 * @param FlushReason the flush reason will influence times waited to cancel ongoing http requests
	 */
	void Flush(EHttpFlushReason FlushReason);

	/**
	 * Add task to be ran on the game thread next tick
	 *
	 * @param Task The task to be ran next tick
	 */
	void AddGameThreadTask(TFunction<void()>&& Task);      

	/** Used to lock access to add/remove/find requests */
	static FCriticalSection RequestLock;  
```

## HttpManager.cpp

```c++
FHttpManager::FHttpManager()
	: FTSTickerObjectBase(0.0f, FTSBackgroundableTicker::GetCoreTicker())
	, Thread(nullptr)
	, CorrelationIdMethod(FHttpManager::GetDefaultCorrelationIdMethod())
{
	bFlushing = false;
}

void FHttpManager::AddGameThreadTask(TFunction<void()>&& Task)
{
	if (Task)
	{
		GameThreadQueue.Enqueue(MoveTemp(Task));
	}
}

void FHttpManager::Flush(EHttpFlushReason FlushReason)
{

	FScopeLock ScopeLock(&RequestLock);

	double FlushTimeSoftLimitSeconds = FlushTimeLimitsMap[FlushReason].SoftLimitSeconds;
	double FlushTimeHardLimitSeconds = FlushTimeLimitsMap[FlushReason].HardLimitSeconds;

	// this specifies how long to sleep between calls to tick.
	// The smaller the value, the more quickly we may find out that all requests have completed, but the more work may be done in the meantime.
	float SecondsToSleepForOutstandingThreadedRequests = 0.5f;
	GConfig->GetFloat(TEXT("HTTP"), TEXT("RequestCleanupDelaySec"), SecondsToSleepForOutstandingThreadedRequests, GEngineIni);

	double BeginWaitTime = FPlatformTime::Seconds();
	double LastFlushTickTime = BeginWaitTime;
	double StallWarnTime = BeginWaitTime + 0.5;
	double AppTime = FPlatformTime::Seconds();

	// For a duration equal to FlushTimeHardLimitSeconds, we wait for ongoing http requests to complete
	while (Requests.Num() > 0 && (FlushTimeHardLimitSeconds < 0 || (AppTime - BeginWaitTime < FlushTimeHardLimitSeconds)))
	{

		// If time equal to FlushTimeSoftLimitSeconds has passed and there's still ongoing http requests, we cancel them (setting FlushTimeSoftLimitSeconds to 0 does this immediately)
		if (FlushTimeSoftLimitSeconds >= 0 && (AppTime - BeginWaitTime >= FlushTimeSoftLimitSeconds))
		{

			for (TArray<FHttpRequestRef>::TIterator It(Requests); It; ++It)
			{
				FHttpRequestRef& Request = *It;

				Request->CancelRequest();

		// Process ongoing Http Requests
		FlushTick(AppTime - LastFlushTickTime);
		LastFlushTickTime = AppTime;

		// Process threaded Http Requests
		if (Requests.Num() > 0)
		{
			if (Thread)
			{

					if (AppTime >= StallWarnTime)
					{
						// Don't emit these tracking logs in commandlet runs. Build system traps warnings during cook, and these are not truly fatal, but useful for tracking down shutdown issues.
						UE_CLOG(!IsRunningCommandlet(), LogHttp, Warning, TEXT("Ticking HTTPThread for %d outstanding Http requests."), Requests.Num());
						StallWarnTime = AppTime + 0.5;
					}
					Thread->Tick();

		AppTime = FPlatformTime::Seconds();

	// Don't emit these tracking logs in commandlet runs. Build system traps warnings during cook, and these are not truly fatal, but useful for tracking down shutdown issues.
	if (Requests.Num() > 0 && (FlushTimeHardLimitSeconds > 0 && (AppTime - BeginWaitTime > FlushTimeHardLimitSeconds)) && !IsRunningCommandlet())
	{
		UE_LOG(LogHttp, Warning, TEXT("HTTTManager::Flush exceeded hard limit time %.3fs. Current time is %.3fs. These requests are being abandoned without being flushed:"), FlushTimeHardLimitSeconds, AppTime - BeginWaitTime);                                                   

bool FHttpManager::Tick(float DeltaSeconds)
{
    QUICK_SCOPE_CYCLE_COUNTER(STAT_FHttpManager_Tick);

	// Run GameThread tasks
	TFunction<void()> Task = nullptr;
	while (GameThreadQueue.Dequeue(Task))
	{
		check(Task);
		Task();
	}

	FScopeLock ScopeLock(&RequestLock);

	// Tick each active request
	for (TArray<FHttpRequestRef>::TIterator It(Requests); It; ++It)
	{
		FHttpRequestRef Request = *It;
		Request->Tick(DeltaSeconds);
	}

	if (Thread)
	{
		TArray<IHttpThreadedRequest*> CompletedThreadedRequests;
		Thread->GetCompletedRequests(CompletedThreadedRequests);

		// Finish and remove any completed requests
		for (IHttpThreadedRequest* CompletedRequest : CompletedThreadedRequests)
		{
			FHttpRequestRef CompletedRequestRef = CompletedRequest->AsShared();
			Requests.Remove(CompletedRequestRef);
			CompletedRequest->FinishRequest();
		}
	}
	// keep ticking
	return true;
}

void FHttpManager::AddRequest(const FHttpRequestRef& Request)
{
	FScopeLock ScopeLock(&RequestLock);
	check(!bFlushing);
	Requests.Add(Request);
}

void FHttpManager::RemoveRequest(const FHttpRequestRef& Request)
{
	FScopeLock ScopeLock(&RequestLock);

	Requests.Remove(Request);
}
```

## HttpModule.h

```c++
/**
 * Module for Http request implementations
 * Use FHttpFactory to create a new Http request
 */
class FHttpModule : 
	public IModuleInterface, public FSelfRegisteringExec

	/**
	 * Instantiates a new Http request for the current platform
	 *
	 * @return new Http request instance
	 */
	virtual TSharedRef<IHttpRequest, ESPMode::ThreadSafe> CreateRequest();

	/**
	 * Only meant to be used by Http request/response implementations
	 *
	 * @return Http request manager used by the module
	 */
	inline FHttpManager& GetHttpManager()
	{
		check(HttpManager != NULL);
		return *HttpManager;
	}

	/**
	 * @return timeout in seconds for the entire http request to complete
	 */
	inline float GetHttpTimeout() const
	{
		return HttpTimeout;
	}

	/**
	 * Sets timeout in seconds for the entire http request to complete
	 */
	inline void SetHttpTimeout(float TimeOutInSec)
	{
		HttpTimeout = TimeOutInSec;
	}  
```
