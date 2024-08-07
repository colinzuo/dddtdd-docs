
[https://pkg.go.dev/google.golang.org/grpc](https://pkg.go.dev/google.golang.org/grpc)

```go
import "google.golang.org/grpc"
```

```bash
go get google.golang.org/grpc
```

## func SendHeader

`func SendHeader(ctx context.Context, md metadata.MD) error`

It may be called at most once, and may not be called after any event that causes headers to be sent (see SetHeader for a complete list). The provided md and headers set by `SetHeader()` will be sent

## func SetHeader

`func SetHeader(ctx context.Context, md metadata.MD) error`

When called multiple times, all the provided metadata will be merged

## type CallOption

`type CallOption interface`

## func Header

`func Header(md *metadata.MD) CallOption`

Header returns a CallOptions that **retrieves the header metadata** for a unary RPC

## func Peer

`func Peer(p *peer.Peer) CallOption`

Peer returns a CallOption that **retrieves peer information** for a unary RPC. The peer field will be populated *after* the RPC completes

## func DialContext

`func DialContext(ctx context.Context, target string, opts ...DialOption) (conn *ClientConn, err error)`

To make it a blocking dial, use `WithBlock()` dial option

In the non-blocking case, the ctx does not act against the connection. It only controls the setup steps.

In the blocking case, ctx can be used to cancel or expire the pending connection. Once this function returns, the cancellation and expiration of ctx will be noop. Users should call ClientConn.Close to terminate all the pending operations after this function returns

## type ClientConn

`type ClientConn struct {`

ClientConn represents a virtual connection to a conceptual endpoint, to perform RPCs.

A ClientConn is free to have zero or more actual connections to the endpoint based on configuration, load, etc. It is also free to determine which actual endpoints to use and may change it every RPC, permitting client-side load balancing

- `func (cc *ClientConn) Close() error`
- `func (cc *ClientConn) Connect()`
- `func (cc *ClientConn) Invoke(ctx context.Context, method string, args, reply any, opts ...CallOption) error`
- `func (cc *ClientConn) NewStream(ctx context.Context, desc *StreamDesc, method string, opts ...CallOption) (ClientStream, error)`

## type ClientConnInterface

```go
type ClientConnInterface interface {
	// Invoke performs a unary RPC and returns after the response is received
	// into reply.
	Invoke(ctx context.Context, method string, args any, reply any, opts ...CallOption) error
	// NewStream begins a streaming RPC.
	NewStream(ctx context.Context, desc *StreamDesc, method string, opts ...CallOption) (ClientStream, error)
}
```

## type ClientStream

```go
type ClientStream interface {
	// Header returns the header metadata received from the server if there
	// is any. It blocks if the metadata is not ready to read.  If the metadata
	// is nil and the error is also nil, then the stream was terminated without
	// headers, and the status can be discovered by calling RecvMsg.
	Header() (metadata.MD, error)
	// Trailer returns the trailer metadata from the server, if there is any.
	// It must only be called after stream.CloseAndRecv has returned, or
	// stream.Recv has returned a non-nil error (including io.EOF).
	Trailer() metadata.MD
	// CloseSend closes the send direction of the stream. It closes the stream
	// when non-nil error is met. It is also not safe to call CloseSend
	// concurrently with SendMsg.
	CloseSend() error
	// Context returns the context for this stream.
	//
	// It should not be called until after Header or RecvMsg has returned. Once
	// called, subsequent client-side retries are disabled.
	Context() context.Context
	// SendMsg is generally called by generated code. On error, SendMsg aborts
	// the stream. If the error was generated by the client, the status is
	// returned directly; otherwise, io.EOF is returned and the status of
	// the stream may be discovered using RecvMsg.
	//
	// SendMsg blocks until:
	//   - There is sufficient flow control to schedule m with the transport, or
	//   - The stream is done, or
	//   - The stream breaks.
	//
	// SendMsg does not wait until the message is received by the server. An
	// untimely stream closure may result in lost messages. To ensure delivery,
	// users should ensure the RPC completed successfully using RecvMsg.
	//
	// It is safe to have a goroutine calling SendMsg and another goroutine
	// calling RecvMsg on the same stream at the same time, but it is not safe
	// to call SendMsg on the same stream in different goroutines. It is also
	// not safe to call CloseSend concurrently with SendMsg.
	//
	// It is not safe to modify the message after calling SendMsg. Tracing
	// libraries and stats handlers may use the message lazily.
	SendMsg(m any) error
	// RecvMsg blocks until it receives a message into m or the stream is
	// done. It returns io.EOF when the stream completes successfully. On
	// any other error, the stream is aborted and the error contains the RPC
	// status.
	//
	// It is safe to have a goroutine calling SendMsg and another goroutine
	// calling RecvMsg on the same stream at the same time, but it is not
	// safe to call RecvMsg on the same stream in different goroutines.
	RecvMsg(m any) error
}
```

## type DialOption

`type DialOption interface {`

## func WithAuthority

`func WithAuthority(a string) DialOption`

WithAuthority returns a DialOption that specifies the value to be used as the `:authority` pseudo-header and as the server name in authentication handshake

## func WithBlock

`func WithBlock() DialOption`

WithBlock returns a DialOption which makes callers of Dial block until the underlying connection is up. Without this, Dial returns immediately and connecting the server happens in background

## func WithChainStreamInterceptor

`func WithChainStreamInterceptor(interceptors ...StreamClientInterceptor) DialOption`

The first interceptor will be the outer most, while the last interceptor will be the inner most wrapper around the real call. All interceptors added by this method will be chained, and the interceptor defined by WithStreamInterceptor will always be prepended to the chain

## func WithChainUnaryInterceptor

`func WithChainUnaryInterceptor(interceptors ...UnaryClientInterceptor) DialOption`

## func WithConnectParams

`func WithConnectParams(p ConnectParams) DialOption`

## func WithContextDialer

`func WithContextDialer(f func(context.Context, string) (net.Conn, error)) DialOption`

## func WithDefaultCallOptions

`func WithDefaultCallOptions(cos ...CallOption) DialOption`

## func WithKeepaliveParams

`func WithKeepaliveParams(kp keepalive.ClientParameters) DialOption`

## func WithStreamInterceptor

`func WithStreamInterceptor(f StreamClientInterceptor) DialOption`

## func WithUnaryInterceptor

`func WithUnaryInterceptor(f UnaryClientInterceptor) DialOption`

## func WithUserAgent

`func WithUserAgent(s string) DialOption`

## type Server

`type Server struct {`

`func NewServer(opt ...ServerOption) *Server`

- `func (s *Server) GetServiceInfo() map[string]ServiceInfo`
- `func (s *Server) GracefulStop()`
- `func (s *Server) RegisterService(sd *ServiceDesc, ss any)`
- `func (s *Server) Serve(lis net.Listener) error`
- `func (s *Server) Stop()`

## type ServerOption

`type ServerOption interface`

## func ChainStreamInterceptor

`func ChainStreamInterceptor(interceptors ...StreamServerInterceptor) ServerOption`

## func ChainUnaryInterceptor

`func ChainUnaryInterceptor(interceptors ...UnaryServerInterceptor) ServerOption`

## func KeepaliveParams

`func KeepaliveParams(kp keepalive.ServerParameters) ServerOption`

## func StreamInterceptor

`func StreamInterceptor(i StreamServerInterceptor) ServerOption`

## func UnaryInterceptor

`func UnaryInterceptor(i UnaryServerInterceptor) ServerOption`

## type ServerStream

```go
type ServerStream interface {
	// SetHeader sets the header metadata. It may be called multiple times.
	// When call multiple times, all the provided metadata will be merged.
	// All the metadata will be sent out when one of the following happens:
	//  - ServerStream.SendHeader() is called;
	//  - The first response is sent out;
	//  - An RPC status is sent out (error or success).
	SetHeader(metadata.MD) error
	// SendHeader sends the header metadata.
	// The provided md and headers set by SetHeader() will be sent.
	// It fails if called multiple times.
	SendHeader(metadata.MD) error
	// SetTrailer sets the trailer metadata which will be sent with the RPC status.
	// When called more than once, all the provided metadata will be merged.
	SetTrailer(metadata.MD)
	// Context returns the context for this stream.
	Context() context.Context
	// SendMsg sends a message. On error, SendMsg aborts the stream and the
	// error is returned directly.
	//
	// SendMsg blocks until:
	//   - There is sufficient flow control to schedule m with the transport, or
	//   - The stream is done, or
	//   - The stream breaks.
	//
	// SendMsg does not wait until the message is received by the client. An
	// untimely stream closure may result in lost messages.
	//
	// It is safe to have a goroutine calling SendMsg and another goroutine
	// calling RecvMsg on the same stream at the same time, but it is not safe
	// to call SendMsg on the same stream in different goroutines.
	//
	// It is not safe to modify the message after calling SendMsg. Tracing
	// libraries and stats handlers may use the message lazily.
	SendMsg(m any) error
	// RecvMsg blocks until it receives a message into m or the stream is
	// done. It returns io.EOF when the client has performed a CloseSend. On
	// any non-EOF error, the stream is aborted and the error contains the
	// RPC status.
	//
	// It is safe to have a goroutine calling SendMsg and another goroutine
	// calling RecvMsg on the same stream at the same time, but it is not
	// safe to call RecvMsg on the same stream in different goroutines.
	RecvMsg(m any) error
}
```

## type ServiceInfo

```go
type ServiceInfo struct {
	Methods []MethodInfo
	// Metadata is the metadata specified in ServiceDesc when registering service.
	Metadata any
}
```


