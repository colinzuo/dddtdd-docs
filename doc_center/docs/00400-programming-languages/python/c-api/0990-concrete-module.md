---
title: Module Objects
---

- `PyTypeObject PyModule_Type`
- `int PyModule_Check(PyObject *p)`
- `int PyModule_CheckExact(PyObject *p)`
- `PyObject *PyModule_NewObject(PyObject *name)`
- `PyObject *PyModule_New(const char *name)`
- `PyObject *PyModule_GetDict(PyObject *module)`
- `PyObject *PyModule_GetNameObject(PyObject *module)`
- `const char *PyModule_GetName(PyObject *module)`
- `void *PyModule_GetState(PyObject *module)`
- `PyModuleDef *PyModule_GetDef(PyObject *module)`
- `PyObject *PyModule_GetFilenameObject(PyObject *module)`
- `const char *PyModule_GetFilename(PyObject *module)`

## Initializing C modules

- `type PyModuleDef`
    + `PyModuleDef_Base m_base`
    + `const char *m_name`
    + `const char *m_doc`
    + `Py_ssize_t m_size`
    + `PyMethodDef *m_methods`
    + `PyModuleDef_Slot *m_slots`
    + `inquiry m_reload`
    + `traverseproc m_traverse`
    + `inquiry m_clear`
    + `freefunc m_free`

### Single-phase initialization

The module initialization function may create and return the module object directly. This is referred to as “single-phase initialization”

- `PyObject *PyModule_Create(PyModuleDef *def)`
- `PyObject *PyModule_Create2(PyModuleDef *def, int module_api_version)`

### Multi-phase initialization

Extension modules created this way behave more like Python modules: the initialization is split between the creation phase, when the module object is created, and the execution phase, when it is populated. The distinction is similar to the `__new__()` and `__init__()` methods of classes.

To request multi-phase initialization, the initialization function (PyInit_modulename) returns a `PyModuleDef` instance with non-empty `m_slots`.

- `PyObject *PyModuleDef_Init(PyModuleDef *def)`
- `type PyModuleDef_Slot`
    + `int slot`
    + `void *value`
- `Py_mod_create` : `PyObject *create_module(PyObject *spec, PyModuleDef *def)`
- `Py_mod_exec` : `int exec_module(PyObject *module)`

### Low-level module creation functions

- `PyObject *PyModule_FromDefAndSpec(PyModuleDef *def, PyObject *spec)`
- `int PyModule_ExecDef(PyObject *module, PyModuleDef *def)`
- `int PyModule_SetDocString(PyObject *module, const char *docstring)`
- `int PyModule_AddFunctions(PyObject *module, PyMethodDef *functions)`

### Support functions

- `int PyModule_AddObjectRef(PyObject *module, const char *name, PyObject *value)`
- `int PyModule_AddObject(PyObject *module, const char *name, PyObject *value)`
- `int PyModule_AddIntConstant(PyObject *module, const char *name, long value)`
- `int PyModule_AddStringConstant(PyObject *module, const char *name, const char *value)`
- `PyModule_AddIntMacro(module, macro)`
- `PyModule_AddStringMacro(module, macro)`
- `int PyModule_AddType(PyObject *module, PyTypeObject *type)`

## Module lookup

- `PyObject *PyState_FindModule(PyModuleDef *def)`
- `int PyState_AddModule(PyObject *module, PyModuleDef *def)`
- `int PyState_RemoveModule(PyModuleDef *def)`
