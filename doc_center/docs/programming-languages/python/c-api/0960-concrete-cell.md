---
title: Cell Objects
---

“Cell” objects are used to implement variables referenced by multiple scopes

- `type PyCellObject`
- `PyTypeObject PyCell_Type`
- `int PyCell_Check(PyObject *ob)`
- `PyObject *PyCell_New(PyObject *ob)`
- `PyObject *PyCell_Get(PyObject *cell)`
- `PyObject *PyCell_GET(PyObject *cell)`
- `int PyCell_Set(PyObject *cell, PyObject *value)`
- `void PyCell_SET(PyObject *cell, PyObject *value)`
