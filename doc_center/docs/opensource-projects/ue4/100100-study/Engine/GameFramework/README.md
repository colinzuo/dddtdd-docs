---
title: GameFramework
---

## Actor.h

```c++
/**
 * Actor is the base class for an Object that can be placed or spawned in a level.
 * Actors may contain a collection of ActorComponents, which can be used to control how actors move, how they are rendered, etc.
 * The other main function of an Actor is the replication of properties and function calls across the network during play.
 * 
 * 
 * Actor initialization has multiple steps, here's the order of important virtual functions that get called:
 * - UObject::PostLoad: For actors statically placed in a level, the normal UObject PostLoad gets called both in the editor and during gameplay.
 *                      This is not called for newly spawned actors.
 * - UActorComponent::OnComponentCreated: When an actor is spawned in the editor or during gameplay, this gets called for any native components.
 *                                        For blueprint-created components, this gets called during construction for that component.
 *                                        This is not called for components loaded from a level.
 * - AActor::PreRegisterAllComponents: For statically placed actors and spawned actors that have native root components, this gets called now.
 *                                     For blueprint actors without a native root component, these registration functions get called later during construction.
 * - UActorComponent::RegisterComponent: All components are registered in editor and at runtime, this creates their physical/visual representation.
 *                                       These calls may be distributed over multiple frames, but are always after PreRegisterAllComponents.
 *                                       This may also get called later on after an UnregisterComponent call removes it from the world.
 * - AActor::PostRegisterAllComponents: Called for all actors both in the editor and in gameplay, this is the last function that is called in all cases.
 * - AActor::PostActorCreated: When an actor is created in the editor or during gameplay, this gets called right before construction.
 *                             This is not called for components loaded from a level.
 * - AActor::UserConstructionScript: Called for blueprints that implement a construction script.
 * - AActor::OnConstruction: Called at the end of ExecuteConstruction, which calls the blueprint construction script.
 *                           This is called after all blueprint-created components are fully created and registered.
 *                           This is only called during gameplay for spawned actors, and may get rerun in the editor when changing blueprints.
 * - AActor::PreInitializeComponents: Called before InitializeComponent is called on the actor's components.
 *                                    This is only called during gameplay and in certain editor preview windows.
 * - UActorComponent::Activate: This will be called only if the component has bAutoActivate set.
 *                              It will also got called later on if a component is manually activated.
 * - UActorComponent::InitializeComponent: This will be called only if the component has bWantsInitializeComponentSet.
 *                                         This only happens once per gameplay session.
 * - AActor::PostInitializeComponents: Called after the actor's components have been initialized, only during gameplay and some editor previews.
 * - AActor::BeginPlay: Called when the level starts ticking, only during actual gameplay.
 *                      This normally happens right after PostInitializeComponents but can be delayed for networked or child actors.
 *
 * @see https://docs.unrealengine.com/Programming/UnrealArchitecture/Actors
 * @see https://docs.unrealengine.com/Programming/UnrealArchitecture/Actors/ActorLifecycle
 * @see UActorComponent
 */
UCLASS(BlueprintType, Blueprintable, config=Engine, meta=(ShortTooltip="An Actor is an object that can be placed or spawned in the world."))
class ENGINE_API AActor : public UObject

	/** Returns the properties used for network replication, this needs to be overridden by all actor classes with native replicated properties */
	void GetLifetimeReplicatedProps(TArray<FLifetimeProperty>& OutLifetimeProps) const override;

	/**
	 * Allows us to only see this Actor in the Editor, and not in the actual game.
	 * @see SetActorHiddenInGame()
	 */
	UPROPERTY(Interp, EditAnywhere, Category=Rendering, BlueprintReadOnly, Replicated, meta=(AllowPrivateAccess="true", DisplayName="Actor Hidden In Game", SequencerTrackClass="MovieSceneVisibilityTrack"))
	uint8 bHidden:1;

	/** If true, all input on the stack below this actor will not be considered */
	UPROPERTY(EditDefaultsOnly, Category=Input)
	uint8 bBlockInput:1;

	/**
	 * Does this actor have an owner responsible for replication? (APlayerController typically)
	 *
	 * @return true if this actor can call RPCs or false if no such owner chain exists
	 */
	virtual bool HasNetOwner() const;

	/**
	 * Does this actor have a locally controlled owner responsible for replication? (APlayerController typically)
	 *
	 * @return true if this actor can call RPCs or false if no such owner chain exists
	 */
	virtual bool HasLocalNetOwner() const;

	/**
	 * If true, this actor will replicate to remote machines
	 * @see SetReplicates()
	 */
	UPROPERTY(EditDefaultsOnly, BlueprintReadOnly, Category=Replication)
	uint8 bReplicates:1;

	/** Returns how much control the local machine has over this actor. */
	UFUNCTION(BlueprintCallable, Category=Networking)
	ENetRole GetLocalRole() const { return Role; }

	/** Returns how much control the remote machine has over this actor. */
	UFUNCTION(BlueprintCallable, Category=Networking)
	ENetRole GetRemoteRole() const;

	/**
	 * The time this actor was created, relative to World->GetTimeSeconds().
	 * @see UWorld::GetTimeSeconds()
	 */
	float CreationTime;

	/**
	 * Owner of this Actor, used primarily for replication (bNetUseOwnerRelevancy & bOnlyRelevantToOwner) and visibility (PrimitiveComponent bOwnerNoSee and bOnlyOwnerSee)
	 * @see SetOwner(), GetOwner()
	 */
	UPROPERTY(ReplicatedUsing=OnRep_Owner)
	TObjectPtr<AActor> Owner;

	/** How often (per second) this actor will be considered for replication, used to determine NetUpdateTime */
	UPROPERTY(Category=Replication, EditDefaultsOnly, BlueprintReadWrite)
	float NetUpdateFrequency;

	/** The component that defines the transform (location, rotation, scale) of this Actor in the world, all other components must be attached to this one somehow */
	UPROPERTY(BlueprintGetter=K2_GetRootComponent, Category="Transformation")
	TObjectPtr<USceneComponent> RootComponent;

	/** Handle for efficient management of LifeSpanExpired timer */
	FTimerHandle TimerHandle_LifeSpanExpired;

	/** Array of tags that can be used for grouping and categorizing. */
	UPROPERTY(EditAnywhere, BlueprintReadWrite, AdvancedDisplay, Category=Actor)
	TArray<FName> Tags;

	/** 
	 * Called when another actor begins to overlap this actor, for example a player walking into a trigger.
	 * For events when objects have a blocking collision, for example a player hitting a wall, see 'Hit' events.
	 * @note Components on both this and the other Actor must have bGenerateOverlapEvents set to true to generate overlap events.
	 */
	UPROPERTY(BlueprintAssignable, Category="Collision")
	FActorBeginOverlapSignature OnActorBeginOverlap;

	/**
	 * Get the actor-to-world transform.
	 * @return The transform that transforms from actor space to world space.
	 */
	UFUNCTION(BlueprintCallable, meta=(DisplayName = "Get Actor Transform", ScriptName = "GetActorTransform"), Category="Transformation")
	const FTransform& GetTransform() const
	{
		return ActorToWorld();
	}

	/** Returns the location of the RootComponent of this Actor */
	UFUNCTION(BlueprintCallable, meta=(DisplayName = "Get Actor Location", ScriptName = "GetActorLocation", Keywords="position"), Category="Transformation")
	FVector K2_GetActorLocation() const;

	/** 
	 * Set the Actor's rotation instantly to the specified rotation.
	 * 
	 * @param	NewRotation	The new rotation for the Actor.
	 * @param	bTeleportPhysics Whether we teleport the physics state (if physics collision is enabled for this object).
	 *			If true, physics velocity for this object is unchanged (so ragdoll parts are not affected by change in location).
	 *			If false, physics velocity is updated based on the change in position (affecting ragdoll parts).
	 * @return	Whether the rotation was successfully set.
	 */
	UFUNCTION(BlueprintCallable, meta=(DisplayName = "Set Actor Rotation", ScriptName = "SetActorRotation"), Category="Transformation")
	bool K2_SetActorRotation(FRotator NewRotation, bool bTeleportPhysics);

	/**
	 * Adds a delta to the location of this actor in world space.
	 * 
	 * @param DeltaLocation		The change in location.
	 * @param bSweep			Whether we sweep to the destination location, triggering overlaps along the way and stopping short of the target if blocked by something.
	 *							Only the root component is swept and checked for blocking collision, child components move without sweeping. If collision is off, this has no effect.
	 * @param bTeleport			Whether we teleport the physics state (if physics collision is enabled for this object).
	 *							If true, physics velocity for this object is unchanged (so ragdoll parts are not affected by change in location).
	 *							If false, physics velocity is updated based on the change in position (affecting ragdoll parts).
	 *							If CCD is on and not teleporting, this will affect objects along the entire swept volume.
	 * @param SweepHitResult	The hit result from the move if swept.
	 */
	UFUNCTION(BlueprintCallable, Category="Transformation", meta=(DisplayName="Add Actor World Offset", ScriptName="AddActorWorldOffset", Keywords="location position"))
	void K2_AddActorWorldOffset(FVector DeltaLocation, bool bSweep, FHitResult& SweepHitResult, bool bTeleport);

	/**
	 *	Sets the actor to be hidden in the game
	 *	@param	bNewHidden	Whether or not to hide the actor and all its components
	 */
	UFUNCTION(BlueprintCallable, Category="Rendering", meta=( DisplayName = "Set Actor Hidden In Game", Keywords = "Visible Hidden Show Hide" ))
	virtual void SetActorHiddenInGame(bool bNewHidden);

	/** See if this actor's Tags array contains the supplied name tag */
	UFUNCTION(BlueprintCallable, Category="Actor")
	bool ActorHasTag(FName Tag) const;

	/** Event when play begins for this actor. */
	UFUNCTION(BlueprintImplementableEvent, meta=(DisplayName = "BeginPlay"))
	void ReceiveBeginPlay();

	/** 
	 *	Function called every frame on this Actor. Override this function to implement custom logic to be executed every frame.
	 *	Note that Tick is disabled by default, and you will need to check PrimaryActorTick.bCanEverTick is set to true to enable it.
	 *
	 *	@param	DeltaSeconds	Game time elapsed during last frame modified by the time dilation
	 */
	virtual void Tick( float DeltaSeconds );

	/**
	 * Get the owning connection used for communicating between client/server 
	 * @return NetConnection to the client or server for this actor
	 */
	virtual class UNetConnection* GetNetConnection() const;

	/** Returns the net driver that this actor is bound to, may be null */
	class UNetDriver* GetNetDriver() const;

	/** Getter for the cached world pointer, will return null if the actor is not actually spawned in a level */
	virtual UWorld* GetWorld() const override final;

	/** Get the timer instance from the actors world */
	class FTimerManager& GetWorldTimerManager() const;

	/** Gets the GameInstance that ultimately contains this actor. */
	class UGameInstance* GetGameInstance() const;

	/**
	 * Draw important Actor variables on canvas.  HUD will call DisplayDebug() on the current ViewTarget when the ShowDebug exec is used
	 *
	 * @param Canvas			Canvas to draw on
	 *
	 * @param DebugDisplay		Contains information about what debug data to display
	 *
	 * @param YL				[in]	Height of the previously drawn line.
	 *							[out]	Height of the last line drawn by this function.
	 *
	 * @param YPos				[in]	Y position on Canvas for the previously drawn line. YPos += YL, gives position to draw text for next debug line.
	 *							[out]	Y position on Canvas for the last line drawn by this function.
	 */
	virtual void DisplayDebug(class UCanvas* Canvas, const class FDebugDisplayInfo& DebugDisplay, float& YL, float& YPos);


```

