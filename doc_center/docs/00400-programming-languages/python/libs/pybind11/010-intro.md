
## intro 

pybind11 is a lightweight header-only library that exposes C++ types in Python and vice versa, mainly to create Python bindings of existing C++ code

Without comments, the core header files only require ~4K lines of code and depend on Python (CPython 3.8+, PyPy, or GraalPy) and the C++ standard library

This compact implementation was possible thanks to some C++11 language features (specifically: tuples, lambda functions and variadic templates)

### Core features

- Functions accepting and returning custom data structures per value, reference, or pointer
- Instance methods and static methods
- Overloaded functions
- Instance attributes and static attributes
- Enumerations
- STL data structures
- Integrated NumPy support (NumPy 2 requires pybind11 2.12+)

