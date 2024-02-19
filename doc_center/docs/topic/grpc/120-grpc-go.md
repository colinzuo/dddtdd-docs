
## Quick start

<https://grpc.io/docs/languages/go/quickstart/>

```bash
go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest
```

### Regenerate gRPC code

```bash
protoc --go_out=. --go_opt=paths=source_relative \
    --go-grpc_out=. --go-grpc_opt=paths=source_relative \
    helloworld/helloworld.proto
```    

## Basics tutorial

<https://grpc.io/docs/languages/go/basics/>

### Server-side streaming RPC

```go
func (s *routeGuideServer) ListFeatures(rect *pb.Rectangle, stream pb.RouteGuide_ListFeaturesServer) error {
  for _, feature := range s.savedFeatures {
    if inRange(feature.Location, rect) {
      if err := stream.Send(feature); err != nil {
        return err
      }
    }
  }
  return nil
}
```

Finally, as in our simple RPC, we return a nil error to tell gRPC that we’ve finished writing responses. Should any error happen in this call, we return a non-nil error; the gRPC layer will translate it into an appropriate RPC status to be sent on the wire

### Client-side streaming RPC

```go
func (s *routeGuideServer) RecordRoute(stream pb.RouteGuide_RecordRouteServer) error {

    point, err := stream.Recv()

      return stream.SendAndClose(&pb.RouteSummary{
        PointCount:   pointCount,
        FeatureCount: featureCount,
        Distance:     distance,
        ElapsedTime:  int32(endTime.Sub(startTime).Seconds()),
      })
```

### Bidirectional streaming RPC

```go
func (s *routeGuideServer) RouteChat(stream pb.RouteGuide_RouteChatServer) error {

    in, err := stream.Recv()
    
      if err := stream.Send(note); err != nil {    
```

### Starting the server

```go
flag.Parse()
lis, err := net.Listen("tcp", fmt.Sprintf("localhost:%d", *port))
if err != nil {
  log.Fatalf("failed to listen: %v", err)
}
var opts []grpc.ServerOption
...
grpcServer := grpc.NewServer(opts...)
pb.RegisterRouteGuideServer(grpcServer, newServer())
grpcServer.Serve(lis)
```

### Creating the client

```go
var opts []grpc.DialOption
...
conn, err := grpc.Dial(*serverAddr, opts...)
if err != nil {
  ...
}
defer conn.Close()


client := pb.NewRouteGuideClient(conn)
```

### Client-side streaming RPC

```go
stream, err := client.RecordRoute(context.Background())

for _, point := range points {
  if err := stream.Send(point); err != nil {

reply, err := stream.CloseAndRecv()    
```

### Bidirectional streaming RPC

```go
stream, err := client.RouteChat(context.Background())
waitc := make(chan struct{})
go func() {
  for {
    in, err := stream.Recv()
    if err == io.EOF {
      // read done.
      close(waitc)
      return
    }

for _, note := range notes {
  if err := stream.Send(note); err != nil {
    
stream.CloseSend()
<-waitc    
```

## Generated-code reference

<https://grpc.io/docs/languages/go/generated-code/>

for individual streams, incoming and outgoing data is **bi-directional but serial**

### Methods on generated server interfaces

On the server side, each `service Bar` in the `.proto` file results in the function

`func RegisterBarServer(s *grpc.Server, srv BarServer)`

#### Server-streaming methods

`Foo(*MsgA, <ServiceName>_FooServer) error`

`<ServiceName>_FooServer` has an embedded `grpc.ServerStream` and the following interface

```go
type <ServiceName>_FooServer interface {
	Send(*MsgB) error
	grpc.ServerStream
}
```

End-of-stream for the server-to-client stream is caused by the return of the handler method

#### Client-streaming methods

```go
type <ServiceName>_FooServer interface {
	SendAndClose(*MsgA) error
	Recv() (*MsgB, error)
	grpc.ServerStream
}
```

`Recv` returns `(nil, io.EOF)` once it has reached the end of the stream

The single response message from the server is sent by calling the `SendAndClose` method on this `<ServiceName>_FooServer` parameter. Note that `SendAndClose` must be called once and only once

#### Bidi-streaming methods

```go
type <ServiceName>_FooServer interface {
	Send(*MsgA) error
	Recv() (*MsgB, error)
	grpc.ServerStream
}
```

### Methods on generated client interfaces

For client side usage, each `service Bar` in the .proto file also results in the function: `func BarClient(cc *grpc.ClientConn) BarClient`, which returns a concrete implementation of the `BarClient` interface

#### Unary Methods

`(ctx context.Context, in *MsgA, opts ...grpc.CallOption) (*MsgB, error)`

## Guides

<https://grpc.io/docs/guides/>

### Cancellation

Deadline expiration and I/O errors also trigger cancellation

While gRPC clients do **not provide additional details** to the server about the reason for the cancellation, the cancel API call takes a string describing the reason, which will result in a client-side exception and/or log containing the provided reason

The gRPC library in general does not have a mechanism to interrupt the application-provided server handler, so the server handler must coordinate with the gRPC library to ensure that local processing of the request ceases. Therefore, if an RPC is long-lived, its server handler must **periodically check** if the RPC it is servicing has been cancelled and if it has, cease processing

### Deadlines

#### Deadlines on the Client

If a server has gone past the deadline when processing a request, the client will give up and fail the RPC with the `DEADLINE_EXCEEDED` status

#### Deadlines on the Server

A server might receive requests from a client with an unrealistically short deadline that would not give the server enough time to ever respond in time

A gRPC server deals with this situation by automatically cancelling a call (`CANCELLED` status) once a deadline set by the client has passed

