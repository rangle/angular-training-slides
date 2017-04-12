<!-- .slide: data-background="../content/images/title-slide.jpg" -->

## Building Applications with Angular

# Separating Forms into Logical Sections

---

## Roadmap

1. How can I break a form into sub-forms?

---

## Separating Forms into Logical Sections

- Dividing large forms into sections makes it easier to track validation issues
  - Allows us to query individual groups to narrow down invalid controls
- Also useful for creating a form from a schema
- To group the sections, we need to use `FormGroup`
  - Which means using reactive forms
- We can create nested `FormGroup`s within other `FormGroup`s

---

## Start With a Model

- We want to turn this data structure into an Angular form

```ts
{
  "responsible": {
    "name": "Zuko",
    "email": "zuko@fire.org"
  },
  "task": {
    "text": "...",
    "estimate": "3:00"
  }
}
```

---

## Converting to Code

- Turn the logical structure into a class
- Create a new component for this using `ng generate component structuredForm`
- Add variables to represent the parts of the form

_src/app/structured-form/structured-form.component.ts_
```ts
export class StructuredFormComponent implements OnInit {
  mainForm: FormGroup;

  responsible: FormGroup;
  name: FormControl;
  email: FormControl;

  task: FormGroup;
  text: FormControl;
  estimate: FormControl;
}
```

---

## Building the Form

- Inject `FormBuilder` via our constructor

_src/app/structured-form/structured-form.component.ts_
```ts
export class StructuredFormComponent implements OnInit {
  …as before…

constructor(
    private builder: FormBuilder
  ) {
  }
}
```

---

## Building the Form

- Use helper methods to create each form group's controls

_src/app/structured-form/structured-form.component.ts_
```ts
export class StructuredFormComponent implements OnInit {
  …as before…

  createResponsibleFormFields() {
    this.name = new FormControl('Zuko', [Validators.required]);
    this.email = new FormControl('zuko@fire.org', [Validators.required]);

    this.responsible = this.builder.group({
      name: this.name,
      email: this.email
    });
  }
}
```

- The other group is built the same way

---

## Building the Form

- Add the sub-groups to the main form once they have been created

_src/app/structured-form/structured-form.component.ts_
```ts
export class StructuredFormComponent implements OnInit {

  constructor(
    private builder: FormBuilder
  ) {
    this.createResponsibleFormFields();
    this.createTaskFormFields();

    this.mainForm = this.builder.group({
      responsible: this.responsible,
      task: this.task
    });
  }
}
```

<!-- preview: http://plnkr.co/edit/rJ576V7ncL0Fjm3T7zpt?p=preview -->

---

## Using the Form

_src/app/structured-form/structured-form.html_
```html
<form [formGroup]="mainForm">

  <div class="panel panel-default" formGroupName="responsible">
    <p>
      Name:
      <input class="form-control" type="text" name="name" id="name" [formControl]="name">
    </p>
    <p>
      Email:
      <input class="form-control" type="input" name="email" id="email" [formControl]="email">
    </p>
  </div>

  …task form group goes here…

  <button type="submit" (click)="addToDo()">Add</button>
</form>
```

---

## Wire It Up

- Throw away most of the data for now…

_src/app/structured-form/structured-form.component.ts_
```ts
export class StructuredFormComponent implements OnInit {

  @Output() newItem: EventEmitter<string> = new EventEmitter();

  addToDo() {
    this.newItem.emit(this.text.value);
  }
}
```

_src/app/app.component.html_
```html
<h1>{{title}}</h1>
<app-to-do-list [thingsToDo]="thingsToDo"></app-to-do-list>
<app-structured-form (newItem)="onNewItem($event)"></app-structured-form>
```

---

## Appearance

![Form With Groups](content/images/screenshot-grouped-form.png)

---

## ShortCuts

- Our component can also use shortcuts to create a `FormControl`

```ts
createResponsibleFormFields() {
  this.responsible = this.builder.group({
    name: new FormControl('Zuko', [Validators.required]),
    email: new FormControl('zuko@fire.org', [Validators.required])
  });
}
```
