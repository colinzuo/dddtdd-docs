
<https://docs.python.org/3/tutorial/modules.html>

## The Module Search Path

sys.path is initialized from these locations:

- The directory containing the input script (or the current directory when no file is specified).

- PYTHONPATH (a list of directory names, with the same syntax as the shell variable PATH).

- The installation-dependent default (by convention including a site-packages directory, handled by the site module).

## The `dir()` Function

```
>>> a = [1, 2, 3, 4, 5]
>>> import fibo
>>> fib = fibo.fib
>>> dir()
['__builtins__', '__name__', 'a', 'fib', 'fibo', 'sys']
```

## Packages

```python
import sound.effects.echo

sound.effects.echo.echofilter(input, output, delay=0.7, atten=4)

from sound.effects import echo
```

### Importing * From a Package

if a package’s `__init__.py` code defines a list named `__all__`, it is taken to be the list of module names that should be imported when from package import * is encountered.

```python
__all__ = ["echo", "surround", "reverse"]
```

If `__all__` is not defined, the statement from sound.effects import * does not import all submodules from the package sound.effects into the current namespace; it only ensures that the package sound.effects has been imported (possibly running any initialization code in `__init__.py`) and then imports whatever names are defined in the package. This includes any names defined (and submodules explicitly loaded) by `__init__.py`. It also includes any submodules of the package that were explicitly loaded by previous import statements

