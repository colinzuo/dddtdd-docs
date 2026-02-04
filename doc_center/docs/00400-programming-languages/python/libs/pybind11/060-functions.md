
## Return value policies

**Just by looking at the type information, it is not clear whether Python should take charge of the returned value and eventually free its resources, or if this is handled on the C++ side**. For this reason, pybind11 provides several return value policy annotations that can be passed to the `module_::def()` and `class_::def()` functions. The default policy is `return_value_policy::automatic`

- `return_value_policy::take_ownership`
- `return_value_policy::reference`
- `return_value_policy::reference_internal`
- `return_value_policy::automatic`

**As an alternative to elaborate call policies and lifetime management logic, consider using smart pointers** (see the section on Custom smart pointers for details). Smart pointers can tell whether an object is still referenced from C++ or Python, which generally eliminates the kinds of inconsistencies that can lead to crashes or undefined behavior. For functions returning smart pointers, it is not necessary to specify a return value policy.

## Keep alive

`keep_alive<Nurse, Patient>` indicates that the argument with index `Patient` should be kept alive at least until the argument with index `Nurse` is freed by the garbage collector. Argument indices start at `one`, while `zero` refers to the return value. For methods, index 1 refers to the implicit this pointer, while regular arguments begin at index 2

```cpp
py::class_<List>(m, "List")
    .def("append", &List::append, py::keep_alive<1, 2>());

py::class_<Nurse>(m, "Nurse")
    .def(py::init<Patient &>(), py::keep_alive<1, 2>());    
```

## Call guard

```cpp
m.def("foo", foo, py::call_guard<T>());

m.def("foo", [](args...) {
    T scope_guard;
    return foo(args...); // forwarded arguments
});
```

## Python objects as arguments

```cpp
void print_dict(const py::dict& dict) {
    /* Easily interact with Python types */
    for (auto item : dict)
        std::cout << "key=" << std::string(py::str(item.first)) << ", "
                  << "value=" << std::string(py::str(item.second)) << std::endl;
}
```

## Accepting `*args` and `**kwargs`

```cpp
void generic(py::args args, const py::kwargs& kwargs) {
    /// .. do something with args
    if (kwargs)
        /// .. do something with kwargs
}

/// Binding code
m.def("generic", &generic);
```

## Keyword-only arguments

```cpp
m.def("f", [](int a, int b) { /* ... */ },
      py::arg("a"), py::kw_only(), py::arg("b"));
```

## Positional-only arguments

```cpp
m.def("f", [](int a, int b) { /* ... */ },
       py::arg("a"), py::pos_only(), py::arg("b"));
```

## Non-converting arguments

```cpp
m.def("floats_only", [](double f) { return 0.5 * f; }, py::arg("f").noconvert());
m.def("floats_preferred", [](double f) { return 0.5 * f; }, py::arg("f"));
```


