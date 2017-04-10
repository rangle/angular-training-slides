<!-- .slide: data-background="../content/images/title-slide.jpg" -->

## Building Applications with Angular

# Handling Events

---

## Handling Events

- Bind an expression to any DOM event using `(event)="action"` in a tag
- `event` is what to handle
- `action` is what to do
  - Almost always a method call

---

## Adding Items to the List

- Create a button
- Have its `click` event call `addToDo` with a fixed string

_src/app/to-do-list/to-do-list.component.html_
```html
<ul>
  <li *ngFor="let item of thingsToDo; let i = index" id="{{i}}">{{item}}</li>
</ul>
<p><button (click)="addToDo('make coffee')">make coffee</button></p>
```

---

## Adding Items to the List

- Create the corresponding method in the component class

_src/app/to-do-list/to-do-list.component.ts_
```ts
export class ToDoListComponent implements OnInit {
  …as before…

  addToDo(text: string) {
    this.thingsToDo.push(text);
  }
}
```

![Adding Items With a Button](content/images/screenshot-add-constant.png)

---

## Adding Specific Items

- Add an `input` field
- Create a local variable *in the template* to hold its value using `#newItem`
  - `newItem` is *not* a member of the component class
- Modify the method call to pass that variable

_src/app/to-do-list/to-do-list.component.html_
```html
…as before…
<p>
  <input #newItem placeholder="item"/>
  <button (click)="addToDo(newItem)">+</button>
</p>
```

---

## Adding Specific Items

- Fill in the input field
- Click the button

![Adding an Element (Mistaken)](content/images/screenshot-add-element.png)

- Oops

---

## Adding Specific Items (Fixed)

- `newItem` is a whole object, not just the text
- use `text.value` in `addToDo`
  - and then clear it to empty out the input box


_src/app/to-do-list/to-do-list.component.ts_
```ts
export class ToDoListComponent implements OnInit {
  …as before…

  addToDo(text: HTMLInputElement) {
    this.thingsToDo.push(text.value);
    text.value = '';
  }
}
```

---

## Making a Reusable Component

- A text input with a button feels like something we could re-use
- Want to have:
  - Button with user-specified label
  - Text input field
  - *Some way to get the data into the parent*
- Have the component emit events
- Angular presents them in the same way as built-in events like `click`

---

## Create the Component Skeleton

- `ng generate component genericInput`
- Creates `src/app/generic-input/*`

---

## Move the HTML

_src/app/to-do-list/to-do-list.component.html_
```html
<ul>
  <li *ngFor="let item of thingsToDo; let i = index" id="{{i}}">{{item}}</li>
</ul>
<app-generic-input></app-generic-input>
```

_src/app/generic-input/generic-input.component.html_
```html
<p>
  <input #newItem placeholder="item"/>
  <button (click)="addToDo(newItem)">+</button>
</p>
```

---

## Move the Method

- Remove `addToDo` from `ToDoListComponent`
- Put it in `GenericInputComponent`

_src/app/generic-input/generic-input.component.ts_
```ts
export class GenericInputComponent implements OnInit {
  …as before…
  addToDo(text: HTMLInputElement) {
    this.thingsToDo.push(text.value);
    text.value = '';
  }
}
```

- Causes a compilation error because `GenericInputComponent` doesn't have `thingsToDo`

---

## Create an Event Emitter

_src/app/generic-input/generic-input.component.ts_
```ts
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  …as before…
})
export class GenericInputComponent implements OnInit {

  @Output() newItem: EventEmitter<string> = new EventEmitter();

  …constructor and ngOnInit as before…

  addToDo(text: HTMLInputElement) {
    this.newItem.emit(text.value);
    text.value = '';
  }
}
```

---

## A What?

- `EventEmitter` can send things to anyone who's listening
- Class is *generic*
  - Must provide an actual type for events as in `EventEmitter<string>`
- `GenericInputComponent` is now emitting events, but nobody is listening

---

## Refactor the Main Application

1. Move `<app-generic-input>` to `app.component.html`
   - I.e., make input and display siblings instead of nesting
   - Saves us one level of indirection
1. Add an event handler in `app.component.html`
   - Name is the name of the `@Output` member variable in `GenericInputComponent`

_src/app/app.component.html_
```html
<h1>{{title}}</h1>
<app-to-do-list [thingsToDo]="thingsToDo"></app-to-do-list>
<app-generic-input (newItem)="onNewItem($event)"></app-generic-input>
```

- `$event` is a built-in variable representing the event
  - In our case, a string

---

## Connect the Wires

_src/app/app.component.ts_
```ts
export class AppComponent {

  title = 'To Do';
  thingsToDo = [
    'Learn JavaScript',
    'Learn Angular',
    'Learn Redux'
  ];

  onNewItem(item: string) {
    this.thingsToDo.push(item);
  }
}
```

- No other changes needed

---

## Final Appearance

![Connecting the Wires](content/images/screenshot-handling-event.png)

FIXME: diagram showing data flow
