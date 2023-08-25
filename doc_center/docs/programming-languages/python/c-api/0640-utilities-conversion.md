---
title: String conversion and formatting
---

- `int PyOS_snprintf(char *str, size_t size, const char *format, ...)`
- `int PyOS_vsnprintf(char *str, size_t size, const char *format, va_list va)`

- `double PyOS_string_to_double(const char *s, char **endptr, PyObject *overflow_exception)`
- `char *PyOS_double_to_string(double val, char format_code, int precision, int flags, int *ptype)`
- `int PyOS_stricmp(const char *s1, const char *s2)`
- `int PyOS_strnicmp(const char *s1, const char *s2, Py_ssize_t size)`
