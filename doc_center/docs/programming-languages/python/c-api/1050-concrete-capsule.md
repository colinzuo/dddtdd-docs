---
title: Capsules
---

- `type PyCapsule`
- `type PyCapsule_Destructor`
- `int PyCapsule_CheckExact(PyObject *p)`
- `PyObject *PyCapsule_New(void *pointer, const char *name, PyCapsule_Destructor destructor)`
- `void *PyCapsule_GetPointer(PyObject *capsule, const char *name)`
- `PyCapsule_Destructor PyCapsule_GetDestructor(PyObject *capsule)`
- `void *PyCapsule_GetContext(PyObject *capsule)`
- `const char *PyCapsule_GetName(PyObject *capsule)`
- `void *PyCapsule_Import(const char *name, int no_block)`
- `int PyCapsule_IsValid(PyObject *capsule, const char *name)`
- `int PyCapsule_SetContext(PyObject *capsule, void *context)`
- `int PyCapsule_SetDestructor(PyObject *capsule, PyCapsule_Destructor destructor)`
- `int PyCapsule_SetName(PyObject *capsule, const char *name)`
- `int PyCapsule_SetPointer(PyObject *capsule, void *pointer)`
