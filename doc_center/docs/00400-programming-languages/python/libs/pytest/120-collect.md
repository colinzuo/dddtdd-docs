
## main.py _main

```py
def _main(config: Config, session: Session) -> int | ExitCode | None:

    config.hook.pytest_collection(session=session)
    config.hook.pytest_runtestloop(session=session)
```

## main.py pytest_collection

```py
def pytest_collection(session: Session) -> None:
    session.perform_collect()
```

## main.py Session.perform_collect

```py
    def perform_collect(
        self, args: Sequence[str] | None = None, genitems: bool = True
    ) -> Sequence[nodes.Item | nodes.Collector]:

            args = self.config.args

            for arg in args:
                collection_argument = resolve_collection_argument(
                    self.config.invocation_params.dir,
                    arg,
                    as_pypath=self.config.option.pyargs,
                )

            rep = collect_one_node(self)

                if rep.passed:
                    for node in rep.result:
                        self.items.extend(self.genitems(node))

            self.config.pluginmanager.check_pending()
            hook.pytest_collection_modifyitems(
                session=self, config=self.config, items=items
            )

            hook.pytest_collection_finish(session=self)                                                                                
```

## runner.py collect_one_node

```py
def collect_one_node(collector: Collector) -> CollectReport:

    ihook.pytest_collectstart(collector=collector)
    rep: CollectReport = ihook.pytest_make_collect_report(collector=collector)
```

## runner.py pytest_make_collect_report

```py
def pytest_make_collect_report(collector: Collector) -> CollectReport:

    def collect() -> list[Item | Collector]:
        # Before collecting, if this is a Directory, load the conftests.
        # If a conftest import fails to load, it is considered a collection
        # error of the Directory collector. This is why it's done inside of the
        # CallInfo wrapper.
        #
        # Note: initial conftests are loaded early, not here.
        if isinstance(collector, Directory):
            collector.config.pluginmanager._loadconftestmodules(
                collector.path,
                collector.config.getoption("importmode"),
                rootpath=collector.config.rootpath,
                consider_namespace_packages=collector.config.getini(
                    "consider_namespace_packages"
                ),
            )

        return list(collector.collect())

    call = CallInfo.from_call(
        collect, "collect", reraise=(KeyboardInterrupt, SystemExit)
    )
    longrepr: None | tuple[str, int, str] | str | TerminalRepr = None
    if not call.excinfo:
        outcome: Literal["passed", "skipped", "failed"] = "passed"

    result = call.result if not call.excinfo else None
    rep = CollectReport(collector.nodeid, outcome, longrepr, result)
    rep.call = call  # type: ignore # see collect_one_node
    return rep        
```

## main.py Session.collect

```py
    def collect(self) -> Iterator[nodes.Item | nodes.Collector]:

        for collection_argument in self._initial_parts:

            paths = [argpath]

                for path in argpath.parents:
                    if not pm._is_in_confcutdir(path):
                        break
                    paths.insert(0, path)

            work: list[tuple[nodes.Collector | nodes.Item, list[Path | str]]] = [
                (self, [*paths, *names])
            ]
            while work:
                matchnode, matchparts = work.pop()

                # Pop'd all of the parts, this is a match.
                if not matchparts:
                    yield matchnode
                    any_matched_in_initial_part = True
                    continue

                # Collect this level of matching.
                # Collecting Session (self) is done directly to avoid endless
                # recursion to this function.
                subnodes: Sequence[nodes.Collector | nodes.Item]
                if isinstance(matchnode, Session):
                    assert isinstance(matchparts[0], Path)
                    subnodes = matchnode._collect_path(matchparts[0], path_cache)
                else:

                    rep, duplicate = self._collect_one_node(matchnode, handle_dupes)

                    subnodes = rep.result

                for node in reversed(subnodes):

                        work.append((node, matchparts[1:]))                                                                                                                                                                        
```

## main.py Session.genitems

```py
    def genitems(self, node: nodes.Item | nodes.Collector) -> Iterator[nodes.Item]:

        if isinstance(node, nodes.Item):
            node.ihook.pytest_itemcollected(item=node)
            yield node
        else:

            rep, duplicate = self._collect_one_node(node, handle_dupes)

            if rep.passed:
                for subnode in rep.result:
                    yield from self.genitems(subnode)                        
```

