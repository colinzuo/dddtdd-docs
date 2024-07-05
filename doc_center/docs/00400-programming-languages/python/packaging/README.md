---
sidebar_position: 1
title: 介绍
---

[https://packaging.python.org/en/latest/overview/](https://packaging.python.org/en/latest/overview/)

## The Packaging Flow

### The configuration file

At a minimum, the `pyproject.toml` file needs a `[build-system]` table specifying your build tool. There are many build tools available, including but not limited to flit, hatch, pdm, poetry, setuptools, trampolim, and whey.

[https://setuptools.pypa.io/en/latest/userguide/quickstart.html](https://setuptools.pypa.io/en/latest/userguide/quickstart.html)

```toml
[build-system]
requires = ["setuptools", "setuptools-scm"]
build-backend = "setuptools.build_meta"
```

### Build artifacts

```bash
python3 -m build --sdist source-tree-directory

python3 -m build --wheel source-tree-directory
```

### Upload to the package distribution service

```bash
twine upload dist/package-name-version.tar.gz dist/package-name-version-py3-none-any.whl
```

## Packaging Python libraries and tools

[Packaging and distributing projects](https://packaging.python.org/en/latest/guides/distributing-packages-using-setuptools/)

## Python binary distributions

Not all developers have the right tools or experiences to build these components written in these compiled languages, so Python created the Wheel, a package format designed to ship libraries with compiled artifacts.

## references

[Why you shouldn't invoke setup.py directly](https://blog.ganssle.io/articles/2021/10/setup-py-deprecated.html)
