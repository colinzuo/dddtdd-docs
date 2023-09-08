---
title: Slice Objects
---

- `PyTypeObject PySlice_Type`
- `int PySlice_Check(PyObject *ob)`
- `PyObject *PySlice_New(PyObject *start, PyObject *stop, PyObject *step)`
- `int PySlice_GetIndices(PyObject *slice, Py_ssize_t length, Py_ssize_t *start, Py_ssize_t *stop, Py_ssize_t *step)`
- `int PySlice_GetIndicesEx(PyObject *slice, Py_ssize_t length, Py_ssize_t *start, Py_ssize_t *stop, Py_ssize_t *step, Py_ssize_t *slicelength)`
- `int PySlice_Unpack(PyObject *slice, Py_ssize_t *start, Py_ssize_t *stop, Py_ssize_t *step)`
- `Py_ssize_t PySlice_AdjustIndices(Py_ssize_t length, Py_ssize_t *start, Py_ssize_t *stop, Py_ssize_t step)`
- `PyObject *Py_Ellipsis`
