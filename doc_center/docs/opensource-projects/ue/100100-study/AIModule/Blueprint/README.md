---
title: Blueprint
---

## AIBlueprintHelperLibrary.h

```c++
	UFUNCTION(BlueprintCallable, Category = "AI|Navigation")
	static void SimpleMoveToActor(AController* Controller, const AActor* Goal);

	UFUNCTION(BlueprintCallable, Category = "AI|Navigation")
	static void SimpleMoveToLocation(AController* Controller, const FVector& Goal);
```
