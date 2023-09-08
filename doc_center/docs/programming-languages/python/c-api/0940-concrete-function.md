---
title: Function Objects
---

- `type PyFunctionObject`
- `PyTypeObject PyFunction_Type`
- `int PyFunction_Check(PyObject *o)`
- `PyObject *PyFunction_New(PyObject *code, PyObject *globals)`
- `PyObject *PyFunction_NewWithQualName(PyObject *code, PyObject *globals, PyObject *qualname)`
- `PyObject *PyFunction_GetCode(PyObject *op)`
- `PyObject *PyFunction_GetGlobals(PyObject *op)`
- `PyObject *PyFunction_GetModule(PyObject *op)`
- `PyObject *PyFunction_GetDefaults(PyObject *op)`
- `int PyFunction_SetDefaults(PyObject *op, PyObject *defaults)`
- `PyObject *PyFunction_GetClosure(PyObject *op)`
- `int PyFunction_SetClosure(PyObject *op, PyObject *closure)`
- `PyObject *PyFunction_GetAnnotations(PyObject *op)`
- `int PyFunction_SetAnnotations(PyObject *op, PyObject *annotations)`
