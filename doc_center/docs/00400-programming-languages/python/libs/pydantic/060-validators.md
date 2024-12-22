# Validators

## Field validators

### After validators

```py
def is_even(value: int) -> int:
    if value % 2 == 1:
        raise ValueError(f'{value} is not an even number')
    return value  


class Model(BaseModel):
    number: Annotated[int, AfterValidator(is_even)]
```

```py
class Model(BaseModel):
    number: int

    @field_validator('number', mode='after')  
    @classmethod
    def is_even(cls, value: int) -> int:
        if value % 2 == 1:
            raise ValueError(f'{value} is not an even number')
        return value  
```

### Before validators

```py
def ensure_list(value: Any) -> Any:  
    if not isinstance(value, list):  
        return [value]
    else:
        return value


class Model(BaseModel):
    numbers: Annotated[List[int], BeforeValidator(ensure_list)]
```

```py
class Model(BaseModel):
    numbers: List[int]

    @field_validator('numbers', mode='before')
    @classmethod
    def ensure_list(cls, value: Any) -> Any:  
        if not isinstance(value, list):  
            return [value]
        else:
            return value
```

### Plain validators

act similarly to before validators but they **terminate validation immediately** after returning, so no further validators are called and Pydantic does not do any of its internal validation against the field type

```py
def val_number(value: Any) -> Any:
    if isinstance(value, int):
        return value * 2
    else:
        return value


class Model(BaseModel):
    number: Annotated[int, PlainValidator(val_number)]
```

```py
class Model(BaseModel):
    number: int

    @field_validator('number', mode='plain')
    @classmethod
    def val_number(cls, value: Any) -> Any:
        if isinstance(value, int):
            return value * 2
        else:
            return value
```

### Wrap validators

```py
from pydantic import BaseModel, Field, ValidationError, ValidatorFunctionWrapHandler, WrapValidator


def truncate(value: Any, handler: ValidatorFunctionWrapHandler) -> str:
    try:
        return handler(value)
    except ValidationError as err:
        if err.errors()[0]['type'] == 'string_too_long':
            return handler(value[:5])
        else:
            raise


class Model(BaseModel):
    my_string: Annotated[str, Field(max_length=5), WrapValidator(truncate)]
```

```py
from pydantic import BaseModel, Field, ValidationError, ValidatorFunctionWrapHandler, field_validator


class Model(BaseModel):
    my_string: Annotated[str, Field(max_length=5)]

    @field_validator('my_string', mode='wrap')
    @classmethod
    def truncate(cls, value: Any, handler: ValidatorFunctionWrapHandler) -> str:
        try:
            return handler(value)
        except ValidationError as err:
            if err.errors()[0]['type'] == 'string_too_long':
                return handler(value[:5])
            else:
                raise
```

## Model validators

### After validators

```py
class UserModel(BaseModel):
    username: str
    password: str
    password_repeat: str

    @model_validator(mode='after')
    def check_passwords_match(self) -> Self:
        if self.password != self.password_repeat:
            raise ValueError('Passwords do not match')
        return self
```

## Validation info

Both the field and model validators callables (in all modes) can optionally take an extra `ValidationInfo` argument, providing useful extra information, such as:

- already validated data
- user defined context
- the current validation mode: either `'python'` or `'json'` (see the mode property)
- the current field name (see the `field_name` property).


