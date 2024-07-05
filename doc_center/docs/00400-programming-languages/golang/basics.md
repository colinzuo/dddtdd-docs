
## data structures

### basic types

- bool
- byte
- int  int8  int16  int32  int64
- uint uint8 uint16 uint32 uint64 uintptr
- float32 float64
- rune
- string
- complex64 complex128

### array

[https://go.dev/blog/slices-intro](https://go.dev/blog/slices-intro)

Go’s arrays are values. An array variable denotes the entire array; it is not a pointer to the first array element (as would be the case in C). This means that when you assign or pass around an array value **you will make a copy of its contents**

An array's length is part of its type, so arrays cannot be resized

```go
b := [2]string{"Penn", "Teller"}

b := [...]string{"Penn", "Teller"}
```

### slice

[https://go.dev/blog/slices-intro](https://go.dev/blog/slices-intro)

Unlike an array type, a slice type has no specified length

The zero value of a slice is nil. The len and cap functions will both return 0 for a nil slice.

The start and end indices of a slice expression are optional; they default to zero and the slice’s length respectively:

A slice is a descriptor of an array segment. It consists of a pointer to the array, the length of the segment, and its capacity

To increase the capacity of a slice one must create a new, larger slice and copy the contents of the original slice into it

To append one slice to another, use ... to expand the second argument to a list of arguments

```go
letters := []string{"a", "b", "c", "d"}

func make([]T, len, cap) []T

var s []byte
s = make([]byte, 5, 5)
// s == []byte{0, 0, 0, 0, 0}

s := make([]byte, 5)

len(s) == 5
cap(s) == 5

b := []byte{'g', 'o', 'l', 'a', 'n', 'g'}
// b[1:4] == []byte{'o', 'l', 'a'}, sharing the same storage as b

// b[:2] == []byte{'g', 'o'}
// b[2:] == []byte{'l', 'a', 'n', 'g'}
// b[:] == b

t := make([]byte, len(s), (cap(s)+1)*2)
copy(t, s)
s = t

func append(s []T, x ...T) []T

a := make([]int, 1)
// a == []int{0}
a = append(a, 1, 2, 3)
// a == []int{0, 1, 2, 3}

a := []string{"John", "Paul"}
b := []string{"George", "Ringo", "Pete"}
a = append(a, b...) // equivalent to "append(a, b[0], b[1], b[2])"
// a == []string{"John", "Paul", "George", "Ringo", "Pete"}
```

### map

[https://go.dev/blog/maps](https://go.dev/blog/maps)

```go
var m map[string]int

m = make(map[string]int)

m["route"] = 66

i := m["route"]

n := len(m)

delete(m, "route")

i, ok := m["route"]

for key, value := range m {
    fmt.Println("Key:", key, "Value:", value)
}

commits := map[string]int{
    "rsc": 3711,
    "r":   2138,
    "gri": 1908,
    "adg": 912,
}

m = map[string]int{}
```

## basic syntax

### for basic

```go
for i := 0; i < 10; i++ {
    sum += i
}
```

### for range

```go
for k, v := range m {
    ...
}
```

### for condition only

```go
for sum < 1000 {
    sum += sum
}
```    

### for only

```go
for {
    ...
}
```

### if

```go
	if x < 0 {
		return sqrt(-x) + "i"
	}
```

### If with a short statement

```go
	if v := math.Pow(x, n); v < lim {
		return v
	}
```

### switch

A switch statement is a shorter way to write a sequence of if - else statements

Go only runs the selected case, not all the cases that follow

Another important difference is that Go's switch cases need not be constants, and the values involved need not be integers.

```go
	switch os := runtime.GOOS; os {
	case "darwin":
		fmt.Println("OS X.")
	case "linux":
		fmt.Println("Linux.")
	default:
		// freebsd, openbsd,
		// plan9, windows...
		fmt.Printf("%s.\n", os)
	}
```

### Switch with no condition

```go
	switch {
	case t.Hour() < 12:
		fmt.Println("Good morning!")
	case t.Hour() < 17:
		fmt.Println("Good afternoon.")
	default:
		fmt.Println("Good evening.")
	}
```

### Defer

[https://go.dev/blog/defer-panic-and-recover](https://go.dev/blog/defer-panic-and-recover)

The deferred call's arguments are evaluated immediately, but the function call is not executed until the surrounding function returns

Deferred function calls are pushed onto a stack. When a function returns, its deferred calls are executed in **last-in-first-out** order.

- A deferred function’s arguments are evaluated when the defer statement is evaluated
- Deferred function calls are executed in Last In First Out order after the surrounding function returns
- Deferred functions may read and assign to the returning function’s named return values

```go
	defer fmt.Println("world")
```

### type switch

```go
    switch vv := v.(type) {
    case string:
        fmt.Println(k, "is string", vv)
    case float64:
        fmt.Println(k, "is float64", vv)
    case []interface{}:
        fmt.Println(k, "is an array:")
        for i, u := range vv {
            fmt.Println(i, u)
        }
    default:
        fmt.Println(k, "is of a type I don't know how to handle")
    }
```

### type assertion

If i does not hold a T, the statement will trigger a panic.

To test whether an interface value holds a specific type, a type assertion can return two values

```go
t := i.(T)

t, ok := i.(T)
```

### type conversion

```go
var i int = 42
var f float64 = float64(i)
var u uint = uint(f)
```

### Constants

```go
const Pi = 3.14
```

### Pointers

Unlike C, Go has no pointer arithmetic

```go
i, j := 42, 2701

p := &i         // point to i
fmt.Println(*p) // read i through the pointer
*p = 21         // set i through the pointer
fmt.Println(i)  // see the new value of i
```

### Struct Literals

You can list just a subset of fields by using the Name: syntax

```go
type Vertex struct {
	X, Y int
}

var (
	v1 = Vertex{1, 2}  // has type Vertex
	v2 = Vertex{X: 1}  // Y:0 is implicit
	v3 = Vertex{}      // X:0 and Y:0
	p  = &Vertex{1, 2} // has type *Vertex
)
```

## function 

### Multiple results

```go
func swap(x, y string) (string, string) {
	return y, x
}
```

### Named return values

```go
func split(sum int) (x, y int) {
	x = sum * 4 / 9
	y = sum - x
	return
}
```

### Function literals

[https://go.dev/ref/spec#Function_literals](https://go.dev/ref/spec#Function_literals)

Function literals are closures: they may refer to variables defined in a surrounding function

```go
f := func(x, y int) int { return x + y }
func(ch chan int) { ch <- ACK }(replyChan)
```

### closure

```go
func makeHandler(fn func (http.ResponseWriter, *http.Request, string)) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        // Here we will extract the page title from the Request,
        // and call the provided handler 'fn'
    }
}
```

### variable declarations

```go
var i, j int = 1, 2
k := 3
```

## method

Go does not have classes. However, you can define methods on types.

A method is a function with a special receiver argument

a method is **just a function with a receiver argument**

You can declare a method on non-struct types, too

You can only declare a method with a receiver **whose type is defined in the same package** as the method

Methods with pointer receivers can modify the value to which the receiver points

```go
type MyFloat float64

func (f MyFloat) Abs() float64 {
	if f < 0 {
		return float64(-f)
	}
	return float64(f)
}
```

## Interfaces

An interface type is defined as a set of method signatures.

A value of interface type can hold any value that implements those methods

A type implements an interface by implementing its methods. There is no explicit declaration of intent, **no "implements" keyword**

- `type Stringer interface`
- `type error interface`
- `io.Reader: func (T) Read(b []byte) (n int, err error)`

### Interface values with nil underlying values

If the concrete value inside the interface itself is nil, the method will be called with a nil receiver

Note that an interface value that holds a nil concrete value is itself non-nil

### The empty interface

The interface type that specifies zero methods is known as the empty interface

An empty interface may hold values of any type. (Every type implements at least zero methods.)

## generics

```go
type Number interface {
    int64 | float64
}

func SumNumbers[K comparable, V Number](m map[K]V) V {
...
}
```

## concurrency

### Goroutines

Goroutines run in the same address space, so access to shared memory must be synchronized. The sync package provides useful primitives

### Channels

The data flows in the direction of the arrow

```go
ch := make(chan int)

ch <- v    // Send v to channel ch.
v := <-ch  // Receive from ch, and
           // assign value to v
```

### Buffered Channels

Sends to a buffered channel block only when the buffer is full. Receives block when the buffer is empty

```go
ch := make(chan int, 100)
```

### Range and Close

A sender can close a channel to indicate that no more values will be sent. Receivers can test whether a channel has been closed by assigning a second parameter to the receive expression

ok is false if there are no more values to receive and the channel is closed

```go
v, ok := <-ch
```

The loop for `i := range c` receives values from the channel repeatedly until it is closed

### Select

The select statement lets a goroutine wait on multiple communication operations

A select blocks until one of its cases can run, then it executes that case. It chooses one at random if multiple are ready

### Default Selection

The `default` case in a select is run if **no other case is ready**

### sync.Mutex

- Lock
- Unlock

### context

- [https://go.dev/blog/context](https://go.dev/blog/context)
- [https://go.dev/blog/pipelines](https://go.dev/blog/pipelines)

## Code organization

[https://go.dev/doc/code](https://go.dev/doc/code)

### package

Go programs are organized into packages. **A package is a collection of source files in the same directory** that are compiled together. Functions, types, variables, and constants defined in one source file are visible to all other source files within the same package

### module

A repository contains one or more modules. **A module is a collection of related Go packages that are released together**. A Go repository typically contains only one module, located at the root of the repository. A file named go.mod there declares the module path: the import path prefix for all packages within the module

An **import path** is a string used to import a package. A package's import path is its module path joined with its subdirectory within the module.

Module dependencies are automatically downloaded to the `pkg/mod` subdirectory of the directory indicated by the `GOPATH` environment variable.

### testing

You write a test by creating a file with a name ending in `_test.go` that contains functions named `TestXXX` with signature `func (t *testing.T)`. The test framework runs each such function; if the function calls a failure function such as `t.Error or t.Fail`, the test is considered to have failed.

## go tools

```bash
go mod init example/user/hello

go mod tidy
```

## json

[https://go.dev/blog/json](https://go.dev/blog/json)

- Pointers will be encoded as the values they point to (or ’null’ if the pointer is nil).

```go
func Marshal(v interface{}) ([]byte, error)

b, err := json.Marshal(m)

func Unmarshal(data []byte, v interface{}) error

err := json.Unmarshal(b, &m)
```

## diagnostics

[https://go.dev/doc/diagnostics](https://go.dev/doc/diagnostics)

### Profiling

- [https://pkg.go.dev/runtime/pprof](https://pkg.go.dev/runtime/pprof)
- [https://pkg.go.dev/net/http/pprof](https://pkg.go.dev/net/http/pprof)
- [https://go.dev/blog/pprof](https://go.dev/blog/pprof)
- [https://github.com/google/pprof/blob/main/doc/README.md](https://github.com/google/pprof/blob/main/doc/README.md)

It is safe to profile programs in production, but enabling some profiles (e.g. the CPU profile) adds cost

### Tracing

- [https://pkg.go.dev/context#Context](https://pkg.go.dev/context#Context)

You can propagate trace identifiers and tags in the `context.Context`.

### Debugging

- [https://github.com/go-delve/delve](https://github.com/go-delve/delve)
- [https://github.com/golang/go/wiki/CoreDumpDebugging](https://github.com/golang/go/wiki/CoreDumpDebugging)

### Runtime statistics and events

- runtime.ReadMemStats: reports the metrics related to heap allocation and garbage collection
- debug.ReadGCStats: reads statistics about garbage collection
- debug.Stack: returns the current stack trace
- debug.WriteHeapDump: suspends the execution of all goroutines and allows you to dump the heap to a file
- runtime.NumGoroutine: returns the number of current goroutines

## gc

[https://go.dev/doc/gc-guide](https://go.dev/doc/gc-guide)

At a high level, GOGC determines the trade-off between GC CPU and memory

It works by determining the target heap size after each GC cycle, a target value for the total heap size in the next cycle

`Target heap memory = Live heap + (Live heap + GC roots) * GOGC / 100`

GOGC may be configured through either the `GOGC` environment variable (which all Go programs recognize), or through the `SetGCPercent` API in the runtime/debug package

That's why in the 1.19 release, Go added support for setting a runtime memory limit. The memory limit may be configured either via the `GOMEMLIMIT` environment variable which all Go programs recognize, or through the `SetMemoryLimit` function available in the runtime/debug package

In many cases, an indefinite stall is worse than an out-of-memory condition, which tends to result in a much faster failure.

For this reason, the memory limit is defined to be soft. The Go runtime makes no guarantees that it will maintain this memory limit under all circumstances

How this works internally is the GC sets an **upper limit on the amount of CPU time** it can use over some time window (with some hysteresis for very short transient spikes in CPU use). This limit is currently set at roughly `50%`, with a `2 * GOMAXPROCS CPU-second window`

The **pauses are more strongly proportional to GOMAXPROCS** algorithmically, but most commonly are dominated by the time it takes to stop running goroutines.

This is because most of the costs for the GC are incurred while the mark phase is active.

The key takeaway then, is that **reducing GC frequency may also lead to latency improvements**

## managing-dependencies

[https://go.dev/doc/modules/managing-dependencies](https://go.dev/doc/modules/managing-dependencies)

- To add all dependencies for a package in your module: `go get .`
- To get a specific numbered version: `go get example.com/theirmodule@v1.3.4`
- To get the latest version: `go get example.com/theirmodule@latest`
- To keep your managed dependency set tidy: `go mod tidy` this command edits your go.mod file to add modules that are necessary but missing. It also removes unused modules that don’t provide any relevant packages

### Requiring module code in a local directory

```text
require example.com/theirmodule v0.0.0-unpublished

replace example.com/theirmodule v0.0.0-unpublished => ../theirmodule
```

### Requiring external module code from your own repository fork

```text
require example.com/theirmodule v1.2.3

replace example.com/theirmodule v1.2.3 => example.com/myfork/theirmodule v1.2.3-fixed
```
