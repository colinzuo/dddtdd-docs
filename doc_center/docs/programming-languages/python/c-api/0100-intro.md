
<https://docs.python.org/3.11/c-api/intro.html>

There are **two fundamentally different reasons** for using the Python/C API. The first reason is to **write extension modules** for specific purposes; these are C modules that extend the Python interpreter. This is probably the most common use. The second reason is to use Python as a component in a larger application; this technique is generally referred to as **embedding Python** in an application.

## Coding standards

<https://peps.python.org/pep-0007/>

## Include Files

```c
#define PY_SSIZE_T_CLEAN
#include <Python.h>
```

All user visible names defined by Python.h (except those defined by the included standard headers) have one of the prefixes **Py or _Py**. Names beginning with **_Py are for internal use** by the Python implementation and should not be used by extension writers

## Useful macros

- `Py_UNREACHABLE()`
- `Py_UNUSED(arg)`

## Objects, Types and Reference Counts

PyObject*. This type is a pointer to an opaque data type representing an arbitrary Python object.

Almost all Python objects live on the heap

Reference counts are always manipulated explicitly. The normal way is to use the macro `Py_INCREF()` to increment an object’s reference count by one, and `Py_DECREF()` to decrement it by one. 

The type-specific deallocator takes care of **decrementing the reference counts for other objects contained in the object** if this is a compound object type, such as a list, as well as performing any additional finalization that’s needed. 

An important situation where this arises is in objects that are passed as arguments to C functions in an extension module that are called from Python; **the call mechanism guarantees to hold a reference to every argument for the duration of the call**.

A safe approach is to always use the generic operations (functions whose name begins with **PyObject_, PyNumber_, PySequence_ or PyMapping_**). These operations **always increment** the reference count of the object they return. This leaves the caller with the responsibility to call Py_DECREF() when they are done with the result; this soon becomes second nature

### Reference Count Details

Ownership pertains to references, never to objects (objects are not owned: they are always shared). 

“Owning a reference” means being responsible for calling Py_DECREF on it when the reference is no longer needed. 

Ownership can also be transferred, meaning that the code that receives ownership of the reference then becomes responsible for eventually decref’ing it by calling Py_DECREF() or Py_XDECREF() when it’s no longer needed—or passing on this responsibility (usually to its caller). 

When a function passes ownership of a reference on to its caller, the caller is said to receive a new reference. 

When no ownership is transferred, the caller is said to borrow the reference. Nothing needs to be done for a borrowed reference.

Conversely, when a calling function passes in a reference to an object, there are two possibilities: the function **steals a reference to the object, or it does not**. Stealing a reference means that when you pass a reference to a function, that function assumes that it now owns that reference, and you are not responsible for it any longer

Few functions steal references; the two notable exceptions are `PyList_SetItem()` and `PyTuple_SetItem()`, which steal a reference to the item

However, in practice, you will rarely use these ways of creating and populating a tuple or list. There’s a generic function, `Py_BuildValue()`, that can create most common objects from C values, directed by a format string

```c
PyObject *tuple, *list;

tuple = Py_BuildValue("(iis)", 1, 2, "three");
list = Py_BuildValue("[iis]", 1, 2, "three");
```

## Exceptions

In general, when a function encounters an error, it **sets an exception, discards any object references that it owns, and returns an error indicator**. If not documented otherwise, this indicator is **either NULL or -1**, depending on the function’s return type

Exception state is maintained in per-thread storage

- The function `PyErr_Occurred()` can be used to check for this
- There are a number of functions to set the exception state: `PyErr_SetString()` is the most common
- `PyErr_Clear()` clears the exception state

The full exception state consists of three objects (all of which can be NULL): **the exception type, the corresponding exception value, and the traceback**. These have the same meanings as the Python result of sys.exc_info(); however, they are not the same: the Python objects represent the last exception being handled by a Python try … except statement, while the C level exception state only exists while an exception is being passed on between C functions until it reaches the Python bytecode interpreter’s main loop, **which takes care of transferring it to sys.exc_info()** and friends

## Embedding Python

The basic initialization function is `Py_Initialize()`. This initializes the table of loaded modules, and creates the fundamental modules `builtins, __main__, and sys`. It also initializes the module search path (sys.path)

