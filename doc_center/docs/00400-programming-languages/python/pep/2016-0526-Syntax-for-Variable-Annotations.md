
[https://peps.python.org/pep-0526/](https://peps.python.org/pep-0526/)

## Abstract

This PEP aims at adding syntax to Python for annotating the types of variables (including class variables and instance variables), instead of expressing them through comments

```py
primes: List[int] = []

captain: str  # Note: no initial value!

class Starship:
    stats: ClassVar[Dict[str, int]] = {}
```

## Specification

```py
my_var: int
my_var = 5  # Passes type check.
other_var: int  = 'a'  # Flagged as error by type checker,
                       # but OK at runtime.
```

the following three statements are equivalent

```py
var = value # type: annotation
var: annotation; var = value
var: annotation = value
```

### Global and local variable annotations

```py
some_number: int           # variable without initial value
some_list: List[int] = []  # variable with initial value
```

```py
sane_world: bool
if 2+2 == 4:
    sane_world = True
else:
    sane_world = False
```

```py
# Tuple packing with variable annotation syntax
t: Tuple[int, ...] = (1, 2, 3)
# or
t: Tuple[int, ...] = 1, 2, 3  # This only works in Python 3.8+

# Tuple unpacking with variable annotation syntax
header: str
kind: int
body: Optional[List[str]]
header, kind, body = message
```

### Class and instance variable annotations

In particular, the value-less notation `a: int` allows one to annotate instance variables that should be initialized in `__init__` or `__new__`

```py
class BasicStarship:
    captain: str = 'Picard'               # instance variable with default
    damage: int                           # instance variable without default
    stats: ClassVar[Dict[str, int]] = {}  # class variable
```

Since both variables happen to be **initialized at the class level**, it is useful to distinguish them by marking class variables as annotated with types wrapped in `ClassVar[...]`

instance variables can be annotated in `__init__` or other methods, rather than in the class

```py
from typing import Generic, TypeVar
T = TypeVar('T')

class Box(Generic[T]):
    def __init__(self, content):
        self.content: T = content
```

### Where annotations aren’t allowed

Only single assignment targets and single right hand side values are allowed. In addition, one cannot annotate variables used in a for or with statement; they can be annotated ahead of time, in a similar manner to tuple unpacking

```py
a: int
for a in my_iter:
    ...

f: MyFile
with myfunc() as f:
    ...
```    
