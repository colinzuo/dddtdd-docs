
## Modules with setuptools

[https://github.com/pybind/python_example](https://github.com/pybind/python_example)

```py
from glob import glob
from setuptools import setup
from pybind11.setup_helpers import Pybind11Extension, build_ext

ext_modules = [
    Pybind11Extension(
        "python_example",
        sorted(glob("src/*.cpp")),  # Sort source files for reproducibility
    ),
]

setup(..., cmdclass={"build_ext": build_ext}, ext_modules=ext_modules)
```

### Build requirements

```toml
[build-system]
requires = ["setuptools", "pybind11"]
build-backend = "setuptools.build_meta"
```
