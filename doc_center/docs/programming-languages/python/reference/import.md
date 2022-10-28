
<https://docs.python.org/3/reference/import.html>

The import statement combines two operations; it **searches** for the named module, then it **binds** the results of that search to a name in the local scope. The search operation of the import statement is defined as a call to the `__import__()` function, with the appropriate arguments.

When a module is first imported, Python searches for the module and if found, it creates a **module object**, initializing it.

## importlib

-  `importlib.import_module()`

## packages

It’s important to keep in mind that all packages are modules, but not all modules are packages. Or put another way, packages are just a special kind of module. Specifically, any module that contains a `__path__` attribute is considered a package.

## Searching

The first place checked during import search is sys.modules. This mapping serves as a cache of all modules that have been previously imported

Beware though, as if you keep a reference to the module object, invalidate its cache entry in sys.modules, and then re-import the named module, the two module objects will not be the same. By contrast, `importlib.reload()` will reuse the same module object, and simply reinitialise the module contents by rerunning the module’s code.

Python includes a number of default finders and importers. The first one knows how to locate **built-in modules**, and the second knows how to locate **frozen modules**. A third default finder searches an **import path** for modules. The import path is a list of locations that may name file system paths or zip files. It can also be extended to search for any locatable resource, such as those identified by URLs.

When the named module is not found in sys.modules, Python next searches **sys.meta_path**, which contains a list of meta path finder objects.

The meta path may be traversed multiple times for a single import request. For example, assuming none of the modules involved has already been cached, importing foo.bar.baz will first perform a top level import, calling `mpf.find_spec("foo", None, None)` on each meta path finder (mpf). After foo has been imported, foo.bar will be imported by traversing the meta path a second time, calling `mpf.find_spec("foo.bar", foo.__path__, None)`. Once foo.bar has been imported, the final traversal will call `mpf.find_spec("foo.bar.baz", foo.bar.__path__, None)`.

The module will **exist in sys.modules before the loader executes the module code**. This is crucial because the module code may (directly or indirectly) import itself; adding it to sys.modules beforehand prevents unbounded recursion in the worst case and multiple loading in the best.

When a submodule is loaded using any mechanism a binding is placed in the parent module’s namespace to the submodule object. For example, if package spam has a submodule foo, after importing spam.foo, **spam will have an attribute foo** which is bound to the submodule


