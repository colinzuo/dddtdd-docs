
## bytes 703,073

<https://pkg.go.dev/bytes>

### Functions

- `func Clone(b []byte) []byte`
- `func Compare(a, b []byte) int`
- `func Contains(b, subslice []byte) bool`
- `func Cut(s, sep []byte) (before, after []byte, found bool)`
- `func CutPrefix(s, prefix []byte) (after []byte, found bool)`
- `func CutSuffix(s, suffix []byte) (before []byte, found bool)`
- `func Equal(a, b []byte) bool`
- `func Fields(s []byte) [][]byte`
- `func HasPrefix(s, prefix []byte) bool`
- `func HasSuffix(s, suffix []byte) bool`
- `func Index(s, sep []byte) int`
- `func Join(s [][]byte, sep []byte) []byte`
- `func LastIndex(s, sep []byte) int`
- `func Repeat(b []byte, count int) []byte`
- `func Replace(s, old, new []byte, n int) []byte`
- `func ReplaceAll(s, old, new []byte) []byte`
- `func Split(s, sep []byte) [][]byte`
- `func SplitN(s, sep []byte, n int) [][]byte`
- `func ToLower(s []byte) []byte`
- `func ToTitle(s []byte) []byte`
- `func ToUpper(s []byte) []byte`
- `func Trim(s []byte, cutset string) []byte`
- `func TrimLeft(s []byte, cutset string) []byte`
- `func TrimPrefix(s, prefix []byte) []byte`
- `func TrimRight(s []byte, cutset string) []byte`
- `func TrimSpace(s []byte) []byte`
- `func TrimSuffix(s, suffix []byte) []byte`

### Types

- Buffer
	+ `func NewBuffer(buf []byte) *Buffer`
	+ `func NewBufferString(s string) *Buffer`
	+ `func (b *Buffer) Bytes() []byte`
	+ `func (b *Buffer) Cap() int`
	+ `func (b *Buffer) Grow(n int)`
	+ `func (b *Buffer) Len() int`
	+ `func (b *Buffer) Next(n int) []byte`
	+ `func (b *Buffer) Read(p []byte) (n int, err error)`
	+ `func (b *Buffer) ReadFrom(r io.Reader) (n int64, err error)`
	+ `func (b *Buffer) ReadString(delim byte) (line string, err error)`
	+ `func (b *Buffer) String() string`
	+ `func (b *Buffer) Truncate(n int)`
	+ `func (b *Buffer) Write(p []byte) (n int, err error)`
	+ `func (b *Buffer) WriteString(s string) (n int, err error)`
- Reader
	+ `func NewReader(b []byte) *Reader`
	+ `func (r *Reader) Len() int`
	+ `func (r *Reader) Read(b []byte) (n int, err error)`
	+ `func (r *Reader) Seek(offset int64, whence int) (int64, error)`
	+ `func (r *Reader) WriteTo(w io.Writer) (n int64, err error)`

## bufio 225,962

<https://pkg.go.dev/bufio>

## context 934,913

<https://pkg.go.dev/context>
<https://go.dev/blog/pipelines>

Package context defines the Context type, which carries deadlines, cancellation signals, and other request-scoped 
values across API boundaries and between processes.

Incoming requests to a server should create a Context, and outgoing calls to servers should accept a Context. 
The chain of function calls between them must propagate the Context, optionally replacing it with a derived Context 
created using WithCancel, WithDeadline, WithTimeout, or WithValue. When a Context is canceled, all Contexts derived 
from it are also canceled.

Do not store Contexts inside a struct type; instead, pass a Context explicitly to each function that needs it. 
The Context should be the first parameter, typically named ctx

The same Context may be passed to functions running in different goroutines; Contexts are safe for simultaneous use 
by multiple goroutines.

- `func WithCancel(parent Context) (ctx Context, cancel CancelFunc)`

WithCancel returns a copy of parent with a new Done channel. The returned context's Done channel is closed when the returned 
cancel function is called or when the parent context's Done channel is closed, whichever happens first.

- `func WithDeadline(parent Context, d time.Time) (Context, CancelFunc)`

