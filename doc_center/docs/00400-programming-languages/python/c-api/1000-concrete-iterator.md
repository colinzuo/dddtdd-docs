---
title: Iterator Objects
---

Python provides two general-purpose iterator objects. The first, a sequence iterator, works with an arbitrary sequence supporting the `__getitem__()` method. The second works with a callable object and a `sentinel` value, calling the callable for each item in the sequence, and ending the iteration when the sentinel value is returned

- `PyTypeObject PySeqIter_Type`
- `int PySeqIter_Check(PyObject *op)`
- `PyObject *PySeqIter_New(PyObject *seq)`
- `PyTypeObject PyCallIter_Type`
- `int PyCallIter_Check(PyObject *op)`
- `PyObject *PyCallIter_New(PyObject *callable, PyObject *sentinel)`
