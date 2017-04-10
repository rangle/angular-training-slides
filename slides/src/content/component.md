<!-- .slide: data-background="../content/images/title-slide.jpg" -->

## Building Applications with Angular

# Creating a New Component

---

## Generating a New Component

- We'll use Angular CLI to create a new component
- `ng generate component [component path]`
- Component gets added to the list of declarations
- Generated component follows the same structure as `AppComponent`
- Prefixes `app` on both components. This is an Angular best practice
- Running `ng generate component feature` generates the following file structure:
```
├── src
│   ├── app
│   │   ├── app.component.css
│   │   ├── app.component.html
│   │   ├── app.component.spec.ts
│   │   ├── app.component.ts
│   │   ├── app.module.ts
│   │   └── feature
│   │       ├── feature.component.css
│   │       ├── feature.component.html
│   │       ├── feature.component.spec.ts
│   │       └── feature.component.ts
│   ├── assets
│   ├── environments
│   │   ├── environment.prod.ts
│   │   └── environment.ts
│   ├── favicon.ico
```

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

## What is a directive?

- Works like a `@Component` just without a view (template)
- Attribute directives change or enhance behaviour (`NgClass`, `NgStyle`)
- Structural directives (`*ngIf`, `*ngFor`) are responsible for manipulating a template's layout
  - Any directive with an asterisk

---

## Using ngIf (Structural Directive)

- To render conditionally, Angular provides the built in `*ngIf` directive
- Can be bound to both components and plain HTML

```html
<h1>Using ngIf</h1>
<app-greet *ngIf="true"></app-greet>
```
[View Example](https://plnkr.co/edit/gVYY0CZU2qFvFlFXIB4m?p=preview)

---

## Handling Events

We can bind an expression to any DOM event using the `(event)` syntax. 
In the below example, we are adding the `click` event handler to the button. 
The button invokes the `increment()` method, and increments the `num` property, which is updated in our template through angulars change detection. 

```ts
@Component({
  selector: 'app-counter',
  template: `
    <div>
      <p>Count: {{num}}</p>
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
Angular 2.0 was released on {{ng2ReleaseDate | date:'fullDate'}}
```

[View Example](https://plnkr.co/edit/6dKkWSzX3JdUyKyGjWg1?p=preview)

## Built-in Angular Pipes
 
- [DatePipe](https://angular.io/docs/ts/latest/api/common/index/DatePipe-pipe.html) - Formats dates with configuration options
- [UpperCasePipe](https://angular.io/docs/ts/latest/api/common/index/UpperCasePipe-pipe.html) - Formats a string upper case
- [LowerCasePipe](https://angular.io/docs/ts/latest/api/common/index/LowerCasePipe-pipe.html) - Formats a string to lower case
- [CurrencyPipe](https://angular.io/docs/ts/latest/api/common/index/CurrencyPipe-pipe.html) - Formats a number to a currency based on a locale
- [PercentPipe](https://angular.io/docs/ts/latest/api/common/index/PercentPipe-pipe.html) - Formats numbers as a percentage based on a locale

---

## Generating a Pipe

- Generate using the Angular CLI
- `ng generate pipe [pipe path]`
- Pipe is added to app module declarations

---

## A Look at the Pipe

```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'greet' })
export class GreetPipe implements PipeTransform {
  transform(name: string, title = ''): string {
    return `Hello, ${title} ${name}`;
  }
}
```
[View Example](https://plnkr.co/edit/Jts8wGqIW0gG932sBzMm?p=preview)

- `Pipe` imported from `@angular/core`
- `@Pipe` is a decorator
- `name` property instead of selector
- Pipe name is not prefixed
- Implements the `PipeTransform` interface
- `transform` acceps initial value to pipe followed by all arguments passed
- Returns some value
