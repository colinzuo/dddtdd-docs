
[https://peps.python.org/pep-3156/](https://peps.python.org/pep-3156/)

## Abstract

The proposal includes a **pluggable event loop**, **transport** and **protocol** abstractions similar to those in Twisted, and a higher-level scheduler based on `yield from` (PEP 380). The proposed package name is `asyncio`

## Event Loop Interface Specification

### Event Loop Policy: Getting and Setting the Current Event Loop

Event loop management is controlled by an **event loop policy**, which is a **global (per-process) object**. There is a default policy, and an API to change the policy. A policy defines the notion of **context**; a policy manages **a separate event loop per context**. The default policy’s notion of context is defined as the **current thread**

To get the event loop for current context, use `get_event_loop()`. This returns an event loop object implementing the interface specified below, or raises an exception in case no event loop has been set for the current context and the current policy does not specify to create one. It should **never return None**

To set the event loop for the current context, use `set_event_loop(event_loop)`, where event_loop is an event loop object, i.e. an instance of `AbstractEventLoop`, or `None`

It is expected that `get_event_loop()` returns a different event loop object depending on the context (in fact, this is the definition of context). It may create a new event loop object if none is set and creation is allowed by the policy. **The default policy will create a new event loop only in the main thread** (as defined by threading.py, which uses a special subclass for the main thread), and only if get_event_loop() is called before set_event_loop() is ever called. (To reset this state, reset the policy.) In other threads an event loop must be explicitly set

### Specifying Times

As usual in Python, all **timeouts, intervals and delays** are measured in seconds, and may be ints or floats. However, **absolute times** are not specified as POSIX timestamps. The accuracy, precision and epoch of the clock are up to the implementation.

The default implementation uses `time.monotonic()`

### Event Loop Methods Overview

The methods of a conforming event loop are grouped into **several categories**. The first set of categories must be supported by all conforming event loop implementations

- Starting, stopping and closing: `run_forever()`, `run_until_complete()`, `stop()`, `is_running()`, `close()`, `is_closed()`.
- Basic and timed callbacks: `call_soon()`, `call_later()`, `call_at()`, `time()`.
- Thread interaction: `call_soon_threadsafe()`, `run_in_executor()`, `set_default_executor()`.
- Internet name lookups: `getaddrinfo()`, `getnameinfo()`.
- Internet connections: `create_connection()`, `create_server()`, `create_datagram_endpoint()`.
- Wrapped socket methods: `sock_recv()`, `sock_sendall()`, `sock_connect()`, `sock_accept().`
- Tasks and futures support: `create_future()`, `create_task()`, `set_task_factory()`, `get_task_factory()`.
- Error handling: `get_exception_handler()`, `set_exception_handler()`, `default_exception_handler()`, `call_exception_handler()`.
- Debug mode: `get_debug()`, `set_debug()`

The second set of categories may be supported by conforming event loop implementations

- I/O callbacks: `add_reader()`, `remove_reader()`, `add_writer()`, `remove_writer()`.
- Pipes and subprocesses: `connect_read_pipe()`, `connect_write_pipe()`, `subprocess_shell()`, `subprocess_exec()`.
- Signal callbacks: `add_signal_handler()`, `remove_signal_handler()`

### Protocols

#### Stream Protocols

- `connection_made(transport)`
- `data_received(data)`
- `eof_received()`
- `pause_writing()`
- `resume_writing()`
- `connection_lost(exc)`

## Coroutines and the Scheduler

### Coroutines

A coroutine is a **generator that follows certain conventions**. For documentation purposes, all coroutines should be decorated with `@asyncio.coroutine`, but this cannot be strictly enforced

Coroutines use the `yield from` syntax introduced in PEP 380, instead of the original `yield` syntax

Calling a coroutine **does not start its code running** – it is just a generator, and the coroutine object returned by the call is really a generator object, which doesn’t do anything until you iterate over it. In the case of a coroutine object, there are **two basic ways to start** it running: call `yield from` coroutine from another coroutine (assuming the other coroutine is already running!), or convert it to a `Task`

### Waiting for Multiple Coroutines

- `asyncio.wait(fs, timeout=None, return_when=ALL_COMPLETED)`
- `asyncio.as_completed(fs, timeout=None)`
- `asyncio.wait_for(f, timeout)`
- `asyncio.gather(f1, f2, ...)`
- `asyncio.shield(f)`

### Sleeping

The coroutine `asyncio.sleep(delay)` returns after a given time delay

### Tasks

A Task is an object that manages an independently running coroutine. The `Task` interface is the same as the `Future` interface, and in fact `Task` is a subclass of `Future`

To convert a coroutine into a task, call the coroutine function and pass the resulting coroutine object to the `loop.create_task()` method. You may also use `asyncio.ensure_future()` for this purpose.

## Synchronization

In general these have a close correspondence to their threaded counterparts, however, blocking methods (e.g. `acquire()` on locks, `put()` and `get()` on queues) are **coroutines**, and timeout parameters are not provided (you can use `asyncio.wait_for()` to add a timeout to a blocking call, however)

### Locks

```py
with (yield from my_lock):
    ...
```

### Queues

- `Queue`
- `PriorityQueue`
- `LifoQueue`
- `JoinableQueue`
- `Empty`, `Full`
