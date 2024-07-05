---
title: Python Initialization Configuration
---

## PyWideStringList

- `PyStatus PyWideStringList_Append(PyWideStringList *list, const wchar_t *item)`
- `PyStatus PyWideStringList_Insert(PyWideStringList *list, Py_ssize_t index, const wchar_t *item)`

## PyStatus

- `int exitcode`
- `const char *err_msg`
- `const char *func`
- `PyStatus PyStatus_Ok(void)`
- `PyStatus PyStatus_Error(const char *err_msg)`
- `PyStatus PyStatus_NoMemory(void)`
- `PyStatus PyStatus_Exit(int exitcode)`
- `int PyStatus_Exception(PyStatus status)`
- `int PyStatus_IsError(PyStatus status)`
- `int PyStatus_IsExit(PyStatus status)`
- `void Py_ExitStatusException(PyStatus status)`

## PyConfig

When done, the `PyConfig_Clear()` function must be used to release the configuration memory

- `void PyConfig_InitPythonConfig(PyConfig *config)`
- `void PyConfig_InitIsolatedConfig(PyConfig *config)`
- `PyStatus PyConfig_SetString(PyConfig *config, wchar_t *const *config_str, const wchar_t *str)`
- `PyStatus PyConfig_SetBytesString(PyConfig *config, wchar_t *const *config_str, const char *str)`
- `PyStatus PyConfig_SetArgv(PyConfig *config, int argc, wchar_t *const *argv)`
- `PyStatus PyConfig_SetBytesArgv(PyConfig *config, int argc, char *const *argv)`
- `PyStatus PyConfig_SetWideStringList(PyConfig *config, PyWideStringList *list, Py_ssize_t length, wchar_t **items)`
- `PyStatus PyConfig_Read(PyConfig *config)`
- `void PyConfig_Clear(PyConfig *config)`

## Initialization with PyConfig

- `PyStatus Py_InitializeFromConfig(const PyConfig *config)`

## Py_RunMain()

- `int Py_RunMain(void)`: Execute the command (`PyConfig.run_command`), the script (`PyConfig.run_filename`) or the module (`PyConfig.run_module`) specified on the command line or in the configuration

## Multi-Phase Initialization Private Provisional API

- “Core” initialization phase, “bare minimum Python”:
    + Builtin types;
    + Builtin exceptions;
    + Builtin and frozen modules;
    + The sys module is only partially initialized (ex: sys.path doesn’t exist yet).
- “Main” initialization phase, Python is fully initialized:
    + Install and configure importlib;
    + Apply the Path Configuration;
    + Install signal handlers;
    + Finish sys module initialization (ex: create sys.stdout and sys.path);
    + Enable optional features like faulthandler and tracemalloc;
    + Import the site module;
    + etc.
