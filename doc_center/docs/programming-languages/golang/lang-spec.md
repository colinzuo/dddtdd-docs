
<https://go.dev/ref/spec>

## Rune literals

```go
rune_lit         = "'" ( unicode_value | byte_value ) "'" .
unicode_value    = unicode_char | little_u_value | big_u_value | escaped_char .
byte_value       = octal_byte_value | hex_byte_value .
octal_byte_value = `\` octal_digit octal_digit octal_digit .
hex_byte_value   = `\` "x" hex_digit hex_digit .
little_u_value   = `\` "u" hex_digit hex_digit hex_digit hex_digit .
big_u_value      = `\` "U" hex_digit hex_digit hex_digit hex_digit
                           hex_digit hex_digit hex_digit hex_digit .
escaped_char     = `\` ( "a" | "b" | "f" | "n" | "r" | "t" | "v" | `\` | "'" | `"` ) .
```

## String literals

The value of a raw string literal is the string composed of the uninterpreted (implicitly UTF-8-encoded) characters between the quotes; in particular, **backslashes have no special meaning and the string may contain newlines**

```go
string_lit             = raw_string_lit | interpreted_string_lit .
raw_string_lit         = "`" { unicode_char | newline } "`" .
interpreted_string_lit = `"` { unicode_value | byte_value } `"` .
```

## Constants

Numeric constants represent exact values of arbitrary precision and do not overflow

An **untyped constant has a default type** which is the type to which the constant is implicitly converted in contexts where a typed value is required

The default type of an untyped constant is **bool, rune, int, float64, complex128, or string** respectively, depending on whether it is a boolean, rune, integer, floating-point, complex, or string constant

## Variables

The **static type** (or just type) of a variable is the type given in its declaration, the type provided in the new call or composite literal, or the type of an element of a structured variable. Variables of interface type also have a distinct **dynamic type**, which is the (non-interface) type of the value assigned to the variable at run time

## Types

A type may also be specified using a **type literal**, which composes a type from existing types

```go
Type      = TypeName [ TypeArgs ] | TypeLit | "(" Type ")" .
TypeName  = identifier | QualifiedIdent .
TypeArgs  = "[" TypeList [ "," ] "]" .
TypeList  = Type { "," Type } .
TypeLit   = ArrayType | StructType | PointerType | FunctionType | InterfaceType |
            SliceType | MapType | ChannelType .
```

### Numeric types

```go
byte        alias for uint8
rune        alias for int32

uint     either 32 or 64 bits
int      same size as uint
uintptr  an unsigned integer large enough to store the uninterpreted bits of a pointer value
```

### String types

Strings are **immutable**: once created, it is impossible to change the contents of a string

### Array types

An array is a numbered sequence of elements of a single type, called the **element type**

### Slice types

```go
make([]T, length, capacity)

make([]int, 50, 100)
new([100]int)[0:50]
```

### Struct types

```go
StructType    = "struct" "{" { FieldDecl ";" } "}" .
FieldDecl     = (IdentifierList Type | EmbeddedField) [ Tag ] .
EmbeddedField = [ "*" ] TypeName [ TypeArgs ] .
Tag           = string_lit .
```

### Function types

Within a list of parameters or results, the names (IdentifierList) must either all be present or all be absent

Parameter and result lists are always parenthesized except that if there is exactly one unnamed result it may be written as an unparenthesized type

The final incoming parameter in a function signature may have a type prefixed with .... A function with such a parameter is called variadic and may be invoked with zero or more arguments for that parameter

### Interface types

```go
InterfaceType  = "interface" "{" { InterfaceElem ";" } "}" .
InterfaceElem  = MethodElem | TypeElem .
MethodElem     = MethodName Signature .
MethodName     = identifier .
TypeElem       = TypeTerm { "|" TypeTerm } .
TypeTerm       = Type | UnderlyingType .
UnderlyingType = "~" Type .
```

### Basic interfaces

Interfaces whose type sets can be defined entirely by a list of methods are called basic interfaces

### Embedded interfaces

```go
type ReadWriter interface {
	Reader  // includes methods of Reader in ReadWriter's method set
	Writer  // includes methods of Writer in ReadWriter's method set
}
```

### General interfaces

- The type set of the empty interface is the set of all non-interface types.
- The type set of a non-empty interface is the intersection of the type sets of its interface elements.
- The type set of a method specification is the set of all non-interface types whose method sets include that method.
- The type set of a non-interface type term is the set consisting of just that type.
- The type set of a term of the form ~T is the set of all types whose underlying type is T.
- The type set of a union of terms t1|t2|…|tn is the union of the type sets of the terms.

Interfaces that are not basic may only be used as type constraints, or as elements of other interfaces used as constraints. They cannot be the types of values or variables, or components of other, non-interface types

```go
var x Float                     // illegal: Float is not a basic interface

