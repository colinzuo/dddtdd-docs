# pydantic_core.core_schema

## WhenUsed

```py
WhenUsed = Literal[
    "always", "unless-none", "json", "json-unless-none"
]
```

## SerializationInfo

- `context: Any | None`

## ValidationInfo

- `context: Any | None`
- `config: CoreConfig | None`
- `mode: Literal['python', 'json']`
- `data: Dict[str, Any]`
- `field_name: str | None`

## datetime_schema

```py
datetime_schema(
    *,
    strict: bool | None = None,
    le: datetime | None = None,
    ge: datetime | None = None,
    lt: datetime | None = None,
    gt: datetime | None = None,
    now_op: Literal["past", "future"] | None = None,
    tz_constraint: (
        Literal["aware", "naive"] | int | None
    ) = None,
    now_utc_offset: int | None = None,
    microseconds_precision: Literal[
        "truncate", "error"
    ] = "truncate",
    ref: str | None = None,
    metadata: Dict[str, Any] | None = None,
    serialization: SerSchema | None = None
) -> DatetimeSchema
```

## list_schema

```py
list_schema(
    items_schema: CoreSchema | None = None,
    *,
    min_length: int | None = None,
    max_length: int | None = None,
    fail_fast: bool | None = None,
    strict: bool | None = None,
    ref: str | None = None,
    metadata: Dict[str, Any] | None = None,
    serialization: IncExSeqOrElseSerSchema | None = None
) -> ListSchema
```

```py
from pydantic_core import SchemaValidator, core_schema

schema = core_schema.list_schema(core_schema.int_schema(), min_length=0, max_length=10)
v = SchemaValidator(schema)
assert v.validate_python(['4']) == [4]
```

## no_info_before_validator_function

```py
no_info_before_validator_function(
    function: NoInfoValidatorFunction,
    schema: CoreSchema,
    *,
    ref: str | None = None,
    json_schema_input_schema: CoreSchema | None = None,
    metadata: Dict[str, Any] | None = None,
    serialization: SerSchema | None = None
) -> BeforeValidatorFunctionSchema
```

Returns a schema that calls a validator function before validating, no info argument is provided

```py
from pydantic_core import SchemaValidator, core_schema

def fn(v: bytes) -> str:
    return v.decode() + 'world'

func_schema = core_schema.no_info_before_validator_function(
    function=fn, schema=core_schema.str_schema()
)
schema = core_schema.typed_dict_schema({'a': core_schema.typed_dict_field(func_schema)})

v = SchemaValidator(schema)
assert v.validate_python({'a': b'hello '}) == {'a': 'hello world'}
```

## with_info_before_validator_function

```py
with_info_before_validator_function(
    function: WithInfoValidatorFunction,
    schema: CoreSchema,
    *,
    field_name: str | None = None,
    ref: str | None = None,
    json_schema_input_schema: CoreSchema | None = None,
    metadata: Dict[str, Any] | None = None,
    serialization: SerSchema | None = None
) -> BeforeValidatorFunctionSchema
```

## no_info_after_validator_function

```py
no_info_after_validator_function(
    function: NoInfoValidatorFunction,
    schema: CoreSchema,
    *,
    ref: str | None = None,
    json_schema_input_schema: CoreSchema | None = None,
    metadata: Dict[str, Any] | None = None,
    serialization: SerSchema | None = None
) -> AfterValidatorFunctionSchema
```

Returns a schema that calls a validator function after validating, no info argument is provided

```py
from pydantic_core import SchemaValidator, core_schema

def fn(v: str) -> str:
    return v + 'world'

func_schema = core_schema.no_info_after_validator_function(fn, core_schema.str_schema())
schema = core_schema.typed_dict_schema({'a': core_schema.typed_dict_field(func_schema)})

v = SchemaValidator(schema)
assert v.validate_python({'a': b'hello '}) == {'a': 'hello world'}
```

## no_info_wrap_validator_function

```py
no_info_wrap_validator_function(
    function: NoInfoWrapValidatorFunction,
    schema: CoreSchema,
    *,
    ref: str | None = None,
    json_schema_input_schema: CoreSchema | None = None,
    metadata: Dict[str, Any] | None = None,
    serialization: SerSchema | None = None
) -> WrapValidatorFunctionSchema
```

