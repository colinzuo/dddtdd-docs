---
title: 样例
---

下面一个成功样例，一个失败样例。

## 测试map

![测试map](./assets/sample-test-level.png)

## 测试配置项

```text
stomp_client: {
    broker_url: "ws://TO_BE_SET/ws"
    controller_id: "TO_BE_SET-desktop-python"
}

ue_stomp_client: {
    controller_id: "TO_BE_SET-desktop-ue"
}

ue_test_0001: {
    case_name: "case_0001_BP_GoodSwitch"
    level_name_full: "/Game/AutoTest/TestFunctionalMap"
    level_name_base: "TestFunctionalMap"
}

ue_test_0002: {
    case_name: "case_0002_BP_BadSwitch"
    level_name_full: "/Game/AutoTest/TestFunctionalMap"
    level_name_base: "TestFunctionalMap"
}
```

## 通用UE controller endpoint

### `/level/open`

```ts
    gStompController.registerEndpoint({
        appDestination: "/level/open",
        callback: (inMessage) => {
            let json_body = JSON.parse(inMessage.body);

            console.log(`to open level ${json_body.levelName}`);

            let world = getWorld();

            UE.GameplayStatics.OpenLevel(world, json_body.levelName);

            gStompController.sendMessage({
                inMessage,
            })
        }
    });
```

## sample_case_0001_BP_GoodSwitch

这个case期望会成功，测试程序会控制Character走到一个好的Switch，然后
这个Switch会点亮一个Light，然后case里会验证灯确实被点亮了

### 测试步骤描述

```json
    {
      "type": "ue_stomp_client_level_open",
      "level_name": "{{ ue_test_0001.level_name_full }}",
      "step_description": [
        "请求OpenLevel从而初始化状态"
      ]
    },
    {
      "type": "ue_stomp_client_level_get_current_level_name",
      "expected_rsp": {
        "levelName": "{{ ue_test_0001.level_name_base }}"
      },
      "step_description": [
        "验证当前level名字如预期"
      ]
    },
    {
      "type": "ue_stomp_client_test_run",
      "timeout": 30,
      "case_name": "{{ ue_test_0001.case_name }}",
      "step_description": [
        "请求执行指定case"
      ]
    },
```

### case_0001_BP_GoodSwitch controller endpoint

```ts
    gStompController.registerEndpoint({
        appDestination: "/test/run/case_0001_BP_GoodSwitch",
        callback: async (inMessage) => {
            let world = getWorld();

            try {
                let goodSwitchActor = getActorWithTag(world, "GoodSwitch");

                if (!goodSwitchActor) {
                    throw new Error("not found goodSwitchActor")
                }

                let ceilingLightActor = getActorWithTag(world, "CeilingLight") as UE.Game.AutoTest.BP_CustomCeilingLight.BP_CustomCeilingLight_C;

                if (!ceilingLightActor) {
                    throw new Error("not found ceilingLightActor")
                }

                let isLightVisible = ceilingLightActor.PointLight1.IsVisible();

                console.log("isLightVisible", isLightVisible);

                let playerController = UE.GameplayStatics.GetPlayerController(world, 0);
                let targetLocation = goodSwitchActor.K2_GetActorLocation();

                console.log("player location", playerController.Pawn.K2_GetActorLocation().ToString());
                console.log("target location", targetLocation.ToString());

                let startDistance = playerController.Pawn.K2_GetActorLocation().op_Subtraction(targetLocation).Size2D();

                console.log(`startDistance ${startDistance}`);

                // UE.AIBlueprintHelperLibrary.SimpleMoveToLocation(playerController, targetLocation);
                UE.AIBlueprintHelperLibrary.SimpleMoveToActor(playerController, goodSwitchActor);

                let reached = await waitActorReachLocation(playerController.Pawn, targetLocation, 10_000);

                console.log("player location", playerController.Pawn.K2_GetActorLocation().ToString());
                console.log("target location", targetLocation.ToString());

                if (!reached) {
                    throw new Error("timeout, not reach goodSwitchActor")
                }

                isLightVisible = ceilingLightActor.PointLight1.IsVisible();

                console.log("isLightVisible", isLightVisible);

                if (!isLightVisible) {
                    throw new Error("light is not turned on");
                }
    
                gStompController.sendMessage({
                    inMessage,
                })
            } catch (error) {
                gStompController.sendMessage({
                    inMessage,
                    outMessage: {
                        jsonBody: {
                            error: {
                                message: error.toString(),
                            },
                        }
                    }
                })
            }
        }
    });
```

