
<https://protobuf.dev/overview/>
<https://github.com/protocolbuffers/protobuf/releases>

## Updating Proto Definitions Without Updating Code

It’s standard for software products to be backward compatible, but it is less common for them to be forward compatible. As long as you follow some simple practices when updating .proto definitions, old code will read new messages without issues, **ignoring any newly added fields**. To the old code, fields that were **deleted will have their default value**, and deleted repeated fields will be empty. For information on what “repeated” fields are, see Protocol Buffers Definition Syntax later in this topic.

New code will also transparently read old messages. New fields will not be present in old messages; in these cases protocol buffers provide a reasonable default value

<https://protobuf.dev/programming-guides/proto3/>

## Deleting Fields

When you no longer need a field and all references have been deleted from client code, you may delete the field definition from the message. However, you **must reserve the deleted field number**

You should also **reserve the field name** to allow JSON and TextFormat encodings of your message to continue to parse.

## Reserved Fields

```
message Foo {
  reserved 2, 15, 9 to 11;
  reserved "foo", "bar";
}
```

## Default Values

When a message is parsed, if the encoded message does **not contain** a particular implicit presence element, accessing the corresponding field in the parsed object **returns the default value** for that field

## Enumerations

every enum definition must contain a constant that **maps to zero as its first element**

You can define aliases by assigning the same value to different enum constants. To do this you need to set the `allow_alias option to true`. Otherwise, the protocol buffer compiler generates a warning message when aliases are found. Though all alias values are valid during deserialization, the first value is always used when serializing

## Importing Definitions

You can use definitions from other .proto files by importing them. To import another .proto’s definitions, you add an import statement to the top of your file

```
import "myproject/other_protos.proto";
```

The protocol compiler searches for imported files in a set of directories specified on the protocol compiler command line using the `-I/--proto_path` flag

## Any

An Any contains an arbitrary serialized message as bytes, along with a URL that acts as a **globally unique identifier** for and resolves to that message’s type. To use the Any type, you need to `import google/protobuf/any.proto`

The default type URL for a given message type is `type.googleapis.com/_packagename_._messagename_`

## Oneof

You can check which value in a oneof is set (if any) using a special `case()` or `WhichOneof()` method, depending on your chosen language

```
message SampleMessage {
  oneof test_oneof {
    string name = 4;
    SubMessage sub_message = 9;
  }
}
```

## Maps

```
map<key_type, value_type> map_field = N;
```

## Packages

The way a package specifier affects the generated code depends on your chosen language

- In Python, the package directive is ignored, since Python modules are organized according to their **location in the file system**
- In Go, the package directive is ignored, and the generated .pb.go file is in the package named after the corresponding go_proto_library Bazel rule. For open source projects, you must provide either a `go_package` option or set the Bazel -M flag.

## Options

Some options are **file-level options**, meaning they should be written at the top-level scope, not inside any message, enum, or service definition. Some options are **message-level options**, meaning they should be written inside message definitions. Some options are **field-level options**, meaning they should be written inside field definitions

## Generating Your Classes

For Go, you also need to install a special code generator plugin for the compiler

```
protoc --proto_path=IMPORT_PATH --cpp_out=DST_DIR --java_out=DST_DIR --python_out=DST_DIR --go_out=DST_DIR --ruby_out=DST_DIR --objc_out=DST_DIR --csharp_out=DST_DIR path/to/file.proto
```

`-I=_IMPORT_PATH_` can be used as a short form of `--proto_path`

You must provide one or more .proto files as input. Multiple .proto files can be specified at once. Although **the files are named relative to the current directory**, each file must reside in one of the IMPORT_PATHs so that the compiler can determine its canonical name


