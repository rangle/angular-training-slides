# Forms

---

## Forms in Angular 2

Angular 2 has two approaches to forms:

- **Template Driven Forms:** Controls & validation rules are define in the template with directives

```ts
@NgModule({
  imports: [ FormsModule, ... ]
})
```

- **Model Driven Forms:** Controls & validation rules are define in the class with the `FormBuilder` service

```ts
@NgModule({
  imports: [ ReactiveFormsModule, ... ]
})
```

- Both modules are available in the package `@angular/forms`
- Both modules can be imported if both approaches are used

---

# Template Driven Forms

---

## Creating a Template Driven Form

Uses Angular directives to handle forms using a markup-oriented approach

```html
<form #signupForm="ngForm" (ngSubmit)="registerUser(signupForm)">
  <label>
    First Name: <input name="firstName" ngModel>
  </label>
  <label>
    Last Name: <input name="lastName" ngModel>
  </label>
  <button type="submit">Sign Up</button>
</form>
```

- Every `<form>` element is automatically enhanced by the `NgForm` directive
- `signupForm` is a template variable that holds a reference to the `NgFor` directive instance
- `ngSubmit` is a built-in event called whenever the form is submitted
- `ngModel` turns a form field into a `FormControl` using the element `name` property

---

## Inspecting a Form

`NgForm` provides properties to get information from the form like `value` and `valid`

```ts
@Component({ ... })
export class SignupComponent {
  ...
  registerUser (signupForm: NgForm) {
    console.log(signupForm.value); // => { firstName: '', lastName: '' }
    console.log(signupForm.valid); // => true
  }
}
```

- A form with no validations rules is always valid by default
- To see al the properties available visit the [docs](https://angular.io/docs/ts/latest/api/forms/index/AbstractControlDirective-class.html)

[View Example](https://plnkr.co/edit/SmX18R1BhjJz9E33yROT?p=preview)

---

## Nesting Form Data (1/2)

- `signupForm.value` returns a flat object by default, which is not always what we want
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
      First Name: <input name="firstName" ngModel>
    </label>
    <label>
      Last Name: <input name="lastName" ngModel>
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
<input name="firstName" [ngModel]="firstName">
```

Two way data binding will keep the model up to date as the user types.

```html
<input name="firstName" [(ngModel)]="firstName">

```

[View Example](https://plnkr.co/edit/yxLe7Bccx46a0qw9lYHs?p=preview)

---

## Built-in Validators

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

## Validation Example

To perform validation, we need to create template variables for every field `#field="ngModel"`

```ts
<label>
  Username:
  <input name="username" ngModel #username="ngModel" required />
</label>
<ul class="errors" [hidden]="username.valid || username.untouched">
  <li [hidden]="!username.hasError('required')">
    The username is required
  </li>
</ul>
```

Template variables are instances of `NgModel` but they share some properties from `FormControl`:

- `value`: Returns the value
- `valid`: Returns field validity (boolean)
- `pristine`: Indicates if it had changed from default view (boolean)
- `touched`: Indicates if the field was clicked, tabbed or tapped (boolean)

[View Example](https://plnkr.co/edit/bWdmou8gdyqhqsu8jGtI?p=preview)

---

## Visual Cues

- Angular will automatically add classes to form controls based on their status
- We can use those classes to define visual cues for the user with CSS

```css
.ng-valid {}
.ng-invalid {}

.ng-touched {} /* clicked, tapped, or tabbed over */
.ng-untouched {} /* not clicked, tapped, or tabbed over */

.ng-pristine {} /* unchanged from default value */
.ng-dirty {} /* different from default value */

.ng-touched.ng-invalid {} /* typical pairings */
```

[View Example](https://plnkr.co/edit/dA0RTZhUgLmDX47vJ3XQ?p=preview)

---

# Model Driven Forms 

---

## Creating Model Driven Forms 

Form declared programmatically using the `FormBuilder` service

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

## Connecting the Model with the Template

- Once declared in our component, we need to provide our form to the template
- Use the `FormGroup` directive to assign the `formGroup` instance to the template
- Use the `FormControl` directive to assign a `formControl` instance to the template

```html
  <form [formGroup]="signupForm" (ngSubmit)="registerUser()">
    <label>
      First Name:
      <input name="firstName" [formControl]="firstName">
    </label>
  </form>
```

---

## Validating `FormBuilder` Forms

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

## Creating Custom Validators

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

## Checking a Custom Validator

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

## Getting `FormControl`s from the `FormGroup`

We can avoid creating individual properties for each `FormControl` instance

```ts
this.signupForm = builder.group({
  username: new FormControl('', [ Validators.required ])
});
```

```html
<label>
  Username:
  <input type="text" name="username"
    [formControl]="signupForm.get('username')"
    #username="ngForm">
</label>

<ul [hidden]="username.valid || username.untouched">
  <!-- Same as before -->
</ul>
```

`ngForm` is the `exported as` property of the `FormControl` [directive](https://angular.io/docs/ts/latest/api/forms/index/FormControlDirective-directive.html)

[View Example](https://plnkr.co/edit/TrVihF?p=preview)

---

## Template-Driven vs `FormBuilder`

|   | Template-Driven | FormBuilder |
| - | --------------- | ----------- |
| Form instance    | Declare in template `#signupForm="ngForm"` | Declare in class `[formGroup]="signupForm"` |
| `(ngSubmit)`       | `registerUser(signupForm)`                 | `registerUser()`                              |
| Control instance | Declare in template `ngModel`              | Declare in class `[formControl]="firstName"`   |

