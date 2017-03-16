import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Validators, ValidatorFn, FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  username: FormControl;
  email: FormControl;
  password: FormControl;
  confirmPassword: FormControl;
  myForm: FormGroup;

  constructor(private builder: FormBuilder,
    private activatedRoute: ActivatedRoute) {

    this.username = new FormControl('', [Validators.required]);
    this.email = new FormControl('', [Validators.required]);
    this.confirmPassword = new FormControl('');
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]);
    this.activatedRoute.params.subscribe((parameter) => {
      this.username.patchValue(parameter['userName']);
    });
    this.confirmPassword.setValidators([
      Validators.required,
      Validators.minLength(8),
      (control) => this.isSame(control, this.password),
    ]);

    this.myForm = this.builder.group({
      username: this.username,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword,
    });

    this.password.valueChanges.subscribe((value) => {
      this.myForm.controls['confirmPassword'].updateValueAndValidity();
    });

  }

  isSame(input, matcher) {
    console.log(input.value, matcher.value);
    if (input.value !== matcher.value) {
      return { passwordMatch: true };
    }
    return null;
  }

  doSomething() {
    if (this.myForm.valid) {
      alert(
        `Thank you ${this.myForm.value.username} for signing up! :)`
      );
    }
  }
}