## main.py Session._collect_path

```py
    def _collect_path(
        self,
        path: Path,
        path_cache: dict[Path, Sequence[nodes.Collector]],
    ) -> Sequence[nodes.Collector]:

        if path.is_dir():
            ihook = self.gethookproxy(path.parent)
            col: nodes.Collector | None = ihook.pytest_collect_directory(
                path=path, parent=self
            )
            cols: Sequence[nodes.Collector] = (col,) if col is not None else ()

        elif path.is_file():
            ihook = self.gethookproxy(path)
            cols = ihook.pytest_collect_file(file_path=path, parent=self)    
```

## main.py pytest_collect_directory

```py
def pytest_collect_directory(
    path: Path, parent: nodes.Collector
) -> nodes.Collector | None:
    return Dir.from_parent(parent, path=path)
```

### main.py Dir.collect

```py
    def collect(self) -> Iterable[nodes.Item | nodes.Collector]:
        config = self.config
        col: nodes.Collector | None
        cols: Sequence[nodes.Collector]
        ihook = self.ihook
        for direntry in scandir(self.path):
            if direntry.is_dir():
                path = Path(direntry.path)
                if not self.session.isinitpath(path, with_parents=True):
                    if ihook.pytest_ignore_collect(collection_path=path, config=config):
                        continue
                col = ihook.pytest_collect_directory(path=path, parent=self)
                if col is not None:
                    yield col

            elif direntry.is_file():
                path = Path(direntry.path)
                if not self.session.isinitpath(path):
                    if ihook.pytest_ignore_collect(collection_path=path, config=config):
                        continue
                cols = ihook.pytest_collect_file(file_path=path, parent=self)
                yield from cols
```

## python.py pytest_collect_directory

```py
def pytest_collect_directory(
    path: Path, parent: nodes.Collector
) -> nodes.Collector | None:
    pkginit = path / "__init__.py"
    try:
        has_pkginit = pkginit.is_file()
    except PermissionError:
        # See https://github.com/pytest-dev/pytest/issues/12120#issuecomment-2106349096.
        return None
    if has_pkginit:
        return Package.from_parent(parent, path=path)
    return None
```

### python.py Package.collect

```py
    def collect(self) -> Iterable[nodes.Item | nodes.Collector]:
        # Always collect __init__.py first.
        def sort_key(entry: os.DirEntry[str]) -> object:
            return (entry.name != "__init__.py", entry.name)

        # 其它和Dir相同
```

## python.py pytest_collect_file

```py
def pytest_collect_file(file_path: Path, parent: nodes.Collector) -> Module | None:

        if not parent.session.isinitpath(file_path):
            if not path_matches_patterns(
                file_path, parent.config.getini("python_files")
            ):
                return None
        ihook = parent.session.gethookproxy(file_path)
        module: Module = ihook.pytest_pycollect_makemodule(
            module_path=file_path, parent=parent
        )    
```

## python.py pytest_pycollect_makemodule

```py
def pytest_pycollect_makemodule(module_path: Path, parent) -> Module:
    return Module.from_parent(parent, path=module_path)
```

## python.py Module

```py
class Module(nodes.File, PyCollector):

    def _getobj(self):
        return importtestmodule(self.path, self.config)

    def collect(self) -> Iterable[nodes.Item | nodes.Collector]:
        self._register_setup_module_fixture()
        self._register_setup_function_fixture()
        self.session._fixturemanager.parsefactories(self)
        return super().collect()    
```

## python.py PyCollector collect

```py
class PyCollector(PyobjMixin, nodes.Collector, abc.ABC):

    def collect(self) -> Iterable[nodes.Item | nodes.Collector]:

        dicts = [getattr(self.obj, "__dict__", {})]

        for dic in dicts:

            for name, obj in list(dic.items()):

                res = ihook.pytest_pycollect_makeitem(
                    collector=self, name=name, obj=obj
                )

                if res is None:
                    continue
                elif isinstance(res, list):
                    values.extend(res)
                else:
                    values.append(res)                                                                
```

## python.py pytest_pycollect_makeitem

```py
@hookimpl(trylast=True)
def pytest_pycollect_makeitem(
    collector: Module | Class, name: str, obj: object
) -> None | nodes.Item | nodes.Collector | list[nodes.Item | nodes.Collector]:

    if safe_isclass(obj):
        if collector.istestclass(obj, name):
            return Class.from_parent(collector, name=name, obj=obj)
    elif collector.istestfunction(obj, name):

                return list(collector._genfunctions(name, obj))                    
```

