# Building C and C++ Extensions

<https://docs.python.org/3.11/extending/building.html>

A C extension for CPython is a **shared library** (e.g. a `.so` file on Linux, `.pyd` on Windows), which exports an initialization function.

To be importable, the shared library must be available on PYTHONPATH, and **must be named after the module name, with an appropriate extension**

## Building C and C++ Extensions with distutils

```shell
python setup.py build
```

```python
from distutils.core import setup, Extension

module1 = Extension('demo',
                    define_macros = [('MAJOR_VERSION', '1'),
                                     ('MINOR_VERSION', '0')],
                    include_dirs = ['/usr/local/include'],
                    libraries = ['tcl83'],
                    library_dirs = ['/usr/local/lib'],
                    sources = ['demo.c'])
```                    


