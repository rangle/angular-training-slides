
## Forms in Angular

Angular has two approaches to forms:

- **Template Driven Forms:** Controls & validation rules are defined in the template with directives

- **Reactive Forms:** Controls & validation rules are defined in the within the component class or service

---

# Template Driven Forms

---

## Creating Template Driven Forms

- To make use of forms we need to import the `FormsModule` into the application module. 
- This module will allow us to use all the features of the template-driven forms including `ngModel`.  
  - `ngModel` allows us to use the two-way databinding syntax to bind data to form-controls. 
- The `FormsModule` is available in the `@angular/forms` package. 

_app.module.ts_

```ts
import { FormsModule } from '@angular/forms';
...
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
...
```

---

## How To Handle Form Data

- To handle form data we will be using the `ngModel` and `ngForm` directive. 
- `ngForm` provides properties to get information from the form like `value` and `valid`. 
- `ngModel` provides the same property for the individual fields. 

Here is a how a simple template driven form looks like:

```html
<form #signupForm="ngForm">
    First Name: <input name="firstName" ngModel>
</form>
```

- Every `<form>` element is automatically enhanced by the `NgForm` directive
 - `signupForm` is a template variable that holds a reference to the `NgForm` directive instance
- `ngModel` turns a form field into a `FormControl` using the element `name` property and registers it with the form
 - Every control that registers with the `ngForm` will automatically appear in the `form.value` property

[View Example](https://plnkr.co/edit/sdVst5yprdQUgQctQz9p?p=preview)

---

## NgForm / NgModel

`NgForm` exposes several useful properties related to the form: 

- `signupForm.value`: Shows all form values
- `signupForm.valid`: Shows if the form is valid
- `signupForm.value.firstName`: Shows the value of the `firstName` field.

`NgModel` has similiar properties and more that are related specifically to the fields. 

- `value`: Returns the value
- `valid`: Returns field validity (boolean)
- `pristine`: Indicates if it had changed from default view (boolean)
- `touched`: Indicates if the field was clicked, tabbed or tapped (boolean)

[View Example](https://plnkr.co/edit/oVQhf641Nx1qpaBG5jeN?p=preview)

---

## How To Handle Form Submissions

- `ngSubmit` is a built-in event called whenever the form is submitted
- This event handler gets added into our `form` element
- We also need to add the necessary submit button into our form with `type="submit"`

```html
<form #signupForm="ngForm" (ngSubmit)="registerUser(signupForm)">
  <p>First Name: <input name="firstName" ngModel></p>
  <p>Last Name: <input name="lastName" ngModel></p>
  <p><button type="submit">Sign Up</button></p>
</form>
```

In our component we can then add the `registerUser` function that takes an `NgForm` as an argument:

```ts
registerUser (signupForm: NgForm) {
  console.log(signupForm.value); // => { firstName: '', lastName: '' }
  console.log(signupForm.valid); // => true
}
```

[View Example](https://plnkr.co/edit/Xxcf46sO5TWK1EKme1qF?p=preview)

---

## How To Validate A Form (1/2)

When using template driven forms we can use 4 built-in validators: `required`, `pattern`, `minlength` and `maxlength`

```html
<!-- a required field -->
<input required>

<!-- alphanumeric field of specific length -->
<input pattern="[A-Za-z0-9]{0,5}">

<!-- more than 3 characters required -->
<input minlength="3">

<!-- prevents more than 5 characters -->
<input maxlength="5">
```

- `pattern` is a less-powerful version of JavaScript's RegExp syntax
- `maxlength` is special in that it prevents additional characters from being entered. Others only produce a warning

---

## How To Validate A Form (2/2)

- To perform validation, we need to create a template variable for the given field `#field="ngModel"`

```html
<p>First Name: <input name="firstName" #firstName="ngModel" ngModel required></p>  
```

In the above example the template variable `#firstName` is an instances of `FormControl`

- `value`: Returns the value
- `valid`: Returns field validity (boolean)
- `pristine`: Indicates if it had changed from default view (boolean)
- `touched`: Indicates if the field was clicked, tabbed or tapped (boolean)

[View Example](https://plnkr.co/edit/TzrNBQUmJYhnvEzR3Gwt?p=preview)

---

## How To Display Error Messages

- Using form validation state i.e: `myForm.errors.required`
- Validators produce errors which can be checked calling `hasError` on the `FormControl`

```html
<form #signupForm="ngForm" (ngSubmit)="registerUser(signupForm)">
  <p>First Name: <input name="firstName" #firstName="ngModel" ngModel required></p>
  <ul class="errors" [hidden]="firstName.valid">
    <li [hidden]="!firstName.hasError('required')">
      The first name is required
    </li>
  </ul>
  <button type="submit" [disabled]="!signupForm.valid">Sign Up</button>
</form>
```

[View Example](https://plnkr.co/edit/zgAQW3pQjGqRGhAQvE7j?p=preview)

---

## How To Style A Form (1/3)

- Along with two way databinding the `ngModel` gives us additional information about the state of a control
- For example, it can notify us if the control was touched, changed or if the value became invalid
- The following CSS class are available for this:

|  Class if true | Class if false | Description |
| --------------- | --------------- | ----------- |
| ng-valid | ng-invalid | The model is valid |
| ng-dirty  | ng-pristine | The control has been interacted with |
| ng-touched | ng-untouched | The control has been blurred  |

---

## How To Style A Form (2/3)

- Let's see how we can change our previous example to take benefit of this feature. 

```html
<form #signupForm="ngForm" (ngSubmit)="registerUser(signupForm)">
  <p>First Name: <input name="firstName" #firstName="ngModel" ngModel required></p>
  <ul class="errors" [hidden]="firstName.valid || firstName.untouched">
    <li [hidden]="!firstName.hasError('required')">
      The first name is required
    </li>
  </ul>
  <button type="submit" [disabled]="!signupForm.valid">Sign Up</button>
</form>
```

- We can now see that the error list does not appear any more unless the control has been interacted with. 
- We are using the `untouched` property to accomplish this. 

[View Example](https://plnkr.co/edit/0TR3iu3ANajJdbWixB83?p=preview)

---

## How To Style A Form (3/3)

Combining these classes and properties with CSS and HTML allows us to create very user-friendly forms.

```css
.ng-valid[required], .ng-valid.required  {
  background-color: #DFD;
}
.ng-invalid.ng-touched:not(form) {
  background-color: #FDD;
}
```

[View Example](https://plnkr.co/edit/BQdO11mdaRpsrk7OD40e?p=preview)

---

# Reactive Forms

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

FIXME
## How can I dynamically generate form fields (10 min)
- FormBuilder
- FormArray
- Template-driven (ngFor / ngIf)