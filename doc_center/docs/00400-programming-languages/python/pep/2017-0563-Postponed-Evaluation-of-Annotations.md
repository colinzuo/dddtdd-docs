# PEP 563 – Postponed Evaluation of Annotations

## Abstract

This PEP proposes changing function annotations and variable annotations so that they are **no longer evaluated at function definition time**. Instead, they are preserved in `__annotations__` in string form
