
<https://pkg.go.dev/testing@go1.22.3>

To write a new test suite, create a file that contains the TestXxx functions as described here, and give that file a name ending in "`_test.go`". The file will be excluded from regular package builds but will be included when the "`go test`" command is run.

## Benchmarks

```go
func BenchmarkXxx(*testing.B)
```

executed by the "go test" command when its `-bench` flag is provided. Benchmarks are run sequentially

During benchmark execution, `b.N` is adjusted until the benchmark function lasts long enough to be timed reliably

If a benchmark needs some expensive setup before running, the timer may be reset

```go
b.ResetTimer()
```

## Examples

Example functions may include a concluding line comment that begins with "`Output:`" and is compared with the standard output of the function when the tests are run

The naming convention to declare examples for the package, a function F, a type T and method M on type T are

```go
func Example() { ... }
func ExampleF() { ... }
func ExampleT() { ... }
func ExampleT_M() { ... }

func Example_suffix() { ... }
func ExampleF_suffix() { ... }
func ExampleT_suffix() { ... }
func ExampleT_M_suffix() { ... }
```

## Skipping

```go
func TestTimeConsuming(t *testing.T) {
    if testing.Short() {
        t.Skip("skipping test in short mode.")
    }
    ...
}
```

## Subtests and Sub-benchmarks

```go
go test -run ''        # Run all tests.
go test -run Foo       # Run top-level tests matching "Foo", such as "TestFooBar".
go test -run Foo/A=    # For top-level tests matching "Foo", run subtests matching "A=".
go test -run /A=1      # For all top-level tests, run subtests matching "A=1".
go test -fuzz FuzzFoo  # Fuzz the target matching "FuzzFoo"
```

Run does not return until parallel subtests have completed, providing a way to clean up after a group of parallel tests

```go
func TestTeardownParallel(t *testing.T) {
    // This Run will not return until the parallel tests finish.
    t.Run("group", func(t *testing.T) {
        t.Run("Test1", parallelTest1)
        t.Run("Test2", parallelTest2)
        t.Run("Test3", parallelTest3)
    })
    // <tear-down code>
}
```

## Main

It is sometimes necessary for a test or benchmark program to do extra **setup or teardown** before or after it executes

```go
func TestMain(m *testing.M)
```

TestMain runs in the main goroutine and can do whatever setup and teardown is necessary around a call to `m.Run`

When TestMain is called, `flag.Parse` has not been run. If TestMain depends on command-line flags, including those of the testing package, it should call flag.Parse explicitly. Command line flags are always parsed by the time test or benchmark functions run


