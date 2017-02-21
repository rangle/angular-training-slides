# Introduction to TypeScript

---

## Basics

- Superset of ES6 with addition of typing and type-checking, interfaces, and decorators

```ts
function add(a: number, b: number) {
  return a + b;
}

add(1, 3);   // 4
add(1, '3'); // compiler error before JS is even produced

class Pizza {
  toppings: string[];  // instance properties must be declared
  constructor(toppings: string[]) {
    this.toppings = toppings;
  }
}
```

---

## Configuration

- Configuration can be on command line but more commonly in `tsconfig.json`
- `target` is the compilation target
- `module` is the target module resolution method
- Decorator support in TypeScript hasn't been finalized yet but since Angular uses decorators extensively, these need to be set to true
- Can use with Webpack via `ts-loader`

```js
{
 "compilerOptions": {
    "module": "commonjs",
    "target": "es5",
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "noImplicitAny": false,
    "removeComments": false,
    "sourceMap": true
  },
  "exclude": [
    "node_modules",
    "dist/"
  ]
}
```

---

## Typings and Linting

### Typings

- To use TypeScript with JS libraries a typings file (or set of typings files) needs to exist or be created (typings file are a TypeScript wrapper around a JS library file).  Typically typings have a naming format of `*.d.ts`
- Can install many typings via npm via `@types/library-name`

```sh
npm install --save @types/lodash
```

See [here](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/lodash) for example typings for lodash

### Linting

- Use `tslint` along with rule configuration in a `tslint.json`
- Can use with Webpack via `tslint-loader`

---

## Types

TypeScript supports the standard JavaScript types

- `boolean` (true/false)
- `number` integers, floats, Infinity and NaN
- `string` characters and strings of characters
- `[]` Arrays of other types, like number[] or boolean[]
- `{}` Object literal
- `undefined` not set

It also adds a few new types

- `enum` enumerations like { Red, Blue, Green }
- `any` use any type
- `void` nothing

---

## Types

```ts
let isDone: boolean = false;
let height: number = 6;
let name: string = "bob";
let list: number[] = [1, 2, 3];
let list: Array<number> = [1, 2, 3];
enum Color {Red, Green, Blue};
let c: Color = Color.Green;
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean

function showMessage(data: string): void {
  alert(data);
}
showMessage('hello');
```

In many JavaScript functions it's quite common for functions to take optional parameters. TypeScript provides support for this, like so:

```ts
function logMessage(message: string, isDebug?: boolean) {
  if (isDebug) {
    console.log('Debug: ' + message);
  } else {
    console.log(message);
  }
}
logMessage('hi');         // 'hi'
logMessage('test', true); // 'Debug: test'
```

Using a `?` lets `tsc` know that `isDebug` is an optional parameter. `tsc` will not complain if isDebug is omitted.

---

## Classes

- Classes become their own types
- Instance properties should be declared
- Optional properties can be declared with `?:` syntax

```ts
class Foo { foo: number; }
class Bar { bar: string; }

class Baz { 
  foo: number;
  bar: string;
  constructor(foo: Foo, bar: Bar) { }
}

let baz = new Baz(new Foo(), new Bar()); // valid
baz = new Baz(new Bar(), new Foo());     // tsc errors

lass Person {
  name: string;
  nickName?: string;  // optional property
}
```

---

## Interfaces

- Interfaces define a contract or shape for a function, or objext (no implementation, just signatures)
- No transpiled JS artifact.  It is only used for type-checking by the `tsc` transpiler
- Interfaces can also provide multiple function signatures

```ts
interface Callback {
  (error: Error, data: any): void;
}
function callServer(callback: Callback) {
  callback(null, 'hi');
}
callServer((error, data) => console.log(data));  // 'hi'
callServer('hi');                                // tsc error

interface PrintOutput {
  (message: string): void;    // common case
  (message: string[]): void;  // less common case
}
let printOut: PrintOutput = (message) => {
  if (Array.isArray(message)) {
    console.log(message.join(', '));
  } else {
    console.log(message);
  }
}
printOut('hello');       // 'hello'
printOut(['hi', 'bye']); // 'hi, bye'
```

---

## Interfaces

