
## IPlatformFile

- `virtual bool CopyDirectoryTree`
- `virtual bool CopyFile`
- `bool CreateDirectory`
- `virtual bool CreateDirectoryTree`
- `bool DeleteDirectory`
- `virtual bool DeleteDirectoryRecursively`
- `bool DeleteFile`
- `bool DirectoryExists`
- `bool FileExists`
- `int64 FileSize`
- `virtual void FindFiles`
- `virtual void FindFilesRecursively`
- `FDateTime GetAccessTimeStamp`
- `FDateTime GetTimeStamp`
- `bool IsReadOnly`
- `virtual bool IterateDirectory`
- `virtual bool IterateDirectoryRecursively`
- `bool MoveFile`
- `virtual IAsyncReadFileHandle * OpenAsyncRead`
- `IFileHandle * OpenRead`
- `IFileHandle * OpenWrite`
- `void SetTimeStamp`

```c++
	/**
	 * Initializes platform file.
	 *
	 * @param Inner Platform file to wrap by this file.
	 * @param CmdLine Command line to parse.
	 * @return true if the initialization was successful, false otherise. */
	virtual bool		Initialize(IPlatformFile* Inner, const TCHAR* CmdLine) = 0;

	/** Gets the platform file wrapped by this file. */
	virtual IPlatformFile* GetLowerLevel() = 0;
	/** Sets the platform file wrapped by this file. */
	virtual void SetLowerLevel(IPlatformFile* NewLowerLevel) = 0;
	/** Gets this platform file type name. */
	virtual const TCHAR* GetName() const = 0;  
```
