---
title: Codec registry and support functions
---

- `int PyCodec_Register(PyObject *search_function)`
- `int PyCodec_Unregister(PyObject *search_function)`
- `int PyCodec_KnownEncoding(const char *encoding)`
- `PyObject *PyCodec_Encode(PyObject *object, const char *encoding, const char *errors)`
- `PyObject *PyCodec_Decode(PyObject *object, const char *encoding, const char *errors)`

## Codec lookup API

- `PyObject *PyCodec_Encoder(const char *encoding)`
- `PyObject *PyCodec_Decoder(const char *encoding)`
- `PyObject *PyCodec_IncrementalEncoder(const char *encoding, const char *errors)`
- `PyObject *PyCodec_IncrementalDecoder(const char *encoding, const char *errors)`
- `PyObject *PyCodec_StreamReader(const char *encoding, PyObject *stream, const char *errors)`
- `PyObject *PyCodec_StreamWriter(const char *encoding, PyObject *stream, const char *errors)`

## Registry API for Unicode encoding error handlers

- `int PyCodec_RegisterError(const char *name, PyObject *error)`
- `PyObject *PyCodec_LookupError(const char *name)`
- `PyObject *PyCodec_StrictErrors(PyObject *exc)`
- `PyObject *PyCodec_IgnoreErrors(PyObject *exc)`
- `PyObject *PyCodec_ReplaceErrors(PyObject *exc)`
- `PyObject *PyCodec_BackslashReplaceErrors(PyObject *exc)`
- 
