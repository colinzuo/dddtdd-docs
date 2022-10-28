
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

### tsc, the TypeScript compiler

```bash
npm install -g typescript

tsc hello.ts
```

### Emitting with Errors

`tsc --noEmitOnError hello.ts`

### Downleveling

`tsc --target es2015 hello.ts`

### Strictness

"strict": true in a tsconfig.json toggles them all on simultaneously, but we can opt out of them individually. The two biggest ones you should know about are noImplicitAny and strictNullChecks.

## Everyday Types

The primitives: string, number, and boolean

Arrays, any, Functions

Apart from primitives, the most common sort of type you’ll encounter is an object type.

Object types can also specify that some or all of their properties are optional. To do this, add a ? after the property name

Union Types

Type Aliases

Note that aliases are only aliases - you cannot use type aliases to create different/distinct “versions” of the same type. When you use the alias, it’s exactly as if you had written the aliased type.

```typescript
type ID = number | string;

type UserInputSanitizedString = string;
```

Interfaces

### Differences Between Type Aliases and Interfaces

the key distinction is that a type cannot be re-opened to add new properties vs an interface which is always extendable.

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

### Literal Types

```typescript
let x: "hello" = "hello";
```

### null and undefined

strictNullChecks off/on

```typescript
function liveDangerously(x?: number | null) {
  // No error
  console.log(x!.toFixed());
}
```

## Narrowing

typeof type guards

Truthiness narrowing

### Equality narrowing

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

```typescript
function getArea(shape: Shape) {
  switch (shape.kind) {

    default:
      const _exhaustiveCheck: never = shape;
      return _exhaustiveCheck;    
```

## More on Functions

### Call Signatures

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

### Other Types to Know About

In JavaScript, a function that doesn’t return any value will implicitly return the value undefined. However, void and undefined are not the same thing in TypeScript

object is not Object. Always use object!

The never type represents values which are never observed. In a return type, this means that the function throws an exception or terminates execution of the program.

The global type Function describes properties like bind, call, apply, and others present on all function values in JavaScript.

### Rest Parameters and Arguments

Rest Parameters

```typescript
function multiply(n: number, ...m: number[]) {
  return m.map((x) => n * x);
}
// 'a' gets value [10, 20, 30, 40]
const a = multiply(10, 1, 2, 3, 4);
```

Rest Arguments

```typescript
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
arr1.push(...arr2);
```

### Parameter Destructuring

```typescript
function sum({ a, b, c }: { a: number; b: number; c: number }) {
  console.log(a + b + c);
}
```

## Object Types

### Property Modifiers

```typescript
interface PaintOptions {
  shape: Shape;
  xPos?: number;
  yPos?: number;
}

function paintShape({ shape, xPos = 0, yPos = 0 }: PaintOptions) {
```

In an object destructuring pattern, shape: Shape means “grab the property shape and redefine it locally as a variable named Shape. Likewise xPos: number creates a variable named number whose value is based on the parameter’s xPos

```typescript
function draw({ shape: Shape, xPos: number = 100 /*...*/ }) {
```

readonly Properties

```typescript
interface SomeType {
  readonly prop: string;
}
```

### Index Signatures

An index signature property type must be either ‘string’ or ‘number’.

when indexing with a number, JavaScript will actually convert that to a string before indexing into an object

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

### Tuple Types

A tuple type is another sort of Array type that knows exactly how many elements it contains, and exactly which types it contains at specific positions.

```typescript
type StringNumberPair = [string, number];
```

## Creating Types from Types

### Keyof Type Operator

The keyof operator takes an object type and produces a string or numeric literal union of its keys.

```typescript
type Point = { x: number; y: number };
type P = keyof Point;
```

## Classes

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

### Initialization Order

The order of class initialization, as defined by JavaScript, is:

- The base class fields are initialized
- The base class constructor runs
- The derived class fields are initialized
- The derived class constructor runs

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

In a method or function definition, an initial parameter named this has special meaning in TypeScript. These parameters are erased during compilation

```typescript
// TypeScript input with 'this' parameter
function fn(this: SomeType, x: number) {
  /* ... */
}
```

### Parameter Properties

TypeScript offers special syntax for turning a constructor parameter into a class property with the same name and value. These are called parameter properties and are created by prefixing a constructor argument with one of the visibility modifiers public, private, protected, or readonly

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

In most cases, classes in TypeScript are compared structurally, the same as other types.

## Modules

### How JavaScript Modules are Defined

In TypeScript, just as in ECMAScript 2015, any file containing a top-level import or export is considered a module.

Conversely, a file without any top-level import or export declarations is treated as a script whose contents are available in the global scope (and therefore to modules as well).

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

An import can be renamed using a format like import {old as new}:

```typescript
import { pi as π } from "./maths.js";
```

You can mix and match the above syntax into a single import:

```typescript
import RandomNumberGenerator, { pi as π } from "./maths.js";
```

You can take all of the exported objects and put them into a single namespace using * as name:

```typescript
import * as math from "./maths.js";
```

### CommonJS Syntax

CommonJS is the format which most modules on npm are delivered in

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

TypeScript includes two resolution strategies: Classic and Node. Classic, the default when the compiler option module is not commonjs, is included for backwards compatibility. The Node strategy replicates how Node.js works in CommonJS mode, with additional checks for .ts and .d.ts.

There are many TSConfig flags which influence the module strategy within TypeScript: moduleResolution, baseUrl, paths, rootDirs.

### TypeScript’s Module Output Options

All communication between modules happens via a module loader, the compiler option module determines which one is used. At runtime the module loader is responsible for locating and executing all dependencies of a module before executing it.
