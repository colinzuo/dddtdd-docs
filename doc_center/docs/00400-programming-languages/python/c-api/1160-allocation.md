---
title: Allocating Objects on the Heap
---

- `PyObject *_PyObject_New(PyTypeObject *type)`
- `PyVarObject *_PyObject_NewVar(PyTypeObject *type, Py_ssize_t size)`
- `PyObject *PyObject_Init(PyObject *op, PyTypeObject *type)`
- `PyVarObject *PyObject_InitVar(PyVarObject *op, PyTypeObject *type, Py_ssize_t size)`
- `PyObject_New(TYPE, typeobj)`
- `PyObject_NewVar(TYPE, typeobj, size)`: The allocated memory allows for the TYPE structure plus size (Py_ssize_t) fields of the size given by the tp_itemsize field of typeobj. This is useful for implementing objects like tuples, which are able to determine their size at construction time. Embedding the array of fields into the same allocation decreases the number of allocations, improving the memory management efficiency
- `void PyObject_Del(void *op)`
- `PyObject _Py_NoneStruct`
