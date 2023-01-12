
<https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html>

## TypeScript for the New Programmer

### Syntax

TypeScript is a language that is a superset of JavaScript: JS syntax is therefore legal TS.

### Runtime Behavior

TypeScript is also a programming language that preserves the runtime behavior of JavaScript

## TypeScript for JavaScript Programmers

### Types by Inference

```typescript
let helloWorld = "Hello World";
```

### Defining Types

```typescript
interface User {
  name: string;
  id: number;
}

const user: User = {
  name: "Hayes",
  id: 0,
};
```

### Composing Types

```typescript
type MyBool = true | false;

type WindowStates = "open" | "closed" | "minimized";

function getLength(obj: string | string[]) {
  return obj.length;
}

string	typeof s === "string"
number	typeof n === "number"
boolean	typeof b === "boolean"
undefined	typeof undefined === "undefined"
function	typeof f === "function"
array	Array.isArray(a)
```

### Generics

```typescript
type StringArray = Array<string>;
type NumberArray = Array<number>;
type ObjectWithNameArray = Array<{ name: string }>;

interface Backpack<Type> {
  add: (obj: Type) => void;
  get: () => Type;
}
```

### Structural Type System

One of TypeScript’s core principles is that type checking focuses on the shape that values have. This is sometimes called “duck typing” or “structural typing”.

## The Basics

JavaScript only truly provides **dynamic typing** - running the code to see what happens.

### tsc, the TypeScript compiler

```bash
npm install -g typescript

tsc hello.ts
```

### Emitting with Errors

`tsc --noEmitOnError hello.ts`

### Downleveling

By default TypeScript targets **ES3**, an extremely old version of ECMAScript. We could have chosen something a little bit more recent by using the **target option**

`tsc --target es2015 hello.ts`

### Strictness

TypeScript has **several type-checking strictness flags** that can be turned on or off

**"strict": true** in a tsconfig.json toggles them **all on simultaneously**, but we can opt out of them individually. The two biggest ones you should know about are noImplicitAny and strictNullChecks.

- noImplicitAny: TypeScript doesn’t try to infer types for us and instead falls back to the most lenient type: any
- strictNullChecks: By default, values like null and undefined are assignable to any other type

## Everyday Types

The primitives: string, number, and boolean

JavaScript does not have a special runtime value for integers, so there’s **no equivalent to int or float - everything is simply number**

Arrays, any, Functions

Apart from primitives, the most common sort of type you’ll encounter is an object type.

Object types can also specify that some or all of their properties are optional. To do this, add a **? after the property name**

Union Types

A union type is a type formed from two or more other types, representing values that may be **any one of those types**

Type Aliases

A type alias is a name for any type

Note that aliases are only aliases - you cannot use type aliases to create different/distinct “versions” of the same type. When you use the alias, it’s **exactly as if you had written the aliased type.**

```typescript
type ID = number | string;

type UserInputSanitizedString = string;
```

Interfaces

Being concerned only with the structure and capabilities of types is why we call TypeScript a **structurally typed type system.**

### Differences Between Type Aliases and Interfaces

the key distinction is that a type cannot be re-opened to add new properties vs **an interface which is always extendable**.

```typescript
interface Window {
  title: string
}

interface Window {
  ts: TypeScriptAPI
}
```

### Type Assertions

```typescript
const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;
```

Sometimes this rule can be too conservative and will disallow more complex coercions that might be valid. If this happens, you can use two assertions

```ts
const a = (expr as any) as T;
```

### Literal Types

by combining literals into unions, you can express a much more useful concept - for example, functions that only accept a certain set of known values

```typescript
function printText(s: string, alignment: "left" | "right" | "center") {
  // ...
}
```

The type boolean itself is actually just an alias for the union true | false

You can change the inference by adding a type assertion in either location

```ts
// Change 1:
const req = { url: "https://example.com", method: "GET" as "GET" };
// Change 2
handleRequest(req.url, req.method as "GET");
```

You can use as const to convert the entire object to be type literals

```ts
const req = { url: "https://example.com", method: "GET" } as const;
handleRequest(req.url, req.method);
```

### null and undefined

**strictNullChecks** off/on

```typescript
function liveDangerously(x?: number | null) {
  // No error
  console.log(x!.toFixed());
}
```

### enums

Unlike most TypeScript features, this is **not a type-level addition to JavaScript but something added to the language and runtime**

## Narrowing

