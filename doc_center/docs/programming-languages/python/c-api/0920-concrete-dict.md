---
title: Dictionary Objects
---

- `type PyDictObject`
- `PyTypeObject PyDict_Type`
- `int PyDict_Check(PyObject *p)`
- `int PyDict_CheckExact(PyObject *p)`
- `PyObject *PyDict_New()`
- `PyObject *PyDictProxy_New(PyObject *mapping)`
- `void PyDict_Clear(PyObject *p)`
- `int PyDict_Contains(PyObject *p, PyObject *key)`
- `PyObject *PyDict_Copy(PyObject *p)`
- `int PyDict_SetItem(PyObject *p, PyObject *key, PyObject *val)`
- `int PyDict_SetItemString(PyObject *p, const char *key, PyObject *val)`
- `int PyDict_DelItem(PyObject *p, PyObject *key)`
- `int PyDict_DelItemString(PyObject *p, const char *key)`
- `PyObject *PyDict_GetItem(PyObject *p, PyObject *key)`
- `PyObject *PyDict_GetItemWithError(PyObject *p, PyObject *key)`
- `PyObject *PyDict_GetItemString(PyObject *p, const char *key)`
- `PyObject *PyDict_SetDefault(PyObject *p, PyObject *key, PyObject *defaultobj)`
- `PyObject *PyDict_Items(PyObject *p)`
- `PyObject *PyDict_Keys(PyObject *p)`
- `PyObject *PyDict_Values(PyObject *p)`
- `Py_ssize_t PyDict_Size(PyObject *p)`
- `int PyDict_Next(PyObject *p, Py_ssize_t *ppos, PyObject **pkey, PyObject **pvalue)`
- `int PyDict_Merge(PyObject *a, PyObject *b, int override)`
- `int PyDict_Update(PyObject *a, PyObject *b)`
- `int PyDict_MergeFromSeq2(PyObject *a, PyObject *seq2, int override)`
