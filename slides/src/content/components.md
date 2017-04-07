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

## Quiz

Choose all of the following that are needed to make two-way data binding work.

1. `@Input` decorator
2. `@Output` decorator
3. `[]` attribute (as in `[hello]="hello!"`)
4. `()`attribute (as in `(click)=sayHi()`)

<aside class="notes">

Selecting ALL of them is correct.

If the student picks either 3 or 4, it could be that the student forgot that
the "banana in a box" syntax `[()]` is in fact combination of `[]` and `()`

</aside>

---

## Creating a Template Variable from a Native Element

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

## Creating a Template Variable from a Component

We can create references to components and access public properties/methods

```ts
@Component({ selector: 'rio-child', template: '<span>{{ message }}</span>' })
export class ChildComponent {
  message = 'Child Component';
}
```

```ts
@Component({
  selector: 'rio-app',
  template: `<rio-child #child></rio-child>
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

## Creating a Template Variable from a Directive

- We can create template variables from directives using the `#myVariable="exportedAsValue"` syntax
- `exportedAs` value is a property that every built-in directive has to create a reference
- The value of the property `exportedAs` of the directive `NgForm` is `ngForm` ([docs](https://angular.io/docs/ts/latest/api/forms/index/NgForm-directive.html))

```ts
@Component({
  selector: 'rio-app',
  template: `
    <form #myForm="ngForm" (ngSubmit)="submitForm(myForm)">
      <label>Name: <input name="name" ngModel></label>
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

[View Example](https://plnkr.co/edit/ttVaCf?p=preview)

Notes:

- The value of the property `exportedAs` of the directive `NgForm` is `ngForm`
- The enhanced component instance has validation, the native `form` component doesn't

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

---

## Quiz

If I want to write a custom UI Component for my project,
which field of the `@NgModule` decorator should I put the class in?

1.  `bootstrap`
1.  `declarations`
1.  `interfaces`
1.  None of the above.

<aside class="notes">

Correct answer is "declarations".

</aside>

---

## Quiz

`@Input` is used to:

1. Pass data into another component
2. Capture data passed from another component
3. Display an HTML `<input>` element

<aside class="notes">

1. student is confused between @Input and @Output
2. correct answer
3. student is confused between a template and a decorator

</aside>

---

## Quiz

Which are the correct ways for binding variables to an Angular form?

1. `<input name="firstName" [ngModel]="firstName">`
2. `<input name="firstName" (ngModel)="firstName">`
3. `<input name="firstName" [(ngModel)]="fistName">`

<aside class="notes">

1. correct
2. student is confused with parens vs brackets data binding
3. correct

</aside>