var x interface{} = Float(nil)  // illegal

type Floatish struct {
	f Float                 // illegal
}
```

### Map types

A map is an **unordered** group of elements of one type, called the element type, indexed by a set of unique keys of another type, called the key type

A nil map is equivalent to an empty map except that no elements may be added

### Channel types

```go
ChannelType = ( "chan" | "chan" "<-" | "<-" "chan" ) ElementType .
```

The optional <- operator specifies the channel direction, send or receive. If a direction is given, the channel is **directional**, otherwise it is **bidirectional**

A nil channel is never ready for communication

## Properties of types and values

### Underlying types

Each type T has an underlying type: If T is one of the predeclared boolean, numeric, or string types, or a type literal, the corresponding underlying type is T itself. Otherwise, T's underlying type is the underlying type of the type to which T refers in its declaration

### Type identity

A named type is always different from any other type. Otherwise, two types are identical if their underlying type literals are structurally equivalent

### Assignability

A value x of type V is assignable to a variable of type T ("x is assignable to T") if one of the following conditions applies:

- V and T are identical.
- V and T have identical underlying types but are not type parameters and at least one of V or T is not a named type.
- V and T are channel types with identical element types, V is a bidirectional channel, and at least one of V or T is not a named type.
- T is an interface type, but not a type parameter, and x implements T.
- x is the predeclared identifier nil and T is a pointer, function, slice, map, channel, or interface type, but not a type parameter.
- x is an untyped constant representable by a value of type T

## Blocks

In addition to explicit blocks in the source code, there are implicit blocks:

- The universe block encompasses all Go source text.
- Each package has a package block containing all Go source text for that package.
- Each file has a file block containing all Go source text in that file.
- Each "if", "for", and "switch" statement is considered to be in its own implicit block.
- Each clause in a "switch" or "select" statement acts as an implicit block

## Constant declarations

Within a parenthesized const declaration list the expression list may be omitted from any but the first ConstSpec. Such an empty list is equivalent to the textual substitution of the first preceding non-empty expression list and its type if any. Omitting the list of expressions is therefore equivalent to repeating the previous list

## Type declarations

```go
TypeDecl = "type" ( TypeSpec | "(" { TypeSpec ";" } ")" ) .
TypeSpec = AliasDecl | TypeDef .
```

### Alias declarations

```go
AliasDecl = identifier "=" Type .
```

### Type definitions

```go
TypeDef = identifier [ TypeParameters ] Type .
```

The new type is called a **defined type**. It is different from any other type, including the type it is created from

```go
type (
	Point struct{ x, y float64 }  // Point and struct{ x, y float64 } are different types
	polar Point                   // polar and Point denote different types
)
```

A defined type may have methods associated with it. It **does not inherit any methods bound to the given type**, but the method set of an interface type or of elements of a composite type remains unchanged

### Type parameter declarations

```go
TypeParameters  = "[" TypeParamList [ "," ] "]" .
TypeParamList   = TypeParamDecl { "," TypeParamDecl } .
TypeParamDecl   = IdentifierList TypeConstraint .
```

The predeclared interface type **comparable** denotes the set of all non-interface types that are strictly comparable

## Short variable declarations

Unlike regular variable declarations, a short variable declaration may **redeclare** variables provided they were originally declared earlier in the same block (or the parameter lists if the block is the function body) with the same type, and **at least one of the non-blank variables is new**

Short variable declarations may appear only inside functions

## Function declarations

A function declaration without type parameters may omit the body. Such a declaration provides the signature for a function implemented **outside Go**, such as an assembly routine

## Method declarations

A receiver base type cannot be a pointer or interface type and it **must be defined in the same package as the method**. The method is said to be bound to its receiver base type and the method name is visible only within selectors for type T or *T.

## Expressions

An expression specifies the computation of a value by applying **operators and functions** to **operands**

### Qualified identifiers

```go
QualifiedIdent = PackageName "." identifier .
```

### Composite literals

```go
CompositeLit  = LiteralType LiteralValue .
LiteralType   = StructType | ArrayType | "[" "..." "]" ElementType |
                SliceType | MapType | TypeName [ TypeArgs ] .