The returned context's Done channel is closed when the deadline expires, when the returned cancel function is called, or when the parent context's Done channel is closed, whichever happens first.

- `func WithTimeout(parent Context, timeout time.Duration) (Context, CancelFunc)`

- `type Context interface`

- `func Background() Context`

Background returns a non-nil, empty Context. It is never canceled, has no values, and has no deadline. 
It is typically used by the main function, initialization, and tests, and as the top-level Context for incoming requests

- `func WithValue(parent Context, key, val any) Context`

The provided key must be comparable and should not be of type string or any other built-in type to avoid collisions between packages using context.
Users of WithValue should define their own types for keys.

```go
	type favContextKey string

	f := func(ctx context.Context, k favContextKey) {
		if v := ctx.Value(k); v != nil {
			fmt.Println("found value:", v)
			return
		}
		fmt.Println("key not found:", k)
	}

	k := favContextKey("language")
	ctx := context.WithValue(context.Background(), k, "Go")
```

## crpto/rand 110,554

<https://pkg.go.dev/crypto/rand>

## crpto/tls 108,593

<https://pkg.go.dev/crypto/tls>

## database/sql 78,070

<https://pkg.go.dev/database/sql>

- `func (c *Conn) BeginTx(ctx context.Context, opts *TxOptions) (*Tx, error)`

The provided context is used until the transaction is committed or rolled back. If the context is canceled, the sql package will roll back the transaction. Tx.Commit will return an error if the context provided to BeginTx is canceled.

- `func (c *Conn) Close() error`

Close returns the connection to the connection pool. All operations after a Close will return with ErrConnDone. Close is safe to call concurrently with other operations and will block until all other operations finish.

- `func (c *Conn) ExecContext(ctx context.Context, query string, args ...any) (Result, error)`

```go
	result, err := conn.ExecContext(ctx, `UPDATE balances SET balance = balance + 10 WHERE user_id = ?;`, id)
	if err != nil {
		log.Fatal(err)
	}
	rows, err := result.RowsAffected()
	if err != nil {
		log.Fatal(err)
	}
	if rows != 1 {
		log.Fatalf("expected single row affected, got %d rows affected", rows)
	}
```

- `func (c *Conn) QueryContext(ctx context.Context, query string, args ...any) (*Rows, error)`

- `func (db *DB) BeginTx(ctx context.Context, opts *TxOptions) (*Tx, error)`

 ```go
	tx, err := db.BeginTx(ctx, &sql.TxOptions{Isolation: sql.LevelSerializable})
	if err != nil {
		log.Fatal(err)
	}
	id := 37
	_, execErr := tx.Exec(`UPDATE users SET status = ? WHERE id = ?`, "paid", id)
	if execErr != nil {
		_ = tx.Rollback()
		log.Fatal(execErr)
	}
	if err := tx.Commit(); err != nil {
		log.Fatal(err)
	}
```

- `func (db *DB) Conn(ctx context.Context) (*Conn, error)`

Conn returns a single connection by either opening a new connection or returning an existing connection from the connection pool. Conn will block until either a connection is returned or ctx is canceled. 

- `func (db *DB) ExecContext(ctx context.Context, query string, args ...any) (Result, error)`

- `func (db *DB) PingContext(ctx context.Context) error`

```go
	ctx, cancel := context.WithTimeout(ctx, 1*time.Second)
	defer cancel()

	status := "up"
	if err := db.PingContext(ctx); err != nil {
		status = "down"
	}
```

- `func (db *DB) Query(query string, args ...any) (*Rows, error)`

```go
	age := 27
	q := `
create temp table uid (id bigint); -- Create temp table for queries.
insert into uid
select id from users where age < ?; -- Populate temp table.

-- First result set.
select
	users.id, name
from
	users
	join uid on users.id = uid.id
;

-- Second result set.
select 
	ur.user, ur.role
from
	user_roles as ur
	join uid on uid.id = ur.user
