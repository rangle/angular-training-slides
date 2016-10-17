import {Component} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

interface Validation {
  [key: string]: boolean;
}

function isBanned(input: FormControl): Validation {
  if (!input.value) {
    return { required: true };
  }
  if (input.value.toLowerCase() === 'banned-user') {
    return { isBanned: true };
  }
  return null;
}

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'login-form.component.html',
})
export class LoginForm {
  loginForm: FormGroup;
  username: FormControl;
  password: FormControl;

  constructor (builder: FormBuilder) {
    this.username = new FormControl('', [Validators.required, isBanned]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(10)
    ]);
    this.loginForm = builder.group({
      username: this.username,
      password: this.password
    });
  }

  login () {
    console.log(this.loginForm.value);
    // Attempt Logging in...
  }
}