typeof type guards

Within our if check, TypeScript sees **typeof padding === "number"** and understands that as a special form of code called a **type guard**

It looks at these special checks (called type guards) and assignments, and the process of **refining types to more specific types than declared is called narrowing**

in JavaScript, typeof null is actually "object"

Truthiness narrowing

In JavaScript, constructs like if first **“coerce” their conditions to booleans** to make sense of them

You can always coerce values to booleans by running them through the Boolean function, or by using the shorter double-Boolean negation

### Equality narrowing

checking whether something == null actually not only checks whether it is specifically the value null - it also checks whether it’s potentially undefined

```typescript
function example(x: string | number, y: string | boolean) {
  if (x === y) {
```

### The in operator narrowing

```typescript
type Fish = { swim: () => void };
type Bird = { fly: () => void };
 
function move(animal: Fish | Bird) {
  if ("swim" in animal) {
    return animal.swim();
  }
 
  return animal.fly();
}
```

### instanceof narrowing

in JavaScript x instanceof Foo checks whether the prototype chain of x contains Foo.prototype

```typescript
function logValue(x: Date | string) {
  if (x instanceof Date) {
    console.log(x.toUTCString());
```

### Using type predicates

To define a **user-defined type guard**, we simply need to define a function whose return type is a type predicate

A predicate takes the form **parameterName is Type**, where parameterName must be the name of a parameter from the current function signature

```ts
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}
```

### Discriminated unions

```typescript
interface Circle {
  kind: "circle";
  radius: number;
}
 
interface Square {
  kind: "square";
  sideLength: number;
}
 
type Shape = Circle | Square;

function getArea(shape: Shape) {
  if (shape.kind === "circle") {
    return Math.PI * shape.radius ** 2;
```

### The never type

The never type is assignable to every type; however, no type is assignable to never (except never itself)

```typescript
function getArea(shape: Shape) {
  switch (shape.kind) {

    default:
      const _exhaustiveCheck: never = shape;
      return _exhaustiveCheck;    
```

## More on Functions

### Call Signatures

In JavaScript, functions can have properties in addition to being callable

If we want to describe something callable with properties, we can write a call signature in an object type

```typescript
type DescribableFunction = {
  description: string;
  (someArg: number): boolean;
};
function doSomething(fn: DescribableFunction) {
  console.log(fn.description + " returned " + fn(6));
}
```

### Construct Signatures

You can write a **construct signature by adding the new keyword** in front of a call signature

Some objects, like JavaScript’s Date object, can be called with or without new. You can combine call and construct signatures in the same type arbitrarily

```typescript
type SomeConstructor = {
  new (s: string): SomeObject;
};
function fn(ctor: SomeConstructor) {
  return new ctor("hello");
}

interface CallOrConstruct {
  new (s: string): Date;
  (n?: number): number;
}
```

### Generic Functions

generics are all about relating two or more values with the same type

```typescript
function firstElement<Type>(arr: Type[]): Type | undefined {
  return arr[0];
}
```

### Optional Parameters

```typescript
function f(x?: number) {
```

### Function Overloads

In TypeScript, we can specify a function that can be called in different ways by writing **overload signatures**

Functions have an **implementation signature**, but this signature can’t be called directly

Always prefer parameters with union types instead of overloads when possible

```typescript
function makeDate(timestamp: number): Date;
function makeDate(m: number, d: number, y: number): Date;
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
  if (d !== undefined && y !== undefined) {
    return new Date(y, mOrTimestamp, d);
  } else {
    return new Date(mOrTimestamp);
  }
}
```

### Declaring this in a Function

The JavaScript specification states that you cannot have a parameter called this, and so TypeScript uses that syntax space to let you declare the type for this in the function body

```ts
interface DB {
  filterUsers(filter: (this: User) => boolean): User[];
}
 
const db = getDB();
const admins = db.filterUsers(function (this: User) {
  return this.admin;
});
```

### Other Types to Know About

In JavaScript, a function that doesn’t return any value will implicitly return the value undefined. However, **void and undefined are not the same thing in TypeScript**

object is not Object. Always use object!

unknown: The unknown type represents any value. This is similar to the any type, but is safer because it’s not legal to do anything with an unknown value

The never type represents values which are never observed. In a return type, this means that the function throws an exception or terminates execution of the program.

never also appears when TypeScript determines there’s nothing left in a union

The global type Function describes properties like bind, call, apply, and others present on all function values in JavaScript.

