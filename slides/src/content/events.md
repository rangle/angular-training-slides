<!-- .slide: data-background="../content/images/title-slide.jpg" -->

## Building Applications with Angular

# Handling Events

---

## Roadmap

1. How do I handle events?
1. How do I handle inputs?
1. How do I make a reusable component?
1. How do child components send data to their parents?

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

- `$event` is a special Angular variable that represents the value *emitted* by the captured *event*
  - In our case, the user-inputted string

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

---

## Quiz

Which of the following is invalid syntax for handling an event?

1. `<message (messageSent)="onMessageSent($event)"></message>`

2. `<message (messageSent)="onMessageSent(message)"></message>`

3. `<message (messageSent)="sent"></message>`

4. `<message (messageSent)="sent=$event"></message>`

+++

## Answer

Correct answer is 3.

1: Values emitted are exposed via the `$event` variable.

2: This answer may expose a misunderstanding that values referenced as
callback arguments are class members.

3: Not choosing this answer may expose confusion in terms of inputs
vs. outputs, and/or two-way bound `[()]` properties.

4: This answer may expose a misunderstanding that values passed into
outputs must be callbacks. In reality, they are simply expressions
which also have special handling for callback syntax

---

## Quiz

What is the difference between:

(A) `<counter [count]="count()"></counter>`

(B) `<counter (count)="count()"></counter>`

1. None.

2. (A) passes the result of calling `this.count()` into the `<counter>` component via an input.
   (B) calls `this.count()` whenever the `<counter>` component emits a value through its own `EventEmitter` member `count`.

3. (A) calls `this.count()` whenever the `<counter>` component emits a value through its own `EventEmitter` member `count`.
   (B) passes the resulting value of calling `this.count()` into the `<counter>` component via an input.

4. (A) emits a value from the parent into the `<counter>` component from an `EventEmitter` member called `count`.
   (B) assigns values emitted from the `<counter>` component to `this.count`.

+++

## Answer

Correct answer is 2.

1, 3, 4: This answer may expose a misunderstanding of the input `[]`
output `()` paradigm and what the syntax represents.

---

## Question

Given the following components, which message will be logged to the console when `child`'s button is clicked?

```ts
@Component({
  selector: 'parent',
  template: '<child (messageSent)="handleMessageSent($event)"></child>'
})
export class Parent {
  @Output() messageSent = new EventEmitter();
  message = 'I am the parent';
  handleMessageSent() { console.log(this.message); }
}

@Component({
  selector: 'child',
  template: '<button (click)="sendMessage()">Click me</button>'
})
export class Child {
  @Output() messageSent = new EventEmitter();
  message = 'I am the child';
  handleMessageSent() { console.log(this.message); }
  sendMessage() { this.messageSent.emit(true); }
}
```

---

## Quiz (continued)

1. I am the child

2. I am the parent
   I am the child

3. I am the child
   I am the parent

4. I am the parent

+++

## Answer

Correct answer is 4.

1: This answer may expose confusion between which component actually
handles the event.

2,3: This answer may expose a misunderstanding that both child and
parent components are able to listen to the custom event, and thus
both log their messages.
