
## Header and namespace conventions

For brevity, all code examples assume that the following two lines are present:

```cpp
#include <pybind11/pybind11.h>

namespace py = pybind11;
```

## Creating bindings for a simple function

```cpp
#include <pybind11/pybind11.h>

int add(int i, int j) {
    return i + j;
}

PYBIND11_MODULE(example, m) {
    m.doc() = "pybind11 example plugin"; // optional module docstring

    m.def("add", &add, "A function that adds two numbers");
}
```

The `PYBIND11_MODULE()` macro creates a function that will be called when an `import` statement is issued from within Python

```bash
c++ -O3 -Wall -shared -std=c++11 -fPIC $(python3 -m pybind11 --includes) example.cpp -o example$(python3 -m pybind11 --extension-suffi-x)
```

## Keyword arguments

```cpp
// regular notation
m.def("add1", &add, py::arg("i"), py::arg("j"));

// shorthand
using namespace pybind11::literals;
m.def("add2", &add, "i"_a, "j"_a);
```

`arg` is one of several special `tag classes` which can be used to pass metadata into `module_::def()`

## Default arguments

```cpp
m.def("add", &add, "A function which adds two numbers",
    py::arg("i") = 1, py::arg("j") = 2);
```

## Exporting variables

```cpp
PYBIND11_MODULE(example, m) {
    m.attr("the_answer") = 42;

    py::object world = py::cast("World");

    m.attr("what") = world;
}
```


