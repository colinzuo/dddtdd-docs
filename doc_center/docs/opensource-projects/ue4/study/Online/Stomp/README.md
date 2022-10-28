
## Stomp.Build.cs

不支持android?

```csharp
	protected virtual bool bPlatformSupportsStomp
	{
		get
		{
			return Target.Platform == UnrealTargetPlatform.Win64 ||
				Target.Platform == UnrealTargetPlatform.Mac ||
				Target.IsInPlatformGroup(UnrealPlatformGroup.Unix);
		}
	}
```
