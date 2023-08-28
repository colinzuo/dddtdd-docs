---
title: Bytes Objects
---

- `type PyBytesObject`
- `PyTypeObject PyBytes_Type`
- `int PyBytes_Check(PyObject *o)`
- `int PyBytes_CheckExact(PyObject *o)`
- `PyObject *PyBytes_FromString(const char *v)`
- `PyObject *PyBytes_FromStringAndSize(const char *v, Py_ssize_t len)`
- `PyObject *PyBytes_FromFormat(const char *format, ...)`
- `PyObject *PyBytes_FromFormatV(const char *format, va_list vargs)`
- `PyObject *PyBytes_FromObject(PyObject *o)`
- `Py_ssize_t PyBytes_Size(PyObject *o)`
- `Py_ssize_t PyBytes_GET_SIZE(PyObject *o)`
- `char *PyBytes_AsString(PyObject *o)`
- `char *PyBytes_AS_STRING(PyObject *string)`
- `int PyBytes_AsStringAndSize(PyObject *obj, char **buffer, Py_ssize_t *length)`
- `void PyBytes_Concat(PyObject **bytes, PyObject *newpart)`
- `void PyBytes_ConcatAndDel(PyObject **bytes, PyObject *newpart)`
