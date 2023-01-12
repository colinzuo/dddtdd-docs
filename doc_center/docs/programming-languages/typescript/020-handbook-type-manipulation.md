## Creating Types from Types

we actually have a **wide variety of type operators** available to use. It’s also possible to **express types in terms of values** that we already have

## Generics

### Generic Constraints

```ts
interface Lengthwise {
  length: number;
}
 
function loggingIdentity<Type extends Lengthwise>(arg: Type): Type {
  console.log(arg.length); // Now we know it has a .length property, so no more error
  return arg;
}
```

### Using Type Parameters in Generic Constraints

```ts
function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key];
}
```

### Using Class Types in Generics

```ts
function createInstance<A extends Animal>(c: new () => A): A {
  return new c();
}
```

## Keyof Type Operator

The `keyof` operator takes an object type and produces a string or numeric literal union of its keys.

```typescript
type Point = { x: number; y: number };
type P = keyof Point;
```

If the type has a **string or number index signature**, `keyof` will return those types instead

JavaScript object keys are **always coerced to a string**, so `obj[0]` is always the same as `obj["0"]`

```ts
type Arrayish = { [n: number]: unknown };
type A = keyof Arrayish;
    
type A = number
 
type Mapish = { [k: string]: boolean };
type M = keyof Mapish;
    
type M = string | number
```

## Typeof Type Operator

TypeScript adds a typeof operator you can use in a **type context** to refer to the type of a variable or property

Remember that values and types aren’t the same thing. To refer to the type that the value f has, we use `typeof`

```ts
function f() {
  return { x: 10, y: 3 };
}
type P = ReturnType<typeof f>;
    
type P = {
    x: number;
    y: number;
}
```

## Indexed Access Types

The indexing type is itself a type, so we can use unions, keyof, or other types entirely

```ts
type Person = { age: number; name: string; alive: boolean };

type I1 = Person["age" | "name"];
     
type I1 = string | number
 
type I2 = Person[keyof Person];
     
type I2 = string | number | boolean
 
type AliveOrName = "alive" | "name";
type I3 = Person[AliveOrName];
     
type I3 = string | boolean
```

Another example of indexing with an arbitrary type is **using number to get the type of an array’s elements**. We can combine this with typeof to conveniently **capture the element type of an array literal**

```ts
const MyArray = [
  { name: "Alice", age: 15 },
  { name: "Bob", age: 23 },
  { name: "Eve", age: 38 },
];
 
type Person = typeof MyArray[number];
       
type Person = {
    name: string;
    age: number;
}
```

## Conditional Types

Conditional types help describe the relation between the types of inputs and outputs

the power of conditional types comes from using them with generics

```ts
type MessageOf<T> = T extends { message: unknown } ? T["message"] : never;
 
interface Email {
  message: string;
}
 
interface Dog {
  bark(): void;
}
 
type EmailMessageContents = MessageOf<Email>;
              
type EmailMessageContents = string
 
type DogMessageContents = MessageOf<Dog>;
             
type DogMessageContents = never
```

Conditional types provide us with a way to **infer from types** we compare against in the true branch using the `infer` keyword

```ts
type Flatten<Type> = Type extends Array<infer Item> ? Item : Type;
```

When inferring from a type with multiple call signatures (such as the type of an overloaded function), **inferences are made from the last signature**

### Distributive Conditional Types

```ts
type ToArray<Type> = Type extends any ? Type[] : never;
 
type StrArrOrNumArr = ToArray<string | number>;
           
type StrArrOrNumArr = string[] | number[]
```

Typically, distributivity is the desired behavior. To **avoid that behavior, you can surround each side of the extends keyword with square brackets**

```ts
type ToArrayNonDist<Type> = [Type] extends [any] ? Type[] : never;
 
// 'StrArrOrNumArr' is no longer a union.
type StrArrOrNumArr = ToArrayNonDist<string | number>;
           
type StrArrOrNumArr = (string | number)[]
```

## Mapped Types

Mapped types: sometimes a type needs to be based on another type

A mapped type is a generic type which uses a union of PropertyKeys (frequently created via a keyof) to iterate through keys to create a type

```ts
type OptionsFlags<Type> = {
  [Property in keyof Type]: boolean;
};

type FeatureFlags = {
  darkMode: () => void;
  newUserProfile: () => void;
};
 
type FeatureOptions = OptionsFlags<FeatureFlags>;
           
type FeatureOptions = {
    darkMode: boolean;
    newUserProfile: boolean;
}
```

### Mapping Modifiers

You can remove or add these modifiers by prefixing with **- or +**. If you don’t add a prefix, then + is assumed

```ts
// Removes 'readonly' attributes from a type's properties
type CreateMutable<Type> = {
  -readonly [Property in keyof Type]: Type[Property];
};

// Removes 'optional' attributes from a type's properties
type Concrete<Type> = {
  [Property in keyof Type]-?: Type[Property];
};
```

### Key Remapping via as

```ts
type Getters<Type> = {
    [Property in keyof Type as `get${Capitalize<string & Property>}`]: () => Type[Property]
};
 
interface Person {
    name: string;
    age: number;
    location: string;
}
 
type LazyPerson = Getters<Person>;
         
type LazyPerson = {
    getName: () => string;
    getAge: () => number;
    getLocation: () => string;
}
```

You can filter out keys by **producing never** via a conditional type

```ts
// Remove the 'kind' property
type RemoveKindField<Type> = {
    [Property in keyof Type as Exclude<Property, "kind">]: Type[Property]
};

interface Circle {
    kind: "circle";
    radius: number;
}
 
type KindlessCircle = RemoveKindField<Circle>;
           
type KindlessCircle = {
    radius: number;
}
```

You can map over arbitrary unions, not just unions of `string | number | symbol`, but unions of any type

```ts
type EventConfig<Events extends { kind: string }> = {
    [E in Events as E["kind"]]: (event: E) => void;
}

type SquareEvent = { kind: "square", x: number, y: number };
type CircleEvent = { kind: "circle", radius: number };
 
type Config = EventConfig<SquareEvent | CircleEvent>
       
type Config = {
    square: (event: SquareEvent) => void;
    circle: (event: CircleEvent) => void;
}
```

## Template Literal Types

```ts
type EmailLocaleIDs = "welcome_email" | "email_heading";
type FooterLocaleIDs = "footer_title" | "footer_sendoff";
 
type AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`;
          
type AllLocaleIDs = "welcome_email_id" | "email_heading_id" | "footer_title_id" | "footer_sendoff_id"
```

### String Unions in Types

The **power in template literals** comes when defining a new string based on information inside a type

```ts
type PropEventSource<Type> = {
    on(eventName: `${string & keyof Type}Changed`, callback: (newValue: any) => void): void;
};
 
/// Create a "watched object" with an 'on' method
/// so that you can watch for changes to properties.
declare function makeWatchedObject<Type>(obj: Type): Type & PropEventSource<Type>;
```

### Inference with Template Literals

```ts
type PropEventSource<Type> = {
    on<Key extends string & keyof Type>
        (eventName: `${Key}Changed`, callback: (newValue: Type[Key]) => void ): void;
};
 
declare function makeWatchedObject<Type>(obj: Type): Type & PropEventSource<Type>;
```