Returns a schema which calls a function with a `validator` callable argument which can optionally be used to call inner validation with the function logic, this is much like the "onion" implementation of middleware in many popular web frameworks, no info argument is passed

```py
from pydantic_core import SchemaValidator, core_schema

def fn(
    v: str,
    validator: core_schema.ValidatorFunctionWrapHandler,
) -> str:
    return validator(input_value=v) + 'world'

schema = core_schema.no_info_wrap_validator_function(
    function=fn, schema=core_schema.str_schema()
)
v = SchemaValidator(schema)
assert v.validate_python('hello ') == 'hello world'
```

## no_info_plain_validator_function

```py
no_info_plain_validator_function(
    function: NoInfoValidatorFunction,
    *,
    ref: str | None = None,
    json_schema_input_schema: CoreSchema | None = None,
    metadata: Dict[str, Any] | None = None,
    serialization: SerSchema | None = None
) -> PlainValidatorFunctionSchema
```

Returns a schema that uses the provided function for validation, no info argument is passed

## union_schema

```py
union_schema(
    choices: list[CoreSchema | tuple[CoreSchema, str]],
    *,
    auto_collapse: bool | None = None,
    custom_error_type: str | None = None,
    custom_error_message: str | None = None,
    custom_error_context: (
        dict[str, str | int] | None
    ) = None,
    mode: Literal["smart", "left_to_right"] | None = None,
    strict: bool | None = None,
    ref: str | None = None,
    metadata: Dict[str, Any] | None = None,
    serialization: SerSchema | None = None
) -> UnionSchema
```

## chain_schema

```py
chain_schema(
    steps: list[CoreSchema],
    *,
    ref: str | None = None,
    metadata: Dict[str, Any] | None = None,
    serialization: SerSchema | None = None
) -> ChainSchema
```

## json_or_python_schema 

```py
json_or_python_schema(
    json_schema: CoreSchema,
    python_schema: CoreSchema,
    *,
    ref: str | None = None,
    metadata: Dict[str, Any] | None = None,
    serialization: SerSchema | None = None
) -> JsonOrPythonSchema
```

## model_field 

```py
model_field(
    schema: CoreSchema,
    *,
    validation_alias: (
        str | list[str | int] | list[list[str | int]] | None
    ) = None,
    serialization_alias: str | None = None,
    serialization_exclude: bool | None = None,
    frozen: bool | None = None,
    metadata: Dict[str, Any] | None = None
) -> ModelField
```

## model_fields_schema 

```py
model_fields_schema(
    fields: Dict[str, ModelField],
    *,
    model_name: str | None = None,
    computed_fields: list[ComputedField] | None = None,
    strict: bool | None = None,
    extras_schema: CoreSchema | None = None,
    extra_behavior: ExtraBehavior | None = None,
    populate_by_name: bool | None = None,
    from_attributes: bool | None = None,
    ref: str | None = None,
    metadata: Dict[str, Any] | None = None,
    serialization: SerSchema | None = None
) -> ModelFieldsSchema
```

## model_schema 

```py
model_schema(
    cls: Type[Any],
    schema: CoreSchema,
    *,
    generic_origin: Type[Any] | None = None,
    custom_init: bool | None = None,
    root_model: bool | None = None,
    post_init: str | None = None,
    revalidate_instances: (
        Literal["always", "never", "subclass-instances"]
        | None
    ) = None,
    strict: bool | None = None,
    frozen: bool | None = None,
    extra_behavior: ExtraBehavior | None = None,
    config: CoreConfig | None = None,
    ref: str | None = None,
    metadata: Dict[str, Any] | None = None,
    serialization: SerSchema | None = None
) -> ModelSchema
```

```py
from pydantic_core import CoreConfig, SchemaValidator, core_schema

class MyModel:
    __slots__ = (
        '__dict__',
        '__pydantic_fields_set__',
        '__pydantic_extra__',
        '__pydantic_private__',
    )

schema = core_schema.model_schema(
    cls=MyModel,
    config=CoreConfig(str_max_length=5),
    schema=core_schema.model_fields_schema(
        fields={'a': core_schema.model_field(core_schema.str_schema())},
    ),
)
v = SchemaValidator(schema)
assert v.isinstance_python({'a': 'hello'}) is True
assert v.isinstance_python({'a': 'too long'}) is False
```


