---
title: Buffer Protocol
---

This protocol has two sides:

- on the producer side, a type can export a “buffer interface” which allows objects of that type to expose information about their underlying buffer. This interface is described in the section Buffer Object Structures;

- on the consumer side, several means are available to obtain a pointer to the raw underlying data of an object (for example a method parameter)

There are two ways for a consumer of the buffer interface to acquire a buffer over a target object:

- call `PyObject_GetBuffer()` with the right parameters;

- call `PyArg_ParseTuple()` (or one of its siblings) with one of the `y*, w* or s*` format codes.

In both cases, PyBuffer_Release() must be called when the buffer isn’t needed anymore

## Buffer structure

Contrary to most data types exposed by the Python interpreter, buffers are **not PyObject pointers but rather simple C structures**. This allows them to be created and copied very simply. When a generic wrapper around a buffer is needed, a `memoryview` object can be created

- `type Py_buffer`
    + `void *buf`
    + `PyObject *obj`
    + `Py_ssize_t len`
    + `int readonly`
    + `Py_ssize_t itemsize`
    + `const char *format`
    + `int ndim`
    + `Py_ssize_t *shape`
    + `Py_ssize_t *strides`
    + `void *internal`

## Buffer request types

### readonly, format

- `PyBUF_WRITABLE`
- `PyBUF_FORMAT`

### shape, strides, suboffsets

- `PyBUF_INDIRECT`
- `PyBUF_STRIDES`
- `PyBUF_ND`
- `PyBUF_SIMPLE`

### contiguity requests

- `PyBUF_C_CONTIGUOUS`
- `PyBUF_F_CONTIGUOUS`
- `PyBUF_ANY_CONTIGUOUS`
- `PyBUF_ND`

### compound requests

- `PyBUF_FULL`
- `PyBUF_FULL_RO`
- `PyBUF_RECORDS`
- `PyBUF_RECORDS_RO`
- `PyBUF_STRIDED`
- `PyBUF_STRIDED_RO`
- `PyBUF_CONTIG`
- `PyBUF_CONTIG_RO`

## Complex arrays

### NumPy-style: shape and strides

If `ndim == 0`, the memory location pointed to by buf is interpreted as a scalar of size itemsize. In that case, both shape and strides are NULL.

If strides is NULL, the array is interpreted as a **standard n-dimensional C-array**. Otherwise, the consumer must access an n-dimensional array as follows:

```c
ptr = (char *)buf + indices[0] * strides[0] + ... + indices[n-1] * strides[n-1];
item = *((typeof(item) *)ptr);
```

### PIL-style: shape, strides and suboffsets

In addition to the regular items, PIL-style arrays can contain pointers that must be followed in order to get to the next element in a dimension

## Buffer-related functions

- `int PyObject_CheckBuffer(PyObject *obj)`
- `int PyObject_GetBuffer(PyObject *exporter, Py_buffer *view, int flags)`

Send a request to exporter to **fill in view as specified by flags**. If the exporter cannot provide a buffer of the exact type, it MUST raise BufferError, set view->obj to NULL and return -1

- `void PyBuffer_Release(Py_buffer *view)`
- `Py_ssize_t PyBuffer_SizeFromFormat(const char *format)`
- `int PyBuffer_IsContiguous(const Py_buffer *view, char order)`
- `void *PyBuffer_GetPointer(const Py_buffer *view, const Py_ssize_t *indices)`
- `int PyBuffer_FromContiguous(const Py_buffer *view, const void *buf, Py_ssize_t len, char fort)`
- `int PyBuffer_ToContiguous(void *buf, const Py_buffer *src, Py_ssize_t len, char order)`
- `int PyObject_CopyData(PyObject *dest, PyObject *src)`
- `void PyBuffer_FillContiguousStrides(int ndims, Py_ssize_t *shape, Py_ssize_t *strides, int itemsize, char order)`
- `int PyBuffer_FillInfo(Py_buffer *view, PyObject *exporter, void *buf, Py_ssize_t len, int readonly, int flags)`
