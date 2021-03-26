---
title: 教程
---

## Install

<https://golang.org/doc/install>

## Get started

<https://golang.org/doc/tutorial/getting-started>

### mod初始化

```bash
go mod init MODULE_PATH
```

### 引入外部module

```go
import "rsc.io/quote"
```

### 添加新外部module

```bash
go mod tidy
```

## Create Module

<https://golang.org/doc/tutorial/create-module>

### 初始化

```bash
go mod init example.com/greetings
```

### 函数和变量定义

```go
// Hello returns a greeting for the named person.
func Hello(name string) string {
    // Return a greeting that embeds the name in a message.
    message := fmt.Sprintf("Hi, %v. Welcome!", name)
    // or
    // var message string
    // message = fmt.Sprintf("Hi, %v. Welcome!", name)
    return message
}
```

### 在其它项目中引用

编辑go.mod
```go
module example.com/hello

go 1.16

replace example.com/greetings => ../greetings
```

触发同步包
```bash
go mod tidy
```

### 处理错误

```go
// Hello returns a greeting for the named person.
func Hello(name string) (string, error) {
    // If no name was given, return an error with a message.
    if name == "" {
        return "", errors.New("empty name")
    }

    // If a name was received, return a value that embeds the name
    // in a greeting message.
    message := fmt.Sprintf("Hi, %v. Welcome!", name)
    return message, nil
}
```

```go
func main() {
    // Set properties of the predefined Logger, including
    // the log entry prefix and a flag to disable printing
    // the time, source file, and line number.
    log.SetPrefix("greetings: ")
    log.SetFlags(0)

    // Request a greeting message.
    message, err := greetings.Hello("")
    // If an error was returned, print it to the console and
    // exit the program.
    if err != nil {
        log.Fatal(err)
    }

    // If no error was returned, print the returned message
    // to the console.
    fmt.Println(message)
}
```

### 常见数据结构

slices
```go
formats := []string{
        "Hi, %v. Welcome!",
        "Great to see you, %v!",
        "Hail, %v! Well met!",
    }

cases := []struct {
		in, want string
	}{
		{"Hello, world", "dlrow ,olleH"},
		{"Hello, 世界", "界世 ,olleH"},
		{"", ""},
	}    
```

map
```go
messages := make(map[string]string)
```

### testing

```go
import (
    "testing"
)

// TestHelloEmpty calls greetings.Hello with an empty string,
// checking for an error.
func TestHelloEmpty(t *testing.T) {
    msg, err := Hello("")
    if msg != "" || err == nil {
        t.Fatalf(`Hello("") = %q, %v, want "", error`, msg, err)
    }
}
```

```bash
go test -v
```

### build

```bash
go build
```

### install

检查安装地址
```bash
go list -f '{{.Target}}'
```

```bash
go install
```