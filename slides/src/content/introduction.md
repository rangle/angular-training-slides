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
- `selector` is the way you intend to reference the component. Used like an HTML tag `<app-root></app-root>`
- `template` is what gets rendered onto the page. For web applications, this is HTML
- `styles` are css stylesheets that get applied to your component
- `AppComponent` is a class that decides how the component should act

---

## What is a Component?

- The core building block of an Angular application is the component
- In Angular, a component is some chunk of application logic combined with something that gets displayed
- Everything being displayed on any page should be associated with some component

---

## Component Template Syntax

- `<h1>{{title}}</h1>` represents __interpolation__
- Interpolation attempts to evaluate the expression between the curly braces and turn that into a string
- Symbols (such as title) are evaluated within an expression context, in this case, the component's class members

---

## Generating a New Component

- We'll use Angular CLI to create a new component
- `ng generate [component path]`
- Component gets added to the list of declarations
- Generated component follows the same structure as `AppComponent`
- Prefix `app` on both components. This is an Angular best practice

---

## Integrating a Component

Every component has a selector:

*example.component.ts*
```typescript
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
```typescript
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


---

## Conditional Rendering

- Done using an Angular directive
- Directives are some logic that affects how some chunk of the page is rendered
- To render conditionally, Angular provides the built in `ngIf` directive

---

## Directive Syntax

- Used within a component's template
- Invoked by using a data binding
- `[target]="expression"`
- The __target__ of a data binding is the directive
- The __expression__ in a data binding is a JavaScript expression that produces a value (with some [exceptions](https://angular.io/docs/ts/latest/guide/template-syntax.html#!#template-expressions))

---

## Using ngIf

```html
<h1>Using ngIf</h1>
<app-greet *ngIf="true"></app-greet>
```
[View Example](https://plnkr.co/edit/gVYY0CZU2qFvFlFXIB4m?p=preview)

- Slightly different syntax. Using an asterisk
- Can be bound to components as well as plain HTML

---

## Handling Events

We can bind an expression to any DOM event using the (event) syntax:

```typescript
@Component({
  selector: 'app-counter',
  template: `
    <div>
      <p>Count: {{ num }}</p>
      <button (click)="increment()">Increment</button>
    </div>
    `
})
export class CounterComponent {
  num = 0;

  increment() {
    this.num++;
  }
}
```
[View Example](https://plnkr.co/edit/kMVUxZqcZoF5u7W33pF2?p=preview)

---

## Formatting Output

- An expression can be passed into an Angular pipe. This transforms it into a new value
- Angular has a number of built-in pipes for common use such as `LowerCasePipe` and `DatePipe`

```html
<h2>Search results</h2>
<p>Your search <strong>{{search.term | lowercase}}</strong> had {{search.results}} results.</p>
```
[View Example](https://plnkr.co/edit/HjvjjxmZhpk7VyiycQj5?p=preview)

---

## Passing Arguments to the Pipe

- Pipes also accept arguments
- Are colon delimited sets of values

```html
Angular 2.0 was first released on {{ng2ReleaseDate | date:'fullDate'}}
```
[View Example](https://plnkr.co/edit/6dKkWSzX3JdUyKyGjWg1?p=preview)
