---
sidebar_position: 100
title: Installing Packages
---

<https://packaging.python.org/en/latest/tutorials/installing-packages/>

## Ensure you can run Python from the command line

```bash
python3 --version
```

## Ensure you can run pip from the command line

```bash
python3 -m pip --version
```


## Ensure pip, setuptools, and wheel are up to date

```bash
python3 -m pip install --upgrade pip setuptools wheel
```

## Optionally, create a virtual environment

```bash
python3 -m venv tutorial_env
tutorial_env\Scripts\activate
```

## Creating Virtual Environments

venv is available by default in Python 3.3 and later, and installs pip and setuptools into created virtual environments in Python 3.4 and later

Managing multiple virtual environments directly can become tedious, so the dependency management tutorial introduces a higher level tool, **Pipenv**, that automatically manages a separate virtual environment for each project and application that you work on

## Installing from PyPI

```bash
python3 -m pip install "SomeProject~=1.4.2"
```

## Source Distributions vs Wheels

Wheels are a pre-built distribution format that provides faster installation compared to Source Distributions (sdist), especially when a project contains compiled extensions.

## Upgrading packages

```
py -m pip install --upgrade SomeProject
```

## Installing from a local src tree

```
py -m pip install -e <path>
```
