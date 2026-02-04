# Python C++ interface

## Python types

Available types include `handle, object, bool_, int_, float_, str, bytes, tuple, list, dict, slice, none, capsule, iterable, iterator, function, buffer, array, and array_t`

## Instantiating compound Python types from C++

```cpp
using namespace pybind11::literals; // to bring in the `_a` literal
py::dict d("spam"_a=py::none(), "eggs"_a=42);
```

```cpp
py::tuple tup = py::make_tuple(42, py::none(), "spam");
```

## Casting back and forth

```cpp
MyClass *cls = ...;
py::object obj = py::cast(cls);
```

```cpp
py::object obj = ...;
MyClass *cls = obj.cast<MyClass *>();
```

## NumPy

### Arrays

In many situations, we want to define a function which only accepts a NumPy array of a certain data type. This is possible via the `py::array_t<T>` template

### Structured types

```cpp
#include <pybind11/pybind11.h>
#include <pybind11/numpy.h>

namespace py = pybind11;

struct Person {
    std::string name;
    int age;
    float height;
};

PYBIND11_MODULE(example, m) {
    PYBIND11_NUMPY_DTYPE(Person, name, age, height);
    
    // 其他绑定代码...
}
```

```py
import numpy as np
import example

# 创建一个 Person 类型的 dtype 对象
person_dtype = example.Person.dtype

# 打印 dtype 信息
print(person_dtype)
# 输出类似：[('name', '<U16'), ('age', '<i4'), ('height', '<f4')]

# 使用这个 dtype 创建 NumPy 数组
arr = np.array([("Alice", 30, 1.65), ("Bob", 25, 1.80)], dtype=person_dtype)
```

```cpp
void process_people(py::array_t<Person> people) {
    auto buf = people.request();
    Person* ptr = static_cast<Person*>(buf.ptr);
    
    for (size_t i = 0; i < buf.size; i++) {
        std::cout << "Name: " << ptr[i].name 
                  << ", Age: " << ptr[i].age << std::endl;
    }
}
```

### Vectorizing functions

```cpp
double my_func(int x, float y, double z);

m.def("vectorized_func", py::vectorize(my_func));
```

```py
x = np.array([[1, 3], [5, 7]])
y = np.array([[2, 4], [6, 8]])
z = 3
result = vectorized_func(x, y, z)
```

### Numpy buffer

```cpp
#include <pybind11/pybind11.h>
#include <pybind11/numpy.h>

namespace py = pybind11;

py::array_t<double> add_arrays(py::array_t<double> input1, py::array_t<double> input2) {
    py::buffer_info buf1 = input1.request(), buf2 = input2.request();

    if (buf1.ndim != 1 || buf2.ndim != 1)
        throw std::runtime_error("Number of dimensions must be one");

    if (buf1.size != buf2.size)
        throw std::runtime_error("Input shapes must match");

    /* No pointer is passed, so NumPy will allocate the buffer */
    auto result = py::array_t<double>(buf1.size);

    py::buffer_info buf3 = result.request();

    double *ptr1 = static_cast<double *>(buf1.ptr);
    double *ptr2 = static_cast<double *>(buf2.ptr);
    double *ptr3 = static_cast<double *>(buf3.ptr);

    for (size_t idx = 0; idx < buf1.shape[0]; idx++)
        ptr3[idx] = ptr1[idx] + ptr2[idx];

    return result;
}

PYBIND11_MODULE(test, m) {
    m.def("add_arrays", &add_arrays, "Add two NumPy arrays");
}
```


