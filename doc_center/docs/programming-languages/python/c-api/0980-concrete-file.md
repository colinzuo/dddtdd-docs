---
title: File Objects
---

In Python 3, files and streams use the new io module, which defines several layers over the low-level unbuffered I/O of the operating system. The functions described below are convenience C wrappers over these new APIs, and meant mostly for internal error reporting in the interpreter; third-party code is advised to access the `io` APIs instead

- `PyObject *PyFile_FromFd(int fd, const char *name, const char *mode, int buffering, const char *encoding, const char *errors, const char *newline, int closefd)`
- `int PyObject_AsFileDescriptor(PyObject *p)`
- `PyObject *PyFile_GetLine(PyObject *p, int n)`
- `int PyFile_SetOpenCodeHook(Py_OpenCodeHookFunction handler)`
- `int PyFile_WriteObject(PyObject *obj, PyObject *p, int flags)`
- `int PyFile_WriteString(const char *s, PyObject *p)`
