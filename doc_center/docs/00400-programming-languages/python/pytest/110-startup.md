
## 初始化 PytestPluginManager 和 Config

```py title="src\_pytest\config\__init__.py"
def console_main() -> int:

        code = main()    
```

```py title="src\_pytest\config\__init__.py"
def main(
    args: list[str] | os.PathLike[str] | None = None,
    plugins: Sequence[str | _PluggyPlugin] | None = None,
) -> int | ExitCode:

            config = _prepareconfig(args, plugins)

                ret: ExitCode | int = config.hook.pytest_cmdline_main(config=config)            
```

```py title="src\_pytest\config\__init__.py"
def _prepareconfig(
    args: list[str] | os.PathLike[str] | None = None,
    plugins: Sequence[str | _PluggyPlugin] | None = None,
) -> Config:
    if args is None:
        args = sys.argv[1:]

    config = get_config(args, plugins)

        if plugins:
            for plugin in plugins:
                if isinstance(plugin, str):
                    pluginmanager.consider_pluginarg(plugin)
                else:
                    pluginmanager.register(plugin)
        config = pluginmanager.hook.pytest_cmdline_parse(
            pluginmanager=pluginmanager, args=args
        )    
```

```python title="src\_pytest\config\__init__.py"
def get_config(
    args: list[str] | None = None,
    plugins: Sequence[str | _PluggyPlugin] | None = None,
) -> Config:

    pluginmanager = PytestPluginManager()
    config = Config(
        pluginmanager,
        invocation_params=Config.InvocationParams(
            args=args or (),
            plugins=plugins,
            dir=pathlib.Path.cwd(),
        ),
    )

    if args is not None:
        # Handle any "-p no:plugin" args.
        pluginmanager.consider_preparse(args, exclude_only=True)

    for spec in default_plugins:
        pluginmanager.import_plugin(spec)
```

```py title="src\_pytest\config\__init__.py"
class PytestPluginManager(PluginManager):

        self.add_hookspecs(_pytest.hookspec)
        self.register(self)
        if os.environ.get("PYTEST_DEBUG"):

            self.trace.root.setwriter(err.write)
            self.enable_tracing()

        self.rewrite_hook = _pytest.assertion.DummyRewriteHook()
        # Used to know when we are importing conftests after the pytest_configure stage.
        self._configured = False                               
```

```py title="src\_pytest\config\__init__.py"
class Config:

    def __init__(
        self,
        pluginmanager: PytestPluginManager,
        *,
        invocation_params: InvocationParams | None = None,
    ) -> None:

        self.option = argparse.Namespace()

        self._parser = Parser(
            usage=f"%(prog)s [options] [{_a}] [{_a}] [...]",
            processopt=self._processopt,
            _ispytest=True,
        )
        self.pluginmanager = pluginmanager

        self.pluginmanager.register(self, "pytestconfig")
        self._configured = False
        self.hook.pytest_addoption.call_historic(
            kwargs=dict(parser=self._parser, pluginmanager=self.pluginmanager)
        )
```

```py title="src\_pytest\config\__init__.py"
class PytestPluginManager(PluginManager):

    def consider_preparse(
        self, args: Sequence[str], *, exclude_only: bool = False
    ) -> None:

                self.consider_pluginarg(parg)
```

```py title="src\_pytest\config\__init__.py"
class PytestPluginManager(PluginManager):

    def consider_pluginarg(self, arg: str) -> None:

        if arg.startswith("no:"):

            self.set_blocked(name)
```

```py title="src\_pytest\config\__init__.py"
class PytestPluginManager(PluginManager):

    def import_plugin(self, modname: str, consider_entry_points: bool = False) -> None:

        if self.is_blocked(modname) or self.get_plugin(modname) is not None:
            return

        importspec = "_pytest." + modname if modname in builtin_plugins else modname

            mod = sys.modules[importspec]
            self.register(mod, modname)        
```

## 注册default_plugins

使能的default_plugins的pytest_addoption hook被调用

```python title="src\_pytest\config\__init__.py"
def get_config(
    args: list[str] | None = None,
    plugins: Sequence[str | _PluggyPlugin] | None = None,
) -> Config:

    if args is not None:
        # Handle any "-p no:plugin" args.
        pluginmanager.consider_preparse(args, exclude_only=True)

    for spec in default_plugins:
        pluginmanager.import_plugin(spec)
```

```py title="src\_pytest\hookspec.py"
def pytest_addoption(parser: Parser, pluginmanager: PytestPluginManager) -> None:
    """Register argparse-style options and ini-style config values,
    called once at the beginning of a test run.
```

