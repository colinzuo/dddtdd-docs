---
title: Type Objects
---

## Quick Reference

### tp slots

- `tp_name`
- `tp_basicsize`
- `tp_itemsize`
- `tp_dealloc`
- `tp_vectorcall_offset`
- `tp_as_async`
- `tp_repr`
- `tp_as_number`
- `tp_as_sequence`
- `tp_as_mapping`
- `tp_hash`
- `tp_call`
- `tp_str`
- `tp_getattro`
- `tp_setattro`
- `tp_as_buffer`
- `tp_flags`
- `tp_doc`
- `tp_traverse`
- `tp_clear`
- `tp_richcompare`
- `tp_weaklistoffset`
- `tp_iter`
- `tp_iternext`
- `tp_methods`
- `tp_members`
- `tp_getset`
- `tp_base`
- `tp_dict`
- `tp_descr_get`
- `tp_descr_set`
- `tp_dictoffset`
- `tp_init`
- `tp_alloc`
- `tp_new`
- `tp_free`
- `tp_is_gc`
- `<tp_bases>`
- `<tp_mro>`
- `tp_finalize`
- `tp_vectorcall`

### sub-slots

- `am_await`
- `am_aiter`
- `am_anext`
- `am_send`

- `nb_add`
- `nb_inplace_add`

- `mp_length`
- `mp_subscript`
- `mp_ass_subscript`

- `sq_length`
- `sq_concat`
- `sq_repeat`
- `sq_item`
- `sq_ass_item`
- `sq_contains`
- `sq_inplace_concat`
- `sq_inplace_repeat`

- `bf_getbuffer`
- `bf_releasebuffer`

### slot typedefs

- `allocfunc`
- `destructor`
- `freefunc`
- `traverseproc`
- `newfunc`
- `initproc`
- `reprfunc`
- `getattrfunc`
- `setattrfunc`
- `getattrofunc`
- `setattrofunc`
- `descrgetfunc`
- `descrsetfunc`
- `hashfunc`
- `richcmpfunc`
- `getiterfunc`
- `iternextfunc`
- `lenfunc`
- `getbufferproc`
- `releasebufferproc`
- `inquiry`
- `unaryfunc`
- `binaryfunc`
- `ternaryfunc`
- `ssizeargfunc`
- `ssizeobjargproc`
- `objobjproc`
- `objobjargproc`

## PyTypeObject Definition

```c
typedef struct _typeobject {
    PyObject_VAR_HEAD
    const char *tp_name; /* For printing, in format "<module>.<name>" */
    Py_ssize_t tp_basicsize, tp_itemsize; /* For allocation */

    /* Methods to implement standard operations */

    destructor tp_dealloc;
    Py_ssize_t tp_vectorcall_offset;
    getattrfunc tp_getattr;
    setattrfunc tp_setattr;
    PyAsyncMethods *tp_as_async; /* formerly known as tp_compare (Python 2)
                                    or tp_reserved (Python 3) */
    reprfunc tp_repr;

    /* Method suites for standard classes */

    PyNumberMethods *tp_as_number;
    PySequenceMethods *tp_as_sequence;
    PyMappingMethods *tp_as_mapping;

    /* More standard operations (here for binary compatibility) */

    hashfunc tp_hash;
    ternaryfunc tp_call;
    reprfunc tp_str;
    getattrofunc tp_getattro;
    setattrofunc tp_setattro;

    /* Functions to access object as input/output buffer */
    PyBufferProcs *tp_as_buffer;

    /* Flags to define presence of optional/expanded features */
    unsigned long tp_flags;

    const char *tp_doc; /* Documentation string */

    /* Assigned meaning in release 2.0 */
    /* call function for all accessible objects */
    traverseproc tp_traverse;

    /* delete references to contained objects */
    inquiry tp_clear;

    /* Assigned meaning in release 2.1 */
    /* rich comparisons */
    richcmpfunc tp_richcompare;

    /* weak reference enabler */
    Py_ssize_t tp_weaklistoffset;

    /* Iterators */
    getiterfunc tp_iter;
    iternextfunc tp_iternext;

    /* Attribute descriptor and subclassing stuff */
    struct PyMethodDef *tp_methods;
    struct PyMemberDef *tp_members;
    struct PyGetSetDef *tp_getset;
    // Strong reference on a heap type, borrowed reference on a static type
    struct _typeobject *tp_base;
    PyObject *tp_dict;
    descrgetfunc tp_descr_get;
    descrsetfunc tp_descr_set;
    Py_ssize_t tp_dictoffset;
    initproc tp_init;
    allocfunc tp_alloc;
    newfunc tp_new;
    freefunc tp_free; /* Low-level free-memory routine */
    inquiry tp_is_gc; /* For PyObject_IS_GC */
    PyObject *tp_bases;
    PyObject *tp_mro; /* method resolution order */
    PyObject *tp_cache;
    PyObject *tp_subclasses;
    PyObject *tp_weaklist;
    destructor tp_del;

    /* Type attribute cache version tag. Added in version 2.6 */
    unsigned int tp_version_tag;

    destructor tp_finalize;
    vectorcallfunc tp_vectorcall;
} PyTypeObject;
```

