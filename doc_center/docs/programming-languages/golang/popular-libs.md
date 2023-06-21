
## auth

### bcrypt

<https://pkg.go.dev/golang.org/x/crypto/bcrypt>

- `func CompareHashAndPassword(hashedPassword, password []byte) error`
- `func GenerateFromPassword(password []byte, cost int) ([]byte, error)`

## cache

### go-cache

<https://github.com/patrickmn/go-cache>

- `func New(defaultExpiration, cleanupInterval time.Duration) *Cache`

## concurrency

### sync

<https://pkg.go.dev/golang.org/x/sync>

- errgroup
    + `type Group struct`
    + `func WithContext(ctx context.Context) (*Group, context.Context)`
    + `func (g *Group) Go(f func() error)`
    + `func (g *Group) Wait() error`

## config

### pflag

<https://github.com/spf13/pflag>

兼容`flag`，另支持shorthand

The pflag package also defines some new functions that are not in flag, that give one-letter shorthands for flags.

### viper

<https://github.com/spf13/viper>

Viper uses the following precedence order. Each item takes precedence over the item below it:

- explicit call to Set
- flag
- env
- config
- key/value store
- default

## database

### go-redis

<https://github.com/redis/go-redis>

### gorm

<https://github.com/go-gorm/gorm>
<https://pkg.go.dev/gorm.io/gorm>

#### Types

- `type ColumnType interface`
- `type Config struct`
- `type ConnPool interface`
- `type DB struct`
    + `func Open(dialector Dialector, opts ...Option) (db *DB, err error)`
    + `func (db *DB) Begin(opts ...*sql.TxOptions) *DB`
    + `func (db *DB) Commit() *DB`
    + `func (db *DB) Connection(fc func(tx *DB) error) (err error)`
    + `func (db *DB) Create(value interface{}) (tx *DB)`
    + `func (db *DB) CreateInBatches(value interface{}, batchSize int) (tx *DB)`
    + `func (db *DB) DB() (*sql.DB, error)`
    + `func (db *DB) Debug() (tx *DB)`
    + `func (db *DB) Delete(value interface{}, conds ...interface{}) (tx *DB)`
    + `func (db *DB) Exec(sql string, values ...interface{}) (tx *DB)`
    + `func (db *DB) Find(dest interface{}, conds ...interface{}) (tx *DB)`
    + `func (db *DB) First(dest interface{}, conds ...interface{}) (tx *DB)`
    + `func (db *DB) Limit(limit int) (tx *DB)`
    + `func (db *DB) Model(value interface{}) (tx *DB)`
    + `func (db *DB) Not(query interface{}, args ...interface{}) (tx *DB)`
    + `func (db *DB) Offset(offset int) (tx *DB)`
    + `func (db *DB) Or(query interface{}, args ...interface{}) (tx *DB)`
    + `func (db *DB) Order(value interface{}) (tx *DB)`
    + `func (db *DB) Raw(sql string, values ...interface{}) (tx *DB)`
    + `func (db *DB) Rollback() *DB`
    + `func (db *DB) Row() *sql.Row`
    + `func (db *DB) Rows() (*sql.Rows, error)`
    + `func (db *DB) Scan(dest interface{}) (tx *DB)`
    + `func (db *DB) ScanRows(rows *sql.Rows, dest interface{}) error`
    + `func (db *DB) Scopes(funcs ...func(*DB) *DB) (tx *DB)`
    + `func (db *DB) Select(query interface{}, args ...interface{}) (tx *DB)`
    + `func (db *DB) Session(config *Session) *DB`
    + `func (db *DB) Take(dest interface{}, conds ...interface{}) (tx *DB)`
    + `func (db *DB) ToSQL(queryFn func(tx *DB) *DB) string`
    + `func (db *DB) Transaction(fc func(tx *DB) error, opts ...*sql.TxOptions) (err error)`
    + `func (db *DB) Updates(values interface{}) (tx *DB)`
    + `func (db *DB) Where(query interface{}, args ...interface{}) (tx *DB)`

