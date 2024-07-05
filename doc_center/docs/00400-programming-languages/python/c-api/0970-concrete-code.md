---
title: Code Objects
---

- `type PyCodeObject`
- `PyTypeObject PyCode_Type`
- `int PyCode_Check(PyObject *co)`
- `int PyCode_GetNumFree(PyCodeObject *co)`
- `PyCodeObject *PyCode_New(int argcount, int kwonlyargcount, int nlocals, int stacksize, int flags, PyObject *code, PyObject *consts, PyObject *names, PyObject *varnames, PyObject *freevars, PyObject *cellvars, PyObject *filename, PyObject *name, PyObject *qualname, int firstlineno, PyObject *linetable, PyObject *exceptiontable)`
- `PyCodeObject *PyCode_NewWithPosOnlyArgs(int argcount, int posonlyargcount, int kwonlyargcount, int nlocals, int stacksize, int flags, PyObject *code, PyObject *consts, PyObject *names, PyObject *varnames, PyObject *freevars, PyObject *cellvars, PyObject *filename, PyObject *name, PyObject *qualname, int firstlineno, PyObject *linetable, PyObject *exceptiontable)`
- `PyCodeObject *PyCode_NewEmpty(const char *filename, const char *funcname, int firstlineno)`
- `int PyCode_Addr2Line(PyCodeObject *co, int byte_offset)`
- `int PyCode_Addr2Location(PyObject *co, int byte_offset, int *start_line, int *start_column, int *end_line, int *end_column)`
- `PyObject *PyCode_GetCode(PyCodeObject *co)`
- `PyObject *PyCode_GetVarnames(PyCodeObject *co)`
- `PyObject *PyCode_GetCellvars(PyCodeObject *co)`
- `PyObject *PyCode_GetFreevars(PyCodeObject *co)`
