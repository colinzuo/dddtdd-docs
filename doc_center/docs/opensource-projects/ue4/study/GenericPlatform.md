
## [FGenericPlatformTime](https://docs.unrealengine.com/en-US/API/Runtime/Core/GenericPlatform/FGenericPlatformTime/index.html)

- SystemTime
- UtcTime

## [IFileHandle](https://docs.unrealengine.com/en-US/API/Runtime/Core/GenericPlatform/IFileHandle/index.html)

- Flush
- Read
- Seek
- Tell
- Write

## [IPakFile](https://docs.unrealengine.com/en-US/API/Runtime/Core/GenericPlatform/IPakFile/index.html)

- PakContains
- PakGetMountPoint
- PakGetPakchunkIndex
- PakGetPakFilename

## [IPhysicalPlatformFile](https://docs.unrealengine.com/en-US/API/Runtime/Core/GenericPlatform/IPhysicalPlatformFile/index.html)

- GetLowerLevel
- GetName
- SetLowerLevel

## [IPlatformChunkInstall](https://docs.unrealengine.com/en-US/API/Runtime/Core/GenericPlatform/IPlatformChunkInstall/index.html)

- InstallChunks
- UninstallChunks

## [IPlatformFile](https://docs.unrealengine.com/en-US/API/Runtime/Core/GenericPlatform/IPlatformFile/index.html)

- CopyDirectoryTree
- CopyFile
- CreateDirectory
- DeleteDirectoryRecursively
- DeleteFile
- DirectoryExists
- FileExists
- MoveFile
- OpenRead
- OpenWrite

## [TFunction](https://docs.unrealengine.com/en-US/API/Runtime/Core/GenericPlatform/TFunction/index.html)

```
A function taking a string and float and returning int32. Parameter names are optional. TFunction<int32 (const FString& Name, float Scale)>

Something.h

TFunction<FString (int32)> GetTransform();

Something.cpp

TFunction<FString (int32)> GetTransform(const FString& Prefix) { 
  Squares number and returns it as a string with the specified prefix 
  return [=](int32 Num) { 
    return Prefix + TEXT(": ") + TTypeToString<int32>::ToString(Num * Num); 
  }; 
}

SomewhereElse.cpp 

#include "Something.h"

void Func() { 
  TFunction<FString (int32)> Transform = GetTransform(TEXT("Hello"));

  FString Result = Transform(5); // "Hello: 25" 
}
```

## [TFunctionRef](https://docs.unrealengine.com/en-US/API/Runtime/Core/GenericPlatform/TFunctionRef/index.html)

A class which represents a reference to something callable. The important part here is reference - if you bind it to a lambda and the lambda goes out of scope, you will be left with an invalid reference.

## [FEvent](https://docs.unrealengine.com/en-US/API/Runtime/Core/HAL/FEvent/index.html)

- Create
- Reset
- Trigger
- Wait
