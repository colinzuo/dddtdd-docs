---
title: Packaging Python Projects
---

## A simple project

```
packaging_tutorial/
└── src/
    └── example_package/
        ├── __init__.py
        └── example.py
```

## Creating the package files

```
packaging_tutorial/
├── LICENSE
├── pyproject.toml
├── README.md
├── setup.cfg
├── src/
│   └── example_package/
│       ├── __init__.py
│       └── example.py
└── tests/
```

### Creating a test directory

### Creating pyproject.toml

[https://peps.python.org/pep-0518/](https://peps.python.org/pep-0518/)

```
[build-system]
requires = ["setuptools>=42"]
build-backend = "setuptools.build_meta"
```

### Configuring metadata

- Static metadata (setup.cfg)
- Dynamic metadata (setup.py)

Static metadata (setup.cfg) should be preferred. Dynamic metadata (setup.py) should be used only as an escape hatch when absolutely necessary. setup.py used to be required, but can be omitted with newer versions of setuptools and pip

```
import setuptools

with open("README.md", "r", encoding="utf-8") as fh:
    long_description = fh.read()

setuptools.setup(
    name="example-package-YOUR-USERNAME-HERE",
    version="0.0.1",
    author="Example Author",
    author_email="author@example.com",
    description="A small example package",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/pypa/sampleproject",
    project_urls={
        "Bug Tracker": "https://github.com/pypa/sampleproject/issues",
    },
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
    package_dir={"": "src"},
    packages=setuptools.find_packages(where="src"),
    python_requires=">=3.6",
)
```

### Including other files

The files listed above will be included automatically in your source distribution. If you want to control what goes in this explicitly, see Including files in source distributions with MANIFEST.in.

The final built distribution will have the Python files in the discovered or listed Python packages. If you want to control what goes here, such as to add data files, see Including Data Files from the setuptools docs.

## Generating distribution archives

```
python3 -m pip install --upgrade build

python3 -m build

dist/
  example-package-YOUR-USERNAME-HERE-0.0.1-py3-none-any.whl
  example-package-YOUR-USERNAME-HERE-0.0.1.tar.gz
```

The `tar.gz` file is a source distribution whereas the `.whl` file is a built distribution

You should always upload a source distribution and provide built distributions for the platforms your project is compatible with

## Uploading the distribution archives

```
python3 -m pip install --upgrade twine

python3 -m twine upload --repository testpypi dist/*

python3 -m pip install --index-url https://test.pypi.org/simple/ --no-deps example-package-YOUR-USERNAME-HERE
```
