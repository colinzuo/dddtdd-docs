
## core-concepts

<https://grpc.io/docs/what-is-grpc/core-concepts/>

gRPC lets you define four kinds of service method

- Unary RPCs: `rpc SayHello(HelloRequest) returns (HelloResponse);`
- Server streaming RPCs: `rpc LotsOfReplies(HelloRequest) returns (stream HelloResponse);`
- Client streaming RPCs: `rpc LotsOfGreetings(stream HelloRequest) returns (HelloResponse);`
- Bidirectional streaming RPCs: `rpc BidiHello(stream HelloRequest) returns (stream HelloResponse);`

The gRPC programming API in most languages comes in **both synchronous and asynchronous flavors**

### RPC termination

In gRPC, both the client and server make **independent and local determinations** of the success of the call, and their conclusions may not match

### Metadata

Keys are case insensitive and consist of ASCII letters, digits, and special characters -, _, . and must not start with `grpc-` (which is reserved for gRPC itself). Binary-valued keys end in `-bin` while ASCII-valued keys do not


