import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  people = []

  firstName = new FormControl('')
  lastName = new FormControl('')
  email = new FormControl('')

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
