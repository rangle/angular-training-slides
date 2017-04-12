<!-- .slide: data-background="../content/images/title-slide.jpg" -->

## Building Applications with Angular

# Reactive Forms

---

## Roadmap

FIXME

---

## Overview

- Template Driven Forms: controls and validation rules defined in the template with directives
- Reactive Forms: controls and validation rules defined in the component class or service


---

## How Reactive Forms Work (1/5)

- Reactive forms works by binding a form to a model
- With reactive forms we can handle controls directly within the component
- We can push data to the controls and pull values as they change
- We will not be using things like `ngModel` and `required` in the template
 - instead we will define the validation and model as part of our component
- Reactive Forms are also known as Model driven forms

---

## How Reactive Forms Work (2/5)

To create reactive forms, we need to import the `ReactiveFormsModule` module in our root module

_app.module.ts_
```ts
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
...
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ...
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
...
```

---

## How Reactive Forms Work (3/5)

Reactive Forms are declared programmatically using the `FormBuilder` service.

```ts
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({ ... })
export class SignupComponent {
  signupForm: FormGroup;
  firstName: FormControl;

  constructor (builder: FormBuilder) {
    this.firstName = new FormControl('', []);

    this.signupForm = builder.group({
      firstName: this.firstName;
    });
  }
}
```

- `FormControl` tracks the value, state and validity of a form control
- `FormGroup` tracks the group and validity state of a group of FormControls
- `FormBuilder` can be used to create `FormGroup`s and `FormControl`s for us

---

## How Reactive Forms Work (4/5)

```html
<form [formGroup]="signupForm" (ngSubmit)="registerUser()" novalidate>
  <p>First Name: <input [formControl]="firstName"></p>
  <button type="submit">Sign Up</button>
</form>
```

- Our model driven template is no longer using `required` or `ngModel`
  - We do not need the `ngModel`
- We are also not creating any template variables

---

## How To Validate Reactive Forms

- Angular provides `required`, `maxLength`, `minLength`, and `pattern` validators
- Validators produce errors which can be checked calling `hasError` on the `FormControl`

```ts
import { Validators, FormControl } from '@angular/forms';

@Component({ ... })
export class SignupComponent {
  constructor( ... ) {
    this.firstName = new FormControl('', [Validators.minLength(5)]);
    ...
  }
}
```

```html
<li [hidden]="!firstName.hasError('minlength')">
  First Name can not be shorter than 5 characters
</li>
```