values of type Function can always be called; these calls return any

### Rest Parameters and Arguments

A rest parameter appears after all other parameters, and uses the ... syntax

```typescript
function multiply(n: number, ...m: number[]) {
  return m.map((x) => n * x);
}
// 'a' gets value [10, 20, 30, 40]
const a = multiply(10, 1, 2, 3, 4);
```

Note that in general, TypeScript does not assume that arrays are immutable

```ts
// Inferred type is number[] -- "an array with zero or more numbers",
// not specifically two numbers
const args = [8, 5];
const angle = Math.atan2(...args);
```

The best fix for this situation depends a bit on your code, but in general a const context is the most straightforward solution

```ts
// Inferred as 2-length tuple
const args = [8, 5] as const;
// OK
const angle = Math.atan2(...args);
```

### Parameter Destructuring

The type annotation for the object goes after the destructuring syntax

```typescript
function sum({ a, b, c }: { a: number; b: number; c: number }) {
  console.log(a + b + c);
}
```

### Return type void

a contextual function type with a void return type `(type vf = () => void)`, when implemented, **can return any other value, but it will be ignored**

## Object Types

### Property Modifiers

- optional

```typescript
interface PaintOptions {
  shape: Shape;
  xPos?: number;
  yPos?: number;
}

function paintShape({ shape, xPos = 0, yPos = 0 }: PaintOptions) {
```

In an object destructuring pattern, `shape: Shape` means “grab the property shape and redefine it locally as a variable named Shape. Likewise `xPos: number` creates a variable named number whose value is based on the parameter’s xPos

```typescript
function draw({ shape: Shape, xPos: number = 100 /*...*/ }) {
```

- readonly Properties

```typescript
interface SomeType {
  readonly prop: string;
}
```

### Index Signatures

Sometimes you don’t know all the names of a type’s properties ahead of time, but you do know the **shape of the values**

Only some types are allowed for index signature properties: string, number, symbol, template string patterns, and union types consisting only of these

when indexing with a number, JavaScript will actually **convert that to a string before indexing into an object**

```typescript
interface StringArray {
  [index: number]: string;
}
```

properties of different types are acceptable if the index signature is a union of the property types

```typescript
interface NumberOrStringDictionary {
  [index: string]: number | string;
  length: number; // ok, length is a number
  name: string; // ok, name is a string
}
```

### Extending Types

```typescript
interface BasicAddress {
  name?: string;
  street: string;
  city: string;
  country: string;
  postalCode: string;
}
 
interface AddressWithUnit extends BasicAddress {
  unit: string;
}
```

### Intersection Types

intersection types that is mainly used to combine existing object types

```ts
interface Colorful {
  color: string;
}
interface Circle {
  radius: number;
}
 
type ColorfulCircle = Colorful & Circle;
```

### Tuple Types

A tuple type is another sort of Array type that knows **exactly how many elements it contains, and exactly which types it contains at specific positions**

Like ReadonlyArray, it has no representation at runtime, but is significant to TypeScript.

```typescript
type StringNumberPair = [string, number];
```

## Classes

Just as in JavaScript, if you have a base class, you’ll need to call `super()`; in your constructor body **before using any this. members**

Note that inside a method body, it is still **mandatory** to access fields and other methods via `this.`

```typescript
class Point {
  readonly name: string = "world";

  x: number;
  y: number;
 
  // Normal signature with defaults
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  scale(n: number): void {
    this.x *= n;
    this.y *= n;
  }
}
```

### Getters / Setters

```typescript
class C {
  _length = 0;
  get length() {
    return this._length;
  }
  set length(value) {
    this._length = value;
  }
}
```

### implements Clauses

You can use an implements clause to check that a class satisfies a particular interface

```typescript
interface Pingable {
  ping(): void;
}
 
class Sonar implements Pingable {
  ping() {
    console.log("ping!");
  }
}
```

### extends Clauses

```typescript
class Animal {
  move() {
    console.log("Moving along!");
  }
}
 
class Dog extends Animal {
  woof(times: number) {
    for (let i = 0; i < times; i++) {
      console.log("woof!");
    }
  }
}
```

### Overriding Methods

A derived class can also override a base class field or property. You can use the `super.` syntax to access base class methods

```typescript
class Derived extends Base {
  greet(name?: string) {
    if (name === undefined) {
      super.greet();
    } else {
      console.log(`Hello, ${name.toUpperCase()}`);
    }
  }
}
```

