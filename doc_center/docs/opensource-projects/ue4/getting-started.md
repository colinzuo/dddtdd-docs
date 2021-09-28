---
title: 上手指南
---

## IntroductionToCPP

<https://docs.unrealengine.com/en-US/ProgrammingAndScripting/ProgrammingWithCPP/IntroductionToCPP/index.html>

In order to support per-instance designer-set properties, values are also loaded from the instance data for a given object. This data is applied after the constructor. You can create defaults based off of designer-set values by hooking into the PostInitProperties() call chain. 

The UFUNCTION() macro handles exposing the C++ function to the reflection system. The BlueprintCallable option exposes it to the Blueprint virtual machine.

`UFUNCTION(BlueprintImplementableEvent, Category="Damage")`
This function is called like any other C++ function. Under the covers, the Unreal Engine generates a base C++ function implementation that understands how to call into the Blueprint VM. This is commonly referred to as a Thunk.

What if you want to provide a C++ default implementation
`UFUNCTION(BlueprintNativeEvent, Category="Damage")`

There are 4 main class types that you derive from for the majority of gameplay classes. They are UObject, AActor, UActorComponent, and UStruct.

Typical use of classes that are created outside of the UObject hierarchy are: integrating 3rd party libraries, wrapping of OS specific features, and so on.

Actors are either placed in a level by a designer or created at runtime via gameplay systems. All objects that can be placed into a level extend from this class.

Actors have their own behaviors (specialization through inheritance), but they also act as containers for a hierarchy of Actor Components (specialization through composition). This is done through the Actor's RootComponent member, which contains a single USceneComponent that, in turn, can contain many others. Before an Actor can be placed in a level, it must contain at least one Scene Component, from which the Actor will draw its translation, rotation, and scale.

Object iterators are a very useful tool to iterate over all instances of a particular UObject type and its subclasses.

`for (TObjectIterator<UMyClass> It; It; ++It)`

Actor iterators work in much the same way as object iterators, but only work for objects that derive from AActor. 

```
UWorld* World = MyPC->GetWorld();

for (TActorIterator<AEnemy> It(World); It; ++It)
```

UStructs, as mentioned earlier, are meant to be a lightweight version of a UObject. As such, UStructs cannot be garbage collected. If you must use dynamic instances of UStructs, you may want to use smart pointers instead

### Class Naming Prefixes

- Classes derived from Actor prefixed with A, such as AController
- Classes derived from Object are prefixed with U, such as UComponent
- Enums are prefixed with E, such as EFortificationType
- Interface classes are usually prefixed with I, such as IAbilitySystemInterface
- Template classes are prefixed by T, such as TArray
- Classes that derive from SWidget (Slate UI) are prefixed by S, such as SButton
- Everything else is prefixed by the letter F, such as FVector

### Numeric Types

- int8/uint8: 8-bit signed/unsigned integer
- int16/uint16: 16-bit signed/unsigned integer
- int32/uint32: 32-bit signed/unsigned integer
- int64/uint64: 64-bit signed/unsigned integer

### Strings

- FString is a mutable string, analogous to std::string.
`FString MyStr = TEXT("Hello, Unreal 4!")`
- FText is similar to FString, but it is meant for localized text  
`FText MyText = NSLOCTEXT("Game UI", "Health Warning Message", "Low Health!")`  
`FText MyText = LOCTEXT("Health Warning Message", "Low Health!")`
- An FName stores a commonly recurring string as an identifier in order to save memory and CPU time when comparing them
- The TCHAR type is used as a way of storing characters independent of the character set being used, which may differ between platforms. Under the hood, UE4 strings use TCHAR arrays to store data in the UTF-16 encoding. You can access the raw data by using the overloaded dereference operator, which returns TCHAR.
`FString Str1 = TEXT("World");`
`FString Str2 = FString::Printf(TEXT("Hello, %s! You have %i points."), *Str1, Val1);`

### Containers