LiteralValue  = "{" [ ElementList [ "," ] ] "}" .
ElementList   = KeyedElement { "," KeyedElement } .
KeyedElement  = [ Key ":" ] Element .
Key           = FieldName | Expression | LiteralValue .
FieldName     = identifier .
Element       = Expression | LiteralValue .
```

Note that the zero value for a slice or map type is not the same as an initialized but empty value of the same type

```go
p1 := &[]int{}    // p1 points to an initialized, empty slice with value []int{} and length 0
p2 := new([]int)  // p2 points to an uninitialized slice with value nil and length 0
```

The notation `...` specifies an array length equal to the maximum element index plus one

```go
buffer := [10]string{}             // len(buffer) == 10
intSet := [6]int{1, 2, 3, 5}       // len(intSet) == 6
days := [...]string{"Sat", "Sun"}  // len(days) == 2
```

A slice literal describes the entire underlying array literal. Thus the length and capacity of a slice literal are the maximum element index plus one

shorthand for a slice operation applied to an array

```go
tmp := [n]T{x1, x2, … xn}
tmp[0 : n]
```

Within a composite literal of array, slice, or map type T, elements or map keys that are themselves composite literals may **elide the respective literal type** if it is identical to the element or key type of `T`. Similarly, elements or keys that are addresses of composite literals may elide the `&T` when the element or key type is `*T`

```go
[...]Point{{1.5, -3.5}, {0, 0}}     // same as [...]Point{Point{1.5, -3.5}, Point{0, 0}}
[][]int{{1, 2, 3}, {4, 5}}          // same as [][]int{[]int{1, 2, 3}, []int{4, 5}}
[][]Point{{{0, 1}, {1, 2}}}         // same as [][]Point{[]Point{Point{0, 1}, Point{1, 2}}}
map[string]Point{"orig": {0, 0}}    // same as map[string]Point{"orig": Point{0, 0}}
map[Point]string{{0, 0}: "orig"}    // same as map[Point]string{Point{0, 0}: "orig"}

