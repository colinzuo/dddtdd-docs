"use strict";(self.webpackChunkdoc_center=self.webpackChunkdoc_center||[]).push([[5911],{17464:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>o,contentTitle:()=>l,default:()=>h,frontMatter:()=>r,metadata:()=>a,toc:()=>c});var i=t(74848),s=t(28453);const r={},l=void 0,a={id:"programming-languages/golang/basics",title:"basics",description:"data structures",source:"@site/docs/00400-programming-languages/golang/basics.md",sourceDirName:"00400-programming-languages/golang",slug:"/programming-languages/golang/basics",permalink:"/dddtdd-docs/programming-languages/golang/basics",draft:!1,unlisted:!1,tags:[],version:"current",lastUpdatedBy:"Colin Zuo",lastUpdatedAt:1720187019e3,frontMatter:{},sidebar:"docSidebar",previous:{title:"Golang\u4ecb\u7ecd",permalink:"/dddtdd-docs/programming-languages/golang/"},next:{title:"cmd-go",permalink:"/dddtdd-docs/programming-languages/golang/cmd-go"}},o={},c=[{value:"data structures",id:"data-structures",level:2},{value:"basic types",id:"basic-types",level:3},{value:"array",id:"array",level:3},{value:"slice",id:"slice",level:3},{value:"map",id:"map",level:3},{value:"basic syntax",id:"basic-syntax",level:2},{value:"for basic",id:"for-basic",level:3},{value:"for range",id:"for-range",level:3},{value:"for condition only",id:"for-condition-only",level:3},{value:"for only",id:"for-only",level:3},{value:"if",id:"if",level:3},{value:"If with a short statement",id:"if-with-a-short-statement",level:3},{value:"switch",id:"switch",level:3},{value:"Switch with no condition",id:"switch-with-no-condition",level:3},{value:"Defer",id:"defer",level:3},{value:"type switch",id:"type-switch",level:3},{value:"type assertion",id:"type-assertion",level:3},{value:"type conversion",id:"type-conversion",level:3},{value:"Constants",id:"constants",level:3},{value:"Pointers",id:"pointers",level:3},{value:"Struct Literals",id:"struct-literals",level:3},{value:"function",id:"function",level:2},{value:"Multiple results",id:"multiple-results",level:3},{value:"Named return values",id:"named-return-values",level:3},{value:"Function literals",id:"function-literals",level:3},{value:"closure",id:"closure",level:3},{value:"variable declarations",id:"variable-declarations",level:3},{value:"method",id:"method",level:2},{value:"Interfaces",id:"interfaces",level:2},{value:"Interface values with nil underlying values",id:"interface-values-with-nil-underlying-values",level:3},{value:"The empty interface",id:"the-empty-interface",level:3},{value:"generics",id:"generics",level:2},{value:"concurrency",id:"concurrency",level:2},{value:"Goroutines",id:"goroutines",level:3},{value:"Channels",id:"channels",level:3},{value:"Buffered Channels",id:"buffered-channels",level:3},{value:"Range and Close",id:"range-and-close",level:3},{value:"Select",id:"select",level:3},{value:"Default Selection",id:"default-selection",level:3},{value:"sync.Mutex",id:"syncmutex",level:3},{value:"context",id:"context",level:3},{value:"Code organization",id:"code-organization",level:2},{value:"package",id:"package",level:3},{value:"module",id:"module",level:3},{value:"testing",id:"testing",level:3},{value:"go tools",id:"go-tools",level:2},{value:"json",id:"json",level:2},{value:"diagnostics",id:"diagnostics",level:2},{value:"Profiling",id:"profiling",level:3},{value:"Tracing",id:"tracing",level:3},{value:"Debugging",id:"debugging",level:3},{value:"Runtime statistics and events",id:"runtime-statistics-and-events",level:3},{value:"gc",id:"gc",level:2},{value:"managing-dependencies",id:"managing-dependencies",level:2},{value:"Requiring module code in a local directory",id:"requiring-module-code-in-a-local-directory",level:3},{value:"Requiring external module code from your own repository fork",id:"requiring-external-module-code-from-your-own-repository-fork",level:3}];function d(e){const n={a:"a",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h2,{id:"data-structures",children:"data structures"}),"\n",(0,i.jsx)(n.h3,{id:"basic-types",children:"basic types"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"bool"}),"\n",(0,i.jsx)(n.li,{children:"byte"}),"\n",(0,i.jsx)(n.li,{children:"int  int8  int16  int32  int64"}),"\n",(0,i.jsx)(n.li,{children:"uint uint8 uint16 uint32 uint64 uintptr"}),"\n",(0,i.jsx)(n.li,{children:"float32 float64"}),"\n",(0,i.jsx)(n.li,{children:"rune"}),"\n",(0,i.jsx)(n.li,{children:"string"}),"\n",(0,i.jsx)(n.li,{children:"complex64 complex128"}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"array",children:"array"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.a,{href:"https://go.dev/blog/slices-intro",children:"https://go.dev/blog/slices-intro"})}),"\n",(0,i.jsxs)(n.p,{children:["Go\u2019s arrays are values. An array variable denotes the entire array; it is not a pointer to the first array element (as would be the case in C). This means that when you assign or pass around an array value ",(0,i.jsx)(n.strong,{children:"you will make a copy of its contents"})]}),"\n",(0,i.jsx)(n.p,{children:"An array's length is part of its type, so arrays cannot be resized"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-go",children:'b := [2]string{"Penn", "Teller"}\n\nb := [...]string{"Penn", "Teller"}\n'})}),"\n",(0,i.jsx)(n.h3,{id:"slice",children:"slice"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.a,{href:"https://go.dev/blog/slices-intro",children:"https://go.dev/blog/slices-intro"})}),"\n",(0,i.jsx)(n.p,{children:"Unlike an array type, a slice type has no specified length"}),"\n",(0,i.jsx)(n.p,{children:"The zero value of a slice is nil. The len and cap functions will both return 0 for a nil slice."}),"\n",(0,i.jsx)(n.p,{children:"The start and end indices of a slice expression are optional; they default to zero and the slice\u2019s length respectively:"}),"\n",(0,i.jsx)(n.p,{children:"A slice is a descriptor of an array segment. It consists of a pointer to the array, the length of the segment, and its capacity"}),"\n",(0,i.jsx)(n.p,{children:"To increase the capacity of a slice one must create a new, larger slice and copy the contents of the original slice into it"}),"\n",(0,i.jsx)(n.p,{children:"To append one slice to another, use ... to expand the second argument to a list of arguments"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-go",children:"letters := []string{\"a\", \"b\", \"c\", \"d\"}\n\nfunc make([]T, len, cap) []T\n\nvar s []byte\ns = make([]byte, 5, 5)\n// s == []byte{0, 0, 0, 0, 0}\n\ns := make([]byte, 5)\n\nlen(s) == 5\ncap(s) == 5\n\nb := []byte{'g', 'o', 'l', 'a', 'n', 'g'}\n// b[1:4] == []byte{'o', 'l', 'a'}, sharing the same storage as b\n\n// b[:2] == []byte{'g', 'o'}\n// b[2:] == []byte{'l', 'a', 'n', 'g'}\n// b[:] == b\n\nt := make([]byte, len(s), (cap(s)+1)*2)\ncopy(t, s)\ns = t\n\nfunc append(s []T, x ...T) []T\n\na := make([]int, 1)\n// a == []int{0}\na = append(a, 1, 2, 3)\n// a == []int{0, 1, 2, 3}\n\na := []string{\"John\", \"Paul\"}\nb := []string{\"George\", \"Ringo\", \"Pete\"}\na = append(a, b...) // equivalent to \"append(a, b[0], b[1], b[2])\"\n// a == []string{\"John\", \"Paul\", \"George\", \"Ringo\", \"Pete\"}\n"})}),"\n",(0,i.jsx)(n.h3,{id:"map",children:"map"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.a,{href:"https://go.dev/blog/maps",children:"https://go.dev/blog/maps"})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-go",children:'var m map[string]int\n\nm = make(map[string]int)\n\nm["route"] = 66\n\ni := m["route"]\n\nn := len(m)\n\ndelete(m, "route")\n\ni, ok := m["route"]\n\nfor key, value := range m {\n    fmt.Println("Key:", key, "Value:", value)\n}\n\ncommits := map[string]int{\n    "rsc": 3711,\n    "r":   2138,\n    "gri": 1908,\n    "adg": 912,\n}\n\nm = map[string]int{}\n'})}),"\n",(0,i.jsx)(n.h2,{id:"basic-syntax",children:"basic syntax"}),"\n",(0,i.jsx)(n.h3,{id:"for-basic",children:"for basic"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-go",children:"for i := 0; i < 10; i++ {\n    sum += i\n}\n"})}),"\n",(0,i.jsx)(n.h3,{id:"for-range",children:"for range"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-go",children:"for k, v := range m {\n    ...\n}\n"})}),"\n",(0,i.jsx)(n.h3,{id:"for-condition-only",children:"for condition only"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-go",children:"for sum < 1000 {\n    sum += sum\n}\n"})}),"\n",(0,i.jsx)(n.h3,{id:"for-only",children:"for only"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-go",children:"for {\n    ...\n}\n"})}),"\n",(0,i.jsx)(n.h3,{id:"if",children:"if"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-go",children:'\tif x < 0 {\n\t\treturn sqrt(-x) + "i"\n\t}\n'})}),"\n",(0,i.jsx)(n.h3,{id:"if-with-a-short-statement",children:"If with a short statement"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-go",children:"\tif v := math.Pow(x, n); v < lim {\n\t\treturn v\n\t}\n"})}),"\n",(0,i.jsx)(n.h3,{id:"switch",children:"switch"}),"\n",(0,i.jsx)(n.p,{children:"A switch statement is a shorter way to write a sequence of if - else statements"}),"\n",(0,i.jsx)(n.p,{children:"Go only runs the selected case, not all the cases that follow"}),"\n",(0,i.jsx)(n.p,{children:"Another important difference is that Go's switch cases need not be constants, and the values involved need not be integers."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-go",children:'\tswitch os := runtime.GOOS; os {\n\tcase "darwin":\n\t\tfmt.Println("OS X.")\n\tcase "linux":\n\t\tfmt.Println("Linux.")\n\tdefault:\n\t\t// freebsd, openbsd,\n\t\t// plan9, windows...\n\t\tfmt.Printf("%s.\\n", os)\n\t}\n'})}),"\n",(0,i.jsx)(n.h3,{id:"switch-with-no-condition",children:"Switch with no condition"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-go",children:'\tswitch {\n\tcase t.Hour() < 12:\n\t\tfmt.Println("Good morning!")\n\tcase t.Hour() < 17:\n\t\tfmt.Println("Good afternoon.")\n\tdefault:\n\t\tfmt.Println("Good evening.")\n\t}\n'})}),"\n",(0,i.jsx)(n.h3,{id:"defer",children:"Defer"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.a,{href:"https://go.dev/blog/defer-panic-and-recover",children:"https://go.dev/blog/defer-panic-and-recover"})}),"\n",(0,i.jsx)(n.p,{children:"The deferred call's arguments are evaluated immediately, but the function call is not executed until the surrounding function returns"}),"\n",(0,i.jsxs)(n.p,{children:["Deferred function calls are pushed onto a stack. When a function returns, its deferred calls are executed in ",(0,i.jsx)(n.strong,{children:"last-in-first-out"})," order."]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"A deferred function\u2019s arguments are evaluated when the defer statement is evaluated"}),"\n",(0,i.jsx)(n.li,{children:"Deferred function calls are executed in Last In First Out order after the surrounding function returns"}),"\n",(0,i.jsx)(n.li,{children:"Deferred functions may read and assign to the returning function\u2019s named return values"}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-go",children:'\tdefer fmt.Println("world")\n'})}),"\n",(0,i.jsx)(n.h3,{id:"type-switch",children:"type switch"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-go",children:'    switch vv := v.(type) {\n    case string:\n        fmt.Println(k, "is string", vv)\n    case float64:\n        fmt.Println(k, "is float64", vv)\n    case []interface{}:\n        fmt.Println(k, "is an array:")\n        for i, u := range vv {\n            fmt.Println(i, u)\n        }\n    default:\n        fmt.Println(k, "is of a type I don\'t know how to handle")\n    }\n'})}),"\n",(0,i.jsx)(n.h3,{id:"type-assertion",children:"type assertion"}),"\n",(0,i.jsx)(n.p,{children:"If i does not hold a T, the statement will trigger a panic."}),"\n",(0,i.jsx)(n.p,{children:"To test whether an interface value holds a specific type, a type assertion can return two values"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-go",children:"t := i.(T)\n\nt, ok := i.(T)\n"})}),"\n",(0,i.jsx)(n.h3,{id:"type-conversion",children:"type conversion"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-go",children:"var i int = 42\nvar f float64 = float64(i)\nvar u uint = uint(f)\n"})}),"\n",(0,i.jsx)(n.h3,{id:"constants",children:"Constants"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-go",children:"const Pi = 3.14\n"})}),"\n",(0,i.jsx)(n.h3,{id:"pointers",children:"Pointers"}),"\n",(0,i.jsx)(n.p,{children:"Unlike C, Go has no pointer arithmetic"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-go",children:"i, j := 42, 2701\n\np := &i         // point to i\nfmt.Println(*p) // read i through the pointer\n*p = 21         // set i through the pointer\nfmt.Println(i)  // see the new value of i\n"})}),"\n",(0,i.jsx)(n.h3,{id:"struct-literals",children:"Struct Literals"}),"\n",(0,i.jsx)(n.p,{children:"You can list just a subset of fields by using the Name: syntax"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-go",children:"type Vertex struct {\n\tX, Y int\n}\n\nvar (\n\tv1 = Vertex{1, 2}  // has type Vertex\n\tv2 = Vertex{X: 1}  // Y:0 is implicit\n\tv3 = Vertex{}      // X:0 and Y:0\n\tp  = &Vertex{1, 2} // has type *Vertex\n)\n"})}),"\n",(0,i.jsx)(n.h2,{id:"function",children:"function"}),"\n",(0,i.jsx)(n.h3,{id:"multiple-results",children:"Multiple results"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-go",children:"func swap(x, y string) (string, string) {\n\treturn y, x\n}\n"})}),"\n",(0,i.jsx)(n.h3,{id:"named-return-values",children:"Named return values"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-go",children:"func split(sum int) (x, y int) {\n\tx = sum * 4 / 9\n\ty = sum - x\n\treturn\n}\n"})}),"\n",(0,i.jsx)(n.h3,{id:"function-literals",children:"Function literals"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.a,{href:"https://go.dev/ref/spec#Function_literals",children:"https://go.dev/ref/spec#Function_literals"})}),"\n",(0,i.jsx)(n.p,{children:"Function literals are closures: they may refer to variables defined in a surrounding function"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-go",children:"f := func(x, y int) int { return x + y }\nfunc(ch chan int) { ch <- ACK }(replyChan)\n"})}),"\n",(0,i.jsx)(n.h3,{id:"closure",children:"closure"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-go",children:"func makeHandler(fn func (http.ResponseWriter, *http.Request, string)) http.HandlerFunc {\n    return func(w http.ResponseWriter, r *http.Request) {\n        // Here we will extract the page title from the Request,\n        // and call the provided handler 'fn'\n    }\n}\n"})}),"\n",(0,i.jsx)(n.h3,{id:"variable-declarations",children:"variable declarations"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-go",children:"var i, j int = 1, 2\nk := 3\n"})}),"\n",(0,i.jsx)(n.h2,{id:"method",children:"method"}),"\n",(0,i.jsx)(n.p,{children:"Go does not have classes. However, you can define methods on types."}),"\n",(0,i.jsx)(n.p,{children:"A method is a function with a special receiver argument"}),"\n",(0,i.jsxs)(n.p,{children:["a method is ",(0,i.jsx)(n.strong,{children:"just a function with a receiver argument"})]}),"\n",(0,i.jsx)(n.p,{children:"You can declare a method on non-struct types, too"}),"\n",(0,i.jsxs)(n.p,{children:["You can only declare a method with a receiver ",(0,i.jsx)(n.strong,{children:"whose type is defined in the same package"})," as the method"]}),"\n",(0,i.jsx)(n.p,{children:"Methods with pointer receivers can modify the value to which the receiver points"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-go",children:"type MyFloat float64\n\nfunc (f MyFloat) Abs() float64 {\n\tif f < 0 {\n\t\treturn float64(-f)\n\t}\n\treturn float64(f)\n}\n"})}),"\n",(0,i.jsx)(n.h2,{id:"interfaces",children:"Interfaces"}),"\n",(0,i.jsx)(n.p,{children:"An interface type is defined as a set of method signatures."}),"\n",(0,i.jsx)(n.p,{children:"A value of interface type can hold any value that implements those methods"}),"\n",(0,i.jsxs)(n.p,{children:["A type implements an interface by implementing its methods. There is no explicit declaration of intent, ",(0,i.jsx)(n.strong,{children:'no "implements" keyword'})]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.code,{children:"type Stringer interface"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.code,{children:"type error interface"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.code,{children:"io.Reader: func (T) Read(b []byte) (n int, err error)"})}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"interface-values-with-nil-underlying-values",children:"Interface values with nil underlying values"}),"\n",(0,i.jsx)(n.p,{children:"If the concrete value inside the interface itself is nil, the method will be called with a nil receiver"}),"\n",(0,i.jsx)(n.p,{children:"Note that an interface value that holds a nil concrete value is itself non-nil"}),"\n",(0,i.jsx)(n.h3,{id:"the-empty-interface",children:"The empty interface"}),"\n",(0,i.jsx)(n.p,{children:"The interface type that specifies zero methods is known as the empty interface"}),"\n",(0,i.jsx)(n.p,{children:"An empty interface may hold values of any type. (Every type implements at least zero methods.)"}),"\n",(0,i.jsx)(n.h2,{id:"generics",children:"generics"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-go",children:"type Number interface {\n    int64 | float64\n}\n\nfunc SumNumbers[K comparable, V Number](m map[K]V) V {\n...\n}\n"})}),"\n",(0,i.jsx)(n.h2,{id:"concurrency",children:"concurrency"}),"\n",(0,i.jsx)(n.h3,{id:"goroutines",children:"Goroutines"}),"\n",(0,i.jsx)(n.p,{children:"Goroutines run in the same address space, so access to shared memory must be synchronized. The sync package provides useful primitives"}),"\n",(0,i.jsx)(n.h3,{id:"channels",children:"Channels"}),"\n",(0,i.jsx)(n.p,{children:"The data flows in the direction of the arrow"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-go",children:"ch := make(chan int)\n\nch <- v    // Send v to channel ch.\nv := <-ch  // Receive from ch, and\n           // assign value to v\n"})}),"\n",(0,i.jsx)(n.h3,{id:"buffered-channels",children:"Buffered Channels"}),"\n",(0,i.jsx)(n.p,{children:"Sends to a buffered channel block only when the buffer is full. Receives block when the buffer is empty"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-go",children:"ch := make(chan int, 100)\n"})}),"\n",(0,i.jsx)(n.h3,{id:"range-and-close",children:"Range and Close"}),"\n",(0,i.jsx)(n.p,{children:"A sender can close a channel to indicate that no more values will be sent. Receivers can test whether a channel has been closed by assigning a second parameter to the receive expression"}),"\n",(0,i.jsx)(n.p,{children:"ok is false if there are no more values to receive and the channel is closed"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-go",children:"v, ok := <-ch\n"})}),"\n",(0,i.jsxs)(n.p,{children:["The loop for ",(0,i.jsx)(n.code,{children:"i := range c"})," receives values from the channel repeatedly until it is closed"]}),"\n",(0,i.jsx)(n.h3,{id:"select",children:"Select"}),"\n",(0,i.jsx)(n.p,{children:"The select statement lets a goroutine wait on multiple communication operations"}),"\n",(0,i.jsx)(n.p,{children:"A select blocks until one of its cases can run, then it executes that case. It chooses one at random if multiple are ready"}),"\n",(0,i.jsx)(n.h3,{id:"default-selection",children:"Default Selection"}),"\n",(0,i.jsxs)(n.p,{children:["The ",(0,i.jsx)(n.code,{children:"default"})," case in a select is run if ",(0,i.jsx)(n.strong,{children:"no other case is ready"})]}),"\n",(0,i.jsx)(n.h3,{id:"syncmutex",children:"sync.Mutex"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Lock"}),"\n",(0,i.jsx)(n.li,{children:"Unlock"}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"context",children:"context"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://go.dev/blog/context",children:"https://go.dev/blog/context"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://go.dev/blog/pipelines",children:"https://go.dev/blog/pipelines"})}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"code-organization",children:"Code organization"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.a,{href:"https://go.dev/doc/code",children:"https://go.dev/doc/code"})}),"\n",(0,i.jsx)(n.h3,{id:"package",children:"package"}),"\n",(0,i.jsxs)(n.p,{children:["Go programs are organized into packages. ",(0,i.jsx)(n.strong,{children:"A package is a collection of source files in the same directory"})," that are compiled together. Functions, types, variables, and constants defined in one source file are visible to all other source files within the same package"]}),"\n",(0,i.jsx)(n.h3,{id:"module",children:"module"}),"\n",(0,i.jsxs)(n.p,{children:["A repository contains one or more modules. ",(0,i.jsx)(n.strong,{children:"A module is a collection of related Go packages that are released together"}),". A Go repository typically contains only one module, located at the root of the repository. A file named go.mod there declares the module path: the import path prefix for all packages within the module"]}),"\n",(0,i.jsxs)(n.p,{children:["An ",(0,i.jsx)(n.strong,{children:"import path"})," is a string used to import a package. A package's import path is its module path joined with its subdirectory within the module."]}),"\n",(0,i.jsxs)(n.p,{children:["Module dependencies are automatically downloaded to the ",(0,i.jsx)(n.code,{children:"pkg/mod"})," subdirectory of the directory indicated by the ",(0,i.jsx)(n.code,{children:"GOPATH"})," environment variable."]}),"\n",(0,i.jsx)(n.h3,{id:"testing",children:"testing"}),"\n",(0,i.jsxs)(n.p,{children:["You write a test by creating a file with a name ending in ",(0,i.jsx)(n.code,{children:"_test.go"})," that contains functions named ",(0,i.jsx)(n.code,{children:"TestXXX"})," with signature ",(0,i.jsx)(n.code,{children:"func (t *testing.T)"}),". The test framework runs each such function; if the function calls a failure function such as ",(0,i.jsx)(n.code,{children:"t.Error or t.Fail"}),", the test is considered to have failed."]}),"\n",(0,i.jsx)(n.h2,{id:"go-tools",children:"go tools"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"go mod init example/user/hello\n\ngo mod tidy\n"})}),"\n",(0,i.jsx)(n.h2,{id:"json",children:"json"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.a,{href:"https://go.dev/blog/json",children:"https://go.dev/blog/json"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Pointers will be encoded as the values they point to (or \u2019null\u2019 if the pointer is nil)."}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-go",children:"func Marshal(v interface{}) ([]byte, error)\n\nb, err := json.Marshal(m)\n\nfunc Unmarshal(data []byte, v interface{}) error\n\nerr := json.Unmarshal(b, &m)\n"})}),"\n",(0,i.jsx)(n.h2,{id:"diagnostics",children:"diagnostics"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.a,{href:"https://go.dev/doc/diagnostics",children:"https://go.dev/doc/diagnostics"})}),"\n",(0,i.jsx)(n.h3,{id:"profiling",children:"Profiling"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://pkg.go.dev/runtime/pprof",children:"https://pkg.go.dev/runtime/pprof"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://pkg.go.dev/net/http/pprof",children:"https://pkg.go.dev/net/http/pprof"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://go.dev/blog/pprof",children:"https://go.dev/blog/pprof"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://github.com/google/pprof/blob/main/doc/README.md",children:"https://github.com/google/pprof/blob/main/doc/README.md"})}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"It is safe to profile programs in production, but enabling some profiles (e.g. the CPU profile) adds cost"}),"\n",(0,i.jsx)(n.h3,{id:"tracing",children:"Tracing"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://pkg.go.dev/context#Context",children:"https://pkg.go.dev/context#Context"})}),"\n"]}),"\n",(0,i.jsxs)(n.p,{children:["You can propagate trace identifiers and tags in the ",(0,i.jsx)(n.code,{children:"context.Context"}),"."]}),"\n",(0,i.jsx)(n.h3,{id:"debugging",children:"Debugging"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://github.com/go-delve/delve",children:"https://github.com/go-delve/delve"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://github.com/golang/go/wiki/CoreDumpDebugging",children:"https://github.com/golang/go/wiki/CoreDumpDebugging"})}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"runtime-statistics-and-events",children:"Runtime statistics and events"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"runtime.ReadMemStats: reports the metrics related to heap allocation and garbage collection"}),"\n",(0,i.jsx)(n.li,{children:"debug.ReadGCStats: reads statistics about garbage collection"}),"\n",(0,i.jsx)(n.li,{children:"debug.Stack: returns the current stack trace"}),"\n",(0,i.jsx)(n.li,{children:"debug.WriteHeapDump: suspends the execution of all goroutines and allows you to dump the heap to a file"}),"\n",(0,i.jsx)(n.li,{children:"runtime.NumGoroutine: returns the number of current goroutines"}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"gc",children:"gc"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.a,{href:"https://go.dev/doc/gc-guide",children:"https://go.dev/doc/gc-guide"})}),"\n",(0,i.jsx)(n.p,{children:"At a high level, GOGC determines the trade-off between GC CPU and memory"}),"\n",(0,i.jsx)(n.p,{children:"It works by determining the target heap size after each GC cycle, a target value for the total heap size in the next cycle"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.code,{children:"Target heap memory = Live heap + (Live heap + GC roots) * GOGC / 100"})}),"\n",(0,i.jsxs)(n.p,{children:["GOGC may be configured through either the ",(0,i.jsx)(n.code,{children:"GOGC"})," environment variable (which all Go programs recognize), or through the ",(0,i.jsx)(n.code,{children:"SetGCPercent"})," API in the runtime/debug package"]}),"\n",(0,i.jsxs)(n.p,{children:["That's why in the 1.19 release, Go added support for setting a runtime memory limit. The memory limit may be configured either via the ",(0,i.jsx)(n.code,{children:"GOMEMLIMIT"})," environment variable which all Go programs recognize, or through the ",(0,i.jsx)(n.code,{children:"SetMemoryLimit"})," function available in the runtime/debug package"]}),"\n",(0,i.jsx)(n.p,{children:"In many cases, an indefinite stall is worse than an out-of-memory condition, which tends to result in a much faster failure."}),"\n",(0,i.jsx)(n.p,{children:"For this reason, the memory limit is defined to be soft. The Go runtime makes no guarantees that it will maintain this memory limit under all circumstances"}),"\n",(0,i.jsxs)(n.p,{children:["How this works internally is the GC sets an ",(0,i.jsx)(n.strong,{children:"upper limit on the amount of CPU time"})," it can use over some time window (with some hysteresis for very short transient spikes in CPU use). This limit is currently set at roughly ",(0,i.jsx)(n.code,{children:"50%"}),", with a ",(0,i.jsx)(n.code,{children:"2 * GOMAXPROCS CPU-second window"})]}),"\n",(0,i.jsxs)(n.p,{children:["The ",(0,i.jsx)(n.strong,{children:"pauses are more strongly proportional to GOMAXPROCS"})," algorithmically, but most commonly are dominated by the time it takes to stop running goroutines."]}),"\n",(0,i.jsx)(n.p,{children:"This is because most of the costs for the GC are incurred while the mark phase is active."}),"\n",(0,i.jsxs)(n.p,{children:["The key takeaway then, is that ",(0,i.jsx)(n.strong,{children:"reducing GC frequency may also lead to latency improvements"})]}),"\n",(0,i.jsx)(n.h2,{id:"managing-dependencies",children:"managing-dependencies"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.a,{href:"https://go.dev/doc/modules/managing-dependencies",children:"https://go.dev/doc/modules/managing-dependencies"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["To add all dependencies for a package in your module: ",(0,i.jsx)(n.code,{children:"go get ."})]}),"\n",(0,i.jsxs)(n.li,{children:["To get a specific numbered version: ",(0,i.jsx)(n.code,{children:"go get example.com/theirmodule@v1.3.4"})]}),"\n",(0,i.jsxs)(n.li,{children:["To get the latest version: ",(0,i.jsx)(n.code,{children:"go get example.com/theirmodule@latest"})]}),"\n",(0,i.jsxs)(n.li,{children:["To keep your managed dependency set tidy: ",(0,i.jsx)(n.code,{children:"go mod tidy"})," this command edits your go.mod file to add modules that are necessary but missing. It also removes unused modules that don\u2019t provide any relevant packages"]}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"requiring-module-code-in-a-local-directory",children:"Requiring module code in a local directory"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-text",children:"require example.com/theirmodule v0.0.0-unpublished\n\nreplace example.com/theirmodule v0.0.0-unpublished => ../theirmodule\n"})}),"\n",(0,i.jsx)(n.h3,{id:"requiring-external-module-code-from-your-own-repository-fork",children:"Requiring external module code from your own repository fork"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-text",children:"require example.com/theirmodule v1.2.3\n\nreplace example.com/theirmodule v1.2.3 => example.com/myfork/theirmodule v1.2.3-fixed\n"})})]})}function h(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},28453:(e,n,t)=>{t.d(n,{R:()=>l,x:()=>a});var i=t(96540);const s={},r=i.createContext(s);function l(e){const n=i.useContext(r);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:l(e.components),i.createElement(r.Provider,{value:n},e.children)}}}]);