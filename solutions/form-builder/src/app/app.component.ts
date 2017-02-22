import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { Validators, FormGroup, FormControl, FormBuilder } from '@angular/forms';

// Custom components 
import { EmailComponent } from './email/email.component';
import { LastNameComponent } from './last-name/last-name.component';
import { FirstNameComponent } from './first-name/first-name.component';

@Component({
  selector: 'app-root',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(FirstNameComponent) firstNameComponent: FirstNameComponent;
  @ViewChild(LastNameComponent) lastNameComponent: LastNameComponent;
  @ViewChild(EmailComponent) emailComponent: EmailComponent;

  formData;
  contacts = [];

  constructor(private builder: FormBuilder) {
    this.formData = {};
  }

  handleFormData(key, value): void {
    this.formData[key] = value;
  }

  addPerson() {
    this.contacts = [...this.contacts, this.formData];
    this.reset();
  }

  reset(): void {
    this.formData = {};
    this.firstNameComponent.firstNameForm.reset();
    this.lastNameComponent.lastNameForm.reset();
    this.emailComponent.emailForm.reset();
  }
}