;
	`
	rows, err := db.Query(q, age)
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	for rows.Next() {
		var (
			id   int64
			name string
		)
		if err := rows.Scan(&id, &name); err != nil {
			log.Fatal(err)
		}
		log.Printf("id %d name is %s\n", id, name)
	}
	if !rows.NextResultSet() {
		log.Fatalf("expected more result sets: %v", rows.Err())
	}
	var roleMap = map[int64]string{
		1: "user",
		2: "admin",
		3: "gopher",
	}
	for rows.Next() {
		var (
			id   int64
			role int64
		)
		if err := rows.Scan(&id, &role); err != nil {
			log.Fatal(err)
		}
		log.Printf("id %d has role %s\n", id, roleMap[role])
	}
	if err := rows.Err(); err != nil {
		log.Fatal(err)
	}
```	

- `func (db *DB) QueryContext(ctx context.Context, query string, args ...any) (*Rows, error)`

```go
	rows, err := db.QueryContext(ctx, "SELECT name FROM users WHERE age=?", age)
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()
	names := make([]string, 0)

	for rows.Next() {
		var name string
		if err := rows.Scan(&name); err != nil {
			// Check for a scan error.
			// Query rows will be closed with defer.
			log.Fatal(err)
		}
		names = append(names, name)
	}
	// If the database is being written to ensure to check for Close
	// errors that may be returned from the driver. The query may
	// encounter an auto-commit error and be forced to rollback changes.
	rerr := rows.Close()
	if rerr != nil {
		log.Fatal(rerr)
	}

	// Rows.Err will report the last error encountered by Rows.Scan.
	if err := rows.Err(); err != nil {
		log.Fatal(err)
	}
```

- `func Named(name string, value any) NamedArg`

```go
db.ExecContext(ctx, `
    delete from Invoice
    where
        TimeCreated < @end
        and TimeCreated >= @start;`,
    sql.Named("start", startTime),
    sql.Named("end", endTime),
)
```

- `func (rs *Rows) Close() error`

Close closes the Rows, preventing further enumeration. If Next is called and returns false and there are no further result sets, the Rows are closed automatically and it will suffice to check the result of Err.

- `func (rs *Rows) Next() bool`

Next prepares the next result row for reading with the Scan method. It returns true on success, or false if there is no next result row or an error happened while preparing it. Err should be consulted to distinguish between the two cases.


## embed 21,819

<https://pkg.go.dev/embed>

## encoding/base64 132,846

<https://pkg.go.dev/encoding/base64>

## encoding/binary 151,414

<https://pkg.go.dev/encoding/binary>

## encoding/hex 129,271

<https://pkg.go.dev/encoding/hex>

## encoding/json 760,996

<https://pkg.go.dev/encoding/json>

## errors 857,083

<https://pkg.go.dev/errors>

### Functions

- `func As(err error, target any) bool`
- `func Is(err, target error) bool`
- `func Join(errs ...error) error`
- `func New(text string) error`
- `func Unwrap(err error) error`

## flag 275,520

<https://pkg.go.dev/flag>

## fmt 2,479,414

<https://pkg.go.dev/fmt>

## hash 40,273

<https://pkg.go.dev/hash>

## html/template 51,271

<https://pkg.go.dev/html/template>

## image 27,721

<https://pkg.go.dev/image>

## io 818,044

<https://pkg.go.dev/io>

## io/fs 14,408

<https://pkg.go.dev/io/fs>

Package fs defines basic interfaces to a file system. A file system can be provided by the host operating system but also by other packages

## io/ioutil 547,524

<https://pkg.go.dev/io/ioutil>

### Functions

- Glob
- ReadFile
- ValidPath
- WalkDir

### types

- DirEntry
	+ `func FileInfoToDirEntry(info FileInfo) DirEntry`
	+ `func ReadDir(fsys FS, name string) ([]DirEntry, error)`
- FS
	+ `func Sub(fsys FS, dir string) (FS, error)`
- File
- FileInfo
	+ `func Stat(fsys FS, name string) (FileInfo, error)`
- FileMode
- GlobFS
- PathError
- ReadDirFS
- ReadDirFile
- ReadFileFS
- StatFS
- SubFS
- WalkDirFunc

