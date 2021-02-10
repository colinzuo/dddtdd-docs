---
title: UE4介绍
slug: /opensource-projects/ue4/
---

## 术语
- Actor: An Actor is any object that can be placed into a level. Actors are a generic Class that support 3D transformations such as translation, rotation, and scale. 
- asset: Materials, Static Meshes, Textures, Particle Systems, Blueprints, and Sound Cues. Each asset is saved in an individual .uasset file
- Blueprints: The Blueprints Visual Scripting system
- Blueprint Interface: Any Blueprint can implement this Interface and then create its own definition of those functions
- Blueprint Macro Library: A Blueprint Macro Library is a Blueprint container that holds a collection of macros or self-contained graphs that can be placed as nodes in other Blueprints
- Character: A Character is a subclass of a Pawn Actor that is intended to be used as a player character. The Character subclass includes a collision setup, input bindings for bipedal movement, and additional code for movement controlled by the player.
- component: A Component is a piece of functionality that can be added to an Actor. Components cannot exist by themselves
- Construction Script: Blueprint Class创建后调用  
The Construction Script controls functionality while working with the object in the Editor, and the Event Graph controls functionality during gameplay; Construction Scripts do not execute during gameplay.
- Controller Class: Controllers are non-physical Actors that can possess a Pawn (or Pawn-derived class like Character) to control its actions
- cooked: converted to final, binary formats dependent on the Asset type and target platform
- FBX file: FBX is a file format developed by Autodesk. This file format is used to import Static Meshes, Skeletal Meshes, and Animation Sequences into the Unreal Editor
- HUD: heads-up display
- LOD: Level of Detail
- Material: A Material is an asset that can be applied to a mesh to control the visual look of the scene. You can define its color, how shiny it is, whether you can see through the object, and much more.  
Unreal Engine 4 utilizes a physically-based shading model. This means that rather than defining a Material using arbitrary properties (such as Diffuse Color and Specular Power), you instead use properties more easily relatable to the real world. These include Base Color, Metallic, Specular, and Roughness.
- Mobility: Mobility is a property of Static Mesh and Light Actors. The Mobility property, which is set in the Details panel, determines whether an Actor can move during gameplay. In addition, for Light Actors, the Mobility property determines the types of light and shadows cast. Mobility property settings include Static, Stationary (Light Actors only), and Movable.
- NPC: non-player characters
- Object: In C++, UObject is the base class of all objects; it implements features such as garbage collections, metadata (UProperty) support for exposing variables to the Unreal Editor, and serialization for loading and saving.
- Pawn: Pawns are a subclass of Actor and serve as an in-game avatar or persona, for example the characters in a game. The Pawn class is the base class of all Actors that can be controlled by players or AI.
- Persona: Persona is the animation editing toolset within Unreal. It is a robust system for editing Skeletons, Skeletal Meshes, Animation Blueprints, and various other animation assets.
- [Physics Asset][]: A [Physics Asset][] is used to define the physics and collision used by a Skeletal Mesh. These contain a set of rigid bodies and constraints that make up a single ragdoll
- Skeletal Mesh Actor: A Skeletal Mesh Actor consists of two parts: the mesh itself and a hierarchical skeleton whose bones can be used to create animation by deforming the mesh according to rules defined in the 3D modeling program. 
- socket: Unreal Engine allows you to create Sockets in its animation toolset - Persona - which are offset from a bone within the Skeletal Mesh.
- Stationary Lights: Stationary Lights are lights that are intended to stay in one position, but are able to change in other ways, such as their brightness and color. However, it should be noted that runtime changes to brightness only affect the direct lighting. Indirect (bounced) lighting, since it is pre-calculated by Lightmass, will not change.
- Texture: Textures are images that are used in Materials. They are mapped to the surfaces the Material is applied to. Either Textures are applied directly - for example, for Base Color textures - or the values of the Texture's pixels (or texels) are used within the Material as masks or for other calculations.
- Timeline node: They are specifically built for handling simple, non-cinematic tasks such as opening doors, altering lights
- Unreal Frontend: UnrealFrontend (UFE) is a tool intended to simplify and speed up daily video game development and testing tasks, such as preparing game builds, deploying them to a device, and launching them. 

## 组成
- Traffic manager: 管理除学习中的其它交通工具，目标模拟真实的城市交通场景。
- Sensors: 传感器，如摄像头、雷达、激光雷达等。
- Recorder：完整重现时间线中每一个点每一个actor的状态
- Scenario runner


## 文档

[官方文档](https://docs.unrealengine.com/en-US/Basics/index.html)

[Physics Asset]: https://docs.unrealengine.com/en-US/InteractiveExperiences/Physics/PhysicsAssetEditor/index.html