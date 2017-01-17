import {Component} from '@angular/core';
import UsersService from '../services/users.service';

@Component({
  selector: 'rio-companies-home',
  template: 'Select company name to display users'
})
export class CompaniesHomeComponent {}

@Component({
  selector: 'rio-companies',
  template: `
  <div style="border: 1px solid black; padding: 10px; display: flex">
    <div style="width: 40%">
      <rio-company-list [companies]="companies"></rio-company-list>
    </div>
    <div style="flex: 1">
      Display Child Routes Here
    </div>
  </div>
  `
})
export class CompaniesComponent {
  companies: any;

  constructor(private usersService: UsersService) {}

  ngOnInit() {
  }
}

