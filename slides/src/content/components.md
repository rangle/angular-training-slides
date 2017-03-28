# Components In Depth

---

## Passing Data to a Component (1/2)

The decorator `@Input` can be used to capture data passed from the a component

```ts
@Component({
  selector: 'rio-app',
  template: '<rio-greeter [name]="firstName"></rio-greeter>'
})
export class AppComponent {
  firstName = 'John';
}
```

```ts
@Component({
  selector: 'rio-greeter',
  template: '<p>Hello, {{name}}</p>'
})
export class GreeterComponent {
  @Input() name: string;
}
```

---

## Passing Data to a Component (2/2) - Tips

We can bind an input to an expression or to a string:

```html
<!-- To bind to a variable in the parent scope -->
<rio-greeter [name]="name"></rio-greeter>
<!-- To bind to a raw string -->
<rio-greeter name="Mike"></rio-greeter>
```

We can change the name of the input property:

```ts
@Component({
  selector: 'rio-greeter',
  template: '<p>Hello, {{ firstName }}</p>'
})
export class GreeterComponent {
  @Input('name') firstName: string;
}
```

[View Example](https://plnkr.co/edit/2cOXJj?p=preview)

---

## Responding to DOM Events

We can bind an expression to any DOM event using the `(event)` syntax:

```ts
@Component({
  selector: 'rio-counter',
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

[View Example](https://plnkr.co/edit/ZDBPDJuPjpZq077HAQhu?p=preview)

---

## Creating Custom Events

Use the `@Output` decorator to create custom events to communicate with a parent component

```ts
@Component({
  selector: 'rio-counter',
  template: `
    <div>
      <p>Child Count: {{ count }}</p>
      <button (click)="increment()">Increment</button>
    </div>`
})
export class CounterComponent {
  @Input() count = 0;
  @Output() countChange = new EventEmitter<number>();

  increment(): void {
    this.count++;
    this.countChange.emit(this.count);
  }
}
```

---

## Listening to Custom Events

The parent component can listen to a child custom event with the same syntax as DOM events

```ts
import {Component} from '@angular/core';

@Component({
  selector: 'rio-app',
  template: `
    <p>Parent Count: {{ parentCount }}</p>
    <rio-counter (countChange)="onCountChange($event)"></rio-counter>`
})
export class AppComponent {
  parentCount: number;

  onCountChange(count: number): void {
    this.parentCount = count;
  }
}
```

`$event` is a special argument with the value emitted by the event (custom or DOM)

[View Example](http://plnkr.co/edit/2NwExD?p=preview)

---

## Two-Way Data Binding

- Combination of an `@Input` with an `@Output` using the _banana in a box_ syntax `[(event)]`
- The name of the event has to be equal to the name of the input plus the suffix "Change".

```html
<rio-counter [count]="count" (countChange)="count=$event"></rio-counter>
```

Is equivalent to:

```html
<rio-counter [(count)]="count"></rio-counter>
```

The built-in directive `NgModel` uses this trick to behave similar to Angular 1:

```html
<input [(ngModel)]="name" />
```

Which is equivalent to:

```html
<input [ngModel]="name" (ngModelChange)="name=$event" />
```

---

## Two-Way Data Binding Example

```ts
@Component({ selector: 'rio-counter',  ... })
export class CounterComponent {
  @Input() count: number;
  @Output() countChange = new EventEmitter<number>();

  increment(): void {
    this.count++;
    this.countChange.emit(this.count);
  }
}
```

The parent component can use now the _banana in a box_ syntax

```ts
@Component({
  selector: 'rio-app',
  template:'<rio-counter [(count)]="myNumber"></rio-counter>'
})
class AppComponent { myNumber = 0 }
```

[View Example](http://plnkr.co/edit/nJZQYSV23sCcbb37FzLN?p=preview)

---

## Template Projection

- Ability to pass HTML to a child component and have it rendered there
- This was called _transclusion_ in Angular 1
- Use the built-in component `<ng-content>` to define where to render the projected content

```ts
@Component({
  selector: 'rio-app',
  template: `<rio-child>
               <p>Projected content</p>
             </rio-child>`
})
class AppComponent {}
```

```ts
@Component({
  selector: 'rio-child',
  template: `<h4>Child Component</h4>
             <ng-content></ng-content>`
})
class ChildComponent {}
```

[View Example](http://plnkr.co/edit/oqkyldgOxykReRsffVxZ?p=preview)

---

## Defining Multiple Projection Areas

- Multiple `<ng-content>` tags can be used in a template by using the `select` attribute
- In the template, we can use an HTML tag, say, `<header>` to specify the position of projected content to the `ng-content` with `select="header"`

```
  <!-- Parent Component -->
  <rio-child>
    <header><p>This is my header content</p></header>
    <footer><p>This is my footer content</p></footer>
  </rio-child>`
```

```
  <!-- Child Component -->
  <h4>Child Component</h4>
  <ng-content select="header"></ng-content>
  <ng-content select="footer"></ng-content>
```

[View Example](https://plnkr.co/edit/kwD3iKLU8mELAoHj2fBv?p=preview)

---

## Multiple Projections with Class Selectors

- Besides tags, another option for specifying which `ng-content` tag to use is CSS classes
- This can be done by setting the value of the `select` attribute to a class selector such as `.header-content`
- Wrap the desired content in a `<div>` with the matching CSS class to specify content position

```
  <!-- Parent component -->
  <rio-child>
    <div class="header-content">
      <p>This is my header content</p>
    </div>
    <div class="footer-content">
      <p>This is my footer content</p>
    </div>
  </rio-child>
```

```
  <!-- Child Component -->
  <h4>Child Component</h4>
  <ng-content select=".header-content"></ng-content>
  <ng-content select=".footer-content"></ng-content>
```

[View Example](https://plnkr.co/edit/YQTUGbOxhxZ41iKKpTbV?p=preview)
