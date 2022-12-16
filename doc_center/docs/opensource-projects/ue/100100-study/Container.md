
## [FBackgroundableTicker](https://docs.unrealengine.com/en-US/API/Runtime/Core/Containers/FBackgroundableTicker/index.html)

This works the same as the core FTicker , but on supported mobile platforms it continues ticking while the app is running in the background.

## [FString](https://docs.unrealengine.com/en-US/API/Runtime/Core/Containers/FString/index.html)

- Append
- Compare
- Contains
- EndsWith
- Equals
- Find
- Format
- FromInt
- InsertAt
- IsEmpty
- Join
- Left
- Len
- MatchesWildcard
- Mid
- ParseIntoArray
- PathAppend
- Printf
- RemoveAt
- RemoveFromEnd
- RemoveFromStart
- Replace
- Reverse
- Right
- Split
- StartsWith
- ToBool
- ToLower
- ToUpper
- TrimEnd
- TrimStart
- TrimStartAndEnd

## [FTicker](https://docs.unrealengine.com/en-US/API/Runtime/Core/Containers/FTicker/index.html)

Fires delegates after a delay. 看描述像是一般平台的Timer

## [TArray](https://docs.unrealengine.com/en-US/API/Runtime/Core/Containers/TArray/index.html)

Templated dynamic array

- Add
- Append
- Contains
- Find
- FindLast
- Insert
- Pop
- Push
- Remove
- RemoveAt
- Sort

## [TMap](https://docs.unrealengine.com/en-US/API/Runtime/Core/Containers/TMap/index.html)

## [TQueue](https://docs.unrealengine.com/en-US/API/Runtime/Core/Containers/TQueue/index.html)

线程安全队列

This template implements an unbounded non-intrusive queue using a lock-free linked list that stores copies of the queued items. The template can operate in two modes: Multiple-producers single-consumer (MPSC) and Single-producer single-consumer (SPSC).

The queue is thread-safe in both modes. The Dequeue() method ensures thread-safety by writing it in a way that does not depend on possible instruction reordering on the CPU. The Enqueue() method uses an atomic compare-and-swap in multiple-producers scenarios.

