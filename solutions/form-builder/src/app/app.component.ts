import { Component } from '@angular/core';
import {
  Validators,
  FormGroup,
  FormControl,
  FormBuilder
} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  people = [];

  firstName = new FormControl('', [
    Validators.required,
    Validators.minLength(2)
  ]);
  lastName = new FormControl('', [
    Validators.required,
    Validators.minLength(2)
  ]);
  email = new FormControl('', [
    Validators.required,
    isValidEmail
  ]);

  contactForm: FormGroup = this.builder.group({
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email
  });

  constructor(private builder: FormBuilder) {}

  addPerson() {
    this.people.push(this.contactForm.value);
    this.contactForm.reset();
  }
}

function isValidEmail(input: FormControl) {
  const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const isValid = emailRegex.test(input.value);

  return isValid ? null : {invalidEmail: true};
}