Since a deadline is set point in time, propagating it as-is to a server can be problematic as the clocks on the two servers might not be synchronized. To address this gRPC **converts the deadline to a timeout** from which the already elapsed time is already deducted.

### Error handling

<https://cloud.google.com/apis/design/errors#error_model>

```go
// The `Status` type defines a logical error model that is suitable for
// different programming environments, including REST APIs and RPC APIs.
message Status {
  // A simple error code that can be easily handled by the client. The
  // actual error code is defined by `google.rpc.Code`.
  int32 code = 1;

  // A developer-facing human-readable error message in English. It should
  // both explain the error and offer an actionable resolution to it.
  string message = 2;

  // Additional error information that the client code can use to handle
  // the error, such as retry info or a help link.
  repeated google.protobuf.Any details = 3;
}
```

#### General errors

- `GRPC_STATUS_CANCELLED`:  Client application cancelled the request
- `GRPC_STATUS_DEADLINE_EXCEEDED`: Deadline expired before server returned status
- `GRPC_STATUS_UNIMPLEMENTED`: Method not found on server
- `GRPC_STATUS_UNAVAILABLE`: Server shutting down
- `GRPC_STATUS_UNKNOWN`: Server threw an exception (or did something other than returning a status code to terminate the RPC)

#### Network failures

- `GRPC_STATUS_DEADLINE_EXCEEDED`: No data transmitted before deadline expires. Also applies to cases where some data is transmitted and no other failures are detected before the deadline expires

#### Protocol errors

- `GRPC_STATUS_INTERNAL`: Could not decompress but compression algorithm supported
- `GRPC_STATUS_UNIMPLEMENTED`: Compression mechanism used by client not supported by the server
- `GRPC_STATUS_RESOURCE_EXHAUSTED`: Flow-control resource limits reached
- `GRPC_STATUS_INTERNAL`: Flow-control protocol violation
- `GRPC_STATUS_UNKNOWN`: Error parsing returned status
- `GRPC_STATUS_UNAUTHENTICATED`: Unauthenticated: credentials failed to get metadata
- `GRPC_STATUS_UNAUTHENTICATED`: Invalid host set in authority metadata
- `GRPC_STATUS_INTERNAL`: Error parsing response protocol buffer
- `GRPC_STATUS_INTERNAL`: Error parsing request protocol buffer

### Flow Control

It **applies to streaming RPCs and is not relevant for unary RPCs**. By default, gRPC handles the interactions with flow control for you, though some languages allow you to override the default behavior and take explicit control

### Health Checking

gRPC specifies a standard service API (health/v1) for performing health check calls against gRPC servers

<https://github.com/grpc/grpc-proto/blob/master/grpc/health/v1/health.proto>

<https://github.com/grpc/grpc-go/tree/master/examples/features/health>

### Keepalive

HTTP/2 PING-based keepalives are a way to keep an HTTP/2 connection alive even when there is no data being transferred. This is done by periodically sending a **PING frame** to the other end of the connection

#### Common situations where keepalives can be useful

- When sending data over a long-lived connection which might be considered as idle by proxy or load balancers
- When the network is less reliable (For example, mobile applications)
- When using a connection after a long period of inactivity

#### Keepalive configuration specification

- `KEEPALIVE_TIME`: The interval in milliseconds between PING frames
- `KEEPALIVE_TIMEOUT`: The timeout in milliseconds for a PING frame to be acknowledged. If sender does not receive an acknowledgment within this time, it will close the connection
- `KEEPALIVE_WITHOUT_CALLS`: Is it permissible to send keepalive pings from the client without any outstanding streams
- `PERMIT_KEEPALIVE_WITHOUT_CALLS`: Is it permissible to send keepalive pings from the client without any outstanding streams
- `PERMIT_KEEPALIVE_TIME`: Minimum allowed time between a server receiving successive ping frames without sending any data/header frame

#### A8-client-side-keepalive

<https://github.com/grpc/proposal/blob/master/A8-client-side-keepalive.md>

To mitigate DDoS the design
- Disables keepalive for HTTP/2 connections with no outstanding streams, and
- Suggests for clients to avoid configuring their keepalive much below one minute (see Server Enforcement section for additional details)

Since keepalive is not occurring on HTTP/2 connections without any streams, there will be a **higher chance of failure for new RPCs following a long period of inactivity**. To reduce the tail latency for these RPCs, it is important to not reset the keepalive time when a connection becomes active; if a new stream is created and there has been greater than 'keepalive time' since the last read byte, then a keepalive PING should be sent (ideally before the HEADERS frame). Doing so detects the broken connection with a latency of keepalive timeout instead of keepalive time + timeout

- Restricts clients to avoid configuring their keepalive below **ten seconds**

### Metadata

gRPC metadata is a key-value pair of data that is sent with **initial or final gRPC requests or responses**. It is used to provide additional information about the call, such as authentication credentials, tracing information, or custom headers

gRPC metadata is implemented using HTTP/2 headers. The keys are ASCII strings, while the values can be either ASCII strings or binary data. The keys are case insensitive and must not start with the prefix `grpc-`, which is reserved for gRPC itself.

### Performance Best Practices

- Always **re-use stubs and channels** when possible
- **Use keepalive pings** to keep HTTP/2 connections alive during periods of inactivity to allow initial RPCs to be made quickly without a dela
- **Use streaming RPCs** when handling a long-lived logical flow of data from the client-to-server, server-to-client, or in both directions. Streams can avoid continuous RPC initiation, which includes **connection load balancing at the client-side**, starting a **new HTTP/2 request at the transport layer**, and **invoking a user-defined method handler** on the server side

