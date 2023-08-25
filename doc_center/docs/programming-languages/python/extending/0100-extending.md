
<https://docs.python.org/3.11/extending/extending.html>

The Python API is incorporated in a C source file by including the header `"Python.h"`.

Since Python may define some pre-processor definitions which affect the standard headers on some systems, you must include Python.h before any standard headers are included.
It is recommended to always define PY_SSIZE_T_CLEAN before including Python.h.

All user-visible symbols defined by Python.h have a prefix of Py or PY

There is a straightforward translation from the argument list in Python (for example, the single expression "ls -l") to the arguments passed to the C function. **The C function always has two arguments, conventionally named self and args.**

The self argument points to the `module object` for module-level functions; for a method it would point to the `object instance`.

The args argument will be a pointer to a Python tuple object containing the arguments.

```c
static PyObject *
spam_system(PyObject *self, PyObject *args)
{
    const char *command;
    int sts;

    if (!PyArg_ParseTuple(args, "s", &command))
        return NULL;
    sts = system(command);
    return PyLong_FromLong(sts);
}
```

## Intermezzo: Errors and Exceptions

An important convention throughout the Python interpreter is the following: when a function fails, it should set an exception condition and return an error value (usually -1 or a NULL pointer). **Exception information is stored in three members of the interpreter’s thread state**. These are NULL if there is no exception. Otherwise they are the C equivalents of the members of the Python tuple returned by `sys.exc_info()`. These are the exception type, exception instance, and a traceback object. It is important to know about them to understand how errors are passed around.

The Python API defines a number of functions to set various types of exceptions.

The most common one is `PyErr_SetString()`. Its arguments are an exception object and a C string.

Another useful function is `PyErr_SetFromErrno()`, which only takes an exception argument and constructs the associated value by inspection of the global variable errno. The most general function is `PyErr_SetObject()`, which takes two object arguments, the exception and its associated value. You don’t need to `Py_INCREF()` the objects passed to any of these functions

You can test non-destructively whether an exception has been set with `PyErr_Occurred()`.

To ignore an exception set by a function call that failed, the exception condition must be cleared explicitly by calling `PyErr_Clear()`.

Every failing `malloc()` call must be turned into an exception — the direct caller of malloc() (or realloc()) must call `PyErr_NoMemory()` and return a failure indicator itself.

Finally, be careful to clean up garbage (by making `Py_XDECREF()` or `Py_DECREF()` calls for objects you have already created) when you return an error indicator!

You can also define a new exception that is unique to your module. For this, you usually declare a static object variable at the beginning of your file:

`static PyObject *SpamError;`
and initialize it in your module’s initialization function (`PyInit_spam()`) with an exception object

```c
PyMODINIT_FUNC
PyInit_spam(void)
{
    PyObject *m;

    m = PyModule_Create(&spammodule);
    if (m == NULL)
        return NULL;

    SpamError = PyErr_NewException("spam.error", NULL, NULL);
    Py_XINCREF(SpamError);
    if (PyModule_AddObject(m, "error", SpamError) < 0) {
        Py_XDECREF(SpamError);
        Py_CLEAR(SpamError);
        Py_DECREF(m);
        return NULL;
    }

    return m;
}
```

## Back to the Example

`Py_None` is the C name for the special Python object None.

```c
Py_INCREF(Py_None);
return Py_None;
```

## The Module’s Method Table and Initialization Function

```c
static PyMethodDef SpamMethods[] = {
    ...
    {"system",  spam_system, METH_VARARGS,
     "Execute a shell command."},
    ...
    {NULL, NULL, 0, NULL}        /* Sentinel */
};
```

Note the third entry (METH_VARARGS). This is a flag telling the interpreter the calling convention to be used for the C function. It should normally always be `METH_VARARGS` or `METH_VARARGS | METH_KEYWORDS`; 

When using only METH_VARARGS, the function should expect the Python-level parameters to be passed in as a tuple acceptable for parsing via `PyArg_ParseTuple()`;

The `METH_KEYWORDS` bit may be set in the third field if keyword arguments should be passed to the function. In this case, the C function should accept a **third PyObject * parameter which will be a dictionary of keywords**. Use `PyArg_ParseTupleAndKeywords()` to parse the arguments to such a function

The method table must be referenced in the module definition structure

```c
static struct PyModuleDef spammodule = {
    PyModuleDef_HEAD_INIT,
    "spam",   /* name of module */
    spam_doc, /* module documentation, may be NULL */
    -1,       /* size of per-interpreter state of the module,
                 or -1 if the module keeps state in global variables. */
    SpamMethods
};
```

This structure, in turn, must be passed to the interpreter in the module’s initialization function. The initialization function must be named `PyInit_name()`, where name is the name of the module, and should be the **only non-static item** defined in the module file

```c
PyMODINIT_FUNC
PyInit_spam(void)
{
    return PyModule_Create(&spammodule);
}
```

When the Python program imports module spam for the first time, `PyInit_spam()` is called. (See below for comments about embedding Python.) It calls `PyModule_Create()`, which returns a **module object**, and inserts built-in function objects into the newly created module based upon the table (an array of `PyMethodDef` structures) found in the module definition. PyModule_Create() returns a pointer to the module object that it creates. It may abort with a fatal error for certain errors, or return NULL if the module could not be initialized satisfactorily. The init function must return the module object to its caller, so that it then gets inserted into `sys.modules`.

## Calling Python Functions from C

