
## IPlatformFilePak.h

```c++
/**
 * Pak file.
 */
class PAKFILE_API FPakFile : FNoncopyable, public FRefCountBase, public IPakFile

	/** Pak filename. */
	FString PakFilename;
	FName PakFilenameName;
	/** Archive to serialize the pak file from. */
	TUniquePtr<class FChunkCacheWorker> Decryptor;
	/** List of readers and when they were last used. */
	TArray<FArchiveAndLastAccessTime> Readers;

	/** Critical section for accessing Readers. */
	FCriticalSection CriticalSection;
	/** Pak file info (trailer). */
	FPakInfo Info;
	/** Mount point. */
	FString MountPoint;
	/** Info on all files stored in pak. */
	TArray<FPakEntry> Files;

	virtual bool PakContains(const FString& FullPath) const override
	{
		return Find(FullPath, nullptr) == EFindResult::Found;
	}

	/**
	 * Creates a pak file using the supplied file handle.
	 *
	 * @param LowerLevel Lower level platform file.
	 * @param Filename Filename.
	 * @param bIsSigned = true if the pak is signed.
	 */
	FPakFile(IPlatformFile* LowerLevel, const TCHAR* Filename, bool bIsSigned, bool bLoadIndex = true);

	/**
	 * Finds an entry in the pak file matching the given filename.
	 *
	 * @param Filename File to find.
	 * @param OutEntry The optional address of an FPakEntry instance where the found file information should be stored. Pass NULL to only check for file existence.
	 * @return Returns true if the file was found, false otherwise.
	 */
	enum class EFindResult : uint8
	{
		NotFound,
		Found,
		FoundDeleted,
	};
	EFindResult Find(const FString& FullPath, FPakEntry* OutEntry) const;

	/**
	 * Sets the pak file mount point.
	 *
	 * @param Path New mount point path.
	 */
	void SetMountPoint(const TCHAR* Path)
	{
		MountPoint = Path;
		MakeDirectoryFromPath(MountPoint);
	}

	/**
	 * Gets pak file mount point.
	 *
	 * @return Mount point path.
	 */
	const FString& GetMountPoint() const
	{
		return MountPoint;
	}  

	/**
	 * Looks for files or directories within the Pruned DirectoryIndex of the pak file.
	 * The Pruned DirectoryIndex does not have entries for most Files in the pak; they were removed to save memory.
	 * A project can specify which FileNames and DirectoryNames can be marked to keep in the DirectoryIndex; see FPakFile::FIndexSettings and FPakFile::PruneDirectoryIndex
	 * Returned paths are full paths (include the mount point)
	 *
	 * @param OutFiles List of files or folder matching search criteria.
	 * @param InPath Path to look for files or folder at.
	 * @param bIncludeFiles If true OutFiles will include matching files.
	 * @param bIncludeDirectories If true OutFiles will include matching folders.
	 * @param bRecursive If true, sub-folders will also be checked.
	 */
	template <class ContainerType>
	void FindPrunedFilesAtPath(ContainerType& OutFiles, const TCHAR* InPath, bool bIncludeFiles = true, bool bIncludeDirectories = false, bool bRecursive = false) const
	{	

/**
 * Platform file wrapper to be able to use pak files.
 **/
class PAKFILE_API FPakPlatformFile : public IPlatformFile

	/**
	 * Gets mounted pak files
	 */
	FORCEINLINE void GetMountedPaks(TArray<FPakListEntry>& Paks)
	{
		FScopeLock ScopedLock(&PakListCritical);
		Paks.Append(PakFiles);
	}

	/**
	 * Finds all pak files in the given directory.
	 *
	 * @param Directory Directory to (recursively) look for pak files in
	 * @param OutPakFiles List of pak files
	 */
	static void FindPakFilesInDirectory(IPlatformFile* LowLevelFile, const TCHAR* Directory, const FString& WildCard, TArray<FString>& OutPakFiles);

	/**
	 * Mounts a pak file at the specified path.
	 *
	 * @param InPakFilename Pak filename.
	 * @param InPath Path to mount the pak at.
	 */
	bool Mount(const TCHAR* InPakFilename, uint32 PakOrder, const TCHAR* InPath = NULL, bool bLoadIndex = true);

//~ Begin IPlatformFile Interface
	virtual bool FileExists(const TCHAR* Filename) override
	{
		// Check pak files first.
		if (FindFileInPakFiles(Filename))
		{
			return true;
		}
		// File has not been found in any of the pak files, continue looking in inner platform file.
		bool Result = false;
		if (IsNonPakFilenameAllowed(Filename))
		{
			Result = LowerLevel->FileExists(Filename);
		}
		return Result;
	}

	virtual bool DeleteFile(const TCHAR* Filename) override
	{
		// If file exists in pak file it will never get deleted.
		if (FindFileInPakFiles(Filename))
		{
			return false;
		}
		// The file does not exist in pak files, try LowerLevel->
		bool Result = false;
		if (IsNonPakFilenameAllowed(Filename))
		{
			Result = LowerLevel->DeleteFile(Filename);
		}
		return Result;
	}		
```
