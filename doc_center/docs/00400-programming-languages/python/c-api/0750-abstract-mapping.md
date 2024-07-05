---
title: Mapping Protocol
---

- `int PyMapping_Check(PyObject *o)`
- `Py_ssize_t PyMapping_Size(PyObject *o)`
- `Py_ssize_t PyMapping_Length(PyObject *o)`
- `PyObject *PyMapping_GetItemString(PyObject *o, const char *key)`
- `int PyMapping_SetItemString(PyObject *o, const char *key, PyObject *v)`
- `int PyMapping_DelItem(PyObject *o, PyObject *key)`
- `int PyMapping_DelItemString(PyObject *o, const char *key)`
- `int PyMapping_HasKey(PyObject *o, PyObject *key)`
- `int PyMapping_HasKeyString(PyObject *o, const char *key)`
- `PyObject *PyMapping_Keys(PyObject *o)`
- `PyObject *PyMapping_Values(PyObject *o)`
- `PyObject *PyMapping_Items(PyObject *o)`
