---
title: The Very High Level Layer
---

[https://docs.python.org/3.11/c-api/veryhigh.html](https://docs.python.org/3.11/c-api/veryhigh.html)

The functions in this chapter will let you execute Python source code given in a file or a buffer

- `int Py_Main(int argc, wchar_t **argv)`
- `int PyRun_AnyFileExFlags(FILE *fp, const char *filename, int closeit, PyCompilerFlags *flags)`
- `int PyRun_SimpleStringFlags(const char *command, PyCompilerFlags *flags)`
- `int PyRun_SimpleFileExFlags(FILE *fp, const char *filename, int closeit, PyCompilerFlags *flags)`
- `int PyRun_InteractiveOneFlags(FILE *fp, const char *filename, PyCompilerFlags *flags)`
- `int PyRun_InteractiveLoopFlags(FILE *fp, const char *filename, PyCompilerFlags *flags)`
- `PyObject *PyRun_StringFlags(const char *str, int start, PyObject *globals, PyObject *locals, PyCompilerFlags *flags)`
- `PyObject *PyRun_FileExFlags(FILE *fp, const char *filename, int start, PyObject *globals, PyObject *locals, int closeit, PyCompilerFlags *flags)`
- `PyObject *Py_CompileStringExFlags(const char *str, const char *filename, int start, PyCompilerFlags *flags, int optimize)`
- `PyObject *PyEval_EvalCodeEx(PyObject *co, PyObject *globals, PyObject *locals, PyObject *const *args, int argcount, PyObject *const *kws, int kwcount, PyObject *const *defs, int defcount, PyObject *kwdefs, PyObject *closure)`
- `PyObject *PyEval_EvalFrameEx(PyFrameObject *f, int throwflag)`
- 