[View Example](https://plnkr.co/edit/m8cTaN?p=preview)

---

## Custom Validators (1/2)

- Custom validators can also be provided to `FormControl`s
- Return `null` if the field is valid or `{ validatorName: true }` when invalid

```ts
import { FormControl } from '@angular/form';

export class CustomValidators {
  static emailFormat(ctrl: FormControl) {
    let pattern: RegExp = /\S+@\S+\.\S+/;
    return pattern.test(ctrl.value) ? null : { emailFormat: true };
  }
}
```

Note: Validators can also be defined as plain functions

---

## Custom Validators (2/2)

- Validate a field using `email.hasError('emailFormat')` in the template

```ts
import { CustomValidators } from './custom-validators';

@Component({ ... })
export class SignupComponent {
  constructor( ... ) {
    this.email = new FormControl('', [ CustomValidators.emailFormat ]);
    ...
  }
}
```

```html
<li [hidden]="!email.hasError('emailFormat')">
  Invalid email format
</li>
```

[View Example](https://plnkr.co/edit/m6heM7?p=preview)

---

## How To Logically Separate Form Sections (1/5)

- Dividing large forms into small sections makes it easier to track validation issues
- It allows us to query individual groups to narrow down invalid controls
- It's also useful if you want to create a form from a schema
- To group the sections, we need to use `FormGroup`
- We can create nested `FormGroup`s within other `FormGroup`s

---

## How To Logically Separate Form Sections (2/5)

- We want to create the below data structure and turn that into an angular form

```ts
{
  "billTo": {
    "firstName": "Mike",
    "lastName": "Miles"
  },
  "card": {
    "accountNumer": "...",
    "expiration": "12/2020",
    "cvv": "222"
  }
}
```

---

## How To Logically Separate Form Sections (3/5)

- The structure can be converted the below code

```ts
export class GroupingExampleComponent  {
  mainForm: FormGroup;

  billTo: FormGroup;
  firstName: FormControl;
  lastName: FormControl;

  card: FormGroup;
  accountNumber: FormControl;
  expirationMonth: FormControl;
  cvvNumber: FormControl;
...
```

---

## How To Logically Separate Form Sections (4/5)

- Let's first inject a `FormBuilder` into our constructor

```ts
constructor(private fb: FormBuilder) { }
```
- Once we have the controls initialized we can go ahead and add them to the individual groups
- In the below example, we are adding the `firstName` to the `billTo` group

```ts
createBillToFormFields() {
  this.firstName = new FormControl('Mike', [Validators.required]);

  this.billTo = this.fb.group({
    firstName: this.firstName
  });
}
```

- Once all sub groups are created we can add them into the `mainForm` group:

```ts
this.mainForm = this.fb.group({
  billTo: this.billTo
});
```

[View Example](http://plnkr.co/edit/rJ576V7ncL0Fjm3T7zpt?p=preview)

---

## How To Logically Separate Form Sections (5/5)

- Instead of creating new `FormControl` instances in your component, you can also use `FormControlName`
- In that case we also need to change our template to:

```html
<input class="form-control" type="input" name="lastName" id="lastName" formControlName="lastName">
```

- Our component can also be changed to use the shortcut to create a `FormControl`

```ts
createBillToFormFields() {
  this.billTo = this.fb.group({
    firstName: new FormControl('Mike', [Validators.required]),
    lastName: ['', Validators.required ]
  });
}
```

---


## How to Generate Forms Dynamically (1/6)

With reactive forms, since the forms are created and handled primarily through component code and not in the template, it becomes much easier to create dynamic forms. We'll use an example using a JSON based schema:


```json
{
  "name": "Edit User Profile",
  "fields": [
    {
      "name": "firstName",
      "display": "First Name",
      "validators": ["required"]
    },
    {
      "name": "lastName",
      "display": "Last Name",
      "defaultValue": "Angular",
      "validators": ["required"]
    },
    {
      "name": "email",
      "display": "Email Address",
      "placeholder": "example@rangle.io",
      "validators": ["email"]
    }
  ]
}
```

---

## How to Generate Forms Dynamically (2/6)

In our definition, our schema has a `fields` property that defines what our form fields will be. For each of the fields, we accept:

  - `name` - the name or id we use refer to the form control in code
  - `display` - the display name of the field in the template
  - `defaultValue` - the default value of a form control
  - `placeholder` - the sample value for the control if it's empty
  - `validators` - how we determine whether or not that form control is valid

---

## How to Generate Forms Dynamically (3/6)

We have a basic schema service that simply parses this as JSON, serializes it into a JavaScript object and binds it to a local class member.

_form-schema.service.ts_
```ts
export class FormSchemaService {
  schema = {};

  getSchemaJSON() {
    return Observable.of(exampleSchemaJSON);
  }

  updateSchema(toSerialize) {
    this.schema = JSON.parse(toSerialize);
  }
}
```
[View Example](https://plnkr.co/edit/FjmwlCYFkvEqYqAAiJRD?p=preview)

---

## How to Generate Forms Dynamically (4/6)

To actually use this object to generate a reactive form, we need a way of mapping this object to an Angular `FormGroup` instance.

_dynamic-form.service.ts_
```ts
export class DynamicFormService {
  generateForm(schema) {
    const { fields } = schema;

    const formGroup = fields.reduce(
      (group, field) => {
        group[field.name] = new FormControl(
          field.defaultValue ? field.defaultValue : '',
          getValidators(field.validators ? field.validators : []));

        return group;
      }, {});

    return new FormGroup(formGroup);
  }
}
```
[View Example](https://plnkr.co/edit/FjmwlCYFkvEqYqAAiJRD?p=preview)

---

## How to Generate Forms Dynamically (5/6)

After generating a `FormGroup` object, we can start using the reactive form within our component. Here, we use both the form schema and the `FormGroup` object within our template:

_dynamic-form.component.ts_
```ts
@Component({
	selector: 'app-dynamic-form',
	template: `
	  <h2>{{schema.name}}</h2>
	  <form [formGroup]="editProfileForm" (ngSubmit)="onSubmit()">
	    <div *ngFor="let field of schema.fields">
	      <label [for]="field.name">{{field.display}}</label>
	      <input
	        type="text"
	        [name]="field.name"
	        [placeholder]="field.placeholder ? field.placeholder : ''"
	        [formControlName]="field.name">
	    </div>

	    <button type="submit" [disabled]="!editProfileForm.valid">Update Profile</button>
	  </form>
	`
})
```
[View Example](https://plnkr.co/edit/FjmwlCYFkvEqYqAAiJRD?p=preview)

---

## How to Generate Forms Dynamically (6/6)

_dynamic-form.component.ts_
```ts
export class DynamicFormComponent {
  editProfileForm = new FormGroup({});

  private _schema = {
    fields: [],
  };

  @Input()
  get schema() {
    return this._schema;
  }

  set schema(value) {
    this._schema = value;
    this.editProfileForm = this.dynamicFormService.generateForm(value);
  }

  constructor(private dynamicFormService: DynamicFormService) { }
}
```
Notice that we're allowing the schema to be changed at runtime, so we have to make sure to update the `FormGroup` whenever the schema is updated.
