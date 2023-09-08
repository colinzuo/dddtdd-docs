---
title: Frame Objects
---

- `type PyFrameObject`
- `PyTypeObject PyFrame_Type`
- `int PyFrame_Check(PyObject *obj)`
- `PyFrameObject *PyFrame_GetBack(PyFrameObject *frame)`
- `PyObject *PyFrame_GetBuiltins(PyFrameObject *frame)`
- `PyCodeObject *PyFrame_GetCode(PyFrameObject *frame)`
- `PyObject *PyFrame_GetGenerator(PyFrameObject *frame)`
- `PyObject *PyFrame_GetGlobals(PyFrameObject *frame)`
- `int PyFrame_GetLasti(PyFrameObject *frame)`
- `PyObject *PyFrame_GetLocals(PyFrameObject *frame)`
- `int PyFrame_GetLineNumber(PyFrameObject *frame)`
