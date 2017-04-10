
##Forms in Angular

---

## How do I create forms in Angular (10 min)

- To make use of forms we need to import the `FormsModule` into the application module. 
- This module will allow us to use all the features of the template-driven forms including `ngModel`.  
  - `ngModel` allows us to use the two-way databinding syntax to bind data to form-controls. 
- The `FormsModule` is available in the `@angular/forms` package. 


__app.module.ts__
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

## How do I handle forms data (10 min)

- To handle forms data we will be using the `ngModel` and `ngForm` directive. 
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

FIXME: Show example and a few properties (maybe form.value)

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

FIXME: Show example and a few properties (maybe form.valid)

---

## How do I handle form submission (15 min)

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

FIXME: Show plnkr example

---

## How do I validate my form (10 min) (1/2)

When using template driven forms we can use 4 built-in validators: `required`, `pattern`, `minlength` and `maxlength`.

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
- `maxlength` is special in that it prevents additional characters from being entered. Others only produce a warning.

---

## How do I validate my form (10 min) (2/2)

To perform validation, we need to create template variables for every field `#field="ngModel"`.

```html
<p>First Name: <input name="firstName" #firstName="ngModel" required></p>  
```

Template variables are instances of `NgModel` but they share some properties from `FormControl`:

- `value`: Returns the value
- `valid`: Returns field validity (boolean)
- `pristine`: Indicates if it had changed from default view (boolean)
- `touched`: Indicates if the field was clicked, tabbed or tapped (boolean)

FIXME: Validate plnkr
[View Example](https://plnkr.co/edit/bWdmou8gdyqhqsu8jGtI?p=preview)

---

## How do I display error messages (15 min)

- Using form validation state i.e: `myForm.errors.required`
- For this to work, we need to make sure that our controls are instances of a `NgModel`

```html
<form #signupForm="ngForm" (ngSubmit)="registerUser(signupForm)">
  <p>First Name: <input name="firstName" #firstName="ngModel" required></p>
  <ul class="errors" [hidden]="firstName.valid">
    <li [hidden]="!firstName.hasError('required')">
      The first name is required
    </li>
  </ul>
  <button type="submit">Sign Up</button>
</form>
```

FIXME: Show plnkr example

---

FIXME
## Can I change the look of my form based on validation (10 min) (1/3)

- Along with two way databinding the `ngModel` gives us additional information about the state of a control. 
- For example, it can notify us if the control was touched, changed or if the value become invalid. 
- The following CSS class and javascript properties are available for this:

|  Class / Property if true | Class / Property if false | Description |
| --------------- | --------------- | ----------- |
| ng-valid / valid | ng-invalid / invalid | The model is valid |
| ng-dirty / dirty | ng-pristine / pristing | The control has been interacted with |
| ng-touched / touched | ng-untouched / untouched | The control has been blurred  |

---

## Can I change the look of my form based on validation (10 min) (2/3)

- Let's see how we can change our previous example to take benefit of this feature. 

```html
<form #signupForm="ngForm" (ngSubmit)="registerUser(signupForm)">
  <p>First Name: <input name="firstName" #firstName="ngModel" required></p>
  <ul class="errors" [hidden]="firstName.valid || firstName.untouched">
    <li [hidden]="!firstName.hasError('required')">
      The first name is required
    </li>
  </ul>
  <button type="submit">Sign Up</button>
</form>
```

- We can now see that the error list does not appear any more unless the control has been interacted with. 
- We are using the `untouched` property to accomplish this. 

FIXME: Show plnkr example from code in slide

---

## Can I change the look of my form based on validation (10 min) (3/3)

Combining these classes and properties with CSS and HTML allows us to create very user-friendly forms.

```css
.ng-valid[required], .ng-valid.required  {
  background-color: #DFD;
}
.ng-invalid.ng-touched:not(form) {
  background-color: #FDD;
}
```

Similar to this we can also take advantage of the `signupForm.valid` property and disable our sign up button when the form is invalid.

```html
...
<button type="submit" [disabled]="!signupForm.valid">Sign Up</button>
...
```

FIXME: Show plnkr with changes in a demo. 

---

## Can I bind a model to a form instead of using a template (25 min) (1/4)

- To bind a model to a form, we need to create model driven forms
- Model driven forms are also known as Reactive Forms
- With model driven forms we can control and manipulate controls directly from the component
- We can push data to the controls and pull values as they change
- We will not be using things like `ngModel` and `required` in the template
 - instead we will define the validation and model as part of our component

---

## Can I bind a model to a form instead of using a template (25 min) (2/2)

To create model driven forms, we import the `ReactiveFormsModule` module into our root module

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

## Can I bind a model to a form instead of using a template (25 min) (3/4)

Reactive Forms are then declared programmatically using the `FormBuilder` service. 

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

## Can I bind a form to a model instead of using a template (25 min) (4/4)

- Let's finally modify our template to use the created form controls

```html
<form [formGroup]="signupForm" (ngSubmit)="registerUser()" novalidate>
  <p>First Name: <input [formControl]="firstName"></p>
  <button type="submit">Sign Up</button>
</form>
```

- Our model driven template is a lot cleaner than our template form

FIXME: Show plnkr with changes in a demo.

---

## Can I bind a model to a form instead of using a template (25 min) (2/2)

- Now that we a basic reactive form running, let's add our model to it. 

_User.ts_
```ts
export class User {
  firstName: string;
  constructor(firstName) {
    this.firstName = firstName;
  }
}
```

NOTE: Need to review this with Philip or John, as its unclear to me how the model is being bound to the form. 

---


## How do validate my form model (15 min) (1/3)

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

## How do validate my form model (15 min)  - Custom Validators (2/3)

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

Note: Validators can also be define as plain functions

---

## How do validate my form model (15 min) - Checking a Custom Validator (3/3)

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

## How can I logically separate different sections of a form (1/4)

- Dividing large forms into small sections makes it easier to track validation issues
- It allows us to query individual groups to narrow down invalid controls
- Dividing forms into sections can also be useful if your backend requires pre-formatted data
- To group the sections, we need to use `FormGroup`
- We can create nested `FormGroup`s within other `FormGroup`s

---

## Nested Structure Example (2/4)


- To create the below structure, we need to create several `FormGroup`s and add `FormControl`s to it

```ts
{                           <- mainForm: FormGroup
  "billTo": {                 <- billTo: FormGroup
    "firstName": "Mike",        <- firstName: FormControl
    "lastName": "Miles"         <- lastName: FormControl
  },
  "card": {                   <- card: FormGroup
    "accountNumer": "...",     <- accountNumber: FormControl
    "expiration": "12/2020",   <- expiration: FormControl
    "cvv": "222"               <- cvv: FormControl
  }
}
```

---

## Nested Structure Example (3/4)

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

## Nested Structure Example (4/4)

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

FIXME
## How can I dynamically generate form fields (10 min)
- FormBuilder
- FormArray
- Template-driven (ngFor / ngIf)