- TArray
```
int32 ArraySize = ActorArray.Num();

AActor* FirstActor = ActorArray[Index];

ActorArray.Add(NewActor);

ActorArray.AddUnique(NewActor);

ActorArray.Remove(NewActor);

ActorArray.RemoveAt(Index);

ActorArray.RemoveAtSwap(Index);

ActorArray.Empty();
```
- TMap
```
TMap<FIntPoint, FPiece> Data;

Data.Contains(Position);

Data[Position];

Data.Add(Position, NewPiece);

Data.Remove(OldPosition);

Data.Empty();
```

- TSet
```
int32 Size = ActorSet.Num();

ActorSet.Add(NewActor);

if (ActorSet.Contains(NewActor))

ActorSet.Remove(NewActor);

ActorSet.Empty();
```

- Container Iterators
```
for (auto EnemyIterator = EnemySet.CreateIterator(); EnemyIterator; ++EnemyIterator)

AEnemy* Enemy = *EnemyIterator;

EnemyIterator.RemoveCurrent();

EnemyIterator += Offset;
EnemyIterator -= Offset;

int32 Index = EnemyIterator.GetIndex();

EnemyIterator.Reset();
```

- For-each Loop
```
for (AActor* OneActor : ActorArray)

for (auto& KVP : NameToActorMap)
{
    FName Name = KVP.Key;
    AActor* Actor = KVP.Value;
```

### Class Specifiers

- Blueprintable:  Exposes this class as an acceptable base class for creating Blueprints. The default is NotBlueprintable
- BlueprintType:  Exposes this class as a type that can be used for variables in Blueprints.

### Function Specifiers

- BlueprintPure:  means the function does not affect the owning object in any way and thus creates a node without Exec pins
- BlueprintCallable:  makes a function which can be executed in Blueprints - Thus it has Exec pins

### Constructor Format

This constructor initializes the Class Default Object (CDO), which is the master copy on which future instances of the class are based. There is also a secondary constructor that supports a special property-altering structure:

#### Asset References
```
    // Structure to hold one-time initialization
    struct FConstructorStatics
    {
        ConstructorHelpers::FObjectFinder<UStaticMesh> Object0;
        FConstructorStatics()
        : Object0(TEXT("StaticMesh'/Game/UT3/Pickups/Pickups/Health_Large/Mesh/S_Pickups_Base_Health_Large.S_Pickups_Base_Health_Large'"))
        {
        }
    };
    static FConstructorStatics ConstructorStatics;

    // Property initialization

    StaticMesh = ConstructorStatics.Object0.Object;
```

#### Class References
```
    // Structure to hold one-time initialization
    static FClassFinder<UNavigationMeshBase> ClassFinder(TEXT("class'Engine.NavigationMeshBase'"));
    if (ClassFinder.Succeeded())
    {
        NavMeshClass = ClassFinder.Class;
    }
    else
    {
        NavMeshClass = nullptr;
    }

or 

NavMeshClass = UNavigationMeshBase::StaticClass();
```

#### Components and Sub-Objects
```
    UPROPERTY()
    UWindPointSourceComponent* WindPointSource;

    WindPointSource = CreateDefaultSubobject<UWindPointSourceComponent>(TEXT("WindPointSourceComponent0"));

    // Set our new component as the RootComponent of this actor, or attach it to the root if one already exists.
    if (RootComponent == nullptr)
    {
        RootComponent = WindPointSource;
    }
    else
    {
        WindPointSource->AttachTo(RootComponent);
    }
```

### Include-What-You-Use

<https://docs.unrealengine.com/en-US/ProductionPipelines/BuildTools/UnrealBuildTool/IWYU/index.html>

- All header files include their required dependencies  

There is a CoreMinimal header file containing a set of ubiquitous types (including FString, FName, TArray, etc.) from UE4's Core programming environment.

### ProgrammingWithCPP Basics

<https://docs.unrealengine.com/en-US/ProgrammingAndScripting/ProgrammingWithCPP/Basics/index.html>

Functions and classes that need to be accessed outside of their module must be exposed via the `*_API` macros.

### Delegates

The delegate system understands certain types of objects, and additional features are enabled when using these objects. If you bind a delegate to a member of a UObject or shared pointer class, the delegate system can keep a weak reference to the object, so that if the object gets destroyed out from underneath the delegate, you will be able to handle these cases by calling **IsBound** or **ExecuteIfBound** functions. Note the special binding syntax for the various types of supported objects.

