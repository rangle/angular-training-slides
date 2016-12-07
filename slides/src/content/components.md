# Components In Depth

---

## Passing Data to a Component (1/2)

The decorator `@Input` can be used to capture data passed from the a component

```ts
@Component({
  selector: 'rio-app',
  template: '<rio-greeter [name]="name"></rio-greeter>'
})
export class AppComponent {
  name = 'John';
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

<img src="content/images/down_arrow_trans.png" alt="down-arrow" style="height: 50px; width: 50px;"/>

+++

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
@Component({ ... })
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
  template:'<counter [(count)]="myNumber"></counter>'
})
class AppComponent {
  myNumber = 0;
}
```

<img src="content/images/down_arrow_trans.png" alt="down-arrow" style="height: 50px; width: 50px;"/>

+++

[View Example](http://plnkr.co/edit/nJZQYSV23sCcbb37FzLN?p=preview)

---

## Template Variables (1/3) - Native DOM

We can create references to native DOM elements in our template using the special syntax `#myReference`

```ts
@Component({
  selector: 'rio-app',
  template: `
    <label>Name: </label>
    <input #nameInput />
    <button (click)="getInputValue(nameInput.value)">Print Name</button>
    <span>Value: {{ name }}</span>`
})
export class AppComponent {
  name = 'N/D';
  
  getInputValue(value: string): void {
    this.name = value;
  }
}
```

[View Example](https://plnkr.co/edit/uQJZH2?p=preview)

---

## Template Variables (2/3) - Component

We can create references to components and access public properties/methods

```ts
@Component({
  selector: 'rio-child',
  template: '<span>{{ message }}</span>'
})
export class ChildComponent {
  message = 'Child Component';
}
```

<img src="content/images/down_arrow_trans.png" alt="down-arrow" style="height: 50px; width: 50px;"/>

+++

```ts
@Component({
  selector: 'rio-app',
  template: `
    <rio-child #child></rio-child>
    <button (click)="getPublicProperty(child)">Get Component</button>
    <p>Value: {{ publicProperty }}</p>`
})
export class AppComponent {
  publicProperty = '';
  getPublicProperty(child: ChildComponent): void {
    this.publicProperty = child.message;
  }
}
```

[View Example](https://plnkr.co/edit/GZb6Tr?p=preview)

---

## Template Variables (3/3) - Directive

- Because directives enhance components (or DOM elements), we can create a template variable for the original component or the enhanced one (component + directive)
- To create a reference of the enhanced component, we need to know the value of the property `exportedAs` of the directive

```ts
@Component({
  selector: 'rio-app',
  template: `
    <form #myForm="ngForm" (ngSubmit)="submitForm(myForm)">
      <label for="name">Name</label>
      <input name="name" id="name" ngModel>
      <button type="submit">Submit</button>
    </form>
    <pre>{{ values | json }}</pre>`
})
export class AppComponent {
  values: any;
  submitForm (form: NgForm): void {
    this.values = form.value;
  }
}
```    

<img src="content/images/down_arrow_trans.png" alt="down-arrow" style="height: 50px; width: 50px;"/>

+++

[View Example](https://plnkr.co/edit/ttVaCf?p=preview)

Notes:

- The value of the property `exportedAs` of the directive `NgForm` is `ngForm`
- The enhanced component instance has validation, the native `form` component doesn't

---

## Template Projection

- Ability to pass HTML to a child component and have it rendered there
- This was called _transclusion_ in Angular 1
- We need to use the built-in component `<ng-content>` to inform the component where to render the projected content

```ts
@Component({
  selector: 'rio-app',
  template: `
    <rio-child>
      <p>Projected content</p>
    </rio-child>`
})
class AppComponent {}
```

<img src="content/images/down_arrow_trans.png" alt="down-arrow" style="height: 50px; width: 50px;"/>

+++

```ts
@Component({
  selector: 'rio-child',
  template: `
    <h4>Child Component</h4>
    <ng-content></ng-content>`
})
class ChildComponent {}
```

[View Example](http://plnkr.co/edit/oqkyldgOxykReRsffVxZ?p=preview)

---

## Smart vs Dumb Components

Components can be classified as "smart" or "dumb" depending on how coupled are they to the application


| Characteristic          | Smart Component      | Dumb Component            |
| ----------------------- | -------------------- | ------------------------- |
| Coupled to the app?     | Yes                  | No                        |
| Reusable?               | No                   | Yes                       |
| Aware of the state?     | Yes                  | No                        |
| Component tree location | Top                  | Bottom                    |
| Easy to test?           | No                   | Yes                       |
| A.K.A                   | Container Components | Presentational Components |
