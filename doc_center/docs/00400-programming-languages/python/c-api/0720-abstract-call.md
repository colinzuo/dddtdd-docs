---
title: Call Protocol
---

## The tp_call Protocol

Instances of classes that set `tp_call` are callable.

`PyObject *tp_call(PyObject *callable, PyObject *args, PyObject *kwargs);`

## The Vectorcall Protocol

The vectorcall protocol was introduced in [PEP 590](https://peps.python.org/pep-0590/) as an additional protocol for making calls more efficient

`typedef PyObject *(*vectorcallfunc)(PyObject *callable, PyObject *const *args, size_t nargsf, PyObject *kwnames)`

## Object Calling API

- `PyObject *PyObject_Call(PyObject *callable, PyObject *args, PyObject *kwargs)`
- `PyObject *PyObject_CallNoArgs(PyObject *callable)`
- `PyObject *PyObject_CallOneArg(PyObject *callable, PyObject *arg)`
- `PyObject *PyObject_CallObject(PyObject *callable, PyObject *args)`
- `PyObject *PyObject_CallFunction(PyObject *callable, const char *format, ...)`
- `PyObject *PyObject_CallMethod(PyObject *obj, const char *name, const char *format, ...)`
- `PyObject *PyObject_CallFunctionObjArgs(PyObject *callable, ...)`
- `PyObject *PyObject_CallMethodObjArgs(PyObject *obj, PyObject *name, ...)`
- `PyObject *PyObject_CallMethodNoArgs(PyObject *obj, PyObject *name)`
- `PyObject *PyObject_CallMethodOneArg(PyObject *obj, PyObject *name, PyObject *arg)`
- `PyObject *PyObject_Vectorcall(PyObject *callable, PyObject *const *args, size_t nargsf, PyObject *kwnames)`
- `PyObject *PyObject_VectorcallDict(PyObject *callable, PyObject *const *args, size_t nargsf, PyObject *kwdict)`
- `PyObject *PyObject_VectorcallMethod(PyObject *name, PyObject *const *args, size_t nargsf, PyObject *kwnames)`

## Call Support API

- `int PyCallable_Check(PyObject *o)`
