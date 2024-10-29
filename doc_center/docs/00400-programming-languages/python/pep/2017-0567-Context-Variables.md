
[https://peps.python.org/pep-0567/](https://peps.python.org/pep-0567/)

## Abstract

This PEP proposes a new `contextvars` module and a set of new CPython C APIs to support context variables. This concept is similar to `thread-local storage (TLS)`, but, unlike TLS, it also allows correctly keeping track of values per asynchronous task, e.g. `asyncio.Task`

## Introduction

The PEP proposes a new mechanism for managing context variables. The key classes involved in this mechanism are `contextvars.Context` and `contextvars.ContextVar`

The proposed mechanism for accessing context variables uses the `ContextVar` class. A module (such as decimal) that wishes to use the new mechanism should:

- declare a module-global variable holding a `ContextVar` to serve as a key;
- access the current value via the `get()` method on the key variable;
- modify the current value via the `set()` method on the key variable

Instead, there is the notion of the **“current Context” which is stored in thread-local storage**. Manipulation of the current context is the responsibility of the task framework, e.g. `asyncio`

It is not possible to get a direct reference to the current `Context` object, but it is possible to obtain a shallow copy of it using the `contextvars.copy_context()` function

## Specification

### contextvars.Context

`Context.run()` raises a `RuntimeError` when called on the same context object from more than one OS thread, or when called recursively

`Context` objects implement the `collections.abc.Mapping` ABC. This can be used to introspect contexts

### asyncio

```py
def call_soon(self, callback, *args, context=None):
    if context is None:
        context = contextvars.copy_context()

    # ... some time later
    context.run(callback, *args)
```    

```py
class Task:
    def __init__(self, coro):
        ...
        # Get the current context snapshot.
        self._context = contextvars.copy_context()
        self._loop.call_soon(self._step, context=self._context)

    def _step(self, exc=None):
        ...
        # Every advance of the wrapped coroutine is done in
        # the task's context.
        self._loop.call_soon(self._step, context=self._context)
        ...
```
        