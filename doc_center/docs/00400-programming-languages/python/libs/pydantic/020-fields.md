# Fields

## The annotated pattern

```py
from typing_extensions import Annotated

from pydantic import BaseModel, Field, WithJsonSchema


class Model(BaseModel):
    name: Annotated[str, Field(strict=True), WithJsonSchema({'extra': 'data'})]
```

Using this pattern has some advantages

- Using the `f: <type> = Field(...)` form can be confusing and might trick users into thinking f has a default value, while in reality it is still required.
- You can provide an **arbitrary amount of metadata elements** for a field. As shown in the example above, the `Field()` function only supports a limited set of constraints/metadata, and you may have to use different Pydantic utilities such as `WithJsonSchema` in some cases.
- Types can be made **reusable** (see the documentation on custom types using this pattern)

## Field aliases

- `Field(alias='foo')`
- `Field(validation_alias='foo')`
- `Field(serialization_alias='foo')`

```py
from pydantic import BaseModel, Field


class User(BaseModel):
    name: str = Field(alias='username')


user = User(username='johndoe')  
print(user)
#> name='johndoe'
print(user.model_dump(by_alias=True))  
#> {'username': 'johndoe'}
```