## PyObject Slots

- `Py_ssize_t PyObject.ob_refcnt`
- `PyTypeObject *PyObject.ob_type`

## PyVarObject Slots

- `Py_ssize_t PyVarObject.ob_size`

## PyTypeObject Slots

- `const char *PyTypeObject.tp_name`
- `Py_ssize_t PyTypeObject.tp_basicsize`
- `Py_ssize_t PyTypeObject.tp_itemsize`
- `destructor PyTypeObject.tp_dealloc`

```c
static void foo_dealloc(foo_object *self) {
    PyObject_GC_UnTrack(self);
    Py_CLEAR(self->ref);
    Py_TYPE(self)->tp_free((PyObject *)self);
}
```

- `Py_ssize_t PyTypeObject.tp_vectorcall_offset`
- `reprfunc PyTypeObject.tp_repr`
- `PyNumberMethods *PyTypeObject.tp_as_number`
- `PySequenceMethods *PyTypeObject.tp_as_sequence`
- `PyMappingMethods *PyTypeObject.tp_as_mapping`
- `hashfunc PyTypeObject.tp_hash`
- `ternaryfunc PyTypeObject.tp_call`
- `reprfunc PyTypeObject.tp_str`
- `getattrofunc PyTypeObject.tp_getattro`
- `setattrofunc PyTypeObject.tp_setattro`
- `PyBufferProcs *PyTypeObject.tp_as_buffer`
- `unsigned long PyTypeObject.tp_flags`
- `const char *PyTypeObject.tp_doc`
- `traverseproc PyTypeObject.tp_traverse`
- `inquiry PyTypeObject.tp_clear`
- `richcmpfunc PyTypeObject.tp_richcompare`
- `Py_ssize_t PyTypeObject.tp_weaklistoffset`
- `getiterfunc PyTypeObject.tp_iter`
- `iternextfunc PyTypeObject.tp_iternext`
- `struct PyMethodDef *PyTypeObject.tp_methods`
- `struct PyMemberDef *PyTypeObject.tp_members`
- `struct PyGetSetDef *PyTypeObject.tp_getset`
- `PyTypeObject *PyTypeObject.tp_base`
- `PyObject *PyTypeObject.tp_dict`
- `descrgetfunc PyTypeObject.tp_descr_get`
- `descrsetfunc PyTypeObject.tp_descr_set`
- `Py_ssize_t PyTypeObject.tp_dictoffset`
- `initproc PyTypeObject.tp_init`
- `allocfunc PyTypeObject.tp_alloc`
- `newfunc PyTypeObject.tp_new`
- `freefunc PyTypeObject.tp_free`
- `PyObject *PyTypeObject.tp_bases`
- `PyObject *PyTypeObject.tp_mro`
- `PyObject *PyTypeObject.tp_subclasses`

## Static Types

Traditionally, types defined in C code are static, that is, a static PyTypeObject structure is defined directly in code and initialized using `PyType_Ready()`

- Static types are limited to one base, i.e. they cannot use multiple inheritance.
- Static type objects (but not necessarily their instances) are immutable. It is not possible to add or modify the type object’s attributes from Python.
- Static type objects are shared across sub-interpreters, so they should not include any subinterpreter-specific state.

## Heap Types

An alternative to static types is heap-allocated types, or heap types for short, which correspond closely to classes created by Python’s class statement. Heap types have the `Py_TPFLAGS_HEAPTYPE` flag set.

This is done by filling a `PyType_Spec` structure and calling `PyType_FromSpec()`, PyType_FromSpecWithBases(), or PyType_FromModuleAndSpec().

