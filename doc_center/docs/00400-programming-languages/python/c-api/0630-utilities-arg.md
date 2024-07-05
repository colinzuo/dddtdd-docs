---
title: Parsing arguments and building values
---

The first three of these functions described, `PyArg_ParseTuple()`, `PyArg_ParseTupleAndKeywords()`, and `PyArg_Parse()`, all use **format strings which are used to tell the function about the expected arguments**.

## Parsing arguments

A format string consists of zero or more “format units.” A format unit describes one Python object; it is usually **a single character or a parenthesized sequence of format units**

the quoted form is the format unit; the entry in `(round)` parentheses is the Python object type that matches the format unit; and the entry in `[square]` brackets is the type of the C variable(s) whose address should be passed

### Strings and buffers

These formats allow accessing an object as a contiguous chunk of memory.

- Formats such as `y*` and `s*` fill a `Py_buffer` structure, you have to call `PyBuffer_Release()` after you have finished processing the data
- The `es`, `es#`, `et` and `et#` formats allocate the result buffer. You have to call `PyMem_Free()` after you have finished processing the data
- Other formats take a str or a read-only bytes-like object, such as bytes, and provide a `const char *` pointer to its buffer. In this case the buffer is “borrowed”: it is managed by the corresponding Python object, and shares the lifetime of this object. You won’t have to release any memory yourself

- `s (str) [const char *]`
- `s* (str or bytes-like object) [Py_buffer]`
- `s# (str, read-only bytes-like object) [const char *, Py_ssize_t]`: Like `s*`, except that it provides a borrowed buffer
- `z (str or None) [const char *]`
- `z* (str, bytes-like object or None) [Py_buffer]`
- `z# (str, read-only bytes-like object or None) [const char *, Py_ssize_t]`
- `y (read-only bytes-like object) [const char *]`
- `y* (bytes-like object) [Py_buffer]`
- `y# (read-only bytes-like object) [const char *, Py_ssize_t]`
- `S (bytes) [PyBytesObject *]`
- `Y (bytearray) [PyByteArrayObject *]`
- `u (str) [const Py_UNICODE *]`
- `u# (str) [const Py_UNICODE *, Py_ssize_t]`
- `Z (str or None) [const Py_UNICODE *]`
- `Z# (str or None) [const Py_UNICODE *, Py_ssize_t]`
- `U (str) [PyObject *]`
- `w* (read-write bytes-like object) [Py_buffer]`
- `es (str) [const char *encoding, char **buffer]`
- `et (str, bytes or bytearray) [const char *encoding, char **buffer]`
- `es# (str) [const char *encoding, char **buffer, Py_ssize_t *buffer_length]`
- `et# (str, bytes or bytearray) [const char *encoding, char **buffer, Py_ssize_t *buffer_length]`

### Numbers

- `b (int) [unsigned char]`
- `B (int) [unsigned char]`
- `h (int) [short int]`
- `H (int) [unsigned short int]`
- `i (int) [int]`
- `I (int) [unsigned int]`
- `l (int) [long int]`
- `k (int) [unsigned long]`
- `L (int) [long long]`
- `K (int) [unsigned long long]`
- `n (int) [Py_ssize_t]`
- `c (bytes or bytearray of length 1) [char]`
- `C (str of length 1) [int]`
- `f (float) [float]`
- `d (float) [double]`
- `D (complex) [Py_complex]`

### Other objects

- `O (object) [PyObject *]`
- `O! (object) [typeobject, PyObject *]`
- `O& (object) [converter, anything]`
- `p (bool) [int]`
- `(items) (tuple) [matching-items]`

- `|`: Indicates that the remaining arguments in the Python argument list are optional
- `$`: Indicates that the remaining arguments in the Python argument list are keyword-only. Currently, all keyword-only arguments must also be optional arguments, so `|` must always be specified before `$` in the format string
- `:`: The list of format units ends here; the string after the colon is used as the function name in error messages
- `;`: The list of format units ends here; the string after the semicolon is used as the error message instead of the default error message

Note that **any Python object references which are provided to the caller are borrowed references**; do not release them

### API Functions

- `int PyArg_ParseTuple(PyObject *args, const char *format, ...)`
- `int PyArg_ParseTupleAndKeywords(PyObject *args, PyObject *kw, const char *format, char *keywords[], ...)`
- `int PyArg_UnpackTuple(PyObject *args, const char *name, Py_ssize_t min, Py_ssize_t max, ...)`

## Building values

- `PyObject *Py_BuildValue(const char *format, ...)`

The characters **space, tab, colon and comma are ignored** in format strings (but not within format units such as s#). This can be used to make long format strings a tad more readable


