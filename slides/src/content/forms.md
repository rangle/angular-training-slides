# Forms

---

## Enabling Forms

To have access to the directives and services that handle forms, we need to import the `FormsModule` or the `ReactiveFormsModule` into the root module.

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

There are two ways to handle forms:

- **Template Driven:** For simple forms and rapid prototyping
- **Model driven:** For complex validation and subforms

---

## Template Driven Forms

```html
<form #signupForm="ngForm" (ngSubmit)="registerUser(signupForm)">
  <label>
    Email <input type="text" name="email" ngModel>
  </label>
  <label>
    Password <input type="password" name="password" ngModel>
  </label>
  <button type="submit">Sign Up</button>
</form>
```

```ts
@Component({ ... })
export class SignupFormComponent {
  ...
  registerUser (form: NgForm) {
    console.log(form.value); // => { username: '', email: '' }
  }
}
```

[View Example](https://plnkr.co/edit/SmX18R1BhjJz9E33yROT?p=preview)

Notes:

- `#signupForm="ngForm"` declares `signupForm` as a form instance
- Clicking button type `"submit"` calls `"registerUser()"`
- `ngModel` populates values in `signupForm`
- Unlike popular convention, nesting the input inside the label removes need for `<label for="id">` and `<input id="id">` syntax. Both styles work.

---

## Nesting Form Data (1/2)

Right now the property `form.value` is returning a plain object:

```json
{
  "username": "",
  "password": ""
}
```

What if we have a more complex form and we want to group related fields?

```json
  {
    "contact": {
      "firstName": "",
      "lastName": ""
    },
    "address": {
      "street": "",
      "country": ""
    }
  }
```

---

## Nesting Form Data (2/2)

Use the `NgModelGroup` directive to create nested structures

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

  <fieldset ngModelGroup="address">
    ...
  </fieldset>
</form>
```

`ngModelGroup` does not necessarily have to be used on a `<fieldset>`

```html
<div ngModelGroup="contact">...</div>
```

[View Example](https://plnkr.co/edit/HfKItkR8i4O2SysXoW2f?p=preview)

---

## Binding Variables to the Form

Add a default value with one way data binding

```html
<input type="text" name="username" [ngModel]="username">
```

Implement two way data binding with the "banana in a box" syntax

```html
<input type="text" name="username" [(ngModel)]="username">
```

In your components

```ts
@Component({ ... })
export class SignupComponent {
  username: string = generateUniqueUserID();
}
```

[View Example](https://plnkr.co/edit/yxLe7Bccx46a0qw9lYHs?p=preview)

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

## Model Driven Forms with FormBuilder

```ts
import { FormBuilder, FormControl } from '@angular/forms';

@Component({ ... })
export class SignupComponent {

  constructor (builder: FormBuilder) {
    const username = new FormControl('initialValue', []);
    this.signupForm = builder.group({ username });
  }

  register() { ... }
}
  
```

- Contrast with template-driven forms, which are declared in the template

[View Example](https://plnkr.co/edit/BykFlj885JG1NkIq2nLr?p=preview)

---

## Template-Drive vs FormBuilder

|   | Template-Driven | FormBuilder |
| - | --------------- | ----------- |
| Form instance    | Declare in template #signupForm="ngForm" | Declare in class [formControl]="signupForm" |
| (ngSubmit)       | registerUser(signupForm)                 | registerUser()                              |
| Control instance | Declare in template ngModel              | Declare in class [formControl]="username"   |


```html
  <form [formGroup]="signupForm" (ngSubmit)="registerUser()">
    <!-- ... -->
    <input type="text"
      name="username" [formControl]="signupForm.get('username')">
  </form>
```

Notes:

- More verbose because of need to declare things in form.


---

## Validating FormBuilder Forms

Built-in: `required`, `maxLength`, `minLength`, and `pattern` validators.

```ts
import { Validators, FormControl } from '@angular/forms';
...
@Component({ ... })
export class AppComponent {
  username = new FormControl('', [Validators.minLength(5)]);
}
```

Validators produce errors which can be checked calling `hasError`.

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

```ts
import {FormControl} from '@angular/form';

export class CustomValidators {
  static emailFormat(ctrl: FormControl): [[key: string]: boolean] {
    let pattern: RegExp = /\S+@\S+\.\S+/;
    return pattern.test(ctrl.value) ? null : { emailFormat: true };
  }
}
```

- Returns `null` when  valid

```ts
import {CustomValidators} from './custom-validators';
// ...
this.email = new FormControl('', [CustomValidators.emailFormat]);
```

- Access using `email.hasError('emailFormat')`

[View Example](https://plnkr.co/edit/UqQtxj?p=preview)

---

## Visual Cues for Users

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

Angular FormControls have equivalents:

```html
<input name="myInput" [formControl]="myCustomInput">
<div [hidden]="myCustomInput.pristine">I've been changed</div>
```