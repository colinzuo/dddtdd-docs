
## Abstract

Each virtual environment has its own Python binary (allowing creation of environments with various Python versions) and can have its own independent set of installed Python packages in its site directories, but shares the standard library with the base installed Python

## Motivation

Virtualenv must copy the binary in order to provide isolation, as Python dereferences a symlinked executable before searching for sys.prefix.

## Specification

This PEP proposes to add a new first step to this search. If a `pyvenv.cfg` file is found either adjacent to the Python executable or one directory above it (if the executable is a symlink, it is **not dereferenced**), this file is scanned for lines of the form key = value. If a home key is found, this signifies that the Python binary belongs to a virtual environment, and the value of the home key is the directory containing the Python executable used to create this virtual environment

In this case, prefix-finding continues as normal using the value of the home key as the effective Python binary location, which finds the prefix of the base installation. `sys.base_prefix` is set to this value, while `sys.prefix` is set to the directory containing pyvenv.cfg.

The site and sysconfig standard-library modules are modified such that the standard library and header files are found relative to `sys.base_prefix / sys.base_exec_prefix`, while site-package directories (“purelib” and “platlib”, in sysconfig terms) are still found relative to `sys.prefix / sys.exec_prefix`

Thus, a Python virtual environment in its simplest form would consist of nothing more than a **copy or symlink of the Python binary accompanied by a pyvenv.cfg file and a site-packages directory**

### Isolation from system site-packages

If the `pyvenv.cfg` file also contains a key `include-system-site-packages` with a value of true (not case sensitive), the site module will also add the system site directories to `sys.path` after the virtual environment site directories.

### Creating virtual environments

This PEP also proposes adding a new `venv` module to the standard library which implements the creation of virtual environments