## Character.h

```c++
/**
 * Characters are Pawns that have a mesh, collision, and built-in movement logic.
 * They are responsible for all physical interaction between the player or AI and the world, and also implement basic networking and input models.
 * They are designed for a vertically-oriented player representation that can walk, jump, fly, and swim through the world using CharacterMovementComponent.
 *
 * @see APawn, UCharacterMovementComponent
 * @see https://docs.unrealengine.com/latest/INT/Gameplay/Framework/Pawn/Character/
 */ 
UCLASS(config=Game, BlueprintType, meta=(ShortTooltip="A character is a type of Pawn that includes the ability to walk around."))
class ENGINE_API ACharacter : public APawn

	/** The main skeletal mesh associated with this Character (optional sub-object). */
	UPROPERTY(Category=Character, VisibleAnywhere, BlueprintReadOnly, meta=(AllowPrivateAccess = "true"))
	TObjectPtr<USkeletalMeshComponent> Mesh;

	/** Movement component used for movement logic in various movement modes (walking, falling, etc), containing relevant settings and functions to control movement. */
	UPROPERTY(Category=Character, VisibleAnywhere, BlueprintReadOnly, meta=(AllowPrivateAccess = "true"))
	TObjectPtr<UCharacterMovementComponent> CharacterMovement;

	/** The CapsuleComponent being used for movement collision (by CharacterMovement). Always treated as being vertically aligned in simple collision check functions. */
	UPROPERTY(Category=Character, VisibleAnywhere, BlueprintReadOnly, meta=(AllowPrivateAccess = "true"))
	TObjectPtr<UCapsuleComponent> CapsuleComponent;

	//////////////////////////////////////////////////////////////////////////
	// Server RPC that passes through to CharacterMovement (avoids RPC overhead for components).
	// The base RPC function (eg 'ServerMove') is auto-generated for clients to trigger the call to the server function,
	// eventually going to the _Implementation function (which we just pass to the CharacterMovementComponent).
	//////////////////////////////////////////////////////////////////////////

	UFUNCTION(unreliable, server, WithValidation)
	void ServerMovePacked(const FCharacterServerMovePackedBits& PackedBits);
	void ServerMovePacked_Implementation(const FCharacterServerMovePackedBits& PackedBits);
	bool ServerMovePacked_Validate(const FCharacterServerMovePackedBits& PackedBits);

	//////////////////////////////////////////////////////////////////////////
	// Client RPC that passes through to CharacterMovement (avoids RPC overhead for components).
	//////////////////////////////////////////////////////////////////////////

	UFUNCTION(unreliable, client, WithValidation)
	void ClientMoveResponsePacked(const FCharacterMoveResponsePackedBits& PackedBits);
	void ClientMoveResponsePacked_Implementation(const FCharacterMoveResponsePackedBits& PackedBits);
	bool ClientMoveResponsePacked_Validate(const FCharacterMoveResponsePackedBits& PackedBits);

	/** 
	 * The max time the jump key can be held.
	 * Note that if StopJumping() is not called before the max jump hold time is reached,
	 * then the character will carry on receiving vertical velocity. Therefore it is usually 
	 * best to call StopJumping() when jump input has ceased (such as a button up event).
	 */
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Replicated, Category=Character, Meta=(ClampMin=0.0, UIMin=0.0))
	float JumpMaxHoldTime;
  
      
```

