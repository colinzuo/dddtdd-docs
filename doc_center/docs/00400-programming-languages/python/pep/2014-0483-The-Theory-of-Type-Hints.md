
This PEP lays out the theory referenced by PEP 484

- We start by recalling basic concepts of **type theory**; 
- then we explain **gradual typing**; 
- then we state some **general rules** and define the new **special types** (such as Union) that can be used in annotations; 
- and finally we define the approach to **generic types and pragmatic aspects** of type hinting.

Here we assume that type is a **set of values** and a **set of functions** that one can apply to these values

## Subtype relationships

If first_var has type first_type, and second_var has type second_type, is it safe to assign `first_var = second_var`?

A strong criterion for when it should be safe is:

- every value from second_type is also in the set of values of first_type; and
- every function from first_type is also in the set of functions of second_type.

The relation defined thus is called a subtype relation

## Summary of gradual typing

We define a new relationship, is-consistent-with

The is-consistent-with relationship is defined by three rules:

- A type t1 is consistent with a type t2 if t1 is a subtype of t2. (But not the other way around.)
- Any is consistent with every type. (But Any is not a subtype of every type.)
- Every type is consistent with Any. (But every type is not a subtype of Any.)

Any can be considered a type that has **all values and all methods**. Combined with the definition of subtyping above, this places Any partially at the top (it has all values) and bottom (it has all methods) of the type hierarchy

## Fundamental building blocks

- `Any`
- `Union[t1, t2, …]`
- `Optional[t1]`
- `Tuple[t1, t2, …, tn]`
- `Callable[[t1, t2, …, tn], tr]`

## Generic types

To allow type annotations in situations from the first example, **built-in containers and container abstract base classes are extended with type parameters**, so that they behave as generic type constructors. Classes, that behave as generic type constructors are called generic types

### Defining and using generic types

Users can declare their classes as generic types using the special building block `Generic`

```python
class CustomQueue(Generic[T]):

    def put(self, task: T) -> None:
        ...
    def get(self) -> T:
        ...

def communicate(queue: CustomQueue[str]) -> Optional[str]:
    ...
```    

If a generic type appears in a type annotation with a type variable omitted, it is assumed to be `Any`. Such form could be used as a fallback to dynamic typing and is allowed for use with issubclass and isinstance. All type information in instances is **erased at runtime**. 
