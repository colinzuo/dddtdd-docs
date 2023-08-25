---
title: Operating System Utilities
---

- `PyOS_sighandler_t PyOS_getsig(int i)`
- `PyOS_sighandler_t PyOS_setsig(int i, PyOS_sighandler_t h)`
- `wchar_t *Py_DecodeLocale(const char *arg, size_t *size)`
- `char *Py_EncodeLocale(const wchar_t *text, size_t *error_pos)`

## System Functions

These are utility functions that make functionality from the **sys module** accessible to C code

- `PyObject *PySys_GetObject(const char *name)`
- `int PySys_SetObject(const char *name, PyObject *v)`
- `void PySys_WriteStdout(const char *format, ...)`
- `void PySys_FormatStdout(const char *format, ...)`

## Process Control

- `void Py_FatalError(const char *message)`
- `void Py_Exit(int status)`
- `int Py_AtExit(void (*func)())`