## Geometry Brush Actors

<https://docs.unrealengine.com/en-US/Basics/Actors/Brushes/index.html>

level设计用Static Meshes效率更高，Geometry Brushes适合在初期做原型时候使用

## Unreal Objects (UObject)

The base building block in the Engine is called UObject. This class, coupled with UClass, provides a number of the Engine's most important services:

- Reflection of properties and methods
- Serialization of properties
- Garbage collection
- Finding a UObject by name
- Configurable values for properties
- Networking support for properties and methods

Each class that derives from UObject has a singleton UClass created for it that contains all of the metadata about the class instance. UObject and UClass together are at the root of everything that a gameplay object does during its lifetime. The best way to think of the difference between a UClass and a UObject is that the UClass describes what an instance of a UObject will look like, what properties are available for serialization, networking, and so on. 

## AActor

All objects that can be placed into a level extend from this class. AActor is also the base type that can be replicated during networking.

Actors have their own behaviors (specialization through inheritance), but they also act as containers for a hierarchy of Actor Components (specialization through composition). This is done through the Actor's RootComponent member, which contains a single USceneComponent that, in turn, can contain many others. Before an Actor can be placed in a level, it must contain at least one Scene Component, from which the Actor will draw its translation, rotation, and scale.

Spawning an actor is a bit more complicated than creating a normal object in the game, because Actors need to be registered with a variety of runtime systems in order to serve all of their needs. The initial location and rotation for an Actor need to be set. Physics may need to know about it. The manager responsible for telling an Actor to tick needs to know. And so on. Because of this, we have a method devoted to the spawning of an Actor, SpawnActor (a member of UWorld). 

## UActorComponent

Actor Components (class UActorComponent) have their own behaviors and are usually responsible for functionality that is shared across many types of Actors, such as providing visual meshes, particle effects, camera perspectives, and physics interactions.

## UStruct

A UStruct should be a plain data type that has UObject reflection support for editing within the Unreal Editor, Blueprint manipulation, serialization, networking, and so on.

## Unreal Reflection System

Gameplay classes make use of special markup, so before we go over them, let us cover some of the basics of the Unreal property system. UE4 uses its own implementation of reflection that enables dynamic features such as garbage collection, serialization, network replication, and Blueprint/C++ communication. These features are opt-in, meaning you have to add the correct markup to your types, otherwise Unreal will ignore them and not generate the reflection data for them. Here is a quick overview of the basic markup:

- UCLASS() — Used to tell Unreal to generate reflection data for a class. The class must derive from UObject.
- USTRUCT() — Used to tell Unreal to generate reflection data for a struct.
- GENERATED_BODY() — UE4 replaces this with all the necessary boilerplate code that gets generated for the type.
- UPROPERTY() — Enables a member variable of a UCLASS or a USTRUCT to be used as a UPROPERTY. A UPROPERTY has many uses. It can allow the variable to be replicated, serialized, and accessed from Blueprints. They are also used by the garbage collector to keep track of how many references there are to a UObject.
- UFUNCTION() — Enables a class method of a UCLASS or a USTRUCT to be used as a UFUNCTION. A UFUNCTION can allow the class method to be called from Blueprints and used as RPCs, among other things.

You'll first notice the inclusion of MyObject.generated.h. UE4 will generate all the reflection data and put it into this file. You must include this file as the last include in the header file that declares your type.

## UObjects and Garbage Collection

In the garbage collector, there is a concept called the root set. The root set is a list of objects that the collector knows will never be garbage collected.

## Actors and Garbage Collection

Actors are not usually garbage collected, aside from during a Level's shutdown. Once spawned, you must manually call Destroy on them to remove them from the Level without ending the Level.

Since Actors are automatically a part of the root set, SafeObject will not be garbage collected because it can be reached from a root set object. DoomedObject, however, will not fare so well.

When a UObject is garbage collected, all UPROPERTY references to it will be set to null for you. This makes it safe for you to check if an object has been garbage collected or not.

## Class Naming Prefixes

