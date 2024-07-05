---
title: Unicode Objects and Codecs
---

## Unicode Objects

### Unicode Type

- `type Py_UCS4`
- `type Py_UCS2`
- `type Py_UCS1`
- `type Py_UNICODE`
- `type PyASCIIObject`
- `type PyCompactUnicodeObject`
- `type PyUnicodeObject`
- `PyTypeObject PyUnicode_Type`

- `int PyUnicode_Check(PyObject *o)`
- `int PyUnicode_CheckExact(PyObject *o)`
- `int PyUnicode_READY(PyObject *o)`
- `Py_ssize_t PyUnicode_GET_LENGTH(PyObject *o)`
- `Py_UCS1 *PyUnicode_1BYTE_DATA(PyObject *o)`
- `Py_UCS2 *PyUnicode_2BYTE_DATA(PyObject *o)`
- `Py_UCS4 *PyUnicode_4BYTE_DATA(PyObject *o)`
- `PyUnicode_WCHAR_KIND`
- `PyUnicode_1BYTE_KIND`
- `PyUnicode_2BYTE_KIND`
- `PyUnicode_4BYTE_KIND`
- `int PyUnicode_KIND(PyObject *o)`
- `void *PyUnicode_DATA(PyObject *o)`
- `void PyUnicode_WRITE(int kind, void *data, Py_ssize_t index, Py_UCS4 value)`
- `Py_UCS4 PyUnicode_READ(int kind, void *data, Py_ssize_t index)`
- `Py_UCS4 PyUnicode_READ_CHAR(PyObject *o, Py_ssize_t index)`
- `Py_UCS4 PyUnicode_MAX_CHAR_VALUE(PyObject *o)`
- `Py_ssize_t PyUnicode_GET_SIZE(PyObject *o)`
- `Py_ssize_t PyUnicode_GET_DATA_SIZE(PyObject *o)`
- `Py_UNICODE *PyUnicode_AS_UNICODE(PyObject *o)`
- `const char *PyUnicode_AS_DATA(PyObject *o)`
- `int PyUnicode_IsIdentifier(PyObject *o)`

### Unicode Character Properties

- `int Py_UNICODE_ISSPACE(Py_UCS4 ch)`
- `int Py_UNICODE_ISLOWER(Py_UCS4 ch)`
- `int Py_UNICODE_ISUPPER(Py_UCS4 ch)`
- `int Py_UNICODE_ISTITLE(Py_UCS4 ch)`
- `int Py_UNICODE_ISLINEBREAK(Py_UCS4 ch)`
- `int Py_UNICODE_ISDECIMAL(Py_UCS4 ch)`
- `int Py_UNICODE_ISDIGIT(Py_UCS4 ch)`
- `int Py_UNICODE_ISNUMERIC(Py_UCS4 ch)`
- `int Py_UNICODE_ISALPHA(Py_UCS4 ch)`
- `int Py_UNICODE_ISALNUM(Py_UCS4 ch)`
- `int Py_UNICODE_ISPRINTABLE(Py_UCS4 ch)`

- `Py_UCS4 Py_UNICODE_TOLOWER(Py_UCS4 ch)`
- `Py_UCS4 Py_UNICODE_TOUPPER(Py_UCS4 ch)`
- `Py_UCS4 Py_UNICODE_TOTITLE(Py_UCS4 ch)`
- `int Py_UNICODE_TODECIMAL(Py_UCS4 ch)`
- `int Py_UNICODE_TODIGIT(Py_UCS4 ch)`
- `double Py_UNICODE_TONUMERIC(Py_UCS4 ch)`

- `Py_UNICODE_IS_SURROGATE(ch)`
- `Py_UNICODE_IS_HIGH_SURROGATE(ch)`
- `Py_UNICODE_IS_LOW_SURROGATE(ch)`
- `Py_UNICODE_JOIN_SURROGATES(high, low)`

### Creating and accessing Unicode strings

