---
title: Packaging and distributing projects
---

<https://packaging.python.org/en/latest/guides/distributing-packages-using-setuptools/>

## Requirements for packaging and distributing

```bash
python3 -m pip install twine
```

## Configuring your project

[PyPA sample project](https://github.com/pypa/sampleproject)

### Initial files

#### setup.py
- The primary feature of setup.py is that it contains a global setup() function
- It’s the command line interface for running various commands that relate to packaging tasks. To get a listing of available commands, run `python setup.py --help-commands`

#### README.md

#### MANIFEST.in

A MANIFEST.in is needed when you need to package additional files that are not automatically included in a **source distribution**.

MANIFEST.in does not affect **binary distributions such as wheels**.

#### LICENSE.txt

#### `<your package>`

#### setup() args

- name
- version
- description
- url
- author
- license
- classifiers
- keywords
- project_urls
- packages
- py_modules
- install_requires
- python_requires
- package_data
- data_files
- scripts
- entry_scripts
- console_scripts

## Working in “development mode”

```
python -m pip install -e .
```

## Packaging your project

A “source distribution” is unbuilt (i.e. it’s not a Built Distribution), and requires a build step when installed by pip. Even if the distribution is pure Python (i.e. contains no extensions), it still involves a build step to build out the installation metadata from setup.py and/or setup.cfg.

A wheel is a built package that can be installed without needing to go through the “build” process.

```
python3 -m pip install build

python3 -m build --sdist

python -m build --wheel

twine upload dist/*
```
