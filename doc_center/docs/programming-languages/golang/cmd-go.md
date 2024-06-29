
<https://pkg.go.dev/cmd/go>

## Compile packages and dependencies

When compiling packages, build ignores files that end in `_test.go`.

When compiling a single main package, build writes the resulting executable to an output file named after the last non-major-version component of the package import path

## Print Go environment information

```shell
go env [-json] [-u] [-w] [var ...]
```

## Generate Go files by processing source

```shell
go generate [-run regexp] [-n] [-v] [-x] [build flags] [file.go... | packages]
```

Go generate scans the file for directives, which are lines of the form

```go
//go:generate command argument...
```

The arguments to the directive are space-separated tokens or double-quoted strings passed to the generator as individual arguments when it is run.

Quoted strings use Go syntax and are evaluated before execution; a quoted string appears as a single argument to the generator

As a last step before running the command, any invocations of any environment variables with alphanumeric names, such as `$GOFILE` or `$HOME`, are expanded throughout the command line

A directive of the form
```go
//go:generate -command xxx args...
```
specifies, for the remainder of this source file only, that the string xxx represents the command identified by the arguments. This can be used to create **aliases** or to handle multiword generators

Generate processes packages in the order given on the command line, one at a time. If the command line lists .go files from a single directory, they are treated as a single package. Within a package, generate processes the source files in a package in file name order, one at a time. Within a source file, generate runs generators in the order they appear in the file, one at a time. The go generate tool also sets the build tag "generate" so that files may be examined by go generate but ignored during build

## Add dependencies to current module and install them

```shell
go get [-t] [-u] [-v] [build flags] [packages]
```

Get resolves its command-line arguments to packages at specific module versions, **updates go.mod to require those versions, and downloads source code into the module cache**

## Download modules to local cache

```shell
go mod download [-x] [-json] [-reuse=old.json] [modules]
```

## Initialize new module in current directory

```shell
go mod init [module-path]
```

## Add missing and remove unused modules

```shell
go mod tidy [-e] [-v] [-x] [-go=version] [-compat=version]
```

## Verify dependencies have expected content

```shell
go mod verify
```

Verify checks that the dependencies of the current module, which are stored in a local downloaded source cache, have **not been modified since being downloaded**

## Compile and run Go program

```shell
go run [build flags] [-exec xprog] package [arguments...]
```

## Test packages

```shell
go test [build/test flags] [packages] [build/test flags & test binary flags]
```

'Go test' recompiles each package along with any files with names matching the file pattern `*_test.go`. These additional files can contain test functions, benchmark functions, fuzz tests and example functions. See `go help testfunc` for more. Each listed package causes the execution of a **separate test binary**. Files whose names begin with **"_" (including "_test.go") or "." are ignored**

Test files that declare a package with the suffix `_test` will be compiled as a separate package, and then linked and run with the main test binary

The go tool will ignore a directory named `testdata`, making it available to hold ancillary data needed by the tests

As part of building a test binary, go test runs `go vet` on the package and its test source files to identify significant problems

## Report likely mistakes in packages

```shell
go vet [build flags] [-vettool prog] [vet flags] [packages]
```

## Build constraints

A build constraint, also known as a build tag, is a condition under which a file should be included in the package

```go
//go:build (linux && 386) || (darwin && !cgo)
```

Constraints may appear in any kind of source file (not just Go), but they must appear near the top of the file, preceded only by blank lines and other comments. These rules mean that in Go files a build constraint must appear before the package clause

To distinguish build constraints from package documentation, a build constraint should be followed by a blank line

A build constraint comment is evaluated as an expression containing build tags combined by `||, &&, and ! operators and parentheses`

It is an error for a file to have more than one `//go:build` line.

During a particular build, the following build tags are satisfied:

- the target operating system, as spelled by runtime.GOOS, set with the GOOS environment variable.
- the target architecture, as spelled by runtime.GOARCH, set with the GOARCH environment variable.
- any architecture features, in the form GOARCH.feature (for example, "amd64.v2"), as detailed below.
- "unix", if GOOS is a Unix or Unix-like system.
- the compiler being used, either "gc" or "gccgo"
- "cgo", if the cgo command is supported (see CGO_ENABLED in 'go help environment').
- a term for each Go major release, through the current version: "go1.1" from Go version 1.1 onward, "go1.12" from Go 1.12, and so on.
- any additional tags given by the -tags flag (see 'go help build')

If a file's name, after stripping the extension and a possible `_test` suffix, matches any of the following patterns

