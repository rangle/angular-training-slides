# Forms

---

## Forms in Angular 2

Angular 2 has two approaches to forms:
- **Template Driven Forms:** For simple forms and rapid prototyping
- **Model Driven Forms:** For complex validation and subforms

---

## Enabling Forms 

To enable Angular 2 form directives and services you need to import the right form modules.
- `FormModules` should be used for template driven forms
- `ReactiveFormsModule` should be used for model-driven forms

```ts
@NgModule({
  imports: [
    BrowserModule, 
    FormsModule, // template driven forms
    ReactiveFormsModule // model driven forms
  ],
  ...
})
export class AppModule {}
```

---

## Template Driven Forms (1/2)

Uses Angular 2 directives to handle forms using a markup-oriented approach

```html
<form #signupForm="ngForm" (ngSubmit)="registerUser(signupForm)">
  <label>
    First Name: <input type="text" name="firstName" ngModel>
  </label>
  <label>
    Last Name: <input type="text" name="lastName" ngModel>
  </label>
  <button type="submit">Sign Up</button>
</form>
```

- Every `<form>` element is automatically enhanced by the `NgForm` directive
- `signupForm` is a template variable that holds a reference to the enhanced `<form>` element
- `ngSubmit` is a built-in event called whenever the form is submitted
- `ngModel` turns a form field into a `FormControl` using the element `name` property

---

## Template Driven Forms (2/2)

- In the component submission method we can access `signupForm.value` to get all values from the form
- Can also use `signupForm.valid` which will always be `true` without validation rules

```ts
@Component({ ... })
export class SignupFormComponent {
  ...
  registerUser (signupForm: NgForm) {
    console.log(signupForm.value); // => { firstName: '', lastName: '' }
    console.log(signupForm.valid); // => true
  }
}
```

