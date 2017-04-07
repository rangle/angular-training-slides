
##Forms in Angular

Forms are essential to any web application. 

For Example: They help you to login, book flights or buy goods on a website. Angular provides several in-built modules, validators and user controls to make the user-experience effective.

---

## How do I create forms in Angular (10 min)

To make use of forms we need to import the `FormsModule` into the application module. This module will allow us to use all the features of the template-driven forms including `ngModel`.  The `FormsModule` is available in the `@angular/forms` package. 

`ngModel` allows us to use the two-way databinding syntax to bind data to form-controls. 

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

To handle forms data we will be using the `ngModel` and `ngForm` directive. 
`ngForm` provides properties to get information from the form like `value` and `valid`. 
`ngModel` provides the same property for the individual fields. 

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

- Combining these classes and properties with CSS and HTML allows us to create very user-friendly forms.

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

## Can I create custom validators (15 min)
- Create a custom validator
- Note: Discuss with Philip if we want to create a directive to do validation in a template driven form or if we are here refering to custom validation in the FormBuilder, which is essentially a lot easier. 

--- 

FIXME
## Can I bind a form to a model instead of using a template (25 min)
- Import ReactiveFormsModule
- Inject / configure FormBuilder

--- 

FIXME
## How do validate my form model (15 min)
- Validators in FormBuilder

--- 

FIXME
## How can I logically separate different sections of a form (10 min)
- use FormGroups

--- 

FIXME
## How can I dynamically generate form fields (10 min)
- FormBuilder
- FormArray
- Template-driven (ngFor / ngIf)