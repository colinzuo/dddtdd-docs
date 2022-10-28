
## ThreadingBase.cpp

```c++
/** The global thread pool */
FQueuedThreadPool* GThreadPool = nullptr;

FQueuedThreadPool* GIOThreadPool = nullptr;

FQueuedThreadPool* GBackgroundPriorityThreadPool = nullptr;

int32 FTaskTagScope::GetStaticThreadId()
{
	static int32 ThreadID = FPlatformTLS::GetCurrentThreadId();
	return ThreadID;
}

CORE_API bool IsInGameThread()

// tasks pipe that arranges audio tasks execution one after another so no synchronisation between them is required
CORE_API UE::Tasks::FPipe GAudioPipe{ TEXT("AudioPipe") };
// True if async audio processing is enabled and started
CORE_API std::atomic<bool> GIsAudioThreadRunning{ false };

CORE_API std::atomic<bool> GIsAudioThreadSuspended{ false };

CORE_API bool IsInAudioThread()

CORE_API bool IsInRenderingThread()

CORE_API bool IsInRHIThread()

void FThreadManager::AddThread(uint32 ThreadId, FRunnableThread* Thread)
{

	FScopeLock ThreadsLock(&ThreadsCritical);	

	// Some platforms do not support TLS
	if (!Threads.Contains(ThreadId))
	{
		Threads.Add(ThreadId, Thread);
	}

FThreadManager& FThreadManager::Get()
{
	static FThreadManager Singleton;
	return Singleton;
}

/**
 * This is the interface used for all poolable threads. The usage pattern for
 * a poolable thread is different from a regular thread and this interface
 * reflects that. Queued threads spend most of their life cycle idle, waiting
 * for work to do. When signaled they perform a job and then return themselves
 * to their owning pool via a callback and go back to an idle state.
 */
class FQueuedThread
	: public FRunnable

	/** The event that tells the thread there is work to do. */
	FEvent* DoWorkEvent = nullptr;

	/** If true, the thread should exit. */
	TAtomic<bool> TimeToDie { false };

	/** The work this thread is doing. */
	IQueuedWork* volatile QueuedWork = nullptr;

	/** The pool this thread belongs to. */
	class FQueuedThreadPoolBase* OwningThreadPool = nullptr;

	/** My Thread  */
	FRunnableThread* Thread = nullptr;

	/**
	 * The real thread entry point. It waits for work events to be queued. Once
	 * an event is queued, it executes it and goes back to waiting.
	 */
	virtual uint32 Run() override;

	/**
	 * Tells the thread there is work to be done. Upon completion, the thread
	 * is responsible for adding itself back into the available pool.
	 *
	 * @param InQueuedWork The queued work to perform
	 */
	void DoWork(IQueuedWork* InQueuedWork)
	{
		DECLARE_SCOPE_CYCLE_COUNTER( TEXT( "FQueuedThread::DoWork" ), STAT_FQueuedThread_DoWork, STATGROUP_ThreadPoolAsyncTasks );

		check(QueuedWork == nullptr && "Can't do more than one task at a time");
		// Tell the thread the work to be done
		QueuedWork = InQueuedWork;
		FPlatformMisc::MemoryBarrier();
		// Tell the thread to wake up and do its job
		DoWorkEvent->Trigger();
	}

/**
 * Implementation of a queued thread pool.
 */
class FQueuedThreadPoolBase : public FQueuedThreadPool
{
protected:

	/** The work queue to pull from. */
	FThreadPoolPriorityQueue QueuedWork;
	
	/** The thread pool to dole work out to. */
	TArray<FQueuedThread*> QueuedThreads;

	/** All threads in the pool. */
	TArray<FQueuedThread*> AllThreads;

	/** The synchronization object used to protect access to the queued work. */
	FCriticalSection* SynchQueue;

	/** If true, indicates the destruction process has taken place. */
	bool TimeToDie;

	void AddQueuedWork(IQueuedWork* InQueuedWork, EQueuedWorkPriority InQueuedWorkPriority) override

		FQueuedThread* Thread = nullptr;

		{
			FScopeLock sl(SynchQueue);
			const int32 AvailableThreadCount = QueuedThreads.Num();
			if (AvailableThreadCount == 0)
			{
				// No thread available, queue the work to be done
				// as soon as one does become available
				QueuedWork.Enqueue(InQueuedWork, InQueuedWorkPriority);
				return;
			}

			const int32 ThreadIndex = AvailableThreadCount - 1;

			Thread = QueuedThreads[ThreadIndex];
			// Remove it from the list so no one else grabs it
			QueuedThreads.RemoveAt(ThreadIndex, 1, /* do not allow shrinking */ false);
		}

		// Tell our chosen thread to do the work
		Thread->DoWork(InQueuedWork);

	IQueuedWork* ReturnToPoolOrGetNextJob(FQueuedThread* InQueuedThread)

uint32
FQueuedThread::Run()
{
	while (!TimeToDie.Load(EMemoryOrder::Relaxed))

		while (LocalQueuedWork)
		{
			// Tell the object to do the work
			LocalQueuedWork->DoThreadedWork();
			// Let the object cleanup before we remove our ref to it
			LocalQueuedWork = OwningThreadPool->ReturnToPoolOrGetNextJob(this);
		}									
```

## IFileManager

- `uint32 Copy`
- `FArchive * CreateFileReader`
- `FArchive * CreateFileWriter`
- `bool Delete`
- `bool DeleteDirectory`
- `bool DirectoryExists`
- `bool FileExists`
- `int64 FileSize`
- `void FindFiles`
- `void FindFilesRecursive`
- `static IFileManager & Get()`
- `FDateTime GetAccessTimeStamp`
- `double GetFileAgeSeconds`
- `FDateTime GetTimeStamp`
- `bool IterateDirectory`
- `bool IterateDirectoryRecursively`
- `bool MakeDirectory`
- `bool Move`
- `bool SetTimeStamp`

## FPlatformFileManager

```c++
	/** Currently used platform file. */
	class IPlatformFile* TopmostPlatformFile;

	/**
	 * Gets the currently used platform file.
	 *
	 * @return Reference to the currently used platform file.
	 */
	IPlatformFile& GetPlatformFile( );

	/**
	 * Sets the current platform file.
	 *
	 * @param NewTopmostPlatformFile Platform file to be used.
	 */
	void SetPlatformFile( IPlatformFile& NewTopmostPlatformFile );

	/**
	* Removes the specified file wrapper from the platform file wrapper chain.
	*
	* THIS IS EXTREMELY DANGEROUS AFTER THE ENGINE HAS BEEN INITIALIZED AS WE MAY BE MODIFYING
	* THE WRAPPER CHAIN WHILE THINGS ARE BEING LOADED
	*
	* @param Name of the platform file to create.
	* @return Platform file instance of the platform file type was found, nullptr otherwise.
	*/
	void RemovePlatformFile(IPlatformFile* PlatformFileToRemove);    
```