## sample_case_0002_BP_BadSwitch

这个case期望会失败，测试程序会控制Character走到一个坏的Switch，然后
这个Switch不会点亮一个Light，然后当case里验证灯确实被点亮了时就会失败

### 测试步骤描述

```json
    {
      "type": "ue_stomp_client_level_open",
      "level_name": "{{ ue_test_0002.level_name_full }}",
      "step_description": [
        "请求OpenLevel从而初始化状态"
      ]
    },
    {
      "type": "ue_stomp_client_level_get_current_level_name",
      "expected_rsp": {
        "levelName": "{{ ue_test_0002.level_name_base }}"
      },
      "step_description": [
        "验证当前level名字如预期"
      ]
    },
    {
      "type": "ue_stomp_client_test_run",
      "timeout": 30,
      "case_name": "{{ ue_test_0002.case_name }}",
      "step_description": [
        "请求执行指定case"
      ]
    },
```

### case_0002_BP_BadSwitch controller endpoint

```ts
    gStompController.registerEndpoint({
        appDestination: "/test/run/case_0002_BP_BadSwitch",
        callback: async (inMessage) => {
            let world = getWorld();

            try {
                let badSwitchActor = getActorWithTag(world, "BadSwitch");

                if (!badSwitchActor) {
                    throw new Error("not found badSwitchActor")
                }

                let ceilingLightActor = getActorWithTag(world, "CeilingLight") as UE.Game.AutoTest.BP_CustomCeilingLight.BP_CustomCeilingLight_C;

                if (!ceilingLightActor) {
                    throw new Error("not found ceilingLightActor")
                }

                let isLightVisible = ceilingLightActor.PointLight1.IsVisible();

                console.log("isLightVisible", isLightVisible);

                let playerController = UE.GameplayStatics.GetPlayerController(world, 0);
                let targetLocation = badSwitchActor.K2_GetActorLocation();

                console.log("player location", playerController.Pawn.K2_GetActorLocation().ToString());
                console.log("target location", targetLocation.ToString());

                let startDistance = playerController.Pawn.K2_GetActorLocation().op_Subtraction(targetLocation).Size2D();

                console.log(`startDistance ${startDistance}`);

                // UE.AIBlueprintHelperLibrary.SimpleMoveToLocation(playerController, targetLocation);
                UE.AIBlueprintHelperLibrary.SimpleMoveToActor(playerController, badSwitchActor);

                let reached = await waitActorReachLocation(playerController.Pawn, targetLocation, 10_000);

                console.log("player location", playerController.Pawn.K2_GetActorLocation().ToString());
                console.log("target location", targetLocation.ToString());

                if (!reached) {
                    throw new Error("timeout, not reach badSwitchActor")
                }

                isLightVisible = ceilingLightActor.PointLight1.IsVisible();

                console.log("isLightVisible", isLightVisible);

                if (!isLightVisible) {
                    throw new Error("light is not turned on");
                }
    
                gStompController.sendMessage({
                    inMessage,
                })
            } catch (error) {
                gStompController.sendMessage({
                    inMessage,
                    outMessage: {
                        jsonBody: {
                            error: {
                                message: error.toString(),
                            },
                        }
                    }
                })
            }
        }
    });
```
