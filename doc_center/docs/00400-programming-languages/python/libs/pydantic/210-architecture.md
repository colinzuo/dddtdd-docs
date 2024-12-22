# Architecture

Usage of the Pydantic library can be divided into two parts:

- Model definition, done in the `pydantic` package.
- Model validation and serialization, done in the `pydantic-core` package

## Model definition

Whenever a Pydantic `BaseModel` is defined, the **metaclass** will analyze the body of the model to collect a number of elements:

- Defined annotations to build model fields (collected in the `model_fields` attribute).
- Model configuration, set with `model_config`.
- Additional validators/serializers.
- Private attributes, class variables, identification of generic parametrization, etc

### Communicating between `pydantic` and `pydantic-core`: the core schema

Pydantic uses the concept of a **core schema**: a structured (and serializable) Python dictionary (represented using `TypedDict` definitions) describing a specific validation and serialization logic

### Customizing the core schema and JSON schema

```py
from typing import Any

from pydantic_core import CoreSchema
from typing import Annotated

from pydantic import GetCoreSchemaHandler, TypeAdapter


class MyStrict:
    @classmethod
    def __get_pydantic_core_schema__(
        cls, source: Any, handler: GetCoreSchemaHandler
    ) -> CoreSchema:
        schema = handler(source)  
        schema['strict'] = True
        return schema


class MyGt:
    @classmethod
    def __get_pydantic_core_schema__(
        cls, source: Any, handler: GetCoreSchemaHandler
    ) -> CoreSchema:
        schema = handler(source)  
        schema['gt'] = 1
        return schema


ta = TypeAdapter(Annotated[int, MyStrict(), MyGt()])
```

When the `GenerateSchema` class builds the core schema for `Annotated[int, MyStrict(), MyGt()]`, it will create an instance of a `GetCoreSchemaHandler` to be passed to the `MyGt.__get_pydantic_core_schema__` method. 

In the case of our `Annotated` pattern, the `GetCoreSchemaHandler` is defined in a nested way. Calling it will **recursively** call the other `__get_pydantic_core_schema__` methods until it reaches the `int` annotation, where a simple `{'type': 'int'}` schema is returned

The `source` argument depends on the core schema generation pattern. In the case of `Annotated`, the source will be the **type being annotated**. When defining a custom type, the source will be the actual class where `__get_pydantic_core_schema__` is defined