[View Example](https://plnkr.co/edit/SmX18R1BhjJz9E33yROT?p=preview)

---

## Nesting Form Data (1/2)

- `form.value` returns a flat object by default, which is not always what we want
- `NgModelGroup` lets you go from:

```json
{
  "firstName": "",
  "lastName": ""
}
```
to:

```json
  {
    "contact": {
      "firstName": "",
      "lastName": ""
    }
  }
```

---

## Nesting Form Data (2/2)

- Use the `NgModelGroup` directive to create nested structures
- It can be used on any element, though `fieldset` is often the most semantic

```html
<form #myForm="ngForm">
  <fieldset ngModelGroup="contact">
    <label>
      First Name: <input type="text" name="firstName" ngModel>
    </label>
    <label>
      Last Name: <input type="text" name="lastName" ngModel>
    </label>
  </fieldset>
</form>
```

[View Example](https://plnkr.co/edit/HfKItkR8i4O2SysXoW2f?p=preview)

---

## Binding Variables to the Form 

Add a default value from your model with one way data binding:

```ts
@Component({ ... })
export class SignupComponent {
  firstName = 'Farah';
}
```

```html
<input type="text" name="firstName" [ngModel]="firstName"> <!-- "Farah" -->
```

Two way data binding (banana-in-a-box - `[()]`) will keep the model up to date as the user types.

```html
<input type="text" name="firstName" [(ngModel)]="firstName">

```

[View Example](https://plnkr.co/edit/yxLe7Bccx46a0qw9lYHs?p=preview)

---

## FormControl Properties and Methods

Properties: 

- `value`: Returns the value
- `valid`: Returns field validity (boolean)
- `pristine`: Indicates if it had changed from default view (boolean)
- `touched`: Indicates if the field was clicked, tabbed or tapped (boolean)

Methods: 

- `setValue()`: Allows setting the control value
- `reset()`: Allows resetting the control value

---

## Validating Template Driven Forms

When using template driven forms we are constrained to only use the 4 built-in validations: `required`, `pattern`, `minlength` and `maxlength`.

```html
<!-- a required field -->
<input type="text" required>

<!-- alphanumeric field of specific length -->
<input type="text" pattern="[A-Za-z0-9]{0,5}">

<!-- more than 3 characters required -->
<input type="text" minlength="3">

<!-- prevents more than 5 characters -->
<input type="text" maxlength="5">
```

- `pattern` is a less-powerful version of JavaScript's RegExp syntax
- `maxlength` is special in that it prevents additional characters from being entered. Others only produce a warning.

---

## Model Driven Forms 

- Declared programmatically rather than through the template
- Much more validation control and flexibility
- Ability to use custom validators

---

## Creating a Model Driven Form (1/2)

- `FormControl` tracks the value, state and validity of a form control. 
- New `FormControl`s require two arguments: an initial value and a list of validators
- `FormGroup` tracks the group and validity state of a group of FormControls
- `FormBuilder` can be used to create `FormGroup`s and `FormControl`s for us

```ts
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({ ... })
export class SignupComponent {

  constructor (builder: FormBuilder) {
    this.signupForm = builder.group({ 
      firstName: new FormControl('initialValue', []);
    });
  }
}
  
```

[View Example](https://plnkr.co/edit/BykFlj885JG1NkIq2nLr?p=preview)

---

## Creating a Model Driven Form (2/2)

- Once declared in our component, we need to provide our form to the template
- Use the `[formControl]` input to specify the correct `FormControl`

```html
  <form [formGroup]="signupForm" (ngSubmit)="registerUser()">
    <input type="text"
      name="firstName" [formControl]="firstName">
  </form>
```

---

## Validating FormBuilder Forms

- Angular provides `required`, `maxLength`, `minLength`, and `pattern` validators
- Validators produce errors which can be checked calling `hasError` on the `FormControl` and providing the name of the validator

```ts
import { Validators, FormControl } from '@angular/forms';
...
@Component({ ... })
export class AppComponent {
  firstName = new FormControl('', [Validators.minLength(5)]);
}
```
```html
<label> First Name
  <input type="text" name="firstName" [formControl]="firstName">
</label>
<div [hidden]="firstName.valid || firstName.untouched">
  <div [hidden]="!firstName.hasError('minlength')">
    First Name can not be shorter than 5 characters.</div>
</div>
```

[View Example](https://plnkr.co/edit/kr8Q41?p=preview)

---

## Custom Validators

- Custom validators can also be provided to `FormControl`s
- Return `null` if the field is valid and `validatorName: true` when false

```ts
import {FormControl} from '@angular/form';

export class CustomValidators {
  static emailFormat(ctrl: FormControl): [[key: string]: boolean] {
    let pattern: RegExp = /\S+@\S+\.\S+/;
    return pattern.test(ctrl.value) ? null : { emailFormat: true };
  }
}
```

---

## Custom Validators (2/2)

- Access using `email.hasError('emailFormat')` in the template

```ts
import {CustomValidators} from './custom-validators';
// ...
this.email = new FormControl('', [CustomValidators.emailFormat]);
```
```html
<label> Email
  <input type="text" name="email" [formControl]="email">
</label>
<div [hidden]="email.valid || email.untouched">
  <div [hidden]="!email.hasError('emailFormat')">
    Invalid email format.</div>
</div>
```

[View Example](https://plnkr.co/edit/UqQtxj?p=preview)

---

## Visual Validation Cues for Users

Angular will automatically add classes to form controls based on their status

```css
.ng-valid {}
.ng-invalid {}

.ng-touched {} /* clicked, tapped, or tabbed over */
.ng-untouched {} /* not clicked, tapped, or tabbed over */

.ng-pristine {} /* unchanged from default value */
.ng-dirty {} /* different from default value */

/* typical pairings */
.ng-pristine.ng-untouched {}
.ng-touched.ng-invalid {}
```

You can also access equivalent properties on `FormControl`s
```html
<input name="myInput" [formControl]="myCustomInput">
<div [hidden]="myCustomInput.pristine">I've been changed</div>
```

---

## Template-Driven vs FormBuilder

|   | Template-Driven | FormBuilder |
| - | --------------- | ----------- |
| Form instance    | Declare in template #signupForm="ngForm" | Declare in class [formGroup]="signupForm" |
| (ngSubmit)       | registerUser(signupForm)                 | registerUser()                              |
| Control instance | Declare in template ngModel              | Declare in class [formControl]="firstName"   |

