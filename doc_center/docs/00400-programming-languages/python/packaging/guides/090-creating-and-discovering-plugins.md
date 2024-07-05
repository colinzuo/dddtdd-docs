---
title: Creating and discovering plugins
---

## automatic plugin discovery

### Using naming convention

**pkgutil.iter_modules()**

```
import importlib
import pkgutil

discovered_plugins = {
    name: importlib.import_module(name)
    for finder, name, ispkg
    in pkgutil.iter_modules()
    if name.startswith('flask_')
}
```


