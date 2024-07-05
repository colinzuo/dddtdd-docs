---
title: Supporting Cyclic Garbage Collection
---

To create a container type, the `tp_flags` field of the type object must include the `Py_TPFLAGS_HAVE_GC` and provide an implementation of the `tp_traverse` handler. If instances of the type are mutable, a `tp_clear` implementation must also be provided

## Constructors for container types must conform to two rules:

- The memory for the object must be allocated using `PyObject_GC_New` or `PyObject_GC_NewVar`.
- Once all the fields which may contain references to other containers are initialized, it must call `PyObject_GC_Track()`.

## deallocator for the object must conform to a similar pair of rules

- Before fields which refer to other containers are invalidated, `PyObject_GC_UnTrack()` must be called.
- The object’s memory must be deallocated using `PyObject_GC_Del()`.

## apis

- `PyObject_GC_New(TYPE, typeobj)`
- `PyObject_GC_NewVar(TYPE, typeobj, size)`
- `TYPE *PyObject_GC_Resize(TYPE, PyVarObject *op, Py_ssize_t newsize)`
- `void PyObject_GC_Track(PyObject *op)`
- `int PyObject_IS_GC(PyObject *obj)`
- `int PyObject_GC_IsTracked(PyObject *op)`
- `int PyObject_GC_IsFinalized(PyObject *op)`
- `void PyObject_GC_Del(void *op)`
- `void PyObject_GC_UnTrack(void *op)`

- `typedef int (*visitproc)(PyObject *object, void *arg)`
- `typedef int (*traverseproc)(PyObject *self, visitproc visit, void *arg)`
- `void Py_VISIT(PyObject *o)`
- `typedef int (*inquiry)(PyObject *self)`

## Controlling the Garbage Collector State

- `Py_ssize_t PyGC_Collect(void)`
- `int PyGC_Enable(void)`
- `int PyGC_Disable(void)`
- `int PyGC_IsEnabled(void)`
