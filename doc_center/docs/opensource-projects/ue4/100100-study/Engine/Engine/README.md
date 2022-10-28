---
title: Engine
---

## FStreamableHandle

A handle to a synchronous or async load. As long as the handle is Active, loaded assets will stay in memory

```c++
	/** Bind delegate that is called when load completes, only works if loading is in progress. This will overwrite any already bound delegate! */
	bool BindCompleteDelegate(FStreamableDelegate NewDelegate);

	/** Bind delegate that is called periodically as delegate updates, only works if loading is in progress. This will overwrite any already bound delegate! */
	bool BindUpdateDelegate(FStreamableUpdateDelegate NewDelegate);

	/** Returns progress as a value between 0.0 and 1.0. */
	float GetProgress() const;  
```

## UAssetManager

```c++
/** 
 * A singleton UObject that is responsible for loading and unloading PrimaryAssets, and maintaining game-specific asset references
 * Games should override this class and change the class reference
 */

	/** Accesses the StreamableManager used by this Asset Manager. Static for easy access */
	static FStreamableManager& GetStreamableManager() { return Get().StreamableManager; }

	/** Called after PIE ends, resets loading state */
	virtual void EndPIE(bool bStartSimulate);   
```

## Engine.h

```c++
/** FWorldContext
 *	A context for dealing with UWorlds at the engine level. As the engine brings up and destroys world, we need a way to keep straight
 *	what world belongs to what.
 *
 *	WorldContexts can be thought of as a track. By default we have 1 track that we load and unload levels on. Adding a second context is adding
 *	a second track; another track of progression for worlds to live on. 
 *
 *	For the GameEngine, there will be one WorldContext until we decide to support multiple simultaneous worlds.
 *	For the EditorEngine, there may be one WorldContext for the EditorWorld and one for the PIE World.
 *
 *	FWorldContext provides both a way to manage 'the current PIE UWorld*' as well as state that goes along with connecting/travelling to 
 *  new worlds.
 *
 *	FWorldContext should remain internal to the UEngine classes. Outside code should not keep pointers or try to manage FWorldContexts directly.
 *	Outside code can still deal with UWorld*, and pass UWorld*s into Engine level functions. The Engine code can look up the relevant context 
 *	for a given UWorld*.
 *
 *  For convenience, FWorldContext can maintain outside pointers to UWorld*s. For example, PIE can tie UWorld* UEditorEngine::PlayWorld to the PIE
 *	world context. If the PIE UWorld changes, the UEditorEngine::PlayWorld pointer will be automatically updated. This is done with AddRef() and
 *  SetCurrentWorld().
 *
 */
USTRUCT()
struct FWorldContext

	/** Handles to object references; used by the engine to e.g. the prevent objects from being garbage collected.	*/
	UPROPERTY()
	TArray<TObjectPtr<class UObjectReferencer>> ObjectReferencers;

	UPROPERTY()
	TObjectPtr<class UGameViewportClient> GameViewport;

	UPROPERTY()
	TObjectPtr<class UGameInstance> OwningGameInstance;

	FORCEINLINE UWorld* World() const
	{
		return ThisCurrentWorld;
	}

/**
 * Abstract base class of all Engine classes, responsible for management of systems critical to editor or game systems.
 * Also defines default classes for certain engine systems.
 */
UCLASS(abstract, config=Engine, defaultconfig, transient)
class ENGINE_API UEngine
	: public UObject
	, public FExec

	UPROPERTY()
	TSubclassOf<class ULocalPlayer>  LocalPlayerClass;

	/** Sets the class to use for local players, which can be overridden to store game-specific information for a local player. */
	UPROPERTY(globalconfig, noclear, EditAnywhere, Category=DefaultClasses, meta=(MetaClass="LocalPlayer", DisplayName="Local Player Class", ConfigRestartRequired=true))
	FSoftClassPath LocalPlayerClassName;

	UPROPERTY()
	TSubclassOf<class AWorldSettings>  WorldSettingsClass;

	/** Sets the class to use for WorldSettings, which can be overridden to store game-specific information on map/world. */
	UPROPERTY(globalconfig, noclear, EditAnywhere, Category=DefaultClasses, meta=(MetaClass="WorldSettings", DisplayName="World Settings Class", ConfigRestartRequired=true))
	FSoftClassPath WorldSettingsClassName;

	UPROPERTY(globalconfig, noclear, meta=(MetaClass="NavigationSystem", DisplayName="Navigation System Class"))
	FSoftClassPath NavigationSystemClassName;

	/** Sets the class to use for NavigationSystem, which can be overridden to change game-specific navigation/AI behavior. */
	UPROPERTY()
	TSubclassOf<class UNavigationSystemBase>  NavigationSystemClass;

	/** Global instance of the user game settings */
	UPROPERTY()
	TObjectPtr<class UGameUserSettings> GameUserSettings;

	/** A UObject spawned at initialization time to handle game-specific data */
	UPROPERTY()
	TObjectPtr<UObject> GameSingleton;

	/** A UObject spawned at initialization time to handle runtime asset loading and management */
	UPROPERTY()
	TObjectPtr<class UAssetManager> AssetManager;

	/** The view port representing the current game instance. Can be 0 so don't use without checking. */
	UPROPERTY()
	TObjectPtr<class UGameViewportClient> GameViewport;

	bool HandleFlushLogCommand( const TCHAR* Cmd, FOutputDevice& Ar );
	bool HandleGameVerCommand( const TCHAR* Cmd, FOutputDevice& Ar );
	bool HandleStatCommand( UWorld* World, FCommonViewportClient* ViewportClient, const TCHAR* Cmd, FOutputDevice& Ar );
	bool HandleStopMovieCaptureCommand( const TCHAR* Cmd, FOutputDevice& Ar );
	bool HandleCrackURLCommand( const TCHAR* Cmd, FOutputDevice& Ar );
	bool HandleDeferCommand( const TCHAR* Cmd, FOutputDevice& Ar );

/** Global engine pointer. Can be 0 so don't use without checking. */
extern ENGINE_API class UEngine*			GEngine;										
```