### migrate

<https://github.com/golang-migrate/migrate>

#### Types

- ErrDirty
- ErrShortLimit
- Logger
    + `Printf(format string, v ...interface{})`
- Migrate
    + `func New(sourceURL, databaseURL string) (*Migrate, error)`
    + `func NewWithDatabaseInstance(sourceURL string, databaseName string, databaseInstance database.Driver) (*Migrate, error)`
    + `func NewWithInstance(sourceName string, sourceInstance source.Driver, databaseName string, databaseInstance database.Driver) (*Migrate, error)`
    + `func NewWithSourceInstance(sourceName string, sourceInstance source.Driver, databaseURL string) (*Migrate, error)`
    + `func (m *Migrate) Close() (source error, database error)`
    + `func (m *Migrate) Down() error`
    + `func (m *Migrate) Drop() error`
    + `func (m *Migrate) Force(version int) error`
    + `func (m *Migrate) Migrate(version uint) error`
    + `func (m *Migrate) Steps(n int) error`
    + `func (m *Migrate) Up() error`
    + `func (m *Migrate) Version() (version uint, dirty bool, err error)`

### mysql

<https://pkg.go.dev/github.com/go-sql-driver/mysql>

## log

### logrus

<https://github.com/sirupsen/logrus>

Logrus is a **structured logger** for Go (golang), completely API **compatible** with the standard library logger.

### lumberjack

<https://github.com/natefinch/lumberjack>

lumberjack is a log rolling package for Go

## testing

### go-cmp

<https://github.com/google/go-cmp>
<https://pkg.go.dev/github.com/google/go-cmp/cmp>
<https://pkg.go.dev/github.com/google/go-cmp@v0.5.9/cmp/cmpopts>

#### Functions

- `func Diff(x, y interface{}, opts ...Option) string`
- `func Equal(x, y interface{}, opts ...Option) bool`

#### cmpopts

- `func EquateApprox(fraction, margin float64) cmp.Option`
- `func EquateEmpty() cmp.Option`
- `func IgnoreFields(typ interface{}, names ...string) cmp.Option`
- `func IgnoreUnexported(typs ...interface{}) cmp.Option`

### gomock

<https://github.com/golang/mock>
<https://pkg.go.dev/github.com/golang/mock/gomock>

### testcontainers-go

<https://github.com/testcontainers/testcontainers-go>
<https://golang.testcontainers.org/>
<https://pkg.go.dev/github.com/testcontainers/testcontainers-go>
<https://levelup.gitconnected.com/embedded-database-in-go-testing-10d29a8e454a>

#### Types

- Container
    + `Endpoint(context.Context, string) (string, error)               // get proto://ip:port string for the first exposed port`
    + `PortEndpoint(context.Context, nat.Port, string) (string, error) // get proto://ip:port string for the given exposed port`
    + `MappedPort(context.Context, nat.Port) (nat.Port, error)         // get externally mapped port for a container port`
    + `Terminate(context.Context) error             // terminate the container`
    + `Exec(ctx context.Context, cmd []string, options ...tcexec.ProcessOption) (int, io.Reader, error)`
    + `CopyDirToContainer(ctx context.Context, hostDirPath string, containerParentPath string, fileMode int64) error`
    + `CopyFileToContainer(ctx context.Context, hostFilePath string, containerFilePath string, fileMode int64) error`
    + `func GenericContainer(ctx context.Context, req GenericContainerRequest) (Container, error)`
- ContainerCustomizer
    + `Customize(req *GenericContainerRequest)`
- ContainerMount
    + `func BindMount(hostPath string, mountTarget ContainerMountTarget) ContainerMount`
