---
title: Instance Method Objects
---

- `PyTypeObject PyInstanceMethod_Type`
- `int PyInstanceMethod_Check(PyObject *o)`
- `PyObject *PyInstanceMethod_New(PyObject *func)`
- `PyObject *PyInstanceMethod_Function(PyObject *im)`
- `PyObject *PyInstanceMethod_GET_FUNCTION(PyObject *im)`

## Method Objects

- `PyTypeObject PyMethod_Type`
- `int PyMethod_Check(PyObject *o)`
- `PyObject *PyMethod_New(PyObject *func, PyObject *self)`
- `PyObject *PyMethod_Function(PyObject *meth)`
- `PyObject *PyMethod_GET_FUNCTION(PyObject *meth)`
- `PyObject *PyMethod_Self(PyObject *meth)`
- `PyObject *PyMethod_GET_SELF(PyObject *meth)`
