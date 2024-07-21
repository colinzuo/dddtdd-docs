---
title: Sequence Protocol
---

- `int PySequence_Check(PyObject *o)`
- `Py_ssize_t PySequence_Size(PyObject *o)`
- `Py_ssize_t PySequence_Length(PyObject *o)`
- `PyObject *PySequence_Concat(PyObject *o1, PyObject *o2)`
- `PyObject *PySequence_Repeat(PyObject *o, Py_ssize_t count)`
- `PyObject *PySequence_InPlaceConcat(PyObject *o1, PyObject *o2)`
- `PyObject *PySequence_GetItem(PyObject *o, Py_ssize_t i)`
- `PyObject *PySequence_GetSlice(PyObject *o, Py_ssize_t i1, Py_ssize_t i2)`
- `int PySequence_SetItem(PyObject *o, Py_ssize_t i, PyObject *v)`
- `int PySequence_DelItem(PyObject *o, Py_ssize_t i)`
- `int PySequence_SetSlice(PyObject *o, Py_ssize_t i1, Py_ssize_t i2, PyObject *v)`
- `int PySequence_DelSlice(PyObject *o, Py_ssize_t i1, Py_ssize_t i2)`
- `Py_ssize_t PySequence_Count(PyObject *o, PyObject *value)`
- `int PySequence_Contains(PyObject *o, PyObject *value)`
- `Py_ssize_t PySequence_Index(PyObject *o, PyObject *value)`
- `PyObject *PySequence_List(PyObject *o)`
- `PyObject *PySequence_Tuple(PyObject *o)`
- `PyObject *PySequence_Fast(PyObject *o, const char *m)`
- `Py_ssize_t PySequence_Fast_GET_SIZE(PyObject *o)`
- `PyObject *PySequence_Fast_GET_ITEM(PyObject *o, Py_ssize_t i)`
- `PyObject **PySequence_Fast_ITEMS(PyObject *o)`
- `PyObject *PySequence_ITEM(PyObject *o, Py_ssize_t i)`