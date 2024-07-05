
## keepalive

[https://pkg.go.dev/google.golang.org/grpc/keepalive](https://pkg.go.dev/google.golang.org/grpc/keepalive)

### ClientParameters

```go
type ClientParameters struct {
	// After a duration of this time if the client doesn't see any activity it
	// pings the server to see if the transport is still alive.
	// If set below 10s, a minimum value of 10s will be used instead.
	Time time.Duration // The current default value is infinity.
	// After having pinged for keepalive check, the client waits for a duration
	// of Timeout and if no activity is seen even after that the connection is
	// closed.
	Timeout time.Duration // The current default value is 20 seconds.
	// If true, client sends keepalive pings even with no active RPCs. If false,
	// when there are no active RPCs, Time and Timeout will be ignored and no
	// keepalive pings will be sent.
	PermitWithoutStream bool // false by default.
}
```

### EnforcementPolicy

```go
type EnforcementPolicy struct {
	// MinTime is the minimum amount of time a client should wait before sending
	// a keepalive ping.
	MinTime time.Duration // The current default value is 5 minutes.
	// If true, server allows keepalive pings even when there are no active
	// streams(RPCs). If false, and client sends ping when there are no active
	// streams, server will send GOAWAY and close the connection.
	PermitWithoutStream bool // false by default.
}
```

### ServerParameters

```go
type ServerParameters struct {
	// MaxConnectionIdle is a duration for the amount of time after which an
	// idle connection would be closed by sending a GoAway. Idleness duration is
	// defined since the most recent time the number of outstanding RPCs became
	// zero or the connection establishment.
	MaxConnectionIdle time.Duration // The current default value is infinity.
	// MaxConnectionAge is a duration for the maximum amount of time a
	// connection may exist before it will be closed by sending a GoAway. A
	// random jitter of +/-10% will be added to MaxConnectionAge to spread out
	// connection storms.
	MaxConnectionAge time.Duration // The current default value is infinity.
	// MaxConnectionAgeGrace is an additive period after MaxConnectionAge after
	// which the connection will be forcibly closed.
	MaxConnectionAgeGrace time.Duration // The current default value is infinity.
	// After a duration of this time if the server doesn't see any activity it
	// pings the client to see if the transport is still alive.
	// If set below 1s, a minimum value of 1s will be used instead.
	Time time.Duration // The current default value is 2 hours.
	// After having pinged for keepalive check, the server waits for a duration
	// of Timeout and if no activity is seen even after that the connection is
	// closed.
	Timeout time.Duration // The current default value is 20 seconds.
}
```

## metadata

[https://pkg.go.dev/google.golang.org/grpc/metadata](https://pkg.go.dev/google.golang.org/grpc/metadata)

- `func AppendToOutgoingContext(ctx context.Context, kv ...string) context.Context`
- `func NewIncomingContext(ctx context.Context, md MD) context.Context`
- `func NewOutgoingContext(ctx context.Context, md MD) context.Context`
- `func ValueFromIncomingContext(ctx context.Context, key string) []string`
- `type MD map[string][]string`
- `func FromIncomingContext(ctx context.Context) (MD, bool)`
- `func FromOutgoingContext(ctx context.Context) (MD, bool)`
- `func Join(mds ...MD) MD`
- `func New(m map[string]string) MD`
- `func Pairs(kv ...string) MD`
- `func (md MD) Append(k string, vals ...string)`
- `func (md MD) Copy() MD`
- `func (md MD) Delete(k string)`
- `func (md MD) Get(k string) []string`
- `func (md MD) Len() int`
- `func (md MD) Set(k string, vals ...string)`

```go
type mdIncomingKey struct{}
type mdOutgoingKey struct{}

// NewIncomingContext creates a new context with incoming md attached.
func NewIncomingContext(ctx context.Context, md MD) context.Context {
	return context.WithValue(ctx, mdIncomingKey{}, md)
}

// NewOutgoingContext creates a new context with outgoing md attached. If used
// in conjunction with AppendToOutgoingContext, NewOutgoingContext will
// overwrite any previously-appended metadata.
func NewOutgoingContext(ctx context.Context, md MD) context.Context {
	return context.WithValue(ctx, mdOutgoingKey{}, rawMD{md: md})
}
```

## status

[https://pkg.go.dev/google.golang.org/grpc/status](https://pkg.go.dev/google.golang.org/grpc/status)

- `func Code(err error) codes.Code`
- `func Error(c codes.Code, msg string) error`
- `func Errorf(c codes.Code, format string, a ...interface{}) error`
- `type Status = status.Status`
- `func New(c codes.Code, msg string) *Status`
- `func Newf(c codes.Code, format string, a ...interface{}) *Status`
