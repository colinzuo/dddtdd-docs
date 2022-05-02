---
sidebar_position: 600
title: Including files in source distributions with MANIFEST.in
---

When building a source distribution for your package, by default only a minimal set of files are included.

## How files are included in an sdist

- all Python source files implied by the **py_modules and packages** setup() arguments

- all C source files mentioned in the **ext_modules or libraries** setup() arguments

- scripts specified by the scripts setup() argument

- all files specified by the package_data and data_files setup() arguments

- the file specified by the license_file option in setup.cfg (setuptools 40.8.0+)

- all files specified by the license_files option in setup.cfg (setuptools 42.0.0+)

- all files matching the pattern test/test*.py

- setup.py (or whatever you called your setup script)

- setup.cfg

- README

- README.txt

- README.rst (Python 3.7+ or setuptools 0.6.27+)

- README.md (setuptools 36.4.0+)

- pyproject.toml (setuptools 43.0.0+)

- MANIFEST.in

After processing the MANIFEST.in file, setuptools removes the build/ directory as well as any directories named RCS, CVS, or .svn from the sdist, and it adds a **PKG-INFO file and an *.egg-info** directory.