## python.py Class

```py
class Class(PyCollector):

    def collect(self) -> Iterable[nodes.Item | nodes.Collector]:

        # 发现并注册fixture
        self.session._fixturemanager.parsefactories(self.newinstance(), self.nodeid)

        # 递归收集
        return super().collect()            
```

## python.py PyCollector._genfunctions

```py
    def _genfunctions(self, name: str, funcobj) -> Iterator[Function]:
        modulecol = self.getparent(Module)
        assert modulecol is not None
        module = modulecol.obj
        clscol = self.getparent(Class)
        cls = clscol and clscol.obj or None

        # 从funcobj提取fixture信息
        definition = FunctionDefinition.from_parent(self, name=name, callobj=funcobj)
        fixtureinfo = definition._fixtureinfo

        # 如下所诉，Metafunc会生成具体的param组合
        # pytest_generate_tests impls call metafunc.parametrize() which fills
        # metafunc._calls, the outcome of the hook.
        metafunc = Metafunc(
            definition=definition,
            fixtureinfo=fixtureinfo,
            config=self.config,
            cls=cls,
            module=module,
            _ispytest=True,
        )

        self.ihook.pytest_generate_tests.call_extra(methods, dict(metafunc=metafunc))

        if not metafunc._calls:
            yield Function.from_parent(self, name=name, fixtureinfo=fixtureinfo)
        else:

            for callspec in metafunc._calls:
                subname = f"{name}[{callspec.id}]"
                yield Function.from_parent(
                    self,
                    name=subname,
                    callspec=callspec,
                    fixtureinfo=fixtureinfo,
                    keywords={callspec.id: True},
                    originalname=name,
                )                            
```

## python.py pytest_generate_tests

```py
def pytest_generate_tests(metafunc: Metafunc) -> None:
    for marker in metafunc.definition.iter_markers(name="parametrize"):
        metafunc.parametrize(*marker.args, **marker.kwargs, _param_mark=marker)
```

```py
class Metafunc:

    def parametrize(
        self,
        argnames: str | Sequence[str],
        argvalues: Iterable[ParameterSet | Sequence[object] | object],
        indirect: bool | Sequence[str] = False,
        ids: Iterable[object | None] | Callable[[Any], object | None] | None = None,
        scope: _ScopeName | None = None,
        *,
        _param_mark: Mark | None = None,
    ) -> None:

        argnames, parametersets = ParameterSet._for_parametrize(
            argnames,
            argvalues,
            self.function,
            self.config,
            nodeid=self.definition.nodeid,
        )

        ids = self._resolve_parameter_set_ids(
            argnames, ids, parametersets, nodeid=self.definition.nodeid
        )

        newcalls = []
        for callspec in self._calls or [CallSpec2()]:
            for param_index, (param_id, param_set) in enumerate(
                zip(ids, parametersets)
            ):
                newcallspec = callspec.setmulti(
                    argnames=argnames,
                    valset=param_set.values,
                    id=param_id,
                    marks=param_set.marks,
                    scope=scope_,
                    param_index=param_index,
                )
                newcalls.append(newcallspec)
        self._calls = newcalls                
```    

## python.py Function

```py
class Function(PyobjMixin, nodes.Item):

    def __init__(
        self,
        name: str,
        parent,
        config: Config | None = None,
        callspec: CallSpec2 | None = None,
        callobj=NOTSET,
        keywords: Mapping[str, Any] | None = None,
        session: Session | None = None,
        fixtureinfo: FuncFixtureInfo | None = None,
        originalname: str | None = None,
    ) -> None:

        self.originalname = originalname or name

        self.own_markers.extend(get_unpacked_marks(self.obj))
        if callspec:
            self.callspec = callspec
            self.own_markers.extend(callspec.marks)

        self.keywords.update((mark.name, mark) for mark in self.own_markers)
        self.keywords.update(self.obj.__dict__)
        if keywords:
            self.keywords.update(keywords)

        self._fixtureinfo: FuncFixtureInfo = fixtureinfo
        self.fixturenames = fixtureinfo.names_closure
        self._initrequest()                                    
```    