## Controller.h

```c++
/**
 * Controllers are non-physical actors that can possess a Pawn to control
 * its actions.  PlayerControllers are used by human players to control pawns, while
 * AIControllers implement the artificial intelligence for the pawns they control.
 * Controllers take control of a pawn using their Possess() method, and relinquish
 * control of the pawn by calling UnPossess().
 *
 * Controllers receive notifications for many of the events occurring for the Pawn they
 * are controlling.  This gives the controller the opportunity to implement the behavior
 * in response to this event, intercepting the event and superseding the Pawn's default
 * behavior.
 *
 * ControlRotation (accessed via GetControlRotation()), determines the viewing/aiming
 * direction of the controlled Pawn and is affected by input such as from a mouse or gamepad.
 * 
 * @see https://docs.unrealengine.com/latest/INT/Gameplay/Framework/Controller/
 */
UCLASS(abstract, notplaceable, NotBlueprintable, HideCategories=(Collision,Rendering,Transformation)) 
class ENGINE_API AController : public AActor, public INavAgentInterface

	/** PlayerState containing replicated information about the player using this controller (only exists for players, not NPCs). */
	UPROPERTY(replicatedUsing = OnRep_PlayerState, BlueprintReadOnly, Category=Controller)
	TObjectPtr<APlayerState> PlayerState;

	/** Called on both authorities and clients when the possessed pawn changes (either OldPawn or NewPawn might be nullptr) */
	UPROPERTY(BlueprintAssignable, Category=Pawn)
	FOnPossessedPawnChanged OnPossessedPawnChanged;

	/** Current gameplay state this controller is in */
	UPROPERTY()
	FName StateName;

	/** Pawn currently being controlled by this controller.  Use Pawn.Possess() to take control of a pawn */
	UPROPERTY(replicatedUsing=OnRep_Pawn)
	TObjectPtr<APawn> Pawn;

	/**
	 * Used to track when pawn changes during OnRep_Pawn. 
	 * It's possible to use a OnRep parameter here, but I'm not sure what happens with pointers yet so playing it safe.
	 */
	TWeakObjectPtr< APawn > OldPawn;

	/** Character currently being controlled by this controller.  Value is same as Pawn if the controlled pawn is a character, otherwise nullptr */
	UPROPERTY()
	TObjectPtr<ACharacter> Character;

	/** Delegate broadcast on authorities when possessing a new pawn or unpossessing one */
	FPawnChangedSignature OnNewPawn;

	/**
	 * If true, the controller location will match the possessed Pawn's location. If false, it will not be updated. Rotation will match ControlRotation in either case.
	 * Since a Controller's location is normally inaccessible, this is intended mainly for purposes of being able to attach
	 * an Actor that follows the possessed Pawn location, but that still has the full aim rotation (since a Pawn might
	 * update only some components of the rotation).
	 */
	UPROPERTY(EditDefaultsOnly, Category="Controller|Transform")
	uint8 bAttachToPawn:1;

	/** Whether this controller is a PlayerController. */
	uint8 bIsPlayerController:1;

	/** Whether the controller must have authority to be able to call possess on a Pawn */
	uint8 bCanPossessWithoutAuthority:1;

	/**
	 * Physically attach the Controller to the specified Pawn, so that our position reflects theirs.
	 * The attachment persists during possession of the pawn. The Controller's rotation continues to match the ControlRotation.
	 * Attempting to attach to a nullptr Pawn will call DetachFromPawn() instead.
	 */
	virtual void AttachToPawn(APawn* InPawn);

	/** Detach the RootComponent from its parent, but only if bAttachToPawn is true and it was attached to a Pawn.	 */
	virtual void DetachFromPawn();

	/** Change the current state to named state */
	virtual void ChangeState(FName NewState);

	/** 
	 * States (uses FNames for replication, correlated to state flags) 
	 * @param StateName the name of the state to test against
	 * @return true if current state is StateName
	 */
	bool IsInState(FName InStateName) const;
	
	/** @return the name of the current state */
	FName GetStateName() const;

	/**
	 * Get the control rotation. This is the full aim rotation, which may be different than a camera orientation (for example in a third person view),
	 * and may differ from the rotation of the controlled Pawn (which may choose not to visually pitch or roll, for example).
	 */
	UFUNCTION(BlueprintCallable, Category=Pawn)
	virtual FRotator GetControlRotation() const;

	/** Set the control rotation. The RootComponent's rotation will also be updated to match it if RootComponent->bAbsoluteRotation is true. */
	UFUNCTION(BlueprintCallable, Category=Pawn, meta=(Tooltip="Set the control rotation."))
	virtual void SetControlRotation(const FRotator& NewRotation);

	/**
	 * Checks line to center and top of other actor
	 * @param Other is the actor whose visibility is being checked.
	 * @param ViewPoint is eye position visibility is being checked from.  If vect(0,0,0) passed in, uses current viewtarget's eye position.
	 * @param bAlternateChecks used only in AIController implementation
	 * @return true if controller's pawn can see Other actor.
	 */
	UFUNCTION(BlueprintCallable, Category=Controller)
	virtual bool LineOfSightTo(const class AActor* Other, FVector ViewPoint = FVector(ForceInit), bool bAlternateChecks = false) const;

	/** Replication Notification Callbacks */
	UFUNCTION()
	virtual void OnRep_Pawn();

	UFUNCTION()
	virtual void OnRep_PlayerState();

	/** Replicated function to set the pawn location and rotation, allowing server to force (ex. teleports). */
	UFUNCTION(Reliable, Client, WithValidation)
	void ClientSetLocation(FVector NewLocation, FRotator NewRotation);

	/** Replicated function to set the pawn rotation, allowing the server to force. */
	UFUNCTION(Reliable, Client, WithValidation)
	void ClientSetRotation(FRotator NewRotation, bool bResetCamera = false);

	/** Return the Pawn that is currently 'controlled' by this PlayerController */
	UFUNCTION(BlueprintCallable, Category=Pawn, meta=(DisplayName="Get Controlled Pawn", ScriptName="GetControlledPawn"))
	APawn* K2_GetPawn() const;

	/** Get the actor the controller is looking at */
	UFUNCTION(BlueprintCallable, Category=Pawn)
	virtual AActor* GetViewTarget() const;

	/**
	 * Handles attaching this controller to the specified pawn.
	 * Only runs on the network authority (where HasAuthority() returns true).
	 * Derived native classes can override OnPossess to filter the specified pawn.
	 * When possessed pawn changed, blueprint class gets notified by ReceivePossess
	 * and OnNewPawn delegate is broadcasted.
	 * @param InPawn The Pawn to be possessed.
	 * @see HasAuthority, OnPossess, ReceivePossess
	 */
	UFUNCTION(BlueprintCallable, BlueprintAuthorityOnly, Category=Pawn, meta=(Keywords="set controller"))
	virtual void Possess(APawn* InPawn) final; // DEPRECATED(4.22, "Possess is marked virtual final as you should now be overriding OnPossess instead")

	/** Called to unpossess our pawn for any reason that is not the pawn being destroyed (destruction handled by PawnDestroyed()). */
	UFUNCTION(BlueprintCallable, Category=Pawn, meta=(Keywords="set controller"))
	virtual void UnPossess() final; // DEPRECATED(4.22, "Possess is marked virtual final as you should now be overriding OnUnPossess instead")

	/** Blueprint implementable event to react to the controller possessing a pawn */
	UFUNCTION(BlueprintImplementableEvent, meta = (DisplayName = "On Possess"))
	void ReceivePossess(APawn* PossessedPawn);

	/**
	 * Overridable native function for when this controller is asked to possess a pawn.
	 * @param InPawn The Pawn to be possessed
	 */
	virtual void OnPossess(APawn* InPawn);

	/** Aborts the move the controller is currently performing */
	UFUNCTION(BlueprintCallable, Category="AI|Navigation")
	virtual void StopMovement();


```

