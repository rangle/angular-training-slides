# Components In Angular 2

- The core concept of any Angular 2 application is the component.
- In effect, the whole application can be modeled as a tree of these components.
- A component controls a patch of screen real estate that we could call a view, and declares reusable UI building blocks for an application.

---

## Passing Data into a Component

- The inputs attribute defines a set of parameters that can be passed down from the component's parent
- For example, we can modify the Hello component so that name can be configured by the parent

```ts
@Component({
  selector: 'hello',
  template: '<p>Hello, {{name}}</p>'
})
export class Hello {
  @Input() name: string;
}
```

---

#### Passing Data into a Component con't...

- The point of making components is encapsulation and reusability
- Inputs allow us to configure a particular component instance

```html
<!-- To bind to a raw string -->
<hello name="World"></hello>
<!-- To bind to a variable in the parent scope -->
<hello [name]="name"></hello>
```

---

## Responding to Component Events

- Events in Angular 2 work similar to how they worked in Angular 1.x. The big change is template syntax.

```ts
@Component({
  selector: 'counter',
  template: `
    <div>
      <p>Count: {{ num }}</p>
      <button (click)="increment()">Increment</button>
    </div>
    `
})
export class Counter {
  num: number = 0;

  increment() {
    this.num++;
  }
}
```

---

#### Component Events con't...

- To send data out start by defining the outputs attribute. 
- Outputs ccepts a list of output parameters exposed to its parent.

```ts
@Component({
  selector: 'counter',
  template: `
    <div>
      <p>Count: {{ count }}</p>
      <button (click)="increment()">Increment</button>
    </div>
  `
})
export class Counter {
  @Input() count: number = 0;
  @Output() result: EventEmitter = new EventEmitter();

  increment() {
    this.count++;
    this.result.emit(this.count);
  }
}
```

---

## Using Two-Way Data Binding

- Two-way data binding combines the input and output binding into a single notation using the ngModel directive.


```ts
<input [(ngModel)]="name" >

<!--Behind the scenes, the code above is equivalent to: -->

<input [ngModel]="name" (ngModelChange)="name=$event">
```

---

- To create your own component that supports two-way binding, you must define an @Output property to match an @Input, but suffix it with the Change, for example:

```ts
@Component({/*....*/})
export default class Counter {
  @Input() count: number = 0;
  @Output() countChange: EventEmitter<number> = new EventEmitter<number>();

  increment() {
    this.count++;
    this.countChange.emit(this.count);
  }
}

@Component({
  template:'<counter [(count)]="myNumber"></counter>'
  directives:[Counter]
})
class SomeComponent {/*....*/}
```

---

## Access Child Components From the template

- In our templates, we may find ourselves needing to access values provided by the child components which we use to build our own component.

- The most straightforward examples of this may be seen dealing with forms or inputs: app/my-example.component.html

```ts
<section >
  <form #myForm="ngForm" (ngSubmit)="submitForm(myForm)">
    <label for="name">Name</label>
    <input type="text" name="name" id="name" ngModel>
    <button type="submit">Submit</button>
  </form>
</section>
```

```ts
@Component({
  selector: 'my-example',
  templateUrl: 'app/my-example.component.html'
})
export class MyExampleComponent {
  submitForm (form: NgForm) {
    console.log(form.value);
  }
}
```

---

## Projection

- Components by default support projection. You can use the ngContent directive to place the projected content in your template.

```ts
@Component({
  selector: 'child',
  template: `
    <h4>Child Component</h4>
    <ng-content></ng-content>
  `
})
class Child {}
```

---

## Structuring Applications with Components

As the complexity and size of our application grows, we want to divide responsibilities among our components further.

- Smart / Container components are application-specific, higher-level, container components, with access to the application's domain model.

- Dumb / Presentational components are components responsible for UI rendering and/or behavior of specific entities passed in via components API (i.e component properties and events). Those components are more in-line with the upcoming Web Component standards.

---

## Using Other Components

- Components depend on other components, directives and pipes. For example, TodoList relies on TodoItem. To let a component know about these dependencies we group them into a module.

- The property declarations expects an array of components, directives and pipes that are part of the module.

```ts
import {NgModule} from '@angular/core';
import {TodoInput} from './components/todo-input';
import {TodoItem} from './components/todo-item';
import {TodoList} from './components/todo-list';

@NgModule({
  imports: [ ... ],
  declarations: [ TodoList, TodoItem, TodoInput ],
  bootstrap: [ ... ]
})
export class ToDoAppModule { }
```

---

### Basic Component Exercise

- Create two custom child components of this one
- Use at least one *ngIf
- Use at least one *ngFor
- Respond to a user action
- Ensure there is no state on the component

See next slide for solution example

---

```ts
const hw: string = 'hello world';
```