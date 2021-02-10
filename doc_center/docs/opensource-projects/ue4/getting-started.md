---
title: 上手指南
---

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

