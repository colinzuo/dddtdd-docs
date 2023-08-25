---
title: Importing Modules
---

- `PyObject *PyImport_ImportModule(const char *name)`
- `PyObject *PyImport_ImportModuleEx(const char *name, PyObject *globals, PyObject *locals, PyObject *fromlist)`
- `PyObject *PyImport_ReloadModule(PyObject *m)`
- `PyObject *PyImport_GetModule(PyObject *name)`
- `int PyImport_AppendInittab(const char *name, PyObject *(*initfunc)(void))`
- `int PyImport_ExtendInittab(struct _inittab *newtab)`
