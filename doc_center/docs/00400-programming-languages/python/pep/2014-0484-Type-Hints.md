
[https://peps.python.org/pep-0484](https://peps.python.org/pep-0484)

This PEP introduces a provisional module to provide these **standard definitions and tools**, along with some conventions for situations where annotations are not available

The proposal is strongly inspired by **mypy**

## Type Definition Syntax

### Acceptable type hints

Type hints may be **built-in classes** (including those defined in standard library or third-party extension modules), **abstract base classes**, types available in the **types module**, and **user-defined classes** (including those defined in the standard library or third-party modules)

While annotations are normally the best format for type hints, there are times when it is more appropriate to represent them **by a special comment**, or in a separately distributed **stub file**

In addition to the above, the following special constructs defined below may be used: `None`, `Any`, `Union`, `Tuple`, `Callable`, all `ABCs` and stand-ins for concrete classes exported from `typing` (e.g. `Sequence` and `Dict`), **type variables**, and **type aliases**

### Using None

When used in a type hint, the expression None is considered equivalent to `type(None)`

### Type aliases

```python
Url = str

def retry(url: Url, retry_count: int) -> None: ...
```

```py
from typing import TypeVar, Iterable, Tuple

T = TypeVar('T', int, float, complex)
Vector = Iterable[Tuple[T, T]]

def inproduct(v: Vector[T]) -> T:
    return sum(x*y for x, y in v)
def dilate(v: Vector[T], scale: T) -> Vector[T]:
    return ((x * scale, y * scale) for x, y in v)
vec = []  # type: Vector[float]
```

### Callable

```py
from typing import Callable

def feeder(get_next_item: Callable[[], str]) -> None:
    # Body

def async_query(on_success: Callable[[int], None],
                on_error: Callable[[int, Exception], None]) -> None:
    # Body
```    

It is possible to declare the return type of a callable without specifying the call signature by substituting a literal **ellipsis** (three dots) for the list of arguments

```py
def partial(func: Callable[..., str], *args) -> Callable[..., str]:
    # Body
```    

### Generics

```py
from typing import Mapping, Set

def notify_by_email(employees: Set[Employee], overrides: Mapping[str, str]) -> None: ...
```

```py
from typing import Sequence, TypeVar

T = TypeVar('T')      # Declare type variable

def first(l: Sequence[T]) -> T:   # Generic function
    return l[0]
```

A `TypeVar()` expression must always directly be assigned to a variable (it should not be used as part of a larger expression). The argument to `TypeVar()` must be a string equal to the variable name to which it is assigned

### User-defined generic types

You can include a `Generic` base class to define a user-defined class as generic

```py
from typing import TypeVar, Generic
from logging import Logger

T = TypeVar('T')

class LoggedVar(Generic[T]):
    def __init__(self, value: T, name: str, logger: Logger) -> None:
        self.name = name
        self.logger = logger
        self.value = value

    def set(self, new: T) -> None:
        self.log('Set ' + repr(self.value))
        self.value = new

    def get(self) -> T:
        self.log('Get ' + repr(self.value))
        return self.value

    def log(self, message: str) -> None:
        self.logger.info('{}: {}'.format(self.name, message))
```

The `Generic` base class uses a metaclass that defines `__getitem__` so that `LoggedVar[t]` is valid as a type

```py
from typing import Iterable

def zero_all_vars(vars: Iterable[LoggedVar[int]]) -> None:
    for var in vars:
        var.set(0)
```        

Subclassing a generic class without specifying type parameters assumes `Any` for each position. In the following example, MyIterable is not generic but implicitly inherits from `Iterable[Any]`

```py
from typing import Iterable

class MyIterable(Iterable):  # Same as Iterable[Any]
    ...
```

### Scoping rules for type variables

- A type variable used in a method that does not match any of the variables that parameterize the class makes this method a generic function in that variable

```py
T = TypeVar('T')
S = TypeVar('S')
class Foo(Generic[T]):
    def method(self, x: T, y: S) -> S:
        ...

x = Foo()               # type: Foo[int]
y = x.method(0, "abc")  # inferred type of y is str
```

- Unbound type variables should not appear in the bodies of generic functions, or in the class bodies apart from method definitions

```py
T = TypeVar('T')
S = TypeVar('S')

def a_fun(x: T) -> None:
    # this is OK
    y = []  # type: List[T]
    # but below is an error!
    y = []  # type: List[S]

class Bar(Generic[T]):
    # this is also an error
    an_attr = []  # type: List[S]

    def do_something(x: S) -> S:  # this is OK though
        ...
```        

### Instantiating generic classes and type erasure

```python
from typing import TypeVar, Generic

T = TypeVar('T')

class Node(Generic[T]):
    x = None  # type: T # Instance attribute (see below)
    def __init__(self, label: T = None) -> None:
        ...

x = Node('')  # Inferred type is Node[str]
y = Node(0)   # Inferred type is Node[int]
z = Node()    # Inferred type is Node[Any]
```

To create Node instances you call `Node()` just as for a regular class. **At runtime** the type (class) of the instance will be `Node`. But what type does it have to the type checker? The answer depends on how much information is available in the call. If the constructor (`__init__` or `__new__`) uses `T` in its signature, and a corresponding argument value is passed, the **type of the corresponding argument(s)** is substituted. Otherwise, `Any` is assumed

In case the inferred type uses `[Any]` but the intended type is more specific, you can use a **type comment** (see below) to force the type of the variable

```python
a = Node()  # type: Node[int]
b = Node()  # type: Node[str]
```

Alternatively, you can instantiate a specific **concrete type**

```python
p = Node[int]()
q = Node[str]()
```

`Node[int]` and `Node[str]` are distinguishable class objects, but the runtime class of the objects created by instantiating them doesn’t record the distinction. This behavior is called **“type erasure”**

It is not recommended to use the subscripted class (e.g. `Node[int]`) directly in an expression – using a type alias (e.g. `IntNode = Node[int]`) instead is preferred. (First, creating the subscripted class, e.g. `Node[int]`, has a **runtime cost**. Second, using a type alias is more **readable**.)

### Abstract generic types

The metaclass used by `Generic` is a subclass of `abc.ABCMeta`. A generic class can be an ABC by including abstract methods or properties, and generic classes can also have ABCs as base classes without a **metaclass conflict**

### Type variables with an upper bound

A type variable may specify an upper bound using `bound=<type>` (note: `<type>` itself cannot be parameterized by type variables). This means that an actual type substituted (explicitly or implicitly) for the type variable **must be a subtype of the boundary type**

```py
from typing import TypeVar, Sized

ST = TypeVar('ST', bound=Sized)

def longer(x: ST, y: ST) -> ST:
    if len(x) > len(y):
        return x
    else:
        return y

longer([1], [1, 2])  # ok, return type List[int]
longer({1}, {1, 2})  # ok, return type Set[int]
longer([1], {1, 2})  # ok, return type Collection[int]
```

### Covariance and contravariance

The read-only collection classes in typing are all declared **covariant** in their type variable (e.g. `Mapping` and `Sequence`). The mutable collection classes (e.g. `MutableMapping` and `MutableSequence`) are declared **invariant**. The one example of a **contravariant** type is the `Generator` type, which is contravariant in the `send()` argument type

Variance is only applicable to generic types; generic functions do not have this property

### Union types

```py
from typing import Union

def handle_employees(e: Union[Employee, Sequence[Employee]]) -> None:
    if isinstance(e, Employee):
        e = [e]
    ...
```

```py
def handle_employee(e: Union[Employee, None]) -> None: ...

from typing import Optional

def handle_employee(e: Optional[Employee]) -> None: ...
```

### Support for singleton types in unions

```py
class Reason(Enum):
    timeout = 1
    error = 2

def process(response: Union[str, Reason] = '') -> str:
    if response is Reason.timeout:
        return 'TIMEOUT'
    elif response is Reason.error:
        return 'ERROR'
    else:
        # response can be only str, all other possible values exhausted
        return 'PROCESSED: ' + response
```

### The NoReturn type

The `typing` module provides a special type `NoReturn` to annotate functions that **never return normally**

```py
from typing import NoReturn

def stop() -> NoReturn:
    raise RuntimeError('no way')
```

### The type of class objects

```py
U = TypeVar('U', bound=User)
def new_user(user_class: Type[U]) -> U:
    user = user_class()
    ...

def new_non_team_user(user_class: Type[Union[BasicUser, ProUser]]):
    user = new_user(user_class)
    ...    
```

### Annotating instance and class methods

```py
T = TypeVar('T', bound='Copyable')
class Copyable:
    def copy(self: T) -> T:
        # return a copy of self

class C(Copyable): ...
c = C()
c2 = c.copy()  # type here should be C
```

```py
T = TypeVar('T', bound='C')
class C:
    @classmethod
    def factory(cls: Type[T]) -> T:
        # make a new instance of cls

class D(C): ...
d = D.factory()  # type here should be D
```

### Annotating generator functions and coroutines

`Generator[yield_type, send_type, return_type]`

```py
def echo_round() -> Generator[int, float, str]:
    res = yield
    while res:
        res = yield round(res)
    return 'OK'
```

```py
async def spam(ignored: int) -> str:
    return 'spam'

async def foo() -> None:
    bar = await spam(42)  # type: str
```

```py
from typing import List, Coroutine
c = None  # type: Coroutine[List[str], str, int]
...
x = c.send('hi')  # type: List[str]
async def bar() -> None:
    x = await c  # type: int
```

```py
def op() -> typing.Awaitable[str]:
    if cond:
        return spam(42)
    else:
        return asyncio.Future(...)
```        

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

Type comments should be put on the last line of the statement that contains the variable definition. They can also be placed on with statements and for statements, right after the colon.

```py
with frobnicate() as foo:  # type: int
    # Here foo is an int
    ...

for x, y in points:  # type: float, float
    # Here x and y are floats
    ...
```

This can be done using **PEP 526** variable annotation syntax

```py
from typing import IO

stream: IO[str]
```

## Casts

```py
from typing import List, cast

def find_first_str(a: List[object]) -> str:
    index = next(i for i, x in enumerate(a) if isinstance(x, str))
    # We only get here if there's at least one string in a
    return cast(str, a[index])
```

At runtime a cast always returns the expression unchanged – it does not check the type, and it does not convert or coerce the value

Casts differ from type comments (see the previous section). When using a type comment, the type checker should still verify that the inferred type is consistent with the stated type

## NewType helper function

```py
UserId = NewType('UserId', int)

def name_by_id(user_id: UserId) -> str:
    ...

UserId('user')          # Fails type check

name_by_id(42)          # Fails type check
name_by_id(UserId(42))  # OK

num = UserId(5) + 1     # type: int
```

## Stub Files

Stub files are files containing type hints that are **only for use** by the type checker, not at runtime

The type checker should only check function signatures in stub files; It is recommended that function bodies in stub files just be a single ellipsis (...).

The type checker should have a configurable search path for stub files. If a stub file is found the type checker should not read the corresponding “real” module

While stub files are syntactically valid Python modules, they use the `.pyi` extension to make it possible to maintain stub files in the same directory as the corresponding real module

### Function/method overloading

```py
from typing import overload

class bytes:
    ...
    @overload
    def __getitem__(self, i: int) -> int: ...
    @overload
    def __getitem__(self, s: slice) -> bytes: ...
```    

```py
from typing import Callable, Iterable, Iterator, Tuple, TypeVar, overload

T1 = TypeVar('T1')
T2 = TypeVar('T2')
S = TypeVar('S')

@overload
def map(func: Callable[[T1], S], iter1: Iterable[T1]) -> Iterator[S]: ...
@overload
def map(func: Callable[[T1, T2], S],
        iter1: Iterable[T1], iter2: Iterable[T2]) -> Iterator[S]: ...
# ... and we could add more items to support more than two iterables
```

In regular modules, a series of @overload-decorated definitions must be followed by exactly one non-@overload-decorated definition (for the same function/method)

```py
@overload
def utf8(value: None) -> None:
    pass
@overload
def utf8(value: bytes) -> bytes:
    pass
@overload
def utf8(value: unicode) -> bytes:
    pass
def utf8(value):
    <actual implementation>
```

```py
from typing import TypeVar, Text

AnyStr = TypeVar('AnyStr', Text, bytes)

def concat1(x: AnyStr, y: AnyStr) -> AnyStr: ...

@overload
def concat2(x: str, y: str) -> str: ...
@overload
def concat2(x: bytes, y: bytes) -> bytes: ...
```

We **recommend** that `@overload` is only used in cases where a type variable is not sufficient, due to its special stub-only status

## The typing Module

To open the usage of static type checking to Python 3.5 as well as older versions, a uniform namespace is required. For this purpose, a new module in the standard library is introduced called `typing`

It defines the **fundamental building blocks** for constructing types (e.g. `Any`), types representing **generic variants of builtin collections** (e.g. `List`), types representing **generic collection ABCs** (e.g. `Sequence`), and a small collection of convenience definitions

### Fundamental building blocks

- Any, used as `def get(key: str) -> Any: ...`
- Union, used as `Union[Type1, Type2, Type3]`
- Callable, used as `Callable[[Arg1Type, Arg2Type], ReturnType]`
- Tuple, used by listing the element types, for example `Tuple[int, int, str]`. The empty tuple can be typed as `Tuple[()]`. Arbitrary-length homogeneous tuples can be expressed using one type and ellipsis, for example `Tuple[int, ...]`. (The ... here are part of the syntax, a literal ellipsis.)
- TypeVar, used as `X = TypeVar('X', Type1, Type2, Type3)` or simply `Y = TypeVar('Y')` (see above for more details)
- Generic, used to **create user-defined generic classes**
- Type, used to **annotate class objects**

### Generic variants of builtin collections

- Dict, used as `Dict[key_type, value_type]`
- DefaultDict, used as `DefaultDict[key_type, value_type]`, a generic variant of `collections.defaultdict`
- List, used as `List[element_type]`
- Set, used as `Set[element_type]`. See remark for AbstractSet below.
- FrozenSet, used as `FrozenSet[element_type]`

Note: `Dict`, `DefaultDict`, `List`, `Set` and `FrozenSet` are mainly useful for annotating return values. **For arguments, prefer** the abstract collection types defined below, e.g. `Mapping`, `Sequence` or `AbstractSet`

### Generic variants of container ABCs (and a few non-containers)

- Awaitable
- AsyncIterable
- AsyncIterator
- ByteString
- `Callable` (see above, listed here for completeness)
- Collection
- Container
- ContextManager
- Coroutine
- Generator, used as `Generator[yield_type, send_type, return_type]`. This represents the return value of generator functions. It is a subtype of `Iterable` and it has additional type variables for the type accepted by the `send()` method (it is contravariant in this variable – a generator that accepts sending it Employee instance is valid in a context where a generator is required that accepts sending it Manager instances) and the return type of the generator.
- Hashable (not generic, but present for completeness)
- ItemsView
- `Iterable`
- `Iterator`
- KeysView
- `Mapping`
- MappingView
- `MutableMapping`
- `MutableSequence`
- MutableSet
- `Sequence`
- Set, renamed to `AbstractSet`. This name change was required because Set in the typing module means set() with generics.
- Sized (not generic, but present for completeness)
- ValuesView

### Convenience definitions

- Optional, defined by `Optional[t] == Union[t, None]`
- Text, a simple alias for `str` in Python 3, for `unicode` in Python 2
- AnyStr, defined as `TypeVar('AnyStr', Text, bytes)`
- NamedTuple, used as `NamedTuple(type_name, [(field_name, field_type), ...])` and equivalent to collections.namedtuple(type_name, [field_name, ...]). This is useful to declare the types of the fields of a named tuple type.
- NewType, used to create unique types with little runtime overhead `UserId = NewType('UserId', int)`
- `cast()`, described earlier
- @no_type_check, a decorator to disable type checking per class or function (see below)
- @no_type_check_decorator, a decorator to create your own decorators with the same meaning as @no_type_check (see below)
- @type_check_only, a decorator only available during type checking for use in stub files (see above); marks a class or function as unavailable during runtime
- `@overload`, described earlier
- get_type_hints(), a utility function to retrieve the type hints from a function or method. Given a function or method object, it returns a dict with the same format as `__annotations__`, but evaluating forward references (which are given as string literals) as expressions in the context of the original function or method definition.
- TYPE_CHECKING, False at runtime but True to type checkers

### I/O related types

- IO (generic over `AnyStr`)
- BinaryIO (a simple subtype of `IO[bytes]`)
- TextIO (a simple subtype of `IO[str]`)
