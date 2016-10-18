# TDD Testing

---

## The Testing Toolchain

Our testing toolchain will consist of the following tools:

- Jasmine - most popular testing framework in the Angular community
- Karma - controls the execution of our tests
- PhantomJS - a headless DOM instance
- Istanbul - generates coverage reports
- Sinon - provides spies, stubs and mocks
- Chai - assertion library with syntactic sugar

---

## Test Setup

---

## Filename Conventions

We will put our test scripts alongside the files they are testing, adding `.spec` to the filename to mark it as a test.

```sh
.
├── src
│   ├── app
│   │   ├── foo.component.ts
│   │   ├── foo.component.spec.ts
│   │   └── ...
│   └── ...
└── ...
```

You can put test scripts anywhere you like, but keeping them close to your source files makes them easier to find.

---

## Typings

In order to use write tests in TypeScript, we need TypeScript type definitions for Chai and Jasmine. We can include these type definitions from `@types` with npm.

```npm install @types/jasmine @types/assertion-error```

---

## Executing Test Scripts

To run our tests we run Karma from the command line. Karma should be installed globally.

```sh
npm install karma -g
karma start
```

This will set up the testing environment and run through each unit test, as well as run any reporters we've configured.

A good practice is to amalgamate all the project's task/build commands through npm. In `package.json`:

```
...
"scripts": {
    "test": "karma start",
    ...
}
...
```
