
[https://peps.python.org/pep-0518/](https://peps.python.org/pep-0518/)

## Abstract

This PEP specifies how Python software packages should **specify what build dependencies** they have in order to execute their chosen build system. As part of this specification, **a new configuration file** is introduced for software packages to use to specify their build dependencies

## Specification

### File Format

The build system dependencies will be stored in a file named **pyproject.toml** that is written in the TOML format

### build-system table

The `[build-system]` table is used to store build-related data. Initially only one key of the table will be valid and is mandatory for the table: `requires`

```toml
[build-system]
# Minimum requirements for the build system to execute.
requires = ["setuptools", "wheel"]  # PEP 508 specifications.
```

### tool table

The `[tool]` table is where any tool related to your Python project, not just build tools, can have users specify configuration data as long as they use a **sub-table** within `[tool]`, e.g. the flit tool would store its configuration in `[tool.flit]`


