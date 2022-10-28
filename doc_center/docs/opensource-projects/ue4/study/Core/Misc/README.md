
<https://docs.unrealengine.com/5.0/en-US/asserts-in-unreal-engine/>

## AssertionMacros.h

```c++
//
// "check" expressions are only evaluated if enabled.
// "verify" expressions are always evaluated, but only cause an error if enabled.
//

	#define verify(expr)			UE_CHECK_IMPL(expr)

	#define check(expr)				UE_CHECK_IMPL(expr)
	
	#define verifyf(expr, format,  ...)		UE_CHECK_F_IMPL(expr, format, ##__VA_ARGS__)

	#define checkf(expr, format,  ...)		UE_CHECK_F_IMPL(expr, format, ##__VA_ARGS__)

	#define checkSlow(expr)					check(expr)
	#define checkfSlow(expr, format, ...)	checkf(expr, format, ##__VA_ARGS__)
	#define verifySlow(expr)				check(expr)

/**
 * ensure() can be used to test for *non-fatal* errors at runtime
 *
 * Rather than crashing, an error report (with a full call stack) will be logged and submitted to the crash server. 
 * This is useful when you want runtime code verification but you're handling the error case anyway.
 *
 * Note: ensure() can be nested within conditionals!
 *
 * Example:
 *
 *		if (ensure(InObject != nullptr))
 *		{
 *			InObject->Modify();
 *		}
 *
 * This code is safe to execute as the pointer dereference is wrapped in a non-nullptr conditional block, but
 * you still want to find out if this ever happens so you can avoid side effects.  Using ensure() here will
 * force a crash report to be generated without crashing the application (and potentially causing editor
 * users to lose unsaved work.)
 *
 * ensure() resolves to just evaluate the expression when DO_CHECK is 0 (typically shipping or test builds).
 *
 * By default a given call site will only print the callstack and submit the 'crash report' the first time an
 * ensure is hit in a session; ensureAlways can be used instead if you want to handle every failure
 */

	#define ensure(           InExpression                ) UE_ENSURE_IMPL( , false, InExpression, TEXT(""))
	#define ensureMsgf(       InExpression, InFormat, ... ) UE_ENSURE_IMPL(&, false, InExpression, InFormat, ##__VA_ARGS__) 					
```

## Exec.h

```c++
// Any object that is capable of taking commands.
class CORE_API FExec

	/**
	* Exec handler
	*
	* @param	InWorld	World context
	* @param	Cmd		Command to parse
	* @param	Ar		Output device to log to
	*
	* @return	true if command was handled, false otherwise
	*/
	virtual bool Exec( class UWorld* InWorld, const TCHAR* Cmd, FOutputDevice& Ar ) PURE_VIRTUAL(FExec::Exec,return false;)
```

## Guid.h

```c++
/**
 * Implements a globally unique identifier.
 */
struct FGuid

	/**
	* Guid default string conversion.
	*/
	friend FString LexToString(const FGuid& Value)
	{
		return Value.ToString();
	}

	friend void LexFromString(FGuid& Result, const TCHAR* String)
	{
		FGuid::Parse(String, Result);
	}

	/**
	 * Converts this GUID to its string representation.
	 *
	 * @return The string representation.
	 */
	FString ToString() const
	{
		return ToString(EGuidFormats::Digits);
	}

	/**
	 * Converts this GUID to its string representation using the specified format.
	 *
	 * @param Format The string format to use.
	 * @return The string representation.
	 */
	CORE_API FString ToString(EGuidFormats Format) const;

	/**
	 * Returns a new GUID.
	 *
	 * @return A new GUID.
	 */
	static CORE_API FGuid NewGuid();

	/**
	 * Converts a string to a GUID.
	 *
	 * @param GuidString The string to convert.
	 * @param OutGuid Will contain the parsed GUID.
	 * @return true if the string was converted successfully, false otherwise.
	 * @see ParseExact, ToString
	 */
	static CORE_API bool Parse(const FString& GuidString, FGuid& OutGuid);		
```

## FDateTime

Implements a date and time.

Values of this type represent dates and times between Midnight 00:00:00, January 1, 0001 and Midnight 23:59:59.9999999, December 31, 9999 in the Gregorian calendar. Internally, the time values are stored in ticks of **0.1 microseconds** (= 100 nanoseconds) since January 1, 0001.

