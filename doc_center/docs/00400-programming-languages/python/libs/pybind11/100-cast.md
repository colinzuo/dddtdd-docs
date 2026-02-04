
## Type conversions

- Use a **native C++ type on the C++ side and a native Python type on the Python side**. pybind11 refers to this as a **type conversion**

## Overview

### Native type in C++, wrapper in Python

Exposing a custom C++ type using `py::class_` was covered in detail in the Object-oriented code section

### Wrapper in C++, native type in Python

```cpp
void print_list(py::list my_list) {
    for (auto item : my_list)
        std::cout << item << " ";
}
```

### Converting between native C++ and Python types

```cpp
void print_vector(const std::vector<int> &v) {
    for (auto item : v)
        std::cout << item << "\n";
}
```

### List of all builtin conversions

- `float, double`
- `std::string`
- `std::pair<T1, T2>`
- `std::tuple<...>`
- `std::vector<T>`
- `std::list<T>`
- `std::map<T1, T2>`
- `std::unordered_map<T1, T2>`

## Strings, bytes and Unicode conversions

### Passing Python strings to C++

When a Python str is passed from Python to a C++ function that accepts `std::string` or `char *` as arguments, pybind11 will encode the Python string to UTF-8. All Python str can be encoded in UTF-8

### Returning C++ strings to Python

When a C++ function returns a `std::string` or `char*` to a Python caller, pybind11 will assume that the string is valid UTF-8 and will decode it to a native Python str, using the same API as Python uses to perform `bytes.decode('utf-8')`

```cpp
m.def("std_string_return",
    []() {
        return std::string("This string needs to be UTF-8 encoded");
    }
);
```

### Explicit conversions

```cpp
// This uses the Python C API to convert Latin-1 to Unicode
m.def("str_output",
    []() {
        std::string s = "Send your r\xe9sum\xe9 to Alice in HR"; // Latin-1
        py::handle py_s = PyUnicode_DecodeLatin1(s.data(), s.length(), nullptr);
        if (!py_s) {
            throw py::error_already_set();
        }
        return py::reinterpret_steal<py::str>(py_s);
    }
);
```

### Return C++ strings without conversion

```cpp
m.def("return_bytes",
    []() {
        std::string s("\xba\xd0\xba\xd0");  // Not valid UTF-8
        return py::bytes(s);  // Return the data without transcoding
    }
);
```

## STL containers

### Automatic conversion

When including the additional header file `pybind11/stl.h`, conversions between `std::vector<>/std::deque<>/std::list<>/std::array<>/std::valarray<>, std::set<>/std::unordered_set<>, and std::map<>/std::unordered_map<>` and the `Python list, set and dict` data structures are automatically enabled. The types `std::pair<> and std::tuple<>` are already supported out of the box with just the core `pybind11/pybind11.h` header

### Making opaque types

pybind11 provides a macro named `PYBIND11_MAKE_OPAQUE(T)` that disables the template-based conversion machinery of types, thus rendering them opaque. The contents of opaque objects are never inspected or extracted, hence they can be passed by reference

Opaque types must also have a corresponding `py::class_` declaration to associate them with a name in Python, and to define a set of available operations, e.g.

```cpp
py::class_<std::vector<int>>(m, "IntVector")
    .def(py::init<>())
    .def("clear", &std::vector<int>::clear)
    .def("pop_back", &std::vector<int>::pop_back)
    .def("__len__", [](const std::vector<int> &v) { return v.size(); })
    .def("__iter__", [](std::vector<int> &v) {
       return py::make_iterator(v.begin(), v.end());
    }, py::keep_alive<0, 1>()) /* Keep vector alive while iterator is used */
    // ....
```

## Functional

```cpp
int func_arg(const std::function<int(int)> &f) {
    return f(10);
}

std::function<int(int)> func_ret(const std::function<int(int)> &f) {
    return [f](int i) {
        return f(i) + 1;
    };
}

py::cpp_function func_cpp() {
    return py::cpp_function([](int i) { return i+1; },
       py::arg("number"));
}
```

## Custom type casters

```cpp
namespace pybind11 {
namespace detail {

template <>
struct type_caster<user_space::Point2D> {
    // This macro inserts a lot of boilerplate code and sets the type hint.
    // `io_name` is used to specify different type hints for arguments and return values.
    // The signature of our negate function would then look like:
    // `negate(Sequence[float]) -> tuple[float, float]`
    PYBIND11_TYPE_CASTER(user_space::Point2D, io_name("Sequence[float]", "tuple[float, float]"));

    // C++ -> Python: convert `Point2D` to `tuple[float, float]`. The second and third arguments
    // are used to indicate the return value policy and parent object (for
    // return_value_policy::reference_internal) and are often ignored by custom casters.
    // The return value should reflect the type hint specified by the second argument of `io_name`.
    static handle
    cast(const user_space::Point2D &number, return_value_policy /*policy*/, handle /*parent*/) {
        return py::make_tuple(number.x, number.y).release();
    }

    // Python -> C++: convert a `PyObject` into a `Point2D` and return false upon failure. The
    // second argument indicates whether implicit conversions should be allowed.
    // The accepted types should reflect the type hint specified by the first argument of
    // `io_name`.
    bool load(handle src, bool /*convert*/) {
        // Check if handle is a Sequence
        if (!py::isinstance<py::sequence>(src)) {
            return false;
        }
        auto seq = py::reinterpret_borrow<py::sequence>(src);
        // Check if exactly two values are in the Sequence
        if (seq.size() != 2) {
            return false;
        }
        // Check if each element is either a float or an int
        for (auto item : seq) {
            if (!py::isinstance<py::float_>(item) && !py::isinstance<py::int_>(item)) {
                return false;
            }
        }
        value.x = seq[0].cast<double>();
        value.y = seq[1].cast<double>();
        return true;
    }
};

} // namespace detail
} // namespace pybind11

// Bind the negate function
PYBIND11_MODULE(docs_advanced_cast_custom, m) { m.def("negate", user_space::negate); }
```
