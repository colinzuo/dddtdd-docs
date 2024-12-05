
[https://docs.python.org/3/library/enum.html](https://docs.python.org/3/library/enum.html)

An enumeration:

- is a set of symbolic names (members) bound to unique values
- can be iterated over to return its canonical (i.e. non-alias) members in definition order
- uses call syntax to return members by value
- uses index syntax to return members by name

Even though we can use class syntax to create Enums, **Enums are not normal Python classes**

## Module Contents

- `EnumType`

The `type` for Enum and its subclasses

- `IntEnum`

Base class for creating enumerated constants that are also subclasses of `int`

- `StrEnum`

Base class for creating enumerated constants that are also subclasses of `str`

- `auto`

Instances are replaced with an appropriate value for Enum members. `StrEnum` defaults to the lower-cased version of the member name, while other `Enums` default to 1 and increase from there

- `property()`

Allows Enum members to have attributes without conflicting with member names. The `value` and `name` attributes are implemented this way

## Data Types

### `class enum.EnumType`

EnumType is the `metaclass` for enum enumerations

#### `__call__(cls, value, names=None, *, module=None, qualname=None, type=None, start=1, boundary=None)`

This method is called in two different ways

- to look up an existing member
- to use the `cls` enum to create a new enum

#### `__contains__(cls, member)`

#### `__dir__(cls)`

Returns `['__class__', '__doc__', '__members__', '__module__']` and the **names** of the members in `cls`

#### `__getitem__(cls, name)`

Returns the `Enum member` in cls matching name, or raises a `KeyError`

#### `__iter__(cls)`

Returns each member in cls in definition order

### `class enum.Enum`

- name: The name used to define the `Enum` member
- value: The value given to the `Enum` member

