# Models

## Basic model usage

```py
from pydantic import BaseModel


class User(BaseModel):
    id: int
    name: str = 'Jane Doe'
```

```py
user = User(id='123')
```

```py
assert user.model_dump() == {'id': 123, 'name': 'Jane Doe'}
```

Calling `dict` on the instance will also provide a dictionary, but nested fields will not be recursively converted into dictionaries. `model_dump` also provides numerous arguments to customize the serialization result

### Model methods and properties

- `model_validate()`
- `model_validate_json()`
- `model_construct()`
- `model_dump()`
- `model_dump_json()`
- `model_copy()`
- `model_json_schema()`
- `model_fields`
- `model_computed_fields`
- `model_extra`
- `model_fields_set`
- `model_parametrized_name()`
- `model_post_init()`
- `model_rebuild()`

## Arbitrary class instances

Pydantic models can also be created from arbitrary class instances by **reading the instance attributes** corresponding to the model field names. One common application of this functionality is integration with **object-relational mappings (ORMs)**

To do this, set the `from_attributes` config value to True (see the documentation on Configuration for more details)

## Error handling

Pydantic will raise a `ValidationError` exception whenever it finds an error in the data it's validating

## Generic models

- Declare a pydantic model that inherits from `BaseModel` and `typing.Generic` (in this specific order), and add the list of type variables you declared previously as parameters to the `Generic` parent

```py
from typing import Generic, List, Optional, TypeVar

from pydantic import BaseModel, ValidationError

DataT = TypeVar('DataT')  


class DataModel(BaseModel):
    numbers: List[int]
    people: List[str]


class Response(BaseModel, Generic[DataT]):  
    data: Optional[DataT] = None  


print(Response[int](data=1))
#> data=1
print(Response[str](data='value'))
#> data='value'
print(Response[str](data='value').model_dump())
#> {'data': 'value'}

data = DataModel(numbers=[1, 2, 3], people=[])
print(Response[DataModel](data=data).model_dump())
#> {'data': {'numbers': [1, 2, 3], 'people': []}}
```

:::note
Internally, Pydantic creates subclasses of the generic model at runtime when the generic model class is parametrized. These classes are cached, so there should be minimal overhead introduced by the use of generics models.
:::

### Serialization of unparametrized type variables

```py
from pydantic import BaseModel, SerializeAsAny

class SerializeAsAnyError(BaseModel, Generic[ErrorDataT]):
    message: str
    details: SerializeAsAny[ErrorDataT]
```

## RootModel and custom root types

```py
from pydantic import RootModel

Pets = RootModel[list[str]]
PetsByName = RootModel[dict[str, str]]


print(Pets(['dog', 'cat']))
#> root=['dog', 'cat']
print(Pets(['dog', 'cat']).model_dump_json())
#> ["dog","cat"]
print(Pets.model_validate(['dog', 'cat']))
#> root=['dog', 'cat']
```

## Fields with non-hashable default values

Pydantic also supports the use of a `default_factory` for non-hashable default values, but it is not required. In the event that the default value is not hashable, Pydantic will **deepcopy** the default value when creating each instance of the model

## Attribute copies

:::note
There are some situations where Pydantic does not copy attributes, such as when passing models — **we use the model as is**. You can override this behaviour by setting `model_config['revalidate_instances'] = 'always'`.
:::
