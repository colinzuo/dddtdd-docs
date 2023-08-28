
<https://peps.python.org/pep-0393/>

The Unicode string type is changed to support **multiple internal representations**, depending on the character with the largest Unicode ordinal

## Rationale

As interaction with other libraries will often require some sort of internal representation, the specification chooses **UTF-8 as the recommended way of exposing strings to C code**

## Specification

```c
typedef struct {
  PyObject_HEAD
  Py_ssize_t length;
  Py_hash_t hash;
  struct {
      unsigned int interned:2;
      unsigned int kind:2;
      unsigned int compact:1;
      unsigned int ascii:1;
      unsigned int ready:1;
  } state;
  wchar_t *wstr;
} PyASCIIObject;

typedef struct {
  PyASCIIObject _base;
  Py_ssize_t utf8_length;
  char *utf8;
  Py_ssize_t wstr_length;
} PyCompactUnicodeObject;

typedef struct {
  PyCompactUnicodeObject _base;
  union {
      void *any;
      Py_UCS1 *latin1;
      Py_UCS2 *ucs2;
      Py_UCS4 *ucs4;
  } data;
} PyUnicodeObject;
```

### String Creation

```c
PyObject* PyUnicode_New(Py_ssize_t size, Py_UCS4 maxchar);
```

`PyUnicode_READY()` converts a string containing only a wstr representation into the canonical representation. Unless wstr and data can share the memory, the wstr representation is discarded after the conversion

### String Access

```c
PyUnicode_READ(kind, data, index)
PyUnicode_WRITE(kind, data, index, value)
PyUnicode_READ_CHAR(unicode, index)
```
