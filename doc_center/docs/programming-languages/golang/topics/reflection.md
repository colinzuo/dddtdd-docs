
## The Laws of Reflection

<https://go.dev/blog/laws-of-reflection>

### The representation of an interface

A variable of interface type stores a pair: the concrete value assigned to the variable, and that value’s type descriptor

```go
var r io.Reader
tty, err := os.OpenFile("/dev/tty", os.O_RDWR, 0)
if err != nil {
    return nil, err
}
r = tty
```

r contains, schematically, the (value, type) pair, `(tty, *os.File)`

One important detail is that the pair inside an interface variable always has the form `(value, concrete type)` and cannot have the form (value, interface type). Interfaces do not hold interface values

### Reflection goes from interface value to reflection object

reflection is just a **mechanism to examine the type and value pair** stored inside an interface variable

two simple functions, called `reflect.TypeOf` and `reflect.ValueOf`, retrieve `reflect.Type` and `reflect.Value` pieces out of an interface value

```go
// TypeOf returns the reflection Type of the value in the interface{}.
func TypeOf(i interface{}) Type
```

both Type and Value have a Kind method that returns a constant indicating what sort of item is stored: Uint, Float64, Slice, and so on

```go
var x float64 = 3.4
v := reflect.ValueOf(x)
fmt.Println("type:", v.Type())
fmt.Println("kind is float64:", v.Kind() == reflect.Float64)
fmt.Println("value:", v.Float())
```

The second property is that the Kind of a reflection object describes the underlying type, not the static type

### Reflection goes from reflection object to interface value

Given a reflect.Value we can recover an interface value using the Interface method; in effect the method packs the type and value information back into an interface representation and returns the result

```go
// Interface returns v's value as an interface{}.
func (v Value) Interface() interface{}

y := v.Interface().(float64) // y will have type float64.
fmt.Println(y)
```

### To modify a reflection object, the value must be settable

Settability is determined by whether the reflection object holds the original item

```go
var x float64 = 3.4
p := reflect.ValueOf(&x) // Note: take the address of x.
fmt.Println("type of p:", p.Type())
fmt.Println("settability of p:", p.CanSet())

v := p.Elem()
fmt.Println("settability of v:", v.CanSet())
```

### Structs

```go
type T struct {
    A int
    B string
}
t := T{23, "skidoo"}
s := reflect.ValueOf(&t).Elem()
typeOfT := s.Type()
for i := 0; i < s.NumField(); i++ {
    f := s.Field(i)
    fmt.Printf("%d: %s %s = %v\n", i,
        typeOfT.Field(i).Name, f.Type(), f.Interface())
}
```

## stdlib reflect

<https://pkg.go.dev/reflect>


