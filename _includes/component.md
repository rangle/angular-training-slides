<!-- .slide: data-background="../images/title-slide.jpg" -->
<!-- .slide: id="components" -->
## Building Applications with Angular

# Creating a New Component

---
<!-- .slide: id="components-roadmap" -->
## Roadmap

1. How do I create a new component?
1. How does Angular name components?
1. How do I include a component in my display?
1. How do I pass data to a component?

---
<!-- .slide: id="components-generating-new-components" -->
## Generating a New Component

- Use Angular CLI to create a new component to display the list
  - But keep the data in `app.component.ts`
- `ng generate component toDoList`
  - `ng generate` can be run from any folder within the project
- Creates `src/app/to-do-list/*`
```
├── src
│   ├── app
│   │   └── to-do-list
│   │       ├── to-do-list.component.css
│   │       ├── to-do-list.component.html
│   │       ├── to-do-list.component.spec.ts
│   │       └── to-do-list.component.ts
```

---
<!-- .slide: id="components-conventions" -->
## Conventions

- Component class name is `ToDoListComponent`
- HTML selector is `app-to-do-list`
  - `app` prefix to prevent namespace collisions
    - Prefix can be customized when creating the application using `--prefix`
    - Or by modifying the `prefix` property in `.angular-cli.json`
- What to put in constructor and `ngOnInit` will be discussed later

#### _src/app/to-do-list/to-do-list.component.ts_
```
@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
```

---
<!-- .slide: id="components-including" -->

## Including a Component

- Refer to the component by putting its `selector` in another component's template

#### _src/app/app.component.html_
```html
<h1>{{title}}</h1>
<p>Summary: {{summary()}}</p>
<p *ngFor="let item of thingsToDo; let i = index" id="{{i}}">({{i}}) {{item}}</p>
<p *ngIf="thingsCompleted.length == 0">Nothing completed</p>
```

![Child Component (Original)](../images/screenshot-child-initial.png)

---
<!-- .slide: id="components-passing-data-1" -->
## Passing Data to a Component

- Need to:
  1. Create a variable in the child to receive the value
  1. Use `@Input()` decorator to identify the variable

#### _src/app/to-do-list/to-do-list.component.ts_
```ts
import { Component, OnInit, Input } from '@angular/core';

@Component({
  // ...as before...
})
export class ToDoListComponent implements OnInit {

  @Input() heading: string;

  // ...as before...
}
```

Reminder: Angular decorators are functions.
Even if you don't pass arguments, you need the parentheses.

---
<!-- .slide: id="components-passing-data-2" -->

## Passing Data to a Component

- And then pass data from the parent
  - Just like a function call

#### _src/app/app.component.html_
```html
<h1>{{title}}</h1>
<p *ngFor="let item of thingsToDo; let i = index" id="{{i}}">({{i}}) {{item}}</p>
<app-to-do-list [heading]="Things To Do"></app-to-do-list>
```

- Whoops: compiler error!

#### _src/app/app.component.html_ (corrected)
```html
<app-to-do-list [heading]="'Things To Do'"></app-to-do-list>
```

- Must single-quote the string or Angular will think it's a function.

---
<!-- .slide: id="components-passing-data-3" -->

## Passing Data to a Component

- Angular also has a shorthand for passing string properties to components:

```html
<app-to-do-list heading="Things To Do"></app-to-do-list>
```

Passing strings to components in this way resembles setting properties in HTML elements.

---
<!-- .slide: id="components-refactoring-1" -->

## Refactoring

- Pass a variable instead of a constant string
- While we're at it, remove the heading from the child component
- And use a proper list instead of a bunch of paragraphs

#### _src/app/app.component.html_
```html
<h1>{{title}}</h1>
<app-to-do-list [thingsToDo]="thingsToDo"></app-to-do-list>
```

- `[thingsToDo]` on the *left* is the input parameter in the child
- `thingsToDo` on the *right* is what we're passing in

---
<!-- .slide: id="components-refactoring-2" -->

## Refactoring

- Move the loop over the list into the child component's HTML

#### _src/app/to-do-list/to-do-list.component.html_
```html
<ul>
  <li *ngFor="let item of thingsToDo; let i = index" id="{{i}}">{{item}}</li>
</ul>
```

