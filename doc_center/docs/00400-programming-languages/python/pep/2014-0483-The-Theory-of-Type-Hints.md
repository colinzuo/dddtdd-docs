
This PEP lays out the theory referenced by PEP 484

## Introduction

- We start by recalling basic concepts of **type theory**; 
- then we explain **gradual typing**; 
- then we state some **general rules** and define the new **special types** (such as `Union`) that can be used in annotations; 
- and finally we define the approach to **generic types and pragmatic aspects** of type hinting.

## Background

Here we assume that type is a **set of values** and a **set of functions** that one can apply to these values

There are several ways to define a particular type:

- By explicitly **listing all values**. E.g., True and False form the type bool.
- By **specifying functions** which can be used with variables of a type. E.g. all objects that have a `__len__` method form the type `Sized`
- By a simple **class definition**, then all instances of this class also form a type.
- There are also more complex types. E.g., one can define the type `FancyList` as all lists containing only instances of int, str or their subclasses

### Subtype relationships

If first_var has type first_type, and second_var has type second_type, is it safe to assign `first_var = second_var`?

A strong criterion for when it should be safe is:

- every value from second_type is also in the set of values of first_type; and
- every function from first_type is also in the set of functions of second_type.

The relation defined thus is called a subtype relation

There are **two** widespread approaches to declare subtype information to type checker

- In nominal subtyping, the type tree is based on the class tree
- In structural subtyping the subtype relation is deduced from the declared methods

We strive to provide **support for both** approaches, so that structural information can be used in addition to nominal subtyping

## Summary of gradual typing

We define a new relationship, **is-consistent-with**, which is similar to **is-subtype-of**

The is-consistent-with relationship is defined by three rules:

- A type t1 is consistent with a type t2 if t1 is a **subtype** of t2. (But not the other way around.)
- `Any` is consistent with every type. (But Any is not a subtype of every type.)
- Every type is consistent with `Any`. (But every type is not a subtype of Any.)

### Fundamental building blocks

- `Any`
- `Union[t1, t2, …]`
- `Optional[t1]`
- `Tuple[t1, t2, …, tn]`
    + To spell the type of the empty tuple, use `Tuple[()]`
    + A variadic homogeneous tuple type can be written `Tuple[t1, ...]`
- `Callable[[t1, t2, …, tn], tr]`
    + There is no way to indicate optional or keyword arguments, nor varargs, but you can say the argument list is entirely unchecked by writing `Callable[..., tr]`
- `Intersection[t1, t2, …]`

## Generic types

Such semantics is known as **generic type constructor**, it is similar to semantics of functions, but a function takes a value and returns a value, while generic type constructor takes a type and “returns” a type

```py
users = [] # type: List[UserID]
users.append(UserID(42)) # OK
users.append('Some guy') # Should be rejected by the type checker

examples = {} # type: Dict[str, Any]
examples['first example'] = object() # OK
examples[2] = None                   # rejected by the type checker
```

To allow type annotations in situations from the first example, **built-in containers and container abstract base classes are extended with type parameters**, so that they behave as generic type constructors. Classes, that behave as generic type constructors are called **generic types**

```py
from typing import Iterable

class Task:
    ...

def work(todo_list: Iterable[Task]) -> None:
    ...
```

### Type variables

`Y = TypeVar('Y', t1, t2, ...)`. Ditto, constrained to t1, etc. Behaves similar to `Union[t1, t2, ...]`

```py
AnyStr = TypeVar('AnyStr', str, bytes)

def longest(first: AnyStr, second: AnyStr) -> AnyStr:
    return first if len(first) >= len(second) else second
```

### Defining and using generic types

Users can declare their classes as generic types using the special building block `Generic`

```python
class CustomQueue(Generic[T]):

    def put(self, task: T) -> None:
        ...
    def get(self) -> T:
        ...

def communicate(queue: CustomQueue[str]) -> Optional[str]:
    ...
```    

If a generic type appears in a type annotation with a type variable omitted, it is assumed to be `Any`. Such form could be used as a fallback to dynamic typing and is allowed for use with issubclass and isinstance. All type information in instances is **erased at runtime**. 

## Pragmatics

Some things are irrelevant to the theory but make practical use more convenient

- Where a type is expected, `None` can be substituted for `type(None)`; e.g. `Union[t1, None] == Union[t1, type(None)]`
- Type aliases

```py
Point = Tuple[float, float]
def distance(point: Point) -> float: ...
```

- Forward references via strings

```py
class MyComparable:
    def compare(self, other: 'MyComparable') -> int: ...
```

- Casts using `cast(T, obj)`

```py
zork = cast(Any, frobozz())
```

### Predefined generic types and Protocols in typing.py

- Everything from `collections.abc` (but `Set` renamed to `AbstractSet`).
- `Dict`, `List`, `Set`, `FrozenSet`, a few more.
- `re.Pattern[AnyStr]`, `re.Match[AnyStr]`.
- `io.IO[AnyStr]`, `io.TextIO` ~ `io.IO[str]`, `io.BinaryIO` ~ `io.IO[bytes]`.
