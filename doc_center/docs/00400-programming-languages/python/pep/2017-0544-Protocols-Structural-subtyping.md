
[https://peps.python.org/pep-0544/](https://peps.python.org/pep-0544/)

## Rationale and Goals

Currently, PEP 484 and the `typing` module define abstract base classes for several common Python protocols such as `Iterable` and `Sized`. The **problem** with them is that a class **has to be explicitly marked** to support them

```py
from typing import Sized, Iterable, Iterator

class Bucket(Sized, Iterable[int]):
    ...
    def __len__(self) -> int: ...
    def __iter__(self) -> Iterator[int]: ...
```

## Specification

### Terminology

We propose to use the term `protocols` for types supporting structural subtyping. The reason is that the term `iterator protocol`, for example, is widely understood in the community

If a class includes a protocol in its MRO, the class is called an **explicit subclass of the protocol**. If a class is a structural subtype of a protocol, it is said to implement the protocol and to be **compatible with a protocol**. If a class is compatible with a protocol but the protocol is not included in the MRO, the class is an **implicit subtype of the protocol**

The attributes (variables and methods) of a protocol that are mandatory for other class in order to be considered a structural subtype are called **protocol members**

### Defining a protocol

Protocols are defined by including a special new class `typing.Protocol` (an instance of `abc.ABCMeta`) in the base classes list, typically at the end of the list

```py
from typing import Protocol

class SupportsClose(Protocol):
    def close(self) -> None:
        ...
```

### Protocol members

All methods defined in the protocol class body are protocol members, both normal and decorated with `@abstractmethod`. If any parameters of a protocol method are not annotated, then their types are assumed to be `Any` (see PEP 484). Bodies of protocol methods are type checked. An abstract method that should not be called via super() ought to raise NotImplementedError

```py
from typing import Protocol
from abc import abstractmethod

class Example(Protocol):
    def first(self) -> int:     # This is a protocol member
        return 42

    @abstractmethod
    def second(self) -> int:    # Method without a default implementation
        raise NotImplementedError
```

To define a protocol variable, one can use PEP 526 variable annotations in the class body

```py
from typing import Protocol, List

class Template(Protocol):
    name: str        # This is a protocol member
    value: int = 0   # This one too (with default)

    def method(self) -> None:
        self.temp: List[int] = [] # Error in type checker

class Concrete:
    def __init__(self, name: str, value: int) -> None:
        self.name = name
        self.value = value

    def method(self) -> None:
        return

var: Template = Concrete('value', 42)  # OK
```

### Explicitly declaring implementation

To explicitly declare that a certain class implements a given protocol, it can be used as a regular base class. In this case a class could use default implementations of protocol members

### Merging and extending protocols

Subclassing a protocol class would **not turn** the subclass into a protocol unless it also has `typing.Protocol` as an explicit base class

```py
from typing import Sized

class SupportsClose(Protocol):
    def close(self) -> None:
        ...

class SizedAndClosable(Sized, SupportsClose, Protocol):
    pass
```

If `Protocol` is included in the base class list, all the other base classes must be protocols

### Generic protocols

```py
class Iterable(Protocol[T]):
    @abstractmethod
    def __iter__(self) -> Iterator[T]:
        ...
```

`Protocol[T, S, ...]` is allowed as a shorthand for `Protocol, Generic[T, S, ...]`

### Recursive protocols

```py
class Traversable(Protocol):
    def leaves(self) -> Iterable['Traversable']:
        ...
```

### Callback protocols

Protocols can be used to define flexible callback types that are hard (or even impossible) to express using the `Callable[...]`

```py
from typing import Optional, List, Protocol

class Combiner(Protocol):
    def __call__(self, *vals: bytes,
                 maxlen: Optional[int] = None) -> List[bytes]: ...

def good_cb(*vals: bytes, maxlen: Optional[int] = None) -> List[bytes]:
    ...
def bad_cb(*vals: bytes, maxitems: Optional[int]) -> List[bytes]:
    ...

comb: Combiner = good_cb  # OK
comb = bad_cb  # Error! Argument 2 has incompatible type because of
               # different name and kind in the callback
```

## Runtime Implementation of Protocol Classes

### Changes in the typing module

The following classes in typing module will be protocols:

- Callable
- Awaitable
- Iterable, Iterator
- AsyncIterable, AsyncIterator
- Hashable
- Sized
- Container
- Collection
- Reversible
- ContextManager, AsyncContextManager
- SupportsAbs (and other Supports* classes)
