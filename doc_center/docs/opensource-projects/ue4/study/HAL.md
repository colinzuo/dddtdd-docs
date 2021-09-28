
## [FRunnable](https://docs.unrealengine.com/en-US/API/Runtime/Core/HAL/FRunnable/index.html)

A runnable object is an object that is "run" on an arbitrary thread. The call usage pattern is Init() , Run() , Exit() .

## [FThread](https://docs.unrealengine.com/en-US/API/Runtime/Core/HAL/FThread/index.html)

Simple API for system threads. Before using, please make sure you really need a new system thread. **By default and in the majority of cases parallel processing should be done by TaskGraph**.

## [FThreadSafeBool](https://docs.unrealengine.com/en-US/API/Runtime/Core/HAL/FThreadSafeBool/index.html)

Thread safe bool, wraps FThreadSafeCounter

## [FThreadSafeCounter](https://docs.unrealengine.com/en-US/API/Runtime/Core/HAL/FThreadSafeCounter/index.html)

Thread safe counter
