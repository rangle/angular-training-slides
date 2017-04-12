<!-- .slide: data-background="../content/images/title-slide.jpg" -->

## Building Applications with Angular

# Reactive Forms

---

## Roadmap

1. How do reactive forms differ from template driven forms?
1. How do I create a reactive form?
1. How do I validate a reactive form?
1. How can I create my own validators?

---

## Overview (again)

- Template Driven Forms: controls and validation rules defined in the template with directives
- Reactive Forms: controls and validation rules defined in the component class or service
  - Binding a form to a model
  - Also known as model driven forms
- Reactive forms can handle controls directly within the component
  - Push data to the controls and pull values as they change
- Do *not* use `ngModel` and `required` in the template
 - Define the validation and model as part of our component

---

## Creating Reactive Forms

- Import `ReactiveFormsModule` from `@angular/forms` into `app.module.ts`

_src/app/app.module.ts_
```ts
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    …
  ],
  imports: [
    …
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

---

## Declaring a Reactive Form

- Reactive Forms are declared using the `FormBuilder` service
- `FormControl` tracks the value, state and validity of a form control
- `FormGroup` tracks the group and validity state of a group of FormControls
- Use the `FormBuilder` service to create `FormGroup` and `FormControl` instances
- We will rebuild our `GenericInputComponent` to use these
  - Will get compilation errors until modifications complete

---

## Declaring a Reactive Form

_src/app/generic-input/generic-input.component.ts_
```ts
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

export class GenericInputComponent implements OnInit {

  @Output() newItem: EventEmitter<string> = new EventEmitter();
  textEntryForm: FormGroup;
  textEntryControl: FormControl;

  constructor(
    private builder: FormBuilder
  ) {
    this.textEntryControl = new FormControl('', []);
    this.textEntryForm = builder.group({
      textEntry: this.textEntryControl
    });
  }
}
```

---

## Modifying the View

```html
<form [formGroup]="textEntryForm" (ngSubmit)="addToDo()">
  <p>
    Item: <input [formControl]="textEntryControl">
    <button type="submit">Add</button>
  </p>
</form>
```

- Unlike template driven forms, we do not use `required` or `ngModel`
- Also not creating any template variables

---

## Validating Reactive Forms

- Angular provides `required`, `maxLength`, `minLength`, and `pattern` validators
- Validators produce errors which can be checked by calling `hasError` on the `FormControl`

_src/app/generic-input/generic-input.components.ts_
```ts
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

export class GenericInputComponent {
  constructor(…) {
    this.textEntryControl = new FormControl('', [Validators.minLength(5)]);
    …
  }
}
```

---

## Validating Reactive Forms

- Now use the validator in the form's HTML

```html
<ul [hidden]="textEntryControl.valid || textEntryControl.untouched">
  <li [hidden]="!textEntryControl.hasError('minlength')">
    Item must have at least five characters
  </li>
</ul>
```

<!-- preview: https://plnkr.co/edit/m8cTaN?p=preview -->

---

## Custom Validators

- Can also provide custom validators to `FormControl` that return:
  - `null` if the field is valid
  - `{ validatorName: true }` if it is not

_src/app/generic-input.component.ts_
```ts
import { FormControl } from '@angular/form';

export class CustomValidators {
  static timeFormat(ctrl: FormControl) {
    const pattern: RegExp = /\d\d:\d\d/;
    return pattern.test(ctrl.value) ? null : {timeFormat: true};
  }
}
```

- Note: validators can also be defined as plain functions
- And we really ought to put our validators in their own files…

---

## Custom Validators

- Validate a field by adding `timeFormat.hasError('timeFormat')` to the `FormControl` constructor

```ts
@Component({ ... })
export class GenericInputComponent {
  constructor(…) {
    this.textEntryControl = new FormControl('', [ CustomValidators.timeFormat ]);
    …
  }
}
```

- And display an error message

```html
<li [hidden]="!textEntry.hasError('timeFormat')">
  Invalid time format
</li>
```

---

## Custom Validators

![Custom Validators](content/images/screenshot-invalid-time-format.png)

<!-- preview: https://plnkr.co/edit/m6heM7?p=preview -->
