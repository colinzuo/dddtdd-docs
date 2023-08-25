---
title: Type Objects
---

- `type PyTypeObject`
- `PyTypeObject PyType_Type`
- `int PyType_Check(PyObject *o)`
- `int PyType_CheckExact(PyObject *o)`
- `unsigned int PyType_ClearCache()`
- `unsigned long PyType_GetFlags(PyTypeObject *type)`
- `void PyType_Modified(PyTypeObject *type)`
- `int PyType_HasFeature(PyTypeObject *o, int feature)`
- `int PyType_IS_GC(PyTypeObject *o)`
- `int PyType_IsSubtype(PyTypeObject *a, PyTypeObject *b)`
- `PyObject *PyType_GenericAlloc(PyTypeObject *type, Py_ssize_t nitems)`
- `PyObject *PyType_GenericNew(PyTypeObject *type, PyObject *args, PyObject *kwds)`
- `int PyType_Ready(PyTypeObject *type)`
- `PyObject *PyType_GetName(PyTypeObject *type)`
- `PyObject *PyType_GetQualName(PyTypeObject *type)`
- `void *PyType_GetSlot(PyTypeObject *type, int slot)`
- `PyObject *PyType_GetModule(PyTypeObject *type)`
- `void *PyType_GetModuleState(PyTypeObject *type)`
- `PyObject *PyType_GetModuleByDef(PyTypeObject *type, struct PyModuleDef *def)`

## Creating Heap-Allocated Types

- `PyObject *PyType_FromModuleAndSpec(PyObject *module, PyType_Spec *spec, PyObject *bases)`
- `PyObject *PyType_FromSpecWithBases(PyType_Spec *spec, PyObject *bases)`
- `PyObject *PyType_FromSpec(PyType_Spec *spec)`
- `type PyType_Spec`
- `type PyType_Slot`

