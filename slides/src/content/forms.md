# Forms

---

## Forms in Angular 2

- Angular 2 has multiple approaches to forms:
-- **Template Driven Forms:** For simple forms and rapid prototyping
-- **Model Driven Forms:** For complex validation and subforms

---

## Enabling Forms 

To enable Angular 2 form directives and services you need to import the right form modules.

```ts
@NgModule({
  imports: [
    BrowserModule, 
    FormsModule, // template + model driven forms
    ReactiveFormsModule // only model driven forms
  ],
  ...
})
export class AppModule {}
```

---

## Template Driven Forms (1/2)

- Uses Angular 2 directives for a markup-oriented approach
- `#signupForm="ngForm"` tells Angular to supply the ngForm directive and store the form in `signupForm`
- `ngSubmit` handles form submission by calling the supplied method
- `ngModel` turns form fields to `FormControl`s using the element name

```html
<form #signupForm="ngForm" (ngSubmit)="registerUser(signupForm)">
  <label>
    Email: <input type="text" name="email" ngModel>
  </label>
  <label>
    Password: <input type="password" name="password" ngModel>
  </label>
</form>
```

---

## FormControl Properties and Methods

- `FormControl`.value returns the value
- `FormControl`.valid returns field validity
- `FormControl`.pristine indicates if it had changed from default view
- `FormControl`.touched indicates if the field was clicked, tabbed or tapped
- `FormControl`.setValue() allows setting the control value
- `FormControl`.reset() allows resetting the control value

---

## Template Driven Forms (2/2)

- In the component submission method we can access `form.value` to get all values from the form
- Can also use `form.valid` which will be `true` without validation rules

```ts
@Component({ ... })
export class SignupFormComponent {
  ...
  registerUser (form: NgForm) {
    console.log(form.value); // => { email: '', password: '' }
    console.log(form.valid); // => true
  }
}
```

[View Example](https://plnkr.co/edit/SmX18R1BhjJz9E33yROT?p=preview)

---

## Nesting Form Data (1/2)

- `form.value` returns a flat object by default, which is not always what we want
- `ngModelGroup` lets you go from:

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

- Use the `ngModelGroup` directive to create nested structures
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

Add a default value from your model with model-view data binding:

```ts
@Component({ ... })
export class SignupComponent {
  username: string = 'foo';
}
```

```html
<input type="text" name="username" [ngModel]="username"> <!-- "foo" -->
```

Two way data binding will keep the model up to date as the user types.

```html
<input type="text" name="username" [(ngModel)]="username">

```

[View Example](https://plnkr.co/edit/yxLe7Bccx46a0qw9lYHs?p=preview)

---

## Validating Template Driven Forms

When using template driven forms we are constrained to only use the 4 HTML5 validations: `required`, `pattern`, `minlength` and `maxlength`.

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
- Unit testable

---

## Creating a Model Driven Form (1/2)

- `FormControl` tracks the value and validity of a form control. It requires two properties: an initial value and a list of validators
- `FormGroup` tracks the group and validity state of a group of FormControls
- `FormBuilder` can be used to create `FormGroup`s and `FormControl`s for us

```ts
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({ ... })
export class SignupComponent {

  constructor (builder: FormBuilder) {
    this.signupForm = builder.group({ 
      username: new FormControl('initialValue', []);
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
      name="username" [formControl]="username">
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
  username = new FormControl('', [Validators.minLength(5)]);
}
```
```html
<label> Username
  <input type="text" name="username" [formControl]="username">
</label>
<div [hidden]="username.valid || username.untouched">
  <div [hidden]="!username.hasError('minlength')">
    Username can not be shorter than 5 characters.</div>
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
| Control instance | Declare in template ngModel              | Declare in class [formControl]="username"   |

