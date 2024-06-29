
<https://golang.org/doc/effective_go>

## fmt

gofmt会自动格式化
```go
type T struct {
    name    string // name of the object
    value   int    // its value
}
```

## comment

//和/* */两种，export的声明前应有comment

## 合并声明

```go
var (
    countLock   sync.Mutex
    inputCount  uint32
    outputCount uint32
    errorCount  uint32
)
```

## 命名

By convention, packages are given lower case, single-word names; there should be no need for underscores or mixedCaps

Another convention is that the package name is the base name of its source directory

it's neither idiomatic nor necessary to put Get into the getter's name. If you have a field called owner (lower case, unexported), the getter method should be called Owner (upper case, exported), not GetOwner

- package名字小写，单个字
- getter直接用变量名，不加Get
- interface名字在方法名后加-er
- 多个词的用首字母大写组合

## 分号

一般情况go会按照语法自动添加，只有for语句等需要主动添加

## 控制结构

### if 

```go
if x > 0 {
    return y
}

if err := file.Chmod(0664); err != nil {
    log.Print(err)
    return err
}
```

### Redeclaration and reassignment

```go
f, err := os.Open(name)

d, err := f.Stat()
```

In a `:=` declaration a variable v, **if v is already declared in an outer scope, the declaration will create a new variable**

### for

```go
// Like a C for
for init; condition; post { }

// Like a C while
for condition { }

// Like a C for(;;)
for { }

for key, value := range oldMap {
    newMap[key] = value
}
```

### switch

```go
// 空switch代表true为匹配
func unhex(c byte) byte {
    switch {
    case '0' <= c && c <= '9':
        return c - '0'
    case 'a' <= c && c <= 'f':
        return c - 'a' + 10
    case 'A' <= c && c <= 'F':
        return c - 'A' + 10
    }
    return 0
}

// fallthrough通过,实现
func shouldEscape(c byte) bool {
    switch c {
    case ' ', '?', '&', '=', '#', '+', '%':
        return true
    }
    return false
}

// 提前break switch case
// break外部for循环
Loop:
	for n := 0; n < len(src); n += size {
		switch {
		case src[n] < sizeOne:
			if validateOnly {
				break
			}
			size = 1
			update(src[n])

		case src[n] < sizeTwo:
			if n+1 >= len(src) {
				err = errShortInput
				break Loop
			}
			if validateOnly {
				break
			}
			size = 2
			update(src[n] + src[n+1]<<shift)
		}
	}

// type Switch
var t interface{}
t = functionOfSomeType()
switch t := t.(type) {
default:
    fmt.Printf("unexpected type %T\n", t)     // %T prints whatever type t has
case bool:
    fmt.Printf("boolean %t\n", t)             // t has type bool
case int:
    fmt.Printf("integer %d\n", t)             // t has type int
case *bool:
    fmt.Printf("pointer to boolean %t\n", *t) // t has type *bool
case *int:
    fmt.Printf("pointer to integer %d\n", *t) // t has type *int
}  
```

## 函数

### 多返回值

```go
func (file *File) Write(b []byte) (n int, err error)
```

### Named result parameters

```go
func nextInt(b []byte, pos int) (value, nextPos int)
```

### Defer

```go
    f, err := os.Open(filename)
    if err != nil {
        return "", err
    }
    defer f.Close()  // f.Close will run when we're finished
```

## Data

### 使用new分配

new只分配，并用zero覆盖，但不初始化

```go
p := new(SyncedBuffer)  // type *SyncedBuffer
var v SyncedBuffer      // type  SyncedBuffer
```

### 构造函数和composite literals

```go
func NewFile(fd int, name string) *File {
    if fd < 0 {
        return nil
    }
    f := File{fd, name, nil, 0}
    return &f
}
```

### 使用make分配

make用于创建slices, maps, and channels only, and it returns an initialized (not zeroed) value of type T (not *T)

```go
var p *[]int = new([]int)       // allocates slice structure; *p == nil; rarely useful
var v  []int = make([]int, 100) // the slice v now refers to a new array of 100 ints
```

### Arrays

Array是value，大小是类型的一部分

```go
func Sum(a *[3]float64) (sum float64) {
    for _, v := range *a {
        sum += v
    }
    return
}

array := [...]float64{7.0, 8.5, 9.1}
x := Sum(&array)  // Note the explicit address-of operator
```

### Slices 

Slices wrap arrays to give a more general, powerful, and convenient interface to sequences of data.

- len用于获得长度
- cap用于获得当前capacity
- append当空间不够时可重新分配

### Two-dimensional slices

```go
text := [][]byte{
	[]byte("Now is the time"),
	[]byte("for all good gophers"),
	[]byte("to bring some fun to the party."),
}

// Allocate the top-level slice.
picture := make([][]uint8, YSize) // One row per unit of y.
// Loop over the rows, allocating the slice for each row.
for i := range picture {
	picture[i] = make([]uint8, XSize)
}
```

### Maps

```go
var timeZone = map[string]int{
    "UTC":  0*60*60,
    "EST": -5*60*60,
    "CST": -6*60*60,
    "MST": -7*60*60,
    "PST": -8*60*60,
}

// 判断key是否存在
var seconds int
var present bool
seconds, present = timeZone[tz]

delete(timeZone, "PDT")  // Now on Standard Time
```

### Printing

```go
fmt.Printf("Hello %d\n", 23)
fmt.Fprint(os.Stdout, "Hello ", 23, "\n")
fmt.Println("Hello", 23)
fmt.Println(fmt.Sprint("Hello ", 23))

// 打印结构
type T struct {
    a int
    b float64
    c string
}
t := &T{ 7, -2.35, "abc\tdef" }
fmt.Printf("%v\n", t)
fmt.Printf("%+v\n", t)
fmt.Printf("%#v\n", t)
fmt.Printf("%#v\n", timeZone)
fmt.Printf("%T\n", timeZone)

//输出
&{7 -2.35 abc   def}
&{a:7 b:-2.35 c:abc     def}
&main.T{a:7, b:-2.35, c:"abc\tdef"}
map[string]int{"CST":-21600, "EST":-18000, "MST":-25200, "PST":-28800, "UTC":0}
map[string]int
```

### Append

```go
func append(slice []T, elements ...T) []T

x := []int{1,2,3}
x = append(x, 4, 5, 6)
fmt.Println(x)

x := []int{1,2,3}
y := []int{4,5,6}
x = append(x, y...)
fmt.Println(x)
```

### 常量

```go
type ByteSize float64

const (
    _           = iota // ignore first value by assigning to blank identifier
    KB ByteSize = 1 << (10 * iota)
    MB
    GB
    TB
    PB
    EB
    ZB
    YB
)
```

### init函数

init is called after all the variable declarations in the package have evaluated their initializers, and those are evaluated only after all the imported packages have been initialized.

```go
func init() {
    if user == "" {
        log.Fatal("$USER not set")
    }
    if home == "" {
        home = "/home/" + user
    }
    if gopath == "" {
        gopath = home + "/go"
    }
    // gopath may be overridden by --gopath flag on command line.
    flag.StringVar(&gopath, "gopath", gopath, "override default GOPATH")
}
```

## Methods 

### Pointers vs. Values

如果需要改变值就定义为pointer

### Interface conversions and type assertions

```go
str, ok := value.(string)
if ok {
    fmt.Printf("string value is: %q\n", str)
} else {
    fmt.Printf("value is not a string\n")
}
```

### interface 

```go
type Block interface {
    BlockSize() int
    Encrypt(dst, src []byte)
    Decrypt(dst, src []byte)
}
```