## log 592,224

<https://pkg.go.dev/log>

## math 303,583

<https://pkg.go.dev/math>

- `func Abs(x float64) float64`

## math/big 111,177

<https://pkg.go.dev/math/big>

## math/rand 175,487

<https://pkg.go.dev/math/rand>

### Functions

- `func Int31() int32`
- `func Int31n(n int32) int32`
- `func Int63() int64`
- `func Int63n(n int64) int64`
- `func Perm(n int) []int`

### Types

- `type Rand struct`
	+ `func New(src Source) *Rand`

## mime 19,006

<https://pkg.go.dev/mime>

## net 352,132

<https://pkg.go.dev/net>

## net/http 826,809

<https://pkg.go.dev/net/http>

## net/httputil 20,463

<https://pkg.go.dev/net/http/httputil>

## net/url 316,398

<https://pkg.go.dev/net/url>

## os 1,142,486

<https://pkg.go.dev/os>

### Functions

- `func Chdir(dir string) error`
- `func DirFS(dir string) fs.FS`
- `func Environ() []string`
- `func Executable() (string, error)`
- `func Exit(code int)`
- `func Getenv(key string) string`
- `func Getpid() int`
- `func Hostname() (name string, err error)`
- `func LookupEnv(key string) (string, bool)`
- `func Mkdir(name string, perm FileMode) error`
- `func MkdirAll(path string, perm FileMode) error`
- `func MkdirTemp(dir, pattern string) (string, error)`
- `func ReadFile(name string) ([]byte, error)`
- `func Remove(name string) error`
- `func RemoveAll(path string) error`
- `func Rename(oldpath, newpath string) error`
- `func WriteFile(name string, data []byte, perm FileMode) error`

## os/exec 140,331

<https://pkg.go.dev/os/exec>

## os/signal 93,706

<https://pkg.go.dev/os/signal>

## path 184,661

<https://pkg.go.dev/path>

## path/filepath 376,569

<https://pkg.go.dev/path/filepath>

## reflection 422,268

<https://pkg.go.dev/reflect>

<https://go.dev/blog/laws-of-reflection>

<https://research.swtch.com/interfaces>

## regexp 281,313

<https://pkg.go.dev/regexp>

## runtime 233,374

<https://pkg.go.dev/runtime>

## runtime/debug 29,113

<https://pkg.go.dev/runtime/debug>

## slices 200

<https://pkg.go.dev/slices>

## sort 298,139

<https://pkg.go.dev/sort>

## strconv 714,304

<https://pkg.go.dev/strconv>

## strings 1,346,470

<https://pkg.go.dev/strings>

## sync 710,183

<https://pkg.go.dev/sync>

- `type Cond struct`
	+ `func NewCond(l Locker) *Cond`
	+ `func (c *Cond) Broadcast()`
	+ `func (c *Cond) Signal()`
	+ `func (c *Cond) Wait()`
- `type Locker interface`
- `type Map struct`
	+ `func (m *Map) CompareAndDelete(key, old any) (deleted bool)`
	+ `func (m *Map) CompareAndSwap(key, old, new any) bool`
	+ `func (m *Map) Delete(key any)`
	+ `func (m *Map) Load(key any) (value any, ok bool)`
	+ `func (m *Map) LoadAndDelete(key any) (value any, loaded bool)`
	+ `func (m *Map) LoadOrStore(key, value any) (actual any, loaded bool)`
	+ `func (m *Map) Store(key, value any)`
	+ `func (m *Map) Swap(key, value any) (previous any, loaded bool)`
- `type Mutex struct`
	+ `func (m *Mutex) Lock()`
	+ `func (m *Mutex) TryLock() bool`
	+ `func (m *Mutex) Unlock()`
- `type RWMutex struct`
	+ `func (rw *RWMutex) Lock()`
	+ `func (rw *RWMutex) RLock()`
	+ `func (rw *RWMutex) RLocker() Locker`
	+ `func (rw *RWMutex) RUnlock()`
	+ `func (rw *RWMutex) TryLock() bool`
	+ `func (rw *RWMutex) TryRLock() bool`
	+ `func (rw *RWMutex) Unlock()`
