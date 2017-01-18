import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Person } from './person.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  options = {
    genders: ['Male', 'Female'],
    countries: ['Canada', 'US']
  };
  person: Person;
  isVisible = false;

  getForm(myForm: NgForm): void {
    this.person = myForm.value;
    this.isVisible = true;
  }

  hideValues() {
    this.person = null;
  }
}
