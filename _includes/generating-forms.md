<!-- .slide: data-background="../images/title-slide.jpg" -->
<!-- .slide: id="generating-forms" -->
## Building Applications with Angular

# Generating Forms Dynamically

---

## Roadmap

FIXME: this module needs to be filled in and proof-read

---
<!-- .slide: id="generating-forms-dynamically-1" -->
## How to Generate Forms Dynamically (1/6)

With reactive forms, since the forms are created and handled primarily through component code and not in the template, it becomes much easier to create dynamic forms. We'll use an example using a JSON based schema:


```js
{
  "name": "Edit User Profile",
  "fields": [
    {
      "name": "name",
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
<!-- .slide: id="generating-forms-dynamically-2" -->
## How to Generate Forms Dynamically (2/6)

In our definition, our schema has a `fields` property that defines what our form fields will be. For each of the fields, we accept:

  - `name` - the name or id we use refer to the form control in code
  - `display` - the display name of the field in the template
  - `defaultValue` - the default value of a form control
  - `placeholder` - the sample value for the control if it's empty
  - `validators` - how we determine whether or not that form control is valid

---
<!-- .slide: id="generating-forms-dynamically-3" -->
## How to Generate Forms Dynamically (3/6)

We have a basic schema service that simply parses this as JSON, serializes it into a JavaScript object and binds it to a local class member.

#### _form-schema.service.ts_
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
<!-- .slide: id="generating-forms-dynamically-4" -->
## How to Generate Forms Dynamically (4/6)

To actually use this object to generate a reactive form, we need a way of mapping this object to an Angular `FormGroup` instance.

#### _dynamic-form.service.ts_
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
<!-- .slide: id="generating-forms-dynamically-5" -->
## How to Generate Forms Dynamically (5/6)

After generating a `FormGroup` object, we can start using the reactive form within our component. Here, we use both the form schema and the `FormGroup` object within our template:

#### _dynamic-form.component.ts_
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
<!-- .slide: id="generating-forms-dynamically-6" -->
## How to Generate Forms Dynamically (6/6)

#### _dynamic-form.component.ts_
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
