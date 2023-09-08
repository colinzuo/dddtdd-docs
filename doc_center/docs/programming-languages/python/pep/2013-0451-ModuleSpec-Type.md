
<https://peps.python.org/pep-0451/>

## Terms and Concepts

- `name`
- `finder`
- `loader`
- `origin`
- `location`
- `cache`
- `package`

## Specification

- `importlib.machinery.ModuleSpec (new)`
- `importlib.util Additions`
- `Responsibilities`
    + `finders`
    create/identify a loader that can load the module.
    create the spec for the module.

    + `loaders`
    create the module (optional).
    execute the module.

    + `ModuleSpec`
    orchestrate module loading
    boilerplate for module loading, including managing sys.modules and setting import-related attributes
    create module if loader doesn’t
    call loader.exec_module(), passing in the module in which to exec
    contain all the information the loader needs to exec the module
    provide the repr for modules

## How Loading Will Work

```python
module = None
if spec.loader is not None and hasattr(spec.loader, 'create_module'):
    module = spec.loader.create_module(spec)
if module is None:
    module = ModuleType(spec.name)
# The import-related module attributes get set here:
_init_module_attrs(spec, module)

if spec.loader is None and spec.submodule_search_locations is not None:
    # Namespace package
    sys.modules[spec.name] = module
elif not hasattr(spec.loader, 'exec_module'):
    spec.loader.load_module(spec.name)
    # __loader__ and __package__ would be explicitly set here for
    # backwards-compatibility.
else:
    sys.modules[spec.name] = module
    try:
        spec.loader.exec_module(module)
    except BaseException:
        try:
            del sys.modules[spec.name]
        except KeyError:
            pass
        raise
module_to_return = sys.modules[spec.name]
```