## pytest_cmdline_parse

三方的plugin和conftest的pytest_addoption hook被调用

```py title="src\_pytest\config\__init__.py"
class Config:

    def pytest_cmdline_parse(
        self, pluginmanager: PytestPluginManager, args: list[str]
    ) -> Config:

            self.parse(args)

    def parse(self, args: list[str], addopts: bool = True) -> None:

        self.hook.pytest_addhooks.call_historic(
            kwargs=dict(pluginmanager=self.pluginmanager)
        )
        self._preparse(args, addopts=addopts)
        self._parser.after_preparse = True  # type: ignore

            args = self._parser.parse_setoption(
                args, self.option, namespace=self.option
            )
            self.args, self.args_source = self._decide_args(
                args=args,
                pyargs=self.known_args_namespace.pyargs,
                testpaths=self.getini("testpaths"),
                invocation_dir=self.invocation_params.dir,
                rootpath=self.rootpath,
                warn=True,
            )            
```

### Config._preparse

```py title="src\_pytest\config\__init__.py"
class Config:

    def _preparse(self, args: list[str], addopts: bool = True) -> None:
        if addopts:
            env_addopts = os.environ.get("PYTEST_ADDOPTS", "")
            if len(env_addopts):
                args[:] = (
                    self._validate_args(shlex.split(env_addopts), "via PYTEST_ADDOPTS")
                    + args
                )
        self._initini(args)
        if addopts:
            args[:] = (
                self._validate_args(self.getini("addopts"), "via addopts config") + args
            )

        self.known_args_namespace = self._parser.parse_known_args(
            args, namespace=copy.copy(self.option)
        )
        self._checkversion()
        self._consider_importhook(args)
        self._configure_python_path()
        self.pluginmanager.consider_preparse(args, exclude_only=False)
        if not os.environ.get("PYTEST_DISABLE_PLUGIN_AUTOLOAD"):
            # Don't autoload from distribution package entry point. Only
            # explicitly specified plugins are going to be loaded.
            self.pluginmanager.load_setuptools_entrypoints("pytest11")
        self.pluginmanager.consider_env()

        self.known_args_namespace = self._parser.parse_known_args(
            args, namespace=copy.copy(self.known_args_namespace)
        )

        self._validate_plugins()
        self._warn_about_skipped_plugins()

                confcutdir = str(self.inipath.parent)
                
            self.known_args_namespace.confcutdir = confcutdir

            self.hook.pytest_load_initial_conftests(
                early_config=self, args=args, parser=self._parser
            )
```

```py title="src\_pytest\config\__init__.py"
class Config:

    def _consider_importhook(self, args: Sequence[str]) -> None:

                hook = _pytest.assertion.install_importhook(self)

                self._mark_plugins_for_rewrite(hook)       

    def _mark_plugins_for_rewrite(self, hook) -> None:

        self.pluginmanager.rewrite_hook = hook    

        for name in _iter_rewritable_modules(package_files):
            hook.mark_rewrite(name)                                     
```

```py title="src\_pytest\config\__init__.py"
class PytestPluginManager(PluginManager):

    def consider_preparse(
        self, args: Sequence[str], *, exclude_only: bool = False
    ) -> None:

                if opt == "-p":

                self.consider_pluginarg(parg)

    def consider_pluginarg(self, arg: str) -> None:

            self.import_plugin(arg, consider_entry_points=True)                                                
```

```py title="src\_pytest\hookspec.py"
def pytest_load_initial_conftests(
    early_config: Config, parser: Parser, args: list[str]
) -> None:
    """Called to implement the loading of :ref:`initial conftest files
    <pluginorder>` ahead of command line option parsing.

```

##### capture.pytest_load_initial_conftests

通过修改`sys.stdout`等将对应流定位到tempfile，如果不出错则最后放到report中，
出错则恢复并输出

```py title="src\_pytest\capture.py"
def pytest_load_initial_conftests(early_config: Config) -> Generator[None]:

    capman.start_global_capturing()
    try:
        try:
            yield
        finally:
            capman.suspend_global_capture()
    except BaseException:
        out, err = capman.read_global_capture()
        sys.stdout.write(out)
        sys.stderr.write(err)
```

##### Config.pytest_load_initial_conftests

如果命令行指定了目录则使用，否则使用当前目录

