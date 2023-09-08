
<https://peps.python.org/pep-3121/>

## Specification

```c
PyObject *PyInit_<modulename>()
```

The initialization routine will be invoked once per interpreter, when the module is imported. It should return a new module object each time.

```c
struct PyModuleDef{
  PyModuleDef_Base m_base;  /* To be filled out by the interpreter */
  Py_ssize_t m_size; /* Size of per-module data */
  PyMethodDef *m_methods;
  inquiry m_reload;
  traverseproc m_traverse;
  inquiry m_clear;
  freefunc m_free;
};
```


