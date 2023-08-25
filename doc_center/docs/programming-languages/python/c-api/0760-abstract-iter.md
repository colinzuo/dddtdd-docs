---
title: Iterator Protocol
---

- `int PyIter_Check(PyObject *o)`
- `int PyAIter_Check(PyObject *o)`
- `PyObject *PyIter_Next(PyObject *o)`
- `type PySendResult`
- `PySendResult PyIter_Send(PyObject *iter, PyObject *arg, PyObject **presult)`
    + `PYGEN_RETURN`
    + `PYGEN_NEXT`
    + `PYGEN_ERROR`