```text
*_GOOS
*_GOARCH
*_GOOS_GOARCH
```

(example: source_windows_amd64.go) where GOOS and GOARCH represent any known operating system and architecture values respectively, then the file is considered to have an **implicit build constraint** requiring those terms (in addition to any explicit constraints in the file)

## Build modes

```text
-buildmode=archive
	Build the listed non-main packages into .a files. Packages named
	main are ignored.

-buildmode=c-archive
	Build the listed main package, plus all packages it imports,
	into a C archive file. The only callable symbols will be those
	functions exported using a cgo //export comment. Requires
	exactly one main package to be listed.

-buildmode=c-shared
	Build the listed main package, plus all packages it imports,
	into a C shared library. The only callable symbols will
	be those functions exported using a cgo //export comment.
	Requires exactly one main package to be listed.

-buildmode=default
	Listed main packages are built into executables and listed
	non-main packages are built into .a files (the default
	behavior).

-buildmode=shared
	Combine all the listed non-main packages into a single shared
	library that will be used when building with the -linkshared
	option. Packages named main are ignored.

-buildmode=exe
	Build the listed main packages and everything they import into
	executables. Packages not named main are ignored.

-buildmode=pie
	Build the listed main packages and everything they import into
	position independent executables (PIE). Packages not named
	main are ignored.

-buildmode=plugin
	Build the listed main packages, plus all packages that they
	import, into a Go plugin. Packages not named main are ignored.
```

## Internal Directories

Code in or below a directory named "internal" is **importable only by** code in the directory tree rooted at the parent of "internal"

## Package lists and patterns

There are four reserved names for paths that should not be used for packages to be built with the go tool:

- "main" denotes the top-level package in a stand-alone executable.

- "all" expands to all packages found in all the GOPATH trees. For example, 'go list all' lists all the packages on the local system. When using modules, "all" expands to all packages in the main module and their dependencies, including dependencies needed by tests of any of those.

- "std" is like all but expands to just the packages in the standard Go library.

- "cmd" expands to the Go repository's commands and their internal libraries

An import path is a pattern if it includes one or more **"..." wildcards**, each of which can match any string, including the empty string and strings containing slashes

Packages in a program need not have unique package names, but there are two reserved package names with special meaning. The name `main` indicates a command, not a library. Commands are built into binaries and cannot be imported. The name `documentation` indicates documentation for a non-Go program in the directory. Files in package documentation are ignored by the go command

Directory and file names that begin with **"." or "_"** are ignored by the go tool, as are directories named **"testdata"**

## Testing flags

```text
-benchtime t
    Run enough iterations of each benchmark to take t, specified
    as a time.Duration (for example, -benchtime 1h30s).
    The default is 1 second (1s).
    The special syntax Nx means to run the benchmark N times
    (for example, -benchtime 100x).

-cover
    Enable coverage analysis.
    Note that because coverage works by annotating the source
    code before compilation, compilation and test failures with
    coverage enabled may report line numbers that don't correspond
    to the original sources.

-failfast
    Do not start new tests after the first test failure

-run regexp
    Run only those tests, examples, and fuzz tests matching the regular
    expression. For tests, the regular expression is split by unbracketed
    slash (/) characters into a sequence of regular expressions, and each
    part of a test's identifier must match the corresponding element in
    the sequence, if any. Note that possible parents of matches are
    run too, so that -run=X/Y matches and runs and reports the result
    of all tests matching X, even those without sub-tests matching Y,
    because it must run them to look for those sub-tests.
    See also -skip

-short
    Tell long-running tests to shorten their run time.
    It is off by default but set during all.bash so that installing
    the Go tree can run a sanity check but not spend time running
    exhaustive tests

-timeout d
    If a test binary runs longer than duration d, panic.
    If d is 0, the timeout is disabled.
    The default is 10 minutes (10m)

-v
    Verbose output: log all tests as they are run. Also print all
    text from Log and Logf calls even if the test succeeds                        
```

```text
-benchmem
    Print memory allocation statistics for benchmarks.

-blockprofile block.out
    Write a goroutine blocking profile to the specified file
    when all tests are complete.
    Writes test binary as -c would

-cpuprofile cpu.out
    Write a CPU profile to the specified file before exiting.
    Writes test binary as -c would

-memprofile mem.out
    Write an allocation profile to the file after all tests have passed.
    Writes test binary as -c would

-mutexprofile mutex.out
    Write a mutex contention profile to the specified file
    when all tests are complete.
    Writes test binary as -c would            
```
