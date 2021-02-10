---
title: Carla介绍
slug: /opensource-projects/carla/
---

CARLA provides open digital assets(urban layouts, buildings, vehicles)

Supports flexible specification of sensor suites and environment conditions.

Three approaches:
- classic modular pipeline
- end-to-end model trained via imitation learning
- end-to-end model trained via reinforcement learning

We manipulate the complexity of the route that must be traversed, the
presence of traffic, and the environment conditions.

It is implemented as an open-source layer over **Unreal Engine 4 (UE4)**

The environment is composed of 3D models of static objects such as buildings, vegetation, traffic signs, and infrastructure, as well as dynamic objects such as vehicles and pedestrians.
All models are carefully designed to reconcile visual quality and rendering speed: we use low-weight
geometric models and textures, but maintain visual realism by carefully crafting the materials and
making use of variable level of detail

We based the non-player vehicles on the
standard UE4 vehicle model (PhysXVehicles). Kinematic parameters were adjusted for realism

Currently, the simulator supports
two lighting conditions – midday and sunset – as well as nine weather conditions, differing in cloud
cover, level of precipitation, and the presence of puddles in the streets. This results in a total of 18
illumination-weather combinations.

At the time of writing,
sensors are limited to RGB cameras and to pseudo-sensors that provide ground-truth depth and
semantic segmentation

Our semantic segmentation pseudo-sensor provides 12 semantic classes: road, lane-marking, traffic sign, sidewalk, fence, pole,
wall, building, vegetation, vehicle, pedestrian, and other

Measurements of the agent’s state
include vehicle location and orientation with respect to the world coordinate system (akin to GPS
and compass), speed, acceleration vector, and accumulated impact from collisions

## 术语
- A3C: asynchronous advantage actor-critic
- CARLA: Car Learning to Act
- PID: proportional-integral-derivative
- RSS: Responsibility Sensitive Safety

## 依赖
- [zlib](http://www.zlib.net/)
- [libpng](http://gnuwin32.sourceforge.net/packages/libpng.htm)
- [rpclib](https://github.com/carla-simulator/rpclib)
- [googletest](https://github.com/google/googletest)
- [recastnavigation](https://github.com/carla-simulator/recastnavigation)
- [boost](https://dl.bintray.com/boostorg/release/1.72.0/source/)
- [xerces-c](https://downloads.apache.org/xerces/c/3/sources/)


## 文档
[论文 CARLA: An Open Urban Driving Simulator](http://proceedings.mlr.press/v78/dosovitskiy17a/dosovitskiy17a.pdf)