- The shape of Interfaces is what is important, so Class instances can be fed to Interface types if they have same shape (same attributes and/or methods)
- Classes can implement interfaces with the keyword `implements` (though it isn't absolutely necessary as long as the class shape matches)

```ts
interface Action {
  type: string;
}

let a: Action = {
    type: 'literal'
}

class NotAnAction {
  type: string;
  constructor() {
    this.type = 'Constructor function (class)';
  }
}

a = new NotAnAction(); // valid TypeScript!
```

---

## Type Inference

- Specifying types is optional
- TypeScript will attempt to infer type if it isn't specified
- Type Inference can work through contexts

```ts
let numbers = [2, 3, 5, 7, 11];
numbers = ['this will generate a type error'];
tsc ./type-inference-finds-error.ts 
type-inference-finds-error.ts(2,1): error TS2322: Type 'string[]' is not assignable to type 'number[]'.
  Type 'string' is not assignable to type 'number'.

interface FakeEvent {
  type: string;
}
interface FakeEventHandler {
  (e: FakeEvent): void; 
}
class FakeWindow {
  onMouseDown: FakeEventHandler
}
const fakeWindow = new FakeWindow();

fakeWindow.onMouseDown = (a: number) => {
  // this will fail
};
tsc ./type-inference-finds-error-2.ts 
type-inference-finds-error-2.ts(14,1): error TS2322: Type '(a: number) => void' is not assignable to type 'FakeEventHandler'.
  Types of parameters 'a' and 'e' are incompatible.
    Type 'number' is not assignable to type 'FakeEvent'.
      Property 'type' is missing in type 'Number'.
```

---

## Type keyword, and Union Types

- The `type` keyword defines an alias to a type.  Useful with complex types
- Union types specify a type should be one of a set

```ts
type str = string;
let cheese: str = 'gorgonzola';
let cake: str = 10; // Type 'number' is not assignable to type 'string'
function admitAge (age: number|string): string {
  return `I am ${age}, alright?!`;
}
admitAge(30); // 'I am 30, alright?!'
admitAge('Forty'); // 'I am Forty, alright?!'

type Age = number | string;
function admitAge (age: Age): string {
  return `I am ${age}, alright?!`;
}
let myAge: Age = 50;
let yourAge: Age = 'One Hundred';
admitAge(yourAge); // 'I am One Hundred, alright?!'

type PartyZone = "pizza hut" | "waterpark" | "bowling alley" | "abandoned warehouse";
function goToParty (place: PartyZone): string {
  return `lets go to the ${place}`;
}
goToParty("pizza hut");
goToParty("chuck e. cheese"); // Argument of type `"chuck e. cheese"' is not assignable to parameter of type 'PartyZone'
```

---

## Intersection Types

- Intersection types are the combination of two or more types. Useful for objects and params that need to implement more than one interface.

```ts
interface Kicker {
  kick(speed: number): number;
}

interface Puncher {
  punch(power: number): number;
}
// assign intersection type definition to alias KickPuncher
type KickPuncher = Kicker & Puncher;

function attack (warrior: KickPuncher) {
  warrior.kick(102);
  warrior.punch(412);
  warrior.judoChop(); // Property 'judoChop' does not exist on type 'KickPuncher'
}
```

---

## Function Type Definitions

- Function type annotations can get much more specific than typescripts built-in Function type. Function type definitions allow you to attach a function signature to it's own type.
- The syntax is similar to ES6 fat-arrow functions. `([params]) => [return type]`

```ts
type MaybeError = Error | null;
type Callback = (err: MaybeError, response: Object) => void;

function sendRequest (cb: Callback): void {
  if (cb) {
    cb(null, {});
  }
}
```

- To see how the `type` keyword definitions above simplify code, below is how it would look without

```ts
function sendRequest (cb: (err: Error|null, response: Object) => void): void {
  if (cb) {
    cb(null, {});
  }
}
```

---

## Decorators

- Decorators are proposed for a future version of ECMAScript but are an experimental feature of TypeScript
- They are functions with a prefixed `@` symbol and immediately followed by a Class, parameter, method, or property
- Decorator acts on target (following Class, parameter, method, or property) and replaces with modified form.  It is called at runtime
- Decorator can be simple (function returning value) or factories (function returning function)

```ts
// simple, used as @sealed 
function sealed(target) {
    // do something with 'target' ...
}
// factory used as @color(value: string)
function color(value: string) { // this is the decorator factory
    return function (target) { // this is the decorator
        // do something with 'target' using 'value'...
    }
}
```

---

## Property Decorator Examples

- A factory and a simple decorator example below

```ts
function Override(label: string) {
  return function (target: any, key: string) {
    Object.defineProperty(target, key, { 
      configurable: false,
      get: () => label
    });
  }
}
class Test {
  @Override('test')      // invokes Override, which returns the decorator
  name: string = 'pat';
}
let t = new Test();
console.log(t.name);  // 'test'

function ReadOnly(target: any, key: string) {
  Object.defineProperty(target, key, { writable: false });
}
class Test {
  @ReadOnly             // notice there are no `()`
  name: string;
}
const t = new Test();
t.name = 'jan';         
console.log(t.name); // 'undefined'
```

---

## Class Decorator Example

- The decorator function takes a class as an argument. The decorator function then returns a new class construction function that is used whenever the decorated class is instantiated.
- This decorator does nothing other than log out its given parameter, and its target's class name to the console.

```ts
function log(prefix?: string) {
  return (target) => {
    var original = target; // save a reference to the original constructor
    // a utility function to generate instances of a class
    function construct(constructor, args) {
      var c: any = function () {
        return constructor.apply(this, args);
      }
      c.prototype = constructor.prototype;
      return new c();
    }
    // the new constructor behavior
    var f: any = function (...args) {
      console.log(prefix + original.name);
      return construct(original, args);
    }  
    f.prototype = original.prototype; // copy prototype so instanceof operator still works
    return f; // return new constructor (will override original)
  };
}

@log('hello')
class World {}
const w = new World(); // outputs "helloWorld"
```

---

## Parameter Decorator Example

- Example demonstrating method parameter decoration

```ts
function logPosition(target: any, propertyKey: string, parameterIndex: number) {
  console.log(parameterIndex);
}

class Cow {
  say(b: string, @logPosition c: boolean) {
    console.log(b);
  }
}

new Cow().say('hello', false); // outputs 1 (newline) hello
```