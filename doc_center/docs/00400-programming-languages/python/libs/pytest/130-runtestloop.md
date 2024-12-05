
## main.py _main

```py title="src\_pytest\main.py"
def _main(config: Config, session: Session) -> int | ExitCode | None:

    config.hook.pytest_runtestloop(session=session)    
```

## main.py pytest_runtestloop

```py
def pytest_runtestloop(session: Session) -> bool:

    for i, item in enumerate(session.items):
        nextitem = session.items[i + 1] if i + 1 < len(session.items) else None
        item.config.hook.pytest_runtest_protocol(item=item, nextitem=nextitem)    
```

## runner.py pytest_runtest_protocol

```py
def pytest_runtest_protocol(item: Item, nextitem: Item | None) -> bool:

    runtestprotocol(item, nextitem=nextitem)

def runtestprotocol(
    item: Item, log: bool = True, nextitem: Item | None = None
) -> list[TestReport]:

    rep = call_and_report(item, "setup", log)

        if not item.config.getoption("setuponly", False):
            reports.append(call_and_report(item, "call", log))

    reports.append(call_and_report(item, "teardown", log, nextitem=nextitem))
```

## runner.py call_and_report

```py
def call_and_report(
    item: Item, when: Literal["setup", "call", "teardown"], log: bool = True, **kwds
) -> TestReport:
    ihook = item.ihook
    if when == "setup":
        runtest_hook: Callable[..., None] = ihook.pytest_runtest_setup
    elif when == "call":
        runtest_hook = ihook.pytest_runtest_call
    elif when == "teardown":
        runtest_hook = ihook.pytest_runtest_teardown

    call = CallInfo.from_call(
        lambda: runtest_hook(item=item, **kwds), when=when, reraise=reraise
    )
    report: TestReport = ihook.pytest_runtest_makereport(item=item, call=call)        
```

## runner.py pytest_runtest_setup

```py
def pytest_runtest_setup(item: Item) -> None:
    _update_current_test_var(item, "setup")
    item.session._setupstate.setup(item)
```

### runner.py SetupState setup

```py
    def setup(self, item: Item) -> None:

        needed_collectors = item.listchain()

        for col in needed_collectors[len(self.stack) :]:

            self.stack[col] = ([col.teardown], None)
            try:
                col.setup()                            
```

### python.py Function setup

```py
    def setup(self) -> None:
        self._request._fillfixtures()
```

## runner.py pytest_runtest_call

```py
def pytest_runtest_call(item: Item) -> None:

        item.runtest()    
```

### python.py Function runtest

```py
    def runtest(self) -> None:
        """Execute the underlying test function."""
        self.ihook.pytest_pyfunc_call(pyfuncitem=self)
```

```py
def pytest_pyfunc_call(pyfuncitem: Function) -> object | None:
    testfunction = pyfuncitem.obj

    funcargs = pyfuncitem.funcargs
    testargs = {arg: funcargs[arg] for arg in pyfuncitem._fixtureinfo.argnames}
    result = testfunction(**testargs)    
```    

## runner.py pytest_runtest_teardown

```py
def pytest_runtest_teardown(item: Item, nextitem: Item | None) -> None:
    _update_current_test_var(item, "teardown")
    item.session._setupstate.teardown_exact(nextitem)
    _update_current_test_var(item, None)
```
