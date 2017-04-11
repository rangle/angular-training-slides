<!-- .slide: data-background="../content/images/title-slide.jpg" -->

## Building Applications with Angular

# Creating a New Component

---

## Roadmap

1. How do I create a new component?
1. How does Angular name components?
1. How do I include a component in my display?
1. How do I pass data to a component?

---

## Generating a New Component

- Use Angular CLI to create a new component to display the list
  - But keep the data in `app.component.ts`
- `ng generate component toDoList`
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

## Conventions

- Component class name is `ToDoListComponent`
- HTML selector is `app-to-do-list`
  - `app` prefix to prevent namespace collisions
- What to put in constructor and `ngOnInit` will be discussed later

_src/app/to-do-list/to-do-list.component.ts_
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

## Including a Component

- Refer to component by putting its selector tag in something else's HTML
  - Remove the completed list and summary to make things fit on the slide

_src/app/app.component.html_
```html
<h1>{{title}}</h1>
<p *ngFor="let item of thingsToDo; let i = index" id="{{i}}">({{i}}) {{item}}</p>
<app-to-do-list></app-to-do-list>
```

![Child Component (Original)](content/images/screenshot-child-initial.png)

---

## Passing Data to a Component

- Need to:
  1. Create a variable in the child to receive the value
  1. Use `@Input()` decorator to identify the variable

_src/app/to-do-list/to-do-list.component.ts_
```ts
import { Component, OnInit, Input } from '@angular/core';

@Component({
  …as before…
})
export class ToDoListComponent implements OnInit {

  @Input() heading: string;

  …as before…
}
```

---

## Passing Data to a Component

- And then pass data from the parent
  - Just like a function call

_src/app/app.component.html_
```html
<h1>{{title}}</h1>
<p *ngFor="let item of thingsToDo; let i = index" id="{{i}}">({{i}}) {{item}}</p>
<app-to-do-list [heading]="Things To Do"></app-to-do-list>
```

- Whoops: compiler error!

_src/app/app.component.html_ (with error)
```html
<app-to-do-list [heading]="'Things To Do'"></app-to-do-list>
```

- Have to quote the value inside the double quotes or Angular will try to evaluate it

---

## Refactoring

- Pass a variable instead of a constant string
- While we're at it, remove the heading from the child component
- And use a proper list instead of a bunch of paragraphs

_src/app/app.component.html_
```html
<h1>{{title}}</h1>
<app-to-do-list [thingsToDo]="thingsToDo"></app-to-do-list>
```

- `[thingsToDo]` on the *left* is the input parameter in the child
- `thingsToDo` on the *right* is what we're passing in

---

## Refactoring

- Move the loop over the list into the child component's HTML

_src/app/to-do-list/to-do-list.component.html_
```html
<ul>
  <li *ngFor="let item of thingsToDo; let i = index" id="{{i}}">{{item}}</li>
</ul>
```

- Create the required variable in the child component class

_src/app/to-do-list/to-do-list.component.ts_
```ts
export class ToDoListComponent implements OnInit {

  @Input() thingsToDo: string[];

  …as before…
}
```

---

## Refactoring

![After Refactoring](content/images/screenshot-refactored.png)

- More elaborate than necessary if we were stopping here…
- …but absolutely necessary to control complexity in large projects
