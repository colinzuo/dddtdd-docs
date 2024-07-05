---
title: Generator Objects
---

- `type PyGenObject`
- `PyTypeObject PyGen_Type`
- `int PyGen_Check(PyObject *ob)`
- `int PyGen_CheckExact(PyObject *ob)`
- `PyObject *PyGen_New(PyFrameObject *frame)`
- `PyObject *PyGen_NewWithQualName(PyFrameObject *frame, PyObject *name, PyObject *qualname)`
