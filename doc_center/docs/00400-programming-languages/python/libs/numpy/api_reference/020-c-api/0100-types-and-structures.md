# Python types and C-structures

## New Python types defined

There are two major new types: the `ndarray` ( `PyArray_Type` ) and the `ufunc` ( `PyUFunc_Type` )

### PyArray_Type and PyArrayObject

The Python type of the ndarray is `PyArray_Type`. In C, every ndarray is a pointer to a `PyArrayObject` structure. The `ob_type` member of this structure contains a pointer to the `PyArray_Type` typeobject

```cpp
typedef struct PyArrayObject {
    PyObject_HEAD
    char *data;
    int nd;
    npy_intp *dimensions;
    npy_intp *strides;
    PyObject *base;
    PyArray_Descr *descr;
    int flags;
    PyObject *weakreflist;
    /* version dependent private members */
} PyArrayObject;
```


