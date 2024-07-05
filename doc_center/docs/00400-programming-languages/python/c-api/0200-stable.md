---
title: C API Stability
---

[https://docs.python.org/3.11/c-api/stable.html](https://docs.python.org/3.11/c-api/stable.html)


CPython’s **Application Binary Interface (ABI)** is forward- and backwards-compatible across a minor release (if these are compiled the same way; see Platform Considerations below). So, code compiled for Python 3.10.0 will work on 3.10.8 and vice versa, but will need to be compiled separately for 3.9.x and 3.10.x

## Stable Application Binary Interface

Python provides a Stable ABI: a set of symbols that will remain compatible **across Python 3.x** versions

Define `Py_LIMITED_API` to the value of `PY_VERSION_HEX` corresponding to the lowest Python version your extension supports

