
## Tickable.h

```c++
/**
 * Base class for tickable objects
 */
class ENGINE_API FTickableObjectBase

	/**
	 * Pure virtual that must be overloaded by the inheriting class. It will
	 * be called from within LevelTick.cpp after ticking all actors or from
	 * the rendering thread (depending on bIsRenderingThreadObject)
	 *
	 * @param DeltaTime	Game time passed since the last call.
	 */
	virtual void Tick( float DeltaTime ) = 0;

/**
 * This class provides common registration for gamethread tickable objects. It is an
 * abstract base class requiring you to implement the Tick() and GetStatId() methods.
 * Can optionally also be ticked in the Editor, allowing for an object that both ticks
 * during edit time and at runtime.
 */
class ENGINE_API FTickableGameObject : public FTickableObjectBase
{
public:
	/**
	 * Registers this instance with the static array of tickable objects.	
	 *
	 */
	FTickableGameObject();

	/**
	 * Removes this instance from the static array of tickable objects.
	 */
	virtual ~FTickableGameObject();
```

## TimerManager.h

```c++
/** 
 * Class to globally manage timers.
 */
class ENGINE_API FTimerManager : public FNoncopyable

	/**
	 * Sets a timer to call the given native function at a set interval.  If a timer is already set
	 * for this handle, it will replace the current timer.
	 *
	 * @param InOutHandle			If the passed-in handle refers to an existing timer, it will be cleared before the new timer is added. A new handle to the new timer is returned in either case.
	 * @param InObj					Object to call the timer function on.
	 * @param InTimerMethod			Method to call when timer fires.
	 * @param InRate				The amount of time (in seconds) between set and firing.  If <= 0.f, clears existing timers.
	 * @param InbLoop				true to keep firing at Rate intervals, false to fire only once.
	 * @param InFirstDelay			The time (in seconds) for the first iteration of a looping timer. If < 0.f InRate will be used.
	 */
	template< class UserClass >
	FORCEINLINE void SetTimer(FTimerHandle& InOutHandle, UserClass* InObj, typename FTimerDelegate::TMethodPtr< UserClass > InTimerMethod, float InRate, bool InbLoop = false, float InFirstDelay = -1.f)
	{
		InternalSetTimer(InOutHandle, FTimerUnifiedDelegate( FTimerDelegate::CreateUObject(InObj, InTimerMethod) ), InRate, InbLoop, InFirstDelay);
	}

	/** Version that takes any generic delegate. */
	FORCEINLINE void SetTimer(FTimerHandle& InOutHandle, FTimerDelegate const& InDelegate, float InRate, bool InbLoop, float InFirstDelay = -1.f)
	{
		InternalSetTimer(InOutHandle, FTimerUnifiedDelegate(InDelegate), InRate, InbLoop, InFirstDelay);
	}
	/** Version that takes a dynamic delegate (e.g. for UFunctions). */
	FORCEINLINE void SetTimer(FTimerHandle& InOutHandle, FTimerDynamicDelegate const& InDynDelegate, float InRate, bool InbLoop, float InFirstDelay = -1.f)
	{
		InternalSetTimer(InOutHandle, FTimerUnifiedDelegate(InDynDelegate), InRate, InbLoop, InFirstDelay);
	}

	/** Version that takes a TFunction */
	FORCEINLINE void SetTimer(FTimerHandle& InOutHandle, TFunction<void(void)>&& Callback, float InRate, bool InbLoop, float InFirstDelay = -1.f )
	{
		InternalSetTimer(InOutHandle, FTimerUnifiedDelegate(MoveTemp(Callback)), InRate, InbLoop, InFirstDelay);
	}

	/**
	* Clears a previously set timer, identical to calling SetTimer() with a <= 0.f rate.
	* Invalidates the timer handle as it should no longer be used.
	*
	* @param InHandle The handle of the timer to clear.
	*/
	FORCEINLINE void ClearTimer(FTimerHandle& InHandle)
	{
		if (const FTimerData* TimerData = FindTimer(InHandle))
		{
			InternalClearTimer(InHandle);
		}
		InHandle.Invalidate();
	}

	/** The array of timers - all other arrays will index into this */
	TSparseArray<FTimerData> Timers;
	/** Heap of actively running timers. */
	TArray<FTimerHandle> ActiveTimerHeap;
	/** Set of paused timers. */
	TSet<FTimerHandle> PausedTimerSet;
	/** Set of timers added this frame, to be added after timer has been ticked */
	TSet<FTimerHandle> PendingTimerSet;
	/** A map of object pointers to timers with delegates bound to those objects, for quick lookup */
	TMap<const void*, TSet<FTimerHandle>> ObjectToTimers;
  
          
```
