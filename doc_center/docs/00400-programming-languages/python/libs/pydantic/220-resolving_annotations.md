# Resolving Annotations

In Python 3.7, PEP 563 introduced the concept of postponed evaluation of annotations, meaning with the `from __future__ import annotations` future statement, type hints are **stringified by default**

## The challenges of runtime evaluation

However, for runtime tools such as Pydantic, it is more challenging to correctly resolve these forward annotations. The Python standard library provides some tools to do so (`typing.get_type_hints()`, `inspect.get_annotations()`), but they come with some limitations. Thus, they are being **re-implemented** in Pydantic with improved support for edge cases.