## GameStateBase.h

```c++
/**
 * GameStateBase is a class that manages the game's global state, and is spawned by GameModeBase.
 * It exists on both the client and the server and is fully replicated.
 */
UCLASS(config=Game, notplaceable, BlueprintType, Blueprintable)
class ENGINE_API AGameStateBase : public AInfo

	/** Array of all PlayerStates, maintained on both server and clients (PlayerStates are always relevant) */
	UPROPERTY(Transient, BlueprintReadOnly, Category=GameState)
	TArray<TObjectPtr<APlayerState>> PlayerArray;

	/** Returns true if the world has started match (called MatchStarted callbacks) */
	UFUNCTION(BlueprintCallable, Category=GameState)
	virtual bool HasMatchStarted() const;  
```

## PlayerController.h

```c++
/**
 * PlayerControllers are used by human players to control Pawns.
 *
 * ControlRotation (accessed via GetControlRotation()), determines the aiming
 * orientation of the controlled Pawn.
 *
 * In networked games, PlayerControllers exist on the server for every player-controlled pawn,
 * and also on the controlling client's machine. They do NOT exist on a client's
 * machine for pawns controlled by remote players elsewhere on the network.
 *
 * @see https://docs.unrealengine.com/latest/INT/Gameplay/Framework/Controller/PlayerController/
 */
UCLASS(config=Game, BlueprintType, Blueprintable, meta=(ShortTooltip="A Player Controller is an actor responsible for controlling a Pawn used by the player."))
class ENGINE_API APlayerController : public AController

	/** Used in net games so client can acknowledge it possessed a specific pawn. */
	UPROPERTY()
	TObjectPtr<APawn> AcknowledgedPawn;

	/** Heads up display associated with this PlayerController. */
	UPROPERTY()
	TObjectPtr<AHUD> MyHUD;

	/** Object that manages player input. */
	UPROPERTY(Transient)
	TObjectPtr<UPlayerInput> PlayerInput;    


```
