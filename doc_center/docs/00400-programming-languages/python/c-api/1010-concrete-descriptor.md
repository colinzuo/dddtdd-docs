---
title: Descriptor Objects
---

“Descriptors” are objects that describe some attribute of an object. They are found in the **dictionary of type objects**

- `PyTypeObject PyProperty_Type`
- `PyObject *PyDescr_NewGetSet(PyTypeObject *type, struct PyGetSetDef *getset)`
- `PyObject *PyDescr_NewMember(PyTypeObject *type, struct PyMemberDef *meth)`
- `PyObject *PyDescr_NewMethod(PyTypeObject *type, struct PyMethodDef *meth)`
- `PyObject *PyDescr_NewWrapper(PyTypeObject *type, struct wrapperbase *wrapper, void *wrapped)`
- `PyObject *PyDescr_NewClassMethod(PyTypeObject *type, PyMethodDef *method)`
- `int PyDescr_IsData(PyObject *descr)`
- `PyObject *PyWrapper_New(PyObject*, PyObject*)`
