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

- To use TypeScript with JS libraries a typings file needs to exist or be created.  Typically has a naming format of `*.d.ts`

```sh
npm install --save @types/lodash
```

### Linting

- Use `tslint` along with rule configuration in a `tslint.json`
- Can use with Webpack via `tslint-loader`