```c
static PyObject *my_callback = NULL;

static PyObject *
my_set_callback(PyObject *dummy, PyObject *args)
{
    PyObject *result = NULL;
    PyObject *temp;

    if (PyArg_ParseTuple(args, "O:set_callback", &temp)) {
        if (!PyCallable_Check(temp)) {
            PyErr_SetString(PyExc_TypeError, "parameter must be callable");
            return NULL;
        }
        Py_XINCREF(temp);         /* Add a reference to new callback */
        Py_XDECREF(my_callback);  /* Dispose of previous callback */
        my_callback = temp;       /* Remember new callback */
        /* Boilerplate to return "None" */
        Py_INCREF(Py_None);
        result = Py_None;
    }
    return result;
}
```

Later, when it is time to call the function, you call the C function `PyObject_CallObject()`. This function has two arguments, both pointers to arbitrary Python objects: **the Python function, and the argument list**

`Py_BuildValue()` returns a tuple when its format string consists of zero or more format codes between parentheses

```c
int arg;
PyObject *arglist;
PyObject *result;
...
arg = 123;
...
/* Time to call the callback */
arglist = Py_BuildValue("(i)", arg);
result = PyObject_CallObject(my_callback, arglist);
Py_DECREF(arglist);
```

The return value of `PyObject_CallObject()` is “new”: either it is a brand new object, or it is an existing object whose reference count has been incremented. So, unless you want to save it in a global variable, you should somehow `Py_DECREF()` the result, even (especially!) if you are not interested in its value

```c
if (result == NULL)
    return NULL; /* Pass error back */
...use result...
Py_DECREF(result);
```

You may also call a function with keyword arguments by using `PyObject_Call()`, which supports arguments and keyword arguments

```c
PyObject *dict;
...
dict = Py_BuildValue("{s:i}", "name", val);
result = PyObject_Call(my_callback, NULL, dict);
Py_DECREF(dict);
if (result == NULL)
    return NULL; /* Pass error back */
/* Here maybe use the result */
Py_DECREF(result);
```

## Extracting Parameters in Extension Functions

`int PyArg_ParseTuple(PyObject *arg, const char *format, ...);`

The arg argument must be a **tuple object** containing an argument list passed from Python to a C function. The format argument must be a **format string**, whose syntax is explained in **Parsing arguments and building values** in the Python/C API Reference Manual. The remaining arguments must be addresses of variables whose type is determined by the format string.

## Keyword Parameters for Extension Functions

```c
int PyArg_ParseTupleAndKeywords(PyObject *arg, PyObject *kwdict,
                                const char *format, char *kwlist[], ...);
```                                

The kwlist parameter is a NULL-terminated list of strings which identify the parameters; the names are matched with the type information from format from left to right

## Building Arbitrary Values

`PyObject *Py_BuildValue(const char *format, ...);`

`Py_BuildValue()` does not always build a tuple. It builds a tuple only if its format string contains two or more format units. If the format string is empty, it returns None; if it contains exactly one format unit, it returns whatever object is described by that format unit

## Reference Counts

While Python uses the traditional reference counting implementation, it also offers a cycle detector that works to detect reference cycles.

There are two macros, `Py_INCREF(x)` and `Py_DECREF(x)`, which handle the incrementing and decrementing of the reference count. **Py_DECREF() also frees the object when the count reaches zero**. For flexibility, it doesn’t call free() directly — rather, it makes a call **through a function pointer in the object’s type object**. For this purpose (and others), every object also contains a pointer to its type object.

There are three ways to dispose of an owned reference: pass it on, store it, or call Py_DECREF()

It is also possible to **borrow a reference** to an object. The borrower of a reference should not call Py_DECREF(). 

### Ownership Rules

When a C function is called from Python, it borrows references to its arguments from the caller. The caller owns a reference to the object, so the borrowed reference’s lifetime is guaranteed until the function returns

The object reference returned from a C function that is called from Python must be an owned reference — ownership is transferred from the function to its caller

### Thin Ice

There are a few situations where seemingly harmless use of a borrowed reference can lead to problems. These all have to do with implicit invocations of the interpreter, which can cause the owner of a reference to dispose of it

### NULL Pointers

n general, functions that take object references as arguments **do not expect you to pass them NULL pointers**, and will dump core (or cause later core dumps) if you do so. Functions that return object references generally **return NULL only to indicate that an exception occurred**

The macros `Py_INCREF()` and `Py_DECREF()` do not check for NULL pointers — however, their variants `Py_XINCREF()` and `Py_XDECREF()` do

The C function calling mechanism guarantees that the argument list passed to C functions (args in the examples) is never NULL — in fact it guarantees that it is always a tuple

## Providing a C API for an Extension Module

Python provides a special mechanism to pass C-level information (pointers) from one extension module to another one: **Capsules**. A Capsule is a Python data type which stores a pointer `(void*)`. Capsules can only be created and accessed via their C API, but they can be passed around like any other Python object

In particular, Capsules used to expose C APIs should be given a name following this convention

`modulename.attributename`

```c
PyMODINIT_FUNC
PyInit_spam(void)
{
    PyObject *m;
    static void *PySpam_API[PySpam_API_pointers];
    PyObject *c_api_object;

    m = PyModule_Create(&spammodule);
    if (m == NULL)
        return NULL;

    /* Initialize the C API pointer array */
    PySpam_API[PySpam_System_NUM] = (void *)PySpam_System;

    /* Create a Capsule containing the API pointer array's address */
    c_api_object = PyCapsule_New((void *)PySpam_API, "spam._C_API", NULL);

    if (PyModule_AddObject(m, "_C_API", c_api_object) < 0) {
        Py_XDECREF(c_api_object);
        Py_DECREF(m);
        return NULL;
    }

    return m;
}
```
