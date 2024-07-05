---
title: Tuple Objects
---

## Tuple Objects

- `type PyTupleObject`
- `PyTypeObject PyTuple_Type`
- `int PyTuple_Check(PyObject *p)`
- `int PyTuple_CheckExact(PyObject *p)`
- `PyObject *PyTuple_New(Py_ssize_t len)`
- `PyObject *PyTuple_Pack(Py_ssize_t n, ...)`
- `Py_ssize_t PyTuple_Size(PyObject *p)`
- `Py_ssize_t PyTuple_GET_SIZE(PyObject *p)`
- `PyObject *PyTuple_GetItem(PyObject *p, Py_ssize_t pos)`
- `PyObject *PyTuple_GET_ITEM(PyObject *p, Py_ssize_t pos)`
- `PyObject *PyTuple_GetSlice(PyObject *p, Py_ssize_t low, Py_ssize_t high)`
- `int PyTuple_SetItem(PyObject *p, Py_ssize_t pos, PyObject *o)`
- `void PyTuple_SET_ITEM(PyObject *p, Py_ssize_t pos, PyObject *o)`

## Struct Sequence Objects

Struct sequence objects are the C equivalent of `namedtuple()` objects, i.e. a sequence whose items can also be accessed through attributes

- `PyTypeObject *PyStructSequence_NewType(PyStructSequence_Desc *desc)`
- `void PyStructSequence_InitType(PyTypeObject *type, PyStructSequence_Desc *desc)`
- `int PyStructSequence_InitType2(PyTypeObject *type, PyStructSequence_Desc *desc)`
- `type PyStructSequence_Desc`
    + `const char *name`
    + `const char *doc`
    + `PyStructSequence_Field *fields`
    + `int n_in_sequence`
- `type PyStructSequence_Field`
    + `const char *name`
    + `const char *doc`
- `const char *const PyStructSequence_UnnamedField`
- `PyObject *PyStructSequence_New(PyTypeObject *type)`
- `PyObject *PyStructSequence_GetItem(PyObject *p, Py_ssize_t pos)`
- `PyObject *PyStructSequence_GET_ITEM(PyObject *p, Py_ssize_t pos)`
- `void PyStructSequence_SetItem(PyObject *p, Py_ssize_t pos, PyObject *o)`
- `void PyStructSequence_SET_ITEM(PyObject *p, Py_ssize_t *pos, PyObject *o)`