## EngineBaseTypes.h

```c++
//
//	EInputEvent
//
UENUM( BlueprintType, meta=(ScriptName="InputEventType"))
enum EInputEvent
{
	IE_Pressed              =0,
	IE_Released             =1,
	IE_Repeat               =2,
	IE_DoubleClick          =3,
	IE_Axis                 =4,
	IE_MAX                  =5,
};

/** Determines which ticking group a tick function belongs to. */
UENUM(BlueprintType)
enum ETickingGroup
{
	/** Any item that needs to be executed before physics simulation starts. */
	TG_PrePhysics UMETA(DisplayName="Pre Physics"),

	/** Special tick group that starts physics simulation. */							
	TG_StartPhysics UMETA(Hidden, DisplayName="Start Physics"),

	/** Any item that can be run in parallel with our physics simulation work. */
	TG_DuringPhysics UMETA(DisplayName="During Physics"),

	/** Special tick group that ends physics simulation. */
	TG_EndPhysics UMETA(Hidden, DisplayName="End Physics"),

	/** Any item that needs rigid body and cloth simulation to be complete before being executed. */
	TG_PostPhysics UMETA(DisplayName="Post Physics"),

	/** Any item that needs the update work to be done before being ticked. */
	TG_PostUpdateWork UMETA(DisplayName="Post Update Work"),

	/** Catchall for anything demoted to the end. */
	TG_LastDemotable UMETA(Hidden, DisplayName = "Last Demotable"),

	/** Special tick group that is not actually a tick group. After every tick group this is repeatedly re-run until there are no more newly spawned items to run. */
	TG_NewlySpawned UMETA(Hidden, DisplayName="Newly Spawned"),

	TG_MAX,
};

/** 
* Abstract Base class for all tick functions.
**/
USTRUCT()
struct ENGINE_API FTickFunction

	/**
	 * Defines the minimum tick group for this tick function. These groups determine the relative order of when objects tick during a frame update.
	 * Given prerequisites, the tick may be delayed.
	 *
	 * @see ETickingGroup 
	 * @see FTickFunction::AddPrerequisite()
	 */
	UPROPERTY(EditDefaultsOnly, Category="Tick", AdvancedDisplay)
	TEnumAsByte<enum ETickingGroup> TickGroup;

	/** The frequency in seconds at which this tick function will be executed.  If less than or equal to 0 then it will tick every frame */
	UPROPERTY(EditDefaultsOnly, Category="Tick", meta=(DisplayName="Tick Interval (secs)"))
	float TickInterval;

	/** 
	 * Adds the tick function to the master list of tick functions. 
	 * @param Level - level to place this tick function in
	 **/
	void RegisterTickFunction(class ULevel* Level);
	/** Removes the tick function from the master list of tick functions. **/
	void UnRegisterTickFunction();
	/** See if the tick function is currently registered */
	bool IsTickFunctionRegistered() const { return (InternalData && InternalData->bRegistered); }

/** 
* Tick function that calls AActor::TickActor
**/
USTRUCT()
struct FActorTickFunction : public FTickFunction

	/**  AActor  that is the target of this tick **/
	class AActor*	Target;

	/** 
		* Abstract function actually execute the tick. 
		* @param DeltaTime - frame time to advance, in seconds
		* @param TickType - kind of tick for this frame
		* @param CurrentThread - thread we are executing on, useful to pass along as new tasks are created
		* @param MyCompletionGraphEvent - completion event for this task. Useful for holding the completetion of this task until certain child tasks are complete.
	**/
	ENGINE_API virtual void ExecuteTick(float DeltaTime, ELevelTick TickType, ENamedThreads::Type CurrentThread, const FGraphEventRef& MyCompletionGraphEvent) override;

/** 
* Tick function that calls UActorComponent::ConditionalTick
**/
USTRUCT()
struct FActorComponentTickFunction : public FTickFunction

	/**  AActor  component that is the target of this tick **/
	class UActorComponent*	Target;

	/** 
		* Abstract function actually execute the tick. 
		* @param DeltaTime - frame time to advance, in seconds
		* @param TickType - kind of tick for this frame
		* @param CurrentThread - thread we are executing on, useful to pass along as new tasks are created
		* @param MyCompletionGraphEvent - completion event for this task. Useful for holding the completetion of this task until certain child tasks are complete.
	**/
	ENGINE_API virtual void ExecuteTick(float DeltaTime, ELevelTick TickType, ENamedThreads::Type CurrentThread, const FGraphEventRef& MyCompletionGraphEvent) override;

//URL structure.
USTRUCT()
struct ENGINE_API FURL

	// Protocol, i.e. "unreal" or "http".
	UPROPERTY()
	FString Protocol;

	// Optional hostname, i.e. "204.157.115.40" or "unreal.epicgames.com", blank if local.
	UPROPERTY()
	FString Host;

/**
 * The network mode the game is currently running.
 * @see https://docs.unrealengine.com/latest/INT/Gameplay/Networking/Overview/
 */
enum ENetMode
{
	/** Standalone: a game without networking, with one or more local players. Still considered a server because it has all server functionality. */
	NM_Standalone,

	/** Dedicated server: server with no local players. */
	NM_DedicatedServer,

	/** Listen server: a server that also has a local player who is hosting the game, available to other players on the network. */
	NM_ListenServer,

	/**
	 * Network client: client connected to a remote server.
	 * Note that every mode less than this value is a kind of server, so checking NetMode < NM_Client is always some variety of server.
	 */
	NM_Client,

	NM_MAX,
};
```

