---
title: Floating Point Objects
---

- `type PyFloatObject`
- `PyTypeObject PyFloat_Type`
- `int PyFloat_Check(PyObject *p)`
- `int PyFloat_CheckExact(PyObject *p)`
- `PyObject *PyFloat_FromString(PyObject *str)`
- `PyObject *PyFloat_FromDouble(double v)`
- `double PyFloat_AsDouble(PyObject *pyfloat)`
- `double PyFloat_AS_DOUBLE(PyObject *pyfloat)`
- `PyObject *PyFloat_GetInfo(void)`
- `double PyFloat_GetMax()`
- `double PyFloat_GetMin()`

## Pack and Unpack functions

### Pack functions

- `int PyFloat_Pack2(double x, unsigned char *p, int le)`
- `int PyFloat_Pack4(double x, unsigned char *p, int le)`
- `int PyFloat_Pack8(double x, unsigned char *p, int le)`

### Unpack functions

- `double PyFloat_Unpack2(const unsigned char *p, int le)`
- `double PyFloat_Unpack4(const unsigned char *p, int le)`
- `double PyFloat_Unpack8(const unsigned char *p, int le)`
