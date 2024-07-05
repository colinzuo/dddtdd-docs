
[https://pkg.go.dev/github.com/gin-gonic/gin](https://pkg.go.dev/github.com/gin-gonic/gin)

## type Context

```go
type Context struct {
	Request *http.Request
	Writer  ResponseWriter

	Params Params

	// Keys is a key/value pair exclusively for the context of each request.
	Keys map[string]any

	// Errors is a list of errors attached to all the handlers/middlewares who used this context.
	Errors errorMsgs

	// Accepted defines a list of manually accepted formats for content negotiation.
	Accepted []string
	// contains filtered or unexported fields
}
```

- `func (c *Context) Abort()`
- `func (c *Context) Done() <-chan struct{}`
- `func (c *Context) Err() error`
- `func (c *Context) Error(err error) *Error`
- `func (c *Context) Get(key string) (value any, exists bool)`
- `func (c *Context) GetDuration(key string) (d time.Duration)`
- `func (c *Context) Next()`
- `func (c *Context) Set(key string, value any)`
- `func (c *Context) Value(key any) any`

## type Engine

```go
type Engine struct {
	RouterGroup

	// RedirectTrailingSlash enables automatic redirection if the current route can't be matched but a
	// handler for the path with (without) the trailing slash exists.
	// For example if /foo/ is requested but a route only exists for /foo, the
	// client is redirected to /foo with http status code 301 for GET requests
	// and 307 for all other request methods.
	RedirectTrailingSlash bool

	// RedirectFixedPath if enabled, the router tries to fix the current request path, if no
	// handle is registered for it.
	// First superfluous path elements like ../ or // are removed.
	// Afterwards the router does a case-insensitive lookup of the cleaned path.
	// If a handle can be found for this route, the router makes a redirection
	// to the corrected path with status code 301 for GET requests and 307 for
	// all other request methods.
	// For example /FOO and /..//Foo could be redirected to /foo.
	// RedirectTrailingSlash is independent of this option.
	RedirectFixedPath bool

	// HandleMethodNotAllowed if enabled, the router checks if another method is allowed for the
	// current route, if the current request can not be routed.
	// If this is the case, the request is answered with 'Method Not Allowed'
	// and HTTP status code 405.
	// If no other Method is allowed, the request is delegated to the NotFound
	// handler.
	HandleMethodNotAllowed bool

	// ForwardedByClientIP if enabled, client IP will be parsed from the request's headers that
	// match those stored at `(*gin.Engine).RemoteIPHeaders`. If no IP was
	// fetched, it falls back to the IP obtained from
	// `(*gin.Context).Request.RemoteAddr`.
	ForwardedByClientIP bool

	// AppEngine was deprecated.
	// Deprecated: USE `TrustedPlatform` WITH VALUE `gin.PlatformGoogleAppEngine` INSTEAD
	// #726 #755 If enabled, it will trust some headers starting with
	// 'X-AppEngine...' for better integration with that PaaS.
	AppEngine bool

	// UseRawPath if enabled, the url.RawPath will be used to find parameters.
	UseRawPath bool

	// UnescapePathValues if true, the path value will be unescaped.
	// If UseRawPath is false (by default), the UnescapePathValues effectively is true,
	// as url.Path gonna be used, which is already unescaped.
	UnescapePathValues bool

	// RemoveExtraSlash a parameter can be parsed from the URL even with extra slashes.
	// See the PR #1817 and issue #1644
	RemoveExtraSlash bool

	// RemoteIPHeaders list of headers used to obtain the client IP when
	// `(*gin.Engine).ForwardedByClientIP` is `true` and
	// `(*gin.Context).Request.RemoteAddr` is matched by at least one of the
	// network origins of list defined by `(*gin.Engine).SetTrustedProxies()`.
	RemoteIPHeaders []string

	// TrustedPlatform if set to a constant of value gin.Platform*, trusts the headers set by
	// that platform, for example to determine the client IP
	TrustedPlatform string

	// MaxMultipartMemory value of 'maxMemory' param that is given to http.Request's ParseMultipartForm
	// method call.
	MaxMultipartMemory int64

	// UseH2C enable h2c support.
	UseH2C bool

	// ContextWithFallback enable fallback Context.Deadline(), Context.Done(), Context.Err() and Context.Value() when Context.Request.Context() is not nil.
	ContextWithFallback bool

	HTMLRender render.HTMLRender
	FuncMap    template.FuncMap
	// contains filtered or unexported fields
}
```

- `func Default() *Engine`
- `func New() *Engine`
- `func (engine *Engine) Routes() (routes RoutesInfo)`
- `func (engine *Engine) Run(addr ...string) (err error)`
- `func (engine *Engine) RunListener(listener net.Listener) (err error)`
- `func (engine *Engine) Use(middleware ...HandlerFunc) IRoutes`

## type Error

```go
type Error struct {
	Err  error
	Type ErrorType
	Meta any
}
```

## type HandlerFunc

```go
type HandlerFunc func(*Context)
```

## func CustomRecovery

```go
func CustomRecovery(handle RecoveryFunc) HandlerFunc
```

## func Logger

```go
func Logger() HandlerFunc
```

- `func Recovery() HandlerFunc`
- `type HandlersChain []HandlerFunc`

## type IRouter

```go
type IRouter interface {
	IRoutes
	Group(string, ...HandlerFunc) *RouterGroup
}
```

## type IRoutes

```go
type IRoutes interface {
	Use(...HandlerFunc) IRoutes

	Handle(string, string, ...HandlerFunc) IRoutes
	Any(string, ...HandlerFunc) IRoutes
	GET(string, ...HandlerFunc) IRoutes
	POST(string, ...HandlerFunc) IRoutes
	DELETE(string, ...HandlerFunc) IRoutes
	PATCH(string, ...HandlerFunc) IRoutes
	PUT(string, ...HandlerFunc) IRoutes
	OPTIONS(string, ...HandlerFunc) IRoutes
	HEAD(string, ...HandlerFunc) IRoutes
	Match([]string, string, ...HandlerFunc) IRoutes

	StaticFile(string, string) IRoutes
	StaticFileFS(string, string, http.FileSystem) IRoutes
	Static(string, string) IRoutes
	StaticFS(string, http.FileSystem) IRoutes
}
```

## type LoggerConfig

```go
type LoggerConfig struct {
	// Optional. Default value is gin.defaultLogFormatter
	Formatter LogFormatter

	// Output is a writer where logs are written.
	// Optional. Default value is gin.DefaultWriter.
	Output io.Writer

	// SkipPaths is an url path array which logs are not written.
	// Optional.
	SkipPaths []string
}
```

## type RouteInfo

```go
type RouteInfo struct {
	Method      string
	Path        string
	Handler     string
	HandlerFunc HandlerFunc
}
```

## type RouterGroup

```go
type RouterGroup struct {
	Handlers HandlersChain
	// contains filtered or unexported fields
}
```

- `func (group *RouterGroup) BasePath() string`
- `func (group *RouterGroup) GET(relativePath string, handlers ...HandlerFunc) IRoutes`
- `func (group *RouterGroup) Group(relativePath string, handlers ...HandlerFunc) *RouterGroup`
- `func (group *RouterGroup) Use(middleware ...HandlerFunc) IRoutes`