- `type WaitGroup struct`
	+ `func (wg *WaitGroup) Add(delta int)`
	+ `func (wg *WaitGroup) Done()`
	+ `func (wg *WaitGroup) Wait()`

## sync/atomic 125,983

<https://pkg.go.dev/sync/atomic>

## syscall 156,670

<https://pkg.go.dev/syscall>

## testing 63,663

<https://pkg.go.dev/testing>

Within these functions, use the Error, Fail or related methods to signal failure.

To write a new test suite, create a file that contains the TestXxx functions as described here, and give that file a name ending in "_test.go".

### Skipping

```go
func TestTimeConsuming(t *testing.T) {
    if testing.Short() {
        t.Skip("skipping test in short mode.")
    }
    ...
}
```

### Main

It is sometimes necessary for a test or benchmark program to do extra setup or teardown before or after it executes. It is also sometimes necessary to control which code runs on the main thread.

TestMain runs in the main goroutine and can do whatever setup and teardown is necessary around a call to m.Run. m.Run will return an exit code that may be passed to os.Exit

```go
func TestMain(m *testing.M) {
	// call flag.Parse() here if TestMain uses flags
	os.Exit(m.Run())
}
```

### Functions

- `func Short() bool`

### Types

- B
- M
	+ `func (m *M) Run() (code int)`
- T
	+ `func (c *T) Cleanup(f func())`
	+ `func (t *T) Deadline() (deadline time.Time, ok bool)`
	+ `func (c *T) Error(args ...any)`
	+ `func (c *T) Errorf(format string, args ...any)`
	+ `func (c *T) Fail()`
	+ `func (c *T) FailNow()`
	+ `func (c *T) Failed() bool`
	+ `func (c *T) Fatal(args ...any)`
	+ `func (c *T) Fatalf(format string, args ...any)`
	+ `func (c *T) Log(args ...any)`
	+ `func (c *T) Logf(format string, args ...any)`
	+ `func (c *T) Name() string`
	+ `func (t *T) Run(name string, f func(t *T)) bool`
	+ `func (t *T) Setenv(key, value string)`
	+ `func (c *T) Skip(args ...any)`
	+ `func (c *T) SkipNow()`
	+ `func (c *T) Skipf(format string, args ...any)`
	+ `func (c *T) Skipped() bool`
	+ `func (c *T) TempDir() string`

## text/template 62,028

<https://pkg.go.dev/text/template>

## time 1,410,979

<https://pkg.go.dev/time>

### Functions

- `func After(d Duration) <-chan Time`
- `func Sleep(d Duration)`
- `func Tick(d Duration) <-chan Time`

### Types

- `type Duration int64`
	+ `func Since(t Time) Duration`
	+ `func Until(t Time) Duration`
	+ `func (d Duration) Milliseconds() int64`
	+ `func (d Duration) Seconds() float64`
- `type Location struct`
	+ `var Local *Location = &localLoc`
	+ `var UTC *Location = &utcLoc`
- `type Ticker struct`
	+ `func NewTicker(d Duration) *Ticker`
	+ `func (t *Ticker) Stop()`
- `type Time struct`
	+ `func Now() Time`
	+ `func Parse(layout, value string) (Time, error)`
- `type Timer struct`
	+ `func AfterFunc(d Duration, f func()) *Timer`
	+ `func NewTimer(d Duration) *Timer`
	+ `func (t *Timer) Stop() bool`

## unicode 69,773

<https://pkg.go.dev/unicode>

- `func IsDigit(r rune) bool`
- `func IsLetter(r rune) bool`
- `func IsLower(r rune) bool`
- `func IsPrint(r rune) bool`
- `func IsPunct(r rune) bool`
- `func IsSpace(r rune) bool`
- `func IsUpper(r rune) bool`
- `func ToLower(r rune) rune`
- `func ToUpper(r rune) rune`

## unicode/utf8 75,146

<https://pkg.go.dev/unicode/utf8>

## unsafe 90,224

<https://pkg.go.dev/unsafe>
