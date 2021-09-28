

thread分named和workers，具体[ENamedThreads](https://docs.unrealengine.com/en-US/API/Runtime/Core/Async/ENamedThreads__Type/index.html)

worker (non-named) threads还分priority set

## [FAsyncTask](https://docs.unrealengine.com/en-US/API/Runtime/Core/Async/FAsyncTask/index.html)

```
start an example job FAsyncTask<ExampleAsyncTask>* MyTask = 
  new FAsyncTask<ExampleAsyncTask>( 5 ); 
  MyTask->StartBackgroundTask();

or MyTask->StartSynchronousTask();
```

## [EAsyncExecution](https://docs.unrealengine.com/en-US/API/Runtime/Core/Async/EAsyncExecution/index.html)

定义异步运行方式，比如
- TaskGraph: Execute in Task Graph (for short running tasks)
- Thread: Execute in separate thread (for long running tasks).
- ThreadPool: Execute in global queued thread pool.

## [Async](https://docs.unrealengine.com/en-US/API/Runtime/Core/Async/Async/index.html)

异步运行指定函数

```
using global function int TestFunc() { return 123; }

TUniqueFunction Task = TestFunc(); 
auto Result = Async(EAsyncExecution::Thread, Task);
```
