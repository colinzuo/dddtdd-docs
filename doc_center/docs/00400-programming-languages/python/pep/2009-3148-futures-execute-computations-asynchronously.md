
[https://peps.python.org/pep-3148/](https://peps.python.org/pep-3148/)

## Specification

### Interface

#### Executor

- `submit(fn, *args, **kwargs)`
- `map(func, *iterables, timeout=None)`
- `shutdown(wait=True)`
- `__enter__()`
- `__exit__(exc_type, exc_val, exc_tb)`

#### ProcessPoolExecutor

- `__init__(max_workers)`

#### ThreadPoolExecutor

- `__init__(max_workers)`

#### Future Objects

- `cancel()`
- `cancelled()`
- `running()`
- `done()`
- `result(timeout=None)`
- `exception(timeout=None)`
- `add_done_callback(fn)`

#### Module Functions

- `wait(fs, timeout=None, return_when=ALL_COMPLETED)`
- `as_completed(fs, timeout=None)`
