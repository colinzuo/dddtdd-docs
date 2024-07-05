---
title: Complex Number Objects
---

## Complex Numbers as C Structures

- `type Py_complex`

## Complex Numbers as Python Objects

- `type PyComplexObject`
- `PyTypeObject PyComplex_Type`
- `int PyComplex_Check(PyObject *p)`
- `int PyComplex_CheckExact(PyObject *p)`
- `PyObject *PyComplex_FromCComplex(Py_complex v)`
- `PyObject *PyComplex_FromDoubles(double real, double imag)`
- `double PyComplex_RealAsDouble(PyObject *op)`
- `double PyComplex_ImagAsDouble(PyObject *op)`
- `Py_complex PyComplex_AsCComplex(PyObject *op)`
