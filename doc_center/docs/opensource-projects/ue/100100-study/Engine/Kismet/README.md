---
title: Kismet
---

## GameplayStatics.h

```c++
/** Static class with useful gameplay utility functions that can be called from both Blueprint and C++ */
UCLASS()
class ENGINE_API UGameplayStatics : public UBlueprintFunctionLibrary

	/** 
	 *	Find all Actors in the world of the specified class. 
	 *	This is a slow operation, use with caution e.g. do not use every frame.
	 *	@param	ActorClass	Class of Actor to find. Must be specified or result array will be empty.
	 *	@param	OutActors	Output array of Actors of the specified class.
	 */
	UFUNCTION(BlueprintCallable, Category="Actor",  meta=(WorldContext="WorldContextObject", DeterminesOutputType="ActorClass", DynamicOutputParam="OutActors"))
	static void GetAllActorsOfClass(const UObject* WorldContextObject, TSubclassOf<AActor> ActorClass, TArray<AActor*>& OutActors);

	/**
	 *	Find all Actors in the world with the specified tag.
	 *	This is a slow operation, use with caution e.g. do not use every frame.
	 *	@param	Tag			Tag to find. Must be specified or result array will be empty.
	 *	@param	OutActors	Output array of Actors of the specified tag.
	 */
	UFUNCTION(BlueprintCallable, Category="Actor",  meta=(WorldContext="WorldContextObject"))
	static void GetAllActorsWithTag(const UObject* WorldContextObject, FName Tag, TArray<AActor*>& OutActors);

	/**
	 *	Returns an Actor nearest to Origin from ActorsToCheck array.
	 *	@param	Origin			World Location from which the distance is measured.
	 *	@param	ActorsToCheck	Array of Actors to examine and return Actor nearest to Origin.
	 *	@param	Distance	Distance from Origin to the returned Actor.
	 *	@return				Nearest Actor.
	 */
	UFUNCTION(BlueprintPure, Category = "Actor")
	static AActor* FindNearestActor(FVector Origin, const TArray<AActor*>& ActorsToCheck, float& Distance);
	
	/** Returns the game instance object  */
	UFUNCTION(BlueprintPure, Category="Game", meta=(WorldContext="WorldContextObject"))
	static class UGameInstance* GetGameInstance(const UObject* WorldContextObject);

	/**
	 * Returns the number of fully initialized local players, this will be 0 on dedicated servers.
	 * Indexes up to this can be used as PlayerIndex parameters for the following functions, and you are guaranteed to get a local player controller.
	 */
	UFUNCTION(BlueprintPure, Category = "Game", meta = (WorldContext = "WorldContextObject", UnsafeDuringActorConstruction = "true"))
	static int32 GetNumLocalPlayerControllers(const UObject* WorldContextObject);

	/** 
	 * Returns the player controller found while iterating through the local and available remote player controllers.
	 * On a network client, this will only include local players as remote player controllers are not available.
	 * The index will be consistent as long as no new players join or leave, but it will not be the same across different clients and servers.
	 *
	 * @param PlayerIndex	Index in the player controller list, starting first with local players and then available remote ones
	 */
	UFUNCTION(BlueprintPure, Category="Game", meta=(WorldContext="WorldContextObject", UnsafeDuringActorConstruction="true"))
	static class APlayerController* GetPlayerController(const UObject* WorldContextObject, int32 PlayerIndex);


	/**
	 * Returns the pawn for the player controller at the specified player index.
	 * This will not include pawns of remote clients with no available player controller, you can use the player states list for that.
	 *
	 * @param PlayerIndex	Index in the player controller list, starting first with local players and then available remote ones
	 */
	UFUNCTION(BlueprintPure, Category="Game", meta=(WorldContext="WorldContextObject", UnsafeDuringActorConstruction="true"))
	static class APawn* GetPlayerPawn(const UObject* WorldContextObject, int32 PlayerIndex);

	/**
	 * Returns the pawn for the player controller at the specified player index, will return null if the pawn is not a character.
	 * This will not include characters of remote clients with no available player controller, you can iterate the PlayerStates list for that.
	 *
	 * @param PlayerIndex	Index in the player controller list, starting first with local players and then available remote ones
	 */
	UFUNCTION(BlueprintPure, Category="Game", meta=(WorldContext="WorldContextObject", UnsafeDuringActorConstruction="true"))
	static class ACharacter* GetPlayerCharacter(const UObject* WorldContextObject, int32 PlayerIndex);

	/** Stream the level (by Name); Calling again before it finishes has no effect */
	UFUNCTION(BlueprintCallable, meta=(WorldContext="WorldContextObject", Latent = "", LatentInfo = "LatentInfo", DisplayName = "Load Stream Level (by Name)"), Category="Game")
	static void LoadStreamLevel(const UObject* WorldContextObject, FName LevelName, bool bMakeVisibleAfterLoad, bool bShouldBlockOnLoad, FLatentActionInfo LatentInfo);

	/**
	 * Travel to another level
	 *
	 * @param	LevelName			the level to open
	 * @param	bAbsolute			if true options are reset, if false options are carried over from current level
	 * @param	Options				a string of options to use for the travel URL
	 */
	UFUNCTION(BlueprintCallable, meta=(WorldContext="WorldContextObject", AdvancedDisplay = "2", DisplayName = "Open Level (by Name)"), Category="Game")
	static void OpenLevel(const UObject* WorldContextObject, FName LevelName, bool bAbsolute = true, FString Options = FString(TEXT("")));

	/**
	* Get the name of the currently-open level.
	*
	* @param bRemovePrefixString	remove any streaming- or editor- added prefixes from the level name.
	*/
	UFUNCTION(BlueprintCallable, meta = (WorldContext = "WorldContextObject", AdvancedDisplay = "1"), Category = "Game")
	static FString GetCurrentLevelName(const UObject* WorldContextObject, bool bRemovePrefixString = true);

	/** Returns the current GameModeBase or Null if it can't be retrieved, such as on the client */
	UFUNCTION(BlueprintPure, Category="Game", meta=(WorldContext="WorldContextObject"))
	static class AGameModeBase* GetGameMode(const UObject* WorldContextObject);

	/** Returns the current GameStateBase or Null if it can't be retrieved */
	UFUNCTION(BlueprintPure, Category="Game", meta=(WorldContext="WorldContextObject"))
	static class AGameStateBase* GetGameState(const UObject* WorldContextObject);

	/** Returns the class of a passed in Object, will always be valid if Object is not NULL */
	UFUNCTION(BlueprintPure, meta=(DisplayName = "Get Class", DeterminesOutputType = "Object"), Category="Utilities")
	static class UClass *GetObjectClass(const UObject *Object);

	/**
	 * Enabled rendering of the world
	 * @param	bEnable		Whether the world should be rendered or not
	 */
	UFUNCTION(BlueprintCallable, Category = "Rendering", meta = (WorldContext = "WorldContextObject"))
	static void SetEnableWorldRendering(const UObject* WorldContextObject, bool bEnable);

	/**
	 * Returns the world rendering state
	 * @return	Whether the world should be rendered or not
	 */
	UFUNCTION(BlueprintCallable, Category = "Rendering", meta = (WorldContext = "WorldContextObject"))
	static bool GetEnableWorldRendering(const UObject* WorldContextObject);

	/**
	 * Returns the string name of the current platform, to perform different behavior based on platform. 
	 * (Platform names include Windows, Mac, IOS, Android, PS4, XboxOne, Linux) */
	UFUNCTION(BlueprintPure, Category="Game")
	static FString GetPlatformName();

	/** Returns world origin current location. */
	UFUNCTION(BlueprintPure, Category="Game", meta=(WorldContext="WorldContextObject") )
	static FIntVector GetWorldOriginLocation(const UObject* WorldContextObject);
	
	/** Requests a new location for a world origin. */
	UFUNCTION(BlueprintCallable, Category="Game", meta=(WorldContext="WorldContextObject"))
	static void SetWorldOriginLocation(const UObject* WorldContextObject, FIntVector NewLocation);
  
                        
```

