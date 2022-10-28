
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
	 *	Find all Actors in the world with the specified interface.
	 *	This is a slow operation, use with caution e.g. do not use every frame.
	 *	@param	Interface	Interface to find. Must be specified or result array will be empty.
	 *	@param	OutActors	Output array of Actors of the specified interface.
	 */
	UFUNCTION(BlueprintCallable, Category="Actor",  meta=(WorldContext="WorldContextObject", DeterminesOutputType="Interface", DynamicOutputParam="OutActors"))
	static void GetAllActorsWithInterface(const UObject* WorldContextObject, TSubclassOf<UInterface> Interface, TArray<AActor*>& OutActors);

	/**
	 *	Find all Actors in the world with the specified tag.
	 *	This is a slow operation, use with caution e.g. do not use every frame.
	 *	@param	Tag			Tag to find. Must be specified or result array will be empty.
	 *	@param	OutActors	Output array of Actors of the specified tag.
	 */
	UFUNCTION(BlueprintCallable, Category="Actor",  meta=(WorldContext="WorldContextObject"))
	static void GetAllActorsWithTag(const UObject* WorldContextObject, FName Tag, TArray<AActor*>& OutActors);

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