## Number Object Structures

```c title="type PyNumberMethods"
typedef struct {
     binaryfunc nb_add;
     binaryfunc nb_subtract;
     binaryfunc nb_multiply;
     binaryfunc nb_remainder;
     binaryfunc nb_divmod;
     ternaryfunc nb_power;
     unaryfunc nb_negative;
     unaryfunc nb_positive;
     unaryfunc nb_absolute;
     inquiry nb_bool;
     unaryfunc nb_invert;
     binaryfunc nb_lshift;
     binaryfunc nb_rshift;
     binaryfunc nb_and;
     binaryfunc nb_xor;
     binaryfunc nb_or;
     unaryfunc nb_int;
     void *nb_reserved;
     unaryfunc nb_float;

     binaryfunc nb_inplace_add;
     binaryfunc nb_inplace_subtract;
     binaryfunc nb_inplace_multiply;
     binaryfunc nb_inplace_remainder;
     ternaryfunc nb_inplace_power;
     binaryfunc nb_inplace_lshift;
     binaryfunc nb_inplace_rshift;
     binaryfunc nb_inplace_and;
     binaryfunc nb_inplace_xor;
     binaryfunc nb_inplace_or;

     binaryfunc nb_floor_divide;
     binaryfunc nb_true_divide;
     binaryfunc nb_inplace_floor_divide;
     binaryfunc nb_inplace_true_divide;

     unaryfunc nb_index;

     binaryfunc nb_matrix_multiply;
     binaryfunc nb_inplace_matrix_multiply;
} PyNumberMethods;
```

## Mapping Object Structures

- `type PyMappingMethods`
- `lenfunc PyMappingMethods.mp_length`
- `binaryfunc PyMappingMethods.mp_subscript`
- `objobjargproc PyMappingMethods.mp_ass_subscript`

## Sequence Object Structures

- `type PySequenceMethods`

## Buffer Object Structures

- `type PyBufferProcs`

## Async Object Structures

- `type PyAsyncMethods`

## Slot Type typedefs

- `typedef PyObject *(*allocfunc)(PyTypeObject *cls, Py_ssize_t nitems)`
- `typedef void (*destructor)(PyObject*)`
- `typedef void (*freefunc)(void*)`
- `typedef PyObject *(*newfunc)(PyObject*, PyObject*, PyObject*)`
- `typedef int (*initproc)(PyObject*, PyObject*, PyObject*)`
- `typedef PyObject *(*reprfunc)(PyObject*)`
- `typedef PyObject *(*getattrfunc)(PyObject *self, char *attr)`
- `typedef int (*setattrfunc)(PyObject *self, char *attr, PyObject *value)`
- `typedef PyObject *(*getattrofunc)(PyObject *self, PyObject *attr)`
- `typedef int (*setattrofunc)(PyObject *self, PyObject *attr, PyObject *value)`
- `typedef PyObject *(*descrgetfunc)(PyObject*, PyObject*, PyObject*)`
- `typedef int (*descrsetfunc)(PyObject*, PyObject*, PyObject*)`
- `typedef Py_hash_t (*hashfunc)(PyObject*)`
- `typedef PyObject *(*richcmpfunc)(PyObject*, PyObject*, int)`
- `typedef PyObject *(*getiterfunc)(PyObject*)`
- `typedef PyObject *(*iternextfunc)(PyObject*)`
- `typedef Py_ssize_t (*lenfunc)(PyObject*)`
- `typedef int (*getbufferproc)(PyObject*, Py_buffer*, int)`
- `typedef void (*releasebufferproc)(PyObject*, Py_buffer*)`
- `typedef PyObject *(*unaryfunc)(PyObject*)`
- `typedef PyObject *(*binaryfunc)(PyObject*, PyObject*)`
- `typedef PySendResult (*sendfunc)(PyObject*, PyObject*, PyObject**)`
- `typedef PyObject *(*ternaryfunc)(PyObject*, PyObject*, PyObject*)`
- `typedef PyObject *(*ssizeargfunc)(PyObject*, Py_ssize_t)`
- `typedef int (*ssizeobjargproc)(PyObject*, Py_ssize_t, PyObject*)`
- `typedef int (*objobjproc)(PyObject*, PyObject*)`
- `typedef int (*objobjargproc)(PyObject*, PyObject*, PyObject*)`
