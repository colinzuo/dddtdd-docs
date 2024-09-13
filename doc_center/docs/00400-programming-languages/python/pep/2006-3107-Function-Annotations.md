
This PEP introduces a syntax for adding arbitrary metadata annotations to Python functions

## Parameters

```python
def foo(a: expression, b: expression = 5):
    ...
```

All annotation expressions are evaluated when the function definition is executed, just like default values

```python
def foo(*args: expression, **kwargs: expression):
    ...
```

## Return Values

```python
def sum() -> expression:
    ...
```    

## Accessing Function Annotations

Once compiled, a function’s annotations are available via the function’s `__annotations__` attribute. This attribute is a mutable dictionary, mapping parameter names to an object representing the evaluated annotation expression
