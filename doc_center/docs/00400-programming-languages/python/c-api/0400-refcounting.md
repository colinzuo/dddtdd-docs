---
title: Reference Counting
---

[https://docs.python.org/3.11/c-api/refcounting.html](https://docs.python.org/3.11/c-api/refcounting.html)

- `void Py_INCREF(PyObject *o)`
- `void Py_XINCREF(PyObject *o)`
- `PyObject *Py_NewRef(PyObject *o)`
- `PyObject *Py_XNewRef(PyObject *o)`
- `void Py_DECREF(PyObject *o)`
- `void Py_XDECREF(PyObject *o)`
- `void Py_CLEAR(PyObject *o)`
- `void Py_IncRef(PyObject *o)`
- `void Py_DecRef(PyObject *o)`
