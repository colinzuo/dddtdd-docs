---
sidebar_position: 200
title: Installing stand alone command line tools
---

<https://packaging.python.org/en/latest/guides/installing-stand-alone-command-line-tools/>

```bash
python3 -m pip install --user pipx
python3 -m pipx ensurepath

pipx install PACKAGE
PACKAGE_APPLICATION [ARGS]

pipx upgrade PACKAGE
pipx uninstall PACKAGE

python3 -m pip install -U pipx
python3 -m pip uninstall pipx
```
