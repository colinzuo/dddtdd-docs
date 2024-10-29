
[https://peps.python.org/pep-0561/](https://peps.python.org/pep-0561/)

## Specification

This PEP recognizes three types of packages that users of typing wish to create:

- The package maintainer would like to add type information **inline**.
- The package maintainer would like to add type information **via stubs**.
- A third party or package maintainer would like to share **stub files** for a package, but the maintainer does not want to include them in the source of the package.

The two major parts of this specification are the **packaging** specifications and the **resolution** order for resolving module type information

### Packaging Type Information

Package maintainers who wish to support type checking of their code MUST add a marker file named **py.typed** to their package supporting typing

To have this file installed with the package, maintainers can use existing packaging options such as **package_data** in distutils

```py
setup(
    ...,
    package_data = {
        'foopkg': ['py.typed'],
    },
    ...,
    )
```

#### Stub-only Packages

The name of the stub package **MUST** follow the scheme `foopkg-stubs` for type stubs for the package named `foopkg`. Note that for stub-only packages adding a `py.typed` marker is **not needed** since the name `*-stubs` is enough to indicate it is a source of typing information.

### Type Checker Module Resolution Order

- Stubs or Python source manually put in the beginning of the path. Type checkers SHOULD provide this to allow the user complete control of which stubs to use, and to patch broken stubs/inline types from packages. In mypy the `$MYPYPATH` environment variable can be used for this.
- **User code** - the files the type checker is running on.
- **Stub packages** - these packages SHOULD supersede any installed inline package. They can be found at foopkg-stubs for package foopkg.
- Packages with a `py.typed` marker file - if there is nothing overriding the installed package, and it opts into type checking, the types bundled with the package SHOULD be used (be they in .pyi type stub files or inline in .py files).
- `Typeshed` (if used) - Provides the stdlib types and several third party libraries

### Partial Stub Packages

Many **stub packages** will only have part of the type interface for libraries completed, especially initially. For the benefit of type checking and code editors, packages can be **“partial”**. This means modules not found in the stub package SHOULD be searched for in parts four and five of the module resolution order above, namely **inline packages and typeshed**