### Type-only Field Declarations

When `target >= ES2022 or useDefineForClassFields is true`, class fields are initialized after the parent class constructor completes, overwriting any value set by the parent class

### Initialization Order

The order of class initialization, as defined by JavaScript, is:

- The base class fields are initialized
- The base class constructor runs
- The derived class fields are initialized
- The derived class constructor runs

### visibility 

Unlike TypeScripts’s private, JavaScript’s private fields (#) remain private after compilation and do not provide the previously mentioned escape hatches like bracket notation access, making them hard private.

### Static Members

```typescript
class MyClass {
  static x = 0;
  static printX() {
    console.log(MyClass.x);
  }
}
```

### static Blocks in Classes

```typescript
class Foo {
    static #count = 0;
 
    get count() {
        return Foo.#count;
    }
 
    static {
        try {
            const lastInstances = loadLastInstances();
            Foo.#count += lastInstances.length;
        }
        catch {}
    }
}
```

### this parameters

In a method or function definition, an **initial parameter named this** has special meaning in TypeScript. These parameters are erased during compilation

```typescript
// TypeScript input with 'this' parameter
function fn(this: SomeType, x: number) {
  /* ... */
}
```

### this based type guards

```ts
class FileSystemObject {
  isFile(): this is FileRep {
    return this instanceof FileRep;
  }
  isDirectory(): this is Directory {
    return this instanceof Directory;
  }
  isNetworked(): this is Networked & this {
    return this.networked;
  }
  constructor(public path: string, private networked: boolean) {}
}
```

### Parameter Properties

TypeScript offers special syntax for **turning a constructor parameter into a class property with the same name and value**. These are called **parameter properties** and are created by prefixing a constructor argument with one of the visibility modifiers `public, private, protected, or readonly`

```typescript
class Params {
  constructor(
    public readonly x: number,
    protected y: number,
    private z: number
  ) {
    // No body necessary
  }
}
```

### Relationships Between Classes

In most cases, classes in TypeScript are **compared structurally**, the same as other types.

## Modules

### How JavaScript Modules are Defined

In TypeScript, just as in ECMAScript 2015, **any file containing a top-level import or export is considered a module**

Conversely, a file without any top-level import or export declarations is treated as a **script whose contents are available in the global scope** (and therefore to modules as well).

Modules are executed within their own scope, not in the global scope. 

### ES Module Syntax

A file can declare a main export via export default

```typescript
// @filename: hello.ts
export default function helloWorld() {
  console.log("Hello, world!");
}

import helloWorld from "./hello.js";
helloWorld();
```

### Additional Import Syntax

An import can be renamed using a format like `import {old as new}`

```typescript
import { pi as π } from "./maths.js";
```

You can mix and match the above syntax into a single import:

```typescript
import RandomNumberGenerator, { pi as π } from "./maths.js";
```

You can take all of the exported objects and put them into a single namespace using `* as name`:

```typescript
import * as math from "./maths.js";
```

You can import a file and not include any variables into your current module via `import "./file"`

### TypeScript Specific ES Module Syntax

`import type`

```ts
import type { Cat, Dog } from "./animal";

import { createCatName, type Cat, type Dog } from "./animal";
```

### CommonJS Syntax

CommonJS is the format which **most modules on npm** are delivered in

Identifiers are exported via setting the exports property on a global called module.

```typescript
function absolute(num: number) {
  if (num < 0) return num * -1;
  return num;
}
 
module.exports = {
  pi: 3.14,
  squareTwo: 1.41,
  phi: 1.61,
  absolute,
};
```

Then these files can be imported via a require statement:

```typescript
const maths = require("maths");
maths.pi;
```

### TypeScript’s Module Resolution Options

**Module resolution is** the process of taking a string from the import or require statement, and determining what file that string refers to

TypeScript includes two resolution strategies: **Classic and Node**. Classic, the default when the compiler option module is not commonjs, is included for backwards compatibility. **The Node strategy replicates how Node.js works in CommonJS mode**, with additional checks for .ts and .d.ts.

There are many TSConfig flags which influence the module strategy within TypeScript: moduleResolution, baseUrl, paths, rootDirs.

### TypeScript’s Module Output Options

All communication between modules happens via a module loader, the compiler option module determines which one is used. At runtime the module loader is responsible for locating and executing all dependencies of a module before executing it.
