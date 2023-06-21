
## Basics tutorial

<https://grpc.io/docs/languages/go/basics/>

### Why use gRPC

all the complexity of communication between different languages and environments is handled for you by gRPC. 
We also get all the advantages of working with protocol buffers, including efficient serialization, a simple IDL, 
and easy interface updating


### Generating client and server code

```bash
protoc --go_out=. --go_opt=paths=source_relative \
    --go-grpc_out=. --go-grpc_opt=paths=source_relative \
    routeguide/route_guide.proto
```

### Server-side streaming RPC

we return a nil error to tell gRPC that we’ve finished writing responses. 
Should any error happen in this call, we return a non-nil error; the gRPC layer will translate it into an appropriate RPC status to be sent on the wire

```go
func (s *routeGuideServer) ListFeatures(rect *pb.Rectangle, stream pb.RouteGuide_ListFeaturesServer) error {
  for _, feature := range s.savedFeatures {

      if err := stream.Send(feature); err != nil {

  return nil
}
```

### Client-side streaming RPC

```go
func (s *routeGuideServer) RecordRoute(stream pb.RouteGuide_RecordRouteServer) error {

  for {
    point, err := stream.Recv()
    if err == io.EOF {
      endTime := time.Now()
      return stream.SendAndClose(&pb.RouteSummary{
        PointCount:   pointCount,
        FeatureCount: featureCount,
        Distance:     distance,
        ElapsedTime:  int32(endTime.Sub(startTime).Seconds()),
      })
    }
    if err != nil {
      return err
    }
```

### Starting the server

```go
func main() {
	flag.Parse()
	lis, err := net.Listen("tcp", fmt.Sprintf("localhost:%d", *port))
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	var opts []grpc.ServerOption
	if *tls {
		if *certFile == "" {
			*certFile = data.Path("x509/server_cert.pem")
		}
		if *keyFile == "" {
			*keyFile = data.Path("x509/server_key.pem")
		}
		creds, err := credentials.NewServerTLSFromFile(*certFile, *keyFile)
		if err != nil {
			log.Fatalf("Failed to generate credentials: %v", err)
		}
		opts = []grpc.ServerOption{grpc.Creds(creds)}
	}
	grpcServer := grpc.NewServer(opts...)
	pb.RegisterRouteGuideServer(grpcServer, newServer())
	grpcServer.Serve(lis)
}
```

### Creating a stub

```go
	var opts []grpc.DialOption
	if *tls {
		if *caFile == "" {
			*caFile = data.Path("x509/ca_cert.pem")
		}
		creds, err := credentials.NewClientTLSFromFile(*caFile, *serverHostOverride)
		if err != nil {
			log.Fatalf("Failed to create TLS credentials: %v", err)
		}
		opts = append(opts, grpc.WithTransportCredentials(creds))
	} else {
		opts = append(opts, grpc.WithTransportCredentials(insecure.NewCredentials()))
	}

	conn, err := grpc.Dial(*serverAddr, opts...)
	if err != nil {
		log.Fatalf("fail to dial: %v", err)
	}
	defer conn.Close()
	client := pb.NewRouteGuideClient(conn)
```

### ClientConn.NewStream

<https://pkg.go.dev/google.golang.org/grpc#ClientConn.NewStream>

To ensure resources are not leaked due to the stream returned, one of the following actions must be performed:

- Call Close on the ClientConn.
- Cancel the context provided.
- Call RecvMsg until a non-nil error is returned. A protobuf-generated client-streaming RPC, for instance, might use the helper function CloseAndRecv (note that CloseSend does not Recv, therefore is not guaranteed to release all resources).
- Receive a non-nil, non-io.EOF error from Header or SendMsg

## grpc module

<https://pkg.go.dev/google.golang.org/grpc>

```go
import "google.golang.org/grpc"
```

### Common

- `func SendHeader(ctx context.Context, md metadata.MD) error`
- `func SetHeader(ctx context.Context, md metadata.MD) error`
- `func Header(md *metadata.MD) CallOption`
- `func OnFinish(onFinish func(err error)) CallOption`
- `func Peer(p *peer.Peer) CallOption`


### Client

