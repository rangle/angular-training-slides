# Forms

---

## Forms in Angular

Angular has two approaches to forms:

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