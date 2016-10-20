// Don't look at this file until Exercise 3

import {Component} from '@angular/core';

import Users from '../services/users.service';

@Component({
  selector: 'companies-home',
  template: 'Select company name to display users'
})
export class CompaniesHome {}

@Component({
  selector: 'companies',
  template: `
  <div style="border: 1px solid black; padding: 10px; display: flex">
    <div style="width: 40%">
      <company-list [companies]="companies"></company-list>
    </div>

    <div style="flex: 1">
      Display Child Routes Here
    </div>
  </div>
  `,

})
export class Companies {
  public companies:any;

  constructor(private usersService: Users) {}

  ngOnInit() {
    this.companies = this.usersService.getCompanyNames();
  }
}