type PPoint *Point
[2]*Point{{1.5, -3.5}, {}}          // same as [2]*Point{&Point{1.5, -3.5}, &Point{}}
[2]PPoint{{1.5, -3.5}, {}}          // same as [2]PPoint{PPoint(&Point{1.5, -3.5}), PPoint(&Point{})}
```

## Function literals

```go
FunctionLit = "func" Signature FunctionBody .
```

Function literals are **closures**: they may refer to variables defined in a surrounding function. Those variables are then shared between the surrounding function and the function literal, and they survive as long as they are accessible

## Selectors

For a primary expression x that is not a package name, the selector expression

```go
x.f
```

The identifier `f` is called the (field or method) **selector**

- As an exception, if the type of x is a **defined pointer type** and `(*x).f` is a valid selector expression denoting a field (but **not a method**), x.f is shorthand for (*x).f

## Method expressions

If M is in the method set of type T, `T.M` is a function that is callable as a regular function with the same arguments as M prefixed by an additional argument that is the receiver of the method

```go
MethodExpr    = ReceiverType "." MethodName .
ReceiverType  = Type .
```

```go
type T struct {
	a int
}
func (tv  T) Mv(a int) int         { return 0 }  // value receiver
func (tp *T) Mp(f float32) float32 { return 1 }  // pointer receiver
```

- `T.Mv`: `func(tv T, a int) int`
- `(*T).Mp`: `func(tp *T, f float32) float32`
- `(*T).Mv`: `func(tv *T, a int) int`

## Method values

If the expression x has static type T and M is in the method set of type T, `x.M` is called a **method value**

The expression x is evaluated and saved during the evaluation of the method value; the saved copy is then used as the receiver in any calls

## Index expressions

```go
a[x]
```

For a of map type M:
- if the map is `nil` or does not contain such an entry, `a[x]` is the zero value for the element type of M

## Full slice expressions

```go
a[low : high : max]
```

The indices are in range if `0 <= low <= high <= max <= cap(a)`, otherwise they are out of range

## Calls

As a special case, if the return values of a function or method `g` are equal in number and individually assignable to the parameters of another function or method `f`, then the call `f(g(parameters_of_g))` will invoke f after binding the return values of g to the parameters of f in order. The call of f must contain no parameters other than the call of g, and g must have at least one return value

## Passing arguments to ... parameters

If f is variadic with a final parameter p of type `...T`, then within f the type of p is equivalent to type `[]T`
If f is invoked with no actual arguments for p, the value passed to p is `nil`

If the final argument is assignable to a slice type `[]T` and is followed by `...`, it is passed unchanged as the value for a `...T` parameter

## Instantiations

When using a generic function, type arguments may be provided explicitly, or they **may be partially or completely inferred** from the context in which the function is used

## Integer operators

If the divisor is a constant, it must not be zero. If the divisor is zero at run time, a run-time panic occurs

## Floating-point operators

The result of a floating-point or complex division by zero is not specified beyond the IEEE-754 standard; whether a run-time panic occurs is implementation-specific

## Comparison operators

- String types are comparable and ordered. Two string values are compared lexically byte-wise
- Pointer types are comparable. Two pointer values are equal if they point to the same variable or if both have value nil
- Interface types that are not type parameters are comparable. Two interface values are equal if they have identical dynamic types and equal dynamic values or if both have value nil
- A value x of non-interface type X and a value t of interface type T can be compared if type X is comparable and X implements T. They are equal if t's dynamic type is identical to X and t's dynamic value is equal to x
- Struct types are comparable if all their field types are comparable
- Array types are comparable if their array element types are comparable. Two array values are equal if their corresponding element values are equal

Slice, map, and function types are not comparable. However, as a special case, a slice, map, or function value may be compared to the predeclared identifier nil

## Receive operator

Receiving from a nil channel blocks forever

A receive operation on a closed channel can always proceed immediately, yielding the element type's zero value after any previously sent values have been received

## Conversions

Struct tags are ignored when comparing struct types for identity for the purpose of conversion

Specific rules apply to (non-constant) conversions between numeric types or to and from a string type. These conversions may change the representation of x and incur a run-time cost. All other conversions only change the type but not the representation of x

### Conversions between numeric types

- When converting between integer types, if the value is a signed integer, it is sign extended to implicit infinite precision; otherwise it is zero extended. It is then truncated to fit in the result type's size

### Conversions to and from a string type

- Converting a slice of runes to a string type yields a string that is the concatenation of the individual rune values converted to strings
- Converting a value of a string type to a slice of runes type yields a slice containing the individual Unicode code points of the string
- Finally, for historical reasons, an integer value may be converted to a string type. This form of conversion yields a string containing the (possibly multi-byte) UTF-8 representation of the Unicode code point with the given integer value. Values outside the range of valid Unicode code points are converted to "\uFFFD"

### Conversions from slice to array or array pointer

Converting a slice to an array yields an array containing the elements of the underlying array of the slice. Similarly, converting a slice to an array pointer yields a pointer to the underlying array of the slice. In both cases, if the length of the slice is less than the length of the array, a run-time panic occurs

## Statements

```go
Statement =
	Declaration | LabeledStmt | SimpleStmt |
	GoStmt | ReturnStmt | BreakStmt | ContinueStmt | GotoStmt |
	FallthroughStmt | Block | IfStmt | SwitchStmt | SelectStmt | ForStmt |
	DeferStmt .

