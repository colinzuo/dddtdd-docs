---
title: Common Object Structures
---

## Base object types and macros

All Python objects ultimately share a small number of fields at the beginning of the object’s representation in memory

- `type PyObject`: In a normal “release” build, it contains only the object’s reference count and a pointer to the corresponding type object. Access to the members must be done by using the macros `Py_REFCNT` and `Py_TYPE`
- `type PyVarObject`: This is an extension of `PyObject` that adds the `ob_size` field. This is only used for objects that have some notion of length.
- `PyObject_HEAD`: `PyObject ob_base;`
- `PyObject_VAR_HEAD`: `PyVarObject ob_base;`
- `int Py_Is(PyObject *x, PyObject *y)`
- `int Py_IsNone(PyObject *x)`
- `int Py_IsTrue(PyObject *x)`
- `int Py_IsFalse(PyObject *x)`
- `PyTypeObject *Py_TYPE(PyObject *o)`
- `int Py_IS_TYPE(PyObject *o, PyTypeObject *type)`
- `void Py_SET_TYPE(PyObject *o, PyTypeObject *type)`
- `Py_ssize_t Py_REFCNT(PyObject *o)`
- `void Py_SET_REFCNT(PyObject *o, Py_ssize_t refcnt)`
- `Py_ssize_t Py_SIZE(PyVarObject *o)`
- `void Py_SET_SIZE(PyVarObject *o, Py_ssize_t size)`
- `PyObject_HEAD_INIT(type)`
- `PyVarObject_HEAD_INIT(type, size)`

## Implementing functions and methods

- `type PyCFunction`

```c
PyObject *PyCFunction(PyObject *self,
                      PyObject *args);
```

- `type PyCFunctionWithKeywords`

```c
PyObject *PyCFunctionWithKeywords(PyObject *self,
                                  PyObject *args,
                                  PyObject *kwargs);
```

- `type _PyCFunctionFast`

```c
PyObject *_PyCFunctionFast(PyObject *self,
                           PyObject *const *args,
                           Py_ssize_t nargs);
```

- `type _PyCFunctionFastWithKeywords`

```c
PyObject *_PyCFunctionFastWithKeywords(PyObject *self,
                                       PyObject *const *args,
                                       Py_ssize_t nargs,
                                       PyObject *kwnames);
```

- `type PyCMethod`

```c
PyObject *PyCMethod(PyObject *self,
                    PyTypeObject *defining_class,
                    PyObject *const *args,
                    Py_ssize_t nargs,
                    PyObject *kwnames)
```

- `type PyMethodDef`
    + `const char *ml_name`
    + `PyCFunction ml_meth`
    + `int ml_flags`
        * `METH_VARARGS`
        * `METH_KEYWORDS`
        * `METH_VARARGS | METH_KEYWORDS`
        * `METH_FASTCALL`: Fast calling convention supporting only positional arguments
        * `METH_FASTCALL | METH_KEYWORDS`
        * `METH_METHOD`
        * `METH_METHOD | METH_FASTCALL | METH_KEYWORDS`
        * `METH_NOARGS`
        * `METH_O`: Methods with a single object argument
        * `METH_CLASS`: The method will be passed the type object as the first parameter
        * `METH_STATIC`: The method will be passed NULL as the first parameter
        * `METH_COEXIST`
    + `const char *ml_doc`

## Accessing attributes of extension types

- `type PyMemberDef`
    + `name`
    + `type`
        * `T_INT`
        * `T_OBJECT`: `T_OBJECT` and `T_OBJECT_EX` differ in that T_OBJECT returns `None` if the member is `NULL` and T_OBJECT_EX raises an `AttributeError`
        * `T_OBJECT_EX`
        * `T_STRING`: interpreted as UTF-8
    + `offset`
    + `flags`
    + `doc`
- `PyObject *PyMember_GetOne(const char *obj_addr, struct PyMemberDef *m)`
- `int PyMember_SetOne(char *obj_addr, struct PyMemberDef *m, PyObject *o)`
- `type PyGetSetDef`
    + `name`
    + `get`
    + `set`
    + `doc`
    + `closure`

```c
typedef PyObject *(*getter)(PyObject *, void *);

typedef int (*setter)(PyObject *, PyObject *, void *);
```
