---
title: MemoryView Objects
---

A memoryview object exposes the **C level buffer interface as a Python object** which can then be passed around like any other object

- `PyObject *PyMemoryView_FromObject(PyObject *obj)`
- `PyObject *PyMemoryView_FromMemory(char *mem, Py_ssize_t size, int flags)`
- `PyObject *PyMemoryView_FromBuffer(const Py_buffer *view)`
- `PyObject *PyMemoryView_GetContiguous(PyObject *obj, int buffertype, char order)`
- `int PyMemoryView_Check(PyObject *obj)`
- `Py_buffer *PyMemoryView_GET_BUFFER(PyObject *mview)`
- `PyObject *PyMemoryView_GET_BASE(PyObject *mview)`