- Classes derived from Actor prefixed with A, such as AController.
- Classes derived from Object are prefixed with U, such as UComponent.
- Enums are prefixed with E, such as EFortificationType.
- Interface classes are usually prefixed with I, such as IAbilitySystemInterface.
- Template classes are prefixed by T, such as TArray.
- Classes that derive from SWidget (Slate UI) are prefixed by S, such as SButton.
- Everything else is prefixed by the letter F , such as FVector.

## Strings

- FString: FString is a mutable string, analogous to std::string. FString has a large suite of methods for making it easy to work with strings. To create a new FString, use the TEXT macro
- FText: FText is similar to FString, but it is meant for localized text. To create a new FText, use the NSLOCTEXT macro. This macro takes a namespace, key, and a value for the default language
- FName: An FName stores a commonly recurring string as an identifier in order to save memory and CPU time when comparing them.
- TCHAR: The TCHAR type is used as a way of storing characters independent of the character set being used, which may differ between platforms. Under the hood, UE4 strings use TCHAR arrays to store data in the UTF-16 encoding. You can access the raw data by using the overloaded dereference operator, which returns TCHAR.

## Containers

- TArray: the primary container you'll use in Unreal Engine 4 is TArray, it functions much like std::vector does, but offers a lot more functionality
- TMap: A TMap is a collection of key-value pairs, similar to std::map. TMap has quick methods for finding, adding, and removing elements based on their key.
- TSet: A TSet stores a collection of unique values, similar to std::set

## The UCLASS Macro

The UCLASS macro gives the UObject a reference to a UCLASS that describes its Unreal-based type. Each UCLASS maintains one Object called the 'Class Default Object', or CDO for short. The CDO is essentially a default 'template' Object, generated by the class constructor and unmodified thereafter

## The Unreal Header Tool

In order to harness the functionality provided by UObject-derived types, a preprocessing step needs to be run on the header files for these types in order to collate the information it needs. This preprocessing step is performed by the UnrealHeaderTool, or UHT for short.

## Encoding

In general, you should be using the TEXT() macro when setting string variable literals. If you do not specify the TEXT() macro, your literal will be encoded using ANSI, which is highly limited in what characters it supports. Any ANSI literals being passed into FString need to undergo a conversion to TCHAR (native Unicode encoding), so it is more efficient to use TEXT().

:::tip
The wheel Physics Bodies are never actually used for collision. Currently, the wheels use a ray casting for interacting with the world.
:::

## BehaviorTreeQuickStart

<https://docs.unrealengine.com/en-US/InteractiveExperiences/ArtificialIntelligence/BehaviorTrees/BehaviorTreeQuickStart/index.html>

Composites are a form of flow control and determine how **the child branches** that are connected to them execute

## Reliable RPC and Disconnect

Because HandleFire has the Reliable specifier as well, it is placed into a queue for reliable RPCs whenever it gets called, and it is removed from the queue when the server successfully receives it. This guarnatees that the server will definitely receive this function call. However, the queue for reliable RPCs can overflow if too many RPCs are placed into it at once without removing them, and if it does then it will force the user to **disconnect**.

<https://docs.unrealengine.com/en-US/InteractiveExperiences/Networking/Actors/Properties/index.html>

Actor property replication is reliable. 

因为actor同步时候会根据relevance来选择，说明不用同步全部的actors，那是否可能因为网络故障导致actor destroy没收到然后后面又正常同步呢？

## Timer

<https://docs.unrealengine.com/en-US/InteractiveExperiences/UseTimers/index.html>

```cpp
    UWorld* World = GetWorld();
		World->GetTimerManager().SetTimer(FiringTimer, this, &ANetworkingStudyCharacter::StopFire, FireRate, false);
```

## Replication Prioritization

Each Actor has a floating point variable called NetPriority. **The higher the number, the more bandwidth that Actor receives relative to others**. An Actor with a priority of 2.0 will be updated exactly twice as frequently as an Actor with priority 1.0. The only thing that matters with priorities is their ratio; so obviously you cannot improve Unreal's network performance by increasing all of ...

To avoid starvation AActor::GetNetPriority() multiplies NetPriority with the time since the Actor was last replicated.

## RPC

<https://docs.unrealengine.com/en-US/InteractiveExperiences/Networking/Actors/RPCs/index.html>

## Stably Named Objects

Actors are stably named if they were loaded directly from packages (not spawned during gameplay).

