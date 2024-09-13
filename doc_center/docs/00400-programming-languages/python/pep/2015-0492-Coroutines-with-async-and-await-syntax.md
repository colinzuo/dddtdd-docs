
[PEP 492 – Coroutines with async and await syntax](https://peps.python.org/pep-0492/)

## Abstract

This PEP assumes that the asynchronous tasks are scheduled and coordinated by an **Event Loop** similar to that of stdlib module `asyncio.events.AbstractEventLoop`. While the PEP is not tied to any specific Event Loop implementation, it is relevant only to the kind of coroutine that uses `yield` as a signal to the scheduler, indicating that the coroutine will be waiting until an event (such as IO) is completed

## Specification

### New Coroutine Declaration Syntax

```py
async def read_data(db):
    pass
```

### Await Expression

```py
async def read_data(db):
    data = await db.fetch('SELECT ...')
    ...
```

### Asynchronous Context Managers and “async with”

```py
class AsyncContextManager:
    async def __aenter__(self):
        await log('entering context')

    async def __aexit__(self, exc_type, exc, tb):
        await log('exiting context')
```

```py
async with EXPR as VAR:
    BLOCK
```

### Asynchronous Iterators and “async for”

```py
class AsyncIterable:
    def __aiter__(self):
        return self

    async def __anext__(self):
        data = await self.fetch_data()
        if data:
            return data
        else:
            raise StopAsyncIteration

    async def fetch_data(self):
        ...
```

```py
async for TARGET in ITER:
    BLOCK
else:
    BLOCK2
```

## Glossary

- Native coroutine function
- Native coroutine
- Generator-based coroutine function
- Generator-based coroutine
- Coroutine
- Coroutine object
- Future-like object
- Awaitable
- Asynchronous context manager
- Asynchronous iterable
- Asynchronous iterator