## GameInstance.h

```c++
/**
 * GameInstance: high-level manager object for an instance of the running game.
 * Spawned at game creation and not destroyed until game instance is shut down.
 * Running as a standalone game, there will be one of these.
 * Running in PIE (play-in-editor) will generate one of these per PIE instance.
 */

UCLASS(config=Game, transient, BlueprintType, Blueprintable)
class ENGINE_API UGameInstance : public UObject, public FExec

	//~ Begin UObject Interface
	virtual class UWorld* GetWorld() const final;

	class UEngine* GetEngine() const;

	struct FWorldContext* GetWorldContext() const { return WorldContext; };

	virtual void LoadComplete(const float LoadTime, const FString& MapName) {}

	inline FTimerManager& GetTimerManager() const { return *TimerManager; }

	inline FLatentActionManager& GetLatentActionManager() const { return *LatentActionManager;  }

	FTimerManager* TimerManager;
	FLatentActionManager* LatentActionManager;

	/** Returns true if this instance is for a dedicated server world */
	bool IsDedicatedServerInstance() const;

	/** Registers an object to keep alive as long as this game instance is alive */
	virtual void RegisterReferencedObject(UObject* ObjectToReference);

	/** Remove a referenced object, this will allow it to GC out */
	virtual void UnregisterReferencedObject(UObject* ObjectToReference);                
```

