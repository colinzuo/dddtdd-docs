
## gotutorial

<https://protobuf.dev/getting-started/gotutorial/>


```bash
go install google.golang.org/protobuf/cmd/protoc-gen-go@latest

protoc -I=$SRC_DIR --go_out=$DST_DIR $SRC_DIR/addressbook.proto
```

## go-generated

<https://protobuf.dev/reference/go/go-generated/>

### Compiler Invocation

**Where in the output directory the generated .pb.go file is placed depends on the compiler flags**. There are several output modes:

- If the `paths=import` flag is specified, the output file is placed in a directory named after the Go package’s import path. For example, an input file protos/buzz.proto with a Go import path of example.com/project/protos/fizz results in an output file at example.com/project/protos/fizz/buzz.pb.go. This is the **default** output mode if a paths flag is not specified.
- If the `module=$PREFIX` flag is specified, the output file is placed in a directory named after the Go package’s import path, but with the specified directory prefix removed from the output filename. For example, an input file protos/buzz.proto with a Go import path of example.com/project/protos/fizz and example.com/project specified as the module prefix results in an output file at protos/fizz/buzz.pb.go. Generating any Go packages outside the module path results in an error. This mode is **useful for outputting generated files directly into a Go module**.
- If the `paths=source_relative` flag is specified, the output file is placed in the same relative directory as the input file. For example, an input file protos/buzz.proto results in an output file at protos/buzz.pb.go.

The compiler automatically creates nested output sub-directories if necessary, but will not create the output directory itself

### Packages

We **recommend** declaring it within the .proto file so that the Go packages for .proto files can be centrally identified with the .proto files themselves and to simplify the set of flags passed when invoking protoc

```
option go_package = "example.com/project/protos/fizz";
```

### Messages

```
message Artist {}
```

An `*Artist` implements the `proto.Message` interface

### Fields

The case-conversion works as follows:

- The first letter is capitalized for export. If the first character is an underscore, it is removed and a capital `X` is prepended.
- If an interior underscore is followed by a lower-case letter, the underscore is removed, and the following letter is capitalized.

### Singular Scalar Fields (proto3)

```
int32 birth_year = 1;
optional int32 first_active_year = 2;
```

The FirstActiveYear struct field will be of type `*int32`, and additionally have the `HasFirstActiveYear()` and `ClearFirstActiveYear()` accessors, because it is marked **optional**

### Singular Message Fields

```
message Band {}

message Concert {
  Band headliner = 1;
}
```

```go
type Concert struct {
    Headliner *Band
}
```

### Oneof Fields

```
package account;
message Profile {
  oneof avatar {
    string image_url = 1;
    bytes image_data = 2;
  }
}
```

```go
type Profile struct {
    // Types that are valid to be assigned to Avatar:
    //  *Profile_ImageUrl
    //  *Profile_ImageData
    Avatar isProfile_Avatar `protobuf_oneof:"avatar"`
}

type Profile_ImageUrl struct {
        ImageUrl string
}
type Profile_ImageData struct {
        ImageData []byte
}
```

To access the field, you can use a **type switch** on the value to handle the different message types

```go
switch x := m.Avatar.(type) {
case *account.Profile_ImageUrl:
    // Load profile image based on URL
    // using x.ImageUrl
case *account.Profile_ImageData:
    // Load profile image based on bytes
    // using x.ImageData
case nil:
    // The field is not set.
default:
    return fmt.Errorf("Profile.Avatar has unexpected type %T", x)
}
```

### Enumerations

```
enum Genre {
  GENRE_UNSPECIFIED = 0;
  GENRE_ROCK = 1;
  GENRE_INDIE = 2;
  GENRE_DRUM_AND_BASS = 3;
  // ...
}
```

```go
type Genre int32

const (
    Genre_GENRE_UNSPECIFIED   Genre = 0
    Genre_GENRE_ROCK          Genre = 1
    Genre_GENRE_INDIE         Genre = 2
    Genre_GENRE_DRUM_AND_BASS Genre = 3
)

var Genre_name = map[int32]string{
    0: "GENRE_UNSPECIFIED",
    1: "GENRE_ROCK",
    2: "GENRE_INDIE",
    3: "GENRE_DRUM_AND_BASS",
}
var Genre_value = map[string]int32{
    "GENRE_UNSPECIFIED":   0,
    "GENRE_ROCK":          1,
    "GENRE_INDIE":         2,
    "GENRE_DRUM_AND_BASS": 3,
}
```

## pkg proto

<https://github.com/protocolbuffers/protobuf-go>
<https://pkg.go.dev/google.golang.org/protobuf/proto>
<https://pkg.go.dev/google.golang.org/protobuf/types/known/anypb>

- `func Bool(v bool) *bool`
- `func Float32(v float32) *float32`
- `func Marshal(m Message) ([]byte, error)`
- `func Unmarshal(b []byte, m Message) error`
- `type Message = protoreflect.ProtoMessage`
- `func Clone(m Message) Message`