- Create the required variable in the child component class

#### _src/app/to-do-list/to-do-list.component.ts_
```ts
export class ToDoListComponent implements OnInit {

  @Input() thingsToDo: string[];

  // ...as before...
}
```

---
<!-- .slide: id="components-refactoring-3" -->

## Refactoring

![After Refactoring](../images/screenshot-refactored.png)

- More elaborate than necessary if we were stopping here...
- ...but absolutely necessary to control complexity in large projects

---
<!-- .slide: id="components-quiz-1" -->
<!-- .slide: data-background="../images/question-slide.jpg" -->

## Quiz

What is the best way for a child component to receive data passed to
it from a parent component?

1. A member decorated with `@Output`.

2. A shared variable protected by a lock.

3. A member decorated with `@Input`.

+++
<!-- .slide: data-background="../images/answer-slide.jpg" -->

## Answer

Correct answer is 3.

1: This answer may expose confusion between the directionality of
inputs and outputs.

2: This answer may indicate that the learner is thinking of active
components in a multi-threaded system.

---
<!-- .slide: id="components-quiz-2" -->
## Question

Given the following, what text would be rendered to the screen?

```ts
@Component({
  selector: 'parent',
  template: `
    <div>Parent: {{ message }}</div>
    <child message="Greetings"></child>
  `
})
export class Parent {
  @Input() message: string;
}

@Component({
  selector: 'child',
  template: `<div>Child: {{ message }}</div>`
})
export class Child {
  @Input() message: string;
}
```

---
<!-- .slide: id="components-quiz-3" -->
<!-- .slide: data-background="../images/question-slide.jpg" -->

## Quiz (continued)

1. Parent:<br>
   Child: Greetings

2. Parent: Greetings<br>
   Child: Greetings

3. Parent: Greetings<br>
   Child:

+++
<!-- .slide: data-background="../images/answer-slide.jpg" -->

## Answer

Correct answer is 1.

2: May expose confusion in the what `message="Greeting"` is actually
doing. It does not imply a "global" member assignment, and values are
not "inherited" or otherwise made available to child components
implicitly.

3: May expose a confusion in the directionality of the
`message="Greeting"` assignment. In this case the parent is passing
the string "Greeting" down into the child component, not the other way
around.

---
<!-- .slide: id="components-quiz-4" -->
<!-- .slide: data-background="../images/question-slide.jpg" -->

## Quiz

How can an object reference be passed down into a child component
input called `data` from the parent's template?

1. `[data]="myData"`

2. `data="myData"`

3. `(data)="myData"`

4. `[data]="{{myData}}"`

+++
<!-- .slide: data-background="../images/answer-slide.jpg" -->

## Answer

Correct answer is 1.

2: May expose confusion between the differences in `[]` notation, and
passing data as a string.

3: May expose confusion between the differences between input `[]`
notation and output/event `()` notation.

4: May expose confusion with what interpolation is/does and not
understanding that it's not required here.

---
<!-- .slide: id="components-quiz-5" -->
<!-- .slide: data-background="../images/question-slide.jpg" -->

## Quiz

Given the following component and usage, what would be rendered to the screen?

```ts
@Component({
  selector: 'hal',
  template: `<div>{{ message }}</div>`
})
export class Hal9000 {
  @Input() message: string;
}
```

```html
<hal [message]="'Hello, Dave. You're looking well today'"></hal>
```

1. `[object Object]`
2. Nothing, the words/grammar are not valid class members.
3. Hello, Dave. You're looking well today
4. None: An error will be thrown because Angular can't parse the message as an object.

+++
<!-- .slide: data-background="../images/answer-slide.jpg" -->

## Answer

Correct answer is 3.

1, 2: This may expose confusion in that we're required to pass in a
reference to a class member (or that we can pass multiple class
members in at once) whereas `[]` notation really means we're
evaluating an expression which can actually be anything.

4: If no single quotes (`'`) were used this would be the case, however
`[]` notation will evaluate the passed value as an expression (in the
context of the component). In this case, `[message]` will evaluate to
a string;