## KismetMathLibrary.h

```c++
```

## KismetSystemLibrary.h

```c++
	/** Set an int32 property by name */
	UFUNCTION(BlueprintCallable, meta=(BlueprintInternalUseOnly = "true"))
	static void SetIntPropertyByName(UObject* Object, FName PropertyName, int32 Value);

	/** Set a STRING property by name */
	UFUNCTION(BlueprintCallable, meta=(BlueprintInternalUseOnly = "true", AutoCreateRefTerm = "Value" ))
	static void SetStringPropertyByName(UObject* Object, FName PropertyName, const FString& Value);

	/**
	 * Returns an array of actors that overlap the given axis-aligned box.
	 * @param WorldContext	World context
	 * @param BoxPos		Center of box.
	 * @param BoxExtent		Extents of box.
	 * @param Filter		Option to restrict results to only static or only dynamic.  For efficiency.
	 * @param ClassFilter	If set, will only return results of this class or subclasses of it.
	 * @param ActorsToIgnore		Ignore these actors in the list
	 * @param OutActors		Returned array of actors. Unsorted.
	 * @return				true if there was an overlap that passed the filters, false otherwise.
	 */
	UFUNCTION(BlueprintCallable, Category="Collision", meta=(WorldContext="WorldContextObject", AutoCreateRefTerm="ActorsToIgnore", DisplayName="Box Overlap Actors"))
	static bool BoxOverlapActors(const UObject* WorldContextObject, const FVector BoxPos, FVector BoxExtent, const TArray<TEnumAsByte<EObjectTypeQuery> > & ObjectTypes, UClass* ActorClassFilter, const TArray<AActor*>& ActorsToIgnore, TArray<class AActor*>& OutActors);

	/**
	 * Does a collision trace along the given line and returns the first blocking hit encountered.
	 * This trace finds the objects that RESPONDS to the given TraceChannel
	 * 
	 * @param WorldContext	World context
	 * @param Start			Start of line segment.
	 * @param End			End of line segment.
	 * @param TraceChannel	
	 * @param bTraceComplex	True to test against complex collision, false to test against simplified collision.
	 * @param OutHit		Properties of the trace hit.
	 * @return				True if there was a hit, false otherwise.
	 */
	UFUNCTION(BlueprintCallable, Category="Collision", meta=(bIgnoreSelf="true", WorldContext="WorldContextObject", AutoCreateRefTerm="ActorsToIgnore", DisplayName="Line Trace By Channel", AdvancedDisplay="TraceColor,TraceHitColor,DrawTime", Keywords="raycast"))
	static bool LineTraceSingle(const UObject* WorldContextObject, const FVector Start, const FVector End, ETraceTypeQuery TraceChannel, bool bTraceComplex, const TArray<AActor*>& ActorsToIgnore, EDrawDebugTrace::Type DrawDebugType, FHitResult& OutHit, bool bIgnoreSelf, FLinearColor TraceColor = FLinearColor::Red, FLinearColor TraceHitColor = FLinearColor::Green, float DrawTime = 5.0f);
	
	/**
	 * Does a collision trace along the given line and returns all hits encountered up to and including the first blocking hit.
	 * This trace finds the objects that RESPOND to the given TraceChannel
	 * 
	 * @param WorldContext	World context
	 * @param Start			Start of line segment.
	 * @param End			End of line segment.
	 * @param TraceChannel	The channel to trace
	 * @param bTraceComplex	True to test against complex collision, false to test against simplified collision.
	 * @param OutHit		Properties of the trace hit.
	 * @return				True if there was a blocking hit, false otherwise.
	 */
	UFUNCTION(BlueprintCallable, Category="Collision", meta=(bIgnoreSelf="true", WorldContext="WorldContextObject", AutoCreateRefTerm="ActorsToIgnore", DisplayName = "Multi Line Trace By Channel", AdvancedDisplay="TraceColor,TraceHitColor,DrawTime", Keywords="raycast"))
	static bool LineTraceMulti(const UObject* WorldContextObject, const FVector Start, const FVector End, ETraceTypeQuery TraceChannel, bool bTraceComplex, const TArray<AActor*>& ActorsToIgnore, EDrawDebugTrace::Type DrawDebugType, TArray<FHitResult>& OutHits, bool bIgnoreSelf, FLinearColor TraceColor = FLinearColor::Red, FLinearColor TraceHitColor = FLinearColor::Green, float DrawTime = 5.0f);

	/**
	 * Does a collision trace along the given line and returns the first hit encountered.
	 * This only finds objects that are of a type specified by ObjectTypes.
	 * 
	 * @param WorldContext	World context
	 * @param Start			Start of line segment.
	 * @param End			End of line segment.
	 * @param ObjectTypes	Array of Object Types to trace 
	 * @param bTraceComplex	True to test against complex collision, false to test against simplified collision.
	 * @param OutHit		Properties of the trace hit.
	 * @return				True if there was a hit, false otherwise.
	 */
	UFUNCTION(BlueprintCallable, Category="Collision", meta=(bIgnoreSelf="true", WorldContext="WorldContextObject", AutoCreateRefTerm="ActorsToIgnore", DisplayName = "Line Trace For Objects", AdvancedDisplay="TraceColor,TraceHitColor,DrawTime", Keywords="raycast"))
	static bool LineTraceSingleForObjects(const UObject* WorldContextObject, const FVector Start, const FVector End, const TArray<TEnumAsByte<EObjectTypeQuery> > & ObjectTypes, bool bTraceComplex, const TArray<AActor*>& ActorsToIgnore, EDrawDebugTrace::Type DrawDebugType, FHitResult& OutHit, bool bIgnoreSelf, FLinearColor TraceColor = FLinearColor::Red, FLinearColor TraceHitColor = FLinearColor::Green, float DrawTime = 5.0f );
	
	/**
	 * Does a collision trace along the given line and returns all hits encountered.
	 * This only finds objects that are of a type specified by ObjectTypes.
	 * 
	 * @param WorldContext	World context
	 * @param Start			Start of line segment.
	 * @param End			End of line segment.
	 * @param ObjectTypes	Array of Object Types to trace 
	 * @param bTraceComplex	True to test against complex collision, false to test against simplified collision.
	 * @param OutHit		Properties of the trace hit.
	 * @return				True if there was a hit, false otherwise.
	 */
	UFUNCTION(BlueprintCallable, Category="Collision", meta=(bIgnoreSelf="true", WorldContext="WorldContextObject", AutoCreateRefTerm="ActorsToIgnore", DisplayName = "Multi Line Trace For Objects", AdvancedDisplay="TraceColor,TraceHitColor,DrawTime", Keywords="raycast"))
	static bool LineTraceMultiForObjects(const UObject* WorldContextObject, const FVector Start, const FVector End, const TArray<TEnumAsByte<EObjectTypeQuery> > & ObjectTypes, bool bTraceComplex, const TArray<AActor*>& ActorsToIgnore, EDrawDebugTrace::Type DrawDebugType, TArray<FHitResult>& OutHits, bool bIgnoreSelf, FLinearColor TraceColor = FLinearColor::Red, FLinearColor TraceHitColor = FLinearColor::Green, float DrawTime = 5.0f);

	/** Draw a debug line */
	UFUNCTION(BlueprintCallable, Category="Rendering|Debug", meta=(WorldContext="WorldContextObject", DevelopmentOnly))
	static void DrawDebugLine(const UObject* WorldContextObject, const FVector LineStart, const FVector LineEnd, FLinearColor LineColor, float Duration=0.f, float Thickness = 0.f);

	/** Draw a debug box */
	UFUNCTION(BlueprintCallable, Category="Rendering|Debug", meta=(WorldContext="WorldContextObject", DevelopmentOnly))
	static void DrawDebugBox(const UObject* WorldContextObject, const FVector Center, FVector Extent, FLinearColor LineColor, const FRotator Rotation=FRotator::ZeroRotator, float Duration=0.f, float Thickness = 0.f);


```

