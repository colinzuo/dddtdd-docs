---
title: Byte Array Objects
---

- `type PyByteArrayObject`
- `PyTypeObject PyByteArray_Type`

## Type check macros

- `int PyByteArray_Check(PyObject *o)`
- `int PyByteArray_CheckExact(PyObject *o)`

## Direct API functions

- `PyObject *PyByteArray_FromObject(PyObject *o)`
- `PyObject *PyByteArray_FromStringAndSize(const char *string, Py_ssize_t len)`
- `PyObject *PyByteArray_Concat(PyObject *a, PyObject *b)`
- `Py_ssize_t PyByteArray_Size(PyObject *bytearray)`
- `char *PyByteArray_AsString(PyObject *bytearray)`
- `int PyByteArray_Resize(PyObject *bytearray, Py_ssize_t len)`

## Macros

- `char *PyByteArray_AS_STRING(PyObject *bytearray)`
- `Py_ssize_t PyByteArray_GET_SIZE(PyObject *bytearray)`