- `type CallOption interface`
- `func WaitForReady(waitForReady bool) CallOption`
- `type ClientConn struct`
- `func Dial(target string, opts ...DialOption) (*ClientConn, error)`
- `func DialContext(ctx context.Context, target string, opts ...DialOption) (conn *ClientConn, err error)`
- `func (cc *ClientConn) Close() error`
- `func (cc *ClientConn) GetState() connectivity.State`
- `type ClientStream interface`
- `type ConnectParams struct`
- `type ContentSubtypeCallOption struct`
- `type DialOption interface`
- `func FailOnNonTempDialError(f bool) DialOption`
- `func WithAuthority(a string) DialOption`
- `func WithBlock() DialOption`
- `func WithChainStreamInterceptor(interceptors ...StreamClientInterceptor) DialOption`
- `func WithChainUnaryInterceptor(interceptors ...UnaryClientInterceptor) DialOption`
- `func WithConnectParams(p ConnectParams) DialOption`
- `func WithCredentialsBundle(b credentials.Bundle) DialOption`
- `func WithDefaultCallOptions(cos ...CallOption) DialOption`
- `func WithDisableHealthCheck() DialOption`
- `func WithDisableRetry() DialOption`
- `func WithKeepaliveParams(kp keepalive.ClientParameters) DialOption`
- `func WithStreamInterceptor(f StreamClientInterceptor) DialOption`
- `func WithTransportCredentials(creds credentials.TransportCredentials) DialOption`
- `func WithUnaryInterceptor(f UnaryClientInterceptor) DialOption`
- `func WithUserAgent(s string) DialOption`
- `type EmptyCallOption struct{}`
- `type EmptyDialOption struct{}`
- `type FailFastCallOption struct`
- `type HeaderCallOption struct`
- `type OnFinishCallOption struct`
- `type UnaryClientInterceptor func(ctx context.Context, method string, req, reply interface{}, cc *ClientConn, invoker UnaryInvoker, opts ...CallOption) error`


### Server

- `type EmptyServerOption struct{}`
- `type Server struct`
- `func NewServer(opt ...ServerOption) *Server`
- `func (s *Server) GracefulStop()`
- `func (s *Server) RegisterService(sd *ServiceDesc, ss interface{})`
- `func (s *Server) Serve(lis net.Listener) error`
- `func (s *Server) Stop()`
- `type ServerOption interface`
- `func ChainStreamInterceptor(interceptors ...StreamServerInterceptor) ServerOption`
- `func ChainUnaryInterceptor(interceptors ...UnaryServerInterceptor) ServerOption`
- `func ConnectionTimeout(d time.Duration) ServerOption`
- `func Creds(c credentials.TransportCredentials) ServerOption`
- `func KeepaliveEnforcementPolicy(kep keepalive.EnforcementPolicy) ServerOption`
- `func KeepaliveParams(kp keepalive.ServerParameters) ServerOption`
- `func MaxConcurrentStreams(n uint32) ServerOption`
- `func NumStreamWorkers(numServerWorkers uint32) ServerOption`
- `func StreamInterceptor(i StreamServerInterceptor) ServerOption`
- `func UnaryInterceptor(i UnaryServerInterceptor) ServerOption`
- `type ServerStream interface`
- `type ServerTransportStream interface`
- `func ServerTransportStreamFromContext(ctx context.Context) ServerTransportStream`
- `type UnaryServerInterceptor func(ctx context.Context, req interface{}, info *UnaryServerInfo, handler UnaryHandler) (resp interface{}, err error)`

## PROTOCOL-HTTP2

<https://github.com/grpc/grpc/blob/master/doc/PROTOCOL-HTTP2.md>

HTTP2 requires that reserved headers, ones starting with ":" appear before all other headers. 
Additionally implementations should send Timeout immediately after the reserved headers and 
they should send the **Call-Definition** headers before sending **Custom-Metadata**.

Call-Definition就是几个标准header，Custom-Metadata就是custom header

Custom-Metadata is an arbitrary set of key-value pairs defined by the application layer.

## metadata

<https://github.com/grpc/grpc-go/blob/v1.54.0/Documentation/grpc-metadata.md>

### Sending and receiving metadata - client side

#### Sending metadata

```go
// create a new context with some metadata
ctx := metadata.AppendToOutgoingContext(ctx, "k1", "v1", "k1", "v2", "k2", "v3")

// later, add some more metadata to the context (e.g. in an interceptor)
ctx := metadata.AppendToOutgoingContext(ctx, "k3", "v4")

// make unary RPC
response, err := client.SomeRPC(ctx, someRequest)

// or make streaming RPC
stream, err := client.SomeStreamingRPC(ctx)
```

