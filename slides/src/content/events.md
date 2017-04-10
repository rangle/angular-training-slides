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
