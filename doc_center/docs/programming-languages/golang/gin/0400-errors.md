
## Error

```go
// Error represents a error's specification.
type Error struct {
	Err  error
	Type ErrorType
	Meta any
}
```

## errorMsgs

```go
type errorMsgs []*Error
```

## IsType

```go
// IsType judges one error.
func (msg *Error) IsType(flags ErrorType) bool {
	return (msg.Type & flags) > 0
}
```

## Unwrap

```go
// Unwrap returns the wrapped error, to allow interoperability with errors.Is(), errors.As() and errors.Unwrap()
func (msg *Error) Unwrap() error {
	return msg.Err
}
```
