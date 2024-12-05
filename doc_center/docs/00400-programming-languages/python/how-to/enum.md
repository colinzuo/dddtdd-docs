
[https://docs.python.org/3/howto/enum.html](https://docs.python.org/3/howto/enum.html)

Depending on the nature of the enum a member’s value may or may not be important, but either way that value can be used to get the corresponding member

```py
Weekday(3)
<Weekday.WEDNESDAY: 3>
```

As you can see, the `repr()` of a member shows the enum name, the member name, and the value. The `str()` of a member shows only the enum name and member name

```py
print(Weekday.THURSDAY)
Weekday.THURSDAY
```

## Programmatic access to enumeration members and their attributes

```py
Color(1)
<Color.RED: 1>

Color(3)
<Color.BLUE: 3>
```

```py
Color['RED']
<Color.RED: 1>
Color['GREEN']
<Color.GREEN: 2>
```

## Iteration

Iterating over the members of an enum does **not provide the aliases**

```py
list(Shape)
[<Shape.SQUARE: 2>, <Shape.DIAMOND: 1>, <Shape.CIRCLE: 3>]
```

The special attribute `__members__` is a read-only ordered mapping of names to members. It includes all names defined in the enumeration, **including the aliases**

```py
for name, member in Shape.__members__.items():
    name, member

('SQUARE', <Shape.SQUARE: 2>)
('DIAMOND', <Shape.DIAMOND: 1>)
('CIRCLE', <Shape.CIRCLE: 3>)
('ALIAS_FOR_SQUARE', <Shape.SQUARE: 2>)
```

## How are Enums and Flags different?

### Enum Members (aka instances)

The most interesting thing about enum members is that they are singletons. EnumType creates them all while it is creating the enum class itself, and then puts a custom `__new__()` in place to ensure that no new ones are ever instantiated by returning only the existing member instances
