---
title: Weak Reference Objects
---

There are two specific object types which directly implement weak references. The first is a **simple reference object**, and the second acts as a **proxy for the original object** as much as it can

- `int PyWeakref_Check(PyObject *ob)`
- `int PyWeakref_CheckRef(PyObject *ob)`
- `int PyWeakref_CheckProxy(PyObject *ob)`
- `PyObject *PyWeakref_NewProxy(PyObject *ob, PyObject *callback)`
- `PyObject *PyWeakref_GetObject(PyObject *ref)`
- `PyObject *PyWeakref_GET_OBJECT(PyObject *ref)`
- `void PyObject_ClearWeakRefs(PyObject *object)`