- ContainerMountSource
- ContainerMountTarget
- ContainerOption
- ContainerProvider
- ContainerRequest
- CustomizeRequestOption
- FromDockerfile
- GenericContainerRequest

### testify

<https://github.com/stretchr/testify>
<https://pkg.go.dev/github.com/stretchr/testify>

#### assert

<https://pkg.go.dev/github.com/stretchr/testify@v1.8.2/assert>

- `func Contains(t TestingT, s, contains interface{}, msgAndArgs ...interface{}) bool`
- `func Containsf(t TestingT, s interface{}, contains interface{}, msg string, args ...interface{}) bool`
- `func Equal(t TestingT, expected, actual interface{}, msgAndArgs ...interface{}) bool`
- `func Eventually(t TestingT, condition func() bool, waitFor time.Duration, tick time.Duration, msgAndArgs ...interface{}) bool`
- `func Eventuallyf(t TestingT, condition func() bool, waitFor time.Duration, tick time.Duration, msg string, args ...interface{}) bool`
- `func False(t TestingT, value bool, msgAndArgs ...interface{}) bool`
- `func Falsef(t TestingT, value bool, msg string, args ...interface{}) bool`
- `func Greater(t TestingT, e1 interface{}, e2 interface{}, msgAndArgs ...interface{}) bool`
- `func InDelta(t TestingT, expected, actual interface{}, delta float64, msgAndArgs ...interface{}) bool`
- `func IsType(t TestingT, expectedType interface{}, object interface{}, msgAndArgs ...interface{}) bool`
- `func Never(t TestingT, condition func() bool, waitFor time.Duration, tick time.Duration, msgAndArgs ...interface{}) bool`
- `func Nil(t TestingT, object interface{}, msgAndArgs ...interface{}) bool`
- `func NotContains(t TestingT, s, contains interface{}, msgAndArgs ...interface{}) bool`
- `func NotEqual(t TestingT, expected, actual interface{}, msgAndArgs ...interface{}) bool`
- `func True(t TestingT, value bool, msgAndArgs ...interface{}) bool`

#### mock

<https://pkg.go.dev/github.com/stretchr/testify@v1.8.2/mock>

##### Functions

- `func AssertExpectationsForObjects(t TestingT, testObjects ...interface{}) bool`
- `func MatchedBy(fn interface{}) argumentMatcher`

##### Types

- `func AnythingOfType(t string) AnythingOfTypeArgument`
- `type Arguments []interface{}`
- `type Call struct {`
    + `func (c *Call) After(d time.Duration) *Call`
    + `func (c *Call) Maybe() *Call`
    + `func (c *Call) On(methodName string, arguments ...interface{}) *Call`
    + `func (c *Call) Panic(msg string) *Call`
    + `func (c *Call) Return(returnArguments ...interface{}) *Call`
    + `func (c *Call) Run(fn func(args Arguments)) *Call`
    + `func (c *Call) Unset() *Call`
    + `func (c *Call) WaitUntil(w <-chan time.Time) *Call`
- `type Mock struct {`
    + `func (m *Mock) On(methodName string, arguments ...interface{}) *Call`

#### require

<https://pkg.go.dev/github.com/stretchr/testify@v1.8.2/require>

Package require implements the same assertions as the `assert` package but stops test execution when a test fails

#### suite

<https://pkg.go.dev/github.com/stretchr/testify@v1.8.2/suite>

- `func Run(t *testing.T, suite TestingSuite)`
- `type AfterTest interface`
- `type BeforeTest interface`
- `type SetupAllSuite interface`
- `type SetupTestSuite interface`
- `type Suite struct`
    + `func (suite *Suite) Assert() *assert.Assertions`
    + `func (suite *Suite) Require() *require.Assertions`
    + `func (suite *Suite) T() *testing.T`
- `type TearDownAllSuite interface`
- `type TearDownTestSuite interface`

#### mockery

<https://github.com/vektra/mockery>
<https://vektra.github.io/mockery/>