## Level.h

```c++
//
// The level object.  Contains the level's actor list, BSP information, and brush list.
// Every Level has a World as its Outer and can be used as the PersistentLevel, however,
// when a Level has been streamed in the OwningWorld represents the World that it is a part of.
//


/**
 * A Level is a collection of Actors (lights, volumes, mesh instances etc.).
 * Multiple Levels can be loaded and unloaded into the World to create a streaming experience.
 * 
 * @see https://docs.unrealengine.com/latest/INT/Engine/Levels
 * @see UActor
 */
UCLASS(MinimalAPI)
class ULevel : public UObject, public IInterface_AssetUserData, public ITextureStreamingContainer

	/** Array of all actors in this level, used by FActorIteratorBase and derived classes */
	TArray<AActor*> Actors;

	/** BSP Model components used for rendering. */
	UPROPERTY()
	TArray<TObjectPtr<class UModelComponent>> ModelComponents;  
```

## World.h

```c++
// List of delegates for the world being registered to an audio device.
class ENGINE_API FAudioDeviceWorldDelegates
{
public:
	// Called whenever a world is registered to an audio device. UWorlds are not guaranteed to be registered to the same
	// audio device throughout their lifecycle, and there is no guarantee on the lifespan of both the UWorld and the Audio
	// Device registered in this callback.
	DECLARE_MULTICAST_DELEGATE_TwoParams(FOnWorldRegisteredToAudioDevice, const UWorld* /*InWorld */, Audio::FDeviceId /* AudioDeviceId*/);
	static FOnWorldRegisteredToAudioDevice OnWorldRegisteredToAudioDevice;

	// Called whenever a world is unregistered from an audio device. UWorlds are not guaranteed to be registered to the same
	// audio device throughout their lifecycle, and there is no guarantee on the lifespan of both the UWorld and the Audio
	// Device registered in this callback.
	DECLARE_MULTICAST_DELEGATE_TwoParams(FOnWorldUnregisteredWithAudioDevice, const UWorld* /*InWorld */, Audio::FDeviceId /* AudioDeviceId*/);
	static FOnWorldUnregisteredWithAudioDevice OnWorldUnregisteredWithAudioDevice;
};

/* World actors spawmning helper functions */
struct ENGINE_API FActorSpawnUtils
{
	/**
	 * Function to generate a locally or globally unique actor name. To generate a globally unique name, we store an epoch number
	 * in the name number (while maintaining compatibility with fast path name generation, see GFastPathUniqueNameGeneration) and
	 * also append an unique user id to the name.
	 *
	 * @param	Level			the new actor level
	 * @param	Class			the new actor class
	 * @param	BaseName		optional base name
	 * @param	bGloballyUnique	whether to create a globally unique name
	 * @return	generated actor name
	**/
	static FName MakeUniqueActorName(ULevel* Level, const UClass* Class, FName BaseName, bool bGloballyUnique);

	/**
	 * Determine if an actor name is globally unique or not.
	 *
	 * @param	Name			the name to check
	 * @return true if the provided name is globally unique
	**/
	static bool IsGloballyUniqueName(FName Name);

	/**
	 * Return the base ename (without any number of globally unique identifier).
	**/
	static FName GetBaseName(FName Name);
};

/** 
 * The World is the top level object representing a map or a sandbox in which Actors and Components will exist and be rendered.  
 *
 * A World can be a single Persistent Level with an optional list of streaming levels that are loaded and unloaded via volumes and blueprint functions
 * or it can be a collection of levels organized with a World Composition.
 *
 * In a standalone game, generally only a single World exists except during seamless area transitions when both a destination and current world exists.
 * In the editor many Worlds exist: The level being edited, each PIE instance, each editor tool which has an interactive rendered viewport, and many more.
 *
 */

UCLASS(customConstructor, config=Engine)
class ENGINE_API UWorld final : public UObject, public FNetworkNotify

	/** Whether we are in the middle of ticking actors/components or not														*/
	uint8 bInTick:1;

	/** The world's navigation data manager */
	UPROPERTY(Transient)
	TObjectPtr<class UNavigationSystemBase>				NavigationSystem;

	/** The current GameMode, valid only on the server */
	UPROPERTY(Transient)
	TObjectPtr<class AGameModeBase>						AuthorityGameMode;

	/** The replicated actor which contains game state information that can be accessible to clients. Direct access is not allowed, use GetGameState<>() */
	UPROPERTY(Transient)
	TObjectPtr<class AGameStateBase>						GameState;

	/** The AI System handles generating pathing information and AI behavior */
	UPROPERTY(Transient)
	TObjectPtr<class UAISystemBase>						AISystem;
	
	/** RVO avoidance manager used by game */
	UPROPERTY(Transient)
	TObjectPtr<class UAvoidanceManager>					AvoidanceManager;

	/** Array of levels currently in this world. Not serialized to disk to avoid hard references. */
	UPROPERTY(Transient)
	TArray<TObjectPtr<class ULevel>>						Levels;

	/** Array of level collections currently in this world. */
	UPROPERTY(Transient, NonTransactional)
	TArray<FLevelCollection>					LevelCollections;

	UPROPERTY(Transient)
	TObjectPtr<class UGameInstance>						OwningGameInstance;

	/** Get the CurrentLevel for this world. **/
	class ULevel* GetCurrentLevel() const;

	/** List of all the controllers in the world. */
	TArray<TWeakObjectPtr<class AController> > ControllerList;

	/** List of all the player controllers in the world. */
	TArray<TWeakObjectPtr<class APlayerController> > PlayerControllerList;

	/** a delegate that broadcasts a notification whenever an actor is spawned */
	mutable FOnActorSpawned OnActorSpawned;

	/** Gameplay timers. */
	class FTimerManager* TimerManager;

	/** Latent action manager. */
	struct FLatentActionManager LatentActionManager;

	/**  Time in seconds since level began play, but IS paused when the game is paused, and IS dilated/clamped. */
	float TimeSeconds;

	/** All levels information from which our world is composed */
	UPROPERTY()
	TObjectPtr<class UWorldComposition> WorldComposition;

	/** Returns the set of levels in this collection. */
	const TSet<TObjectPtr<ULevel>>& GetLevels() const { return Levels; }

	/**
	 *  Trace a ray against the world using object types and return the first blocking hit
	 *  @param  OutHit          First blocking hit found
	 *  @param  Start           Start location of the ray
	 *  @param  End             End location of the ray
	 *	@param	ObjectQueryParams	List of object types it's looking for
	 *  @param  Params          Additional parameters used for the trace
	 *  @return TRUE if any hit is found
	 */
	bool LineTraceSingleByObjectType(struct FHitResult& OutHit,const FVector& Start,const FVector& End,const FCollisionObjectQueryParams& ObjectQueryParams, const FCollisionQueryParams& Params = FCollisionQueryParams::DefaultQueryParam) const;

	/**
	 *  Sweep a shape against the world and return the first blocking hit using object types
	 *  @param  OutHit          First blocking hit found
	 *  @param  Start           Start location of the shape
	 *  @param  End             End location of the shape
	 *	@param	ObjectQueryParams	List of object types it's looking for
	 *  @param	CollisionShape	CollisionShape - supports Box, Sphere, Capsule
	 *  @param  Params          Additional parameters used for the trace
	 *  @return TRUE if any hit is found
	 */
	bool SweepSingleByObjectType(struct FHitResult& OutHit, const FVector& Start, const FVector& End, const FQuat& Rot, const FCollisionObjectQueryParams& ObjectQueryParams, const FCollisionShape& CollisionShape, const FCollisionQueryParams& Params = FCollisionQueryParams::DefaultQueryParam) const;

	/**
	 * Interface for Async. Pretty much same parameter set except you can optional set delegate to be called when execution is completed and you can set UserData if you'd like
	 * if no delegate, you can query trace data using QueryTraceData or QueryOverlapData
	 * the data is available only in the next frame after request is made - in other words, if request is made in frame X, you can get the result in frame (X+1)
	 *
	 *	@param	InTraceType		Indicates if you want multiple results, single hit result, or just yes/no (no hit information)
	 *  @param  Start           Start location of the ray
	 *  @param  End             End location of the ray
	 *	@param	ObjectQueryParams	List of object types it's looking for
	 *  @param  Params          Additional parameters used for the trace
	 *	@param	InDeleagte		Delegate function to be called - to see example, search FTraceDelegate
	 *							Example can be void MyActor::TraceDone(const FTraceHandle& TraceHandle, FTraceDatum & TraceData)
	 *							Before sending to the function, 
	 *						
	 *							FTraceDelegate TraceDelegate;
	 *							TraceDelegate.BindRaw(this, &MyActor::TraceDone);
	 * 
	 *	@param	UserData		UserData
	 */ 
	FTraceHandle	AsyncLineTraceByObjectType(EAsyncTraceType InTraceType, const FVector& Start,const FVector& End, const FCollisionObjectQueryParams& ObjectQueryParams, const FCollisionQueryParams& Params = FCollisionQueryParams::DefaultQueryParam, FTraceDelegate * InDelegate=NULL, uint32 UserData = 0 );

	/**
	 * Returns the AWorldSettings actor associated with this world.
	 *
	 * @return AWorldSettings actor associated with this world
	 */
	UFUNCTION(BlueprintCallable, Category="Utilities|World", meta=(DisplayName="GetWorldSettings", ScriptName="GetWorldSettings"))
	AWorldSettings* K2_GetWorldSettings();
	AWorldSettings* GetWorldSettings( bool bCheckStreamingPersistent = false, bool bChecked = true ) const;

	/**
	 * Returns the name of the current map, taking into account using a dummy persistent world
	 * and loading levels into it via PrepareMapChange.
	 *
	 * @return	name of the current map
	 */
	const FString GetMapName() const;

	/**
	 * Run a tick group, ticking all actors and components
	 * @param Group - Ticking group to run
	 * @param bBlockTillComplete - if true, do not return until all ticks are complete
	 */
	void RunTickGroup(ETickingGroup Group, bool bBlockTillComplete);

	/**
	 * Spawn Actors with given transform and SpawnParameters
	 * 
	 * @param	Class					Class to Spawn
	 * @param	Location				Location To Spawn
	 * @param	Rotation				Rotation To Spawn
	 * @param	SpawnParameters			Spawn Parameters
	 *
	 * @return	Actor that just spawned
	 */
	AActor* SpawnActor( UClass* InClass, FVector const* Location=NULL, FRotator const* Rotation=NULL, const FActorSpawnParameters& SpawnParameters = FActorSpawnParameters() );

	/**
	 * Returns the net mode this world is running under.
	 * @see IsNetMode()
	 */
	ENetMode GetNetMode() const;

	/** Returns TimerManager instance for this world. */
	inline FTimerManager& GetTimerManager() const
	{
		return (OwningGameInstance ? OwningGameInstance->GetTimerManager() : *TimerManager);
	}

	/**
	 * Returns LatentActionManager instance, preferring the one allocated by the game instance if a game instance is associated with this.
	 *
	 * This pattern is a little bit of a kludge to allow UWorld clients (for instance, preview world in the Blueprint Editor
 	 * to not worry about replacing features from GameInstance. Alternatively we could mandate that they implement a game instance
	 * for their scene.
	 */
	inline FLatentActionManager& GetLatentActionManager()
	{
		return (OwningGameInstance ? OwningGameInstance->GetLatentActionManager() : LatentActionManager);
	}

/** Global UWorld pointer. Use of this pointer should be avoided whenever possible. */
extern ENGINE_API class UWorldProxy GWorld;

/** World delegates */
class ENGINE_API FWorldDelegates

	DECLARE_MULTICAST_DELEGATE_ThreeParams(FOnWorldTickStart, UWorld*, ELevelTick, float);
	static FOnWorldTickStart OnWorldTickStart;
	
	// Callback for world creation
	static FWorldEvent OnPostWorldCreation;

private:
	FWorldDelegates() {}  
```
