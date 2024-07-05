
This PEP introduces a provisional module to provide these **standard definitions and tools**, along with some conventions for situations where annotations are not available

## Type Definition Syntax

### Type aliases

```python
Url = str

def retry(url: Url, retry_count: int) -> None: ...
```

### Instantiating generic classes and type erasure

```python
from typing import TypeVar, Generic

T = TypeVar('T')

class Node(Generic[T]):
    ...
```

In case the inferred type uses `[Any]` but the intended type is more specific, you can use a type comment (see below) to force the type of the variable

```python
a = Node()  # type: Node[int]
b = Node()  # type: Node[str]
```

Alternatively, you can instantiate a specific concrete type

```python
p = Node[int]()
q = Node[str]()
```

It is not recommended to use the subscripted class (e.g. `Node[int]`) directly in an expression – using a type alias (e.g. `IntNode = Node[int]`) instead is preferred. (First, creating the subscripted class, e.g. `Node[int]`, has a runtime cost. Second, using a type alias is more readable.)

## Compatibility with other uses of function annotations

- a `# type: ignore comment`;
- a `@no_type_check` decorator on a class or function;
- a custom class or function decorator marked with `@no_type_check_decorator`

## Type comments

```python
x = []                # type: List[Employee]
x, y, z = [], [], []  # type: List[int], List[int], List[str]
x, y, z = [], [], []  # type: (List[int], List[int], List[str])
a, b, *c = range(5)   # type: float, float, List[float]
x = [1, 2]            # type: List[int]
```

## The typing Module

To open the usage of static type checking to Python 3.5 as well as older versions, a uniform namespace is required. For this purpose, a new module in the standard library is introduced called `typing`

### Fundamental building blocks

- Any, used as `def get(key: str) -> Any: ...`
- Union, used as `Union[Type1, Type2, Type3]`
- Callable, used as `Callable[[Arg1Type, Arg2Type], ReturnType]`
- Tuple, used by listing the element types, for example `Tuple[int, int, str]`. The empty tuple can be typed as `Tuple[()]`. Arbitrary-length homogeneous tuples can be expressed using one type and ellipsis, for example `Tuple[int, ...]`. (The ... here are part of the syntax, a literal ellipsis.)
- TypeVar, used as `X = TypeVar('X', Type1, Type2, Type3)` or simply `Y = TypeVar('Y')` (see above for more details)
- Generic, used to create user-defined generic classes
- Type, used to annotate class objects

### Generic variants of builtin collections

- Dict, used as `Dict[key_type, value_type]`
- DefaultDict, used as `DefaultDict[key_type, value_type]`, a generic variant of `collections.defaultdict`
- List, used as `List[element_type]`
- Set, used as `Set[element_type]`. See remark for AbstractSet below.
- FrozenSet, used as `FrozenSet[element_type]`

### Generic variants of container ABCs (and a few non-containers)

- Awaitable
- AsyncIterable
- AsyncIterator
- ByteString
- Callable (see above, listed here for completeness)
- Collection
- Container
- ContextManager
- Coroutine
- Generator, used as `Generator[yield_type, send_type, return_type]`. This represents the return value of generator functions. It is a subtype of `Iterable` and it has additional type variables for the type accepted by the `send()` method (it is contravariant in this variable – a generator that accepts sending it Employee instance is valid in a context where a generator is required that accepts sending it Manager instances) and the return type of the generator.
- Hashable (not generic, but present for completeness)
- ItemsView
- Iterable
- Iterator
- KeysView
- Mapping
- MappingView
- MutableMapping
- MutableSequence
- MutableSet
- Sequence
- Set, renamed to `AbstractSet`. This name change was required because Set in the typing module means set() with generics.
- Sized (not generic, but present for completeness)
- ValuesView

### Convenience definitions

- Optional, defined by `Optional[t] == Union[t, None]`
- Text, a simple alias for `str` in Python 3, for `unicode` in Python 2
- AnyStr, defined as `TypeVar('AnyStr', Text, bytes)`
- NamedTuple, used as `NamedTuple(type_name, [(field_name, field_type), ...])` and equivalent to collections.namedtuple(type_name, [field_name, ...]). This is useful to declare the types of the fields of a named tuple type.
- NewType, used to create unique types with little runtime overhead `UserId = NewType('UserId', int)`
- cast(), described earlier
- @no_type_check, a decorator to disable type checking per class or function (see below)
- @no_type_check_decorator, a decorator to create your own decorators with the same meaning as @no_type_check (see below)
- @type_check_only, a decorator only available during type checking for use in stub files (see above); marks a class or function as unavailable during runtime
- @overload, described earlier
- get_type_hints(), a utility function to retrieve the type hints from a function or method. Given a function or method object, it returns a dict with the same format as `__annotations__`, but evaluating forward references (which are given as string literals) as expressions in the context of the original function or method definition.
- TYPE_CHECKING, False at runtime but True to type checkers

### I/O related types

- IO (generic over `AnyStr`)
- BinaryIO (a simple subtype of `IO[bytes]`)
- TextIO (a simple subtype of `IO[str]`)