```go
// create a new context with some metadata
md := metadata.Pairs("k1", "v1", "k1", "v2", "k2", "v3")
ctx := metadata.NewOutgoingContext(context.Background(), md)

// later, add some more metadata to the context (e.g. in an interceptor)
send, _ := metadata.FromOutgoingContext(ctx)
newMD := metadata.Pairs("k3", "v3")
ctx = metadata.NewOutgoingContext(ctx, metadata.Join(send, newMD))
```

#### Receiving metadata

```go
var header, trailer metadata.MD // variable to store header and trailer
r, err := client.SomeRPC(
    ctx,
    someRequest,
    grpc.Header(&header),    // will retrieve header
    grpc.Trailer(&trailer),  // will retrieve trailer
)

// do something with header and trailer
```

```go
stream, err := client.SomeStreamingRPC(ctx)

// retrieve header
header, err := stream.Header()

// retrieve trailer
trailer := stream.Trailer()
```

### Sending and receiving metadata - server side

#### Receiving metadata

```go
func (s *server) SomeRPC(ctx context.Context, in *pb.someRequest) (*pb.someResponse, error) {
    md, ok := metadata.FromIncomingContext(ctx)
    // do something with metadata
}
```

```go
func (s *server) SomeStreamingRPC(stream pb.Service_SomeStreamingRPCServer) error {
    md, ok := metadata.FromIncomingContext(stream.Context()) // get context from stream
    // do something with metadata
}
```

#### Sending metadata

```go
func (s *server) SomeRPC(ctx context.Context, in *pb.someRequest) (*pb.someResponse, error) {
    // create and send header
    header := metadata.Pairs("header-key", "val")
    grpc.SendHeader(ctx, header)
    // create and set trailer
    trailer := metadata.Pairs("trailer-key", "val")
    grpc.SetTrailer(ctx, trailer)
}
```

```go
func (s *server) SomeStreamingRPC(stream pb.Service_SomeStreamingRPCServer) error {
    // create and send header
    header := metadata.Pairs("header-key", "val")
    stream.SendHeader(header)
    // create and set trailer
    trailer := metadata.Pairs("trailer-key", "val")
    stream.SetTrailer(trailer)
}
```

#### Interceptor

```go
func unaryInterceptor(ctx context.Context, req interface{}, info *grpc.UnaryServerInfo, handler grpc.UnaryHandler) (interface{}, error) {
	md, ok := metadata.FromIncomingContext(ctx)
	if !ok {
		return nil, errMissingMetadata
	}

	md.Append("key1", "value1")
	ctx = metadata.NewIncomingContext(ctx, md)

	return handler(ctx, req)
}
```

```go
type wrappedStream struct {
	grpc.ServerStream
	ctx context.Context
}

func (s *wrappedStream) Context() context.Context {
	return s.ctx
}

func streamInterceptor(srv interface{}, ss grpc.ServerStream, info *grpc.StreamServerInfo, handler grpc.StreamHandler) error {
	md, ok := metadata.FromIncomingContext(ss.Context())
	if !ok {
		return errMissingMetadata
	}

	md.Append("key1", "value1")
	ctx := metadata.NewIncomingContext(ss.Context(), md)

	return handler(srv, &wrappedStream{ss, ctx})
}
```

## Keepalive

<https://github.com/grpc/grpc-go/blob/v1.54.0/Documentation/keepalive.md>

<https://pkg.go.dev/google.golang.org/grpc/keepalive>

Keepalive can be useful to detect TCP level connection failures.

Another usage is (as the name suggests) to keep the connection alive. For example in cases where 
the L4 proxies are configured to kill "idle" connections. Sending pings would make the connections not "idle".

```go
func WithKeepaliveParams(kp keepalive.ClientParameters) DialOption
```

## RPC Errors

<https://github.com/grpc/grpc-go/blob/v1.54.0/Documentation/rpc-errors.md>

```go
st := status.New(codes.NotFound, "some description")
err := st.Err()

// vs.

err := status.Error(codes.NotFound, "some description")
```

```go
		st := status.New(codes.ResourceExhausted, "Request limit exceeded.")
		ds, err := st.WithDetails(
			&epb.QuotaFailure{
				Violations: []*epb.QuotaFailure_Violation{{
					Subject:     fmt.Sprintf("name:%s", in.Name),
					Description: "Limit one greeting per person",
				}},
			},
		)
		if err != nil {
			return nil, st.Err()
		}
		return nil, ds.Err()
```


