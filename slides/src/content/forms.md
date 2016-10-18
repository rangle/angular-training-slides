# Forms

---

## Getting Started

```js
@NgModule({
  imports: [
    BrowserModule, 
    FormsModule, // template driven forms
    ReactiveFormsModule // model driven forms
  ],
  // ...
})
export class MyAppModule {}

```

There are two ways to handle forms:
- **Template Driven:** Minimal code, using built-in directives
- **Model driven:** For complex validation and subforms

Notes:

- Template driven is good for rapid prototyping or simple forms

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
@Component({/* ... */})
export class SignupForm {
  registerUser (form: NgForm) {
    console.log(form.value); // => { username: '', email: '' }
  // ...
```

[View Example](https://plnkr.co/edit/soaluWqvfugacpCicq91?p=preview)

Notes:

- `#signupForm="ngForm"` declares `signupForm` as a form instance
- Clicking button type `"submit"` calls `"registerUser()"`
- `ngModel` populates values in `signupForm`
- Unlike popular convention, nesting the input inside the label removes need for `<label for="id">` and `<input id="id">` syntax. Both styles work.

---

## Nesting Form Data (1/2)

What if you want the form value to produce this data structure?

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

Use `ngModelGroup` to nest data

```html
<form #myForm="ngForm">
  <fieldset ngModelGroup="contact">
    <label>
      First Name <input type="text" name="firstName" ngModel>
    </label>
    <label>
      Last Name <input type="text" name="lastName" ngModel>
    </label>
  </fieldset>

  <fieldset ngModelGroup="address">
    <!-- ... -->
  </fieldset>
</form>
```

Notes:

- `ngModelGroup` does not have to be used on `<fieldset>`
- This structure avoids name collision between fields of different groups

---

## Using Template Model Binding

Add a default value

```html
  <input type="text" name="username" [ngModel]="username">
```

Track changes "Banana-Box" syntax

```html
  <input type="text" name="username" [(ngModel)]="username">
```

In your components

```ts
@Component({ /* ... */ })
export class SignUpForm {
  username: string = generateUniqueUserID();
}
```

---

## Validating Template-Driven Forms

```html
<!-- a required field -->
<input type="text" ... required>

<!-- alphanumeric field of specific length -->
<input type="text" pattern="[A-Za-z0-9]{0,5}">

<!-- more than 3 characters required -->
<input type="text" minlength="3">

<!-- prevents more than 5 characters -->
<input type="text" maxlength="5">
```

Notes:

- pattern is a less-powerful version of JavaScript's RegExp syntax
- maxlength is special in that it prevents additional characters from being entered. Others only produce a warning.

---

## Model Driven Forms with FormBuilder

```ts
import {FormBuilder, FormControl} from '@angular/forms';

@Component({/* ... */})
export class SignupForm {
  constructor (builder: FormBuilder) {
    const username = new FormControl('initialValue', []);
    this.signupForm = builder.group({ username });
  }

  register() {
  // ...
```

[View Example](https://plnkr.co/edit/IxmqTgoM44FK0yc5beSW?p=preview)

- Contrast with template-driven forms, which are declared in the template

---

## Template-Drive vs FormBuilder

|                  | Template-Driven                          | FormBuilder                                 |
|------------------|------------------------------------------|---------------------------------------------|
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
  import { Validators } from '@angular/forms';
  // ...
  this.username = new FormControl('', [
    Validators.minLength(5)
  ]);
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