- `PyObject *PyUnicode_New(Py_ssize_t size, Py_UCS4 maxchar)`
- `PyObject *PyUnicode_FromKindAndData(int kind, const void *buffer, Py_ssize_t size)`
- `PyObject *PyUnicode_FromStringAndSize(const char *u, Py_ssize_t size)`
- `PyObject *PyUnicode_FromString(const char *u)`
- `PyObject *PyUnicode_FromFormat(const char *format, ...)`
- `PyObject *PyUnicode_FromFormatV(const char *format, va_list vargs)`
- `PyObject *PyUnicode_FromObject(PyObject *obj)`
- `PyObject *PyUnicode_FromEncodedObject(PyObject *obj, const char *encoding, const char *errors)`
- `Py_ssize_t PyUnicode_GetLength(PyObject *unicode)`
- `Py_ssize_t PyUnicode_CopyCharacters(PyObject *to, Py_ssize_t to_start, PyObject *from, Py_ssize_t from_start, Py_ssize_t how_many)`
- `Py_ssize_t PyUnicode_Fill(PyObject *unicode, Py_ssize_t start, Py_ssize_t length, Py_UCS4 fill_char)`
- `int PyUnicode_WriteChar(PyObject *unicode, Py_ssize_t index, Py_UCS4 character)`
- `Py_UCS4 PyUnicode_ReadChar(PyObject *unicode, Py_ssize_t index)`
- `PyObject *PyUnicode_Substring(PyObject *str, Py_ssize_t start, Py_ssize_t end)`
- `Py_UCS4 *PyUnicode_AsUCS4(PyObject *u, Py_UCS4 *buffer, Py_ssize_t buflen, int copy_null)`
- `Py_UCS4 *PyUnicode_AsUCS4Copy(PyObject *u)`

## Built-in Codecs

Setting encoding to NULL causes the default encoding to be used which is **UTF-8**

Error handling is set by errors which may also be set to NULL meaning to use the default handling defined for the codec. Default error handling for all built-in codecs is “strict” (`ValueError` is raised)

### Generic Codecs

- `PyObject *PyUnicode_Decode(const char *s, Py_ssize_t size, const char *encoding, const char *errors)`
- `PyObject *PyUnicode_AsEncodedString(PyObject *unicode, const char *encoding, const char *errors)`

### UTF-8 Codecs

- `PyObject *PyUnicode_DecodeUTF8(const char *s, Py_ssize_t size, const char *errors)`
- `PyObject *PyUnicode_DecodeUTF8Stateful(const char *s, Py_ssize_t size, const char *errors, Py_ssize_t *consumed)`
- `PyObject *PyUnicode_AsUTF8String(PyObject *unicode)`
- `const char *PyUnicode_AsUTF8AndSize(PyObject *unicode, Py_ssize_t *size)`
- `const char *PyUnicode_AsUTF8(PyObject *unicode)`

### Latin-1 Codecs

- `PyObject *PyUnicode_DecodeLatin1(const char *s, Py_ssize_t size, const char *errors)`
- `PyObject *PyUnicode_AsLatin1String(PyObject *unicode)`

### ASCII Codecs

- `PyObject *PyUnicode_DecodeASCII(const char *s, Py_ssize_t size, const char *errors)`
- `PyObject *PyUnicode_AsASCIIString(PyObject *unicode)`

## Methods and Slot Functions

- `PyObject *PyUnicode_Concat(PyObject *left, PyObject *right)`
- `PyObject *PyUnicode_Split(PyObject *s, PyObject *sep, Py_ssize_t maxsplit)`
- `PyObject *PyUnicode_Splitlines(PyObject *s, int keepend)`
- `PyObject *PyUnicode_Join(PyObject *separator, PyObject *seq)`
- `Py_ssize_t PyUnicode_Tailmatch(PyObject *str, PyObject *substr, Py_ssize_t start, Py_ssize_t end, int direction)`
- `Py_ssize_t PyUnicode_Find(PyObject *str, PyObject *substr, Py_ssize_t start, Py_ssize_t end, int direction)`
- `Py_ssize_t PyUnicode_FindChar(PyObject *str, Py_UCS4 ch, Py_ssize_t start, Py_ssize_t end, int direction)`
- `Py_ssize_t PyUnicode_Count(PyObject *str, PyObject *substr, Py_ssize_t start, Py_ssize_t end)`
- `PyObject *PyUnicode_Replace(PyObject *str, PyObject *substr, PyObject *replstr, Py_ssize_t maxcount)`
- `int PyUnicode_Compare(PyObject *left, PyObject *right)`
- `int PyUnicode_CompareWithASCIIString(PyObject *uni, const char *string)`
- `PyObject *PyUnicode_RichCompare(PyObject *left, PyObject *right, int op)`
- `PyObject *PyUnicode_Format(PyObject *format, PyObject *args)`
- `int PyUnicode_Contains(PyObject *container, PyObject *element)`
- `void PyUnicode_InternInPlace(PyObject **string)`
- `PyObject *PyUnicode_InternFromString(const char *v)`
