
## FPackageName

```c++
	/**
	 * Helper function for converting short to long script package name (InputCore -> /Script/InputCore)
	 *
	 * @param InShortName Short package name.
	 * @return Long package name.
	 */
	static FString ConvertToLongScriptPackageName(const TCHAR* InShortName);

	/**
	 * Converts package name to short name.
	 *
	 * @param LongName Package name to convert.
	 * @return Short package name.
	 */
	static FString GetShortName(const FString& LongName);
	static FString GetShortName(const FName& LongName);
	static FString GetShortName(const TCHAR* LongName);  
```
