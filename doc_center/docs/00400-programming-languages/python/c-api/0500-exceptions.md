---
title: Exception Handling
---

[https://docs.python.org/3.11/c-api/exceptions.html](https://docs.python.org/3.11/c-api/exceptions.html)

It works somewhat like the POSIX errno variable: there is a **global indicator (per thread)** of the last error that occurred.

If the error is not handled or carefully propagated, additional calls into the Python/C API may not behave as intended and may fail in mysterious ways.

The error indicator is not the result of `sys.exc_info()`. The former corresponds to an exception that is not yet caught (and is therefore still propagating), while the latter returns an exception after it is caught (and has therefore stopped propagating)

## Printing and clearing

- `void PyErr_Clear()`
- `void PyErr_PrintEx(int set_sys_last_vars)`
- `void PyErr_WriteUnraisable(PyObject *obj)`

## Raising exceptions

- `void PyErr_SetString(PyObject *type, const char *message)`
- `void PyErr_SetObject(PyObject *type, PyObject *value)`
- `PyObject *PyErr_Format(PyObject *exception, const char *format, ...)`
- `void PyErr_SetNone(PyObject *type)`
- `int PyErr_BadArgument()`
- `PyObject *PyErr_NoMemory()`
- `PyObject *PyErr_SetFromErrno(PyObject *type)`
- `PyObject *PyErr_SetImportError(PyObject *msg, PyObject *name, PyObject *path)`
- `void PyErr_BadInternalCall()`

## Issuing warnings

- `int PyErr_WarnEx(PyObject *category, const char *message, Py_ssize_t stack_level)`
- `int PyErr_WarnFormat(PyObject *category, Py_ssize_t stack_level, const char *format, ...)`

## Querying the error indicator

- `PyObject *PyErr_Occurred()`
- `int PyErr_GivenExceptionMatches(PyObject *given, PyObject *exc)`
- `void PyErr_Fetch(PyObject **ptype, PyObject **pvalue, PyObject **ptraceback)`
- `void PyErr_Restore(PyObject *type, PyObject *value, PyObject *traceback)`

## Signal Handling

- `int PyErr_CheckSignals()`

## Exception Classes

- `PyObject *PyErr_NewException(const char *name, PyObject *base, PyObject *dict)`

## Exception Objects

- `PyObject *PyException_GetTraceback(PyObject *ex)`
- `PyObject *PyException_GetContext(PyObject *ex)`
- `PyObject *PyException_GetCause(PyObject *ex)`

## Standard Exceptions

All standard Python exceptions are available as global variables whose names are `PyExc_` followed by the Python exception name. These have the type `PyObject*`; they are all class objects

- `PyExc_BaseException`
- `PyExc_Exception`
- `PyExc_ArithmeticError`
- `PyExc_IndexError`
- `PyExc_RuntimeError`
- `PyExc_StopIteration`
- `PyExc_SyntaxError`
- `PyExc_TimeoutError`
- `PyExc_TypeError`
- `PyExc_ValueError`

## Standard Warning Categories

- `PyExc_Warning`
- `PyExc_DeprecationWarning`