SimpleStmt = EmptyStmt | ExpressionStmt | SendStmt | IncDecStmt | Assignment | ShortVarDecl .
```

### Send statements

A send on a closed channel proceeds by causing a run-time panic. A send on a `nil` channel blocks forever

### Switch statements

#### Expression switches

A missing switch expression is equivalent to the boolean value `true`

In a case or default clause, the last non-empty statement may be a (possibly labeled) "`fallthrough`" statement to indicate that control should flow from the end of this clause to the first statement of the next clause

#### Type switches

It is marked by a special switch expression that has the form of a type assertion using the keyword `type` rather than an actual type

```go
switch x.(type) {
// cases
}
```

Instead of a type, a case may use the predeclared identifier nil; that case is selected when the expression in the TypeSwitchGuard is a nil interface value

The "fallthrough" statement is not permitted in a type switch.

### For statements

#### For statements with for clause

Each iteration has its own separate declared variable (or variables) [Go 1.22]. The variable used by the first iteration is declared by the init statement. The variable used by each subsequent iteration is declared implicitly before executing the post statement and initialized to the value of the previous iteration's variable at that moment

#### For statements with range clause

The range expression x is **evaluated once before beginning the loop**

The iteration order over maps is not specified and is not guaranteed to be the same from one iteration to the next. If a map entry that has not yet been reached is **removed during iteration**, the corresponding iteration value will not be produced. If **a map entry is created** during iteration, that entry may be produced during the iteration or may be skipped. The choice may vary for each entry created and from one iteration to the next

The iteration variables may be declared by the "range" clause using a form of short variable declaration (:=). In this case their scope is the block of the "for" statement and each iteration has its **own new variables** [Go 1.22]

## Packages

### Import declarations

```go
ImportDecl       = "import" ( ImportSpec | "(" { ImportSpec ";" } ")" ) .
ImportSpec       = [ "." | PackageName ] ImportPath .
ImportPath       = string_lit .
```

The PackageName is used in qualified identifiers to access exported identifiers of the package within the importing source file. It is declared in the file block. If the **PackageName is omitted**, it defaults to the identifier specified in the package clause of the imported package. If an **explicit period (.)** appears instead of a name, all the package's exported identifiers declared in that package's package block will be declared in the importing source file's file block and must be accessed without a qualifier

## Program initialization and execution

### Package initialization

Within a package, package-level variable initialization proceeds stepwise, with each step selecting the variable earliest in declaration order which has no dependencies on uninitialized variables

The declaration order of variables declared in multiple files is determined by the **order in which the files are presented to the compiler**: Variables declared in the first file are declared before any of the variables declared in the second file, and so on. To ensure reproducible initialization behavior, build systems are encouraged to present multiple files belonging to the same package in lexical file name order to a compiler

Variables may also be initialized using functions named `init` declared in the package block, with no arguments and no result parameters

```go
func init() { … }
```

Multiple such functions may be defined per package, even within a single source file

The entire package is initialized by assigning initial values to all its package-level variables followed by calling all init functions in the order they appear in the source, possibly in multiple files, as presented to the compiler

### Program initialization

The packages of a complete program are initialized stepwise, one package at a time. If a package has imports, the imported packages are initialized before initializing the package itself. If multiple packages import a package, the imported package will be initialized only once

Package initialization—variable initialization and the **invocation of init functions—happens in a single goroutine**, sequentially, one package at a time. An init function may launch other goroutines, which can run concurrently with the initialization code. However, initialization always sequences the init functions: it will not invoke the next one until the previous one has returned

### Program execution

A complete program is created by linking a single, unimported package called the `main` package with all the packages it imports, transitively. The main package must have package name `main` and declare a function `main` that takes no arguments and returns no value

Program execution begins by initializing the program and then invoking the function main in package main. When that function invocation returns, the program exits. It **does not wait for other (non-main) goroutines to complete**

## Run-time panics

Execution errors such as attempting to index an array out of bounds trigger a run-time panic equivalent to a call of the built-in function panic with a value of the implementation-defined interface type `runtime.Error`


