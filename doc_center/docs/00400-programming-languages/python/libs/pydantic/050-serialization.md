# Serialization

## `model.model_dump(...)`

This is the primary way of converting a model to a dictionary. Sub-models will be **recursively converted to dictionaries**

## `model.model_dump_json(...)`

The `.model_dump_json()` method serializes a model directly to a **JSON-encoded string** that is equivalent to the result produced by `.model_dump()`

## Custom serializers

```py
class WithCustomEncoders(BaseModel):
    model_config = ConfigDict(ser_json_timedelta='iso8601')

    dt: datetime
    diff: timedelta

    @field_serializer('dt')
    def serialize_dt(self, dt: datetime, _info):
        return dt.timestamp()
```

In addition, `PlainSerializer` and `WrapSerializer` enable you to use a function to modify the output of serialization.

Both serializers accept optional arguments including:

- `return_type` specifies the return type for the function. If omitted it will be inferred from the type annotation.
- `when_used` specifies when this serializer should be used. Accepts a string with values `'always'`, `'unless-none'`, `'json'`, and `'json-unless-none'`. Defaults to `'always'`.

```py
from pydantic.functional_serializers import PlainSerializer

FancyInt = Annotated[
    int, PlainSerializer(lambda x: f'{x:,}', return_type=str, when_used='json')
]
```

```py
def ser_wrap(v: Any, nxt: SerializerFunctionWrapHandler) -> str:
    return f'{nxt(v + 1):,}'


FancyInt = Annotated[int, WrapSerializer(ser_wrap, when_used='json')]
```

## Serializing subclasses

### Subclasses of standard types

Subclasses of standard types are **automatically dumped like their super-classes**

### Serializing with duck-typing 

If you want v1-style duck-typing serialization behavior, you can use a runtime setting, or annotate individual types.

- Field / type level: use the `SerializeAsAny` annotation
- Runtime level: use the `serialize_as_any` flag when calling `model_dump()` or `model_dump_json()`

## `model_copy(...)`

`model_copy()` allows models to be duplicated (with **optional updates**)

```py
m = FooBarModel(banana=3.14, foo='hello', bar={'whatever': 123})

print(m.model_copy(update={'banana': 0}))
#> banana=0 foo='hello' bar=BarModel(whatever=123)
print(id(m.bar) == id(m.model_copy().bar))
#> True
# normal copy gives the same object reference for bar
print(id(m.bar) == id(m.model_copy(deep=True).bar))
#> False
# deep copy gives a new object reference for `bar`
```
