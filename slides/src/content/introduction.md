# Angular Training

# Rangle.io

---

## About Me

---

## Structure

- 8 hours training in 2 days
- 5 min break around 2:00 pm
- 10 min break around 3:00 pm
- 5 min break around 4:00 pm
- Q&A sessions

---

## Syllabus

1. Introduction
1. Introduction to ES6/ES2015
1. Introduction to TypeScript
1. Introduction to Observables
1. Creating a hello world application
1. Components In Depth
1. Directives
1. Pipes
1. Services
1. Miscellaneous Topics
1. Forms
1. Routing
1. Unit Testing

---

# Introduction

---

## What Makes Angular Good?

- Modular architecture
- Better performance than Angular 1:
  - Improved Change detection
  - Ahead of Time compiler
- It's made to scale:
  - Modules
  - Dependency Injection (that makes sense)
  - Typescript and tooling
  - Supporting projects: CLI, Universal, Nativescript
- A complete and opinionated solution
- You don't need to be a Javascript expert
- Can be integrated with Redux


---

## Getting Set Up

1. Install NVM (Node Version Manager) -- [nvm.sh](http://nvm.sh)
1. Install the latest LTS version of node -- `nvm install --lts`
1. Install Angular CLI -- `npm install --global @angular/cli`

---

## Creating a New Project

`ng create [project-name]`

This will:

- Install Angular
- Install node dependencies
- Create scaffolding

---

## Project Structure

- `package.json` -- project metadata
- `node_modules` -- libraries and dependencies used by our application
- `src` folder -- application code
- `tsconfig.json` -- TypeScript configuration

---

## TypeScript

- TypeScript is exactly like JavaScript, but with types
- Has ES6 and ES7 features
- Compiles to JavaScript before being run in the browser
- No runtime support for types

---

## First Look at the Component

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<h1>{{title}}</h1>',
  styles: ['h1 { color: font-size: 30px; }']
})
export class AppComponent {
  title = 'app works!';
}
```

- Import statement gives you access to Angular components
- `@Component` is a decorator function that tells Angular this class is a component
- `selector` is the way you reference a component. Used like an HTML tag `<app-root></app-root>`
- `template` is what gets rendered onto the page. For web applications, this is HTML
- `styles` are css stylesheets that get applied to your component
- `AppComponent` is a class that decides how the component should act

---

## Generating a New Component

- We'll use Angular CLI to create a new component
- `ng generate [component path]`
- Component gets added to the list of declarations
- Generated component follows the same structure as `AppComponent`
- Prefix `app` on both components. This is an Angular best practice

---

## Integrating a Component

Every component has a selector


*example.component.ts*
```
@Component({
	selector: 'app-example',
	template: '<p>Multiple component example</p>'
})
export class ExampleComponent { }
```

---

## Integrating a Component

Use selector as an HTML tag within another component's template


*app.component.ts*
```
@Component({
	selector: 'app-root',
	template: `
	  <h1>My Angular App</h1>
	  <app-example></app-example>
	`
})
export class AppComponent { }
```
[View Example](https://plnkr.co/edit/CMGx2TLUdPcL0D4tvGI9?p=preview)
