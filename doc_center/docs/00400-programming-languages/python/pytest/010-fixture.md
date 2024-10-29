
## FixtureManager.__init__

注册plugin

```py
class FixtureManager:

    def __init__(self, session: Session) -> None:

        self._arg2fixturedefs: Final[dict[str, list[FixtureDef[Any]]]] = {}

        self._nodeid_autousenames: Final[dict[str, list[str]]] = {
            "": self.config.getini("usefixtures"),
        }
        session.config.pluginmanager.register(self, "funcmanage")                
```

## FixtureManager.pytest_plugin_registered

发现新注册plugin时候提取fixture信息，然后注册

```py
    def pytest_plugin_registered(self, plugin: _PluggyPlugin, plugin_name: str) -> None:

        if plugin_name and plugin_name.endswith("conftest.py"):

            conftestpath = absolutepath(plugin_name)

                nodeid = str(conftestpath.parent.relative_to(self.config.rootpath))

        else:
            nodeid = None       

        self.parsefactories(plugin, nodeid)                                     
```

## FixtureManager.parsefactories

提取fixture信息，然后注册

```py
    def parsefactories(
        self,
        node_or_obj: nodes.Node | object,
        nodeid: str | NotSetType | None = NOTSET,
    ) -> None:

        if nodeid is not NOTSET:
            holderobj = node_or_obj
        else:
            assert isinstance(node_or_obj, nodes.Node)
            holderobj = cast(object, node_or_obj.obj)  # type: ignore[attr-defined]
            assert isinstance(node_or_obj.nodeid, str)
            nodeid = node_or_obj.nodeid                                                                

        for name in dir(holderobj):

            obj_ub = safe_getattr(holderobj_tp, name, None)
            marker = getfixturemarker(obj_ub)

            self._register_fixture(
                name=name,
                nodeid=nodeid,
                func=func,
                scope=marker.scope,
                params=marker.params,
                ids=marker.ids,
                autouse=marker.autouse,
            )
```

## FixtureManager._register_fixture

实际注册fixture

- `_arg2fixturedefs`
- `_nodeid_autousenames`

```py
    def _register_fixture(
        self,
        *,
        name: str,
        func: _FixtureFunc[object],
        nodeid: str | None,
        scope: Scope | _ScopeName | Callable[[str, Config], _ScopeName] = "function",
        params: Sequence[object] | None = None,
        ids: tuple[object | None, ...] | Callable[[Any], object | None] | None = None,
        autouse: bool = False,
    ) -> None:

        fixture_def = FixtureDef(
            config=self.config,
            baseid=nodeid,
            argname=name,
            func=func,
            scope=scope,
            params=params,
            ids=ids,
            _ispytest=True,
        )

        faclist = self._arg2fixturedefs.setdefault(name, [])
        if fixture_def.has_location:
            faclist.append(fixture_def)
        else:
            # fixturedefs with no location are at the front
            # so this inserts the current fixturedef after the
            # existing fixturedefs from external plugins but
            # before the fixturedefs provided in conftests.
            i = len([f for f in faclist if not f.has_location])
            faclist.insert(i, fixture_def)
        if autouse:
            self._nodeid_autousenames.setdefault(nodeid or "", []).append(name)  
```

## FixtureManager.getfixtureinfo

从函数提取`FuncFixtureInfo`

```py
    def getfixtureinfo(
        self,
        node: nodes.Item,
        func: Callable[..., object] | None,
        cls: type | None,
    ) -> FuncFixtureInfo:

            # 函数参数名字
            argnames = getfuncargnames(func, name=node.name, cls=cls)

        # marker usefixtures设置的fixture names
        usefixturesnames = self._getusefixturesnames(node)
        # autouse 
        autousenames = self._getautousenames(node)
        # 整合几个来源并去重
        initialnames = deduplicate_names(autousenames, usefixturesnames, argnames)

        # marker parametrize指定的参数不是fixture
        direct_parametrize_args = _get_direct_parametrize_args(node)

        # 添加被初始fixture依赖的fixture
        names_closure, arg2fixturedefs = self.getfixtureclosure(
            parentnode=node,
            initialnames=initialnames,
            ignore_args=direct_parametrize_args,
        )

        return FuncFixtureInfo(argnames, initialnames, names_closure, arg2fixturedefs)        
```

## FixtureManager.pytest_generate_tests

根据parametrize信息更新`Metafunc`

```py
    def pytest_generate_tests(self, metafunc: Metafunc) -> None:

        for argname in metafunc.fixturenames:

            # 直接设置在marker上的优先级高
            if any(
                argname in get_parametrize_mark_argnames(mark)
                for mark in metafunc.definition.iter_markers("parametrize")
            ):
                continue

            # 检查fixture是否是parametrize的，包括虽然最新的没有使用
            # params，但是它是通过override生成，而被override的是使用params
            for fixturedef in reversed(fixture_defs):
                # Fixture is parametrized, apply it and stop.
                if fixturedef.params is not None:
                    metafunc.parametrize(
                        argname,
                        fixturedef.params,
                        indirect=True,
                        scope=fixturedef.scope,
                        ids=fixturedef.ids,
                    )
                    break

                # Not requesting the overridden super fixture, stop.
                if argname not in fixturedef.argnames:
                    break                                    
```

## FixtureManager.pytest_collection_modifyitems

按照scope重排序，尽量重复利用fixture实例

```py
    def pytest_collection_modifyitems(self, items: list[nodes.Item]) -> None:
        # Separate parametrized setups.
        items[:] = reorder_items(items)
```