```py title="src\_pytest\config\__init__.py"
class Config:

    def pytest_load_initial_conftests(self, early_config: Config) -> None:

        args, args_source = early_config._decide_args(
            args=early_config.known_args_namespace.file_or_dir,
            pyargs=early_config.known_args_namespace.pyargs,
            testpaths=early_config.getini("testpaths"),
            invocation_dir=early_config.invocation_params.dir,
            rootpath=early_config.rootpath,
            warn=False,
        )
        self.pluginmanager._set_initial_conftests(
            args=args,
            pyargs=early_config.known_args_namespace.pyargs,
            noconftest=early_config.known_args_namespace.noconftest,
            rootpath=early_config.rootpath,
            confcutdir=early_config.known_args_namespace.confcutdir,
            invocation_dir=early_config.invocation_params.dir,
            importmode=early_config.known_args_namespace.importmode,
            consider_namespace_packages=early_config.getini(
                "consider_namespace_packages"
            ),
        )

    def _set_initial_conftests(
        self,
        args: Sequence[str | pathlib.Path],
        pyargs: bool,
        noconftest: bool,
        rootpath: pathlib.Path,
        confcutdir: pathlib.Path | None,
        invocation_dir: pathlib.Path,
        importmode: ImportMode | str,
        *,
        consider_namespace_packages: bool,
    ) -> None:

                self._try_load_conftest(
                    anchor,
                    importmode,
                    rootpath,
                    consider_namespace_packages=consider_namespace_packages,
                )

    def _try_load_conftest(
        self,
        anchor: pathlib.Path,
        importmode: str | ImportMode,
        rootpath: pathlib.Path,
        *,
        consider_namespace_packages: bool,
    ) -> None:

        self._loadconftestmodules(
            anchor,
            importmode,
            rootpath,
            consider_namespace_packages=consider_namespace_packages,
        )     

        if anchor.is_dir():
            for x in anchor.glob("test*"):
                if x.is_dir():
                    self._loadconftestmodules(
                        x,
                        importmode,
                        rootpath,
                        consider_namespace_packages=consider_namespace_packages,
                    )

    def _loadconftestmodules(
        self,
        path: pathlib.Path,
        importmode: str | ImportMode,
        rootpath: pathlib.Path,
        *,
        consider_namespace_packages: bool,
    ) -> None: 

        directory = self._get_directory(path)

        for parent in reversed((directory, *directory.parents)):    

                conftestpath = parent / "conftest.py"
                if conftestpath.is_file():
                    mod = self._importconftest(
                        conftestpath,
                        importmode,
                        rootpath,
                        consider_namespace_packages=consider_namespace_packages,
                    )
                    clist.append(mod)
        self._dirpath2confmods[directory] = clist  

    def _importconftest(
        self,
        conftestpath: pathlib.Path,
        importmode: str | ImportMode,
        rootpath: pathlib.Path,
        *,
        consider_namespace_packages: bool,
    ) -> types.ModuleType:

            mod = import_path(
                conftestpath,
                mode=importmode,
                root=rootpath,
                consider_namespace_packages=consider_namespace_packages,
            )

        self.consider_conftest(mod, registration_name=conftestpath_plugin_name)

    def consider_conftest(
        self, conftestmodule: types.ModuleType, registration_name: str
    ) -> None:
        """:meta private:"""
        self.register(conftestmodule, name=registration_name)                                                                                      
```        

#### Parser.parse_setoption

```py title="src\_pytest\config\argparsing.py"
class Parser:

    def parse_setoption(
        self,
        args: Sequence[str | os.PathLike[str]],
        option: argparse.Namespace,
        namespace: argparse.Namespace | None = None,
    ) -> list[str]:
        parsedoption = self.parse(args, namespace=namespace)
        for name, value in parsedoption.__dict__.items():
            setattr(option, name, value)
        return cast(List[str], getattr(parsedoption, FILE_OR_DIR))
```

## pytest_cmdline_main

```py title="src\_pytest\main.py"
def pytest_cmdline_main(config: Config) -> int | ExitCode:
    return wrap_session(config, _main)               
```    

### wrap_session

```py
def wrap_session(
    config: Config, doit: Callable[[Config, Session], int | ExitCode | None]
) -> int | ExitCode:

    session = Session.from_config(config)

            config._do_configure()
            initstate = 1
            config.hook.pytest_sessionstart(session=session)
            initstate = 2
            session.exitstatus = doit(config, session) or 0            

    finally:

                config.hook.pytest_sessionfinish(
                    session=session, exitstatus=session.exitstatus
                )

        config._ensure_unconfigure()
```

### _main

```py
def _main(config: Config, session: Session) -> int | ExitCode | None:

    config.hook.pytest_collection(session=session)
    config.hook.pytest_runtestloop(session=session)    
```
