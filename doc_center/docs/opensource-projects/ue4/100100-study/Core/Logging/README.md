---
title: Logging
---

## LogMacros.h

```c++
	/** 
	 * A predicate that returns true if the given logging category is active (logging) at a given verbosity level 
	 * @param CategoryName name of the logging category
	 * @param Verbosity, verbosity level to test against
	**/
	#define UE_LOG_ACTIVE(CategoryName, Verbosity) (::UEAsserts_Private::IsLogActive<(int32)ELogVerbosity::Verbosity>(CategoryName))

	#define UE_GET_LOG_VERBOSITY(CategoryName) \
		CategoryName.GetVerbosity()

	#define UE_SET_LOG_VERBOSITY(CategoryName, Verbosity) \
		CategoryName.SetVerbosity(ELogVerbosity::Verbosity);

	/** 
	 * A  macro that outputs a formatted message to log if a given logging category is active at a given verbosity level
	 * @param CategoryName name of the logging category
	 * @param Verbosity, verbosity level to test against
	 * @param Format, format text
	 ***/
	#define UE_LOG(CategoryName, Verbosity, Format, ...) \
	{ \
		CA_CONSTANT_IF((ELogVerbosity::Verbosity & ELogVerbosity::VerbosityMask) <= ELogVerbosity::COMPILED_IN_MINIMUM_VERBOSITY && (ELogVerbosity::Warning & ELogVerbosity::VerbosityMask) <= FLogCategory##CategoryName::CompileTimeVerbosity) \
		{ \
			UE_INTERNAL_LOG_IMPL(CategoryName, Verbosity, Format, ##__VA_ARGS__); \
		} \
	}

	/** 
	 * A macro to declare a logging category as a C++ "extern", usually declared in the header and paired with DEFINE_LOG_CATEGORY in the source. Accessible by all files that include the header.
	 * @param CategoryName, category to declare
	 * @param DefaultVerbosity, default run time verbosity
	 * @param CompileTimeVerbosity, maximum verbosity to compile into the code
	 **/
	#define DECLARE_LOG_CATEGORY_EXTERN(CategoryName, DefaultVerbosity, CompileTimeVerbosity) \
		extern struct FLogCategory##CategoryName : public FLogCategory<ELogVerbosity::DefaultVerbosity, ELogVerbosity::CompileTimeVerbosity> \
		{ \
			FORCEINLINE FLogCategory##CategoryName() : FLogCategory(TEXT(#CategoryName)) {} \
		} CategoryName;

	/** 
	 * A macro to define a logging category, usually paired with DECLARE_LOG_CATEGORY_EXTERN from the header.
	 * @param CategoryName, category to define
	**/
	#define DEFINE_LOG_CATEGORY(CategoryName) FLogCategory##CategoryName CategoryName;      
```

## LogVerbosity.h

```c++
/** 
 * Enum that defines the verbosity levels of the logging system.
 * Also defines some non-verbosity levels that are hacks that allow
 * breaking on a given log line or setting the color.
**/
namespace ELogVerbosity
{
	enum Type : uint8
	{
		/** Not used */
		NoLogging		= 0,

		/** Always prints a fatal error to console (and log file) and crashes (even if logging is disabled) */
		Fatal,

		/** 
		 * Prints an error to console (and log file). 
		 * Commandlets and the editor collect and report errors. Error messages result in commandlet failure.
		 */
		Error,

		/** 
		 * Prints a warning to console (and log file).
		 * Commandlets and the editor collect and report warnings. Warnings can be treated as an error.
		 */
		Warning,

		/** Prints a message to console (and log file) */
		Display,

		/** Prints a message to a log file (does not print to console) */
		Log,

		/** 
		 * Prints a verbose message to a log file (if Verbose logging is enabled for the given category, 
		 * usually used for detailed logging) 
		 */
		Verbose,

		/** 
		 * Prints a verbose message to a log file (if VeryVerbose logging is enabled, 
		 * usually used for detailed logging that would otherwise spam output) 
		 */
		VeryVerbose,

		// Log masks and special Enum values

		All				= VeryVerbose,
		NumVerbosity,
		VerbosityMask	= 0xf,
		SetColor		= 0x40, // not actually a verbosity, used to set the color of an output device 
		BreakOnLog		= 0x80
	};
}
```
