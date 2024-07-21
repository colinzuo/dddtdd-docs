---
title: Integer Objects
---

- `type PyLongObject`
- `PyTypeObject PyLong_Type`
- `int PyLong_Check(PyObject *p)`
- `int PyLong_CheckExact(PyObject *p)`
- `PyObject *PyLong_FromLong(long v)`
- `PyObject *PyLong_FromUnsignedLong(unsigned long v)`
- `PyObject *PyLong_FromSsize_t(Py_ssize_t v)`
- `PyObject *PyLong_FromSize_t(size_t v)`
- `PyObject *PyLong_FromLongLong(long long v)`
- `PyObject *PyLong_FromUnsignedLongLong(unsigned long long v)`
- `PyObject *PyLong_FromDouble(double v)`
- `PyObject *PyLong_FromString(const char *str, char **pend, int base)`
- `PyObject *PyLong_FromUnicodeObject(PyObject *u, int base)`
- `PyObject *PyLong_FromVoidPtr(void *p)`
- `long PyLong_AsLong(PyObject *obj)`
- `long PyLong_AsLongAndOverflow(PyObject *obj, int *overflow)`
- `long long PyLong_AsLongLong(PyObject *obj)`
- `long long PyLong_AsLongLongAndOverflow(PyObject *obj, int *overflow)`
- `Py_ssize_t PyLong_AsSsize_t(PyObject *pylong)`
- `unsigned long PyLong_AsUnsignedLong(PyObject *pylong)`
- `size_t PyLong_AsSize_t(PyObject *pylong)`
- `unsigned long long PyLong_AsUnsignedLongLong(PyObject *pylong)`
- `unsigned long PyLong_AsUnsignedLongMask(PyObject *obj)`
- `unsigned long long PyLong_AsUnsignedLongLongMask(PyObject *obj)`
- `double PyLong_AsDouble(PyObject *pylong)`
- `void *PyLong_AsVoidPtr(PyObject *pylong)`