To retrieve the current local date and time, use the **FDateTime.Now()** method. To retrieve the current UTC time, use the **FDateTime.UtcNow()** method instead.

This class also provides methods to convert dates and times from and to string representations, calculate the number of days in a given month and year, check for leap years and determine the time of day, day of week and month of year of a given date and time.

The companion struct FTimespan is provided for enabling date and time based arithmetic, such as calculating the difference between two dates or adding a certain amount of time to a given date.

Ranges of dates and times can be represented by the FDateRange class.

- `static FDateTime FromUnixTimestamp`
- `Now`
- `static bool ParseIso8601`
- `FString ToIso8601() const`
- `int64 ToUnixTimestamp() const`
- `static FDateTime UtcNow()`

## FFileHelper

- `static bool LoadFileToArray`
- `static bool LoadFileToString`
- `static bool SaveArrayToFile`
- `static bool SaveStringArrayToFile`
- `static bool SaveStringToFile`

## FMD5Hash

```c++
	/** Hash the specified file contents (using the optionally supplied scratch buffer) */
	CORE_API static FMD5Hash HashFile(const TCHAR* InFilename, TArray<uint8>* Buffer = nullptr);
```

## FPaths

Path helpers for retrieving game dir, engine dir, etc

```c++
	/** 
	 * Returns the base directory of the "core" engine that can be shared across
	 * several games or across games & mods. Shaders and base localization files
	 * e.g. reside in the engine directory.
	 *
	 * @return engine directory
	 */
	static FString EngineDir();

	/** 
	 * Returns the content directory of the "core" engine that can be shared across
	 * several games or across games & mods. 
	 *
	 * @return engine content directory
	 */
	static FString EngineContentDir();

	/**
	 * Returns the root directory of the engine directory tree
	 *
	 * @return Root directory.
	 */
	static FString RootDir();

	/**
	 * Returns the base directory of the current project by looking at FApp::GetProjectName().
	 * This is usually a subdirectory of the installation
	 * root directory and can be overridden on the command line to allow self
	 * contained mod support.
	 *
	 * @return base directory
	 */
	static FString ProjectDir();

	/**
	 * Returns the content directory of the current game by looking at FApp::GetProjectName().
	 *
	 * @return content directory
	 */
	static FString ProjectContentDir();

	/**
	* Returns the directory the root configuration files are located.
	*
	* @return root config directory
	*/
	static FString ProjectConfigDir();

	/*
	* Returns the writable directory for downloaded data that persists across play sessions.
	*/
	static FString ProjectPersistentDownloadDir();

	/**
	 * Returns the directory the engine uses to output logs. This currently can't 
	 * be an .ini setting as the game starts logging before it can read from .ini
	 * files.
	 *
	 * @return log directory
	 */
	static FString ProjectLogDir();

	// Returns the filename (with extension), minus any path information.
	static FString GetCleanFilename(FString&& InPath);

	// Returns the same thing as GetCleanFilename, but without the extension
	static FString GetBaseFilename(FString&& InPath, bool bRemovePath = true);

	// Returns the path in front of the filename
	static FString GetPath(FString&& InPath);

	/** Returns true if this file was found, false otherwise */
	static bool FileExists(const FString& InPath);

	/** Returns true if this directory was found, false otherwise */
	static bool DirectoryExists(const FString& InPath);

	/** Convert all / and \ to TEXT("/") */
	static void NormalizeFilename(FString& InPath);

	/**
	 * Converts a relative path name to a fully qualified name relative to the process BaseDir().
	 */
	static FString ConvertRelativePathToFull(FString&& InPath);

	/**
	 * Parses a fully qualified or relative filename into its components (filename, path, extension).
	 *
	 * @param	InPath			[in] Full filename path
	 * @param	PathPart		[out] receives the value of the path portion of the input string
	 * @param	FilenamePart	[out] receives the value of the filename portion of the input string
	 * @param	ExtensionPart	[out] receives the value of the extension portion of the input string
	 */
	static void Split( const FString& InPath, FString& PathPart, FString& FilenamePart, FString& ExtensionPart );

	template <typename... PathTypes>
	FORCEINLINE static FString Combine(PathTypes&&... InPaths)
	{
		return CombineImpl<PathTypes...>(Forward<PathTypes>(InPaths)...);
	}                          
```
