
## UObjectBase.h

```c++
/** 
 * Low level implementation of UObject, should not be used directly in game code 
 */
class COREUOBJECT_API UObjectBase

	/**
	 * Constructor used by StaticAllocateObject
	 * @param	InClass				non NULL, this gives the class of the new object, if known at this time
	 * @param	InFlags				RF_Flags to assign
	 * @param	InInternalFlags EInternalObjectFlags to assign
	 * @param	InOuter				outer for this object
	 * @param	InName				name of the new object
	 */
	UObjectBase( UClass* InClass, EObjectFlags InFlags, EInternalObjectFlags InInternalFlags, UObject *InOuter, FName InName );

	/**
	 * Checks to see if the object appears to be valid
	 * @return true if this appears to be a valid object
	 */
	bool IsValidLowLevel() const;

	/** 
	 * Returns the unique ID of the object...these are reused so it is only unique while the object is alive.
	 * Useful as a tag.
	**/
	FORCEINLINE uint32 GetUniqueID() const
	{
		return (uint32)InternalIndex;
	}

	/** Returns the UClass that defines the fields of this object */
	FORCEINLINE UClass* GetClass() const
	{
		return ClassPrivate;
	}
	
	/** Returns the UObject this object resides in */
	FORCEINLINE UObject* GetOuter() const
	{
		return OuterPrivate;
	}

	/** Returns the logical name of this object */
	FORCEINLINE FName GetFName() const
	{
		return NamePrivate;
	}

	/** Flags used to track and report various object states. This needs to be 8 byte aligned on 32-bit
	    platforms to reduce memory waste */
	EObjectFlags					ObjectFlags;

	/** Index into GObjectArray...very private. */
	int32							InternalIndex;

	/** Class the object belongs to. */
	UClass*							ClassPrivate;

	/** Name of this object */
	FName							NamePrivate;

	/** Object this object resides in. */
	UObject*						OuterPrivate;        
```

## UObjectBaseUtility.h

```c++
```

## UObjectGlobals.h

```c++
/**
 * Find or load an object by string name with optional outer and filename specifications.
 * These are optional because the InName can contain all of the necessary information.
 *
 * @param ObjectClass	The class (or a superclass) of the object to be loaded.
 * @param InOuter		An optional object to narrow where to find/load the object from
 * @param Name			String name of the object. If it's not fully qualified, InOuter and/or Filename will be needed
 * @param Filename		An optional file to load from (or find in the file's package object)
 * @param LoadFlags		Flags controlling how to handle loading from disk, from the ELoadFlags enum
 * @param Sandbox		A list of packages to restrict the search for the object
 * @param bAllowObjectReconciliation	Whether to allow the object to be found via FindObject in the case of seek free loading
 * @param InstancingContext				InstancingContext used to remap imports when loading a packager under a new name
 *
 * @return The object that was loaded or found. nullptr for a failure.
 */
COREUOBJECT_API UObject* StaticLoadObject( UClass* Class, UObject* InOuter, const TCHAR* Name, const TCHAR* Filename = nullptr, uint32 LoadFlags = LOAD_None, UPackageMap* Sandbox = nullptr, bool bAllowObjectReconciliation = true, const FLinkerInstancingContext* InstancingContext = nullptr);

/** Version of StaticLoadObject() that will load classes */
COREUOBJECT_API UClass* StaticLoadClass(UClass* BaseClass, UObject* InOuter, const TCHAR* Name, const TCHAR* Filename = nullptr, uint32 LoadFlags = LOAD_None, UPackageMap* Sandbox = nullptr);

/**
 * Load a class object
 * @see StaticLoadClass
 */
template< class T > 
inline UClass* LoadClass( UObject* Outer, const TCHAR* Name, const TCHAR* Filename=nullptr, uint32 LoadFlags=LOAD_None, UPackageMap* Sandbox=nullptr )
{
	return StaticLoadClass( T::StaticClass(), Outer, Name, Filename, LoadFlags, Sandbox );
}
```
